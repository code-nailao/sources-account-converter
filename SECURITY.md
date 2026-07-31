# Security Policy

## Data handling

The hosted web application performs conversion in the browser. It does not intentionally transmit, persist, log, or analyze selected account files.

The production page must keep these controls enabled:

- `connect-src 'none'` in Content Security Policy.
- No analytics, remote fonts, third-party scripts, service workers, or telemetry.
- No `fetch`, `XMLHttpRequest`, `sendBeacon`, WebSocket, form upload, Cookie, Local Storage, or IndexedDB use.
- No credential values in UI summaries, diagnostics, filenames, URLs, or error messages.

The browser runtime, installed extensions, operating system, clipboard, and downloaded files remain outside this project's trust boundary. Use a trusted browser profile and remove generated files when they are no longer needed.

## Supported formats

CPA output is fail-closed. The converter does not invent missing OAuth credentials. A CPA account requires a real access token, refresh token, ID token, and account ID.

Sub2API output preserves native account objects and unknown account fields where possible. Cross-format conversion only emits fields supported by the target format.

## Reporting a vulnerability

Do not include real account credentials, tokens, or private export files in a public issue. Open a security advisory in the GitHub repository with a minimal synthetic reproduction.
