import {
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Download,
  FileArchive,
  FileJson,
  Files,
  Github,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UploadCloud,
  createIcons,
} from "lucide";
import {
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
  toRenderOptions,
  type ConversionFormState,
} from "./conversion";
import "./styles.css";

type Route = "convert" | "api" | "privacy";

const MAX_FILES = 5_000;
const MAX_TOTAL_BYTES = 256 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".json", ".jsonl", ".ndjson"];

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app root");

let files: File[] = [];
let accounts: CanonicalAccount[] = [];
let parsedFiles: Array<{
  name: string;
  accountCount: number;
  format: SourceFormat | "mixed";
}> = [];
let formState: ConversionFormState = { ...DEFAULT_FORM_STATE };
let batchTimestamp = formatBatchTimestamp(new Date());
let busy = false;
let statusMessage = "等待添加文件";
let statusKind: "neutral" | "success" | "error" = "neutral";

const iconSet = {
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Download,
  FileArchive,
  FileJson,
  Files,
  Github,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
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
  return `
    <header class="app-header">
      <div class="header-inner">
        <a class="brand" href="#/convert" aria-label="Sources Account Converter 首页">
          <span class="brand-mark"><i data-lucide="refresh-cw" aria-hidden="true"></i></span>
          <span>Sources Account Converter</span>
        </a>
        <div class="header-actions">
          <div class="local-status">
            <span class="status-dot" aria-hidden="true"></span>
            本地处理
          </div>
          <a class="repository-link" href="https://github.com/code-nailao/sources-account-converter" target="_blank" rel="noreferrer">
            <i data-lucide="github" aria-hidden="true"></i>
            开源仓库
          </a>
        </div>
      </div>
    </header>
    <div class="workspace">
      <aside class="sidebar" aria-label="主导航">
        <nav>
          ${navLink("convert", "转换工具", "files")}
          ${navLink("api", "API / SDK", "code-2")}
          ${navLink("privacy", "隐私说明", "shield-check")}
        </nav>
        <div class="sidebar-note">
          <i data-lucide="lock-keyhole" aria-hidden="true"></i>
          <span>文件仅保留在当前页面内存</span>
        </div>
      </aside>
      <main class="main-content">${content}</main>
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

function fileRows(): string {
  if (files.length === 0) {
    return `<div class="empty-files">尚未添加文件</div>`;
  }

  return `<div class="file-list" id="file-list" role="list"></div>
    <script type="application/json" id="file-row-count">${files.length}</script>`;
}

function renderFileRows(): void {
  const container = document.querySelector<HTMLDivElement>("#file-list");
  if (!container) return;

  files.forEach((file, index) => {
    const parsed = parsedFiles[index];
    const row = document.createElement("div");
    row.className = "file-row";
    row.setAttribute("role", "listitem");

    const icon = document.createElement("span");
    icon.className = "file-icon";
    icon.innerHTML = '<i data-lucide="file-json" aria-hidden="true"></i>';

    const details = document.createElement("div");
    details.className = "file-details";
    const name = document.createElement("strong");
    name.textContent = file.name;
    const meta = document.createElement("span");
    meta.textContent = parsed
      ? `${formatLabel(parsed.format)} · ${parsed.accountCount} 个账号 · ${formatFileSize(file.size)}`
      : `${formatFileSize(file.size)} · 待解析`;
    details.append(name, meta);

    const remove = document.createElement("button");
    remove.className = "icon-button";
    remove.type = "button";
    remove.title = "移除文件";
    remove.setAttribute("aria-label", `移除 ${file.name}`);
    remove.dataset.removeIndex = String(index);
    remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>';

    row.append(icon, details, remove);
    container.append(row);
  });
}

function conversionView(): string {
  const normalized = normalizeFormState(formState);
  const accountCount = accounts.length;
  const outputCount = estimateOutputFiles(accountCount, normalized);
  const downloadType = outputCount > 1 ? "ZIP" : "JSON";
  const previewName =
    accountCount === 0
      ? "添加文件后显示"
      : outputFilename(
          batchTimestamp,
          normalized.outputFormat,
          accountCount,
          outputCount > 1 ? "zip" : "json",
        );
  const isSplit = normalized.bundleMode === "split";
  const isCPA = normalized.outputFormat === "cpa";

  return `
    ${pageHeader(
      "ACCOUNT TOOLKIT",
      "账号文件转换",
      "批量合并、按数量拆分，并输出可直接导入的账号文件。",
    )}
    <section class="converter-layout" aria-label="账号转换工具">
      <div class="converter-main">
        <div class="section-heading">
          <div>
            <span class="step-index">1</span>
            <h2>添加账号文件</h2>
          </div>
          ${files.length > 0 ? '<button class="quiet-button" id="clear-files" type="button"><i data-lucide="trash-2" aria-hidden="true"></i>清空</button>' : ""}
        </div>
        <label class="drop-zone${busy ? " is-disabled" : ""}" id="drop-zone" for="file-input">
          <input id="file-input" type="file" accept=".json,.jsonl,.ndjson,application/json" multiple ${busy ? "disabled" : ""} />
          <span class="drop-icon"><i data-lucide="upload-cloud" aria-hidden="true"></i></span>
          <strong>拖入 JSON 文件，或点击选择</strong>
          <span>支持单个大文件和多个单账号文件</span>
        </label>
        ${fileRows()}

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">2</span>
            <h2>设置输出</h2>
          </div>
        </div>

        <div class="settings-grid">
          <fieldset class="field-group">
            <legend>输出格式</legend>
            <div class="segmented" data-field="outputFormat">
              <button type="button" data-value="sub2api" class="${normalized.outputFormat === "sub2api" ? "is-selected" : ""}">Sub2API</button>
              <button type="button" data-value="cpa" class="${normalized.outputFormat === "cpa" ? "is-selected" : ""}">CPA</button>
            </div>
          </fieldset>

          <fieldset class="field-group">
            <legend>打包方式</legend>
            <div class="segmented" data-field="bundleMode">
              <button type="button" data-value="merged" ${isCPA ? "disabled" : ""} class="${normalized.bundleMode === "merged" ? "is-selected" : ""}">合并为一份</button>
              <button type="button" data-value="split" class="${normalized.bundleMode === "split" ? "is-selected" : ""}">拆分文件</button>
            </div>
            ${isCPA ? '<p class="field-hint">CPA 多账号按原生多文件 ZIP 输出</p>' : ""}
          </fieldset>

          <fieldset class="field-group split-settings${isSplit ? "" : " is-hidden"}">
            <legend>拆分规则</legend>
            <div class="segmented" data-field="splitMode">
              <button type="button" data-value="accounts_per_file" class="${normalized.splitMode === "accounts_per_file" ? "is-selected" : ""}">每份数量</button>
              <button type="button" data-value="file_count" class="${normalized.splitMode === "file_count" ? "is-selected" : ""}">拆成几份</button>
            </div>
          </fieldset>

          <label class="number-field split-settings${isSplit ? "" : " is-hidden"}" for="split-value">
            <span>${normalized.splitMode === "accounts_per_file" ? "每份账号数" : "目标文件数"}</span>
            <input id="split-value" type="number" min="1" step="1" inputmode="numeric" value="${normalized.splitValue}" />
          </label>
        </div>
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
          <div><dt>已选文件</dt><dd>${files.length}</dd></div>
          <div><dt>账号总数</dt><dd>${accountCount}</dd></div>
          <div><dt>输出文件</dt><dd>${outputCount}</dd></div>
          <div><dt>下载类型</dt><dd>${downloadType}</dd></div>
        </dl>
        <div class="filename-preview"><span>下载文件</span><code title="${previewName}">${previewName}</code></div>
        <div class="status-line is-${statusKind}" role="status" aria-live="polite">
          <span></span>${redactMessage(statusMessage)}
        </div>
        <button class="primary-button" id="download-button" type="button" ${busy || accountCount === 0 ? "disabled" : ""}>
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
          <div class="doc-title"><span>03</span><div><h2>接口约定</h2><p>会话对象隔离敏感账号数据，页面只消费安全摘要。</p></div></div>
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
        <p>上传控件只读取你主动选择的文件。解析、格式转换、拆分和 ZIP 生成均由本地 core 模块完成。</p>
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

  if (route === "convert") {
    renderFileRows();
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

function setStatus(message: string, kind: typeof statusKind = "neutral"): void {
  statusMessage = message;
  statusKind = kind;
}

function clearParsedData(): void {
  accounts = [];
  parsedFiles = [];
}

function validateFiles(nextFiles: File[]): string | null {
  if (nextFiles.length > MAX_FILES) return `单次最多选择 ${MAX_FILES} 个文件`;
  const invalid = nextFiles.find(
    (file) => !ACCEPTED_EXTENSIONS.some((extension) => file.name.toLowerCase().endsWith(extension)),
  );
  if (invalid) return `不支持的文件类型：${invalid.name}`;
  const totalBytes = nextFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) return "文件总大小不能超过 256 MB";
  return null;
}

async function loadFiles(nextFiles: File[]): Promise<void> {
  if (busy || nextFiles.length === 0) return;
  const merged = [...files, ...nextFiles];
  const validationError = validateFiles(merged);
  if (validationError) {
    setStatus(validationError, "error");
    render();
    return;
  }

  busy = true;
  clearParsedData();
  if (files.length === 0) batchTimestamp = formatBatchTimestamp(new Date());
  files = merged;
  setStatus("正在解析文件");
  render();

  try {
    const batches = await Promise.all(
      files.map(async (file) => {
        const parsed = parseAccounts(await file.text());
        const formats = new Set(parsed.map((account) => account.sourceFormat));
        const format: SourceFormat | "mixed" =
          formats.size === 1
            ? (formats.values().next().value ?? "unknown")
            : "mixed";
        return {
          name: file.name,
          accounts: parsed,
          format,
        };
      }),
    );
    accounts = batches
      .flatMap((batch) => batch.accounts)
      .map((account, index) => ({ ...account, ordinal: index + 1 }));
    parsedFiles = batches.map((batch) => ({
      name: batch.name,
      accountCount: batch.accounts.length,
      format: batch.format,
    }));
    setStatus(`已识别 ${accounts.length} 个账号`, "success");
  } catch (error) {
    clearParsedData();
    setStatus(error instanceof Error ? error.message : "文件解析失败", "error");
  } finally {
    busy = false;
    render();
  }
}

function clearFiles(): void {
  clearParsedData();
  files = [];
  batchTimestamp = formatBatchTimestamp(new Date());
  setStatus("等待添加文件");
  render();
}

function removeFile(index: number): void {
  const nextFiles = files.filter((_, currentIndex) => currentIndex !== index);
  clearParsedData();
  files = [];
  if (nextFiles.length === 0) {
    setStatus("等待添加文件");
    render();
    return;
  }
  void loadFiles(nextFiles);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function renameArtifacts(source: Artifact[]): Artifact[] {
  return source.map((artifact, index) => ({
    ...artifact,
    filename:
      source.length === 1
        ? outputFilename(
            batchTimestamp,
            formState.outputFormat,
            accounts.length,
            "json",
          )
        : outputFilename(
            batchTimestamp,
            formState.outputFormat,
            accounts.length,
            "json",
            index + 1,
            source.length,
          ),
  }));
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

  document.querySelector("#clear-files")?.addEventListener("click", clearFiles);
  document.querySelector("#download-button")?.addEventListener("click", () => void generateDownload());
  document.querySelectorAll<HTMLButtonElement>("[data-remove-index]").forEach((button) => {
    button.addEventListener("click", () => removeFile(Number(button.dataset.removeIndex)));
  });

  document.querySelectorAll<HTMLDivElement>(".segmented[data-field]").forEach((group) => {
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
    clearParsedData();
    files = [];
  }
  render();
});
window.addEventListener("beforeunload", clearParsedData);

render();
