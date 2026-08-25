import {
  ArrowRightLeft,
  Braces,
  Check,
  ChevronRight,
  ClipboardPaste,
  Code2,
  Download,
  FileArchive,
  FileJson,
  Files,
  Github,
  Info,
  LockKeyhole,
  Moon,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sun,
  Trash2,
  UploadCloud,
  createIcons,
} from "lucide";
import {
  AccountConverterError,
  parseAccounts,
  renderArtifacts,
  type Artifact,
  type CanonicalAccount,
  type SourceFormat,
} from "@sources/account-converter-core";
import { strToU8, zipSync } from "fflate";
import {
  DEFAULT_FORM_STATE,
  estimateOutputFiles,
  formatBatchTimestamp,
  formatFileSize,
  normalizeFormState,
  outputFilename,
  previewCustomGrouping,
  toRenderOptions,
  type ConversionFormState,
} from "./conversion";
import "./styles.css";

type Route = "convert" | "api" | "privacy";
type InputMode = "file" | "paste";
type Theme = "light" | "dark";
type InputBatch = {
  id: number;
  kind: InputMode;
  name: string;
  byteSize: number;
  accounts: CanonicalAccount[];
  format: SourceFormat | "mixed";
};

const MAX_FILES = 5_000;
const MAX_TOTAL_BYTES = 256 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".json", ".jsonl", ".ndjson"];

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app root");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let theme: Theme = systemTheme.matches ? "dark" : "light";
let themeOverridden = false;
let inputBatches: InputBatch[] = [];
let accounts: CanonicalAccount[] = [];
let inputMode: InputMode = "file";
let pastedDraft = "";
let nextBatchId = 1;
let nextPasteNumber = 1;
let formState: ConversionFormState = { ...DEFAULT_FORM_STATE };
let batchTimestamp = formatBatchTimestamp(new Date());
let busy = false;
let statusMessage = "等待添加账号";
let statusKind: "neutral" | "success" | "error" = "neutral";

const iconSet = {
  ArrowRightLeft,
  Braces,
  Check,
  ChevronRight,
  ClipboardPaste,
  Code2,
  Download,
  FileArchive,
  FileJson,
  Files,
  Github,
  Info,
  LockKeyhole,
  Moon,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sun,
  Trash2,
  UploadCloud,
};

