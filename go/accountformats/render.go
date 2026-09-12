package accountformats

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

func Render(accounts []Account, options RenderOptions) ([]Artifact, error) {
	if len(accounts) == 0 {
		return nil, errorf("no_accounts", "no accounts were provided")
	}
	if options.Format != FormatSub2API && options.Format != FormatCPA {
		return nil, errorf("unsupported_format", "unsupported output format %q", options.Format)
	}
	groups, err := Group(accounts, options.Grouping)
	if err != nil {
		return nil, err
	}
	timestamp, err := time.Parse(time.RFC3339, options.Timestamp)
	if err != nil {
		return nil, errorf("invalid_timestamp", "timestamp must be an explicit RFC3339 value")
	}
	if options.Format == FormatCPA {
		return renderCPA(groups, len(accounts), timestamp)
	}
	return renderSub2API(groups, len(accounts), options, timestamp)
}

func renderSub2API(groups [][]Account, total int, options RenderOptions, timestamp time.Time) ([]Artifact, error) {
	artifacts := make([]Artifact, 0, len(groups))
	for index, group := range groups {
		accounts := make([]json.RawMessage, 0, len(group))
		for _, account := range group {
			converted, err := toSub2API(account)
			if err != nil {
				return nil, fmt.Errorf("account %d: %w", account.Ordinal, err)
			}
			accounts = append(accounts, converted)
		}
		stamp := options.ExportedAt
		if stamp == "" {
			stamp = group[0].SourceExportedAt
		}
		if stamp == "" {
			stamp = timestamp.Format(time.RFC3339)
		} else if _, err := time.Parse(time.RFC3339, stamp); err != nil {
			return nil, errorf("invalid_exported_at", "exportedAt must be RFC3339")
		}
		document := struct {
			ExportedAt string            `json:"exported_at"`
			Proxies    []json.RawMessage `json:"proxies"`
			Accounts   []json.RawMessage `json:"accounts"`
		}{
			ExportedAt: stamp,
			Proxies:    uniqueProxies(group),
			Accounts:   accounts,
		}
		content, err := json.MarshalIndent(document, "", "  ")
		if err != nil {
			return nil, errorf("render_failed", "could not render Sub2API output")
		}
		filename := fmt.Sprintf("accounts-%s-sub2api-%d.json", filenameTimestamp(timestamp), total)
		if options.Grouping.Mode != "" && options.Grouping.Mode != GroupingMerge {
			filename = fmt.Sprintf("accounts-%s-sub2api-%d-part-%s-of-%s.json", filenameTimestamp(timestamp), total, pad(index+1, len(groups)), pad(len(groups), len(groups)))
		}
		artifacts = append(artifacts, Artifact{
			Filename:     filename,
			MediaType:    "application/json",
			Content:      content,
			AccountCount: len(group),
			BundleIndex:  index + 1,
			BundleCount:  len(groups),
			Format:       FormatSub2API,
		})
	}
	return artifacts, nil
}

func renderCPA(groups [][]Account, total int, timestamp time.Time) ([]Artifact, error) {
	artifacts := make([]Artifact, 0, total)
	accountNumber := 0
	for bundleIndex, group := range groups {
		for _, account := range group {
			accountNumber++
			converted, err := toCPA(account)
			if err != nil {
				return nil, err
			}
			content, err := json.MarshalIndent(converted, "", "  ")
			if err != nil {
				return nil, errorf("render_failed", "could not render CPA output")
			}
			artifacts = append(artifacts, Artifact{
				Filename:     fmt.Sprintf("accounts-%s-cpa-%d-account-%s-of-%s.json", filenameTimestamp(timestamp), total, pad(accountNumber, total), pad(total, total)),
				MediaType:    "application/json",
				Content:      content,
				AccountCount: 1,
				BundleIndex:  bundleIndex + 1,
				BundleCount:  len(groups),
				Format:       FormatCPA,
			})
		}
	}
	return artifacts, nil
}

func toSub2API(account Account) (json.RawMessage, error) {
	emailName := strings.TrimSpace(account.OAuth.Email)
	if account.SourceFormat == FormatSub2API {
		if emailName == "" {
			return append(json.RawMessage(nil), account.Original...), nil
		}
		var original map[string]any
		if err := decodeRawObject(account.Original, &original); err != nil || original == nil {
			return nil, errorf("invalid_account", "account %d is not a JSON object", account.Ordinal)
		}
		original["name"] = emailName
		raw, err := json.Marshal(original)
		if err != nil {
			return nil, errorf("render_failed", "could not render Sub2API account")
		}
		return raw, nil
	}
	missing := validateOAuth(account.OAuth)
	if len(missing) > 0 {
		return nil, missingCredentials(account.Ordinal, missing)
	}
	credentials := map[string]any{
		"access_token":       account.OAuth.AccessToken,
		"refresh_token":      account.OAuth.RefreshToken,
		"id_token":           account.OAuth.IDToken,
		"chatgpt_account_id": account.OAuth.AccountID,
	}
	if account.OAuth.UserID != "" {
		credentials["chatgpt_user_id"] = account.OAuth.UserID
	}
	if account.OAuth.Email != "" {
		credentials["email"] = account.OAuth.Email
	}
	if account.OAuth.PlanType != "" {
		credentials["plan_type"] = account.OAuth.PlanType
	}
	name := emailName
	if name == "" {
		name = fmt.Sprintf("codex-account-%03d", account.Ordinal)
	}
	result := map[string]any{
		"name":        name,
		"platform":    "openai",
		"type":        "oauth",
		"credentials": credentials,
	}
	if account.OAuth.PlanType != "" {
		result["plan_type"] = account.OAuth.PlanType
	}
	if account.OAuth.Email != "" {
		result["extra"] = map[string]any{"email": account.OAuth.Email}
	}
	raw, err := json.Marshal(result)
	if err != nil {
		return nil, errorf("render_failed", "could not render Sub2API account")
	}
	return raw, nil
}

