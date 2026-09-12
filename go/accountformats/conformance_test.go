package accountformats

import (
	"bytes"
	"encoding/json"
	"os"
	"reflect"
	"strings"
	"testing"
)

type contract struct {
	Cases      []contractCase `json:"cases"`
	ErrorCases []errorCase    `json:"errorCases"`
}

type contractCase struct {
	Name     string             `json:"name"`
	Input    json.RawMessage    `json:"input"`
	Options  RenderOptions      `json:"options"`
	Expected []expectedArtifact `json:"expected"`
}

type expectedArtifact struct {
	Filename     string          `json:"filename"`
	AccountCount int             `json:"accountCount"`
	BundleIndex  int             `json:"bundleIndex"`
	BundleCount  int             `json:"bundleCount"`
	Format       Format          `json:"format"`
	JSON         json.RawMessage `json:"json"`
}

type errorCase struct {
	Name      string          `json:"name"`
	Input     json.RawMessage `json:"input"`
	Options   RenderOptions   `json:"options"`
	ErrorCode string          `json:"errorCode"`
}

func TestContractFixtures(t *testing.T) {
	fixture := loadContract(t, "contract-v1.json", "account-name-v1.json")
	for _, testCase := range fixture.Cases {
		t.Run(testCase.Name, func(t *testing.T) {
			artifacts, err := Convert(testCase.Input, testCase.Options)
			if err != nil {
				t.Fatal(err)
			}
			if len(artifacts) != len(testCase.Expected) {
				t.Fatalf("artifact count = %d, want %d", len(artifacts), len(testCase.Expected))
			}
			for index, expected := range testCase.Expected {
				actual := artifacts[index]
				if actual.Filename != expected.Filename || actual.AccountCount != expected.AccountCount || actual.BundleIndex != expected.BundleIndex || actual.BundleCount != expected.BundleCount || actual.Format != expected.Format {
					t.Fatalf("artifact %d metadata mismatch: %#v", index, actual)
				}
				if actual.MediaType != "application/json" {
					t.Fatalf("artifact %d media type = %q", index, actual.MediaType)
				}
				if !sameJSON(t, actual.Content, expected.JSON) {
					t.Fatalf("artifact %d JSON mismatch\nactual: %s\nexpected: %s", index, actual.Content, expected.JSON)
				}
			}
		})
	}
}

func TestContractErrorFixtures(t *testing.T) {
	fixture := loadContract(t)
	for _, testCase := range fixture.ErrorCases {
		t.Run(testCase.Name, func(t *testing.T) {
			_, err := Convert(testCase.Input, testCase.Options)
			if err == nil {
				t.Fatal("expected conversion to fail")
			}
			if code := ErrorCode(err); code != testCase.ErrorCode {
				t.Fatalf("error code = %q, want %q: %v", code, testCase.ErrorCode, err)
			}
		})
	}
}

func TestGroupingForTwoHundredAccounts(t *testing.T) {
	accounts := make([]Account, 200)
	for index := range accounts {
		accounts[index].Ordinal = index + 1
	}

	bySize, err := Group(accounts, Grouping{Mode: GroupingChunkSize, ChunkSize: 30})
	if err != nil {
		t.Fatal(err)
	}
	if got, want := groupSizes(bySize), []int{30, 30, 30, 30, 30, 30, 20}; !reflect.DeepEqual(got, want) {
		t.Fatalf("chunk sizes = %v, want %v", got, want)
	}

	byCount, err := Group(accounts, Grouping{Mode: GroupingPartCount, PartCount: 6})
	if err != nil {
		t.Fatal(err)
	}
	if got, want := groupSizes(byCount), []int{34, 34, 33, 33, 33, 33}; !reflect.DeepEqual(got, want) {
		t.Fatalf("part sizes = %v, want %v", got, want)
	}

	custom, err := Group(accounts, Grouping{Mode: GroupingCustomSizes, Sizes: []int{5, 10, 20, 30, 100}})
	if err != nil {
		t.Fatal(err)
	}
	if got, want := groupSizes(custom), []int{5, 10, 20, 30, 100, 35}; !reflect.DeepEqual(got, want) {
		t.Fatalf("custom sizes = %v, want %v", got, want)
	}

	clamped, err := Group(accounts[:12], Grouping{Mode: GroupingCustomSizes, Sizes: []int{5, 100, 20}})
	if err != nil {
		t.Fatal(err)
	}
	if got, want := groupSizes(clamped), []int{5, 7}; !reflect.DeepEqual(got, want) {
		t.Fatalf("clamped custom sizes = %v, want %v", got, want)
	}
}