function getRoute(): Route {
  const route = window.location.hash.replace(/^#\/?/, "");
  if (route === "api" || route === "privacy") return route;
  return "convert";
}

function navLink(route: Route, label: string, icon: string): string {
  const active = getRoute() === route;
  return `
    <a class="nav-link${active ? " is-active" : ""}" href="#/${route}" ${active ? 'aria-current="page"' : ""}>
      <i data-lucide="${icon}" aria-hidden="true"></i>
      <span>${label}</span>
    </a>
  `;
}

function appShell(content: string): string {
  const themeLabel = theme === "dark" ? "切换到日间模式" : "切换到夜间模式";
  return `
    <div class="workspace">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-top">
          <div class="brand-row">
            <a class="brand" href="#/convert" aria-label="Sub2API / CPA 转换与分号器首页">
              <span class="brand-mark"><i data-lucide="refresh-cw" aria-hidden="true"></i></span>
              <span class="brand-copy"><strong>Sub2API / CPA</strong><small>转换与分号器</small></span>
            </a>
            <button class="theme-toggle" id="theme-toggle" type="button" title="${themeLabel}" aria-label="${themeLabel}" aria-pressed="${theme === "dark"}">
              <i data-lucide="${theme === "dark" ? "sun" : "moon"}" aria-hidden="true"></i>
            </button>
          </div>
          <nav>
            ${navLink("convert", "转换工具", "files")}
            ${navLink("api", "API / SDK", "code-2")}
            ${navLink("privacy", "隐私说明", "shield-check")}
          </nav>
        </div>
        <div class="sidebar-footer">
          <div class="local-status">
            <span class="status-dot" aria-hidden="true"></span>
            本地处理
          </div>
          <a class="repository-link" href="https://github.com/code-nailao/sources-account-converter" target="_blank" rel="noreferrer">
            <i data-lucide="github" aria-hidden="true"></i>
            开源仓库
          </a>
          <div class="sidebar-note">
            <i data-lucide="lock-keyhole" aria-hidden="true"></i>
            <span>账号数据仅在当前页面内存中处理</span>
          </div>
        </div>
      </aside>
      <main class="main-content"><div class="content-frame">${content}</div></main>
    </div>
  `;
}

function pageHeader(eyebrow: string, title: string, description: string): string {
  return `
    <div class="page-header">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    </div>
  `;
}

function formatLabel(format: string): string {
  const labels: Record<string, string> = {
    sub2api: "Sub2API",
    cpa: "CPA",
    mixed: "混合格式",
    unknown: "待识别",
  };
  return labels[format] ?? "待识别";
}

function redactMessage(message: string): string {
  return message
    .replace(/[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/g, "[令牌已隐藏]")
    .replace(/(Bearer\s+)[^\s,;]+/gi, "$1[已隐藏]")
    .replace(/((?:access|refresh|id)[_-]?token\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]");
}

function escapeHTML(value: string): string {
  return value.replace(
    /[&<>"']/gu,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function inputRows(): string {
  if (inputBatches.length === 0) {
    return `<div class="empty-files">尚未添加账号</div>`;
  }

  return `<div class="file-list" id="input-list" role="list"></div>`;
}

function renderInputRows(): void {
  const container = document.querySelector<HTMLDivElement>("#input-list");
  if (!container) return;

  inputBatches.forEach((batch) => {
    const row = document.createElement("div");
    row.className = "file-row";
    row.setAttribute("role", "listitem");

    const icon = document.createElement("span");
    icon.className = "file-icon";
    icon.innerHTML = `<i data-lucide="${batch.kind === "paste" ? "clipboard-paste" : "file-json"}" aria-hidden="true"></i>`;

    const details = document.createElement("div");
    details.className = "file-details";
    const name = document.createElement("strong");
    name.textContent = batch.name;
    const meta = document.createElement("span");
    meta.textContent = `${formatLabel(batch.format)} · ${batch.accounts.length} 个账号 · ${formatFileSize(batch.byteSize)}`;
    details.append(name, meta);

    const remove = document.createElement("button");
    remove.className = "icon-button";
    remove.type = "button";
    remove.title = "移除输入";
    remove.setAttribute("aria-label", `移除 ${batch.name}`);
    remove.dataset.removeBatch = String(batch.id);
    remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>';

    row.append(icon, details, remove);
    container.append(row);
  });
}

function sourceFormatSummary(): string {
  const formats = new Set(inputBatches.map((batch) => batch.format));
  if (formats.size === 0) return "自动识别";
  return [...formats].map(formatLabel).join(" + ");
}

function customGroupPreview(accountCount: number, value: string): string {
  const preview = previewCustomGrouping(accountCount, value);
  if (preview.error) {
    return `<p class="custom-error" id="custom-error">${escapeHTML(preview.error)}</p>`;
  }
  if (accountCount === 0) {
    return `<p class="custom-empty" id="custom-error">添加账号后显示实际分组</p>`;
  }

  return `
    <div class="group-preview" id="custom-error" aria-label="分组预览">
      <span class="group-preview-label">将生成</span>
      <div class="group-size-list">
        ${preview.outputSizes
          .map(
            (size, index) =>
              `<span class="group-size${preview.remaining > 0 && index === preview.outputSizes.length - 1 ? " is-remainder" : ""}">${size}</span>`,
          )
          .join("")}
      </div>
      ${preview.remaining > 0 ? `<small>剩余 ${preview.remaining} 个自动成组</small>` : ""}
    </div>
  `;
}

function conversionView(): string {
  const normalized = normalizeFormState(formState);
  const accountCount = accounts.length;
  const outputCount = estimateOutputFiles(accountCount, normalized);
  const isSplit = normalized.bundleMode === "split";
  const isCPA = normalized.outputFormat === "cpa";
  const isCustom =
    !isCPA && isSplit && normalized.splitMode === "custom_sizes";
  const customPreview = isCustom
    ? previewCustomGrouping(accountCount, normalized.customSizes)
    : null;
  const hasFormError = Boolean(customPreview?.error);
  const downloadType = outputCount > 1 ? "ZIP" : "JSON";
  const previewName =
    accountCount === 0
      ? "添加账号后显示"
      : hasFormError
        ? "请修正自定义分组"
        : outputFilename(
            batchTimestamp,
            normalized.outputFormat,
            accountCount,
            outputCount > 1 ? "zip" : "json",
          );

  return `
    ${pageHeader(
      "ACCOUNT TOOLKIT",
      "Sub2API / CPA 转换与分号器",
      "合并、拆分和格式转换都在当前浏览器中完成。",
    )}
    <section class="converter-layout" aria-label="账号转换工具">
      <div class="converter-main">
        <div class="section-heading">
          <div>
            <span class="step-index">1</span>
            <h2>添加账号</h2>
          </div>
          ${
            inputBatches.length > 0
              ? `<div class="section-actions">
                  <button class="icon-button danger-button" id="clear-inputs" type="button" title="清空全部输入" aria-label="清空全部输入"><i data-lucide="trash-2" aria-hidden="true"></i></button>
                </div>`
              : ""
          }
        </div>
        <div class="input-methods" role="tablist" aria-label="账号添加方式">
          <button id="file-mode" type="button" role="tab" aria-selected="${inputMode === "file"}" data-input-mode="file" class="${inputMode === "file" ? "is-selected" : ""}">
            <i data-lucide="upload-cloud" aria-hidden="true"></i>上传文件
          </button>
          <button id="paste-mode" type="button" role="tab" aria-selected="${inputMode === "paste"}" data-input-mode="paste" class="${inputMode === "paste" ? "is-selected" : ""}">
            <i data-lucide="clipboard-paste" aria-hidden="true"></i>粘贴 JSON
          </button>
        </div>
        ${
          inputMode === "file"
            ? `<label class="drop-zone${busy ? " is-disabled" : ""}" id="drop-zone" for="file-input">
                <input id="file-input" type="file" accept=".json,.jsonl,.ndjson,application/json" multiple ${busy ? "disabled" : ""} />
                <span class="drop-icon"><i data-lucide="upload-cloud" aria-hidden="true"></i></span>
                <strong>拖入 JSON 文件，或点击选择</strong>
                <span>支持单个大文件和多个单账号文件</span>
              </label>`
            : `<div class="paste-panel" role="tabpanel" aria-labelledby="paste-mode">
                <label for="pasted-json">JSON 内容</label>
                <textarea id="pasted-json" rows="9" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="粘贴单个账号、多账号数组或 JSONL / NDJSON" ${busy ? "disabled" : ""}></textarea>
                <div class="paste-actions">
                  <span>凭据只在当前浏览器内存中解析</span>
                  <button class="parse-button" id="parse-pasted-json" type="button" ${busy || pastedDraft.trim() === "" ? "disabled" : ""}>
                    <i data-lucide="${busy ? "refresh-cw" : "plus"}" aria-hidden="true" class="${busy ? "spin" : ""}"></i>
                    ${busy ? "正在解析" : "解析并添加"}
                  </button>
                </div>
              </div>`
        }
        ${inputRows()}

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">2</span>
            <h2>格式转换</h2>
          </div>
        </div>

        <div class="format-flow">
          <div class="format-source">
            <span class="format-label">输入格式</span>
            <div class="format-node">
              <strong>${sourceFormatSummary()}</strong>
              <small>${inputBatches.length > 0 ? `${inputBatches.length} 个输入来源` : "JSON / JSONL"}</small>
            </div>
          </div>
          <span class="format-arrow"><i data-lucide="arrow-right-left" aria-hidden="true"></i></span>
          <fieldset class="field-group format-output">
            <legend>输出格式</legend>
            <div class="format-options" data-field="outputFormat">
              <button type="button" data-value="sub2api" class="${normalized.outputFormat === "sub2api" ? "is-selected" : ""}"><i data-lucide="braces" aria-hidden="true"></i><span><strong>Sub2API</strong><small>标准导入包</small></span></button>
              <button type="button" data-value="cpa" class="${normalized.outputFormat === "cpa" ? "is-selected" : ""}"><i data-lucide="file-json" aria-hidden="true"></i><span><strong>CPA</strong><small>逐账号文件</small></span></button>
            </div>
          </fieldset>
        </div>

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">3</span>
            <h2>拆分与打包</h2>
          </div>
        </div>

        ${
          isCPA
            ? `<div class="locked-rule"><i data-lucide="file-archive" aria-hidden="true"></i><div><strong>每个账号单独输出</strong><span>多个 CPA 文件自动打包为 ZIP</span></div></div>`
            : `<div class="settings-grid">
          <fieldset class="field-group">
            <legend>打包方式</legend>
            <div class="segmented" data-field="bundleMode">
              <button type="button" data-value="merged" class="${normalized.bundleMode === "merged" ? "is-selected" : ""}">合并为一份</button>
              <button type="button" data-value="split" class="${normalized.bundleMode === "split" ? "is-selected" : ""}">拆分文件</button>
            </div>
          </fieldset>

          <fieldset class="field-group split-settings${isSplit ? "" : " is-hidden"}">
            <legend>拆分规则</legend>
            <div class="segmented is-three" data-field="splitMode">
              <button type="button" data-value="accounts_per_file" class="${normalized.splitMode === "accounts_per_file" ? "is-selected" : ""}">固定数量</button>
              <button type="button" data-value="file_count" class="${normalized.splitMode === "file_count" ? "is-selected" : ""}">均分份数</button>
              <button type="button" data-value="custom_sizes" class="${normalized.splitMode === "custom_sizes" ? "is-selected" : ""}">自定义</button>
            </div>
          </fieldset>

          <label class="number-field split-settings${isSplit && normalized.splitMode !== "custom_sizes" ? "" : " is-hidden"}" for="split-value">
            <span>${normalized.splitMode === "accounts_per_file" ? "每份账号数" : "目标份数"}</span>
            <input id="split-value" type="number" min="1" step="1" inputmode="numeric" value="${normalized.splitValue}" />
          </label>

          <div class="custom-settings split-settings${isCustom ? "" : " is-hidden"}">
            <label for="custom-sizes">每份账号数</label>
            <input id="custom-sizes" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" value="${escapeHTML(normalized.customSizes)}" placeholder="5,10,20,30,100" />
            <div class="quick-sizes" aria-label="快捷添加数量">
              ${[5, 10, 20, 30, 100].map((size) => `<button type="button" data-append-size="${size}"><i data-lucide="plus" aria-hidden="true"></i>${size}</button>`).join("")}
            </div>
            <div id="custom-preview">${customGroupPreview(accountCount, normalized.customSizes)}</div>
          </div>
        </div>`
        }
      </div>

      <aside class="output-panel" aria-label="输出摘要">
        <div class="output-heading">
          <span class="output-icon"><i data-lucide="file-archive" aria-hidden="true"></i></span>
          <div>
            <span>输出摘要</span>
            <strong>${formatLabel(normalized.outputFormat)}</strong>
          </div>
        </div>
        <dl class="summary-list">
          <div><dt>输入来源</dt><dd>${inputBatches.length}</dd></div>
          <div><dt>账号总数</dt><dd>${accountCount}</dd></div>
          <div><dt>输出文件</dt><dd id="summary-output-count">${hasFormError ? "-" : outputCount}</dd></div>
          <div><dt>下载类型</dt><dd id="summary-download-type">${hasFormError ? "待修正" : downloadType}</dd></div>
        </dl>
        <div class="filename-preview"><span>下载文件</span><code id="summary-filename" title="${escapeHTML(previewName)}">${escapeHTML(previewName)}</code></div>
        <div class="status-line is-${statusKind}" role="status" aria-live="polite">
          <span></span>${escapeHTML(redactMessage(statusMessage))}
        </div>
        <button class="primary-button" id="download-button" type="button" ${busy || accountCount === 0 || hasFormError ? "disabled" : ""}>
          <i data-lucide="${busy ? "refresh-cw" : "download"}" aria-hidden="true" class="${busy ? "spin" : ""}"></i>
          ${busy ? "处理中" : "生成并下载"}
        </button>
        <p class="privacy-inline"><i data-lucide="shield-check" aria-hidden="true"></i>处理过程不发送网络请求</p>
      </aside>
    </section>
  `;
}

const browserSDKExample = `import {
  parseAccounts,
  renderArtifacts,
} from "@sources/account-converter-core";

const batches = await Promise.all(
  [...input.files].map(async (file) => parseAccounts(await file.text())),
);
const accounts = batches.flat().map((account, index) => ({
  ...account,
  ordinal: index + 1,
}));

const artifacts = renderArtifacts(accounts, {
  format: "sub2api",
  grouping: { mode: "chunkSize", chunkSize: 20 },
});`;

const nodeSDKExample = `import { readFile, writeFile } from "node:fs/promises";
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
);`;

function codeBlock(code: string, id: string): string {
  return `
    <div class="code-block">
      <button class="copy-button" type="button" data-copy="${id}"><i data-lucide="files" aria-hidden="true"></i>复制</button>
      <pre><code id="${id}"></code></pre>
    </div>
  `;
}

function apiView(): string {
  return `
    ${pageHeader(
      "INTEGRATION",
      "API / SDK 接入",
      "同一套 core 能力可运行在浏览器或 Node.js，不依赖远程转换服务。",
    )}
    <div class="docs-layout">
      <nav class="docs-index" aria-label="本页目录">
        <a href="#browser-sdk">浏览器 SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#node-sdk">Node.js SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#contract">接口约定<i data-lucide="chevron-right" aria-hidden="true"></i></a>
      </nav>
      <article class="docs-article">
        <section id="browser-sdk">
          <div class="doc-title"><span>01</span><div><h2>浏览器 SDK</h2><p>读取 File 对象后直接在当前页面进程中转换。</p></div></div>
          ${codeBlock(browserSDKExample, "browser-sdk-code")}
        </section>
        <section id="node-sdk">
          <div class="doc-title"><span>02</span><div><h2>Node.js SDK</h2><p>适合本地脚本、CLI 和自托管内部工具。</p></div></div>
          ${codeBlock(nodeSDKExample, "node-sdk-code")}
        </section>
        <section id="contract">
          <div class="doc-title"><span>03</span><div><h2>接口约定</h2><p>敏感账号数据只保留在调用方内存，页面只消费安全摘要。</p></div></div>
          <div class="contract-table" role="table" aria-label="SDK 接口约定">
            <div role="row"><strong role="cell">parseAccounts</strong><span role="cell">解析 JSON、JSONL 与常见账号容器</span></div>
            <div role="row"><strong role="cell">groupAccounts</strong><span role="cell">按每份数量或目标份数进行稳定分组</span></div>
            <div role="row"><strong role="cell">renderArtifacts</strong><span role="cell">输出 Sub2API 文档或逐账号 CPA 文件</span></div>
          </div>
          <div class="filename-examples">
            <span>产物命名示例</span>
            <code>accounts-20260731-150809-sub2api-200.json</code>
            <code>accounts-20260731-150809-sub2api-200-part-002-of-010.json</code>
            <code>accounts-20260731-150809-cpa-200.zip</code>
          </div>
          <div class="notice"><i data-lucide="info" aria-hidden="true"></i><p>本页面不调用远程 HTTP 转换 API。需要服务端集成时，应在自己的环境中调用 Node.js SDK。</p></div>
        </section>
      </article>
    </div>
  `;
}

function privacyView(): string {
  return `
    ${pageHeader(
      "PRIVACY",
      "隐私说明",
      "转换器以本地优先为前提设计，账号文件不离开当前浏览器。",
    )}
    <div class="privacy-grid">
      <section class="privacy-lead">
        <span class="large-icon"><i data-lucide="shield-check" aria-hidden="true"></i></span>
        <h2>本地读取，本地生成</h2>
        <p>页面只读取你主动选择的文件或粘贴的内容。解析、格式转换、拆分和 ZIP 生成均由本地 core 模块完成。</p>
      </section>
      <section class="privacy-points" aria-label="隐私措施">
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>无上传接口</strong>页面代码不使用 fetch、XMLHttpRequest 或表单上传。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>无持久化</strong>不写入 Cookie、localStorage、IndexedDB 或浏览器缓存数据库。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>不展示凭据</strong>界面只显示文件名、格式、账号数量和安全诊断。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>主动释放</strong>清空文件、切换页面或关闭窗口时销毁转换会话。</span></div>
      </section>
    </div>
    <section class="privacy-boundary">
      <div class="doc-title"><span>!</span><div><h2>边界说明</h2><p>浏览器仍可能受扩展程序、恶意脚本和受感染设备影响。</p></div></div>
      <p>建议使用可信浏览器、关闭不必要扩展，并在处理后删除下载目录中的临时文件。Node.js SDK 的文件安全由运行它的主机负责。</p>
    </section>
  `;
}

function render(): void {
  const route = getRoute();
  const view = route === "api" ? apiView() : route === "privacy" ? privacyView() : conversionView();
  app!.innerHTML = appShell(view);
  createIcons({ icons: iconSet });
  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    themeOverridden = true;
    theme = theme === "dark" ? "light" : "dark";
    applyTheme();
    render();
  });

  if (route === "convert") {
    renderInputRows();
    const pastedJSON = document.querySelector<HTMLTextAreaElement>("#pasted-json");
    if (pastedJSON) pastedJSON.value = pastedDraft;
    createIcons({ icons: iconSet });
    bindConverterEvents();
  } else if (route === "api") {
    const browserCode = document.querySelector<HTMLElement>("#browser-sdk-code");
    const nodeCode = document.querySelector<HTMLElement>("#node-sdk-code");
    if (browserCode) browserCode.textContent = browserSDKExample;
    if (nodeCode) nodeCode.textContent = nodeSDKExample;
    bindCopyButtons();
  }
}

function applyTheme(): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#0b0f14" : "#f5f7fa",
  );
}

function setStatus(message: string, kind: typeof statusKind = "neutral"): void {
  statusMessage = message;
  statusKind = kind;
}

function parseFailureMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AccountConverterError)) return fallback;
  if (error.code === "empty_input") return "输入内容为空";
  if (error.code === "no_accounts") return "没有识别到账号";
  if (error.code === "unsupported_value") return "JSON 中包含无法识别的值";
  if (error.code === "invalid_jsonl") {
    const line = error.details?.line;
    return typeof line === "number" ? `JSON 格式无效，请检查第 ${line} 行` : "JSON 格式无效";
  }
  return fallback;
}

