# 隐私与安全边界

## 网页端

- 账号文件只在浏览器当前页面内存中读取。
- 页面不使用 `fetch`、`XMLHttpRequest`、表单上传或远程转换接口。
- 页面不注册 Service Worker，不使用 analytics，不写 Cookie、localStorage、sessionStorage 或 IndexedDB。
- CSP 至少包含 `connect-src 'none'`；`blob:` 仅用于当前页面生成下载文件。
- UI 只展示文件名、格式、账号数量和安全诊断，不展示 access token、refresh token、id token、邮箱或账号 ID。
- 清空文件、切换到其他页面或关闭窗口时释放 core 侧引用。

## 文件名

文件名始终使用批次时间戳和数量，不使用输入文件名或账号身份：

```text
accounts-20260731-150809-sub2api-200.json
accounts-20260731-150809-sub2api-200-part-002-of-010.json
accounts-20260731-150809-cpa-200.zip
```

## 使用者责任

本地处理不能抵御受感染的操作系统、浏览器扩展或恶意脚本。建议在可信浏览器中运行，处理完成后删除下载目录中的临时文件。

Node.js SDK 的安全边界由运行它的主机决定。任何服务器 HTTP 接口都会接收文件，必须如实告知调用方，不能宣传为远程零上传。
