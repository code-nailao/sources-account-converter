import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const forbidden = ["fetch", "XMLHttpRequest", "WebSocket", "localStorage"];

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : entry.name.endsWith(".ts") ? [path] : [];
  });
}

describe("offline-only core", () => {
  it("contains no network or persistent browser storage APIs", () => {
    const sourceRoot = new URL("../src", import.meta.url).pathname;
    const violations = sourceFiles(sourceRoot).flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return forbidden.filter((identifier) => new RegExp(`\\b${identifier}\\b`, "u").test(source)).map((identifier) => ({ file, identifier }));
    });
    expect(violations).toEqual([]);
  });

  it("declares no runtime dependencies", () => {
    const packagePath = new URL("../package.json", import.meta.url);
    const manifest = JSON.parse(readFileSync(packagePath, "utf8")) as { dependencies?: Record<string, string> };
    expect(manifest.dependencies ?? {}).toEqual({});
  });
});
