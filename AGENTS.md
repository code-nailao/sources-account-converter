# AGENTS.md

## Product boundary

- This repository is an offline-first account converter, not a hosted credential-processing API.
- The static web application must process selected files entirely in the browser.
- Do not add analytics, telemetry, remote assets, service workers, browser storage, or network requests.
- Keep `connect-src 'none'` in the production Content Security Policy.

## Compatibility

- Real Sub2API exports with `exported_at`, `proxies`, and `accounts` are the compatibility baseline.
- `type` and `version` headers are optional for backward compatibility.
- CPA output is one account per JSON and must fail when required real OAuth fields are absent.
- TypeScript and Go implementations must pass the same golden fixtures in `spec/fixtures`.

## Privacy

- Never expose credentials in UI text, logs, diagnostics, tests, filenames, URLs, or snapshots.
- Use synthetic tokens in fixtures.
- Output filenames use the fixed `accounts` prefix, generation timestamp, format, total account count, and sequence only.
- Never derive output filenames from uploaded filenames, email, account ID, or identity hashes.

## Verification

```bash
corepack pnpm@9.15.9 check
corepack pnpm@9.15.9 --filter @sources-account-converter/web build
go test ./...
```
