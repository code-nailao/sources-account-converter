import { AccountConverterError } from "./errors.js";
import { groupAccounts } from "./grouping.js";
import type { Artifact, CanonicalAccount, JsonObject, JsonValue, OAuthView, RenderOptions } from "./types.js";

function isObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function tokenLooksReal(value: string | undefined, jwt: boolean): value is string {
  if (!value || value.trim() === "") return false;
  if (/^(?:placeholder|mock|fake|your[_-]?token|xxx|null|undefined)$/iu.test(value.trim())) return false;
  return !jwt || value.split(".").length === 3;
}

interface StrictOAuth extends OAuthView {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accountId: string;
}

function requireCPAFields(account: CanonicalAccount): StrictOAuth {
  const missing: string[] = [];
  if (!tokenLooksReal(account.oauth.accessToken, true)) missing.push("access_token");
  if (!tokenLooksReal(account.oauth.refreshToken, false)) missing.push("refresh_token");
  if (!tokenLooksReal(account.oauth.idToken, true)) missing.push("id_token");
  if (!tokenLooksReal(account.oauth.accountId, false)) missing.push("account_id");
  if (missing.length > 0) {
    throw new AccountConverterError("missing_cpa_credentials", `Account ${account.ordinal} cannot be converted to CPA`, {
      account: account.ordinal,
      missing
    });
  }
  return {
    ...account.oauth,
    accessToken: account.oauth.accessToken!,
    refreshToken: account.oauth.refreshToken!,
    idToken: account.oauth.idToken!,
    accountId: account.oauth.accountId!
  };
}

function toCPA(account: CanonicalAccount): JsonObject {
  const oauth = requireCPAFields(account);
  const original = account.original;
  const credentials = isObject(original.credentials) ? original.credentials : undefined;
  const result: JsonObject = {
    type: typeof original.type === "string" && original.type !== "oauth" ? original.type : "codex",
    access_token: oauth.accessToken,
    refresh_token: oauth.refreshToken,
    id_token: oauth.idToken,
    account_id: oauth.accountId
  };
  if (oauth.email) result.email = oauth.email;
  if (typeof original.priority === "number") result.priority = original.priority;
  if (typeof original.disabled === "boolean") result.disabled = original.disabled;
  for (const key of ["last_refresh", "expired", "proxy_url", "weight"] as const) {
    const value = original[key] ?? credentials?.[key];
    if (value !== undefined) result[key] = clone(value);
  }
  return result;
}

function toSub2API(account: CanonicalAccount, outputOrdinal: number): JsonObject {
  const emailName = account.oauth.email?.trim();
  if (account.sourceFormat === "sub2api" && isObject(account.original.credentials)) {
    const result = clone(account.original);
    if (emailName) result.name = emailName;
    return result;
  }
  const oauth = requireCPAFields(account);
  const credentials: JsonObject = {
    access_token: oauth.accessToken,
    refresh_token: oauth.refreshToken,
    id_token: oauth.idToken,
    chatgpt_account_id: oauth.accountId
  };
  if (oauth.userId) credentials.chatgpt_user_id = oauth.userId;
  if (oauth.email) credentials.email = oauth.email;
  if (oauth.planType) credentials.plan_type = oauth.planType;
  return {
    name: emailName || `codex-account-${String(outputOrdinal).padStart(3, "0")}`,
    platform: "openai",
    type: "oauth",
    credentials,
    ...(oauth.planType ? { plan_type: oauth.planType } : {}),
    ...(typeof account.original.priority === "number" ? { priority: account.original.priority } : {}),
    ...(oauth.email ? { extra: { email: oauth.email } } : {})
  };
}

function stableStringify(value: JsonValue): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key] as JsonValue)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function uniqueProxies(accounts: readonly CanonicalAccount[]): JsonValue[] {
  const seen = new Set<string>();
  const proxies: JsonValue[] = [];
  for (const account of accounts) {
    for (const proxy of account.sourceProxies ?? []) {
      const key = stableStringify(proxy);
      if (!seen.has(key)) {
        seen.add(key);
        proxies.push(clone(proxy));
      }
    }
  }
  return proxies;
}

function pad(value: number, total: number): string {
  return String(value).padStart(Math.max(3, String(total).length), "0");
}

function filenameTimestamp(value: string): string {
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    throw new AccountConverterError("invalid_generated_at", "generatedAt must be a valid date-time");
  }
  // Keep an explicit RFC3339 offset's wall-clock value in the filename so the
  // TypeScript and Go implementations agree on the shared contract vectors.
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/u);
  if (match) return `${match[1]}${match[2]}${match[3]}-${match[4]}${match[5]}${match[6]}`;
  const year = timestamp.getUTCFullYear();
  const month = String(timestamp.getUTCMonth() + 1).padStart(2, "0");
  const day = String(timestamp.getUTCDate()).padStart(2, "0");
  const hours = String(timestamp.getUTCHours()).padStart(2, "0");
  const minutes = String(timestamp.getUTCMinutes()).padStart(2, "0");
  const seconds = String(timestamp.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

export function renderArtifacts(accounts: readonly CanonicalAccount[], options: RenderOptions): Artifact[] {
  if (accounts.length === 0) throw new AccountConverterError("no_accounts", "No accounts were provided");
  const groups = groupAccounts(accounts, options.grouping);
  const indent = options.indent ?? 2;
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const timestamp = filenameTimestamp(generatedAt);
  const totalAccounts = accounts.length;

  if (options.format === "cpa") {
    const artifacts: Artifact[] = [];
    let accountNumber = 0;
    groups.forEach((group, bundleIndex) => {
      group.forEach((account) => {
        accountNumber += 1;
        artifacts.push({
          filename: `accounts-${timestamp}-cpa-${totalAccounts}-account-${pad(accountNumber, totalAccounts)}-of-${pad(totalAccounts, totalAccounts)}.json`,
          mediaType: "application/json",
          content: JSON.stringify(toCPA(account), null, indent),
          accountCount: 1,
          bundleIndex: bundleIndex + 1,
          bundleCount: groups.length,
          format: "cpa"
        });
      });
    });
    return artifacts;
  }

  let accountNumber = 0;
  return groups.map((group, index) => {
    let payload: JsonValue;
    if (options.format === "sub2api") {
      payload = {
        exported_at: options.exportedAt ?? group[0]?.sourceExportedAt ?? generatedAt,
        proxies: uniqueProxies(group),
        accounts: group.map((account) => {
          accountNumber += 1;
          return toSub2API(account, accountNumber);
        })
      };
    } else {
      payload = group.length === 1 ? clone(group[0]!.original) : group.map((account) => clone(account.original));
    }
    return {
      filename:
        groups.length === 1
          ? `accounts-${timestamp}-${options.format}-${totalAccounts}.json`
          : `accounts-${timestamp}-${options.format}-${totalAccounts}-part-${pad(index + 1, groups.length)}-of-${pad(groups.length, groups.length)}.json`,
      mediaType: "application/json" as const,
      content: JSON.stringify(payload, null, indent),
      accountCount: group.length,
      bundleIndex: index + 1,
      bundleCount: groups.length,
      format: options.format
    };
  });
}
