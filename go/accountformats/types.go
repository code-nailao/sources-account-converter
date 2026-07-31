package accountformats

import "encoding/json"

type Format string

const (
	FormatSub2API Format = "sub2api"
	FormatCPA     Format = "cpa"
)

type GroupingMode string

const (
	GroupingMerge       GroupingMode = "merge"
	GroupingChunkSize   GroupingMode = "chunkSize"
	GroupingPartCount   GroupingMode = "partCount"
	GroupingCustomSizes GroupingMode = "customSizes"
)

type Grouping struct {
	Mode      GroupingMode `json:"mode"`
	ChunkSize int          `json:"chunkSize,omitempty"`
	PartCount int          `json:"partCount,omitempty"`
	Sizes     []int        `json:"sizes,omitempty"`
}

type RenderOptions struct {
	Format     Format   `json:"format"`
	Grouping   Grouping `json:"grouping"`
	Timestamp  string   `json:"timestamp"`
	ExportedAt string   `json:"exportedAt,omitempty"`
}

type Options = RenderOptions

type OAuthView struct {
	AccessToken  string `json:"accessToken,omitempty"`
	RefreshToken string `json:"refreshToken,omitempty"`
	IDToken      string `json:"idToken,omitempty"`
	AccountID    string `json:"accountId,omitempty"`
	UserID       string `json:"userId,omitempty"`
	Email        string `json:"email,omitempty"`
	PlanType     string `json:"planType,omitempty"`
}

// Account keeps the complete source object so same-format exports retain
// fields unknown to this package.
type Account struct {
	Ordinal          int
	SourceFormat     Format
	SourcePath       string
	Original         json.RawMessage
	OAuth            OAuthView
	SourceProxies    []json.RawMessage
	SourceExportedAt string
}

type Artifact struct {
	Filename     string
	MediaType    string
	Content      []byte
	AccountCount int
	BundleIndex  int
	BundleCount  int
	Format       Format
}
