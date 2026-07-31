# Account format contract fixtures

`contract-v1.json` is the language-neutral contract for the Go package and the
TypeScript core. It contains only synthetic credentials. None of the values can
authenticate against a real service.

Consumers should:

1. parse each `input` without changing account order;
2. apply `options.grouping`;
3. render one JSON artifact per expected entry;
4. compare parsed JSON values instead of whitespace;
5. return the listed stable error code for `errorCases`.

`timestamp` is mandatory RFC3339 input. It controls filenames. `exportedAt`
controls the Sub2API document field and defaults to `timestamp`. No filename may
be derived from an input filename, email, account ID, token, or hash.