function inputFormat(parsed: CanonicalAccount[]): SourceFormat | "mixed" {
  const formats = new Set(parsed.map((account) => account.sourceFormat));
  return formats.size === 1
    ? (formats.values().next().value ?? "unknown")
    : "mixed";
}

function rebuildAccounts(): void {
  accounts = inputBatches
    .flatMap((batch) => batch.accounts)
    .map((account, index) => ({ ...account, ordinal: index + 1 }));
}

function totalInputBytes(): number {
  return inputBatches.reduce((sum, batch) => sum + batch.byteSize, 0);
}

function clearInputData(): void {
  accounts = [];
  inputBatches = [];
  pastedDraft = "";
  nextPasteNumber = 1;
}

function validateFiles(nextFiles: File[]): string | null {
  const existingFileCount = inputBatches.filter((batch) => batch.kind === "file").length;
  if (existingFileCount + nextFiles.length > MAX_FILES) return `单次最多选择 ${MAX_FILES} 个文件`;
  const invalid = nextFiles.find(
    (file) => !ACCEPTED_EXTENSIONS.some((extension) => file.name.toLowerCase().endsWith(extension)),
  );
  if (invalid) return `不支持的文件类型：${invalid.name}`;
  const totalBytes = totalInputBytes() + nextFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) return "文件总大小不能超过 256 MB";
  return null;
}

