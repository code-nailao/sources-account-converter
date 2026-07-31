import { describe, expect, it } from "vitest";
import {
  estimateOutputFiles,
  formatBatchTimestamp,
  normalizeFormState,
  outputFilename,
  previewCustomGrouping,
  toRenderOptions,
  type ConversionFormState,
} from "./conversion";

const splitBySize: ConversionFormState = {
  outputFormat: "sub2api",
  bundleMode: "split",
  splitMode: "accounts_per_file",
  splitValue: 20,
  customSizes: "5,10,20,30,100",
};

describe("conversion form", () => {
  it("estimates chunks by accounts per file", () => {
    expect(estimateOutputFiles(200, splitBySize)).toBe(10);
    expect(estimateOutputFiles(201, splitBySize)).toBe(11);
  });

  it("caps requested file count at the account count", () => {
    expect(
      estimateOutputFiles(3, {
        ...splitBySize,
        splitMode: "file_count",
        splitValue: 10,
      }),
    ).toBe(3);
  });

  it("forces CPA output to native split artifacts", () => {
    const normalized = normalizeFormState({
      ...splitBySize,
      outputFormat: "cpa",
      bundleMode: "merged",
    });

    expect(normalized.bundleMode).toBe("split");
    expect(toRenderOptions(normalized)).toEqual({
      format: "cpa",
      grouping: { mode: "chunkSize", chunkSize: 20 },
    });
  });

  it("normalizes invalid numeric values", () => {
    expect(normalizeFormState({ ...splitBySize, splitValue: 0 }).splitValue).toBe(
      1,
    );
  });

  it("builds custom groups and appends the remaining accounts", () => {
    const state: ConversionFormState = {
      ...splitBySize,
      bundleMode: "split",
      splitMode: "custom_sizes",
      customSizes: "5 / 10，20 30,100",
    };

    expect(previewCustomGrouping(200, state.customSizes)).toEqual({
      requestedSizes: [5, 10, 20, 30, 100],
      outputSizes: [5, 10, 20, 30, 100, 35],
      remaining: 35,
      error: null,
    });
    expect(estimateOutputFiles(200, state)).toBe(6);
    expect(toRenderOptions(state)).toEqual({
      format: "sub2api",
      grouping: { mode: "customSizes", sizes: [5, 10, 20, 30, 100] },
    });
  });

  it("truncates a requested custom group to the remaining accounts", () => {
    const preview = previewCustomGrouping(20, "5,10,20");

    expect(preview.outputSizes).toEqual([5, 10, 5]);
    expect(preview.remaining).toBe(5);
    expect(preview.error).toBeNull();
    expect(previewCustomGrouping(12, "5,100,20").outputSizes).toEqual([5, 7]);
  });

  it("rejects invalid custom group tokens", () => {
    expect(previewCustomGrouping(200, "5,ten,20").error).toBe(
      "“ten”不是有效的正整数",
    );
  });

  it("uses the same deterministic batch naming shape", () => {
    const timestamp = formatBatchTimestamp(new Date(2026, 6, 31, 15, 8, 9));
    expect(timestamp).toBe("20260731-150809");
    expect(outputFilename(timestamp, "sub2api", 200, "json", 2, 10)).toBe(
      "accounts-20260731-150809-sub2api-200-part-002-of-010.json",
    );
    expect(outputFilename(timestamp, "sub2api", 200, "zip")).toBe(
      "accounts-20260731-150809-sub2api-200.zip",
    );
  });
});
