import { AccountConverterError } from "./errors.js";
import type { CanonicalAccount, JsonObject, JsonValue, OAuthView, SourceFormat } from "./types.js";

interface ParseContext {
  path: string;
  proxies?: JsonValue[];
  exportedAt?: string;
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: JsonValue | undefined): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function firstString(objects: JsonObject[], keys: string[]): string | undefined {
  for (const object of objects) {
    for (const key of keys) {
      const value = nonEmptyString(object[key]);
      if (value !== undefined) return value;
    }
  }
  return undefined;
}

function credentialsOf(account: JsonObject): JsonObject | undefined {
  return isObject(account.credentials) ? account.credentials : undefined;
}

function oauthView(account: JsonObject): OAuthView {
  const credentials = credentialsOf(account);
  const extra = isObject(account.extra) ? account.extra : undefined;
  const sources = [credentials, account, extra].filter((value): value is JsonObject => value !== undefined);
  return {
    accessToken: firstString(sources, ["access_token", "accessToken"]),
    refreshToken: firstString(sources, ["refresh_token", "refreshToken"]),
    idToken: firstString(sources, ["id_token", "idToken"]),
    accountId: firstString(sources, ["account_id", "chatgpt_account_id", "accountId"]),
    userId: firstString(sources, ["user_id", "chatgpt_user_id", "userId"]),
    email: firstString(sources, ["email"]),
    planType: firstString(sources, ["plan_type", "planType"])
  };
}

function detectSourceFormat(account: JsonObject): SourceFormat {
  if (isObject(account.credentials) || "platform" in account || "concurrency" in account) return "sub2api";
  if (
    nonEmptyString(account.access_token) !== undefined ||
    nonEmptyString(account.refresh_token) !== undefined ||
    nonEmptyString(account.id_token) !== undefined
  ) {
    return "cpa";
  }
  return "unknown";
}

function parseText(input: string): JsonValue[] {
  const trimmed = input.trim();
  if (trimmed === "") throw new AccountConverterError("empty_input", "Input is empty");

  try {
    return [JSON.parse(trimmed) as JsonValue];
  } catch {
    const values: JsonValue[] = [];
    const lines = input.split(/\r?\n/u);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]?.trim() ?? "";
      if (line === "") continue;
      try {
        values.push(JSON.parse(line) as JsonValue);
      } catch {
        throw new AccountConverterError("invalid_jsonl", `Invalid JSON on line ${index + 1}`, { line: index + 1 });
      }
    }
    if (values.length === 0) throw new AccountConverterError("empty_input", "Input is empty");
    return values;
  }
}

function extract(value: JsonValue, context: ParseContext, output: CanonicalAccount[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => extract(item, { ...context, path: `${context.path}[${index}]` }, output));
    return;
  }
  if (!isObject(value)) {
    throw new AccountConverterError("unsupported_value", `Expected an account object at ${context.path}`, {
      path: context.path
    });
  }

  const proxies = Array.isArray(value.proxies) ? value.proxies : context.proxies;
  const exportedAt = nonEmptyString(value.exported_at) ?? context.exportedAt;
  const data = isObject(value.data) ? value.data : undefined;
  const containers: Array<[string, JsonValue[] | undefined]> = [
    ["accounts", Array.isArray(value.accounts) ? value.accounts : undefined],
    ["items", Array.isArray(value.items) ? value.items : undefined],
    ["auths", Array.isArray(value.auths) ? value.auths : undefined],
    ["data.accounts", data && Array.isArray(data.accounts) ? data.accounts : undefined]
  ];
  const container = containers.find((entry) => entry[1] !== undefined);
  if (container?.[1]) {
    container[1].forEach((item, index) => {
      extract(
        item,
        {
          path: `${context.path}.${container[0]}[${index}]`,
          ...(proxies ? { proxies } : {}),
          ...(exportedAt ? { exportedAt } : {})
        },
        output
      );
    });
    return;
  }

  output.push({
    ordinal: output.length + 1,
    sourceFormat: detectSourceFormat(value),
    sourcePath: context.path,
    original: structuredClone(value),
    oauth: oauthView(value),
    ...(proxies ? { sourceProxies: structuredClone(proxies) } : {}),
    ...(exportedAt ? { sourceExportedAt: exportedAt } : {})
  });
}

export function parseAccounts(input: string | JsonValue): CanonicalAccount[] {
  const values = typeof input === "string" ? parseText(input) : [input];
  const accounts: CanonicalAccount[] = [];
  values.forEach((value, index) => extract(value, { path: values.length === 1 ? "$" : `$line[${index + 1}]` }, accounts));
  if (accounts.length === 0) throw new AccountConverterError("no_accounts", "No accounts were found");
  return accounts;
}

export function parseAccountInputs(inputs: readonly (string | JsonValue)[]): CanonicalAccount[] {
  if (inputs.length === 0) throw new AccountConverterError("empty_input", "Input is empty");
  const accounts: CanonicalAccount[] = [];
  inputs.forEach((input, inputIndex) => {
    for (const account of parseAccounts(input)) {
      accounts.push({
        ...account,
        ordinal: accounts.length + 1,
        sourcePath: `$input[${inputIndex}]${account.sourcePath.slice(1)}`
      });
    }
  });
  return accounts;
}