async function loadFiles(nextFiles: File[]): Promise<void> {
  if (busy || nextFiles.length === 0) return;
  const validationError = validateFiles(nextFiles);
  if (validationError) {
    setStatus(validationError, "error");
    render();
    return;
  }

  busy = true;
  if (inputBatches.length === 0) batchTimestamp = formatBatchTimestamp(new Date());
  setStatus("正在解析文件");
  render();

  try {
    const parsedBatches = await Promise.all(
      nextFiles.map(async (file) => {
        const parsed = parseAccounts(await file.text());
        return {
          id: nextBatchId++,
          kind: "file" as const,
          name: file.name,
          byteSize: file.size,
          accounts: parsed,
          format: inputFormat(parsed),
        };
      }),
    );
    inputBatches.push(...parsedBatches);
    rebuildAccounts();
    setStatus(`已识别 ${accounts.length} 个账号`, "success");
  } catch (error) {
    setStatus(parseFailureMessage(error, "文件解析失败"), "error");
  } finally {
    busy = false;
    render();
  }
}

async function addPastedJSON(): Promise<void> {
  if (busy) return;
  if (pastedDraft.trim() === "") {
    setStatus("请先粘贴 JSON 内容", "error");
    render();
    return;
  }

  const byteSize = new TextEncoder().encode(pastedDraft).byteLength;
  if (totalInputBytes() + byteSize > MAX_TOTAL_BYTES) {
    setStatus("输入内容总大小不能超过 256 MB", "error");
    render();
    return;
  }

  busy = true;
  if (inputBatches.length === 0) batchTimestamp = formatBatchTimestamp(new Date());
  setStatus("正在解析粘贴内容");
  render();

  try {
    await Promise.resolve();
    const parsed = parseAccounts(pastedDraft);
    inputBatches.push({
      id: nextBatchId++,
      kind: "paste",
      name: `粘贴内容 ${nextPasteNumber++}`,
      byteSize,
      accounts: parsed,
      format: inputFormat(parsed),
    });
    pastedDraft = "";
    rebuildAccounts();
    setStatus(`已识别 ${accounts.length} 个账号`, "success");
  } catch (error) {
    setStatus(parseFailureMessage(error, "粘贴内容解析失败"), "error");
  } finally {
    busy = false;
    render();
  }
}