func TestGroupingRejectsInvalidCustomSizes(t *testing.T) {
	accounts := make([]Account, 2)
	for _, sizes := range [][]int{nil, {}, {1, 0}, {-1}} {
		if _, err := Group(accounts, Grouping{Mode: GroupingCustomSizes, Sizes: sizes}); err == nil {
			t.Fatalf("expected custom sizes %v to fail", sizes)
		}
	}
}

func TestFilenamesNeverContainIdentityData(t *testing.T) {
	input := []byte(`{"type":"codex","access_token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MifQ.c2ln","refresh_token":"rt_secure_7G4m9Q","id_token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZCJ9.c2ln","account_id":"acct-sensitive-42","email":"person@example.invalid"}`)
	artifacts, err := Convert(input, RenderOptions{
		Format:    FormatCPA,
		Grouping:  Grouping{Mode: GroupingMerge},
		Timestamp: "2026-07-31T18:15:30+08:00",
	})
	if err != nil {
		t.Fatal(err)
	}
	filename := artifacts[0].Filename
	for _, forbidden := range []string{"person", "example", "acct-sensitive", "7G4m9Q"} {
		if strings.Contains(filename, forbidden) {
			t.Fatalf("filename %q contains identity-derived value %q", filename, forbidden)
		}
	}
	if filename != "accounts-20260731-181530-cpa-1-account-001-of-001.json" {
		t.Fatalf("unexpected filename %q", filename)
	}
}

func TestCredentialErrorsNeverContainValues(t *testing.T) {
	input := []byte(`{"type":"codex","access_token":"secret-access-value","refresh_token":"secret-refresh-value","id_token":"secret-id-value","account_id":"placeholder"}`)
	_, err := Convert(input, RenderOptions{
		Format:    FormatCPA,
		Grouping:  Grouping{Mode: GroupingMerge},
		Timestamp: "2026-07-31T18:15:30+08:00",
	})
	if err == nil {
		t.Fatal("expected invalid credentials to fail")
	}
	for _, secret := range []string{"secret-access-value", "secret-refresh-value", "secret-id-value"} {
		if strings.Contains(err.Error(), secret) {
			t.Fatalf("error exposed credential value: %v", err)
		}
	}
}

func loadContract(t *testing.T, filenames ...string) contract {
	t.Helper()
	if len(filenames) == 0 {
		filenames = []string{"contract-v1.json"}
	}
	var combined contract
	for _, filename := range filenames {
		payload, err := os.ReadFile("../../spec/fixtures/" + filename)
		if err != nil {
			t.Fatal(err)
		}
		var fixture contract
		if err := json.Unmarshal(payload, &fixture); err != nil {
			t.Fatal(err)
		}
		combined.Cases = append(combined.Cases, fixture.Cases...)
		combined.ErrorCases = append(combined.ErrorCases, fixture.ErrorCases...)
	}
	return combined
}

func sameJSON(t *testing.T, left, right []byte) bool {
	t.Helper()
	decode := func(payload []byte) any {
		decoder := json.NewDecoder(bytes.NewReader(payload))
		decoder.UseNumber()
		var value any
		if err := decoder.Decode(&value); err != nil {
			t.Fatal(err)
		}
		return value
	}
	return reflect.DeepEqual(decode(left), decode(right))
}

func groupSizes(groups [][]Account) []int {
	result := make([]int, len(groups))
	for index, group := range groups {
		result[index] = len(group)
	}
	return result
}
