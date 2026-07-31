# Sub2API / CPA 转换与分号器

Sub2API / CPA 转换与分号器是一个本地优先的账号文件转换工具。网页端把文件读取到当前浏览器内存，调用 `@sources/account-converter-core` 完成解析、分组和渲染，再用浏览器生成下载文件。

网页支持合并、固定每份数量、均分为指定份数和自定义数量序列。自定义序列按输入顺序执行，例如 200 个账号使用 `5,10,20,30,100`，生成 `5 / 10 / 20 / 30 / 100 / 35`；最后的 35 个账号由系统自动归为一份。若某项超过剩余数量，则以剩余数量生成最后一份并停止，例如 12 个账号使用 `5,100,20`，生成 `5 / 7`。

## 目录

- `apps/web/`：静态网页应用，包含转换工具、API / SDK 说明和隐私说明。
- `packages/core/`：解析、分组和格式渲染核心，供浏览器与 Node.js SDK 共用。

## 命名规则

产物名不使用上传文件名、邮箱、账号 ID 或任何凭据。每次运行生成一个批次时间戳：

```text
accounts-{YYYYMMDD-HHmmss}-{format}-{total}.json
accounts-{YYYYMMDD-HHmmss}-{format}-{total}-part-001-of-010.json
accounts-{YYYYMMDD-HHmmss}-{format}-{total}.zip
```

网页预览、单个 JSON、ZIP 内文件与 ZIP 文件名共享同一批次时间戳和账号总数。

## 运行边界

网页的文件读取、账号解析、自定义分份、格式转换和 ZIP 生成全部在当前浏览器本地完成。网页不请求远程转换接口，也不使用 analytics、Service Worker、Cookie、localStorage 或 IndexedDB。需要 Node.js 集成时，直接在调用方自己的进程内使用 core。任何 HTTP 服务都意味着文件离开调用方，不能宣称为“远程零上传”。
