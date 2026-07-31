# Sources Account Converter

在浏览器本地完成账号 JSON 的识别、合并、拆分和格式转换。页面不会把账号文件上传到服务器。

在线工具：<https://code-nailao.github.io/sources-account-converter/>

## 功能

- 同时读取一个多账号 JSON，或批量读取多个单账号 JSON。
- 支持 JSON、JSONL 和 NDJSON。
- 识别根数组、`accounts`、`items`、`auths` 和 `data.accounts` 等常见容器。
- 合并为单个文件。
- 按“每份账号数”拆分。
- 按“目标文件数”均匀拆分。
- 输出原始结构、Sub2API 导入格式或 CPA 单账号格式。
- 多文件结果在浏览器内生成 ZIP。

## 文件命名

下载文件只包含生成时间、目标格式、总账号数和分片序号，不使用邮箱、账号 ID、上传文件名或身份哈希：

```text
accounts-20260731-181530-sub2api-200.json
accounts-20260731-181530-sub2api-200-part-001-of-010.json
accounts-20260731-181530-cpa-200-account-001-of-200.json
```

## 隐私边界

- 解析、转换和 ZIP 生成均在当前浏览器页面内完成。
- 页面不使用账号上传接口、分析脚本、Cookie、Local Storage 或 IndexedDB。
- Content Security Policy 禁止页面发起网络连接。
- 页面只显示文件名、格式、数量和脱敏诊断，不显示 Token。
- 浏览器扩展、受感染设备和下载目录不属于本项目可以控制的安全边界。

详细说明见 [SECURITY.md](SECURITY.md)。

## SDK

核心包 `@sources/account-converter-core` 可在浏览器或 Node.js 中使用：

```ts
import {
  parseAccountInputs,
  renderArtifacts,
} from "@sources/account-converter-core";

const accounts = parseAccountInputs(jsonTexts);
const artifacts = renderArtifacts(accounts, {
  format: "sub2api",
  grouping: { mode: "chunkSize", chunkSize: 20 },
});
```

第一版不提供托管 HTTP 转换接口。远程 HTTP 服务无法同时承诺“账号数据不上传服务器”；服务端系统应在自己的可信环境中调用 Node.js 或 Go 实现。

## Go 集成

`go/accountformats` 提供与 TypeScript core 对齐的 Go 实现。两个实现共享 `spec/fixtures` 下的黄金测试向量，商城和其他后端服务应直接依赖该模块，不复制转换规则。

## 开发

```bash
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 check
corepack pnpm@9.15.9 --filter @sources-account-converter/web build
go test ./...
```

本项目使用 MIT License。
