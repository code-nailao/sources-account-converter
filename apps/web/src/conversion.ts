import type { Grouping, OutputFormat, RenderOptions } from "@sources/account-converter-core";

export type AccountFormat = Extract<OutputFormat, "sub2api" | "cpa">;
export type BundleMode = "merged" | "split";
export type SplitMode = "accounts_per_file" | "file_count";

export interface ConversionFormState {
  outputFormat: AccountFormat;
  bundleMode: BundleMode;
  splitMode: SplitMode;
  splitValue: number;
}

export const DEFAULT_FORM_STATE: ConversionFormState = {
  outputFormat: "sub2api",
  bundleMode: "merged",
  splitMode: "accounts_per_file",
  splitValue: 20,
};

export function normalizeFormState(
  state: ConversionFormState,
): ConversionFormState {
  const outputFormat = state.outputFormat;
  const bundleMode = outputFormat === "cpa" ? "split" : state.bundleMode;

  return {
    outputFormat,
    bundleMode,
    splitMode: state.splitMode,
    splitValue: Math.max(1, Math.floor(Number(state.splitValue) || 1)),
  };
}

export function toRenderOptions(
  state: ConversionFormState,
): RenderOptions {
  const normalized = normalizeFormState(state);
  let grouping: Grouping = { mode: "merge" };
  if (normalized.bundleMode === "split") {
    grouping =
      normalized.splitMode === "accounts_per_file"
        ? { mode: "chunkSize", chunkSize: normalized.splitValue }
        : { mode: "partCount", partCount: normalized.splitValue };
  }

  return {
    format: normalized.outputFormat,
    grouping,
  };
}

export function estimateOutputFiles(
  accountCount: number,
  state: ConversionFormState,
): number {
  const normalized = normalizeFormState(state);
  if (accountCount < 1) return 0;
  if (normalized.outputFormat === "cpa") return accountCount;
  if (normalized.bundleMode === "merged") return 1;

  if (normalized.splitMode === "file_count") {
    return Math.min(accountCount, normalized.splitValue);
  }

  return Math.ceil(accountCount / normalized.splitValue);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatBatchTimestamp(date: Date): string {
  const part = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    part(date.getMonth() + 1),
    part(date.getDate()),
    "-",
    part(date.getHours()),
    part(date.getMinutes()),
    part(date.getSeconds()),
  ].join("");
}

export function outputFilename(
  timestamp: string,
  format: AccountFormat,
  totalAccounts: number,
  extension: "json" | "zip",
  partIndex?: number,
  partCount?: number,
): string {
  const base = `accounts-${timestamp}-${format}-${totalAccounts}`;
  if (partIndex === undefined || partCount === undefined) {
    return `${base}.${extension}`;
  }
  const width = Math.max(3, String(partCount).length);
  const part = String(partIndex).padStart(width, "0");
  const total = String(partCount).padStart(width, "0");
  return `${base}-part-${part}-of-${total}.${extension}`;
}
