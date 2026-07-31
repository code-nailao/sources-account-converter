import { describe, expect, it } from "vitest";
import { AccountConverterError, groupAccounts, parseAccountInputs, parseAccounts, renderArtifacts } from "../src/index.js";

const jwt = (subject: string) => `eyJhbGciOiJub25lIn0.eyJzdWIiOiI${subject}In0.signature`;

function subAccount(index: number) {
  return {
    name: `account-${index}`,
    platform: "openai",
    type: "oauth",
    plan_type: "team",
    concurrency: 100,
    priority: 999 - index,
    credentials: {
      access_token: jwt(`access-${index}`),
      refresh_token: `refresh-${index}`,
      id_token: jwt(`id-${index}`),
      email: `user-${index}@example.invalid`,
      chatgpt_account_id: `acct-${index}`,
      chatgpt_user_id: `user-${index}`,
      model_mapping: { "gpt-test": "gpt-test" }
    },
    extra: { privacy_mode: "strict", custom_unknown_field: index }
  };
}

describe("parseAccounts", () => {
  it.each([
    ["single object", JSON.stringify(subAccount(1))],
    ["root array", JSON.stringify([subAccount(1), subAccount(2)])],
    ["accounts", JSON.stringify({ accounts: [subAccount(1), subAccount(2)] })],
    ["items", JSON.stringify({ items: [subAccount(1), subAccount(2)] })],
    ["auths", JSON.stringify({ auths: [subAccount(1), subAccount(2)] })],
    ["data.accounts", JSON.stringify({ data: { accounts: [subAccount(1), subAccount(2)] } })],
    ["JSONL", `${JSON.stringify(subAccount(1))}\n${JSON.stringify(subAccount(2))}\n`]
  ])("parses %s", (_name, input) => {
    const accounts = parseAccounts(input);
    expect(accounts).toHaveLength(input.includes("account-2") ? 2 : 1);
    expect(accounts[0]?.oauth.refreshToken).toBe("refresh-1");
  });

  it("preserves unknown Sub2API account fields and proxy metadata", () => {
    const source = { exported_at: "2026-07-31T00:00:00Z", proxies: [{ id: 1 }], accounts: [subAccount(1)] };
    const [account] = parseAccounts(JSON.stringify(source));
    expect(account?.original).toEqual(subAccount(1));
    expect(account?.sourceProxies).toEqual([{ id: 1 }]);
    expect(account?.sourceExportedAt).toBe(source.exported_at);
  });

  it("globally numbers 200 separate file inputs", () => {
    const accounts = parseAccountInputs(Array.from({ length: 200 }, (_, index) => JSON.stringify(subAccount(index + 1))));
    expect(accounts).toHaveLength(200);
    expect(accounts[0]?.ordinal).toBe(1);
    expect(accounts[199]?.ordinal).toBe(200);
    expect(accounts[199]?.sourcePath).toBe("$input[199]");
  });

  it("reports the bad JSONL line without including its content", () => {
    expect(() => parseAccounts(`${JSON.stringify(subAccount(1))}\nnot-a-secret-safe-json`)).toThrowError(
      expect.objectContaining({ code: "invalid_jsonl", message: "Invalid JSON on line 2" })
    );
  });
});

describe("groupAccounts", () => {
  const accounts = parseAccounts(JSON.stringify({ accounts: Array.from({ length: 200 }, (_, index) => subAccount(index + 1)) }));

  it("splits 200 accounts by accounts per file", () => {
    const groups = groupAccounts(accounts, { mode: "chunkSize", chunkSize: 30 });
    expect(groups.map((group) => group.length)).toEqual([30, 30, 30, 30, 30, 30, 20]);
  });

  it("balances 200 accounts across a target number of files", () => {
    const groups = groupAccounts(accounts, { mode: "partCount", partCount: 6 });
    expect(groups.map((group) => group.length)).toEqual([34, 34, 33, 33, 33, 33]);
  });

  it("does not create empty groups when target parts exceed account count", () => {
    expect(groupAccounts(accounts.slice(0, 2), { mode: "partCount", partCount: 10 }).map((group) => group.length)).toEqual([1, 1]);
  });

  it("splits accounts by a custom sequence and appends the remainder", () => {
    expect(
      groupAccounts(accounts, { mode: "customSizes", sizes: [5, 10, 20, 30, 100] }).map((group) => group.length),
    ).toEqual([5, 10, 20, 30, 100, 35]);
  });

  it("clamps a custom group to the remaining accounts and stops", () => {
    expect(
      groupAccounts(accounts.slice(0, 12), { mode: "customSizes", sizes: [5, 100, 20] }).map((group) => group.length),
    ).toEqual([5, 7]);
  });

  it("rejects invalid grouping values", () => {
    expect(() => groupAccounts(accounts, { mode: "chunkSize", chunkSize: 0 })).toThrow(AccountConverterError);
    expect(() => groupAccounts(accounts, { mode: "partCount", partCount: 1.5 })).toThrow(AccountConverterError);
    expect(() => groupAccounts(accounts, { mode: "customSizes", sizes: [] })).toThrow(AccountConverterError);
    expect(() => groupAccounts(accounts, { mode: "customSizes", sizes: [5, 0] })).toThrow(AccountConverterError);
  });
});

