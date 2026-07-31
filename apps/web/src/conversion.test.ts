import { describe, expect, it } from "vitest";
import {
  estimateOutputFiles,
  formatBatchTimestamp,
  normalizeFormState,
  outputFilename,
  toRenderOptions,
  type ConversionFormState,
} from "./conversion";

const splitBySize: ConversionFormState = {
  outputFormat: "sub2api",
  bundleMode: "split",
  splitMode: "accounts_per_file",
  splitValue: 20,
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
