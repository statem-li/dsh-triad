# dsh-triad

DSH 三合一扩展插件：**用量工作台 · 技能管理 · 长期记忆引擎**。

从 [statem-li/dsh-webui](https://github.com/statem-li/dsh-webui) v0.5.1 拆出这三个模块，
按 DSH `0.1.2-alpha.1` 的现行契约重写成单个插件。**零 DSH 源码改动**——全部通过
`cordis.patch.yml` 的 bundle 机制挂载。

> 装完侧边栏多出一行三个入口：`[用量] [技能] [记忆]`。

---

## 一句话安装

```bash
dsh plugin --profile web add github:statem-li/dsh-triad
```

然后**重启 DSH**。

插件自带 bundle patch（`cordis.patch.yml`），`dsh plugin add` 会自动把它注册进
profile 的 bundle 层，**不需要手改任何配置文件**。

构建产物 `lib/` 随仓库一起提交，所以安装期无需执行构建脚本——pnpm ≥ 10 默认
拦截 git 依赖的 `prepare`/`postinstall`，带脚本会让上面那条命令直接失败。
想从源码构建见下方「从源码构建」。

### 卸载

```bash
dsh plugin --profile web remove dsh-triad
```

重启 DSH。内核 `ui-skill` 会随之恢复（它的停用声明也在同一个 patch 里）。

---

## 三个模块

### 记忆

| 能力 | 实现 |
| --- | --- |
| 自动抽取 | 挂 `session/event`，每 `extractEveryTurns` 轮用 LLM 抽一次 |
| 语义检索 | 可选 embedding provider；关闭时退化为 TF-IDF 式打分 |
| 自动注入 | 挂 `agent/pre-step`，`{ prepend: true }`，预算 `injectTokenBudget` |
| 每日整合 | 衰减 + 命中加权 + 条目上限 |

工具：`memory_search` `memory_remember` `memory_pin` `memory_tag` `memory_forget`
`memory_revise` `memory_retire` `memory_consolidate`

路由：`/api/dsh-memory/*`

### 用量

四个 Tab：**用量 / 趋势 / 账户 / 信号**，含面积图、环形图、仪表、热力图、排名条。

路由：`/api/usage-stats/{usage,balance,account,credentials,providers,subscriptions,signal,budget,day-sessions,deepseek-billing}`

### 技能

`/` 触发源支持**二级分组**（`/<集合名>:` 后列出该集合下技能，含「散装技能」）、
技能工具行、管理面板，以及**按 Agent 预设的开关覆盖**——同一个技能可以对
`standard` 开、对 `code` 关。

路由：`/api/skill-manager/*`（集合管理）、`/api/skill-toggles/*`（开关与预设覆盖）

> 技能在 webui 里原本是**两个独立 host 模块**（`skill-manager` 与 `skill-toggles`），
> 缺了后者技能面板的「Agent 预设」筛选条就会全部 404。这里两个都在。

---

## 与内核 `ui-skill` 的关系

内核的 `ui-skill`（`packages/client/ui-skill`，纯客户端）与本插件的技能模块占
**同一对座位**，无法共存，重复注册会直接抛 `already registered`：

1. `inputTriggers` 的 `('/', 'skill')` 触发源座位
2. `tool.call.toolview` 的 key `skill` 工具行座位

安装时会自动停用 `ui-skill`。**宿主侧能力不受影响**：`@deepseek-ai/dsh-tool-skill`
在 base bundle 里，`ctx.remote.skills` 是宿主服务，技能调用链路完好——只是 `/`
菜单和工具行改由本插件提供（多了集合二级分组）。

不想用本插件的技能模块时，卸载即可自动恢复。

---

## 配置

在 profile 的 `cordis.patch.yml`（更高层，覆盖 bundle patch）里给 `dsh-triad` 加 `config`：

```yaml
- id: dsh-triad
  name: dsh-triad
  config:
    memory:
      embeddingProvider: openai        # off（默认）| openai | 其它
      embeddingModel: text-embedding-3-small
      injectTokenBudget: 6000
      extractEveryTurns: 1
      decayLambda: 0.02
    usage: {}
```

记忆引擎默认值（`src/memory/types.ts` 的 `DEFAULT_CONFIG`）：

```
extractEveryTurns 1      compileEveryTurns 10    compileThreshold 4.5
decayLambda 0.02         hitBonus 2              injectTokenBudget 6000
injectRefreshSteps 8     injectTopK 8            entryLimit 500
extractMaxChars 6000     minImportance 6         logApiRequests false
dailyCompileEnabled true consolidateEnabled true consolidateMaxEntries 200
consolidateTimeoutMs 60000                       embeddingProvider off
```

---

## 从源码构建

```bash
git clone https://github.com/statem-li/dsh-triad.git
cd dsh-triad
pnpm install
pnpm build
```

改完源码后记得重新构建并提交 `lib/`，否则安装方拿到的还是旧产物。

产物：

| 文件 | 格式 | 说明 |
| --- | --- | --- |
| `lib/index.js` | ESM | 宿主半身，node 平台 |
| `lib/client.js` | CJS | 浏览器半身，包在 `window.__ModuleLoader__.load` 工厂里 |

esbuild 的解析分三档：插件自己的 `node_modules`（正常安装路径）→ 本地 DSH
checkout 的 pnpm store（贡献者便利）→ 明确报错提示 `pnpm install`。

### 外部化策略（刻意不同）

- **`lib/index.js`**：`@deepseek-ai/*` 全部 external。DSH 运行时靠
  **tsx + `tsconfig.base.json` 的 `paths`** 把包解析到源码目录
  （如 `@deepseek-ai/dsh-tools` → `packages/core/tools/src`），插件必须共享宿主的
  模块实例，不能打包进去。`yauzl` 内联（配 `createRequire` banner 解决 CJS 依赖
  在 ESM 产物里的 `Dynamic require`）。
- **`lib/client.js`**：`react` / `react-dom` / `react/jsx-runtime` /
  `@deepseek-ai/dsh-client-*` 全部 external，由 DSH 模块表提供同一份实例。

### 测试

```bash
# 宿主半身：必须在 DSH checkout 下用 tsx 跑，否则 @deepseek-ai/* 解析不到
cd /path/to/deepseek-harness
node --import tsx/esm /path/to/dsh-triad/scripts/smoke-host.mjs

# 浏览器半身：独立可跑
node scripts/smoke-client.mjs
```

---

## 设计约束

- **每个模块各自 try/catch 挂载**，一个挂了不影响另外两个。
- **记忆面板用自研轻量 markdown 渲染器**（`src/client/memory/markdown.tsx`）。
  webui 原版为一个静态调用点拖进 shiki + mermaid + katex + markstream（数 MB）；
  新渲染器零外部依赖，只构造 React 元素，不用 `dangerouslySetInnerHTML`。
- **侧边栏槽位全部自建**。webui 原版依赖一个被 DSH 0.1.2 删掉的
  `#dsh-automation-menu-host`（`grep` 全空），卸载 webui 后无人再建，导致
  技能/记忆入口永远拿不到 portal 目标。现在四个槽位由插件自己创建。
- HTTP 路由全部 loopback-only，浏览器半身通过同源 fetch 取数。

## 环境

- DSH `0.1.2-alpha.1`
- Node >= 22

## 许可

MIT
