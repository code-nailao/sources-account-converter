import { describe, expect, it } from "vitest";
import vectors from "./fixtures/contract-v1.json";
import { parseAccounts, renderArtifacts } from "../src/index.js";
import type { JsonValue, RenderOptions } from "../src/index.js";

interface ExpectedArtifact {
  filename: string;
  accountCount: number;
  bundleIndex: number;
  bundleCount: number;
  format: "original" | "sub2api" | "cpa";
  json: JsonValue;
}

interface ContractCase {
  name: string;
  input: JsonValue;
  options: RenderOptions;
  expected: ExpectedArtifact[];
}

describe("shared contract fixture vectors", () => {
  for (const vector of vectors.cases as ContractCase[]) {
    it(vector.name, () => {
      const artifacts = renderArtifacts(parseAccounts(vector.input), vector.options);
      expect(
        artifacts.map((artifact) => ({
          filename: artifact.filename,
          accountCount: artifact.accountCount,
          bundleIndex: artifact.bundleIndex,
          bundleCount: artifact.bundleCount,
          format: artifact.format,
          json: JSON.parse(artifact.content) as JsonValue
        }))
      ).toEqual(vector.expected);
    });
  }
});
