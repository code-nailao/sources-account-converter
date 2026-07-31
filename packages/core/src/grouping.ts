import { AccountConverterError } from "./errors.js";
import type { CanonicalAccount, Grouping } from "./types.js";

function positiveInteger(value: number, field: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new AccountConverterError("invalid_grouping", `${field} must be a positive integer`, { field });
  }
}

export function groupAccounts(accounts: readonly CanonicalAccount[], grouping: Grouping): CanonicalAccount[][] {
  if (accounts.length === 0) return [];
  if (grouping.mode === "merge") return [[...accounts]];

  if (grouping.mode === "chunkSize") {
    positiveInteger(grouping.chunkSize, "chunkSize");
    const groups: CanonicalAccount[][] = [];
    for (let index = 0; index < accounts.length; index += grouping.chunkSize) {
      groups.push(accounts.slice(index, index + grouping.chunkSize));
    }
    return groups;
  }

  positiveInteger(grouping.partCount, "partCount");
  const groupCount = Math.min(grouping.partCount, accounts.length);
  const baseSize = Math.floor(accounts.length / groupCount);
  let remainder = accounts.length % groupCount;
  let offset = 0;
  const groups: CanonicalAccount[][] = [];
  for (let index = 0; index < groupCount; index += 1) {
    const size = baseSize + (remainder > 0 ? 1 : 0);
    remainder -= remainder > 0 ? 1 : 0;
    groups.push(accounts.slice(offset, offset + size));
    offset += size;
  }
  return groups;
}
