# dsh-triad

DSH 扩展插件：**用量工作台 · 技能管理（含 MCP Server 管理）· 长期记忆引擎**。

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
| 每日整合 | 衰减 + 命中加权 + 条目上限 + **闲置自动清理**（`pruneNeverHitDays`，默认 21 天：最后命中/创建距今满 N 天删除；置顶/已确认/手动/禁用豁免） |
| 语义整理 | 增量小批（默认最近更新 20 条/次，对齐 ReMe auto_dream 策略）+ 整理前快照 + 变更流汇总记录 + 整理专用模型（面板下拉，可选） + `consolidate.log` 诊断 |
| 相关记忆 | 详情面板「相关记忆」区：以目标条目内容为 query 走同一套 hybrid 检索，排除自身与已废弃（`GET /api/dsh-memory/related`） |

工具：`memory_search` `memory_remember` `memory_pin` `memory_tag` `memory_forget`
`memory_revise` `memory_retire` `memory_consolidate`

路由：`/api/dsh-memory/*`（含 `/models` 模型目录、`/related` 相关记忆）

### 用量

四个 Tab：**用量 / 趋势 / 账户 / 信号**，含面积图、环形图、仪表、热力图、排名条。
与技能面板共用同一套 Skills Hub 风格共享视觉层（`usage/dashboard/hub.tsx`：
左侧分类导航 + 圆形渐变统计卡 + 搜索/排序工具栏 + 胶囊分段按钮）。

路由：`/api/usage-stats/{usage,balance,account,credentials,providers,subscriptions,signal,budget,day-sessions,deepseek-billing}`

### 技能

面板顶部 **SKILL / MCP** 双层顶层 tab：

- **SKILL**：`/` 触发源支持**二级分组**（`/<集合名>:` 后列出该集合下技能，含「散装技能」）、
  技能工具行、管理面板，以及**按 Agent 预设的开关覆盖**——同一个技能可以对
  `standard` 开、对 `code` 关。
- **MCP**：MCP Server 管理——添加/启停/会话自启动（localStorage 持久化）、
  **推荐 MCP Server 目录**（`GET /api/mcp-recommended`：官方 modelcontextprotocol/servers
  + 社区 MCP Registry 合并去重，离线兜底内置清单，5 分钟缓存）、联网搜索
  （`/search?q=`）、GitHub repo 解析（`/resolve?repo=`，用于一键「添加」）、
  工具列表 / 连接日志 / 配置模板、MCP 快速了解引导。

路由：`/api/skill-manager/*`（集合管理）、`/api/skill-toggles/*`（开关与预设覆盖）、
`/api/mcp-recommended{,/search,/resolve}`

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
pruneNeverHitDays 21
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

- **`lib/index.js`**：自包含。除 `node:*` 内置模块外，留给运行时解析的只有
  `@deepseek-ai/dsh-util-crypto`（一个零依赖的 UUID 工具，DSH 有真实产物）。
  `yauzl` 内联（配 `createRequire` banner 解决 CJS 依赖在 ESM 产物里的
  `Dynamic require`）。
- **`lib/client.js`**：`react` / `react-dom` / `react/jsx-runtime` /
  `@deepseek-ai/dsh-client-*` 全部 external，由 DSH 模块表提供同一份实例。

#### 为什么宿主半身不能 import 大部分 `@deepseek-ai/*`

这是本插件踩过的最大的坑，值得单独说清楚。

DSH 的 `@deepseek-ai/*` 包**只发源码，不发运行时产物**。装到 profile 的
`node_modules` 之后，`@deepseek-ai/dsh-llm` 的 `lib/` 里只有 `.d.ts` 和几个
手工入口——**没有 `lib/index.js`**，尽管 `package.json` 写着
`"main": "lib/index.js"`。

DSH 自己没事，是因为它跑在 tsx 下，靠 `tsconfig.base.json` 的 `paths` 把包名
映射回源码目录（`@deepseek-ai/dsh-llm` → `packages/llm/llm/src`）。而 tsx 的
`resolveTsPaths` **只对不在 `node_modules` 里的 importer 应用 `paths`**。实测：

| importer 位置 | `dsh-llm` | `dsh-tools` | `cordis` | `schemastery` |
| --- | --- | --- | --- | --- |
| DSH checkout 内 | ✅ | ✅ | ✅ | ✅ |
| profile 的 node_modules 内 | ❌ | ❌ | ✅ | ✅ |

于是：从源码跑一切正常，`dsh plugin add` 装进去之后启动就
`ERR_MODULE_NOT_FOUND`。**构建期的成功完全不能说明问题**——esbuild 把
`@deepseek-ai/*` 原样 external，checkout 里每个名字都能解析，只有装到别人机器上
才炸。

对策是把用到的**叶子模块**（不依赖 cordis、不注册服务、纯函数/纯类）逐字复制进
`vendor/`，详见 [`vendor/README.md`](vendor/README.md)。`build.mjs` 末尾的
`assertHostExternals()` 会扫描产物里所有留给运行时的裸导入，命中白名单之外就
**直接让构建失败**。

### 测试

```bash
# 宿主半身：产物自包含，裸 node 即可，不依赖 tsx
node scripts/smoke-host.mjs

# 浏览器半身：独立可跑
node scripts/smoke-client.mjs
```

想复现「已安装位置」的真实条件，可以把 `lib/` 同步到
`~/.dsh/profiles/<p>/node_modules/dsh-triad/lib/`，再在**那个目录**下裸跑
`node scripts/smoke-host.mjs`——这正是本次修复的验收方式。

---

## 设计约束

- **每个模块各自 try/catch 挂载**，一个挂了不影响另外两个。
- **记忆面板用自研轻量 markdown 渲染器**（`src/client/memory/markdown.tsx`）。
  webui 原版为一个静态调用点拖进 shiki + mermaid + katex + markstream（数 MB）；
  新渲染器零外部依赖，只构造 React 元素，不用 `dangerouslySetInnerHTML`。
- **侧边栏槽位全部自建**。webui 原版依赖一个被 DSH 0.1.2 删掉的
  `#dsh-automation-menu-host`（`grep` 全空），卸载 webui 后无人再建，导致
  技能/记忆入口永远拿不到 portal 目标。现在四个槽位由插件自己创建。
- **宿主半身不 import 未验证的 `@deepseek-ai/*`**。DSH 这些包只发源码，装进
  profile 后解析不到运行时入口；用到的叶子模块内联在 `vendor/`，并由构建末尾的
  `assertHostExternals()` 兜底。详见[外部化策略](#外部化策略刻意不同)。
- HTTP 路由全部 loopback-only，浏览器半身通过同源 fetch 取数。

## 环境

- DSH `0.1.2-alpha.1`
- Node >= 22

## 许可

MIT
