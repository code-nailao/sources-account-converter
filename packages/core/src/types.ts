export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type SourceFormat = "sub2api" | "cpa" | "unknown";
export type OutputFormat = "original" | "sub2api" | "cpa";

export interface OAuthView {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  idToken?: string | undefined;
  accountId?: string | undefined;
  userId?: string | undefined;
  email?: string | undefined;
  planType?: string | undefined;
}

export interface CanonicalAccount {
  ordinal: number;
  sourceFormat: SourceFormat;
  sourcePath: string;
  original: JsonObject;
  oauth: OAuthView;
  sourceProxies?: JsonValue[];
  sourceExportedAt?: string;
}

export type Grouping =
  | { mode: "merge" }
  | { mode: "chunkSize"; chunkSize: number }
  | { mode: "partCount"; partCount: number };

export interface RenderOptions {
  format: OutputFormat;
  grouping: Grouping;
  generatedAt?: string;
  exportedAt?: string;
  indent?: number;
}

export interface Artifact {
  filename: string;
  mediaType: "application/json";
  content: string;
  accountCount: number;
  bundleIndex: number;
  bundleCount: number;
  format: OutputFormat;
}