describe("renderArtifacts", () => {
  it("creates directly importable, merged Sub2API output and retains account fields", () => {
    const accounts = parseAccounts(JSON.stringify({ proxies: [], accounts: [subAccount(1), subAccount(2)] }));
    const [artifact] = renderArtifacts(accounts, {
      format: "sub2api",
      grouping: { mode: "merge" },
      generatedAt: "2026-07-31T00:00:00Z",
      exportedAt: "2026-07-31T00:00:00Z"
    });
    const output = JSON.parse(artifact!.content);
    expect(artifact?.filename).toBe("accounts-20260731-000000-sub2api-2.json");
    expect(output.accounts).toHaveLength(2);
    expect(output.accounts[0].credentials.model_mapping).toEqual({ "gpt-test": "gpt-test" });
    expect(output.accounts[0].extra.custom_unknown_field).toBe(1);
  });

  it("creates seven Sub2API artifacts for 200 accounts split by 30", () => {
    const accounts = parseAccounts(JSON.stringify(Array.from({ length: 200 }, (_, index) => subAccount(index + 1))));
    const artifacts = renderArtifacts(accounts, {
      format: "sub2api",
      grouping: { mode: "chunkSize", chunkSize: 30 },
      generatedAt: "2026-07-31T00:00:00Z",
      exportedAt: "2026-07-31T00:00:00Z",
    });
    expect(artifacts).toHaveLength(7);
    expect(artifacts.map((artifact) => artifact.accountCount)).toEqual([30, 30, 30, 30, 30, 30, 20]);
    expect(artifacts[6]?.filename).toBe("accounts-20260731-000000-sub2api-200-part-007-of-007.json");
  });

  it("renders custom Sub2API bundle sizes including the automatic remainder", () => {
    const accounts = parseAccounts(JSON.stringify(Array.from({ length: 200 }, (_, index) => subAccount(index + 1))));
    const artifacts = renderArtifacts(accounts, {
      format: "sub2api",
      grouping: { mode: "customSizes", sizes: [5, 10, 20, 30, 100] },
      generatedAt: "2026-07-31T00:00:00Z",
    });
    expect(artifacts.map((artifact) => artifact.accountCount)).toEqual([5, 10, 20, 30, 100, 35]);
    expect(artifacts[5]?.filename).toBe("accounts-20260731-000000-sub2api-200-part-006-of-006.json");
  });

  it("renders strict CPA as one native JSON artifact per account and carries bundle indexes", () => {
    const accounts = parseAccounts(JSON.stringify({ accounts: [subAccount(1), subAccount(2), subAccount(3)] }));
    const artifacts = renderArtifacts(accounts, {
      format: "cpa",
      grouping: { mode: "partCount", partCount: 2 },
      generatedAt: "2026-07-31T00:00:00Z"
    });
    expect(artifacts).toHaveLength(3);
    expect(artifacts.map((artifact) => artifact.bundleIndex)).toEqual([1, 1, 2]);
    expect(JSON.parse(artifacts[0]!.content)).toMatchObject({
      type: "codex",
      refresh_token: "refresh-1",
      account_id: "acct-1",
      priority: 998
    });
    expect(artifacts[0]?.filename).toBe("accounts-20260731-000000-cpa-3-account-001-of-003.json");
    expect(JSON.parse(artifacts[0]!.content).email).toBe("user-1@example.invalid");
  });

  it("rejects CPA conversion without every real credential and does not expose values in the error", () => {
    const [account] = parseAccounts(JSON.stringify({ access_token: "secret-access", refresh_token: "secret-refresh" }));
    let error: unknown;
    try {
      renderArtifacts([account!], {
        format: "cpa",
        grouping: { mode: "merge" },
        generatedAt: "2026-07-31T00:00:00Z"
      });
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(AccountConverterError);
    expect(error).toMatchObject({ code: "missing_cpa_credentials" });
    expect(String(error)).not.toContain("secret-access");
    expect(String(error)).not.toContain("secret-refresh");
  });

  it("preserves original account objects without format conversion", () => {
    const source = subAccount(1);
    const [account] = parseAccounts(JSON.stringify(source));
    const [artifact] = renderArtifacts([account!], {
      format: "original",
      grouping: { mode: "merge" },
      generatedAt: "2026-07-31T00:00:00Z"
    });
    expect(JSON.parse(artifact!.content)).toEqual(source);
  });

  it("uses stable filenames for repeated renders", () => {
    const accounts = parseAccounts(JSON.stringify({ accounts: [subAccount(1)] }));
    const options = {
      format: "cpa" as const,
      grouping: { mode: "merge" as const },
      generatedAt: "2026-07-31T00:00:00Z"
    };
    expect(renderArtifacts(accounts, options)[0]?.filename).toBe(renderArtifacts(accounts, options)[0]?.filename);
  });

  it("preserves the explicit RFC3339 wall-clock offset in filenames", () => {
    const accounts = parseAccounts(JSON.stringify([subAccount(1)]));
    const [artifact] = renderArtifacts(accounts, {
      format: "sub2api",
      grouping: { mode: "merge" },
      generatedAt: "2026-07-31T18:15:30+08:00"
    });
    expect(artifact?.filename).toBe("accounts-20260731-181530-sub2api-1.json");
  });

  it("ignores unknown filename-like options at runtime", () => {
    const accounts = parseAccounts(JSON.stringify([subAccount(1)]));
    const artifact = renderArtifacts(accounts, {
      format: "original",
      grouping: { mode: "merge" },
      generatedAt: "2026-07-31T18:15:30Z",
      baseName: "uploaded-user@example.invalid"
    } as Parameters<typeof renderArtifacts>[1])[0];
    expect(artifact?.filename).toBe("accounts-20260731-181530-original-1.json");
    expect(artifact?.filename).not.toContain("uploaded");
    expect(artifact?.filename).not.toContain("example");
  });

  it("uses one timestamp and the requested filename contract for 200 CPA accounts", () => {
    const accounts = parseAccounts(JSON.stringify({ accounts: Array.from({ length: 200 }, (_, index) => subAccount(index + 1)) }));
    const artifacts = renderArtifacts(accounts, {
      format: "cpa",
      grouping: { mode: "partCount", partCount: 10 },
      generatedAt: "2026-07-31T12:34:56Z"
    });
    expect(artifacts).toHaveLength(200);
    expect(artifacts[0]?.filename).toBe("accounts-20260731-123456-cpa-200-account-001-of-200.json");
    expect(artifacts[199]?.filename).toBe("accounts-20260731-123456-cpa-200-account-200-of-200.json");
  });

  it("does not duplicate filenames when separately parsed inputs had duplicate ordinals", () => {
    const accounts = [parseAccounts(JSON.stringify(subAccount(1)))[0]!, parseAccounts(JSON.stringify(subAccount(2)))[0]!];
    const artifacts = renderArtifacts(accounts, {
      format: "cpa",
      grouping: { mode: "merge" },
      generatedAt: "2026-07-31T12:34:56Z"
    });
    expect(artifacts.map((artifact) => artifact.filename)).toEqual([
      "accounts-20260731-123456-cpa-2-account-001-of-002.json",
      "accounts-20260731-123456-cpa-2-account-002-of-002.json"
    ]);
  });

  it("rejects an invalid generatedAt without echoing input data", () => {
    const accounts = parseAccounts(JSON.stringify([subAccount(1)]));
    expect(() =>
      renderArtifacts(accounts, { format: "original", grouping: { mode: "merge" }, generatedAt: "not-a-date" })
    ).toThrowError(expect.objectContaining({ code: "invalid_generated_at" }));
  });
});
