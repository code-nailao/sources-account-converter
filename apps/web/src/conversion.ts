import type { Grouping, OutputFormat, RenderOptions } from "@sources/account-converter-core";

export type AccountFormat = Extract<OutputFormat, "sub2api" | "cpa">;
export type BundleMode = "merged" | "split";
export type SplitMode = "accounts_per_file" | "file_count" | "custom_sizes";

export interface ConversionFormState {
  outputFormat: AccountFormat;
  bundleMode: BundleMode;
  splitMode: SplitMode;
  splitValue: number;
  customSizes: string;
}

export interface CustomGroupingPreview {
  requestedSizes: number[];
  outputSizes: number[];
  remaining: number;
  error: string | null;
}

export const DEFAULT_FORM_STATE: ConversionFormState = {
  outputFormat: "sub2api",
  bundleMode: "merged",
  splitMode: "accounts_per_file",
  splitValue: 20,
  customSizes: "5,10,20,30,100",
};

export function normalizeFormState(
  state: ConversionFormState,
): ConversionFormState {
  const outputFormat = state.outputFormat;
  const bundleMode = outputFormat === "cpa" ? "split" : state.bundleMode;

  return {
    outputFormat,
    bundleMode,
    splitMode: outputFormat === "cpa" ? "accounts_per_file" : state.splitMode,
    splitValue: Math.max(1, Math.floor(Number(state.splitValue) || 1)),
    customSizes: state.customSizes,
  };
}

export function previewCustomGrouping(
  accountCount: number,
  value: string,
): CustomGroupingPreview {
  const tokens = value
    .trim()
    .split(/[,，\/／\s]+/u)
    .filter(Boolean);

  if (tokens.length === 0) {
    return {
      requestedSizes: [],
      outputSizes: [],
      remaining: Math.max(0, accountCount),
      error: "请输入至少一个分组数量",
    };
  }

  const requestedSizes: number[] = [];
  for (const token of tokens) {
    if (!/^\d+$/u.test(token)) {
      return {
        requestedSizes,
        outputSizes: [],
        remaining: Math.max(0, accountCount),
        error: `“${token}”不是有效的正整数`,
      };
    }

    const size = Number(token);
    if (!Number.isSafeInteger(size) || size <= 0) {
      return {
        requestedSizes,
        outputSizes: [],
        remaining: Math.max(0, accountCount),
        error: "分组数量必须是安全的正整数",
      };
    }
    requestedSizes.push(size);
  }

  const safeAccountCount = Math.max(0, Math.floor(accountCount));
  const outputSizes: number[] = [];
  let unallocated = safeAccountCount;
  let automaticRemainder = 0;
  for (const requestedSize of requestedSizes) {
    if (unallocated === 0) break;
    const actualSize = Math.min(requestedSize, unallocated);
    if (requestedSize > unallocated) automaticRemainder = unallocated;
    outputSizes.push(actualSize);
    unallocated -= actualSize;
  }
  if (unallocated > 0) {
    automaticRemainder = unallocated;
    outputSizes.push(unallocated);
  }

  return {
    requestedSizes,
    outputSizes,
    remaining: automaticRemainder,
    error: null,
  };
}

export function toRenderOptions(
  state: ConversionFormState,
): RenderOptions {
  const normalized = normalizeFormState(state);
  let grouping: Grouping = { mode: "merge" };
  if (normalized.bundleMode === "split") {
    if (normalized.splitMode === "custom_sizes") {
      const custom = previewCustomGrouping(0, normalized.customSizes);
      if (custom.error) throw new Error(custom.error);
      grouping = { mode: "customSizes", sizes: custom.requestedSizes };
    } else {
      grouping =
        normalized.splitMode === "accounts_per_file"
          ? { mode: "chunkSize", chunkSize: normalized.splitValue }
          : { mode: "partCount", partCount: normalized.splitValue };
    }
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

  if (normalized.splitMode === "custom_sizes") {
    const preview = previewCustomGrouping(
      accountCount,
      normalized.customSizes,
    );
    return preview.error ? 0 : preview.outputSizes.length;
  }

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