function clearInputs(): void {
  clearInputData();
  batchTimestamp = formatBatchTimestamp(new Date());
  setStatus("等待添加账号");
  render();
}

function removeInputBatch(id: number): void {
  inputBatches = inputBatches.filter((batch) => batch.id !== id);
  rebuildAccounts();
  if (inputBatches.length === 0) {
    batchTimestamp = formatBatchTimestamp(new Date());
    setStatus("等待添加账号");
  } else {
    setStatus(`已识别 ${accounts.length} 个账号`, "success");
  }
  render();
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function cpaAccountFilename(index: number, total: number): string {
  const width = Math.max(3, String(total).length);
  const accountNumber = String(index).padStart(width, "0");
  const accountTotal = String(total).padStart(width, "0");
  return `accounts-${batchTimestamp}-cpa-${total}-account-${accountNumber}-of-${accountTotal}.json`;
}

function renameArtifacts(source: Artifact[]): Artifact[] {
  return source.map((artifact, index) => {
    let filename: string;
    if (formState.outputFormat === "cpa") {
      filename = cpaAccountFilename(index + 1, accounts.length);
    } else if (source.length === 1) {
      filename = outputFilename(
        batchTimestamp,
        formState.outputFormat,
        accounts.length,
        "json",
      );
    } else {
      filename = outputFilename(
        batchTimestamp,
        formState.outputFormat,
        accounts.length,
        "json",
        index + 1,
        source.length,
      );
    }
    return { ...artifact, filename };
  });
}

function artifactArchive(artifacts: Artifact[]): Uint8Array {
  const entries: Record<string, Uint8Array> = {};
  artifacts.forEach((artifact) => {
    entries[artifact.filename] = strToU8(artifact.content);
  });
  return zipSync(entries, { level: 6 });
}

async function generateDownload(): Promise<void> {
  if (accounts.length === 0 || busy) return;
  busy = true;
  setStatus("正在生成下载文件");
  render();

  try {
    const artifacts = renameArtifacts(
      renderArtifacts(accounts, toRenderOptions(formState)),
    );
    if (artifacts.length === 1) {
      const artifact = artifacts[0]!;
      downloadBlob(
        new Blob([artifact.content], { type: artifact.mediaType }),
        artifact.filename,
      );
    } else {
      const archive = artifactArchive(artifacts);
      downloadBlob(
        new Blob([archive.buffer as ArrayBuffer], { type: "application/zip" }),
        outputFilename(
          batchTimestamp,
          formState.outputFormat,
          accounts.length,
          "zip",
        ),
      );
    }
    setStatus("下载文件已生成", "success");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "生成下载文件失败", "error");
  } finally {
    busy = false;
    render();
  }
}

