package accountformats

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"strings"
)

type parseContext struct {
	path       string
	proxies    []json.RawMessage
	exportedAt string
}

func Parse(input []byte) ([]Account, error) {
	if len(bytes.TrimSpace(input)) == 0 {
		return nil, errorf("empty_input", "input is empty")
	}

	values, err := decodeInput(input)
	if err != nil {
		return nil, err
	}
	accounts := make([]Account, 0)
	for index, value := range values {
		path := "$"
		if len(values) > 1 {
			path = fmt.Sprintf("$line[%d]", index+1)
		}
		if err := extract(value, parseContext{path: path}, &accounts); err != nil {
			return nil, err
		}
	}
	if len(accounts) == 0 {
		return nil, errorf("no_accounts", "no accounts were found")
	}
	return accounts, nil
}

func Convert(input []byte, options RenderOptions) ([]Artifact, error) {
	accounts, err := Parse(input)
	if err != nil {
		return nil, err
	}
	return Render(accounts, options)
}

func decodeInput(input []byte) ([]any, error) {
	value, err := decodeJSON(input)
	if err == nil {
		return []any{value}, nil
	}

	lines := bytes.Split(input, []byte{'\n'})
	values := make([]any, 0, len(lines))
	for index, line := range lines {
		if len(bytes.TrimSpace(line)) == 0 {
			continue
		}
		value, lineErr := decodeJSON(line)
		if lineErr != nil {
			return nil, errorf("invalid_jsonl", "invalid JSON on line %d", index+1)
		}
		values = append(values, value)
	}
	if len(values) == 0 {
		return nil, errorf("empty_input", "input is empty")
	}
	return values, nil
}

func decodeJSON(input []byte) (any, error) {
	decoder := json.NewDecoder(bytes.NewReader(input))
	decoder.UseNumber()
	var value any
	if err := decoder.Decode(&value); err != nil {
		return nil, err
	}
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		if err == nil {
			return nil, fmt.Errorf("multiple JSON values")
		}
		return nil, err
	}
	return value, nil
}

func extract(value any, context parseContext, output *[]Account) error {
	switch typed := value.(type) {
	case []any:
		for index, item := range typed {
			child := context
			child.path = fmt.Sprintf("%s[%d]", context.path, index)
			if err := extract(item, child, output); err != nil {
				return err
			}
		}
		return nil
	case map[string]any:
		return extractObject(typed, context, output)
	default:
		return errorf("unsupported_value", "expected an account object at %s", context.path)
	}
}

func extractObject(value map[string]any, context parseContext, output *[]Account) error {
	if proxies, ok := value["proxies"].([]any); ok {
		context.proxies = rawValues(proxies)
	}
	if exportedAt := stringValue(value["exported_at"]); exportedAt != "" {
		context.exportedAt = exportedAt
	}

	type container struct {
		name  string
		items []any
		set   bool
	}
	containers := []container{
		arrayContainer("accounts", value["accounts"]),
		arrayContainer("items", value["items"]),
		arrayContainer("auths", value["auths"]),
	}
	if data, ok := value["data"].(map[string]any); ok {
		containers = append(containers, arrayContainer("data.accounts", data["accounts"]))
	}
	for _, candidate := range containers {
		if !candidate.set {
			continue
		}
		for index, item := range candidate.items {
			child := context
			child.path = fmt.Sprintf("%s.%s[%d]", context.path, candidate.name, index)
			if err := extract(item, child, output); err != nil {
				return err
			}
		}
		return nil
	}

	raw, err := json.Marshal(value)
	if err != nil {
		return errorf("invalid_account", "account at %s is not valid JSON", context.path)
	}
	*output = append(*output, Account{
		Ordinal:          len(*output) + 1,
		SourceFormat:     detectFormat(value),
		SourcePath:       context.path,
		Original:         append(json.RawMessage(nil), raw...),
		OAuth:            oauthView(value),
		SourceProxies:    cloneRaw(context.proxies),
		SourceExportedAt: context.exportedAt,
	})
	return nil
}

func arrayContainer(name string, value any) struct {
	name  string
	items []any
	set   bool
} {
	items, ok := value.([]any)
	return struct {
		name  string
		items []any
		set   bool
	}{name: name, items: items, set: ok}
}

func detectFormat(account map[string]any) Format {
	if _, ok := account["credentials"].(map[string]any); ok {
		return FormatSub2API
	}
	if _, ok := account["platform"]; ok {
		return FormatSub2API
	}
	if _, ok := account["concurrency"]; ok {
		return FormatSub2API
	}
	if firstString([]map[string]any{account}, "access_token", "refresh_token", "id_token") != "" {
		return FormatCPA
	}
	return ""
}

func oauthView(account map[string]any) OAuthView {
	sources := make([]map[string]any, 0, 3)
	if credentials, ok := account["credentials"].(map[string]any); ok {
		sources = append(sources, credentials)
	}
	sources = append(sources, account)
	if extra, ok := account["extra"].(map[string]any); ok {
		sources = append(sources, extra)
	}
	return OAuthView{
		AccessToken:  firstString(sources, "access_token", "accessToken"),
		RefreshToken: firstString(sources, "refresh_token", "refreshToken"),
		IDToken:      firstString(sources, "id_token", "idToken"),
		AccountID:    firstString(sources, "account_id", "chatgpt_account_id", "accountId"),
		UserID:       firstString(sources, "user_id", "chatgpt_user_id", "userId"),
		Email:        firstString(sources, "email"),
		PlanType:     firstString(sources, "plan_type", "chatgpt_plan_type", "planType"),
	}
}

func firstString(sources []map[string]any, keys ...string) string {
	for _, source := range sources {
		for _, key := range keys {
			if value := stringValue(source[key]); value != "" {
				return value
			}
		}
	}
	return ""
}

func stringValue(value any) string {
	text, _ := value.(string)
	return strings.TrimSpace(text)
}

func rawValues(values []any) []json.RawMessage {
	result := make([]json.RawMessage, 0, len(values))
	for _, value := range values {
		raw, err := json.Marshal(value)
		if err == nil {
			result = append(result, raw)
		}
	}
	return result
}

func cloneRaw(values []json.RawMessage) []json.RawMessage {
	result := make([]json.RawMessage, len(values))
	for index, value := range values {
		result[index] = append(json.RawMessage(nil), value...)
	}
	return result
}