func toCPA(account Account) (map[string]any, error) {
	missing := validateOAuth(account.OAuth)
	if len(missing) > 0 {
		return nil, missingCredentials(account.Ordinal, missing)
	}
	if account.SourceFormat == FormatCPA {
		var original map[string]any
		if err := decodeRawObject(account.Original, &original); err != nil {
			return nil, errorf("invalid_account", "account %d is not a JSON object", account.Ordinal)
		}
		return original, nil
	}

	var original map[string]any
	if err := decodeRawObject(account.Original, &original); err != nil {
		return nil, errorf("invalid_account", "account %d is not a JSON object", account.Ordinal)
	}
	credentials, _ := original["credentials"].(map[string]any)
	result := map[string]any{
		"type":          "codex",
		"access_token":  account.OAuth.AccessToken,
		"refresh_token": account.OAuth.RefreshToken,
		"id_token":      account.OAuth.IDToken,
		"account_id":    account.OAuth.AccountID,
	}
	if account.OAuth.Email != "" {
		result["email"] = account.OAuth.Email
	}
	copyOptional(result, original, credentials, "priority", "disabled", "last_refresh", "expired", "proxy_url", "weight")
	return result, nil
}

func validateOAuth(oauth OAuthView) []string {
	missing := make([]string, 0, 4)
	if !validJWT(oauth.AccessToken) {
		missing = append(missing, "access_token")
	}
	if !validOpaqueCredential(oauth.RefreshToken) {
		missing = append(missing, "refresh_token")
	}
	if !validJWT(oauth.IDToken) {
		missing = append(missing, "id_token")
	}
	if !validOpaqueCredential(oauth.AccountID) {
		missing = append(missing, "account_id")
	}
	return missing
}

func validJWT(value string) bool {
	if !validOpaqueCredential(value) {
		return false
	}
	parts := strings.Split(value, ".")
	if len(parts) != 3 || parts[0] == "" || parts[1] == "" || parts[2] == "" {
		return false
	}
	for index, part := range parts {
		decoded, err := base64.RawURLEncoding.DecodeString(part)
		if err != nil {
			return false
		}
		if index < 2 {
			var object map[string]any
			if json.Unmarshal(decoded, &object) != nil || object == nil {
				return false
			}
		}
	}
	return true
}

func validOpaqueCredential(value string) bool {
	value = strings.TrimSpace(value)
	if value == "" {
		return false
	}
	normalized := strings.ToLower(strings.NewReplacer("-", "_", " ", "_").Replace(value))
	for _, invalid := range []string{"placeholder", "mock", "fake", "your_token", "your_access_token", "your_refresh_token", "your_id_token", "your_account_id", "xxx", "null", "undefined"} {
		if normalized == invalid {
			return false
		}
	}
	return true
}

func decodeRawObject(raw json.RawMessage, target *map[string]any) error {
	decoder := json.NewDecoder(bytes.NewReader(raw))
	decoder.UseNumber()
	return decoder.Decode(target)
}

func copyOptional(target, primary, secondary map[string]any, keys ...string) {
	for _, key := range keys {
		if value, ok := primary[key]; ok && value != nil {
			target[key] = value
			continue
		}
		if value, ok := secondary[key]; ok && value != nil {
			target[key] = value
		}
	}
}

func uniqueProxies(accounts []Account) []json.RawMessage {
	seen := make(map[string]struct{})
	result := make([]json.RawMessage, 0)
	for _, account := range accounts {
		for _, proxy := range account.SourceProxies {
			var value any
			if err := decodeRaw(proxy, &value); err != nil {
				continue
			}
			stable, err := json.Marshal(value)
			if err != nil {
				continue
			}
			key := string(stable)
			if _, exists := seen[key]; exists {
				continue
			}
			seen[key] = struct{}{}
			result = append(result, stable)
		}
	}
	if result == nil {
		return []json.RawMessage{}
	}
	return result
}

func decodeRaw(raw json.RawMessage, target any) error {
	decoder := json.NewDecoder(bytes.NewReader(raw))
	decoder.UseNumber()
	return decoder.Decode(target)
}

func pad(value, total int) string {
	width := len(fmt.Sprintf("%d", total))
	if width < 3 {
		width = 3
	}
	return fmt.Sprintf("%0*d", width, value)
}

func filenameTimestamp(value time.Time) string {
	return value.Format("20060102-150405")
}
