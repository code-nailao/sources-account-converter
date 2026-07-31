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
  grouping: { mode: "customSizes", sizes: [5, 10, 20, 30, 100] },
});
```

上例共有 200 个账号时会生成 `5 / 10 / 20 / 30 / 100 / 35` 六组，未被序列覆盖的 35 个账号自动成为最后一组。若序列中的数量超过剩余账号，则按实际剩余数量生成最后一组并停止；例如 12 个账号使用 `[5, 100, 20]`，结果为 `5 / 7`。

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
- `{ mode: "customSizes", sizes: [5, 10, 20, 30, 100] }`

`customSizes` 规则：

- `sizes` 按数组顺序执行，每项表示该份期望包含的账号数。
- 序列执行完后仍有账号时，剩余账号自动生成最后一份。
- 当前项超过剩余账号时，以剩余数量生成最后一份并停止，不再执行后续项。
- 每项必须是大于 0 的整数。

### `renderArtifacts(accounts, options)`

`format` 支持 `original`、`sub2api`、`cpa`。CPA 输出固定为逐账号 artifact；`grouping` 只记录 ZIP 分组索引，不改变 CPA 文件粒度。

## HTTP 说明

当前网页不提供公共远程 HTTP 转换接口，也不会从浏览器上传文件。文件解析、`customSizes` 分组、格式渲染和 ZIP 打包均在浏览器当前页面内存中完成。若未来需要 HTTP 适配，应由使用方自行部署一个无状态服务，明确文件会发送到该服务，并设置请求体上限、内存处理、访问认证、超时、日志脱敏和处理后立即释放。不能把这种服务描述成“零上传”。
