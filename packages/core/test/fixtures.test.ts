import { describe, expect, it } from "vitest";
import vectors from "./fixtures/contract-v1.json";
import accountNameVectors from "../../../spec/fixtures/account-name-v1.json";
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
  options: RenderOptions & { timestamp?: string };
  expected: ExpectedArtifact[];
}

describe("shared contract fixture vectors", () => {
  for (const vector of [...vectors.cases, ...accountNameVectors.cases] as ContractCase[]) {
    it(vector.name, () => {
      const accounts = parseAccounts(vector.input);
      const originals = structuredClone(accounts.map((account) => account.original));
      const artifacts = renderArtifacts(accounts, {
        ...vector.options,
        ...(vector.options.timestamp ? { generatedAt: vector.options.timestamp } : {})
      });
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
      expect(accounts.map((account) => account.original)).toEqual(originals);
    });
  }
});