function bindConverterEvents(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-input-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.inputMode as InputMode;
      if (nextMode === inputMode) return;
      inputMode = nextMode;
      render();
      if (nextMode === "paste") {
        document.querySelector<HTMLTextAreaElement>("#pasted-json")?.focus();
      }
    });
  });

  const input = document.querySelector<HTMLInputElement>("#file-input");
  input?.addEventListener("change", () => {
    void loadFiles(Array.from(input.files ?? []));
    input.value = "";
  });

  const dropZone = document.querySelector<HTMLElement>("#drop-zone");
  dropZone?.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
  dropZone?.addEventListener("dragleave", () => dropZone.classList.remove("is-dragging"));
  dropZone?.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
    void loadFiles(Array.from(event.dataTransfer?.files ?? []));
  });

  const pastedJSON = document.querySelector<HTMLTextAreaElement>("#pasted-json");
  const parsePastedJSON = document.querySelector<HTMLButtonElement>("#parse-pasted-json");
  pastedJSON?.addEventListener("input", () => {
    pastedDraft = pastedJSON.value;
    if (parsePastedJSON) parsePastedJSON.disabled = busy || pastedDraft.trim() === "";
  });
  pastedJSON?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || (!event.ctrlKey && !event.metaKey)) return;
    event.preventDefault();
    if (!parsePastedJSON?.disabled) void addPastedJSON();
  });
  parsePastedJSON?.addEventListener("click", () => void addPastedJSON());

  document.querySelector("#clear-inputs")?.addEventListener("click", clearInputs);
  document.querySelector("#download-button")?.addEventListener("click", () => void generateDownload());
  document.querySelectorAll<HTMLButtonElement>("[data-remove-batch]").forEach((button) => {
    button.addEventListener("click", () => removeInputBatch(Number(button.dataset.removeBatch)));
  });

  document.querySelectorAll<HTMLElement>("[data-field]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-value]");
      if (!button || button.disabled) return;
      const field = group.dataset.field as keyof ConversionFormState;
      formState = normalizeFormState({ ...formState, [field]: button.dataset.value });
      render();
    });
  });

  document.querySelector<HTMLInputElement>("#split-value")?.addEventListener("change", (event) => {
    formState = normalizeFormState({
      ...formState,
      splitValue: Number((event.target as HTMLInputElement).value),
    });
    render();
  });

  const customSizes = document.querySelector<HTMLInputElement>("#custom-sizes");
  customSizes?.addEventListener("input", () => {
    formState = { ...formState, customSizes: customSizes.value };
    refreshCustomGroupingUI();
  });

  document.querySelectorAll<HTMLButtonElement>("[data-append-size]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!customSizes) return;
      const size = button.dataset.appendSize;
      const current = customSizes.value.trim().replace(/[,，\/／\s]+$/u, "");
      customSizes.value = current ? `${current},${size}` : (size ?? "");
      formState = { ...formState, customSizes: customSizes.value };
      refreshCustomGroupingUI();
      customSizes.focus();
      customSizes.setSelectionRange(customSizes.value.length, customSizes.value.length);
    });
  });
}

