# API / SDK 接入说明

## 浏览器 SDK

浏览器 SDK 直接接收 `File` 内容，整个过程在调用方页面内完成。网页应用使用的调用链是：

```ts
import {
  parseAccounts,
  renderArtifacts,
} from "@sources/account-converter-core";

const batches = await Promise.all(
  [...fileInput.files].map(async (file) => parseAccounts(await file.text())),
);
const accounts = batches
  .flat()
  .map((account, index) => ({ ...account, ordinal: index + 1 }));

const artifacts = renderArtifacts(accounts, {
  format: "sub2api",
  grouping: { mode: "chunkSize", chunkSize: 20 },
});
```

页面层接下来会把 `artifacts[]` 变成下载：

- 一个 artifact：直接下载 JSON。
- 多个 artifact：使用浏览器内存打成一个 ZIP。
- CPA：core 始终生成一个账号一个 JSON；多个账号只通过 ZIP 交付，不会把账号拼成 CPA 根数组。

## Node.js SDK

```ts
import { readFile, writeFile } from "node:fs/promises";
import {
  parseAccounts,
  renderArtifacts,
} from "@sources/account-converter-core";

const accounts = parseAccounts(await readFile("accounts.json", "utf8"));
const artifacts = renderArtifacts(accounts, {
  format: "cpa",
  grouping: { mode: "merge" },
});

await Promise.all(
  artifacts.map((artifact) => writeFile(artifact.filename, artifact.content)),
);
```

Node.js 调用方负责文件读取、输出目录和权限控制。不要把凭据写入日志、错误信息、公共仓库或文件名。

## 接口约定

### `parseAccounts(input)`

接收 JSON 字符串、JSONL 字符串或解析后的 JSON 值，返回 `CanonicalAccount[]`。支持 Sub2API 容器、CPA 单账号、数组和常见 `accounts`/`items`/`auths` 容器。

### `groupAccounts(accounts, grouping)`

支持：

- `{ mode: "merge" }`
- `{ mode: "chunkSize", chunkSize: 20 }`
- `{ mode: "partCount", partCount: 10 }`

### `renderArtifacts(accounts, options)`

`format` 支持 `original`、`sub2api`、`cpa`。CPA 输出固定为逐账号 artifact；`grouping` 只记录 ZIP 分组索引，不改变 CPA 文件粒度。

## HTTP 说明

当前网页不提供公共远程 HTTP 转换接口，也不会从浏览器上传文件。若未来需要 HTTP 适配，应由使用方自行部署一个无状态服务，明确文件会发送到该服务，并设置请求体上限、内存处理、访问认证、超时、日志脱敏和处理后立即释放。不能把这种服务描述成“零上传”。