function refreshCustomGroupingUI(): void {
  const normalized = normalizeFormState(formState);
  const preview = previewCustomGrouping(accounts.length, normalized.customSizes);
  const previewContainer = document.querySelector<HTMLElement>("#custom-preview");
  if (previewContainer) {
    previewContainer.innerHTML = customGroupPreview(
      accounts.length,
      normalized.customSizes,
    );
  }

  const outputCount = preview.error
    ? 0
    : estimateOutputFiles(accounts.length, normalized);
  const downloadType = outputCount > 1 ? "ZIP" : "JSON";
  const previewName =
    accounts.length === 0
      ? "添加账号后显示"
      : preview.error
        ? "请修正自定义分组"
        : outputFilename(
            batchTimestamp,
            normalized.outputFormat,
            accounts.length,
            outputCount > 1 ? "zip" : "json",
          );

  const outputCountElement = document.querySelector<HTMLElement>(
    "#summary-output-count",
  );
  const downloadTypeElement = document.querySelector<HTMLElement>(
    "#summary-download-type",
  );
  const filenameElement = document.querySelector<HTMLElement>(
    "#summary-filename",
  );
  const downloadButton = document.querySelector<HTMLButtonElement>(
    "#download-button",
  );

  if (outputCountElement) outputCountElement.textContent = preview.error ? "-" : String(outputCount);
  if (downloadTypeElement) downloadTypeElement.textContent = preview.error ? "待修正" : downloadType;
  if (filenameElement) {
    filenameElement.textContent = previewName;
    filenameElement.title = previewName;
  }
  if (downloadButton) {
    downloadButton.disabled = busy || accounts.length === 0 || Boolean(preview.error);
  }
}

function bindCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = document.querySelector<HTMLElement>(`#${button.dataset.copy}`)?.textContent;
      if (!code) return;
      await navigator.clipboard.writeText(code);
      button.innerHTML = '<i data-lucide="check" aria-hidden="true"></i>已复制';
      createIcons({ icons: iconSet });
    });
  });
}

window.addEventListener("hashchange", () => {
  if (getRoute() !== "convert") {
    clearInputData();
    setStatus("等待添加账号");
  }
  render();
});
window.addEventListener("beforeunload", clearInputData);

systemTheme.addEventListener("change", (event) => {
  if (themeOverridden) return;
  theme = event.matches ? "dark" : "light";
  applyTheme();
  render();
});

applyTheme();
render();
