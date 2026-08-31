window.__ModuleLoader__.load({ id: "dsh-triad", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/client/skill-source/styles.ts
function injectSkillRowStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("dsh-webui-skill-source-styles") !== null) return;
  const style = document.createElement("style");
  style.id = "dsh-webui-skill-source-styles";
  style.textContent = CSS;
  document.head.appendChild(style);
}
var CSS, skillCss;
var init_styles = __esm({
  "src/client/skill-source/styles.ts"() {
    CSS = `
.webui-skill-card {
  display: flex;
  flex-direction: column;
}

.webui-skill-row {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 0;
}

.webui-skill-row[data-expandable] {
  cursor: pointer;
}

.webui-skill-card[data-state='running'] .webui-skill-row::after {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 300px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--dsw-alias-bg-base) 60%, transparent) 55%,
    transparent 100%
  );
  animation: dsh-webui-skill-row-sweep 2.6s ease-out infinite;
  pointer-events: none;
}

@keyframes dsh-webui-skill-row-sweep {
  0% { left: -300px; }
  90%, 100% { left: 100%; }
}

.webui-skill-leading {
  position: relative;
  flex: none;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  color: var(--dsw-alias-label-tertiary);
}

.webui-skill-chevron {
  color: var(--dsw-alias-label-secondary);
}

.webui-skill-iconIdle {
  display: inline-flex;
  opacity: 1;
  transition: opacity 100ms ease;
}

.webui-skill-chevronHover {
  position: absolute;
  inset: 0;
  margin: auto;
  opacity: 0;
  transition: opacity 100ms ease;
}

.webui-skill-row:hover .webui-skill-iconIdle {
  opacity: 0;
}

.webui-skill-row:hover .webui-skill-chevronHover {
  opacity: 1;
}

.webui-skill-title {
  flex: none;
  font-size: 14px;
  line-height: 24px;
  color: var(--dsw-alias-label-secondary);
}

.webui-skill-separator {
  flex: none;
  width: 2px;
  height: 2px;
  border-radius: 1px;
  margin: 0 8px;
  background: var(--dsw-alias-label-caption);
}

.webui-skill-summary {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 24px;
  color: var(--dsw-alias-label-tertiary);
}

.webui-skill-errorSummary {
  color: var(--dsw-alias-state-error-primary);
}

.webui-skill-bodyWrap {
  display: flex;
  flex-direction: column;
}

.webui-skill-instructionsCard {
  display: flex;
  flex-direction: column;
  max-height: 260px;
  margin: 4px 0 4px 4px;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-markdown-code-block);
}

.webui-skill-instructionsHeader {
  flex: none;
  padding: 8px 12px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-markdown-code-block-banner);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: var(--dsw-alias-label-caption);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.webui-skill-instructions {
  min-height: 0;
  margin: 0;
  padding: 10px 12px 12px;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font: var(--dsw-font-markdown-code-block-small);
  color: var(--dsw-alias-label-secondary);
}

.webui-skill-instructions[data-error] {
  color: var(--dsw-alias-state-error-primary);
}

.webui-skill-instructions::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 6px;
}

.webui-skill-instructions::-webkit-scrollbar-track {
  margin: 6px 0;
}

.webui-skill-inspectButton {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 4px;
  margin: 4px 0 2px 4px;
  padding: 2px 8px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 16px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 100ms ease;
}

.webui-skill-card:hover .webui-skill-inspectButton,
.webui-skill-inspectButton:focus-visible {
  opacity: 1;
}

.webui-skill-inspectButton:hover {
  background: var(--dsw-alias-interactive-bg-hover-solid);
  color: var(--dsw-alias-label-primary);
}

.webui-skill-visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .webui-skill-card[data-state='running'] .webui-skill-row::after {
    animation: none;
    display: none;
  }

  .webui-skill-iconIdle,
  .webui-skill-chevronHover,
  .webui-skill-inspectButton {
    transition: none;
  }
}
`;
    skillCss = {
      card: "webui-skill-card",
      row: "webui-skill-row",
      leading: "webui-skill-leading",
      chevron: "webui-skill-chevron",
      iconIdle: "webui-skill-iconIdle",
      chevronHover: "webui-skill-chevronHover",
      title: "webui-skill-title",
      separator: "webui-skill-separator",
      summary: "webui-skill-summary",
      errorSummary: "webui-skill-errorSummary",
      bodyWrap: "webui-skill-bodyWrap",
      instructionsCard: "webui-skill-instructionsCard",
      instructionsHeader: "webui-skill-instructionsHeader",
      instructions: "webui-skill-instructions",
      inspectButton: "webui-skill-inspectButton",
      visuallyHidden: "webui-skill-visuallyHidden"
    };
  }
});

// src/client/skill-source/SkillRow.tsx
function firstLine(text) {
  const newline = text.indexOf("\n");
  return newline === -1 ? text : text.slice(0, newline);
}
function skillName(argsRaw, callId) {
  try {
    const parsed = JSON.parse(argsRaw);
    if (typeof parsed === "object" && parsed !== null) {
      const name = parsed.name;
      if (typeof name === "string" && name !== "") return firstLine(name);
    }
  } catch {
  }
  return argsRaw === "" ? callId : firstLine(argsRaw);
}
function resultText(block) {
  if (!("kind" in block)) return null;
  const parts = [];
  for (const item of block.content) {
    parts.push(item.type === "text" ? item.text : JSON.stringify(item, null, 2));
  }
  if (parts.length === 0 && block.error !== void 0) {
    parts.push(`${block.error.name}: ${block.error.code}`);
  }
  return parts.join("\n") || null;
}
function skillRowModel(block) {
  const settled = "kind" in block;
  const argsRaw = (settled ? block.call?.argsRaw : block.argsRaw) ?? "";
  const state = !settled ? "running" : block.error?.code === "interrupted" ? "stopped" : block.isError ? "error" : "ok";
  const output = resultText(block);
  return {
    name: skillName(argsRaw, block.callId),
    output,
    errorSummary: state === "error" && output !== null ? firstLine(output) : null,
    state
  };
}
function leadingFor(state) {
  switch (state) {
    case "error":
      return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.StateDot, { state: "error" });
    case "stopped":
      return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.StateDot, { state: "warning" });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.IconSkillOutline16, { size: 14 });
  }
}
function disclosureLeading(state, open, expandable) {
  if (open) return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.IconChevronDownOutline14, { className: skillCss.chevron });
  const icon = leadingFor(state);
  if (!expandable) return icon;
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_jsx_runtime30.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: skillCss.iconIdle, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.IconChevronDownOutline14, { className: `${skillCss.chevron} ${skillCss.chevronHover}` })
  ] });
}
function stateStatus(state, t) {
  switch (state) {
    case "running":
      return t("row.running");
    case "error":
      return t("row.failed");
    case "stopped":
      return t("row.stopped");
    default:
      return null;
  }
}
function SkillRow({ block, inspect, t }) {
  const model = skillRowModel(block);
  const [expanded, setExpanded] = (0, import_react26.useState)(false);
  const expandable = model.output !== null;
  const open = expanded && expandable;
  const status = stateStatus(model.state, t);
  const summary = model.errorSummary ?? model.name;
  const toggleExpand = () => {
    setExpanded((value) => !value);
  };
  const toggleFromKeyboard = (event) => {
    if (!expandable || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleExpand();
  };
  const disclosureProps = expandable ? {
    role: "button",
    tabIndex: 0,
    "aria-expanded": open,
    onClick: toggleExpand,
    onKeyDown: toggleFromKeyboard
  } : {};
  const leading = disclosureLeading(model.state, open, expandable);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: skillCss.card, "data-tool": "skill", "data-state": model.state, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      "div",
      {
        className: skillCss.row,
        "data-expandable": expandable || void 0,
        ...disclosureProps,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: skillCss.leading, children: leading }),
          status !== null ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: skillCss.visuallyHidden, children: status }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: skillCss.title, children: "Skill" }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: skillCss.separator, "aria-hidden": true }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: model.errorSummary === null ? skillCss.summary : `${skillCss.summary} ${skillCss.errorSummary}`, children: summary })
        ]
      }
    ),
    open ? /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: skillCss.bodyWrap, children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("section", { className: skillCss.instructionsCard, "aria-label": t("row.instructions"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: skillCss.instructionsHeader, children: t("row.instructions") }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("pre", { className: skillCss.instructions, "data-error": model.state === "error" || void 0, children: model.output })
      ] }),
      inspect !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("button", { type: "button", className: skillCss.inspectButton, onClick: inspect, children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_dsh_client_ui_primitives4.IconInspectOutline12, {}),
        "Inspect"
      ] }) : null
    ] }) : null
  ] });
}
var import_react26, import_dsh_client_ui_primitives4, import_jsx_runtime30;
var init_SkillRow = __esm({
  "src/client/skill-source/SkillRow.tsx"() {
    import_react26 = require("react");
    import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");
    init_styles();
    import_jsx_runtime30 = require("react/jsx-runtime");
  }
});

// src/client/skill-source/locales.ts
var NS2, zh2, en2;
var init_locales = __esm({
  "src/client/skill-source/locales.ts"() {
    NS2 = "skill";
    zh2 = {
      "row.running": "\u6B63\u5728\u52A0\u8F7D skill",
      "row.failed": "skill \u52A0\u8F7D\u5931\u8D25",
      "row.stopped": "skill \u52A0\u8F7D\u5DF2\u4E2D\u6B62",
      "row.instructions": "\u8BF4\u660E",
      "menu.userOnly": "\u4EC5\u7528\u6237"
    };
    en2 = {
      "row.running": "Loading skill",
      "row.failed": "Skill load failed",
      "row.stopped": "Skill load stopped",
      "row.instructions": "Instructions",
      "menu.userOnly": "user-only"
    };
  }
});

// src/client/skill-source/index.ts
var skill_source_exports = {};
__export(skill_source_exports, {
  apply: () => apply,
  invalidateSkillCache: () => invalidateSkillCache
});
function fetchPresets() {
  if (presetsCache !== void 0 && Date.now() - presetsCache.at < SNAPSHOT_TTL_MS) {
    return presetsCache.promise;
  }
  const promise = fetch("/api/skill-toggles/presets", {
    headers: { accept: "application/json" }
  }).then((response) => response.ok ? response.json() : null).catch(() => null);
  presetsCache = { at: Date.now(), promise };
  return promise;
}
function sessionPresetOf(sessionId) {
  try {
    const sessions = rootCtx?.get?.("sessions");
    const byId = sessions?.list?.getSnapshot?.()?.byId;
    const preset = byId?.[sessionId]?.agentPreset;
    return typeof preset === "string" && preset !== "" ? preset : void 0;
  } catch {
    return void 0;
  }
}
function notifyListeners(sessionId) {
  for (const listener of [...lexiconListeners.get(sessionId) ?? []]) {
    try {
      listener();
    } catch (error) {
      console.error("[skill-source] lexicon listener failed:", error);
    }
  }
}
function fetchSnapshot(sessionId) {
  const existing = fetches.get(sessionId);
  if (existing !== void 0 && Date.now() - existing.fetchedAt < SNAPSHOT_TTL_MS) {
    return existing.promise;
  }
  const abort = new AbortController();
  const entry = { promise: void 0, fetchedAt: Date.now(), abort };
  const promise = (async () => {
    const [listResponse, toggleResponse, presetWire] = await Promise.all([
      fetch("/api/skill-manager/list", {
        headers: { accept: "application/json" },
        signal: abort.signal
      }),
      fetch("/api/skill-toggles/status", {
        headers: { accept: "application/json" },
        signal: abort.signal
      }).catch(() => null),
      fetchPresets()
    ]);
    const body = await listResponse.json();
    if (!listResponse.ok) throw new Error(body.error ?? `skill list failed (${String(listResponse.status)})`);
    let enabled = {};
    if (toggleResponse !== null && toggleResponse.ok) {
      const toggles = await toggleResponse.json();
      if (toggles.skills !== void 0) enabled = toggles.skills;
    }
    const presetId = sessionPresetOf(sessionId);
    const overrides = presetId === void 0 ? void 0 : presetWire?.overrides?.[presetId];
    if (overrides !== void 0) {
      const merged = { ...enabled };
      for (const [name, state] of Object.entries(overrides)) {
        if (state === false) merged[name] = false;
      }
      enabled = merged;
    }
    return { ...body, enabled };
  })();
  entry.promise = promise;
  fetches.set(sessionId, entry);
  promise.then(
    (snapshot) => {
      entry.settled = snapshot;
      notifyListeners(sessionId);
    },
    () => {
      if (fetches.get(sessionId) === entry) fetches.delete(sessionId);
    }
  );
  return promise;
}
function invalidateSkillCache(sessionId) {
  presetsCache = void 0;
  if (sessionId === void 0) {
    for (const key of [...fetches.keys()]) {
      const entry2 = fetches.get(key);
      if (entry2 === void 0) continue;
      fetches.delete(key);
      entry2.abort.abort();
      notifyListeners(key);
    }
    return;
  }
  const entry = fetches.get(sessionId);
  if (entry === void 0) return;
  fetches.delete(sessionId);
  entry.abort.abort();
  notifyListeners(sessionId);
}
function skillEnabled(snapshot, name) {
  return snapshot.enabled[name] !== false;
}
function allSkillNames(snapshot) {
  const names = [];
  for (const bundle of snapshot.bundles) {
    for (const skill of bundle.skills) {
      if (skillEnabled(snapshot, skill.name)) names.push(skill.name);
    }
  }
  for (const skill of snapshot.loose) {
    if (skillEnabled(snapshot, skill.name)) names.push(skill.name);
  }
  return names;
}
function skillsOf(snapshot, bundleId) {
  const source = bundleId === LOOSE_ID ? snapshot.loose : snapshot.bundles.find((bundle) => bundle.id === bundleId)?.skills ?? [];
  return source.filter((skill) => skillEnabled(snapshot, skill.name));
}
function parseLevelQuery(query) {
  const match = /^([a-z0-9_-]+):(.*)$/.exec(query);
  if (match === null) return null;
  return { bundleId: match[1], rest: match[2] };
}
function skillCandidate(skill) {
  return { name: skill.name, description: skill.description, value: `${SKILL_MARK}${skill.name}` };
}
function bundleCandidate(snapshot, bundle) {
  const enabledCount = skillsOf(snapshot, bundle.id).length;
  if (enabledCount === 0) return null;
  return {
    name: bundle.name,
    description: `${String(enabledCount)} \u4E2A\u6280\u80FD`,
    value: `${BUNDLE_MARK}${bundle.id}`
  };
}
function apply(ctx) {
  rootCtx = ctx;
  ctx.effect(() => {
    return () => {
      if (rootCtx === ctx) rootCtx = void 0;
    };
  }, "skill-source: root ctx capture");
  ctx.effect(() => ctx.locale.register(NS2, { zh: zh2, en: en2 }), "skill-source: dictionaries");
  injectSkillRowStyles();
  ctx.slots.inject("tool.call.toolview", () => ctx.slots.register(
    { name: "tool.call.toolview", key: "skill", locale: NS2 },
    SkillRow
  ));
  const inputTriggers = ctx.get("inputTriggers");
  if (inputTriggers === void 0) {
    console.warn("[skill-source] inputTriggers \u670D\u52A1\u4E0D\u53EF\u7528,\u6280\u80FD slash \u6E90\u672A\u6CE8\u518C");
    return;
  }
  const source = {
    trigger: "/",
    name: "skill",
    order: 2,
    async candidates(session, req) {
      let snapshot;
      try {
        snapshot = await fetchSnapshot(session.sessionId);
      } catch {
        return [];
      }
      if (req.signal.aborted) return [];
      const level = parseLevelQuery(req.query);
      if (level !== null && skillsOf(snapshot, level.bundleId).length > 0) {
        return skillsOf(snapshot, level.bundleId).filter((skill) => skill.name.startsWith(level.rest)).map(skillCandidate);
      }
      const bundles = snapshot.bundles.filter((bundle) => bundle.name.startsWith(req.query) || bundle.id.startsWith(req.query)).map((bundle) => bundleCandidate(snapshot, bundle)).filter((candidate) => candidate !== null);
      const looseEnabled = skillsOf(snapshot, LOOSE_ID);
      if (looseEnabled.length > 0) {
        bundles.push({
          name: "\u6563\u88C5\u6280\u80FD",
          description: `${String(looseEnabled.length)} \u4E2A\u6280\u80FD`,
          value: `${BUNDLE_MARK}${LOOSE_ID}`
        });
      }
      return bundles;
    },
    warm(session) {
      fetchSnapshot(session.sessionId).catch(() => {
      });
    },
    lexicon(session) {
      const entry = fetches.get(session.sessionId);
      return entry?.settled === void 0 ? void 0 : allSkillNames(entry.settled);
    },
    subscribeLexicon(session, listener) {
      const key = session.sessionId;
      const listeners = lexiconListeners.get(key) ?? /* @__PURE__ */ new Set();
      listeners.add(listener);
      lexiconListeners.set(key, listeners);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) lexiconListeners.delete(key);
      };
    },
    onPick({ candidate }) {
      const value = candidate.value ?? "";
      if (value.startsWith(BUNDLE_MARK)) {
        const bundleId = value.slice(BUNDLE_MARK.length);
        return { text: `/${bundleId}:`, continue: true };
      }
      return { text: `/${candidate.name} ` };
    }
  };
  ctx.effect(() => {
    let unregister;
    try {
      unregister = inputTriggers.registerSource(source);
    } catch (error) {
      console.warn("[skill-source] /skill \u6E90\u6CE8\u518C\u5931\u8D25(\u53EF\u80FD\u5185\u6838 ui-skill \u4ECD\u6FC0\u6D3B):", error);
    }
    return () => {
      if (unregister !== void 0) unregister();
      for (const key of [...fetches.keys()]) {
        fetches.get(key)?.abort.abort();
        fetches.delete(key);
      }
      lexiconListeners.clear();
    };
  }, "skill-source: slash source");
}
var BUNDLE_MARK, SKILL_MARK, LOOSE_ID, SNAPSHOT_TTL_MS, fetches, lexiconListeners, rootCtx, presetsCache;
var init_skill_source = __esm({
  "src/client/skill-source/index.ts"() {
    init_SkillRow();
    init_locales();
    init_styles();
    BUNDLE_MARK = "bundle:";
    SKILL_MARK = "skill:";
    LOOSE_ID = "_loose";
    SNAPSHOT_TTL_MS = 30 * 1e3;
    fetches = /* @__PURE__ */ new Map();
    lexiconListeners = /* @__PURE__ */ new Map();
  }
});

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  ACTIVITY_COLUMNS: () => ACTIVITY_COLUMNS,
  activityColor: () => activityColor,
  apply: () => apply3,
  buildActivityGrid: () => buildActivityGrid,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/memory/index.ts
var import_react11 = require("react");
var import_client = require("react-dom/client");

// src/client/memory/Entry.tsx
var import_react9 = require("react");

// src/client/memory/api.ts
var API_BASE = "/api/dsh-memory";
var KIND_VALUES = ["identity", "preference", "fact", "decision", "gotcha", "session-summary"];
function normalizeEntry(entry) {
  return {
    ...entry,
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    disabled: entry.disabled === true,
    deprecated: entry.deprecated === true,
    pinned: entry.pinned === true,
    importance: Number.isFinite(entry.importance) ? entry.importance : 0,
    version: Number.isFinite(entry.version) ? entry.version : 1,
    confidence: Number.isFinite(entry.confidence) ? entry.confidence : entry.source === "manual" ? 1 : 0.6,
    verified: entry.verified === true,
    kind: KIND_VALUES.includes(entry.kind) ? entry.kind : "fact",
    lastHitAt: typeof entry.lastHitAt === "string" ? entry.lastHitAt : null
  };
}
function normalizeSummary(summary) {
  const num = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
  const opt = (value) => typeof value === "number" && Number.isFinite(value) ? value : void 0;
  return {
    today: typeof summary.today === "string" ? summary.today : "",
    entryCount: num(summary.entryCount),
    projectCount: num(summary.projectCount),
    todayChanges: num(summary.todayChanges),
    pinnedCount: opt(summary.pinnedCount),
    disabledCount: opt(summary.disabledCount),
    longtermCount: opt(summary.longtermCount),
    globalCount: opt(summary.globalCount)
  };
}
function withEntry(response) {
  return { ...response, entry: normalizeEntry(response.entry) };
}
async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`, { headers: { accept: "application/json" } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? `request failed (${String(response.status)})`);
  return body;
}
async function sendJson(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? `request failed (${String(response.status)})`);
  return body;
}
function createMemoryApi() {
  return {
    list: (params = {}) => {
      const query = new URLSearchParams();
      if (params.scope !== void 0 && params.scope !== "") query.set("scope", params.scope);
      if (params.project !== void 0 && params.project !== "") query.set("project", params.project);
      if (params.q !== void 0 && params.q !== "") query.set("q", params.q);
      if (params.tag !== void 0 && params.tag !== "") query.set("tag", params.tag);
      if (params.includeDeprecated === true) query.set("includeDeprecated", "1");
      const suffix = query.toString() === "" ? "" : `?${query.toString()}`;
      return getJson(`/list${suffix}`).then((response) => ({
        ...response,
        entries: (response.entries ?? []).map(normalizeEntry),
        projects: response.projects ?? []
      }));
    },
    projects: () => getJson("/projects"),
    tags: () => getJson("/tags"),
    changes: (date) => getJson(`/changes${date !== void 0 ? `?date=${encodeURIComponent(date)}` : ""}`),
    summary: () => getJson("/summary").then(normalizeSummary),
    pin: (entryId, pinned) => sendJson("/pin", { entryId, pinned }).then(withEntry),
    enable: (entryId, enabled) => sendJson("/enable", { entryId, enabled }).then(withEntry),
    update: (entryId, patch) => sendJson("/update", { entryId, ...patch }).then(withEntry),
    move: (entryId, target) => sendJson("/move", { entryId, ...target }).then(withEntry),
    deleteEntry: (entryId) => sendJson("/delete", { entryId }),
    deleteBatch: (entryIds) => sendJson("/delete-batch", { entryIds }),
    deleteProject: (projectHash) => sendJson("/delete-project", { projectHash }),
    meta: (projectHash, patch) => sendJson("/meta", { projectHash, ...patch }),
    remember: (input) => sendJson("/remember", input).then(withEntry),
    getInjectState: (sessionId) => getJson(`/inject-state?sessionId=${encodeURIComponent(sessionId)}`),
    setInjectState: (sessionId, enabled) => sendJson("/inject-state", { sessionId, enabled }),
    consolidate: (scope = "all", projectHash) => sendJson("/consolidate", { scope, projectHash }),
    revisions: () => getJson("/revisions"),
    rollback: (revisionId) => sendJson("/rollback", { revisionId }),
    getConfig: () => getJson("/config"),
    setConfig: (patch) => sendJson("/config", patch),
    resetConfig: () => sendJson("/config", { reset: true }),
    revise: (entryId, input) => sendJson("/revise", { entryId, ...input }).then(withEntry),
    retire: (entryId, reason) => sendJson("/retire", { entryId, reason }).then(withEntry),
    restore: (entryId) => sendJson("/restore", { entryId }).then(withEntry)
  };
}

// src/client/memory/Panel.tsx
var import_react5 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/memory/markdown.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function renderInline(text, keyPrefix) {
  const nodes = [];
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(__[^_]+__)|(~~[^~]+~~)|(\*[^*\n]+\*)|(_[^_\n]+_)|(\[[^\]]*\]\([^)\s]+\))/g;
  let cursor = 0;
  let match;
  let index = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${index}`;
    index += 1;
    if (token.startsWith("`")) {
      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "dsh-triad-md__code", children: token.slice(1, -1) }, key));
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: token.slice(2, -2) }, key));
    } else if (token.startsWith("~~")) {
      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", { children: token.slice(2, -2) }, key));
    } else if (token.startsWith("[")) {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      nodes.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href, target: "_blank", rel: "noreferrer noopener", className: "dsh-triad-md__link", children: label }, key)
      );
    } else {
      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: token.slice(1, -1) }, key));
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
function renderFence(lines, key) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "dsh-triad-md__pre", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: lines.join("\n") }) }, key);
}
function renderList(lines, ordered, key) {
  const items = lines.map((line, itemIndex) => {
    const body = ordered ? line.replace(/^\s*\d+[.)]\s+/, "") : line.replace(/^\s*[-*+]\s+/, "");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: renderInline(body, `${key}-l${itemIndex}`) }, `${key}-l${itemIndex}`);
  });
  return ordered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "dsh-triad-md__list", children: items }, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dsh-triad-md__list", children: items }, key);
}
function parse(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (/^\s*```/.test(line)) {
      const start2 = i + 1;
      let end = start2;
      while (end < lines.length && !/^\s*```/.test(lines[end] ?? "")) end += 1;
      out.push(renderFence(lines.slice(start2, end), `b${i}`));
      i = end + 1;
      continue;
    }
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "dsh-triad-md__hr" }, `b${i}`));
      i += 1;
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading !== null) {
      const level = Math.min(6, (heading[1]?.length ?? 1) + 2);
      const body = renderInline(heading[2] ?? "", `b${i}`);
      const Tag = `h${level}`;
      out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "dsh-triad-md__h", children: body }, `b${i}`));
      i += 1;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const start2 = i;
      while (i < lines.length && /^\s*>/.test(lines[i] ?? "")) i += 1;
      const body = lines.slice(start2, i).map((l) => (l ?? "").replace(/^\s*>\s?/, "")).join(" ");
      out.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { className: "dsh-triad-md__quote", children: renderInline(body, `b${start2}`) }, `b${start2}`)
      );
      continue;
    }
    const isBullet = (l) => /^\s*[-*+]\s+/.test(l);
    const isOrdered = (l) => /^\s*\d+[.)]\s+/.test(l);
    if (isBullet(line) || isOrdered(line)) {
      const ordered = isOrdered(line);
      const start2 = i;
      while (i < lines.length && (ordered ? isOrdered(lines[i] ?? "") : isBullet(lines[i] ?? ""))) i += 1;
      out.push(renderList(lines.slice(start2, i), ordered, `b${start2}`));
      continue;
    }
    const start = i;
    while (i < lines.length && (lines[i] ?? "").trim() !== "" && !/^\s*```/.test(lines[i] ?? "") && !/^(#{1,6})\s+/.test(lines[i] ?? "") && !/^\s*>/.test(lines[i] ?? "") && !isBullet(lines[i] ?? "") && !isOrdered(lines[i] ?? "")) i += 1;
    out.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-triad-md__p", children: renderInline(lines.slice(start, i).join(" "), `b${start}`) }, `b${start}`)
    );
  }
  return out;
}
var MarkstreamMarkdown = (0, import_react.memo)(function MarkstreamMarkdown2({ text }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-triad-md", children: parse(text ?? "") });
});

// src/client/memory/styles.ts
var css = {
  modalBody: "dsh-memory-modal-body",
  panel: "dsh-memory-panel",
  head: "dsh-memory-head",
  tabs: "dsh-memory-tabs",
  tab: "dsh-memory-tab",
  tabActive: "dsh-memory-tab-active",
  tabCount: "dsh-memory-tab-count",
  statBar: "dsh-memory-stat-bar",
  stat: "dsh-memory-stat",
  statLong: "dsh-memory-stat-long",
  statValue: "dsh-memory-stat-value",
  statDot: "dsh-memory-stat-dot",
  topRow: "dsh-memory-top-row",
  projectName: "dsh-memory-project-name",
  projectTools: "dsh-memory-project-tools",
  searchRow: "dsh-memory-search-row",
  searchBox: "dsh-memory-search-box",
  searchIcon: "dsh-memory-search-icon",
  searchInput: "dsh-memory-search-input",
  searchClear: "dsh-memory-search-clear",
  tagSelect: "dsh-memory-tag-select",
  scopeSelect: "dsh-memory-scope-select",
  barSep: "dsh-memory-bar-sep",
  segment: "dsh-memory-segment",
  segmentItem: "dsh-memory-segment-item",
  segmentItemActive: "dsh-memory-segment-item-active",
  spacer: "dsh-memory-spacer",
  cardList: "dsh-memory-card-list",
  cardContent: "dsh-memory-card-content",
  cardMeta: "dsh-memory-card-meta",
  chip: "dsh-memory-chip",
  chipActive: "dsh-memory-chip-active",
  cardActions: "dsh-memory-card-actions",
  iconAction: "dsh-memory-icon-action",
  iconActionDanger: "dsh-memory-icon-action-danger",
  iconActionBusy: "dsh-memory-icon-action-busy",
  pinMark: "dsh-memory-pin-mark",
  empty: "dsh-memory-empty",
  emptyIcon: "dsh-memory-empty-icon",
  emptyText: "dsh-memory-empty-text",
  emptyHint: "dsh-memory-empty-hint",
  changeRow: "dsh-memory-change-row",
  changeMain: "dsh-memory-change-main",
  changeBadge: "dsh-memory-change-badge",
  changeBadgeAdd: "dsh-memory-change-badge-add",
  changeBadgeDelete: "dsh-memory-change-badge-delete",
  changeBadgePromote: "dsh-memory-change-badge-promote",
  changeBadgeRevise: "dsh-memory-change-badge-revise",
  changeBadgeRetire: "dsh-memory-change-badge-retire",
  changeOld: "dsh-memory-change-old",
  changeNew: "dsh-memory-change-new",
  changeDiff: "dsh-memory-change-diff",
  changeDiffCol: "dsh-memory-change-diff-col",
  changeDiffDivider: "dsh-memory-change-diff-divider",
  inlineInput: "dsh-memory-inline-input",
  inlineTextarea: "dsh-memory-inline-textarea",
  editButtons: "dsh-memory-edit-buttons",
  addMeta: "dsh-memory-add-meta",
  check: "dsh-memory-check",
  switch: "dsh-memory-switch",
  switchText: "dsh-memory-switch-text",
  switchLine: "dsh-memory-switch-line",
  batchCount: "dsh-memory-batch-count",
  toggle: "dsh-memory-toggle",
  toggleOn: "dsh-memory-toggle-on",
  toggleOff: "dsh-memory-toggle-off",
  error: "dsh-memory-error",
  notice: "dsh-memory-notice",
  split: "dsh-memory-split",
  listPane: "dsh-memory-list-pane",
  listSection: "dsh-memory-list-section",
  listSectionCount: "dsh-memory-list-section-count",
  item: "dsh-memory-item",
  itemSelected: "dsh-memory-item-selected",
  itemBody: "dsh-memory-item-body",
  itemCheck: "dsh-memory-item-check",
  itemTitle: "dsh-memory-item-title",
  itemTitleText: "dsh-memory-item-title-text",
  itemSnippet: "dsh-memory-item-snippet",
  itemFoot: "dsh-memory-item-foot",
  itemTime: "dsh-memory-item-time",
  itemScore: "dsh-memory-item-score",
  detailPane: "dsh-memory-detail-pane",
  detailHead: "dsh-memory-detail-head",
  detailTitle: "dsh-memory-detail-title",
  detailMeta: "dsh-memory-detail-meta",
  metaBadge: "dsh-memory-meta-badge",
  metaBadgeAccent: "dsh-memory-meta-badge-accent",
  metaBadgeWarn: "dsh-memory-meta-badge-warn",
  metaBadgeMuted: "dsh-memory-meta-badge-muted",
  metaTime: "dsh-memory-meta-time",
  importanceRow: "dsh-memory-importance-row",
  importanceLabel: "dsh-memory-importance-label",
  importanceBar: "dsh-memory-importance-bar",
  importanceValue: "dsh-memory-importance-value",
  detailBody: "dsh-memory-detail-body",
  detailTags: "dsh-memory-detail-tags",
  detailFoot: "dsh-memory-detail-foot",
  detailForm: "dsh-memory-detail-form",
  formTitle: "dsh-memory-form-title",
  field: "dsh-memory-field",
  fieldLabel: "dsh-memory-field-label",
  fieldRow: "dsh-memory-field-row",
  revActions: "dsh-memory-rev-actions",
  itemRow: "dsh-memory-item-row",
  miniSwitch: "dsh-memory-mini-switch",
  miniSwitchOn: "dsh-memory-mini-switch-on",
  itemDisabled: "dsh-memory-item-disabled",
  itemRetired: "dsh-memory-item-retired",
  disabledMark: "dsh-memory-disabled-mark",
  retiredMark: "dsh-memory-retired-mark",
  scopeBadge: "dsh-memory-scope-badge",
  settingsBody: "dsh-memory-settings-body",
  settingsGroup: "dsh-memory-settings-group",
  settingsGroupTitle: "dsh-memory-settings-group-title",
  settingsRow: "dsh-memory-settings-row",
  settingsMain: "dsh-memory-settings-main",
  settingsLabel: "dsh-memory-settings-label",
  settingsHint: "dsh-memory-settings-hint",
  settingsControl: "dsh-memory-settings-control",
  numberInput: "dsh-memory-number-input",
  settingsFoot: "dsh-memory-settings-foot",
  skeleton: "dsh-memory-skeleton",
  skeletonRow: "dsh-memory-skeleton-row"
};
var STYLE_ID = "dsh-memory-styles";
var SHEET = `
/* \u2500\u2500 \u9762\u677F\u9AA8\u67B6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-modal-body{overflow:hidden;display:flex;flex-direction:column}
/* \u9762\u677F\u81EA\u8EAB\u4E0D\u7559\u5185\u8DDD\uFF1A\u5206\u533A\uFF08\u5DE5\u5177\u680F / \u4E3B\u4ECE\u533A\uFF09\u5404\u81EA\u6301\u6709 16px \u8FB9\u8DDD\uFF0C
   \u4FDD\u8BC1\u4EFB\u4F55\u4E00\u884C\u7684\u53F3\u7AEF\u5143\u7D20\u90FD\u4E0D\u4F1A\u8D34\u5230\u5361\u7247\u8FB9\u7F18\u88AB\u88C1\u6389\u3002 */
.dsh-memory-panel{flex:1;min-height:0;display:flex;flex-direction:column;gap:0;overflow:hidden;padding:0;box-sizing:border-box;color:var(--dsw-alias-label-primary,#eee)}

/* \u2500\u2500 \u5934\u90E8\uFF1ATab \u7EC4\uFF08\u5DE6\uFF09+ \u7EDF\u8BA1\u6761\uFF08\u53F3\uFF09\uFF0C\u4E0B\u6C89\u4E00\u6761\u5206\u9694\u7EBF \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-head{flex:none;display:flex;align-items:center;gap:16px;padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06))}
.dsh-memory-tabs{display:flex;align-items:center;gap:4px;min-width:0}
/* \u4E0B\u5212\u7EBF\u5F0F Tab\uFF08\u5361\u7247\u6807\u9898\u4E0B\u7684\u4E8C\u7EA7\u5BFC\u822A\uFF09\uFF1A\u9009\u4E2D=\u54C1\u724C\u84DD\u6587\u5B57 + 2px \u5E95\u90E8\u6307\u793A\u6761\u3002
   \u6BD4\u80F6\u56CA\u6BB5\u63A7\u66F4\u8D34\u5408\u300C\u6807\u9898\u2192\u5206\u533A\u300D\u7684\u5C42\u7EA7\u5173\u7CFB\uFF0C\u4E5F\u4E0D\u4F1A\u5728\u5934\u90E8\u5806\u4E24\u5C42\u5BB9\u5668\u5E95\u8272\u3002 */
.dsh-memory-tab{position:relative;appearance:none;border:none;background:transparent;border-radius:6px 6px 0 0;height:32px;padding:0 10px;display:inline-flex;align-items:center;gap:6px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary,#999);cursor:pointer;font-family:inherit;transition:color .16s cubic-bezier(.2,.8,.2,1),background .16s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-tab:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-tab-active,.dsh-memory-tab-active:hover{background:transparent;color:var(--dsw-alias-state-business-primary,#4176e6);font-weight:600}
/* \u6307\u793A\u6761\u538B\u5728 head \u7684\u5206\u9694\u7EBF\u4E0A\uFF08bottom:-11px = head \u7684 10px \u5185\u8DDD + 1px \u7EBF\uFF09 */
.dsh-memory-tab-active::after{content:'';position:absolute;left:8px;right:8px;bottom:-11px;height:2px;border-radius:1px;background:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-tab-count{flex:none;min-width:16px;padding:0 5px;border-radius:7px;background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4176e6) 16%,transparent);color:var(--dsw-alias-state-business-primary,#4176e6);font-size:10px;font-weight:600;line-height:15px;text-align:center;font-variant-numeric:tabular-nums}
.dsh-memory-tab:not(.dsh-memory-tab-active) .dsh-memory-tab-count{background:var(--dsw-alias-border-l2,rgba(255,255,255,.12));color:var(--dsw-alias-label-tertiary,#888)}

/* \u7EDF\u8BA1\u6761\uFF1A\u53F3\u8D34\u7684 caption \u6570\u503C\u7EC4\uFF08\u8BB0\u5FC6\u6570 \xB7 \u9879\u76EE \xB7 \u7F6E\u9876 \xB7 \u957F\u671F\uFF09 */
.dsh-memory-stat-bar{display:flex;align-items:center;gap:10px;margin-left:auto;min-width:0}
.dsh-memory-stat{display:inline-flex;align-items:center;gap:4px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888);white-space:nowrap}
.dsh-memory-stat-value{font-variant-numeric:tabular-nums;font-weight:600;color:var(--dsw-alias-label-secondary,#bbb)}
.dsh-memory-stat-dot{flex:none;width:4px;height:4px;border-radius:50%;background:var(--dsw-alias-border-l3,rgba(255,255,255,.2))}

/* \u2500\u2500 \u9879\u76EE\u4E0A\u4E0B\u6587\u6761\uFF1A\u4EC5\u5728\u7B5B\u9009\u5230\u5177\u4F53\u9879\u76EE\u65F6\u51FA\u73B0\uFF08\u522B\u540D / \u81EA\u52A8\u8BB0\u5FC6 / \u6E05\u7A7A\uFF09\u2500\u2500 */
.dsh-memory-top-row{flex:none;display:flex;align-items:center;gap:10px;padding:8px 16px;background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.04));border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06))}
/* \u9879\u76EE\u540D\uFF08\u4E0A\u4E0B\u6587\u6761\u5DE6\u7AEF\u6807\u9898\uFF09+ \u53F3\u7AEF\u5DE5\u5177\u7EC4 */
.dsh-memory-project-name{flex:none;display:inline-flex;align-items:center;gap:6px;max-width:280px;font-size:13px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary,#eee);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-memory-project-tools{display:flex;align-items:center;gap:10px;margin-left:auto}

/* \u2500\u2500 \u5DE5\u5177\u680F\uFF1A\u641C\u7D22\uFF08\u5F39\u6027\uFF09+ \u4F5C\u7528\u57DF/\u6807\u7B7E\u4E0B\u62C9 + \u56FE\u6807\u52A8\u4F5C + \u4E3B\u6309\u94AE \u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-search-row{flex:none;display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06))}
.dsh-memory-search-box{position:relative;flex:1;min-width:160px;max-width:420px;display:flex;align-items:center}
.dsh-memory-search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);display:inline-flex;color:var(--dsw-alias-label-tertiary,#888);pointer-events:none}
.dsh-memory-search-input{flex:1;min-width:0;height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:8px;padding:0 30px 0 32px;font-size:14px;line-height:22px;font-family:inherit;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-layer-1,#1c1f26)}
.dsh-memory-search-input::placeholder{color:var(--dsw-alias-label-dimmed,#666)}
.dsh-memory-search-clear{position:absolute;right:6px;top:50%;transform:translateY(-50%);display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:none;border-radius:5px;padding:0;background:transparent;color:var(--dsw-alias-label-tertiary,#888);cursor:pointer}
.dsh-memory-search-clear:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-tag-select{height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:8px;padding:0 32px 0 10px;font-size:14px;line-height:22px;font-family:inherit;color:var(--dsw-alias-label-primary,#eee);background-color:var(--dsw-alias-bg-layer-1,#1c1f26);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:12px 12px;appearance:none;max-width:240px;cursor:pointer}
/* \u4F5C\u7528\u57DF\u4E0B\u62C9\uFF08\u5168\u90E8 / \u5168\u5C40 / \u5404\u9879\u76EE\uFF09\uFF1A\u4E0E\u6807\u7B7E\u4E0B\u62C9\u540C\u89C4\u683C\uFF0C\u5BBD\u5EA6\u66F4\u7D27\u51D1 */
.dsh-memory-scope-select{flex:none;max-width:180px}
/* \u5DE5\u5177\u680F\u5206\u9694\u7AD6\u7EBF\uFF08\u7B5B\u9009\u533A \u2194 \u52A8\u4F5C\u533A\uFF09 */
.dsh-memory-bar-sep{flex:none;width:1px;height:20px;background:var(--dsw-alias-border-l2,rgba(255,255,255,.12))}
/* \u6BB5\u63A7\uFF08\u4ECA\u5929 / \u5168\u90E8\uFF09\uFF1Ah32 \u4E0E\u540C\u884C\u8F93\u5165\u4EF6\u7B49\u9AD8\uFF0C\u9009\u4E2D=\u5B9E\u5E95 + \u54C1\u724C\u84DD\u5B57 */
.dsh-memory-segment{flex:none;display:inline-flex;align-items:center;gap:2px;padding:2px;height:32px;box-sizing:border-box;border-radius:8px;background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.04))}
.dsh-memory-segment-item{appearance:none;border:none;background:transparent;border-radius:6px;height:28px;padding:0 14px;font-size:13px;line-height:20px;font-family:inherit;color:var(--dsw-alias-label-secondary,#999);cursor:pointer;transition:background .16s cubic-bezier(.2,.8,.2,1),color .16s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-segment-item:hover{color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-segment-item-active,.dsh-memory-segment-item-active:hover{background:var(--dsw-alias-button-elevated-fill,#fff);color:var(--dsw-alias-state-business-primary,#4176e6);font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.12)}
.dsh-memory-segment-item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3,rgba(255,255,255,.16))}
.dsh-memory-spacer{flex:1 1 auto;min-width:0}

/* \u2500\u2500 \u4E3B\u4ECE\u5E03\u5C40\uFF1A\u5361\u7247\u5185\u7559 16px \u8FB9\u8DDD\uFF0C\u5706\u89D2\u63CF\u8FB9\u5BB9\u5668 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-split{flex:1;min-height:0;margin:16px;display:flex;align-items:stretch;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:12px;overflow:hidden}

/* \u5DE6\u5217\uFF1A\u7D27\u51D1\u6761\u76EE\u5217\u8868 */
.dsh-memory-list-pane{flex:none;width:320px;box-sizing:border-box;margin:0;padding:8px;list-style:none;overflow-y:auto;border-right:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));display:flex;flex-direction:column;gap:2px}
.dsh-memory-list-section{display:flex;align-items:center;gap:6px;padding:12px 10px 6px;font-size:11px;font-weight:600;line-height:16px;letter-spacing:.04em;color:var(--dsw-alias-label-tertiary,#888);text-transform:none}
.dsh-memory-list-section-count{font-variant-numeric:tabular-nums;font-weight:400;color:var(--dsw-alias-label-dimmed,#666)}
/* \u884C\uFF1A\u9759\u9ED8\u63CF\u8FB9\u5F0F\uFF08\u65E0\u5E95\u8272\uFF09\uFF0C\u9009\u4E2D=\u54C1\u724C\u84DD\u6D45\u5E95 + \u5DE6\u4FA7 3px \u5F3A\u8C03\u6761\uFF08::before\uFF0C
   \u4E0D\u7528 border-left\u2014\u2014\u63CF\u8FB9\u4F1A\u4E0E 8px \u5706\u89D2\u5272\u51FA\u4E00\u622A\u76F4\u89D2\uFF09\u3002 */
.dsh-memory-item{position:relative;display:flex;align-items:flex-start;gap:8px;width:100%;box-sizing:border-box;padding:9px 10px 9px 12px;border:none;border-radius:8px;background:transparent;color:inherit;font-family:inherit;text-align:left;cursor:pointer;transition:background .16s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-memory-item-selected,.dsh-memory-item-selected:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4176e6) 10%,transparent)}
.dsh-memory-item-selected::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:0 2px 2px 0;background:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-item-selected .dsh-memory-item-title-text{font-weight:600;color:var(--dsw-alias-label-primary,#eee)}
/* \u591A\u9009\u52FE\u9009\u6846\uFF08\u81EA\u7ED8\uFF0C\u9009\u4E2D=\u54C1\u724C\u84DD\u5E95\u767D\u52FE\uFF09 */
.dsh-memory-item-check{flex:none;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;margin-top:2px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:4px;color:#fff}
.dsh-memory-item-selected .dsh-memory-item-check{border-color:var(--dsw-alias-state-business-primary,#4176e6);background:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-item-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.dsh-memory-item-title{display:flex;align-items:center;gap:4px;min-width:0}
.dsh-memory-item-title-text{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:20px;color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-item-snippet{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.dsh-memory-item-foot{display:flex;align-items:center;gap:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888)}
.dsh-memory-item-time{white-space:nowrap}
/* \u884C\u5185\u91CD\u8981\u5EA6\uFF1A3px \u8FF7\u4F60\u6761\uFF0C\u8DDF\u968F\u91CD\u8981\u5EA6\u5BBD\u5EA6\uFF08--pct \u7531\u5185\u8054\u6837\u5F0F\u7ED9\uFF09 */
.dsh-memory-item-score{position:relative;flex:none;width:34px;height:3px;border-radius:2px;background:var(--dsw-alias-border-l3,rgba(255,255,255,.16));overflow:hidden}
.dsh-memory-item-score::after{content:'';position:absolute;inset:0 auto 0 0;width:var(--pct,0%);border-radius:2px;background:var(--dsw-alias-state-business-primary,#4176e6)}

/* \u53F3\u4FA7\uFF1A\u8BE6\u60C5\u3002\u5934\u90E8 meta \u4E0E\u811A\u6CE8\u4E3A sticky \u5C42\u6B21\u7684\u9759\u6001\u533A\uFF0C\u6B63\u6587\u533A\u81EA\u7531\u6EDA\u52A8 */
.dsh-memory-detail-pane{flex:1;min-width:0;overflow-y:auto;padding:20px 24px 20px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box}
.dsh-memory-detail-head{display:flex;align-items:flex-start;gap:8px}
.dsh-memory-detail-title{flex:1;min-width:0;margin:0;font-size:17px;line-height:26px;font-weight:600;color:var(--dsw-alias-label-primary,#eee);word-break:break-word}
/* meta \u5FBD\u7AE0\u884C\uFF1ArowTag \u89C4\u683C + \u56FE\u6807\uFF1B\u8BED\u4E49\u8272\u8C03\uFF08\u624B\u52A8=\u54C1\u724C\u84DD / \u957F\u671F&\u7F6E\u9876=\u6696\u91D1\uFF09\uFF0C\u65F6\u95F4\u53F3\u63A8 */
.dsh-memory-detail-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.dsh-memory-meta-badge{display:inline-flex;align-items:center;gap:4px;max-width:220px;padding:1px 7px;border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:4px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#bbb);background:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-memory-meta-badge svg{flex:none}
.dsh-memory-meta-badge-accent{color:var(--dsw-alias-state-business-primary,#4176e6);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4176e6) 45%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4176e6) 10%,transparent)}
.dsh-memory-meta-badge-warn{color:var(--dsw-alias-state-warn-primary,#e8a33d);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 45%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 10%,transparent)}
.dsh-memory-meta-badge-muted{color:var(--dsw-alias-label-tertiary,#888);border-style:dashed}
.dsh-memory-meta-time{margin-left:auto;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888);white-space:nowrap}

/* \u6307\u6807\u5E26\uFF1A\u91CD\u8981\u5EA6 / \u7F6E\u4FE1\u5EA6\uFF08bg-module-platform \u586B\u5145\u9762\uFF0C\u4E0E\u6B63\u6587\u533A\u5206\u5C42\uFF09 */
.dsh-memory-importance-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:8px 12px;border-radius:8px;background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.04))}
.dsh-memory-importance-label{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.dsh-memory-importance-bar{position:relative;flex:none;width:96px;height:4px;border-radius:2px;background:var(--dsw-alias-border-l3,rgba(255,255,255,.16));overflow:hidden}
.dsh-memory-importance-bar i{position:absolute;top:0;bottom:0;left:0;display:block;border-radius:2px;background:var(--dsw-alias-state-business-primary,#4176e6);transition:width .3s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-importance-value{font-variant-numeric:tabular-nums;font-size:12px;line-height:18px;font-weight:600;color:var(--dsw-alias-label-primary,#eee)}
/* \u6307\u6807\u4E4B\u95F4\u7684\u5206\u9694\uFF08\u7B2C\u4E8C\u7EC4\u6307\u6807\u524D\u63A8\u4E00\u6BB5\u8DDD\u79BB\uFF09 */
.dsh-memory-importance-row .dsh-memory-stat-dot{margin:0 2px}

.dsh-memory-detail-body{min-width:0;flex:1;padding-top:2px;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary,#eee);word-break:break-word}
.dsh-memory-detail-body .dsh-better-markdown__markdown p{margin:0 0 8px}
.dsh-memory-detail-body .dsh-better-markdown__markdown p:last-child{margin-bottom:0}
.dsh-memory-detail-tags{display:flex;flex-wrap:wrap;gap:4px;padding-top:14px;border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06))}
/* \u8BE6\u60C5\u811A\u6CE8\uFF1A\u7248\u672C / \u521B\u5EFA\u65F6\u95F4 / \u547D\u4E2D\u65F6\u95F4\uFF08caption\uFF0C\u5F31\u5316\uFF09 */
.dsh-memory-detail-foot{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.06));font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888)}
/* \u6807\u7B7E\u5757\u7D27\u8DDF\u811A\u6CE8\u65F6\u4E0D\u91CD\u590D\u753B\u7EBF\uFF08\u907F\u514D\u4E24\u6761\u76F8\u90BB\u7EC6\u7EBF\uFF09 */
.dsh-memory-detail-tags+.dsh-memory-detail-foot{padding-top:0;border-top:none}

/* \u2500\u2500 \u6807\u7B7E chip\uFF1ArowTag \u89C4\u683C\uFF081px 6px\u3001border-l3\u3001r4\u300111/16\uFF09\u2500\u2500 */
.dsh-memory-chip{flex:none;display:inline-flex;align-items:center;padding:1px 6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#bbb);border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:4px;background:transparent;cursor:pointer;font-family:inherit}
.dsh-memory-chip:hover{color:var(--dsw-alias-label-primary,#eee);border-color:var(--dsw-alias-border-l2,rgba(255,255,255,.12))}
.dsh-memory-chip-active,.dsh-memory-chip-active:hover{color:var(--dsw-alias-state-business-primary,#4176e6);border-color:var(--dsw-alias-state-business-primary,#4176e6);background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4176e6) 10%,transparent)}

/* \u2500\u2500 \u56FE\u6807\u94AE\uFF1A\u5E38\u663E iconButton\uFF0828\xD728 r6\uFF09\u2500\u2500 */
.dsh-memory-card-actions{flex:none;display:flex;align-items:center;gap:4px;margin-left:auto}
.dsh-memory-icon-action{flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:6px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-tertiary,#888);box-sizing:border-box;transition:background .16s ease,color .16s ease}
.dsh-memory-icon-action:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-icon-action:disabled{opacity:.4;cursor:default}
.dsh-memory-icon-action-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger,rgba(224,67,75,.12));color:var(--dsw-alias-state-error-primary,#e0434b)}
.dsh-memory-icon-action-busy svg{animation:dsh-memory-spin 900ms linear infinite}
@keyframes dsh-memory-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.dsh-memory-pin-mark{flex:none;display:inline-flex;align-items:center;color:var(--dsw-alias-state-warn-primary,#e8a33d)}

/* \u2500\u2500 \u7A7A\u6001\uFF1Adashed \u5360\u4F4D\u76D2\uFF08\u56FE\u6807 + \u4E3B\u6587\u6848 + \u63D0\u793A\uFF09\u2500\u2500 */
.dsh-memory-empty{flex:1;min-height:120px;margin:16px;padding:24px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#888);text-align:center;border:1px dashed var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:12px;box-sizing:border-box}
.dsh-memory-empty-icon{display:inline-flex;color:var(--dsw-alias-label-dimmed,#666);opacity:.7}
.dsh-memory-empty-text{color:var(--dsw-alias-label-secondary,#bbb)}
.dsh-memory-empty-hint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-dimmed,#666);max-width:420px}
/* \u5DE6\u5217\u7A7A\u6001\uFF1A\u5360\u6EE1\u5217\u5BBD\u3001\u53BB\u5916\u8FB9\u8DDD\uFF08\u5217\u672C\u8EAB\u5DF2\u6709 8px \u5185\u8DDD\uFF09 */
.dsh-memory-list-pane .dsh-memory-empty{margin:0;min-height:0}
/* \u53F3\u5217\u7A7A\u6001\uFF1A\u8BE6\u60C5\u533A\u5DF2\u6709 20px \u5185\u8DDD\uFF0C\u4E0D\u518D\u53E0\u5916\u8FB9\u8DDD */
.dsh-memory-detail-pane .dsh-memory-empty{margin:0}

/* \u2500\u2500 \u53D8\u66F4\u5217\u8868\uFF08\u5168\u5BBD\uFF09\uFF1A\u63CF\u8FB9\u5361 + rowTag \u5F0F\u72B6\u6001\u5FBD\u7AE0 + \u524D\u540E\u5BF9\u6BD4 \u2500\u2500 */
.dsh-memory-card-list{flex:1;min-height:0;list-style:none;margin:0;padding:16px;display:flex;flex-direction:column;gap:8px;overflow-y:auto}
.dsh-memory-change-row{display:flex;align-items:flex-start;gap:10px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:12px;padding:12px 14px}
.dsh-memory-change-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.dsh-memory-change-badge{flex:none;margin-top:2px;padding:1px 6px;border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:4px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#bbb);white-space:nowrap}
.dsh-memory-change-badge-add{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary,#3aa675) 45%,transparent);color:var(--dsw-alias-state-success-primary,#3aa675);background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#3aa675) 10%,transparent)}
.dsh-memory-change-badge-promote{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 45%,transparent);color:var(--dsw-alias-state-warn-primary,#e8a33d);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 10%,transparent)}
.dsh-memory-change-badge-delete{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary,#e0434b) 45%,transparent);color:var(--dsw-alias-state-error-primary,#e0434b);background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#e0434b) 10%,transparent)}
/* \u4FEE\u8BA2\uFF08revise\uFF09\uFF1A\u4E2D\u6027\u63CF\u8FB9 + \u5F31\u7D2B\u84DD\u5F3A\u8C03\uFF0C\u8868\u793A\u300C\u91CD\u5199\u800C\u975E\u79FB\u9664\u300D */
.dsh-memory-change-badge-revise{border-color:color-mix(in srgb,var(--dsw-alias-state-info-primary,#5b9dff) 45%,transparent);color:var(--dsw-alias-state-info-primary,#5b9dff);background:color-mix(in srgb,var(--dsw-alias-state-info-primary,#5b9dff) 10%,transparent)}
/* \u8F6F\u5E9F\u5F03\uFF08retire\uFF09\uFF1A\u6696\u6A59\u63CF\u8FB9\uFF0C\u8868\u793A\u300C\u6DE1\u51FA\u800C\u975E\u6D88\u5931\u300D */
.dsh-memory-change-badge-retire{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 45%,transparent);color:var(--dsw-alias-state-warn-primary,#e8a33d);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 10%,transparent)}
.dsh-memory-change-old{color:var(--dsw-alias-label-tertiary,#888);text-decoration:line-through;opacity:.8}
.dsh-memory-change-new{color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-change-diff{flex:1;min-width:0;display:flex;align-items:stretch;gap:10px}
.dsh-memory-change-diff-col{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.dsh-memory-change-diff-divider{flex:none;width:1px;background:var(--dsw-alias-border-l2,rgba(255,255,255,.12))}
.dsh-memory-card-content{min-width:0;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary,#eee);white-space:pre-wrap;word-break:break-word}
.dsh-memory-card-meta{display:flex;align-items:center;gap:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888);flex-wrap:wrap}

/* \u2500\u2500 \u8868\u5355\u4EF6\uFF1A\u7F16\u8F91\u9762 = \u5B98\u65B9 .editor\uFF08bg-module-platform \u586B\u5145 + r12 + 14/16 \u5185\u8DDD\uFF09\u2500\u2500 */
.dsh-memory-detail-form{display:flex;flex-direction:column;gap:14px;border-radius:12px;background:var(--dsw-alias-bg-module-platform,#22262e);padding:16px;box-sizing:border-box}
.dsh-memory-form-title{font-size:14px;line-height:22px;font-weight:600;color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-field{display:flex;flex-direction:column;gap:6px;min-width:0}
.dsh-memory-field-label{display:inline-flex;align-items:center;gap:8px;font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary,#bbb)}
.dsh-memory-field-row{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap}
.dsh-memory-detail-form textarea,.dsh-memory-detail-form .dsh-memory-inline-input{box-sizing:border-box}
.dsh-memory-inline-input{height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:8px;padding:0 10px;font-size:14px;line-height:22px;font-family:inherit;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-layer-1,#1c1f26)}
.dsh-memory-inline-input::placeholder{color:var(--dsw-alias-label-dimmed,#666)}
.dsh-memory-inline-textarea{min-height:64px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:8px;padding:8px 10px;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-layer-1,#1c1f26);resize:vertical;font-family:inherit;width:100%}
.dsh-memory-inline-textarea::placeholder{color:var(--dsw-alias-label-dimmed,#666)}
.dsh-memory-add-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dsh-memory-check{display:inline-flex;align-items:center;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb);cursor:pointer}
.dsh-memory-check input{accent-color:var(--dsw-alias-state-business-primary,#4176e6);margin:0}

/* \u2500\u2500 \u5F00\u5173\uFF08DSH \u89C4\u683C\uFF1A\u5F00=state-business-primary \u5E95\u767D\u94AE\uFF1B\u5173=border-l2 \u5E95\u7070\u94AE\uFF09\u2500\u2500 */
.dsh-memory-switch-line{display:inline-flex;align-items:center;gap:8px}
.dsh-memory-switch{position:relative;flex:none;width:40px;height:22px;border:none;border-radius:11px;padding:0;background:var(--dsw-alias-border-l2,rgba(255,255,255,.14));cursor:pointer;transition:background .16s cubic-bezier(.2,.8,.2,1);box-sizing:border-box}
.dsh-memory-switch::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--dsw-alias-label-tertiary,#81858c);box-shadow:0 1px 3px rgba(0,0,0,.35);transition:transform .16s cubic-bezier(.2,.8,.2,1),background .16s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-switch[aria-checked='true']{background:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-switch[aria-checked='true']::after{transform:translateX(18px);background:#fff}
.dsh-memory-switch:disabled{opacity:.5;cursor:default}
.dsh-memory-switch-text{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb)}

/* \u2500\u2500 \u591A\u9009\u64CD\u4F5C\u680F \u2500\u2500 */
.dsh-memory-batch-count{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary,#eee);font-variant-numeric:tabular-nums}
.dsh-memory-edit-buttons{display:flex;align-items:center;justify-content:flex-end;gap:8px}

/* \u2500\u2500 \u6CE8\u5165\u5F00\u5173\uFF08composer \u5DE5\u5177\u884C\uFF09\uFF1AiconButton \u89C4\u683C \u2500\u2500 */
.dsh-memory-toggle{flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:6px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-tertiary,#888);box-sizing:border-box}
.dsh-memory-toggle:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-memory-toggle-on,.dsh-memory-toggle-on:hover{color:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-toggle-off{color:var(--dsw-alias-label-tertiary,#888);opacity:.55}

.dsh-memory-error{flex:none;margin:12px 16px 0;padding:8px 12px;border-radius:8px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary,#e0434b) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#e0434b) 8%,transparent);font-size:12px;line-height:18px;color:var(--dsw-alias-state-error-primary,#e0434b)}
.dsh-memory-notice{flex:none;margin:12px 16px 0;padding:8px 12px;border-radius:8px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-success-primary,#3aa675) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary,#3aa675) 8%,transparent);font-size:12px;line-height:18px;color:var(--dsw-alias-state-success-primary,#3aa675)}

/* \u2500\u2500 \u4FEE\u8BA2\u7248\u672C\uFF08\u56DE\u6EDA\u6309\u94AE\u884C\uFF09\u2500\u2500 */
.dsh-memory-rev-actions{display:flex;align-items:center;gap:8px}

/* \u2500\u2500 \u8BBE\u7F6E Tab\uFF1A\u5206\u7EC4 + \u884C\u5361\u7247\uFF08label/hint \u5DE6\uFF0C\u63A7\u4EF6\u53F3\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-settings-body{flex:1;min-height:0;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:20px}
.dsh-memory-settings-group{display:flex;flex-direction:column;gap:2px}
.dsh-memory-settings-group-title{padding:0 2px 6px;font-size:14px;font-weight:600;line-height:22px;color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-settings-row{display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:12px;box-sizing:border-box}
.dsh-memory-settings-row+.dsh-memory-settings-row{margin-top:6px}
.dsh-memory-settings-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.dsh-memory-settings-label{font-size:14px;line-height:22px;font-weight:500;color:var(--dsw-alias-label-primary,#eee)}
.dsh-memory-settings-hint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.dsh-memory-settings-control{flex:none;display:flex;align-items:center;gap:8px}
.dsh-memory-number-input{width:96px;height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:8px;padding:0 10px;font-size:14px;line-height:22px;font-family:inherit;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-layer-1,#1c1f26)}
.dsh-memory-settings-foot{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding-top:4px}

/* \u2500\u2500 \u9AA8\u67B6\u5C4F\uFF08\u9996\u6B21\u52A0\u8F7D\uFF0C\u66FF\u4EE3\u300C\u8BFB\u53D6\u4E2D\u2026\u300D\u6587\u5B57\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-skeleton{flex:1;min-height:0;display:flex;flex-direction:column;gap:8px;padding:16px}
.dsh-memory-skeleton-row{height:48px;border-radius:10px;background:var(--dsw-alias-bg-skeleton,rgba(255,255,255,.06));animation:dsh-memory-pulse 1.4s ease-in-out infinite}
.dsh-memory-skeleton-row:nth-child(2){animation-delay:.12s}
.dsh-memory-skeleton-row:nth-child(3){animation-delay:.24s}
.dsh-memory-skeleton-row:nth-child(4){animation-delay:.36s}
@keyframes dsh-memory-pulse{0%,100%{opacity:.45}50%{opacity:.9}}

/* \u2500\u2500 focus \u89C4\u8303\uFF08\u54C1\u724C\u84DD\u63CF\u8FB9\uFF0C\u7EDD\u4E0D\u7528\u53CD\u8272 brand-primary\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dsh-memory-search-input:focus,.dsh-memory-search-input:focus-visible,
.dsh-memory-inline-input:focus,.dsh-memory-inline-input:focus-visible,
.dsh-memory-inline-textarea:focus,.dsh-memory-inline-textarea:focus-visible,
.dsh-memory-number-input:focus,.dsh-memory-number-input:focus-visible,
.dsh-memory-tag-select:focus,.dsh-memory-tag-select:focus-visible{outline:none;border-color:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-tab:focus-visible,.dsh-memory-chip:focus-visible,
.dsh-memory-icon-action:focus-visible,.dsh-memory-toggle:focus-visible,.dsh-memory-item:focus-visible,
.dsh-memory-switch:focus-visible,.dsh-memory-search-clear:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3,rgba(255,255,255,.16))}

/* \u2500\u2500 \u6761\u76EE\u542F\u7528\u5F00\u5173\uFF1A\u884C\u5185\u8FF7\u4F60\u5F00\u5173\uFF08span role=switch\uFF0C\u907F\u514D button \u5D4C\u5957\uFF09+ \u7981\u7528\u5F31\u5316 \u2500\u2500 */
.dsh-memory-item-row{position:relative}
.dsh-memory-item-row .dsh-memory-item{padding-right:52px}
.dsh-memory-mini-switch{position:absolute;top:11px;right:10px;z-index:1;width:28px;height:16px;border-radius:8px;background:var(--dsw-alias-border-l3,rgba(255,255,255,.16));cursor:pointer;transition:background .16s cubic-bezier(.2,.8,.2,1);box-sizing:border-box}
.dsh-memory-mini-switch::after{content:'';position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:var(--dsw-alias-label-tertiary,#81858c);box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .16s cubic-bezier(.2,.8,.2,1),background .16s cubic-bezier(.2,.8,.2,1)}
.dsh-memory-mini-switch:hover{background:var(--dsw-alias-border-l4,rgba(255,255,255,.2))}
.dsh-memory-mini-switch-on,.dsh-memory-mini-switch-on:hover{background:var(--dsw-alias-state-business-primary,#4176e6)}
.dsh-memory-mini-switch-on::after{transform:translateX(12px);background:#fff}
.dsh-memory-mini-switch:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3,rgba(255,255,255,.16))}
.dsh-memory-item-disabled{opacity:.55}
/* \u8F6F\u5E9F\u5F03\u6761\u76EE\uFF1A\u6574\u4F53\u6DE1\u5316 + \u5220\u9664\u7EBF\u8FC7\u6E21\uFF08\u7981\u7528=\u51BB\u7ED3\uFF0C\u5E9F\u5F03=\u6DE1\u51FA\uFF1Bhover \u5FAE\u53CD\u9988\uFF09 */
.dsh-memory-item-retired{opacity:.6;transition:opacity .2s ease}
.dsh-memory-item-retired:hover{opacity:.85}
.dsh-memory-item-retired .dsh-memory-item-title-text{text-decoration:line-through;text-decoration-color:var(--dsw-alias-state-warn-primary,#e8a33d);text-decoration-thickness:1px}
.dsh-memory-disabled-mark{flex:none;margin-left:2px;padding:0 5px;border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.18));border-radius:4px;font-size:10px;line-height:14px;color:var(--dsw-alias-label-tertiary,#999);white-space:nowrap}
/* \u8F6F\u5E9F\u5F03\u5FBD\u6807\uFF08retired\uFF09\uFF1A\u4E0E\u7981\u7528\u540C\u6B3E\u51E0\u4F55\uFF0C\u6696\u6A59\u63CF\u8FB9\u533A\u5206\u300C\u5DF2\u6DE1\u51FA\u300D\u72B6\u6001 */
.dsh-memory-retired-mark{flex:none;margin-left:2px;padding:0 5px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 45%,transparent);border-radius:4px;font-size:10px;line-height:14px;color:var(--dsw-alias-state-warn-primary,#e8a33d);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#e8a33d) 10%,transparent);white-space:nowrap}
/* \u884C\u5185\u4F5C\u7528\u57DF\u5FBD\u7AE0\uFF08\u5168\u5C40/\u9879\u76EE\u540D\uFF09\uFF1A\u4E2D\u6027\u8272\u7D27\u51D1\u7248\uFF0C\u56FE\u6807+\u77ED\u540D\uFF0C\u8D85\u957F\u7701\u7565 */
.dsh-memory-scope-badge{flex:none;display:inline-flex;align-items:center;gap:3px;max-width:88px;padding:0 5px;border:1px solid var(--dsw-alias-border-l3,rgba(255,255,255,.16));border-radius:4px;font-size:10px;line-height:15px;color:var(--dsw-alias-label-tertiary,#999);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-memory-scope-badge svg{flex:none}

/* \u2500\u2500 \u7A84\u5C4F\uFF1A\u6536\u7A84\u5DE6\u5217 / \u4E3B\u4ECE\u6539\u4E0A\u4E0B\u5806\u53E0 \u2500\u2500 */
@media (max-width: 1100px) {
  .dsh-memory-list-pane{width:280px}
  .dsh-memory-stat-bar .dsh-memory-stat-long{display:none}
}
@media (max-width: 900px) {
  .dsh-memory-list-pane{width:250px}
  .dsh-memory-stat-bar{display:none}
}
@media (max-width: 767.98px) {
  .dsh-memory-split{flex-direction:column;margin:12px}
  .dsh-memory-list-pane{width:100%;max-height:40%;border-right:none;border-bottom:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12))}
  .dsh-memory-search-row{flex-wrap:wrap}
  .dsh-memory-search-box{max-width:none}
  .dsh-memory-settings-row{align-items:flex-start;flex-direction:column;gap:8px}
  .dsh-memory-settings-control{width:100%;justify-content:flex-start}
}
@media (prefers-reduced-motion: reduce) {
  .dsh-memory-skeleton-row,.dsh-memory-icon-action-busy svg{animation:none}
  .dsh-memory-importance-bar i{transition:none}
}
/* \u2500\u2500 \u8BB0\u5FC6\u6B63\u6587\u7684\u8F7B\u91CF Markdown\uFF08\u66FF\u4EE3 webui \u5168\u91CF\u6E32\u67D3\u5668\uFF0C\u89C1 markdown.tsx\uFF09 \u2500\u2500 */
.dsh-triad-md{font-size:14px;line-height:1.7;color:var(--dsw-alias-text-primary,#1f2329);word-break:break-word}
.dsh-triad-md>*:first-child{margin-top:0}
.dsh-triad-md>*:last-child{margin-bottom:0}
.dsh-triad-md__p{margin:0 0 8px}
.dsh-triad-md__h{margin:16px 0 8px;font-weight:600;line-height:1.4}
.dsh-triad-md__h:first-child{margin-top:0}
.dsh-triad-md__list{margin:0 0 8px;padding-left:20px}
.dsh-triad-md__list li{margin:2px 0}
.dsh-triad-md__quote{margin:0 0 8px;padding:2px 0 2px 10px;border-left:2px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));color:var(--dsw-alias-text-secondary,#5c6270)}
.dsh-triad-md__code{padding:1px 5px;border-radius:4px;background:var(--dsw-alias-bg-module-platform,rgba(0,0,0,.05));font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.92em}
.dsh-triad-md__pre{margin:0 0 8px;padding:10px 12px;border-radius:8px;overflow-x:auto;background:var(--dsw-alias-bg-module-platform,rgba(0,0,0,.05));font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;white-space:pre}
.dsh-triad-md__pre code{background:none;padding:0}
.dsh-triad-md__hr{margin:12px 0;border:0;border-top:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12))}
.dsh-triad-md__link{color:var(--dsw-alias-state-business-primary,#2c6bed);text-decoration:none}
.dsh-triad-md__link:hover{text-decoration:underline}
`;
function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID;
  tag.dataset.plugin = "dsh-triad";
  tag.textContent = SHEET;
  document.head.appendChild(tag);
}

// src/client/memory/SettingsTab.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime2 = require("react/jsx-runtime");
var BOUNDS = {
  extractEveryTurns: { min: 1, max: 100, step: 1 },
  compileEveryTurns: { min: 1, max: 500, step: 1 },
  compileThreshold: { min: 0, max: 20, step: 0.5 },
  decayLambda: { min: 0, max: 0.5, step: 0.01 },
  hitBonus: { min: 0, max: 10, step: 0.5 },
  injectTokenBudget: { min: 1e3, max: 6e4, step: 500 },
  extractMaxChars: { min: 500, max: 6e4, step: 500 },
  minImportance: { min: 1, max: 10, step: 0.5 },
  consolidateMaxEntries: { min: 10, max: 2e3, step: 10 },
  consolidateTimeoutMs: { min: 5e3, max: 6e5, step: 5e3 },
  injectTopK: { min: 1, max: 50, step: 1 },
  entryLimit: { min: 50, max: 1e5, step: 50 }
};
function Row({ label, hint, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: css.settingsRow, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: css.settingsMain, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: css.settingsLabel, children: label }),
      hint !== void 0 && hint !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: css.settingsHint, children: hint })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: css.settingsControl, children })
  ] });
}
function TextRow({ label, hint, value, placeholder, disabled, type = "text", onCommit }) {
  const [draft, setDraft] = (0, import_react2.useState)(value ?? "");
  (0, import_react2.useEffect)(() => {
    setDraft(value ?? "");
  }, [value]);
  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed !== (value ?? "")) onCommit(trimmed);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label, hint, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "input",
    {
      type,
      className: css.inlineInput,
      style: { width: 200 },
      "aria-label": label,
      placeholder,
      value: draft,
      disabled,
      onChange: (event) => {
        setDraft(event.currentTarget.value);
      },
      onBlur: commit,
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
      }
    }
  ) });
}
function SwitchRow({ label, hint, value, disabled, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label, hint, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": value,
      "aria-label": label,
      disabled,
      className: css.switch,
      onClick: () => {
        onChange(!value);
      }
    }
  ) });
}
function NumberRow({ label, hint, field, value, t, onCommit }) {
  const bounds = BOUNDS[field];
  const [draft, setDraft] = (0, import_react2.useState)(value === void 0 ? "" : String(value));
  (0, import_react2.useEffect)(() => {
    setDraft(value === void 0 ? "" : String(value));
  }, [value]);
  const commit = () => {
    const parsed = Number(draft);
    if (draft.trim() === "" || !Number.isFinite(parsed)) {
      setDraft(value === void 0 ? "" : String(value));
      return;
    }
    const clamped = Math.min(bounds.max, Math.max(bounds.min, parsed));
    setDraft(String(clamped));
    if (clamped !== value) onCommit(clamped);
  };
  const rangeHint = t("rangeHint", { min: bounds.min, max: bounds.max });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label, hint: hint !== void 0 && hint !== "" ? `${hint} ${rangeHint}` : rangeHint, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "input",
    {
      type: "number",
      className: css.numberInput,
      "aria-label": label,
      min: bounds.min,
      max: bounds.max,
      step: bounds.step,
      value: draft,
      onChange: (event) => {
        setDraft(event.currentTarget.value);
      },
      onBlur: commit,
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
      }
    }
  ) });
}
function SettingsTab({ config, busy = false, t, onPatch, onReset }) {
  if (config === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: css.skeleton, "aria-busy": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.skeletonRow }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.skeletonRow }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.skeletonRow }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.skeletonRow })
    ] });
  }
  const num = (field) => config[field];
  const bool = (field) => config[field] === true;
  const str = (field) => config[field];
  const setNum = (field) => (next) => {
    onPatch({ [field]: next });
  };
  const setBool = (field) => (next) => {
    onPatch({ [field]: next });
  };
  const setStr = (field) => (next) => {
    onPatch({ [field]: next });
  };
  const embeddingOn = config.embeddingProvider !== void 0 && config.embeddingProvider !== "off";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: css.settingsBody, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupInject") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgInjectTopK"), hint: t("cfgInjectTopKHint"), field: "injectTopK", value: num("injectTopK"), t, onCommit: setNum("injectTopK") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgInjectTokenBudget"), field: "injectTokenBudget", value: num("injectTokenBudget"), t, onCommit: setNum("injectTokenBudget") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupExtract") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgExtractEveryTurns"), hint: t("cfgExtractEveryTurnsHint"), field: "extractEveryTurns", value: num("extractEveryTurns"), t, onCommit: setNum("extractEveryTurns") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgMinImportance"), hint: t("cfgMinImportanceHint"), field: "minImportance", value: num("minImportance"), t, onCommit: setNum("minImportance") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgExtractMaxChars"), field: "extractMaxChars", value: num("extractMaxChars"), t, onCommit: setNum("extractMaxChars") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupCompile") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SwitchRow, { label: t("cfgDailyCompile"), value: bool("dailyCompileEnabled"), disabled: busy, onChange: setBool("dailyCompileEnabled") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgCompileEveryTurns"), field: "compileEveryTurns", value: num("compileEveryTurns"), t, onCommit: setNum("compileEveryTurns") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgCompileThreshold"), field: "compileThreshold", value: num("compileThreshold"), t, onCommit: setNum("compileThreshold") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgDecayLambda"), hint: t("cfgDecayLambdaHint"), field: "decayLambda", value: num("decayLambda"), t, onCommit: setNum("decayLambda") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgHitBonus"), field: "hitBonus", value: num("hitBonus"), t, onCommit: setNum("hitBonus") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgEntryLimit"), hint: t("cfgEntryLimitHint"), field: "entryLimit", value: num("entryLimit"), t, onCommit: setNum("entryLimit") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupConsolidate") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SwitchRow, { label: t("cfgConsolidate"), hint: t("consolidateHint"), value: bool("consolidateEnabled"), disabled: busy, onChange: setBool("consolidateEnabled") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgConsolidateMax"), field: "consolidateMaxEntries", value: num("consolidateMaxEntries"), t, onCommit: setNum("consolidateMaxEntries") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NumberRow, { label: t("cfgConsolidateTimeout"), field: "consolidateTimeoutMs", value: num("consolidateTimeoutMs"), t, onCommit: setNum("consolidateTimeoutMs") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupEmbedding") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: t("cfgEmbeddingProvider"), hint: t("cfgEmbeddingProviderHint"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "select",
        {
          className: css.tagSelect,
          "aria-label": t("cfgEmbeddingProvider"),
          value: config.embeddingProvider ?? "off",
          disabled: busy,
          onChange: (event) => {
            onPatch({ embeddingProvider: event.currentTarget.value });
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "off", children: t("cfgEmbeddingOff") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "http", children: t("cfgEmbeddingHttp") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "local", children: t("cfgEmbeddingLocal") })
          ]
        }
      ) }),
      embeddingOn && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TextRow, { label: t("cfgEmbeddingBaseUrl"), hint: t("cfgEmbeddingBaseUrlHint"), value: str("embeddingBaseUrl"), placeholder: "https://api.openai.com/v1", disabled: busy, onCommit: setStr("embeddingBaseUrl") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TextRow, { label: t("cfgEmbeddingModel"), hint: t("cfgEmbeddingModelHint"), value: str("embeddingModel"), placeholder: "text-embedding-3-small", disabled: busy, onCommit: setStr("embeddingModel") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TextRow, { label: t("cfgEmbeddingApiKey"), hint: t("cfgEmbeddingApiKeyHint"), value: str("embeddingApiKey"), placeholder: t("cfgEmbeddingApiKeyPlaceholder"), type: "password", disabled: busy, onCommit: setStr("embeddingApiKey") }),
        config.embeddingProvider === "local" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.settingsHint, children: t("cfgEmbeddingLocalHint") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: css.settingsGroup, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: css.settingsGroupTitle, children: t("settingsGroupDiag") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SwitchRow, { label: t("cfgLogApi"), hint: t("cfgLogApiHint"), value: bool("logApiRequests"), disabled: busy, onChange: setBool("logApiRequests") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: css.settingsFoot, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", size: "sm", disabled: busy, onClick: onReset, children: t("settingsReset") }) })
  ] });
}

// src/client/memory/locales.ts
var zh = {
  entry: "\u8BB0\u5FC6",
  panelTitle: "\u8BB0\u5FC6",
  tabAll: "\u5168\u90E8",
  tabChanges: "\u53D8\u66F4",
  tabPinned: "\u7F6E\u9876",
  searchPlaceholder: "\u641C\u7D22\u8BB0\u5FC6\u2026",
  tagFilterPlaceholder: "\u5168\u90E8\u6807\u7B7E",
  scopeGlobal: "\u5168\u5C40",
  groupToday: "\u4ECA\u5929",
  groupWeek: "\u672C\u5468",
  groupEarlier: "\u66F4\u65E9",
  groupLongterm: "\u957F\u671F\u6C89\u6DC0",
  empty: "\u4F1A\u8BDD\u4E2D\u7684\u8981\u70B9\u4F1A\u81EA\u52A8\u6C89\u6DC0\u5230\u8FD9\u91CC",
  changesEmpty: "\u4ECA\u5929\u8FD8\u6CA1\u6709\u65B0\u7684\u8BB0\u5FC6\u53D8\u66F4",
  pin: "\u7F6E\u9876",
  unpin: "\u53D6\u6D88\u7F6E\u9876",
  edit: "\u7F16\u8F91",
  delete: "\u5220\u9664",
  move: "\u79FB\u9879\u76EE",
  deleteConfirm: "\u5220\u9664\u8FD9\u6761\u8BB0\u5FC6\uFF1F",
  tagEditPlaceholder: "\u9017\u53F7\u5206\u9694\u6807\u7B7E",
  save: "\u4FDD\u5B58",
  cancel: "\u53D6\u6D88",
  moveToGlobal: "\u79FB\u5230\u5168\u5C40",
  moveToProject: "\u79FB\u5230\u9879\u76EE",
  projectPlaceholder: "\u9879\u76EE\u8DEF\u5F84\u6216 hash",
  error: "\u8BFB\u53D6\u5931\u8D25",
  retry: "\u91CD\u8BD5",
  noProjects: "\u8FD8\u6CA1\u6709\u9879\u76EE\u8BB0\u5FC6",
  unreadChanges: "{n} \u6761\u65B0\u53D8\u66F4",
  close: "\u5173\u95ED",
  sourceExtract: "\u81EA\u52A8",
  sourceManual: "\u624B\u52A8",
  add: "\u6DFB\u52A0",
  addContentPlaceholder: "\u8981\u8BB0\u4F4F\u7684\u5185\u5BB9\u2026",
  addTagsPlaceholder: "\u9017\u53F7\u5206\u9694\u6807\u7B7E",
  addPinned: "\u7F6E\u9876",
  selectProject: "\u8BF7\u9009\u62E9\u9879\u76EE",
  sensitiveConfirm: "\u5185\u5BB9\u5305\u542B\u7591\u4F3C\u654F\u611F\u4FE1\u606F\uFF08token/\u5BC6\u94A5\u7B49\uFF09\u3002\u4ECD\u8981\u4FDD\u5B58\u5417\uFF1F\u4FDD\u5B58\u540E\u6CE8\u5165\u4E0A\u4E0B\u6587\u53EF\u80FD\u88AB\u6A21\u578B\u8BFB\u53D6\uFF0C\u98CE\u9669\u81EA\u62C5\u3002",
  injectOn: "\u8BB0\u5FC6\u6CE8\u5165\uFF1A\u5F00",
  injectOff: "\u8BB0\u5FC6\u6CE8\u5165\uFF1A\u5173",
  diffOld: "\u65E7",
  diffNew: "\u65B0",
  clearProject: "\u6E05\u7A7A\u8BE5\u9879\u76EE\u5168\u90E8\u8BB0\u5FC6",
  clearProjectConfirm: "\u786E\u5B9A\u6E05\u7A7A\u9879\u76EE\u300C{name}\u300D\u7684 {count} \u6761\u8BB0\u5FC6\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002\u7F6E\u9876\u8BB0\u5FC6\u4F1A\u4FDD\u7559\uFF0C\u4E0D\u4F1A\u88AB\u5220\u9664\u3002",
  addSaved: "\u5DF2\u6DFB\u52A0\u8BB0\u5FC6",
  autoMemory: "\u81EA\u52A8\u8BB0\u5FC6",
  collapse: "\u6536\u8D77",
  multiSelect: "\u591A\u9009",
  selectAll: "\u5168\u9009",
  selectedCount: "\u5DF2\u9009 {n} \u9879",
  deleteSelectedConfirm: "\u786E\u5B9A\u5220\u9664\u9009\u4E2D\u7684 {n} \u6761\u8BB0\u5FC6\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002",
  tabRevisions: "\u4FEE\u8BA2",
  tabSettings: "\u8BBE\u7F6E",
  consolidate: "\u6574\u7406",
  consolidateHint: "\u7528\u6A21\u578B\u5408\u5E76\u91CD\u590D\u3001\u7CBE\u70BC\u91CD\u5199\u3001\u5220\u9664\u4F4E\u4EF7\u503C\u3001\u63D0\u5347\u957F\u671F\uFF08Memory Dream\uFF09",
  consolidating: "\u6574\u7406\u4E2D\u2026",
  revisionsEmpty: "\u8FD8\u6CA1\u6709\u6574\u7406\u5FEB\u7167\uFF1B\u6BCF\u5929\u81EA\u52A8\u6574\u7406\u6216\u624B\u52A8\u6574\u7406\u540E\u751F\u6210",
  revManual: "\u624B\u52A8",
  revDaily: "\u6BCF\u65E5",
  revEntries: "{n} \u6761",
  rollback: "\u56DE\u6EDA",
  rollbackConfirm: "\u56DE\u6EDA\u5230\u8BE5\u5FEB\u7167\uFF08{time}\uFF0C{id}\uFF09\uFF1F\u5F53\u524D\u5168\u90E8\u8BB0\u5FC6\u5C06\u88AB\u66FF\u6362\u4E3A\u8BE5\u5FEB\u7167\u5185\u5BB9\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",
  enable: "\u542F\u7528\u8BB0\u5FC6\uFF08\u6062\u590D\u53C2\u4E0E\u6CE8\u5165\uFF09",
  disable: "\u7981\u7528\u8BB0\u5FC6\uFF08\u4FDD\u7559\u4F46\u4E0D\u53C2\u4E0E\u6CE8\u5165\uFF09",
  enabledAria: "\u542F\u7528\u5F00\u5173\uFF0C\u5F53\u524D\u5F00\u542F",
  disabledAria: "\u542F\u7528\u5F00\u5173\uFF0C\u5F53\u524D\u7981\u7528",
  disabledTag: "\u5DF2\u7981\u7528",
  importanceTitle: "\u91CD\u8981\u5EA6",
  // ── schema v3：软废弃（retire / revise） ──
  retire: "\u5E9F\u5F03\uFF08\u4FDD\u7559\u6570\u636E\uFF09",
  retireConfirm: "\u8F6F\u5E9F\u5F03\u8FD9\u6761\u8BB0\u5FC6\uFF1F\u6570\u636E\u4FDD\u7559\u4F46\u4E0D\u518D\u6CE8\u5165/\u68C0\u7D22/\u7F16\u8BD1\uFF0C\u53EF\u5728\u53D8\u66F4\u8BB0\u5F55\u4E2D\u627E\u56DE\u3002",
  restore: "\u6062\u590D",
  restoreConfirm: "\u6062\u590D\u8FD9\u6761\u5DF2\u5E9F\u5F03\u7684\u8BB0\u5FC6\uFF08\u91CD\u65B0\u53C2\u4E0E\u6CE8\u5165/\u68C0\u7D22/\u7F16\u8BD1\uFF09\uFF1F",
  retiredTag: "\u5DF2\u5E9F\u5F03",
  revise: "\u4FEE\u8BA2",
  reviseTitle: "\u4FEE\u8BA2\u8BB0\u5FC6",
  reviseReasonPlaceholder: "\u4FEE\u8BA2\u539F\u56E0\uFF08\u53EF\u9009\uFF09",
  reviseTo: "\u4FEE\u8BA2\u4E3A\u65B0\u5185\u5BB9",
  // ── 统计条 / 整理 / 项目别名 / 元信息 / 设置分组 ──
  statEntries: "\u6761\u8BB0\u5FC6",
  statProjects: "\u4E2A\u9879\u76EE",
  consolidateDone: "\u6574\u7406\u5B8C\u6210\uFF1A{n} \u5904\u53D8\u52A8",
  consolidateNoop: "\u8BB0\u5FC6\u5DF2\u662F\u6700\u4F73\u72B6\u6001\uFF0C\u65E0\u9700\u6574\u7406",
  consolidateConfirm: "\u7528\u6A21\u578B\u6574\u7406\u8BB0\u5FC6\uFF08\u5408\u5E76\u91CD\u590D / \u7CBE\u70BC\u91CD\u5199 / \u5220\u9664\u4F4E\u4EF7\u503C / \u63D0\u5347\u957F\u671F\uFF09\uFF1F\u6574\u7406\u524D\u4F1A\u81EA\u52A8\u5B58\u5FEB\u7167\uFF0C\u53EF\u5728\u300C\u4FEE\u8BA2\u300DTab \u4E00\u952E\u56DE\u6EDA\u3002",
  projectAlias: "\u9879\u76EE\u522B\u540D",
  aliasPlaceholder: "\u672A\u547D\u540D\uFF08\u9ED8\u8BA4\u53D6\u76EE\u5F55\u540D\uFF09",
  aliasSaved: "\u522B\u540D\u5DF2\u4FDD\u5B58",
  kindLabel: "\u7C7B\u578B",
  kindIdentity: "\u8EAB\u4EFD",
  kindPreference: "\u504F\u597D",
  kindFact: "\u4E8B\u5B9E",
  kindDecision: "\u51B3\u7B56",
  kindGotcha: "\u8E29\u5751",
  kindSession: "\u4F1A\u8BDD\u6458\u8981",
  verified: "\u5DF2\u786E\u8BA4",
  unverified: "\u5F85\u786E\u8BA4",
  confidenceTitle: "\u7F6E\u4FE1\u5EA6",
  versionTitle: "\u7248\u672C v{n}",
  createdAtLabel: "\u521B\u5EFA\u4E8E {time}",
  lastHitLabel: "\u4E0A\u6B21\u547D\u4E2D {time}",
  neverHit: "\u4ECE\u672A\u547D\u4E2D",
  importanceField: "\u91CD\u8981\u5EA6 1-10",
  changesToday: "\u4ECA\u5929",
  changesAll: "\u5168\u90E8",
  changeAdd: "\u65B0\u589E",
  changeUpdate: "\u66F4\u65B0",
  changePromote: "\u6C89\u6DC0",
  changeDelete: "\u5220\u9664",
  changeRevise: "\u4FEE\u8BA2",
  changeRetire: "\u5E9F\u5F03",
  settingsGroupInject: "\u6CE8\u5165",
  settingsGroupExtract: "\u63D0\u53D6",
  settingsGroupCompile: "\u7F16\u8BD1\u4E0E\u8870\u51CF",
  settingsGroupConsolidate: "\u6574\u7406\uFF08Memory Dream\uFF09",
  settingsGroupEmbedding: "\u8BED\u4E49\u68C0\u7D22\uFF08embedding\uFF09",
  settingsGroupDiag: "\u8BCA\u65AD",
  settingsReset: "\u6062\u590D\u9ED8\u8BA4",
  settingsResetConfirm: "\u628A\u8BB0\u5FC6\u5F15\u64CE\u7684\u5168\u90E8\u8FD0\u884C\u65F6\u8BBE\u7F6E\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C\uFF1F",
  cfgEmbeddingProvider: "\u8BED\u4E49\u68C0\u7D22\u540E\u7AEF",
  cfgEmbeddingProviderHint: "off=\u5173\u95ED\uFF08\u6DF7\u5408\u68C0\u7D22\uFF09\uFF1Bhttp=OpenAI \u517C\u5BB9 API\uFF1Blocal=\u672C\u5730 ONNX\uFF08\u9700\u5B89\u88C5 @xenova/transformers\uFF09\u3002",
  cfgEmbeddingOff: "\u5173\u95ED",
  cfgEmbeddingHttp: "HTTP API",
  cfgEmbeddingLocal: "\u672C\u5730\u6A21\u578B",
  cfgEmbeddingBaseUrl: "API \u5730\u5740",
  cfgEmbeddingBaseUrlHint: "OpenAI \u517C\u5BB9\u7AEF\u70B9\uFF0C\u5982 https://api.openai.com/v1 \u6216 ollama \u7684 http://localhost:11434/v1\u3002",
  cfgEmbeddingModel: "\u6A21\u578B",
  cfgEmbeddingModelHint: "\u5982 text-embedding-3-small / Xenova/all-MiniLM-L6-v2\u3002",
  cfgEmbeddingApiKey: "API \u5BC6\u94A5",
  cfgEmbeddingApiKeyHint: "\u4E5F\u53EF\u7528\u73AF\u5883\u53D8\u91CF DSH_MEMORY_EMBEDDING_API_KEY\uFF0C\u7559\u7A7A\u5219\u8BFB\u53D6\u73AF\u5883\u53D8\u91CF\u3002",
  cfgEmbeddingApiKeyPlaceholder: "sk-\u2026\uFF08\u6216\u7559\u7A7A\u7528\u73AF\u5883\u53D8\u91CF\uFF09",
  cfgEmbeddingLocalHint: "\u672C\u5730\u6A21\u5F0F\u9700\u5728\u63D2\u4EF6\u4F9D\u8D56\u4E2D\u5B89\u88C5 @xenova/transformers\uFF1B\u672A\u5B89\u88C5\u65F6\u81EA\u52A8\u56DE\u9000\u6DF7\u5408\u68C0\u7D22\u3002",
  cfgExtractEveryTurns: "\u6BCF N \u8F6E\u63D0\u53D6\u4E00\u6B21",
  cfgExtractEveryTurnsHint: "1 = \u6BCF\u8F6E\u90FD\u63D0\u53D6\uFF1B\u8C03\u5927\u53EF\u7701 token\u3002",
  cfgExtractMaxChars: "\u63D0\u53D6\u7A97\u53E3\u6700\u5927\u5B57\u7B26\u6570",
  cfgMinImportance: "\u63D0\u53D6\u91CD\u8981\u6027\u4E0B\u9650",
  cfgMinImportanceHint: "\u4F4E\u4E8E\u8BE5\u5206\u7684\u5019\u9009\u76F4\u63A5\u4E22\u5F03\uFF081-10\uFF09\u3002",
  cfgInjectTopK: "\u6CE8\u5165\u68C0\u7D22\u6761\u6570 top-k",
  cfgInjectTopKHint: "\u7F6E\u9876 / \u8EAB\u4EFD\u504F\u597D / \u957F\u671F\u6C89\u6DC0\u5E38\u9A7B\uFF0C\u4E0D\u5360\u8BE5\u9884\u7B97\u3002",
  cfgInjectTokenBudget: "\u6CE8\u5165\u5B57\u7B26\u9884\u7B97",
  cfgCompileEveryTurns: "\u6BCF N \u8F6E\u589E\u91CF\u7F16\u8BD1",
  cfgCompileThreshold: "\u6CE8\u5165\u91CD\u8981\u5EA6\u9608\u503C",
  cfgDecayLambda: "\u6BCF\u65E5\u8870\u51CF\u7CFB\u6570 \u03BB",
  cfgDecayLambdaHint: "\u6BCF\u5929 importance \xD7(1\u2212\u03BB)\uFF1B0 = \u4E0D\u8870\u51CF\u3002",
  cfgHitBonus: "\u547D\u4E2D\u52A0\u5206",
  cfgEntryLimit: "\u5168\u5C40\u6761\u76EE\u4E0A\u9650",
  cfgEntryLimitHint: "\u8D85\u9650\u65F6\u6309\u91CD\u8981\u5EA6+\u65B0\u9C9C\u5EA6\u6DD8\u6C70\uFF08\u7F6E\u9876\u8C41\u514D\uFF09\u3002",
  cfgDailyCompile: "\u6BCF\u65E5\u7F16\u8BD1\uFF08\u8870\u51CF / \u6298\u53E0 / \u6EDA\u51FA\uFF09",
  cfgConsolidate: "Memory Dream \u6BCF\u65E5\u6574\u7406",
  cfgConsolidateMax: "\u5355\u6B21\u6574\u7406\u6700\u5927\u6761\u76EE\u6570",
  cfgConsolidateTimeout: "\u6574\u7406\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",
  cfgLogApi: "API \u8BF7\u6C42\u65E5\u5FD7",
  cfgLogApiHint: "\u9ED8\u8BA4\u5173\u95ED\uFF1B\u5F00\u542F\u540E\u9762\u677F\u8F6E\u8BE2\u4F1A\u5199\u5165 log/api.log\u3002",
  rangeHint: "\u8303\u56F4 {min} \u2013 {max}",
  detailPlaceholder: "\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u6761\u8BB0\u5FC6\u67E5\u770B\u8BE6\u60C5",
  addTitle: "\u6DFB\u52A0\u8BB0\u5FC6",
  editTitle: "\u7F16\u8F91\u8BB0\u5FC6",
  moveTitle: "\u79FB\u52A8\u8BB0\u5FC6",
  searchEmpty: "\u6CA1\u6709\u5339\u914D\u7684\u8BB0\u5FC6",
  searchEmptyHint: "\u6362\u4E2A\u5173\u952E\u8BCD\uFF0C\u6216\u6E05\u7A7A\u6807\u7B7E / \u9879\u76EE\u7B5B\u9009",
  clearFilters: "\u6E05\u7A7A\u7B5B\u9009",
  scopeFilterLabel: "\u8303\u56F4\u7B5B\u9009",
  scopeAllOption: "\u5168\u90E8\u8303\u56F4\uFF08{n}\uFF09",
  scopeGlobalOption: "\u5168\u5C40\uFF08{n}\uFF09",
  statChanges: "\u6761\u53D8\u66F4"
};
var NS = "dshMemory";
var en = {
  entry: "Memory",
  panelTitle: "Memory",
  tabAll: "All",
  tabChanges: "Changes",
  tabPinned: "Pinned",
  searchPlaceholder: "Search memories\u2026",
  tagFilterPlaceholder: "All tags",
  scopeGlobal: "Global",
  groupToday: "Today",
  groupWeek: "This week",
  groupEarlier: "Earlier",
  groupLongterm: "Long-term",
  empty: "Key points from conversations will settle here automatically",
  changesEmpty: "No memory changes today yet",
  pin: "Pin",
  unpin: "Unpin",
  edit: "Edit",
  delete: "Delete",
  move: "Move",
  deleteConfirm: "Delete this memory?",
  tagEditPlaceholder: "Comma-separated tags",
  save: "Save",
  cancel: "Cancel",
  moveToGlobal: "Move to global",
  moveToProject: "Move to project",
  projectPlaceholder: "Project path or hash",
  error: "Failed to load",
  retry: "Retry",
  noProjects: "No project memories yet",
  unreadChanges: "{n} new changes",
  close: "Close",
  sourceExtract: "Auto",
  sourceManual: "Manual",
  add: "Add",
  addContentPlaceholder: "What to remember\u2026",
  addTagsPlaceholder: "Comma-separated tags",
  addPinned: "Pin",
  selectProject: "Select a project",
  sensitiveConfirm: "This content looks like sensitive credentials (token/key). Save anyway? Injected memories may be read by the model \u2014 you take the risk.",
  injectOn: "Memory injection: on",
  injectOff: "Memory injection: off",
  diffOld: "Old",
  diffNew: "New",
  clearProject: "Clear all memories in this project",
  clearProjectConfirm: 'Clear {count} memories in project "{name}"? This cannot be undone. Pinned memories are kept.',
  addSaved: "Memory added",
  autoMemory: "Auto-memory",
  collapse: "Collapse",
  multiSelect: "Select",
  selectAll: "All",
  selectedCount: "{n} selected",
  deleteSelectedConfirm: "Delete {n} selected memories? This cannot be undone.",
  tabRevisions: "Revisions",
  tabSettings: "Settings",
  consolidate: "Consolidate",
  consolidateHint: "Merge duplicates, rewrite, prune low-value, promote long-term with the model (Memory Dream)",
  consolidating: "Consolidating\u2026",
  revisionsEmpty: "No snapshots yet; created after daily or manual consolidation",
  revManual: "Manual",
  revDaily: "Daily",
  revEntries: "{n} entries",
  rollback: "Rollback",
  rollbackConfirm: "Roll back to this snapshot ({time}, {id})? All memories will be replaced by that snapshot \u2014 this cannot be undone.",
  enable: "Enable memory (resume injection)",
  disable: "Disable memory (kept, not injected)",
  enabledAria: "Enable switch, currently on",
  disabledAria: "Enable switch, currently off",
  disabledTag: "Off",
  importanceTitle: "Importance",
  retire: "Retire (keep data)",
  retireConfirm: "Soft-retire this memory? Data is kept but it stops being injected / searched / compiled \u2014 recoverable from changes.",
  restore: "Restore",
  restoreConfirm: "Restore this retired memory (resume injection / search / compile)?",
  retiredTag: "Retired",
  revise: "Revise",
  reviseTitle: "Revise memory",
  reviseReasonPlaceholder: "Reason (optional)",
  reviseTo: "Revise to new content",
  statEntries: "memories",
  statProjects: "projects",
  consolidateDone: "Consolidated: {n} changes",
  consolidateNoop: "Memory is already tidy \u2014 nothing to consolidate",
  consolidateConfirm: "Consolidate memories with the model (merge duplicates / rewrite / prune / promote)? A snapshot is saved first and can be rolled back from the Revisions tab.",
  projectAlias: "Project alias",
  aliasPlaceholder: "Unnamed (defaults to folder name)",
  aliasSaved: "Alias saved",
  kindLabel: "Kind",
  kindIdentity: "Identity",
  kindPreference: "Preference",
  kindFact: "Fact",
  kindDecision: "Decision",
  kindGotcha: "Gotcha",
  kindSession: "Session summary",
  verified: "Verified",
  unverified: "Unverified",
  confidenceTitle: "Confidence",
  versionTitle: "Version v{n}",
  createdAtLabel: "Created {time}",
  lastHitLabel: "Last hit {time}",
  neverHit: "Never hit",
  importanceField: "Importance 1-10",
  changesToday: "Today",
  changesAll: "All",
  changeAdd: "Added",
  changeUpdate: "Updated",
  changePromote: "Promoted",
  changeDelete: "Deleted",
  changeRevise: "Revised",
  changeRetire: "Retired",
  settingsGroupInject: "Injection",
  settingsGroupExtract: "Extraction",
  settingsGroupCompile: "Compile & decay",
  settingsGroupConsolidate: "Consolidation (Memory Dream)",
  settingsGroupEmbedding: "Semantic search (embedding)",
  settingsGroupDiag: "Diagnostics",
  settingsReset: "Reset to defaults",
  settingsResetConfirm: "Reset all memory engine runtime settings to defaults?",
  cfgEmbeddingProvider: "Semantic backend",
  cfgEmbeddingProviderHint: "off=hybrid search; http=OpenAI-compatible API; local=local ONNX (needs @xenova/transformers).",
  cfgEmbeddingOff: "Off",
  cfgEmbeddingHttp: "HTTP API",
  cfgEmbeddingLocal: "Local model",
  cfgEmbeddingBaseUrl: "API base URL",
  cfgEmbeddingBaseUrlHint: "OpenAI-compatible endpoint, e.g. https://api.openai.com/v1 or ollama http://localhost:11434/v1.",
  cfgEmbeddingModel: "Model",
  cfgEmbeddingModelHint: "e.g. text-embedding-3-small / Xenova/all-MiniLM-L6-v2.",
  cfgEmbeddingApiKey: "API key",
  cfgEmbeddingApiKeyHint: "Or use env DSH_MEMORY_EMBEDDING_API_KEY; leave empty to read from env.",
  cfgEmbeddingApiKeyPlaceholder: "sk-\u2026 (or leave empty for env)",
  cfgEmbeddingLocalHint: "Local mode requires @xenova/transformers installed; falls back to hybrid when missing.",
  cfgExtractEveryTurns: "Extract every N turns",
  cfgExtractEveryTurnsHint: "1 = every turn; higher saves tokens.",
  cfgExtractMaxChars: "Extraction window max chars",
  cfgMinImportance: "Minimum importance to keep",
  cfgMinImportanceHint: "Candidates below this score are dropped (1-10).",
  cfgInjectTopK: "Injection top-k",
  cfgInjectTopKHint: "Pinned / identity / long-term entries are always injected and do not use this budget.",
  cfgInjectTokenBudget: "Injection char budget",
  cfgCompileEveryTurns: "Incremental compile every N turns",
  cfgCompileThreshold: "Injection importance threshold",
  cfgDecayLambda: "Daily decay \u03BB",
  cfgDecayLambdaHint: "importance \xD7(1\u2212\u03BB) per day; 0 = no decay.",
  cfgHitBonus: "Hit bonus",
  cfgEntryLimit: "Global entry cap",
  cfgEntryLimitHint: "Over the cap, low importance/stale entries are evicted (pinned exempt).",
  cfgDailyCompile: "Daily compile (decay / promote / evict)",
  cfgConsolidate: "Memory Dream daily consolidation",
  cfgConsolidateMax: "Max entries per consolidation",
  cfgConsolidateTimeout: "Consolidation timeout (ms)",
  cfgLogApi: "API request log",
  cfgLogApiHint: "Off by default; panel polling would fill log/api.log.",
  rangeHint: "Range {min} \u2013 {max}",
  detailPlaceholder: "Select a memory on the left to see details",
  addTitle: "Add memory",
  editTitle: "Edit memory",
  moveTitle: "Move memory",
  searchEmpty: "No matching memories",
  searchEmptyHint: "Try another keyword, or clear the tag / project filter",
  clearFilters: "Clear filters",
  scopeFilterLabel: "Scope filter",
  scopeAllOption: "All scopes ({n})",
  scopeGlobalOption: "Global ({n})",
  statChanges: "changes"
};
var DICTS = { zh, en };
function currentLang() {
  try {
    const lang = document.documentElement.lang.toLowerCase().split("-")[0];
    if (lang === "en") return "en";
  } catch {
  }
  return "zh";
}
function makeT() {
  return (key, vars) => {
    let text = DICTS[currentLang()][key] ?? zh[key];
    if (vars !== void 0) {
      for (const [name, value] of Object.entries(vars)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }
    return text;
  };
}

// src/client/modal-animation.ts
var import_react3 = require("react");
var MODAL_ANIM_MS = 240;
var STYLE_ID2 = "dsh-modal-animation-styles";
var SHEET2 = `
@keyframes dsh-modal-slide-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dsh-modal-slide-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(24px); }
}
@keyframes dsh-modal-side-in {
  from { opacity: 0; transform: translateX(-14px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes dsh-modal-side-out {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-10px); }
}
@keyframes dsh-modal-rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dsh-modal-mask-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dsh-modal-mask-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
.dsh-modal-slide-in { animation: dsh-modal-slide-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.dsh-modal-slide-out { animation: dsh-modal-slide-out ${MODAL_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.dsh-modal-side-in { animation: dsh-modal-side-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.dsh-modal-side-out { animation: dsh-modal-side-out ${MODAL_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
/* \u5185\u5BB9\u9519\u843D\uFF1A\u5361\u7247\u64AD\u653E\u6ED1\u5165\uFF08\u5E95\u90E8\u4E0A\u6ED1 / \u53F3\u4FA7\u6ED1\u5165\u5747\u53EF\uFF09\u65F6\u751F\u6548\uFF0C\u5173\u95ED\u65F6\u968F\u5361\u7247\u6574\u4F53\u6536\u56DE\u3002
   fill-mode \u5FC5\u987B\u7528 backwards\uFF08\u5EF6\u8FDF\u671F\u5E94\u7528 from \u5E27\u9690\u85CF\uFF09\u800C\u975E both\u2014\u2014both \u4F1A\u5728\u52A8\u753B
   \u7ED3\u675F\u540E\u6B8B\u7559 to \u5E27 transform\uFF08\u5373\u4F7F translateY(0)\uFF09\uFF0C\u4F7F\u8BE5\u5BB9\u5668\u6210\u4E3A\u540E\u4EE3 position:fixed
   \u5143\u7D20\uFF08\u56FE\u8868 tooltip\uFF09\u7684\u5305\u542B\u5757\uFF0C\u6D6E\u5C42\u6574\u4F53\u504F\u79FB\u3002 */
.dsh-modal-slide-in .dsh-modal-stagger,
.dsh-modal-side-in .dsh-modal-stagger {
  animation: dsh-modal-rise-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
  animation-delay: 60ms;
}
.dsh-modal-mask-in { animation: dsh-modal-mask-in ${MODAL_ANIM_MS}ms ease; }
.dsh-modal-mask-out { animation: dsh-modal-mask-out ${MODAL_ANIM_MS}ms ease forwards; }
@media (prefers-reduced-motion: reduce) {
  .dsh-modal-slide-in, .dsh-modal-slide-out, .dsh-modal-side-in, .dsh-modal-side-out,
  .dsh-modal-mask-in, .dsh-modal-mask-out { animation: none; }
  .dsh-modal-slide-in .dsh-modal-stagger, .dsh-modal-side-in .dsh-modal-stagger { animation: none; }
}
`;
function ensureModalAnimStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID2) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID2;
  tag.textContent = SHEET2;
  document.head.appendChild(tag);
}
function modalSideAnimClass(closing) {
  return closing ? "dsh-modal-side-out" : "dsh-modal-side-in";
}
var modalStaggerClass = "dsh-modal-stagger";
function useModalClose(open, onClose, durationMs = MODAL_ANIM_MS) {
  const [closing, setClosing] = (0, import_react3.useState)(false);
  const timerRef = (0, import_react3.useRef)(null);
  const closingRef = (0, import_react3.useRef)(false);
  (0, import_react3.useLayoutEffect)(() => {
    if (open) {
      closingRef.current = false;
      setClosing(false);
    }
  }, [open]);
  const requestClose = (0, import_react3.useCallback)(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      onClose();
    }, durationMs);
  }, [onClose, durationMs]);
  (0, import_react3.useEffect)(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);
  return { closing, requestClose };
}

// src/client/popover-shell.tsx
var import_react4 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime3 = require("react/jsx-runtime");
var STYLE_ID3 = "dsh-popover-shell-styles";
var POPOVER_MIN_SPACE = 520;
var SHEET3 = `
/* \u2500\u2500 \u906E\u7F69\uFF1A\u6DE1\u5165\u6DE1\u51FA \u2500\u2500 */
.psh-mask{position:fixed;inset:0;z-index:999;background:var(--dsw-alias-bg-mask-1,rgba(0,0,0,.45))}
.psh-mask[data-anim='in']{animation:dsh-modal-mask-in ${MODAL_ANIM_MS}ms ease both}
.psh-mask[data-anim='out']{animation:dsh-modal-mask-out ${MODAL_ANIM_MS}ms ease both}
/* \u2500\u2500 \u5361\u7247\uFF1A\u8D34\u951A\u70B9\u53F3\u4FA7\u6ED1\u51FA / \u5E95\u90E8 sheet \u56DE\u9000 \u2500\u2500 */
.psh-card{position:fixed;z-index:1000;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));border-radius:14px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-layer-2,#16181d));box-shadow:var(--dsw-shadow-lv3,0 8px 40px rgba(0,0,0,.5));overflow:hidden;transition:width ${MODAL_ANIM_MS}ms cubic-bezier(.2,.8,.2,1),height ${MODAL_ANIM_MS}ms cubic-bezier(.2,.8,.2,1)}
/* in \u52A8\u753B\u4E0D\u5F97\u5E26 fill-mode\uFF08both/forwards \u4F1A\u6B8B\u7559 to \u5E27 transform\uFF0C\u4F7F\u5361\u7247\u6210\u4E3A
   \u540E\u4EE3 position:fixed \u5143\u7D20\uFF08\u56FE\u8868 tooltip\uFF09\u7684\u5305\u542B\u5757\uFF0C\u6D6E\u5C42\u6574\u4F53\u504F\u79FB\uFF09\uFF1Bout \u9700\u8981
   forwards \u4FDD\u6301\u9690\u85CF\u6001\u76F4\u5230\u5378\u8F7D\uFF0C\u6B64\u65F6\u65E0\u4EA4\u4E92\u3001\u65E0\u526F\u4F5C\u7528\u3002 */
.psh-card[data-mode='popover'][data-anim='in']{animation:dsh-modal-side-in ${MODAL_ANIM_MS}ms cubic-bezier(.2,.8,.2,1)}
.psh-card[data-mode='popover'][data-anim='out']{animation:dsh-modal-side-out ${MODAL_ANIM_MS}ms cubic-bezier(.4,0,.2,1) both}
.psh-card[data-mode='sheet']{left:12px !important;right:12px;bottom:12px;top:auto !important}
/* \u5B9E\u5E95\u5361\u7247\uFF08solid \u6A21\u5F0F\uFF09\uFF1A\u73BB\u7483\u8D28\u611F\u5F00\u542F\u65F6\u4E5F\u4FDD\u6301\u4E0D\u900F\u660E\u8868\u9762\u3002
   \u4E24\u6761\u5FC5\u8981\u6761\u4EF6\u2014\u2014
   1) \u5E95\u8272\u5FC5\u987B\u7528 static token\uFF08bg-layer-* \u7B49 alias \u5728\u73BB\u7483\u6A21\u5F0F\u4E0B\u88AB
      overrideTokens \u6362\u6210 rgba\uFF0C\u7528\u5B83\u4EEC\u4ECD\u7136\u900F\uFF09\uFF1B
   2) \u9009\u62E9\u5668\u9700\u5E26 html[data-dsh-glass] \u524D\u7F00\u4EE5\u538B\u8FC7 glass.ts \u91CC
      \u300C\u63D2\u4EF6\u81EA\u7ED8\u9762\u677F\u4E00\u5F8B transparent\u300D\u90A3\u6761\u89C4\u5219\uFF08\u540C\u7279\u5F02\u6027\u9760\u987A\u5E8F\u53D6\u80DC\u4E0D\u53EF\u9760\uFF09\u3002 */
.psh-card[data-solid],html[data-dsh-glass] .psh-card[data-solid]{
  background:var(--dsw-static-neutral-bluish-00,#fff);
  backdrop-filter:none;-webkit-backdrop-filter:none}
body[data-ds-dark-theme] .psh-card[data-solid],
html[data-dsh-glass] body[data-ds-dark-theme] .psh-card[data-solid]{
  background:var(--dsw-static-neutral-bluish-850,#2c2c2e)}
.psh-card[data-mode='sheet'][data-anim='in']{animation:dsh-modal-slide-in ${MODAL_ANIM_MS}ms cubic-bezier(.2,.8,.2,1)}
.psh-card[data-mode='sheet'][data-anim='out']{animation:dsh-modal-slide-out ${MODAL_ANIM_MS}ms cubic-bezier(.4,0,.2,1) both}
/* \u2500\u2500 \u901A\u7528\u5361\u7247\u5934\u90E8\uFF1A\u6807\u9898 + \u5173\u95ED\uFF08\u5BF9\u9F50 auto-card-head \u89C4\u683C\uFF09\u2500\u2500 */
.psh-head{flex:none;display:flex;align-items:center;gap:8px;padding:12px 16px 10px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}
.psh-title{flex:1;min-width:0;font-size:15px;font-weight:600;line-height:22px;color:var(--dsw-alias-label-primary,#eee)}
.psh-close{flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:8px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-secondary,#bbb)}
.psh-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
/* \u5361\u7247\u4E3B\u4F53\u6EDA\u52A8\u533A */
.psh-body{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
/* \u2500\u2500 \u79FB\u52A8\u7AEF\uFF1A\u4EFB\u4F55\u6A21\u5F0F\u5F3A\u5236\u5168\u5C4F sheet\uFF08100vw / 100dvh\uFF0Cradius 0\uFF09\u3002
    \u53C2\u8003 tool-summary .dts__modal \u7684 767.98px \u5199\u6CD5\uFF1B!important \u538B\u8FC7\u7EC4\u4EF6\u5185\u8054
    left/top/width/height\uFF08popover \u6A21\u5F0F\u7528\u5185\u8054\u5B9A\u4F4D\uFF0C\u5FC5\u987B\u8986\u76D6\u5230 0/\u5168\u5C4F\uFF09\u3002
    transform:none \u4EC5\u4F5C\u9759\u6001\u515C\u5E95\uFF0C\u6ED1\u5165/\u6ED1\u51FA\u52A8\u753B\u7684 keyframe transform \u4ECD\u4F18\u5148\u64AD\u653E\uFF1B
    \u672C\u5757\u6CE8\u91CA\u5185\u5BB9\u672A\u5199\u51FA\u300C\u661F\u53F7\u7D27\u8DDF\u6B63\u659C\u6760\u300D\u4E24\u5B57\u7B26\u5E8F\u5217\u3002 \u2500\u2500 */
@media (max-width: 767.98px){
  .psh-card{
    left:0 !important;
    top:0 !important;
    right:auto !important;
    bottom:auto !important;
    width:100vw !important;
    max-width:100vw !important;
    height:100vh !important;
    height:100dvh !important;
    max-height:100vh !important;
    max-height:100dvh !important;
    border-radius:0 !important;
    transform:none !important;
  }
}
@media (prefers-reduced-motion:reduce){
  .psh-mask,.psh-card{animation:none!important}
  .psh-card{transition:none!important}
}
`;
function ensureShellStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID3) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID3;
  tag.dataset.plugin = "dsh-triad";
  tag.textContent = SHEET3;
  document.head.appendChild(tag);
}
function PopoverShell({
  closing,
  onClose,
  anchor,
  width = 560,
  size,
  onCardMouseEnter,
  onCardMouseLeave,
  ariaLabel,
  solid = false,
  children
}) {
  const [vp, setVp] = (0, import_react4.useState)({ w: window.innerWidth, h: window.innerHeight });
  (0, import_react4.useEffect)(() => {
    const onResize = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const vw = vp.w;
  const vh = vp.h;
  const idealW = size?.width ?? width;
  const asPopover = anchor !== null && vw - anchor.left >= Math.min(POPOVER_MIN_SPACE, idealW);
  let style;
  if (anchor !== null && asPopover) {
    const left = Math.round(anchor.left);
    const fill = size?.fill === true;
    const top = fill ? 12 : Math.max(8, Math.min(Math.round(anchor.top), vh - 200));
    const availH = vh - top - 12;
    const availW = vw - left - 12;
    style = {
      left,
      top,
      width: `${fill ? availW : Math.min(idealW, availW)}px`,
      ...fill ? { height: `${availH}px`, maxHeight: `${availH}px` } : size?.height !== void 0 ? { height: `${Math.min(size.height, availH)}px`, maxHeight: `${availH}px` } : { maxHeight: `${availH}px` }
    };
  }
  const anim = closing ? "out" : "in";
  const mode = asPopover ? "popover" : "sheet";
  (0, import_react4.useEffect)(() => {
    if (closing) return void 0;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [closing, onClose]);
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "psh-mask", "data-anim": anim, "aria-hidden": "true", onClick: onClose }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `psh-card ${modalSideAnimClass(closing)}`,
          "data-anim": anim,
          "data-mode": mode,
          "data-solid": solid ? "" : void 0,
          style,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": ariaLabel,
          onMouseEnter: onCardMouseEnter,
          onMouseLeave: onCardMouseLeave,
          children
        }
      )
    ] }),
    document.body
  );
}
function PshHead({ title, closeLabel, onClose }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "psh-head", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "psh-title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "psh-close", "aria-label": closeLabel, onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "15", height: "15", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) }) })
  ] });
}
function PshBody({ children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: className !== void 0 && className !== "" ? `psh-body ${className}` : "psh-body", children });
}

// src/client/memory/Panel.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var KINDS = ["identity", "preference", "fact", "decision", "gotcha", "session-summary"];
var KIND_LABEL = {
  identity: "kindIdentity",
  preference: "kindPreference",
  fact: "kindFact",
  decision: "kindDecision",
  gotcha: "kindGotcha",
  "session-summary": "kindSession"
};
function splitTags(raw) {
  return raw.split(/[,，\s]+/).map((tag) => tag.trim()).filter(Boolean).slice(0, 8);
}
function entryTitle(content) {
  const trimmed = content.trim();
  const bracket = trimmed.match(/^【([^】]{1,30})】/);
  if (bracket !== null) return bracket[1].trim();
  const firstLine2 = (trimmed.split("\n", 1)[0] ?? "").replace(/^#{1,6}\s*/, "").replace(/^[-*+]\s*/, "").trim();
  if (firstLine2 !== "" && firstLine2.length <= 60) return firstLine2;
  return trimmed.slice(0, 40);
}
function entrySnippet(content) {
  const trimmed = content.trim();
  const bracket = trimmed.match(/^【([^】]{1,30})】\s*/);
  let rest = trimmed;
  if (bracket !== null) rest = trimmed.slice(bracket[0].length).trim();
  else {
    const nl = trimmed.indexOf("\n");
    const firstLine2 = (trimmed.split("\n", 1)[0] ?? "").trim();
    if (nl !== -1 && firstLine2.length <= 60) rest = trimmed.slice(nl + 1).trim();
  }
  const flat = rest.replace(/[#*`>[\]()!-]/g, " ").replace(/\s+/g, " ").trim();
  return flat === "" ? trimmed.replace(/\s+/g, " ").slice(0, 64) : flat.slice(0, 64);
}
function relativeTime(iso, now = /* @__PURE__ */ new Date()) {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  const diff = now.getTime() - time;
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "\u521A\u521A";
  if (minutes < 60) return `${minutes} \u5206\u949F\u524D`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} \u5C0F\u65F6\u524D`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "\u6628\u5929";
  if (days < 30) return `${days} \u5929\u524D`;
  return new Date(time).toLocaleDateString();
}
function absoluteTime(iso) {
  if (iso === null) return "";
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  const date = new Date(time);
  return `${date.toLocaleDateString()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function groupEntries(entries) {
  const groups = { today: [], week: [], earlier: [], longterm: [] };
  const now = /* @__PURE__ */ new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  for (const entry of entries) {
    if (entry.layer === "long") {
      groups.longterm.push(entry);
      continue;
    }
    const time = Date.parse(entry.updatedAt);
    if (Number.isNaN(time)) {
      groups.earlier.push(entry);
      continue;
    }
    const days = Math.floor((startOfDay - time) / 864e5);
    if (days <= 0) groups.today.push(entry);
    else if (days < 7) groups.week.push(entry);
    else groups.earlier.push(entry);
  }
  return groups;
}
function projectName(hash, projects) {
  if (hash === null) return "";
  const project = projects.find((candidate) => candidate.hash === hash);
  if (project === void 0) return hash.slice(0, 6);
  return project.alias ?? project.path.split(/[\\/]/).filter(Boolean).at(-1) ?? hash.slice(0, 6);
}
var SENSITIVE_PATTERNS = [
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /sk-[A-Za-z0-9_-]{20,}/i,
  /AKIA[0-9A-Z]{16}/,
  /xox[baprs]-[A-Za-z0-9-]{20,}/i,
  /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/i,
  /(?:password|passwd|secret|api[_-]?key|access[_-]?token|private[_-]?key)\s*[=:]\s*[^\s,，。；;]{8,}/i
];
function containsSensitive(text) {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(text));
}
function BrainIcon({ size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M19.938 10.5a4 4 0 0 1 .585.396" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 18a4 4 0 0 1-1.967-.516" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M19.967 17.484A4 4 0 0 1 18 18" })
  ] });
}
function PinIcon({ size = 16, filled = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M9.8 2.2 13.8 6.2l-2.3.7-2.4 2.4-.7 2.3-1.6-1.6-2.7 2.7-1-1 2.7-2.7-1.6-1.6 2.3-.7 2.4-2.4.7-2.3Z" }) });
}
function GlobeIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "8", cy: "8", r: "6" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M2 8h12M8 2c1.8 1.6 2.7 3.7 2.7 6S9.8 12.4 8 14C6.2 12.4 5.3 10.3 5.3 8S6.2 3.6 8 2Z" })
  ] });
}
function FolderIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M2 4.5A1.5 1.5 0 0 1 3.5 3h2.8l1.4 1.6h4.8A1.5 1.5 0 0 1 14 6.1v5.4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5v-7Z" }) });
}
function PenIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m11.5 2.5 2 2L6 12l-2.7.7L4 10l7.5-7.5Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m10 4 2 2" })
  ] });
}
function SparkIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 2.2 9.3 6l3.8 1.3-3.8 1.3L8 12.4 6.7 8.6 2.9 7.3 6.7 6 8 2.2Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12.8 11.4l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" })
  ] });
}
function LayersIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m8 2.5 5.5 3L8 8.5l-5.5-3 5.5-3Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m2.5 8.5 5.5 3 5.5-3" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m2.5 11.5 5.5 3 5.5-3" })
  ] });
}
function VerifiedIcon({ size = 11 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 1.8 13 3.4v4.1c0 3-2 5.5-5 6.7-3-1.2-5-3.7-5-6.7V3.4L8 1.8Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m5.8 7.8 1.6 1.6 3-3.2" })
  ] });
}
function CheckMark({ size = 12 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 8.5 6.5 12 13 4.5" }) });
}
function PowerIcon({ size = 14, dim = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 16 16", width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", style: { opacity: dim ? 0.45 : void 0 }, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 1.5v6" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M11.3 3.7a4.7 4.7 0 1 1-6.6 0" })
  ] });
}
function importancePercent(importance) {
  if (!Number.isFinite(importance) || importance <= 0) return 0;
  return Math.min(100, Math.round(importance / 20 * 100));
}
function MemoryPanel({ open, closing = false, onClose, initialTab, anchor = null, onCardMouseEnter, onCardMouseLeave, t = makeT(), ...api }) {
  ensureStyles();
  const apiRef = (0, import_react5.useRef)(api);
  apiRef.current = api;
  const [tab, setTab] = (0, import_react5.useState)(initialTab ?? "all");
  const [scope, setScope] = (0, import_react5.useState)("all");
  const [q, setQ] = (0, import_react5.useState)("");
  const [debouncedQ, setDebouncedQ] = (0, import_react5.useState)("");
  const [tag, setTag] = (0, import_react5.useState)("");
  const [state, setState] = (0, import_react5.useState)({ status: "loading" });
  const [allTags, setAllTags] = (0, import_react5.useState)([]);
  const [summary, setSummary] = (0, import_react5.useState)(null);
  const [changes, setChanges] = (0, import_react5.useState)([]);
  const [changeRange, setChangeRange] = (0, import_react5.useState)("today");
  const [revisions, setRevisions] = (0, import_react5.useState)([]);
  const [editing, setEditing] = (0, import_react5.useState)(null);
  const [moving, setMoving] = (0, import_react5.useState)(null);
  const [busy, setBusy] = (0, import_react5.useState)(false);
  const [consolidating, setConsolidating] = (0, import_react5.useState)(false);
  const [error, setError] = (0, import_react5.useState)("");
  const [notice, setNotice] = (0, import_react5.useState)("");
  const [adding, setAdding] = (0, import_react5.useState)(false);
  const [addContent, setAddContent] = (0, import_react5.useState)("");
  const [addTags, setAddTags] = (0, import_react5.useState)("");
  const [addPinned, setAddPinned] = (0, import_react5.useState)(false);
  const [addScope, setAddScope] = (0, import_react5.useState)("global");
  const [addProject, setAddProject] = (0, import_react5.useState)("");
  const [selectedId, setSelectedId] = (0, import_react5.useState)(null);
  const [selecting, setSelecting] = (0, import_react5.useState)(false);
  const [checkedIds, setCheckedIds] = (0, import_react5.useState)(/* @__PURE__ */ new Set());
  const [config, setConfigState] = (0, import_react5.useState)(null);
  const [aliasDraft, setAliasDraft] = (0, import_react5.useState)(null);
  const tabRef = (0, import_react5.useRef)(tab);
  tabRef.current = tab;
  const rangeRef = (0, import_react5.useRef)(changeRange);
  rangeRef.current = changeRange;
  (0, import_react5.useEffect)(() => {
    if (q === debouncedQ) return void 0;
    const timer = window.setTimeout(() => {
      setDebouncedQ(q);
    }, 260);
    return () => {
      window.clearTimeout(timer);
    };
  }, [q, debouncedQ]);
  const load = (0, import_react5.useCallback)(async (options = {}) => {
    const current = apiRef.current;
    if (options.silent !== true) setState({ status: "loading" });
    setError("");
    try {
      const scopeParam = scope === "all" ? void 0 : scope === "global" ? "global" : "project";
      const projectParam = scope.startsWith("project:") ? scope.slice("project:".length) : void 0;
      const [list, tagsRes] = await Promise.all([
        current.list({
          scope: scopeParam,
          project: projectParam,
          q: debouncedQ !== "" ? debouncedQ : void 0,
          tag: tag !== "" ? tag : void 0
        }),
        current.tags()
      ]);
      setState({ status: "ready", snapshot: list });
      setAllTags(tagsRes.tags);
    } catch (loadError) {
      setState({ status: "error" });
      setError(loadError instanceof Error ? loadError.message : String(loadError));
    }
  }, [scope, debouncedQ, tag]);
  const loadSummary = (0, import_react5.useCallback)(async () => {
    try {
      setSummary(await apiRef.current.summary());
    } catch {
    }
  }, []);
  const loadChanges = (0, import_react5.useCallback)(async (range) => {
    try {
      const response = await apiRef.current.changes(range === "all" ? "all" : void 0);
      setChanges(response.changes);
    } catch (changesError) {
      setError(changesError instanceof Error ? changesError.message : String(changesError));
    }
  }, []);
  const loadRevisions = (0, import_react5.useCallback)(async () => {
    try {
      setRevisions((await apiRef.current.revisions()).revisions);
    } catch (revisionsError) {
      setError(revisionsError instanceof Error ? revisionsError.message : String(revisionsError));
    }
  }, []);
  const loadConfig = (0, import_react5.useCallback)(async () => {
    try {
      setConfigState((await apiRef.current.getConfig()).config);
    } catch (configError) {
      setError(configError instanceof Error ? configError.message : String(configError));
    }
  }, []);
  const patchConfig = (0, import_react5.useCallback)(async (patchValue) => {
    setError("");
    try {
      const response = await apiRef.current.setConfig(patchValue);
      setConfigState(response.config);
    } catch (configError) {
      setError(configError instanceof Error ? configError.message : String(configError));
    }
  }, []);
  const resetConfig = (0, import_react5.useCallback)(async () => {
    setError("");
    try {
      const response = await apiRef.current.resetConfig();
      setConfigState(response.config);
      setNotice(t("settingsReset"));
    } catch (configError) {
      setError(configError instanceof Error ? configError.message : String(configError));
    }
  }, [t]);
  const refresh = (0, import_react5.useCallback)(async () => {
    await load({ silent: true });
    await loadSummary();
    if (tabRef.current === "changes") await loadChanges(rangeRef.current);
    if (tabRef.current === "revisions") await loadRevisions();
  }, [load, loadSummary, loadChanges, loadRevisions]);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    void load();
    void loadSummary();
  }, [open, load, loadSummary]);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    if (tab === "changes") void loadChanges(changeRange);
    else if (tab === "revisions") void loadRevisions();
    else if (tab === "settings") void loadConfig();
  }, [open, tab, changeRange, loadChanges, loadRevisions, loadConfig]);
  (0, import_react5.useEffect)(() => {
    if (open && initialTab !== void 0) setTab(initialTab);
  }, [open, initialTab]);
  (0, import_react5.useEffect)(() => {
    if (open) return;
    setSelecting(false);
    setCheckedIds(/* @__PURE__ */ new Set());
    setEditing(null);
    setMoving(null);
    setAdding(false);
    setNotice("");
    setError("");
  }, [open]);
  (0, import_react5.useEffect)(() => {
    setAliasDraft(null);
  }, [scope]);
  (0, import_react5.useEffect)(() => {
    if (notice === "") return void 0;
    const timer = window.setTimeout(() => {
      setNotice("");
    }, 2400);
    return () => {
      window.clearTimeout(timer);
    };
  }, [notice]);
  const run = async (operation) => {
    setBusy(true);
    setError("");
    try {
      await operation();
    } catch (operationError) {
      setError(operationError instanceof Error ? operationError.message : String(operationError));
    } finally {
      setBusy(false);
      await refresh();
    }
  };
  const handlePin = (entry) => {
    void run(() => apiRef.current.pin(entry.id, !entry.pinned));
  };
  const handleEnable = (entry) => {
    void run(() => apiRef.current.enable(entry.id, entry.disabled));
  };
  const handleDelete = (entry) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    void run(() => apiRef.current.deleteEntry(entry.id));
  };
  const handleRetire = (entry) => {
    if (!window.confirm(t("retireConfirm"))) return;
    void run(() => apiRef.current.retire(entry.id));
  };
  const handleRestore = (entry) => {
    if (!window.confirm(t("restoreConfirm"))) return;
    void run(() => apiRef.current.restore(entry.id));
  };
  const handleConsolidate = () => {
    if (!window.confirm(t("consolidateConfirm"))) return;
    setConsolidating(true);
    setError("");
    void (async () => {
      try {
        const target = scope === "global" ? "global" : scope.startsWith("project:") ? "project" : "all";
        const hash = scope.startsWith("project:") ? scope.slice("project:".length) : void 0;
        const response = await apiRef.current.consolidate(target, hash);
        const changed = response.results.reduce((sum, result) => sum + result.changed, 0);
        setNotice(changed > 0 ? t("consolidateDone", { n: changed }) : t("consolidateNoop"));
      } catch (consolidateError) {
        setError(consolidateError instanceof Error ? consolidateError.message : String(consolidateError));
      } finally {
        setConsolidating(false);
        await refresh();
        await loadRevisions();
      }
    })();
  };
  const enterSelecting = () => {
    closeForms();
    setSelecting(true);
    setCheckedIds(/* @__PURE__ */ new Set());
  };
  const exitSelecting = () => {
    setSelecting(false);
    setCheckedIds(/* @__PURE__ */ new Set());
  };
  const toggleChecked = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const saveAdd = () => {
    const content = addContent.trim();
    if (content === "") return;
    if (addScope === "project" && addProject === "") {
      setError(t("selectProject"));
      return;
    }
    if (containsSensitive(content)) {
      if (!window.confirm(t("sensitiveConfirm"))) return;
    }
    void run(async () => {
      const created = await apiRef.current.remember({
        content,
        scope: addScope,
        projectHash: addScope === "project" ? addProject : void 0,
        tags: splitTags(addTags),
        pinned: addPinned,
        importance: 8
      });
      setAdding(false);
      setAddContent("");
      setAddTags("");
      setAddPinned(false);
      setAddProject("");
      setNotice(t("addSaved"));
      setSelectedId(created.entry.id);
    });
  };
  const handleClearProject = () => {
    if (!scope.startsWith("project:")) return;
    const hash = scope.slice("project:".length);
    const project = projects.find((candidate) => candidate.hash === hash);
    const name = project?.alias ?? project?.path.split(/[\\/]/).filter(Boolean).at(-1) ?? hash;
    if (!window.confirm(t("clearProjectConfirm", { name, count: project?.entryCount ?? 0 }))) return;
    void run(() => apiRef.current.deleteProject(hash));
  };
  const saveAlias = (hash, current) => {
    if (aliasDraft === null) return;
    const next = aliasDraft.trim();
    setAliasDraft(null);
    if (next === (current ?? "")) return;
    void run(async () => {
      await apiRef.current.meta(hash, { alias: next });
      setNotice(t("aliasSaved"));
    });
  };
  const handleRollback = (revision) => {
    if (!window.confirm(t("rollbackConfirm", { id: revision.id, time: relativeTime(revision.at) }))) return;
    void run(() => apiRef.current.rollback(revision.id));
  };
  const startEdit = (entry) => {
    setAdding(false);
    setMoving(null);
    setEditing({
      entryId: entry.id,
      content: entry.content,
      tags: entry.tags.join(", "),
      scope: entry.scope,
      projectHash: entry.projectHash,
      importance: entry.importance,
      pinned: entry.pinned,
      kind: entry.kind
    });
  };
  const saveEdit = () => {
    if (editing === null) return;
    const content = editing.content.trim();
    if (content === "") {
      setError(t("addContentPlaceholder"));
      return;
    }
    void run(async () => {
      const original = state.status === "ready" ? state.snapshot.entries.find((entry) => entry.id === editing.entryId) : void 0;
      const updated = await apiRef.current.update(editing.entryId, {
        content,
        tags: splitTags(editing.tags),
        importance: editing.importance,
        pinned: editing.pinned,
        kind: editing.kind
      });
      const moved = original !== void 0 && (editing.scope !== original.scope || editing.scope === "project" && editing.projectHash !== original.projectHash);
      let finalId = updated.entry.id;
      if (moved) {
        const movedEntry = await apiRef.current.move(finalId, {
          scope: editing.scope,
          projectHash: editing.scope === "project" && editing.projectHash !== null ? editing.projectHash : void 0
        });
        finalId = movedEntry.entry.id;
      }
      setEditing(null);
      setSelectedId(finalId);
    });
  };
  const startMove = (entry) => {
    setAdding(false);
    setEditing(null);
    setMoving({
      entryId: entry.id,
      target: entry.scope === "global" ? "project" : "global",
      project: entry.projectHash ?? ""
    });
  };
  const saveMove = () => {
    if (moving === null) return;
    void run(async () => {
      if (moving.target === "project" && moving.project.trim() === "") {
        throw new Error(t("selectProject"));
      }
      const moved = await apiRef.current.move(moving.entryId, {
        scope: moving.target,
        projectHash: moving.target === "project" ? moving.project.trim() : void 0
      });
      setMoving(null);
      setSelectedId(moved.entry.id);
    });
  };
  const snapshot = state.status === "ready" ? state.snapshot : null;
  const projects = snapshot?.projects ?? [];
  const filtered = (0, import_react5.useMemo)(() => snapshot?.entries ?? [], [snapshot]);
  const pinned = (0, import_react5.useMemo)(() => filtered.filter((entry) => entry.pinned), [filtered]);
  const grouped = (0, import_react5.useMemo)(() => groupEntries(filtered.filter((entry) => !entry.pinned)), [filtered]);
  const visibleChanges = (0, import_react5.useMemo)(() => changes.filter((change) => {
    if (scope === "global") return change.scope === "global";
    if (scope.startsWith("project:")) {
      return change.scope === "project" && change.projectHash === scope.slice("project:".length);
    }
    return true;
  }), [changes, scope]);
  const groupTitles = {
    today: t("groupToday"),
    week: t("groupWeek"),
    earlier: t("groupEarlier"),
    longterm: t("groupLongterm")
  };
  const detail = (0, import_react5.useMemo)(
    () => filtered.find((entry) => entry.id === selectedId) ?? null,
    [filtered, selectedId]
  );
  (0, import_react5.useEffect)(() => {
    if (detail === null && filtered.length > 0) setSelectedId(filtered[0]?.id ?? null);
  }, [detail, filtered]);
  const closeForms = () => {
    setEditing(null);
    setMoving(null);
    setAdding(false);
  };
  const selectEntry = (entry) => {
    closeForms();
    setSelectedId(entry.id);
  };
  const allChecked = filtered.length > 0 && filtered.every((entry) => checkedIds.has(entry.id));
  const toggleAllChecked = () => {
    setCheckedIds(allChecked ? /* @__PURE__ */ new Set() : new Set(filtered.map((entry) => entry.id)));
  };
  const deleteChecked = () => {
    const ids = [...checkedIds];
    if (ids.length === 0) return;
    if (!window.confirm(t("deleteSelectedConfirm", { n: ids.length }))) return;
    void run(async () => {
      await apiRef.current.deleteBatch(ids);
      exitSelecting();
    });
  };
  const renderItemRow = (entry) => {
    const selected = !selecting && entry.id === selectedId;
    const checked = checkedIds.has(entry.id);
    const enabled = entry.disabled !== true;
    const retired = entry.deprecated === true;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: css.itemRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          type: "button",
          className: [
            css.item,
            (selecting ? checked : selected) ? css.itemSelected : "",
            enabled ? "" : css.itemDisabled,
            retired ? css.itemRetired : ""
          ].filter(Boolean).join(" "),
          "data-selected": (selecting ? checked : selected) || void 0,
          "aria-pressed": selecting ? checked : void 0,
          onClick: () => {
            if (selecting) toggleChecked(entry.id);
            else selectEntry(entry);
          },
          children: [
            selecting && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.itemCheck, "aria-hidden": "true", children: checked && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CheckMark, {}) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.itemBody, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.itemTitle, children: [
                entry.pinned && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.pinMark, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PinIcon, { size: 11, filled: true }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.itemTitleText, children: entryTitle(entry.content) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                  "span",
                  {
                    className: css.scopeBadge,
                    title: entry.scope === "global" ? t("scopeGlobal") : projectName(entry.projectHash, projects),
                    children: [
                      entry.scope === "global" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GlobeIcon, { size: 10 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FolderIcon, { size: 10 }),
                      entry.scope === "global" ? t("scopeGlobal") : projectName(entry.projectHash, projects)
                    ]
                  }
                ),
                !enabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.disabledMark, children: t("disabledTag") }),
                retired && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.retiredMark, children: t("retiredTag") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.itemSnippet, children: entrySnippet(entry.content) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.itemFoot, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.itemTime, children: relativeTime(entry.updatedAt) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "span",
                  {
                    className: css.itemScore,
                    style: { ["--pct"]: `${importancePercent(entry.importance)}%` },
                    title: `${t("importanceTitle")} ${Number(entry.importance).toFixed(1)}`
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      !selecting && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "span",
        {
          role: "switch",
          "aria-checked": enabled,
          "aria-label": enabled ? t("enabledAria") : t("disabledAria"),
          title: enabled ? t("disable") : t("enable"),
          tabIndex: 0,
          className: `${css.miniSwitch} ${enabled ? css.miniSwitchOn : ""}`,
          onClick: (event) => {
            event.stopPropagation();
            handleEnable(entry);
          },
          onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              handleEnable(entry);
            }
          }
        }
      )
    ] }, entry.id);
  };
  const detailActions = (entry) => {
    const enabled = entry.disabled !== true;
    const retired = entry.deprecated === true;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.cardActions, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: entry.pinned ? t("unpin") : t("pin"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": entry.pinned ? t("unpin") : t("pin"), disabled: busy, onClick: () => {
        handlePin(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PinIcon, { size: 14, filled: entry.pinned }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: enabled ? t("disable") : t("enable"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: css.iconAction,
          "aria-label": enabled ? t("disable") : t("enable"),
          disabled: busy,
          onClick: () => {
            handleEnable(entry);
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PowerIcon, { size: 14, dim: !enabled })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("edit"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("edit"), disabled: busy, onClick: () => {
        startEdit(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconEditOutline16, { size: 14 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("move"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("move"), disabled: busy, onClick: () => {
        startMove(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconFolderOpenOutline16, { size: 14 }) }) }),
      retired ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("restore"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("restore"), disabled: busy, onClick: () => {
        handleRestore(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconRefreshOutline14, { size: 14 }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("retire"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("retire"), disabled: busy, onClick: () => {
        handleRetire(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PowerIcon, { size: 14, dim: true }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("delete"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: `${css.iconAction} ${css.iconActionDanger}`, "aria-label": t("delete"), disabled: busy, onClick: () => {
        handleDelete(entry);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconTrashOutline16, { size: 14 }) }) })
    ] });
  };
  const scopeFields = (name, scopeValue, onScope, projectValue, onProject) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.check, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "radio", name, checked: scopeValue === "global", onChange: () => {
        onScope("global");
      } }),
      t("moveToGlobal")
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.check, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "radio", name, checked: scopeValue === "project", onChange: () => {
        onScope("project");
        if (projectValue === "") {
          const first = projects.find((project) => project.entryCount > 0) ?? projects[0];
          if (first !== void 0) onProject(first.hash);
        }
      } }),
      t("moveToProject")
    ] }),
    scopeValue === "project" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("select", { className: css.tagSelect, value: projectValue, "aria-label": t("projectPlaceholder"), onChange: (event) => {
      onProject(event.currentTarget.value);
    }, children: [
      projects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "", children: t("noProjects") }),
      projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: project.hash, children: project.alias ?? project.path.split(/[\\/]/).filter(Boolean).at(-1) ?? project.hash }, project.hash))
    ] })
  ] });
  const renderEmpty = (text, hint, action) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.empty, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.emptyIcon, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BrainIcon, { size: 26 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.emptyText, children: text }),
    hint !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.emptyHint, children: hint }),
    action !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", onClick: action.onClick, children: action.label })
  ] });
  const renderSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.skeleton, "aria-busy": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.skeletonRow }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.skeletonRow }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.skeletonRow }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.skeletonRow })
  ] });
  if (!open) return null;
  const selectedProject = scope.startsWith("project:") ? projects.find((candidate) => candidate.hash === scope.slice("project:".length)) : void 0;
  const scopeSelectEl = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "select",
    {
      className: `${css.tagSelect} ${css.scopeSelect}`,
      value: scope,
      "aria-label": t("scopeFilterLabel"),
      onChange: (event) => {
        setScope(event.currentTarget.value);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "all", children: t("scopeAllOption", { n: summary?.entryCount ?? 0 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "global", children: t("scopeGlobalOption", { n: summary?.globalCount ?? 0 }) }),
        projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("option", { value: `project:${project.hash}`, children: [
          project.alias ?? project.path.split(/[\\/]/).filter(Boolean).at(-1) ?? project.hash,
          " (",
          project.entryCount,
          ")"
        ] }, project.hash))
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    PopoverShell,
    {
      closing,
      onClose,
      anchor,
      onCardMouseEnter,
      onCardMouseLeave,
      width: 1200,
      ariaLabel: t("panelTitle"),
      solid: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PshHead, { title: t("panelTitle"), closeLabel: t("close"), onClose }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PshBody, { className: css.modalBody, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `${css.panel} ${modalStaggerClass}`, "aria-busy": state.status === "loading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.head, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.tabs, role: "tablist", children: ["all", "changes", "revisions", "settings"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": tab === key,
                className: tab === key ? `${css.tab} ${css.tabActive}` : css.tab,
                onClick: () => {
                  setTab(key);
                  closeForms();
                  exitSelecting();
                },
                children: [
                  key === "all" ? t("tabAll") : key === "changes" ? t("tabChanges") : key === "revisions" ? t("tabRevisions") : t("tabSettings"),
                  key === "changes" && summary !== null && summary.todayChanges > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.tabCount, children: summary.todayChanges })
                ]
              },
              key
            )) }),
            summary !== null && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.statBar, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `${css.stat} ${css.statLong}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: summary.entryCount }),
                t("statEntries")
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `${css.statDot} ${css.statLong}`, "aria-hidden": "true" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `${css.stat} ${css.statLong}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: summary.projectCount }),
                t("statProjects")
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `${css.statDot} ${css.statLong}`, "aria-hidden": "true" }),
              summary.pinnedCount !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.stat, title: t("tabPinned"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PinIcon, { size: 11, filled: true }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: summary.pinnedCount })
              ] }),
              summary.longtermCount !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.stat, title: t("groupLongterm"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LayersIcon, { size: 11 }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: summary.longtermCount })
              ] }),
              summary.disabledCount !== void 0 && summary.disabledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.stat, title: t("disabledTag"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PowerIcon, { size: 11, dim: true }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: summary.disabledCount })
              ] })
            ] })
          ] }),
          tab !== "settings" && selectedProject !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.topRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.projectName, title: selectedProject.path, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FolderIcon, { size: 12 }),
              selectedProject.alias ?? selectedProject.path.split(/[\\/]/).filter(Boolean).at(-1) ?? selectedProject.hash
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.projectTools, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "input",
                {
                  className: css.inlineInput,
                  style: { width: 160 },
                  value: aliasDraft ?? selectedProject.alias ?? "",
                  placeholder: t("aliasPlaceholder"),
                  "aria-label": t("projectAlias"),
                  title: t("projectAlias"),
                  disabled: busy,
                  onChange: (event) => {
                    setAliasDraft(event.currentTarget.value);
                  },
                  onBlur: () => {
                    saveAlias(selectedProject.hash, selectedProject.alias);
                  },
                  onKeyDown: (event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      saveAlias(selectedProject.hash, selectedProject.alias);
                    }
                    if (event.key === "Escape") setAliasDraft(null);
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.switchLine, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    className: css.switch,
                    role: "switch",
                    "aria-checked": selectedProject.autoMemory,
                    "aria-label": t("autoMemory"),
                    disabled: busy,
                    onClick: () => {
                      void run(() => apiRef.current.meta(selectedProject.hash, { autoMemory: !selectedProject.autoMemory }));
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.switchText, children: t("autoMemory") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("clearProject"), side: "top", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: `${css.iconAction} ${css.iconActionDanger}`, "aria-label": t("clearProject"), disabled: busy, onClick: handleClearProject, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconTrashOutline16, { size: 14 }) }) })
            ] })
          ] }),
          tab === "all" && (selecting ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.searchRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.batchCount, children: t("selectedCount", { n: checkedIds.size }) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.barSep, "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", onClick: toggleAllChecked, children: allChecked ? t("collapse") : t("selectAll") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.spacer }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", disabled: busy, onClick: exitSelecting, children: t("cancel") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_dsh_client_ui_primitives2.Button, { variant: "primary", size: "sm", disabled: busy || checkedIds.size === 0, onClick: deleteChecked, children: [
              t("delete"),
              " (",
              checkedIds.size,
              ")"
            ] })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.searchRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.searchBox, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.searchIcon, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconSearchOutline16, { size: 14 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "input",
                {
                  className: css.searchInput,
                  value: q,
                  placeholder: t("searchPlaceholder"),
                  "aria-label": t("searchPlaceholder"),
                  onChange: (event) => {
                    setQ(event.currentTarget.value);
                  },
                  onKeyDown: (event) => {
                    if (event.key === "Escape" && q !== "") {
                      event.preventDefault();
                      setQ("");
                    }
                  }
                }
              ),
              q !== "" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.searchClear, "aria-label": t("cancel"), onClick: () => {
                setQ("");
              }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconCloseFill14, { size: 12 }) })
            ] }),
            scopeSelectEl,
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "select",
              {
                className: css.tagSelect,
                value: tag,
                "aria-label": t("tagFilterPlaceholder"),
                onChange: (event) => {
                  setTag(event.currentTarget.value);
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "", children: t("tagFilterPlaceholder") }),
                  allTags.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("option", { value: item.tag, children: [
                    item.tag,
                    " (",
                    item.count,
                    ")"
                  ] }, item.tag))
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.spacer }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.barSep, "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("retry"), side: "top", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("retry"), disabled: busy, onClick: () => {
              void refresh();
            }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconRefreshOutline14, {}) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: consolidating ? t("consolidating") : t("consolidateHint"), side: "top", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: consolidating ? `${css.iconAction} ${css.iconActionBusy}` : css.iconAction,
                "aria-label": t("consolidate"),
                disabled: busy || consolidating,
                onClick: handleConsolidate,
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconSparkle16, { size: 14 })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_dsh_client_ui_primitives2.Button,
              {
                variant: "primary",
                size: "sm",
                icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconPlusOutline16, { size: 14 }),
                "aria-expanded": adding,
                onClick: () => {
                  setAdding((value) => !value);
                  setEditing(null);
                  setMoving(null);
                  if (scope.startsWith("project:")) {
                    setAddScope("project");
                    setAddProject(scope.slice("project:".length));
                  }
                },
                children: t("add")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", disabled: filtered.length === 0, onClick: enterSelecting, children: t("multiSelect") })
          ] })),
          tab === "changes" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.searchRow, children: [
            scopeSelectEl,
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.barSep, "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.segment, role: "group", "aria-label": t("tabChanges"), children: ["today", "all"].map((range) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                "aria-pressed": changeRange === range,
                className: changeRange === range ? `${css.segmentItem} ${css.segmentItemActive}` : css.segmentItem,
                onClick: () => {
                  setChangeRange(range);
                },
                children: range === "today" ? t("changesToday") : t("changesAll")
              },
              range
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.stat, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statValue, children: visibleChanges.length }),
              t("statChanges")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.spacer }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: t("retry"), side: "top", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: css.iconAction, "aria-label": t("retry"), disabled: busy, onClick: () => {
              void loadChanges(changeRange);
            }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconRefreshOutline14, {}) }) })
          ] }),
          notice !== "" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: css.notice, children: notice }),
          error !== "" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: css.error, role: "alert", children: error }),
          tab === "all" && state.status === "loading" && renderSkeleton(),
          tab === "all" && state.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.empty, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.emptyIcon, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BrainIcon, { size: 26 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.emptyText, children: t("error") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", onClick: () => {
              void load();
            }, children: t("retry") })
          ] }),
          state.status === "ready" && tab === "all" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.split, children: [
            filtered.length === 0 ? (
              // 空态用 div 承载（ul 里塞非 li 元素不合法）；类名沿用左列几何。
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.listPane, children: renderEmpty(
                q !== "" || tag !== "" ? t("searchEmpty") : t("empty"),
                q !== "" || tag !== "" ? t("searchEmptyHint") : void 0,
                q !== "" || tag !== "" ? { label: t("clearFilters"), onClick: () => {
                  setQ("");
                  setTag("");
                } } : void 0
              ) })
            ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { className: css.listPane, children: [
              pinned.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: css.listSection, children: [
                t("tabPinned"),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.listSectionCount, children: pinned.length })
              ] }),
              pinned.map(renderItemRow),
              Object.keys(grouped).map((groupKey) => grouped[groupKey].length > 0 ? [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: css.listSection, children: [
                  groupTitles[groupKey],
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.listSectionCount, children: grouped[groupKey].length })
                ] }, `${groupKey}-section`),
                ...grouped[groupKey].map(renderItemRow)
              ] : null)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.detailPane, children: adding ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailForm, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.formTitle, children: t("addTitle") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("addContentPlaceholder") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "textarea",
                  {
                    className: css.inlineTextarea,
                    style: { minHeight: 200 },
                    value: addContent,
                    placeholder: t("addContentPlaceholder"),
                    "aria-label": t("addContentPlaceholder"),
                    autoFocus: true,
                    onChange: (event) => {
                      setAddContent(event.currentTarget.value);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("addTagsPlaceholder") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "input",
                  {
                    className: css.inlineInput,
                    value: addTags,
                    placeholder: t("addTagsPlaceholder"),
                    "aria-label": t("addTagsPlaceholder"),
                    onChange: (event) => {
                      setAddTags(event.currentTarget.value);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.addMeta, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.check, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "checkbox", checked: addPinned, onChange: (event) => {
                    setAddPinned(event.currentTarget.checked);
                  } }),
                  t("addPinned")
                ] }),
                scopeFields("dsh-memory-add-scope", addScope, setAddScope, addProject, setAddProject)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.editButtons, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", disabled: busy, onClick: () => {
                  setAdding(false);
                }, children: t("cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "primary", disabled: busy || addContent.trim() === "", onClick: saveAdd, children: t("save") })
              ] })
            ] }) : editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailForm, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.formTitle, children: t("editTitle") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("addContentPlaceholder") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "textarea",
                  {
                    className: css.inlineTextarea,
                    style: { minHeight: 200 },
                    value: editing.content,
                    "aria-label": t("edit"),
                    onChange: (event) => {
                      setEditing({ ...editing, content: event.currentTarget.value });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("tagEditPlaceholder") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "input",
                  {
                    className: css.inlineInput,
                    value: editing.tags,
                    placeholder: t("tagEditPlaceholder"),
                    "aria-label": t("tagEditPlaceholder"),
                    onChange: (event) => {
                      setEditing({ ...editing, tags: event.currentTarget.value });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.fieldRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("importanceField") }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "input",
                    {
                      type: "number",
                      className: css.numberInput,
                      min: 1,
                      max: 20,
                      step: 0.5,
                      value: editing.importance,
                      "aria-label": t("importanceField"),
                      onChange: (event) => {
                        const next = Number(event.currentTarget.value);
                        if (Number.isFinite(next)) setEditing({ ...editing, importance: Math.max(1, Math.min(20, next)) });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.field, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.fieldLabel, children: t("kindLabel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "select",
                    {
                      className: css.tagSelect,
                      value: editing.kind,
                      "aria-label": t("kindLabel"),
                      onChange: (event) => {
                        setEditing({ ...editing, kind: event.currentTarget.value });
                      },
                      children: KINDS.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: kind, children: t(KIND_LABEL[kind]) }, kind))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.addMeta, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: css.check, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "checkbox", checked: editing.pinned, onChange: (event) => {
                    setEditing({ ...editing, pinned: event.currentTarget.checked });
                  } }),
                  t("pin")
                ] }),
                scopeFields(`dsh-memory-edit-scope-${editing.entryId}`, editing.scope, (next) => {
                  setEditing({ ...editing, scope: next, projectHash: next === "global" ? null : editing.projectHash });
                }, editing.projectHash ?? "", (hash) => {
                  setEditing({ ...editing, scope: "project", projectHash: hash });
                })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.editButtons, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", disabled: busy, onClick: () => {
                  setEditing(null);
                }, children: t("cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "primary", disabled: busy || editing.content.trim() === "", onClick: saveEdit, children: t("save") })
              ] })
            ] }) : moving !== null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailForm, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.formTitle, children: t("moveTitle") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.addMeta, children: scopeFields(`dsh-memory-move-scope-${moving.entryId}`, moving.target, (next) => {
                setMoving({ ...moving, target: next });
              }, moving.project, (hash) => {
                setMoving({ ...moving, target: "project", project: hash });
              }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.editButtons, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", disabled: busy, onClick: () => {
                  setMoving(null);
                }, children: t("cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  import_dsh_client_ui_primitives2.Button,
                  {
                    variant: "primary",
                    disabled: busy || moving.target === "project" && moving.project.trim() === "",
                    onClick: saveMove,
                    children: t("save")
                  }
                )
              ] })
            ] }) : detail !== null ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailHead, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: css.detailTitle, children: entryTitle(detail.content) }),
                detailActions(detail)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailMeta, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.metaBadge, title: detail.scope === "global" ? t("scopeGlobal") : projectName(detail.projectHash, projects), children: [
                  detail.scope === "global" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GlobeIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FolderIcon, {}),
                  detail.scope === "global" ? t("scopeGlobal") : projectName(detail.projectHash, projects)
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: detail.source === "manual" ? `${css.metaBadge} ${css.metaBadgeAccent}` : css.metaBadge, children: [
                  detail.source === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PenIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SparkIcon, {}),
                  detail.source === "manual" ? t("sourceManual") : t("sourceExtract")
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.metaBadge, title: t("kindLabel"), children: t(KIND_LABEL[detail.kind]) }),
                detail.layer === "long" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `${css.metaBadge} ${css.metaBadgeWarn}`, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LayersIcon, {}),
                  t("groupLongterm")
                ] }),
                detail.pinned && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `${css.metaBadge} ${css.metaBadgeWarn}`, title: t("pin"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PinIcon, { size: 11, filled: true }),
                  t("tabPinned")
                ] }),
                detail.deprecated === true && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `${css.metaBadge} ${css.metaBadgeWarn}`, title: t("retire"), children: t("retiredTag") }),
                detail.verified ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.metaBadge, title: t("verified"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VerifiedIcon, {}),
                  t("verified")
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `${css.metaBadge} ${css.metaBadgeMuted}`, title: t("unverified"), children: t("unverified") }),
                detail.disabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.disabledMark, children: t("disabledTag") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.metaTime, title: absoluteTime(detail.updatedAt), children: relativeTime(detail.updatedAt) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.importanceRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.importanceLabel, children: t("importanceTitle") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.importanceBar, role: "img", "aria-label": t("importanceTitle"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { style: { width: `${importancePercent(detail.importance)}%` } }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.importanceValue, children: Number(detail.importance).toFixed(1) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.importanceLabel, children: t("confidenceTitle") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: css.importanceValue, children: [
                  Math.round(detail.confidence * 100),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.detailBody, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MarkstreamMarkdown, { text: detail.content, streaming: false }) }),
              detail.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.detailTags, children: detail.tags.map((tagName) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  className: tag === tagName ? `${css.chip} ${css.chipActive}` : css.chip,
                  onClick: () => {
                    setTag(tag === tagName ? "" : tagName);
                  },
                  children: tagName
                },
                tagName
              )) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.detailFoot, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("versionTitle", { n: detail.version }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statDot, "aria-hidden": "true" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("createdAtLabel", { time: absoluteTime(detail.createdAt) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statDot, "aria-hidden": "true" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: detail.lastHitAt === null ? t("neverHit") : t("lastHitLabel", { time: relativeTime(detail.lastHitAt) }) })
              ] })
            ] }) : renderEmpty(
              filtered.length === 0 ? t("empty") : t("detailPlaceholder"),
              filtered.length === 0 ? t("consolidateHint") : void 0
            ) })
          ] }),
          tab === "changes" && (visibleChanges.length === 0 ? renderEmpty(t("changesEmpty")) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: css.cardList, children: visibleChanges.map(renderChange) })),
          tab === "revisions" && (revisions.length === 0 ? renderEmpty(t("revisionsEmpty")) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: css.cardList, children: revisions.map(renderRevision) })),
          tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            SettingsTab,
            {
              config,
              busy,
              t,
              onPatch: (patchValue) => {
                void patchConfig(patchValue);
              },
              onReset: () => {
                if (!window.confirm(t("settingsResetConfirm"))) return;
                void resetConfig();
              }
            }
          )
        ] }) })
      ]
    }
  );
  function renderRevision(revision) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: css.changeRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.changeBadge, children: revision.trigger === "manual" ? t("revManual") : t("revDaily") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.changeMain, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.cardMeta, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: revision.scope === "global" ? t("scopeGlobal") : revision.scope }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statDot, "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("revEntries", { n: revision.entryCount }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statDot, "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { title: absoluteTime(revision.at), children: relativeTime(revision.at) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.revActions, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.Button, { variant: "outline", size: "sm", disabled: busy, onClick: () => {
        handleRollback(revision);
      }, children: t("rollback") }) })
    ] }, revision.id);
  }
  function renderChange(change) {
    const hasDiff = change.before !== void 0 && change.after !== void 0 && change.before !== change.after;
    const badgeClass = change.action === "delete" ? `${css.changeBadge} ${css.changeBadgeDelete}` : change.action === "add" ? `${css.changeBadge} ${css.changeBadgeAdd}` : change.action === "promote" ? `${css.changeBadge} ${css.changeBadgePromote}` : change.action === "revise" ? `${css.changeBadge} ${css.changeBadgeRevise}` : change.action === "retire" ? `${css.changeBadge} ${css.changeBadgeRetire}` : css.changeBadge;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: css.changeRow, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: badgeClass, children: changeActionLabel(change.action, t) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.changeMain, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.cardMeta, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: change.scope === "global" ? t("scopeGlobal") : projectName(change.projectHash, projects) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: css.statDot, "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { title: absoluteTime(change.at), children: relativeTime(change.at) })
        ] }),
        change.action === "delete" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.cardContent, children: change.summary }) : hasDiff ? (
          /* 左右并排对比：旧 | 新 */
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.changeDiff, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.changeDiffCol, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.cardMeta, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("diffOld") }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `${css.cardContent} ${css.changeOld}`, children: change.before })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.changeDiffDivider }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: css.changeDiffCol, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.cardMeta, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("diffNew") }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `${css.cardContent} ${css.changeNew}`, children: change.after })
            ] })
          ] })
        ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: css.cardContent, children: change.after ?? change.summary })
      ] })
    ] }, change.id);
  }
}
function changeActionLabel(action, t) {
  switch (action) {
    case "add":
      return t("changeAdd");
    case "update":
      return t("changeUpdate");
    case "promote":
      return t("changePromote");
    case "delete":
      return t("changeDelete");
    case "revise":
      return t("changeRevise");
    case "retire":
      return t("changeRetire");
  }
}

// src/client/memory/Notify.tsx
var import_react6 = require("react");
var READ_KEY = "dsh-memory:read";
var READ_ID_CAP = 800;
function readIds() {
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (raw === null) return /* @__PURE__ */ new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return /* @__PURE__ */ new Set();
    return new Set(parsed.filter((value) => typeof value === "string"));
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function writeIds(ids) {
  try {
    const list = [...ids];
    localStorage.setItem(READ_KEY, JSON.stringify(list.slice(Math.max(0, list.length - READ_ID_CAP))));
  } catch {
  }
}
function useUnreadChanges(api, pollMs = 6e4) {
  const [count, setCount] = (0, import_react6.useState)(0);
  const idsRef = (0, import_react6.useRef)(readIds());
  const seenRef = (0, import_react6.useRef)([]);
  const apiRef = (0, import_react6.useRef)(api);
  apiRef.current = api;
  const refresh = (0, import_react6.useCallback)(async () => {
    try {
      const response = await apiRef.current.changes();
      seenRef.current = response.changes.map((change) => change.id);
      setCount(response.changes.filter((change) => !idsRef.current.has(change.id)).length);
    } catch {
    }
  }, []);
  (0, import_react6.useEffect)(() => {
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, pollMs);
    return () => {
      window.clearInterval(timer);
    };
  }, [refresh, pollMs]);
  const markRead = (0, import_react6.useCallback)(() => {
    const ids = new Set(idsRef.current);
    for (const id of seenRef.current) ids.add(id);
    idsRef.current = ids;
    writeIds(ids);
    setCount(0);
  }, []);
  return { count, refresh, markRead };
}

// src/client/sidebar-nav.tsx
var import_react7 = require("react");
var import_react_dom2 = require("react-dom");
var import_jsx_runtime5 = require("react/jsx-runtime");
var HOST_ID = "dsh-triad-nav-host";
var ANCHOR_SELECTOR = '[data-slot="sidebar.workspaces"]';
var FRAME_SELECTOR = "div:has(> [data-shell-overlay])";
var SLOT_LAYOUT = [
  ["usage", "skills", "memory"],
  ["team"]
];
var SLOT_NAMES = SLOT_LAYOUT.flat();
function makeSlot(name) {
  const slot = document.createElement("div");
  slot.dataset.navSlot = name;
  return slot;
}
var started = false;
var pollTimer = 0;
var hostObserver;
function ensureHostPlaced() {
  const anchor = document.querySelector(ANCHOR_SELECTOR);
  if (anchor === null) return false;
  const parent = anchor.parentElement;
  if (parent === null) return false;
  let host = document.getElementById(HOST_ID);
  if (host === null) {
    host = document.createElement("div");
    host.id = HOST_ID;
    host.dataset.plugin = "dsh-triad";
    for (const row of SLOT_LAYOUT) {
      if (row.length === 1) {
        host.appendChild(makeSlot(row[0]));
        continue;
      }
      const rowEl = document.createElement("div");
      rowEl.className = "dsh-nav-row";
      for (const name of row) rowEl.appendChild(makeSlot(name));
      host.appendChild(rowEl);
    }
  }
  const inPlace = host.parentElement === parent && (anchor.compareDocumentPosition(host) & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
  if (!inPlace) {
    parent.insertBefore(host, anchor);
  }
  return true;
}
function watchHostParent() {
  const parent = document.getElementById(HOST_ID)?.parentElement;
  if (parent === void 0) return;
  hostObserver?.disconnect();
  hostObserver = new MutationObserver(() => {
    const before = document.getElementById(HOST_ID)?.parentElement;
    ensureHostPlaced();
    if (document.getElementById(HOST_ID)?.parentElement !== before) watchHostParent();
  });
  hostObserver.observe(parent, { childList: true });
}
function ensureNavMount() {
  if (typeof document === "undefined") return () => {
  };
  if (started) return () => {
  };
  started = true;
  ensureHostPlaced();
  watchHostParent();
  pollTimer = window.setInterval(() => {
    ensureHostPlaced();
    if (hostObserver === void 0) watchHostParent();
  }, 1500);
  return () => {
    window.clearInterval(pollTimer);
    pollTimer = 0;
    hostObserver?.disconnect();
    hostObserver = void 0;
    started = false;
    document.getElementById(HOST_ID)?.remove();
  };
}
function useNavSlot(name) {
  const [slot, setSlot] = (0, import_react7.useState)(null);
  (0, import_react7.useEffect)(() => {
    let timer = 0;
    let tries = 0;
    const poll = () => {
      const found = document.querySelector(`[data-nav-slot='${name}']`);
      if (found !== null) tries = 0;
      else tries += 1;
      setSlot(found);
      timer = window.setTimeout(poll, found !== null ? 800 : tries <= 10 ? 100 : 400);
    };
    poll();
    return () => {
      window.clearTimeout(timer);
    };
  }, [name]);
  return slot;
}
function useRail() {
  const [rail, setRail] = (0, import_react7.useState)(() => document.querySelector(FRAME_SELECTOR)?.hasAttribute("data-sidebar-collapsed") ?? false);
  (0, import_react7.useEffect)(() => {
    const read = () => {
      setRail(document.querySelector(FRAME_SELECTOR)?.hasAttribute("data-sidebar-collapsed") ?? false);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-sidebar-collapsed"], subtree: true });
    const timer = window.setInterval(read, 1500);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);
  return rail;
}
var STYLE_ID4 = "dsh-triad-nav-styles";
var SHEET4 = `
/* \u5BFC\u822A\u884C\uFF1A\u4E0E\u81EA\u52A8\u5316\u83DC\u5355\u884C\u540C\u6B3E\u51E0\u4F55\uFF08\u900F\u660E\u5E95 + hover \u9AD8\u4EAE + \u6587\u5B57\u7701\u7565\uFF09 */
.dsh-nav-btn{position:relative;display:flex;align-items:center;gap:8px;width:calc(100% - 4px);height:34px;padding:0 10px;margin:0 2px 4px;box-sizing:border-box;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,#eee);font-size:14px;line-height:20px;font-family:inherit;cursor:pointer;text-align:left;user-select:none;overflow:hidden;transition:background 120ms ease}
.dsh-nav-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-nav-btn[data-open='true']{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-nav-btn>svg{flex:none;color:var(--dsw-alias-label-secondary,#bbb)}
.dsh-nav-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* \u884C\u5C3E\u9644\u52A0\u5185\u5BB9\uFF08\u4ECA\u65E5\u7528\u91CF\u7B49\uFF09\uFF1A\u7B49\u5BBD\u6570\u5B57\u53F3\u8D34 */
.dsh-nav-trailing{flex:none;margin-left:auto;font-size:13px;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb);font-family:ui-monospace,SFMono-Regular,monospace}
/* \u6298\u53E0 rail \u6001\uFF1A\u53EA\u7559\u56FE\u6807 */
.dsh-nav-btn[data-rail='true']{width:36px;height:36px;padding:0;margin:0 0 8px;justify-content:center;border-radius:8px}
/* \u672A\u8BFB badge\uFF08\u8BB0\u5FC6\u5165\u53E3\uFF09\uFF1A\u53F3\u4E0A\u89D2\u5C0F\u5706\u6807 */
.dsh-nav-badge{position:absolute;top:2px;right:2px;min-width:16px;height:16px;box-sizing:border-box;padding:0 4px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--dsw-alias-state-warn-primary,#e8a33d);color:#0e1116;font-size:10px;font-weight:700;line-height:16px}
/* nav host\uFF1A\u5404\u884C\u7EB5\u5411\u5806\u53E0\uFF1B\u72EC\u7ACB\u884C\u7684\u69FD\u4F4D display:contents\uFF0C\u6309\u94AE\u76F4\u63A5\u6491\u6EE1\u6574\u884C\u3002 */
#dsh-triad-nav-host{display:flex;flex-direction:column;align-items:stretch;width:100%}
#dsh-triad-nav-host>[data-nav-slot]{display:contents}
/* \u5408\u5E76\u884C\uFF1A[\u6280\u80FD][\u8BB0\u5FC6] \u5E76\u6392\uFF1B\u69FD\u4F4D display:contents \u8BA9\u6309\u94AE\u76F4\u63A5\u53C2\u4E0E\u884C\u5E03\u5C40\uFF0C
   \u6309\u94AE\u7B49\u5206\u6574\u884C\uFF08flex:1 1 0\uFF09\uFF0C\u4E0E\u72EC\u7ACB\u884C\u7684\u89C6\u89C9\u8282\u594F\u4E00\u81F4\u2014\u2014
   \u5426\u5219\u6536\u7F29\u4E3A\u5185\u5BB9\u5BBD\u65F6\u884C\u5C3E\u4F1A\u7559\u51FA\u5927\u7247\u7A7A\u767D\u3002 */
.dsh-nav-row{display:flex;flex-wrap:wrap;align-items:stretch;gap:2px;padding:0 2px}
.dsh-nav-row>[data-nav-slot]{display:contents;min-width:0}
.dsh-nav-row .dsh-nav-btn{width:auto;flex:1 1 0;min-width:0;margin:0 0 4px;justify-content:center;text-align:center;padding:0 8px}
.dsh-nav-row .dsh-nav-btn .dsh-nav-label{min-width:0}
/* \u4E09\u7B49\u5206\u540E\u6BCF\u683C\u7EA6 1/3 \u4FA7\u680F\u5BBD\uFF0C\u653E\u4E0D\u4E0B\u300C\u6587\u5B57 + \u884C\u5C3E\u6570\u5B57\u300D\uFF0C\u4E14\u884C\u5C3E\u7684
   margin-left:auto \u4F1A\u9876\u6389\u5C45\u4E2D\u3002\u5408\u5E76\u884C\u7EDF\u4E00\u4E0D\u663E\u793A\u884C\u5C3E\u9644\u52A0\u5185\u5BB9
   \uFF08\u4ECA\u65E5\u603B\u91CF\u7B49\uFF09\u2014\u2014\u5B8C\u6574\u6570\u636E\u70B9\u5F00\u5DE5\u4F5C\u53F0\u5361\u7247\u5373\u53EF\u3002 */
.dsh-nav-row .dsh-nav-trailing{display:none}
/* \u6298\u53E0 rail \u6001\uFF1A\u5408\u5E76\u884C\u6062\u590D\u7EB5\u5411\u56FE\u6807\u5217\uFF08\u4E0E\u539F\u751F rail \u56FE\u6807\u94AE\u8282\u594F\u4E00\u81F4\uFF09 */
#dsh-triad-nav-host:has(.dsh-nav-btn[data-rail]) .dsh-nav-row{flex-direction:column;align-items:flex-start;gap:0}
#dsh-triad-nav-host:has(.dsh-nav-btn[data-rail]) .dsh-nav-row .dsh-nav-btn{width:36px;flex:none;margin:0 0 8px}
`;
function ensureNavStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID4) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID4;
  tag.dataset.plugin = "dsh-triad";
  tag.textContent = SHEET4;
  document.head.appendChild(tag);
}
function NavButton({
  icon,
  label,
  rail = false,
  expanded = false,
  badge = 0,
  badgeTitle,
  ariaLabel,
  trailing,
  onMouseEnter,
  onMouseLeave,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "button",
    {
      type: "button",
      className: "dsh-nav-btn",
      "data-rail": rail || void 0,
      "data-open": expanded || void 0,
      "aria-label": ariaLabel ?? label,
      "aria-expanded": expanded,
      title: rail ? ariaLabel ?? label : void 0,
      onMouseEnter,
      onMouseLeave,
      onClick,
      children: [
        icon,
        !rail && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-nav-label", children: label }),
        !rail && trailing !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-nav-trailing", children: trailing }),
        badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-nav-badge", title: badgeTitle, children: badge > 99 ? "99+" : String(badge) })
      ]
    }
  );
}
function NavPortal({ name, children }) {
  const slot = useNavSlot(name);
  if (slot === null) return null;
  return (0, import_react_dom2.createPortal)(children, slot);
}
function navAnchorFrom(el) {
  if (el === null) return null;
  const row = el.closest(`#${HOST_ID}`);
  if (row === null) return null;
  const rowRect = row.getBoundingClientRect();
  const btnRect = el.getBoundingClientRect();
  return { left: Math.round(rowRect.right + 8), top: Math.round(btnRect.top - 6) };
}

// src/client/error-boundary.tsx
var import_react8 = require("react");
var ErrorBoundary = class extends import_react8.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { error: null });
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error(`[dsh-triad] ${this.props.label} \u6E32\u67D3\u5D29\u6E83\uFF1A`, error, info.componentStack ?? "");
    try {
      this.props.onError?.(error);
    } catch (callbackError) {
      console.error("[dsh-triad] \u9519\u8BEF\u8FB9\u754C\u56DE\u8C03\u5931\u8D25\uFF1A", callbackError);
    }
  }
  render() {
    if (this.state.error !== null) return this.props.fallback ?? null;
    return this.props.children;
  }
};

// src/client/memory/Entry.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function MemoryNavApp() {
  ensureStyles();
  ensureNavStyles();
  ensureModalAnimStyles();
  ensureShellStyles();
  const api = (0, import_react9.useMemo)(createMemoryApi, []);
  const t = (0, import_react9.useMemo)(makeT, []);
  const rail = useRail();
  const unread = useUnreadChanges(api);
  const [open, setOpen] = (0, import_react9.useState)(false);
  const [anchor, setAnchor] = (0, import_react9.useState)(null);
  const [initialTab, setInitialTab] = (0, import_react9.useState)("all");
  const { closing, requestClose } = useModalClose(open, () => {
    setOpen(false);
  });
  const openPanel = (tab) => {
    setInitialTab(tab);
    setOpen(true);
    if (tab === "changes") unread.markRead();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(NavPortal, { name: "memory", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      NavButton,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(BrainIcon, { size: rail ? 18 : 16 }),
        label: t("entry"),
        rail,
        expanded: open,
        badge: unread.count,
        badgeTitle: t("unreadChanges", { n: unread.count }),
        onClick: (e) => {
          e.stopPropagation();
          setAnchor(navAnchorFrom(e.currentTarget));
          openPanel(unread.count > 0 ? "changes" : "all");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ErrorBoundary, { label: "\u8BB0\u5FC6\u9762\u677F", fallback: null, onError: requestClose, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      MemoryPanel,
      {
        ...api,
        open,
        closing,
        onClose: requestClose,
        initialTab,
        anchor,
        t
      }
    ) })
  ] });
}

// src/client/memory/Toggle.tsx
var import_react10 = require("react");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime7 = require("react/jsx-runtime");
function MemoryToggle({ sessionId, t, ...api }) {
  ensureStyles();
  const [enabled, setEnabled] = (0, import_react10.useState)(null);
  (0, import_react10.useEffect)(() => {
    let alive = true;
    void api.getInjectState(sessionId).then((state) => {
      if (alive) setEnabled(state.enabled);
    }).catch(() => {
      if (alive) setEnabled(true);
    });
    return () => {
      alive = false;
    };
  }, [sessionId, api]);
  const toggle = () => {
    const next = !(enabled ?? true);
    setEnabled(next);
    void api.setInjectState(sessionId, next).then((state) => setEnabled(state.enabled)).catch(() => setEnabled(!next));
  };
  const isOn = enabled ?? true;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_dsh_client_ui_primitives3.Tooltip, { label: isOn ? t("injectOn") : t("injectOff"), side: "top", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "button",
    {
      type: "button",
      className: isOn ? `${css.toggle} ${css.toggleOn}` : `${css.toggle} ${css.toggleOff}`,
      "aria-label": isOn ? t("injectOn") : t("injectOff"),
      "aria-pressed": isOn,
      onClick: toggle,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(BrainIcon, { size: 14 })
    }
  ) });
}

// src/client/memory/index.ts
function applyMemoryClient(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-memory: dictionaries");
  ctx.effect(() => {
    ensureNavMount();
    const holder = document.createElement("div");
    const root = (0, import_client.createRoot)(holder);
    root.render((0, import_react11.createElement)(MemoryNavApp));
    return () => {
      root.unmount();
    };
  }, "dsh-memory: nav entry");
  const panelInjected = () => createMemoryApi();
  ctx.slots.inject("conversation.input.left", () => ctx.slots.register({
    name: "conversation.input.left",
    id: "dsh-memory-inject-toggle",
    order: 99,
    locale: NS,
    inject: panelInjected
  }, MemoryToggle));
}

// src/client/usage/entry.tsx
var import_react28 = require("react");
var import_client2 = require("react-dom/client");
var import_dsh_client_ui_primitives6 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/usage/dashboard/Workbench.tsx
var import_react25 = require("react");

// src/client/usage/dashboard/TrendTab.tsx
var import_react15 = require("react");

// src/client/usage/dashboard/api.ts
async function fetchJson(path, init) {
  const res = await fetch(path, { cache: "no-store", ...init, headers: { accept: "application/json", ...init?.headers } });
  return res.json();
}
var usageApi = {
  usage: () => fetchJson("/api/usage-stats/usage"),
  signal: (days = 30) => fetchJson(`/api/usage-stats/signal?days=${days}`),
  daySessions: (date) => fetchJson(`/api/usage-stats/day-sessions?date=${encodeURIComponent(date)}`),
  budget: () => fetchJson("/api/usage-stats/budget"),
  saveBudget: (budget) => fetchJson("/api/usage-stats/budget", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ budget })
  }),
  providers: () => fetchJson("/api/usage-stats/providers"),
  account: (provider, refresh = false) => fetchJson(`/api/usage-stats/account?provider=${encodeURIComponent(provider)}${refresh ? "&refresh=1" : ""}`),
  subscriptions: () => fetchJson("/api/usage-stats/subscriptions")
};

// src/client/usage/dashboard/aggregate.ts
function sumTokens(days) {
  let input = 0, output = 0, cache = 0;
  for (const d of days) {
    input += d.inputTokens ?? 0;
    output += d.outputTokens ?? 0;
    cache += (d.cacheReadTokens ?? 0) + (d.cacheWriteTokens ?? 0);
  }
  return { input, output, cache, total: input + output + cache };
}
function modelRank(days) {
  const map = /* @__PURE__ */ new Map();
  for (const d of days) {
    for (const m of d.models ?? []) {
      const row = map.get(m.model) ?? { tokens: 0, input: 0, cacheRead: 0, cacheWrite: 0 };
      row.tokens += m.tokens ?? 0;
      row.input += m.inputTokens ?? 0;
      row.cacheRead += m.cacheReadTokens ?? 0;
      row.cacheWrite += m.cacheWriteTokens ?? 0;
      map.set(m.model, row);
    }
  }
  return [...map.entries()].map(([label, row]) => {
    const prompt = row.input + row.cacheRead + row.cacheWrite;
    return {
      label,
      value: row.tokens,
      hitRate: prompt > 0 ? row.cacheRead / prompt * 100 : null
    };
  }).sort((a, b) => b.value - a.value);
}
function splitModelKey(model) {
  const slash = model.indexOf("/");
  if (slash <= 0) return { provider: model, model };
  return { provider: model.slice(0, slash), model: model.slice(slash + 1) };
}
function providerShare(days) {
  const map = /* @__PURE__ */ new Map();
  for (const d of days) {
    for (const m of d.models ?? []) {
      const provider = m.model.includes("/") ? m.model.split("/")[0] : m.model;
      map.set(provider, (map.get(provider) ?? 0) + (m.tokens ?? 0));
    }
  }
  return [...map.entries()].map(([provider, tokens]) => ({ provider, tokens })).sort((a, b) => b.tokens - a.tokens);
}
function averageCacheHitRate(days) {
  if (days.length === 0) return 0;
  const sum = days.reduce((acc, d) => acc + (d.cacheHitRate ?? 0), 0);
  return sum / days.length;
}
function sumActivity(days) {
  let requests = 0;
  let workMs = 0;
  for (const d of days) {
    requests += d.requests ?? 0;
    workMs += d.workMs ?? 0;
  }
  return { requests, workMs };
}

// src/client/usage/dashboard/range.ts
function toDayStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fromDayStr(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function rangeDays(r) {
  return Math.round((fromDayStr(r.end).getTime() - fromDayStr(r.start).getTime()) / 864e5) + 1;
}
function resolveRange(preset, custom, now = /* @__PURE__ */ new Date()) {
  const today = toDayStr(now);
  switch (preset) {
    case "today":
      return { range: { start: today, end: today }, label: "\u4ECA\u65E5" };
    case "yesterday": {
      const y = toDayStr(addDays(now, -1));
      return { range: { start: y, end: y }, label: "\u6628\u65E5" };
    }
    case "7d":
      return { range: { start: toDayStr(addDays(now, -6)), end: today }, label: "\u8FD1 7 \u5929" };
    case "30d":
      return { range: { start: toDayStr(addDays(now, -29)), end: today }, label: "\u8FD1 30 \u5929" };
    case "month": {
      const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      return { range: { start, end: today }, label: "\u672C\u6708" };
    }
    case "lastMonth": {
      const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const last = new Date(now.getFullYear(), now.getMonth(), 0);
      return { range: { start: toDayStr(first), end: toDayStr(last) }, label: "\u4E0A\u6708" };
    }
    case "year":
      return { range: { start: `${now.getFullYear()}-01-01`, end: today }, label: "\u4ECA\u5E74" };
    case "all":
      return { range: { start: "2000-01-01", end: today }, label: "\u5168\u90E8" };
    case "custom":
      return { range: custom ?? { start: today, end: today }, label: custom !== null ? `${custom.start} ~ ${custom.end}` : "\u81EA\u5B9A\u4E49" };
  }
}
function prevRange(r) {
  const n = rangeDays(r);
  return {
    start: toDayStr(addDays(fromDayStr(r.start), -n)),
    end: toDayStr(addDays(fromDayStr(r.end), -n))
  };
}
function filterDays(days, r) {
  return days.filter((d) => d.date >= r.start && d.date <= r.end);
}
function pickGrain(r) {
  const n = rangeDays(r);
  if (n <= 2) return "hour";
  if (n <= 31) return "day";
  if (n <= 120) return "week";
  return "month";
}
function weekStart(s) {
  const d = fromDayStr(s);
  const dow = (d.getDay() + 6) % 7;
  return toDayStr(addDays(d, -dow));
}
function aggregateSeries(days, grain) {
  const buckets = /* @__PURE__ */ new Map();
  for (const d of days) {
    const key = grain === "day" ? d.date : grain === "week" ? weekStart(d.date) : d.date.slice(0, 7);
    const arr = buckets.get(key);
    if (arr) arr.push(d);
    else buckets.set(key, [d]);
  }
  return [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([label, group]) => {
    let input = 0, output = 0, cache = 0;
    for (const d of group) {
      input += d.inputTokens ?? 0;
      output += d.outputTokens ?? 0;
      cache += (d.cacheReadTokens ?? 0) + (d.cacheWriteTokens ?? 0);
    }
    return { label, input, output, cache };
  });
}
function hourLabel(hour, multiDay) {
  const hh = hour.slice(11, 13);
  const mmdd = hour.slice(5, 10);
  return multiDay ? `${mmdd} ${hh}:00` : `${hh}:00`;
}
function aggregateHourSeries(hours, r) {
  const multiDay = r.start !== r.end;
  const buckets = /* @__PURE__ */ new Map();
  for (const h of hours) {
    const day = h.hour.slice(0, 10);
    if (day < r.start || day > r.end) continue;
    const arr = buckets.get(h.hour);
    if (arr) arr.push(h);
    else buckets.set(h.hour, [h]);
  }
  return [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([hour, group]) => {
    let input = 0, output = 0, cache = 0;
    for (const h of group) {
      input += h.inputTokens ?? 0;
      output += h.outputTokens ?? 0;
      cache += (h.cacheReadTokens ?? 0) + (h.cacheWriteTokens ?? 0);
    }
    return { label: hourLabel(hour, multiDay), input, output, cache };
  });
}
function deltaPercent(current, previous) {
  if (previous <= 0) return current > 0 ? null : 0;
  return (current - previous) / previous * 100;
}
function dailyAverage(days) {
  if (days.length === 0) return 0;
  const total = days.reduce((acc, d) => acc + (d.tokens ?? 0), 0);
  return total / days.length;
}

// src/client/usage/dashboard/format.ts
function formatYiExact(n) {
  if (!isFinite(n) || n < 1e8) return null;
  const yi = n / 1e8;
  const yiText = yi >= 100 ? String(Math.round(yi)) : yi.toFixed(1).replace(/\.0$/, "");
  return { yi: `${yiText} \u4EBF`, exact: n.toLocaleString("en-US") };
}
function formatUnits(n) {
  if (!isFinite(n) || n < 0) return String(n);
  if (n >= 1e8) {
    const v = n / 1e8;
    return `${v >= 100 ? Math.round(v) : v.toFixed(v >= 10 ? 1 : 2).replace(/\.?0+$/, "")}\u4EBF`;
  }
  if (n >= 1e4) {
    const v = n / 1e4;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}\u4E07`;
  }
  return String(Math.round(n));
}
function formatExact(n) {
  return n.toLocaleString("en-US");
}
function formatHitRate(n) {
  if (n === null || n === void 0 || !isFinite(n)) return "\u2014";
  return `${n.toFixed(2)}%`;
}
function relativeTime2(ts, now = Date.now()) {
  const diff = ts - now;
  const abs = Math.abs(diff);
  const minute = 6e4;
  const hour = 36e5;
  const day = 864e5;
  if (abs < minute) return "\u521A\u521A";
  const future = diff > 0;
  if (abs < hour) return `${Math.round(abs / minute)} \u5206\u949F${future ? "\u540E" : "\u524D"}`;
  if (abs < day) return `${Math.round(abs / hour)} \u5C0F\u65F6${future ? "\u540E" : "\u524D"}`;
  return `${Math.round(abs / day)} \u5929${future ? "\u540E" : "\u524D"}`;
}
function formatWorkDuration(ms) {
  if (!isFinite(ms) || ms <= 0) return "\u2014";
  const totalMinutes = Math.round(ms / 6e4);
  if (totalMinutes < 1) return "\u4E0D\u8DB31\u5206\u949F";
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60) % 24;
  const days = Math.floor(totalMinutes / 1440);
  if (days > 0) return `${days}\u5929${hours > 0 ? `${hours}\u5C0F\u65F6` : ""}`;
  if (hours > 0) return `${hours}\u5C0F\u65F6${minutes > 0 ? `${minutes}\u5206` : ""}`;
  return `${minutes}\u5206\u949F`;
}

// src/client/usage/dashboard/theme.ts
var PALETTE = ["#4f8cff", "#7c6bff", "#22b8cf", "#51cf66", "#ffa94d", "#f06595", "#ff6b6b", "#868e96"];
function providerPalette() {
  return [...PALETTE];
}
function alertColor(level) {
  switch (level) {
    case "critical":
      return "var(--dsw-alias-state-error-primary)";
    case "warning":
      return "var(--dsw-alias-state-warn-primary)";
    case "normal":
      return "var(--dsw-alias-state-success-primary)";
    default:
      return "var(--dsw-alias-label-tertiary)";
  }
}

// src/client/usage/dashboard/charts/BarChart.tsx
var import_react13 = require("react");
var import_react_dom4 = require("react-dom");

// src/client/usage/dashboard/charts/ChartTooltip.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function ChartTooltip({ x, y, children, placement = "top" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: {
    position: "fixed",
    left: x,
    top: y,
    zIndex: 6100,
    transform: placement === "top" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 14px)",
    background: "var(--dsw-alias-bg-layer-3)",
    border: "1px solid var(--dsw-alias-border-l2)",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 12,
    lineHeight: 1.5,
    boxShadow: "0 8px 24px rgba(0,0,0,.3)",
    pointerEvents: "none",
    whiteSpace: "nowrap"
  }, children });
}

// src/client/usage/dashboard/charts/AreaChart.tsx
var import_react12 = require("react");
var import_react_dom3 = require("react-dom");
var import_jsx_runtime9 = require("react/jsx-runtime");
function niceTicks(max, count = 4) {
  if (max <= 0) return [0, 1];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1) * mag;
  const top = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = 0; v <= top + step * 0.5; v += step) ticks.push(v);
  return ticks.length >= 2 ? ticks : [0, step];
}
function axisLabel(label) {
  if (label.includes(":")) return label;
  if (label.length >= 8) return label.slice(5);
  if (label.length === 7) return label.slice(2);
  return label;
}

// src/client/usage/dashboard/charts/BarChart.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var SERIES = [
  { key: "input", name: "\u8F93\u5165", color: "var(--dsw-alias-state-business-primary)" },
  { key: "output", name: "\u8F93\u51FA", color: "#22b8cf" },
  { key: "cache", name: "\u7F13\u5B58\u8BFB\u53D6", color: "var(--dsw-alias-label-tertiary)" }
];
var MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
var STYLE_ID5 = "dsh-usage-bar-chart-styles";
var ANIM_SHEET = `
@keyframes dsh-bar-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.dsh-bar-chart { animation: var(--dsh-chart-anim, dsh-bar-rise .5s cubic-bezier(.2,.8,.2,1)); }
.dsh-bar-chart .dsh-bar-hover { opacity: 0; transition: opacity .15s ease; }
.dsh-bar-chart:hover .dsh-bar-hover { opacity: 1; }
/* \u2500\u2500 \u79FB\u52A8\u7AEF\uFF1A\u56FE\u4F8B\u5141\u8BB8\u6362\u884C\uFF0Ctooltip \u6570\u503C\u884C min-width \u5F52\u96F6\uFF08\u4E0D\u6491\u7834\u89C6\u53E3\uFF09\u3002
    \u5185\u8054 minWidth \u9700 !important \u538B\u8FC7\uFF1B\u672C\u5757\u6CE8\u91CA\u672A\u5199\u51FA\u300C\u661F\u53F7\u7D27\u8DDF\u6B63\u659C\u6760\u300D\u5E8F\u5217\u3002 \u2500\u2500 */
@media (max-width: 767.98px) {
  .dsh-bar-legend { flex-wrap: wrap; gap: 6px; font-size: 10px; }
  .dsh-chart-tip-row { min-width: 0 !important; flex-wrap: wrap; }
}
`;
function ensureBarChartStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID5) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID5;
  tag.textContent = ANIM_SHEET;
  document.head.appendChild(tag);
}
function BarChart({ data, height = 240, movingAverage = 7, anomalies, onSelectAnomaly }) {
  const [hover, setHover] = (0, import_react13.useState)(null);
  const wrapRef = (0, import_react13.useRef)(null);
  const [wrapW, setWrapW] = (0, import_react13.useState)(0);
  (0, import_react13.useEffect)(ensureBarChartStyles, []);
  (0, import_react13.useEffect)(() => {
    const el = wrapRef.current;
    if (el === null || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      setWrapW(el.clientWidth);
    });
    ro.observe(el);
    setWrapW(el.clientWidth);
    return () => {
      ro.disconnect();
    };
  }, []);
  const W = 800, H = height;
  const PAD = { l: 48, r: 16, t: 20, b: 26 };
  const renderH = wrapW > 0 ? Math.max(120, Math.round(wrapW * H / W)) : H;
  const totals = data.map((d) => d.input + d.output + d.cache);
  const maxVal = totals.length > 0 ? Math.max(0, ...totals) : 0;
  const ticks = (0, import_react13.useMemo)(() => niceTicks(maxVal || 1), [maxVal]);
  const chartMax = ticks[ticks.length - 1] || 1;
  const slot = (W - PAD.l - PAD.r) / Math.max(1, data.length);
  const barW = Math.min(30, slot * 0.62);
  const cx = (i) => PAD.l + slot * i + slot / 2;
  const y = (v) => H - PAD.b - v / chartMax * (H - PAD.t - PAD.b);
  const clampY = (v) => Math.max(PAD.t, Math.min(H - PAD.b, y(v)));
  const maLine = (0, import_react13.useMemo)(() => {
    const win = movingAverage > 0 ? Math.min(movingAverage, data.length) : 0;
    if (win < 2 || data.length < win) return null;
    const pts = totals.map((_, i) => {
      const start = Math.max(0, i - win + 1);
      let sum = 0;
      for (let k = start; k <= i; k++) sum += totals[k];
      return { x: cx(i), y: clampY(sum / (i - start + 1)) };
    });
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  }, [data, chartMax, movingAverage, W, H]);
  const labelStep = Math.max(1, Math.ceil(data.length / Math.max(1, Math.floor((W - PAD.l - PAD.r) / 70))));
  if (data.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { height, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dsw-alias-label-tertiary)", fontSize: 13 }, children: "\u6682\u65E0\u6570\u636E" });
  }
  const hoverPoint = hover !== null ? data[hover.index] : void 0;
  const hoverTotal = hover !== null ? totals[hover.index] : 0;
  const hoverMa = (() => {
    const win = movingAverage > 0 ? Math.min(movingAverage, data.length) : 0;
    if (win < 2 || hover === null || data.length < win) return null;
    const start = Math.max(0, hover.index - win + 1);
    let sum = 0;
    for (let k = start; k <= hover.index; k++) sum += totals[k];
    return sum / (hover.index - start + 1);
  })();
  const hoverAnomaly = hoverPoint !== void 0 && anomalies !== void 0 ? anomalies.get(hoverPoint.label) : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { ref: wrapRef, className: "dsh-bar-chart", style: { position: "relative", paddingTop: 16 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-bar-legend", style: { position: "absolute", top: 0, right: 0, display: "flex", gap: 14, pointerEvents: "none", alignItems: "center" }, children: [
      SERIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--dsw-alias-label-secondary)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: {
          width: 8,
          height: 8,
          borderRadius: 2,
          flex: "none",
          background: s.key === "cache" ? "color-mix(in srgb, var(--dsw-alias-label-tertiary) 22%, transparent)" : s.color,
          border: s.key === "cache" ? "1px dashed var(--dsw-alias-border-l3)" : "none"
        } }),
        s.name
      ] }, s.key)),
      maLine !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--dsw-alias-label-secondary)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { width: 12, height: 0, borderTop: "2px solid var(--dsw-alias-state-warn-label)", flex: "none" } }),
        "MA",
        Math.min(movingAverage, data.length)
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: renderH, children: [
      ticks.map((v) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("line", { x1: PAD.l, x2: W - PAD.r, y1: y(v), y2: y(v), stroke: "var(--dsw-alias-border-l1)", strokeDasharray: "4 4" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("text", { x: PAD.l - 8, y: y(v) + 3.5, fontSize: 10.5, fill: "var(--dsw-alias-label-tertiary)", textAnchor: "end", children: formatUnits(v) })
      ] }, v)),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("line", { x1: PAD.l, x2: W - PAD.r, y1: H - PAD.b, y2: H - PAD.b, stroke: "var(--dsw-alias-border-l2)" }),
      data.map((d, i) => {
        const x0 = cx(i) - barW / 2;
        const segs = [
          { v: d.input, fill: SERIES[0].color },
          { v: d.output, fill: SERIES[1].color },
          { v: d.cache, fill: "color-mix(in srgb, var(--dsw-alias-label-tertiary) 22%, transparent)", dashed: true }
        ];
        let acc = 0;
        const isAnomaly = anomalies?.has(d.label) ?? false;
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { children: [
          segs.map((seg, si) => {
            const yTop = clampY(acc + seg.v);
            const yBottom = clampY(acc);
            const h = Math.max(0, yBottom - yTop);
            acc += seg.v;
            if (h <= 0) return null;
            return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "rect",
              {
                x: x0,
                y: yTop,
                width: barW,
                height: h,
                fill: seg.fill,
                stroke: seg.dashed === true ? "var(--dsw-alias-border-l3)" : "none",
                strokeWidth: seg.dashed === true ? 0.75 : 0,
                strokeDasharray: seg.dashed === true ? "2 2" : void 0,
                rx: si === segs.length - 1 ? 2 : 0
              },
              si
            );
          }),
          isAnomaly && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: cx(i), cy: clampY(totals[i]) - 7, r: 3.5, fill: "var(--dsw-alias-state-error-primary)" })
        ] }, d.label);
      }),
      maLine !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "path",
        {
          d: maLine,
          fill: "none",
          stroke: "var(--dsw-alias-state-warn-label)",
          strokeWidth: 1.75,
          strokeLinejoin: "round",
          strokeLinecap: "round",
          opacity: 0.9
        }
      ),
      hover !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { className: "dsh-bar-hover", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "rect",
          {
            x: PAD.l + slot * hover.index,
            y: PAD.t,
            width: slot,
            height: H - PAD.t - PAD.b,
            fill: "var(--dsw-alias-border-l1)",
            opacity: 0.35
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "line",
          {
            x1: cx(hover.index),
            x2: cx(hover.index),
            y1: PAD.t,
            y2: H - PAD.b,
            stroke: "var(--dsw-alias-border-l3)",
            strokeDasharray: "3 3"
          }
        )
      ] }),
      data.map((d, i) => i % labelStep === 0 || i === data.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "text",
        {
          x: cx(i),
          y: H - 8,
          fontSize: 10.5,
          fill: "var(--dsw-alias-label-tertiary)",
          textAnchor: i === 0 ? "start" : i === data.length - 1 ? "end" : "middle",
          children: axisLabel(d.label)
        },
        d.label
      ) : null),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "rect",
        {
          x: PAD.l,
          y: PAD.t,
          width: W - PAD.l - PAD.r,
          height: H - PAD.t - PAD.b,
          fill: "transparent",
          onMouseMove: (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            const index = Math.min(data.length - 1, Math.floor(t * data.length));
            setHover({ index, x: e.clientX, y: e.clientY });
          },
          onMouseLeave: () => setHover(null)
        }
      ),
      anomalies !== void 0 && onSelectAnomaly !== void 0 && data.map((d, i) => {
        if (!anomalies.has(d.label)) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { onClick: () => onSelectAnomaly(d.label), style: { cursor: "pointer" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("title", { children: `\u67E5\u770B ${d.label} \u7684\u4F1A\u8BDD\uFF08\u5F02\u5E38\u65E5 ${multipleText(anomalies.get(d.label)?.multiple)}\uFF09` }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: cx(i), cy: clampY(totals[i]) - 7, r: 10, fill: "transparent" })
        ] }, `hit-${d.label}`);
      })
    ] }),
    hover !== null && hoverPoint !== void 0 && typeof document !== "undefined" && (0, import_react_dom4.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(ChartTooltip, { x: hover.x, y: hover.y, placement: hover.y < 180 ? "bottom" : "top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { fontWeight: 600, color: "var(--dsw-alias-label-primary)", marginBottom: 4 }, children: [
          hoverPoint.label,
          anomalies?.has(hoverPoint.label) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { marginLeft: 6, fontSize: 11, fontWeight: 500, color: "var(--dsw-alias-state-error-primary)" }, children: [
            "\u5F02\u5E38\u65E5 ",
            multipleText(anomalies.get(hoverPoint.label)?.multiple)
          ] })
        ] }),
        [...SERIES].reverse().map((s) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-chart-tip-row", style: { display: "flex", alignItems: "center", gap: 8, minWidth: 180 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: {
            width: 8,
            height: 8,
            borderRadius: 2,
            flex: "none",
            background: s.key === "cache" ? "color-mix(in srgb, var(--dsw-alias-label-tertiary) 22%, transparent)" : s.color,
            border: s.key === "cache" ? "1px dashed var(--dsw-alias-border-l3)" : "none"
          } }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: s.name }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { marginLeft: "auto", color: "var(--dsw-alias-label-primary)", fontFamily: MONO }, children: [
            formatUnits(hoverPoint[s.key]),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 11 }, children: [
              "(",
              formatExact(hoverPoint[s.key]),
              ")"
            ] })
          ] })
        ] }, s.key)),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { borderTop: "1px solid var(--dsw-alias-border-l1)", marginTop: 5, paddingTop: 5, display: "flex", alignItems: "center", gap: 8, minWidth: 180 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: "\u5408\u8BA1" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { marginLeft: "auto", fontWeight: 600, color: "var(--dsw-alias-label-primary)", fontFamily: MONO }, children: [
            formatUnits(hoverTotal),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 11 }, children: [
              "(",
              formatExact(hoverTotal),
              ")"
            ] })
          ] })
        ] }),
        hoverMa !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 180, marginTop: 2 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { width: 12, height: 0, borderTop: "2px solid var(--dsw-alias-state-warn-label)", flex: "none" } }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: [
            "MA",
            Math.min(movingAverage, data.length)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { marginLeft: "auto", color: "var(--dsw-alias-label-primary)", fontFamily: MONO }, children: formatUnits(hoverMa) })
        ] }),
        hoverAnomaly !== void 0 && onSelectAnomaly !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { marginTop: 5, fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-state-error-primary)" }, children: "\u70B9\u51FB\u67F1\u9876\u7EA2\u70B9\u67E5\u770B\u8BE5\u65E5\u4F1A\u8BDD" })
      ] }),
      document.body
    )
  ] });
}
function multipleText(value) {
  if (value === void 0 || !isFinite(value)) return "";
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)}x`;
}

// src/client/usage/dashboard/charts/RankBars.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function RankBars({ rows, maxRows = 10, nameWidth = 200 }) {
  const palette = providerPalette();
  const visible = rows.slice(0, maxRows);
  const max = visible[0]?.value ?? 1;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: { display: "flex", flexDirection: "column" }, children: [
    visible.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { style: { width: 10, height: 10, borderRadius: 3, background: palette[i % palette.length], flex: "none" } }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { style: { width: nameWidth, flex: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--dsw-alias-label-primary)", fontSize: 12 }, title: row.label, children: row.label }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "span",
        {
          style: { flex: "none", fontSize: 11, lineHeight: "16px", fontFamily: "ui-monospace, monospace", color: "var(--dsw-alias-label-tertiary)", whiteSpace: "nowrap" },
          title: row.hitRate !== null && row.hitRate !== void 0 ? `\u7F13\u5B58\u547D\u4E2D\u7387 ${formatHitRate(row.hitRate)}` : "\u65E0\u547D\u4E2D\u7387\u6570\u636E",
          children: row.hitRate !== null && row.hitRate !== void 0 ? formatHitRate(row.hitRate) : "\u2014"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: { flex: 1, height: 8, borderRadius: 4, background: "var(--dsw-alias-border-l2)", overflow: "hidden", minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: { height: "100%", width: `${Math.max(2, row.value / (max || 1) * 100)}%`, background: palette[i % palette.length], borderRadius: 4 } }) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { style: { flex: "none", width: 64, textAlign: "right", color: "var(--dsw-alias-label-secondary)", fontSize: 12, fontFamily: "ui-monospace, monospace" }, children: formatUnits(row.value) })
    ] }, row.label)),
    rows.length > maxRows && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)", paddingTop: 4 }, children: [
      "\u5176\u4ED6 ",
      rows.length - maxRows,
      " \u4E2A \xB7 \u5408\u8BA1 ",
      formatUnits(rows.slice(maxRows).reduce((a, r) => a + r.value, 0))
    ] })
  ] });
}

// src/client/usage/dashboard/dash.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var MONO2 = "ui-monospace, SFMono-Regular, Menlo, monospace";
var surface = {
  border: "1px solid var(--dsw-alias-border-l1)",
  borderRadius: 16,
  background: "var(--dsw-alias-bg-module-platform)",
  boxSizing: "border-box",
  minWidth: 0
};
function panel(padding = 16, gap = 12) {
  return { ...surface, padding, display: "flex", flexDirection: "column", gap, minWidth: 0 };
}
function PanelHead({ title, meta, action }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 14, lineHeight: "22px", fontWeight: 600, color: "var(--dsw-alias-label-primary)", whiteSpace: "nowrap" }, children: title }),
    meta !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { minWidth: 0, fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: meta }),
    action !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { marginLeft: "auto", flex: "none" }, children: action })
  ] });
}
function HeroStat({ icon, value, label, delta }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { style: { display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { flex: "none", display: "inline-flex", alignSelf: "center", color: "var(--dsw-alias-label-tertiary)" }, children: icon }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 26, lineHeight: "34px", fontWeight: 600, fontFamily: MONO2, color: "var(--dsw-alias-label-primary)", whiteSpace: "nowrap" }, children: value }),
      delta != null && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 11, fontFamily: MONO2, color: delta.color, whiteSpace: "nowrap" }, children: delta.text })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label })
  ] });
}
function Tile({ label, value, sub, tone = "business", action, onAction }) {
  const dot = tone === "success" ? "var(--dsw-alias-state-success-primary)" : tone === "warn" ? "var(--dsw-alias-state-warn-primary)" : tone === "error" ? "var(--dsw-alias-state-error-primary)" : tone === "muted" ? "var(--dsw-alias-label-tertiary)" : "var(--dsw-alias-state-business-primary)";
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { ...panel(14, 8), justifyContent: "space-between" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { width: 8, height: 8, borderRadius: 4, background: dot, flex: "none" } }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 22, lineHeight: "30px", fontWeight: 600, fontFamily: MONO2, color: "var(--dsw-alias-label-primary)", whiteSpace: "nowrap" }, children: value }),
      sub !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: sub })
    ] }),
    action !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { type: "button", onClick: onAction, style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      marginTop: 2,
      padding: 0,
      border: "none",
      background: "transparent",
      color: "var(--dsw-alias-label-secondary)",
      fontSize: 12,
      lineHeight: "18px",
      fontFamily: "inherit",
      cursor: onAction !== void 0 ? "pointer" : "default"
    }, children: [
      action,
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M7 17 17 7M9 7h8v8" }) })
    ] })
  ] });
}
var icons = {
  tokens: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ellipse", { cx: "12", cy: "5", rx: "8", ry: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" })
  ] }),
  input: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M12 3v12" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "m7 10 5 5 5-5" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M4 21h16" })
  ] }),
  output: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M12 21V9" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "m7 14 5-5 5 5" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M4 3h16" })
  ] }),
  requests: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M3 12h4l3 7 4-14 3 7h4" }) }),
  clock: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M12 7v5l3.5 2" })
  ] })
};

// src/client/usage/dashboard/charts/Gauge.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var R = 88;
var ARC = Math.PI * R;
function Gauge({ percent, label, size = 190 }) {
  const valid = percent !== null && isFinite(percent);
  const p = valid ? Math.max(0, Math.min(100, percent)) : 0;
  const rad = Math.PI * (1 - p / 100);
  const knobX = 110 + R * Math.cos(rad);
  const knobY = 118 - R * Math.sin(rad);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: { flex: "none", width: size, display: "flex", flexDirection: "column", alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("svg", { viewBox: "0 0 220 136", width: size, height: Math.round(size * 136 / 220), role: "img", "aria-label": `${label} ${valid ? `${p.toFixed(0)}%` : "\u6682\u65E0\u6570\u636E"}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M 22 118 A 88 88 0 0 1 198 118", fill: "none", stroke: "var(--dsw-alias-border-l2)", strokeWidth: 10, strokeLinecap: "round" }),
    valid && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "path",
      {
        d: "M 22 118 A 88 88 0 0 1 198 118",
        fill: "none",
        stroke: "var(--dsw-alias-state-business-primary)",
        strokeWidth: 10,
        strokeLinecap: "round",
        strokeDasharray: `${ARC} ${ARC}`,
        strokeDashoffset: ARC * (1 - p / 100),
        style: { transition: "stroke-dashoffset .45s cubic-bezier(.2,.8,.2,1)" }
      }
    ),
    valid && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "circle",
      {
        cx: knobX,
        cy: knobY,
        r: 6,
        fill: "var(--dsw-alias-bg-module-platform)",
        stroke: "var(--dsw-alias-state-business-primary)",
        strokeWidth: 3,
        style: { transition: "cx .45s cubic-bezier(.2,.8,.2,1), cy .45s cubic-bezier(.2,.8,.2,1)" }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("text", { x: 110, y: 100, textAnchor: "middle", fontSize: 30, fontWeight: 600, fontFamily: MONO2, fill: "var(--dsw-alias-label-primary)", children: valid ? `${p.toFixed(p >= 10 ? 1 : 2)}%` : "\u2014" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("text", { x: 110, y: 122, textAnchor: "middle", fontSize: 12, fill: "var(--dsw-alias-label-secondary)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("text", { x: 20, y: 134, textAnchor: "middle", fontSize: 10, fill: "var(--dsw-alias-label-tertiary)", children: "0" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("text", { x: 200, y: 134, textAnchor: "middle", fontSize: 10, fill: "var(--dsw-alias-label-tertiary)", children: "100" })
  ] }) });
}

// src/client/usage/dashboard/charts/ShareColumns.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function ShareColumns({ rows, total, height = 170, max = 3 }) {
  const palette = providerPalette();
  const visible = rows.slice(0, max);
  const sum = total > 0 ? total : visible.reduce((a, r) => a + r.value, 0);
  const top = visible[0]?.value ?? 1;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", alignItems: "flex-end", gap: 10, height, minWidth: 0 }, children: [
    visible.map((row, i) => {
      const share = sum > 0 ? row.value / sum : 0;
      const h = Math.max(0.18, top > 0 ? row.value / top : 0);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { title: `${row.label} \xB7 ${formatUnits(row.value)}`, style: {
          height: `${Math.round(h * (height - 34))}px`,
          borderRadius: 12,
          background: `color-mix(in srgb, ${palette[i % palette.length]} ${i === 0 ? 100 : 55 - i * 12}%, transparent)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 8,
          transition: "height .45s cubic-bezier(.2,.8,.2,1)"
        }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { style: {
          padding: "1px 7px",
          borderRadius: 10,
          fontSize: 11,
          lineHeight: "16px",
          fontFamily: MONO2,
          background: "var(--dsw-alias-bg-overlay)",
          color: "var(--dsw-alias-label-primary)"
        }, children: [
          Math.round(share * 100),
          "%"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { fontSize: 11, lineHeight: "16px", textAlign: "center", color: "var(--dsw-alias-label-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: row.label, children: row.label })
      ] }, row.label);
    }),
    visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { flex: 1, textAlign: "center", fontSize: 12, color: "var(--dsw-alias-label-tertiary)" }, children: "\u6682\u65E0\u6570\u636E" })
  ] });
}

// src/client/usage/dashboard/primitives/ErrorCard.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function ErrorCard({ message, onRetry }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { style: { border: "1px solid var(--dsw-alias-state-error-primary)", borderRadius: 12, padding: 20, color: "var(--dsw-alias-state-error-primary)", fontSize: 13, display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { children: [
      "\u26A0 ",
      message
    ] }),
    onRetry && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", onClick: onRetry, style: { marginLeft: "auto", border: "1px solid currentColor", borderRadius: 6, padding: "4px 12px", background: "transparent", color: "inherit", cursor: "pointer", fontSize: 12 }, children: "\u91CD\u8BD5" })
  ] });
}

// src/client/usage/dashboard/primitives/EmptyState.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function EmptyState({ title, hint, action }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { style: { border: "1px dashed var(--dsw-alias-border-l2)", borderRadius: 12, padding: 40, textAlign: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { style: { fontSize: 13, color: "var(--dsw-alias-label-primary)" }, children: title }),
    hint && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)", marginTop: 6 }, children: hint }),
    action && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { style: { marginTop: 12 }, children: action })
  ] });
}

// src/client/responsive.ts
var import_react14 = require("react");
var MOBILE_BREAKPOINT = 768;
var MOBILE_MQ = `(max-width: ${MOBILE_BREAKPOINT - 0.02}px)`;
function isMobileViewport() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}
function useIsMobile() {
  const [mobile, setMobile] = (0, import_react14.useState)(() => isMobileViewport());
  (0, import_react14.useEffect)(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(MOBILE_MQ);
    const onChange = (event) => {
      setMobile(event.matches);
    };
    setMobile(mql.matches);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => {
        mql.removeEventListener("change", onChange);
      };
    }
    if (typeof mql.addListener === "function") {
      mql.addListener(onChange);
      return () => {
        mql.removeListener(onChange);
      };
    }
    return void 0;
  }, []);
  return mobile;
}

// src/client/usage/dashboard/TrendTab.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var MONO3 = "ui-monospace, SFMono-Regular, Menlo, monospace";
var rowCard = {
  border: "1px solid var(--dsw-alias-border-l2)",
  borderRadius: 12,
  padding: "12px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 0
};
function CardHead({ name, meta }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 14, lineHeight: "22px", fontWeight: 500, color: "var(--dsw-alias-label-primary)" }, children: name }),
    meta !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { marginLeft: "auto", fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: meta })
  ] });
}
var editorFace = {
  borderRadius: 12,
  background: "var(--dsw-alias-bg-module-platform)",
  padding: "14px 16px"
};
function Stat({ label, value, exact, sub, delta, first }) {
  const deltaView = delta === void 0 || delta === null ? null : delta > 0 ? { text: `\u2191${delta >= 10 ? Math.round(delta) : delta.toFixed(1)}%`, color: "var(--dsw-alias-state-success-primary)" } : delta < 0 ? { text: `\u2193${Math.abs(delta) >= 10 ? Math.round(Math.abs(delta)) : Math.abs(delta).toFixed(1)}%`, color: "var(--dsw-alias-state-error-primary)" } : { text: "\u6301\u5E73", color: "var(--dsw-alias-label-tertiary)" };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
    minWidth: 0,
    paddingLeft: first ? 0 : 16,
    borderLeft: first ? void 0 : "1px solid var(--dsw-alias-border-l2)",
    display: "flex",
    flexDirection: "column",
    gap: 2
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-secondary)", whiteSpace: "nowrap" }, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { style: { display: "flex", alignItems: "baseline", gap: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 20, lineHeight: "28px", fontWeight: 600, fontFamily: MONO3, color: "var(--dsw-alias-label-primary)", whiteSpace: "nowrap" }, children: value }),
      deltaView !== null && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 11, fontFamily: MONO3, color: deltaView.color }, children: deltaView.text })
    ] }),
    (exact !== void 0 || sub !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)", fontFamily: exact !== void 0 ? MONO3 : void 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: exact ?? sub })
  ] });
}
var GRAIN_NAME = { hour: "\u6309\u5C0F\u65F6", day: "\u6309\u65E5", week: "\u6309\u5468", month: "\u6309\u6708" };
function useNarrow() {
  const [narrow, setNarrow] = (0, import_react15.useState)(() => window.matchMedia("(max-width: 1150px)").matches);
  (0, import_react15.useEffect)(() => {
    const mql = window.matchMedia("(max-width: 1150px)");
    const onChange = (e) => {
      setNarrow(e.matches);
    };
    setNarrow(mql.matches);
    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);
  return narrow;
}
function deltaBadge(delta) {
  if (delta === null) return null;
  if (delta > 0) return { text: `\u2191${delta >= 10 ? Math.round(delta) : delta.toFixed(1)}%`, color: "var(--dsw-alias-state-success-primary)" };
  if (delta < 0) return { text: `\u2193${Math.abs(delta) >= 10 ? Math.round(Math.abs(delta)) : Math.abs(delta).toFixed(1)}%`, color: "var(--dsw-alias-state-error-primary)" };
  return { text: "\u6301\u5E73", color: "var(--dsw-alias-label-tertiary)" };
}
function todayText(now = /* @__PURE__ */ new Date()) {
  const week = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"][now.getDay()];
  return `${now.getFullYear()} \u5E74 ${now.getMonth() + 1} \u6708 ${now.getDate()} \u65E5 \xB7 \u661F\u671F${week}`;
}
function TrendTab({ range, rangeLabel, onJumpAccounts, onJumpSignal, refreshTick }) {
  const [usage, setUsage] = (0, import_react15.useState)(null);
  const [hours, setHours] = (0, import_react15.useState)([]);
  const [providers, setProviders] = (0, import_react15.useState)([]);
  const [error, setError] = (0, import_react15.useState)(null);
  const [retryTick, setRetryTick] = (0, import_react15.useState)(0);
  const isMobile = useIsMobile();
  const narrow = useNarrow();
  const compact = isMobile || narrow;
  (0, import_react15.useEffect)(() => {
    let alive = true;
    setError(null);
    Promise.all([usageApi.usage(), usageApi.providers()]).then(([u, p]) => {
      if (!alive) return;
      if (u.ok !== true) throw new Error("\u7528\u91CF\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      if (p.ok !== true) throw new Error("\u4F9B\u5E94\u5546\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      setUsage(u.days);
      setHours(u.hours ?? []);
      setProviders(p.providers ?? []);
    }).catch((e) => {
      if (alive) setError(e instanceof Error ? e.message : String(e));
    });
    return () => {
      alive = false;
    };
  }, [refreshTick, retryTick]);
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ErrorCard, { message: error, onRetry: () => setRetryTick((t) => t + 1) });
  }
  if (usage === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { padding: "24px 0", textAlign: "center", fontSize: 13, color: "var(--dsw-alias-label-tertiary)" }, children: "\u52A0\u8F7D\u4E2D\u2026" });
  }
  const filtered = filterDays(usage, range);
  const previous = filterDays(usage, prevRange(range));
  const sum = sumTokens(filtered);
  const prevSum = sumTokens(previous);
  const hitRate = averageCacheHitRate(filtered);
  const avg = dailyAverage(filtered);
  const activity = sumActivity(filtered);
  const grain = pickGrain(range);
  const series = grain === "hour" ? aggregateHourSeries(hours, range) : aggregateSeries(filtered, grain);
  const showTrend = series.length >= 1;
  const rank = modelRank(filtered);
  const anomalyMap = (() => {
    if (grain !== "day" || filtered.length === 0) return null;
    const actives = filtered.map((d) => d.tokens ?? 0).filter((v) => v > 0).sort((a, b) => a - b);
    if (actives.length === 0) return null;
    const mid = Math.floor(actives.length / 2);
    const median = actives.length % 2 === 1 ? actives[mid] : (actives[mid - 1] + actives[mid]) / 2;
    if (!(median > 0)) return null;
    const map = /* @__PURE__ */ new Map();
    for (const d of filtered) {
      const tokens = d.tokens ?? 0;
      if (tokens > median * 3) map.set(d.date, { multiple: tokens / median, tokens });
    }
    return map.size > 0 ? map : null;
  })();
  const share = providerShare(filtered);
  const palette = providerPalette();
  const alerts = providers.filter((p) => p.alert && (p.alert.level === "critical" || p.alert.level === "warning")).sort((a, b) => (a.alert.level === "critical" ? -1 : 1) - (b.alert.level === "critical" ? -1 : 1));
  const emptyHint = (title) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(EmptyState, { title, hint: "\u53BB\u804A\u4E24\u53E5\u5C31\u4F1A\u5728\u8FD9\u91CC\u51FA\u73B0\u6570\u636E" });
  const yi = formatYiExact(sum.total);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 10, minHeight: "100%", minWidth: 0, flexShrink: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
      ...surface,
      flex: "none",
      padding: compact ? 16 : "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 20,
      flexWrap: "wrap",
      // 品牌蓝极淡渐晕：色值由 token 派生，浅/深主题都安全。
      backgroundImage: "radial-gradient(120% 160% at 100% 0%, color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent) 0%, transparent 62%)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { style: { fontSize: 24, lineHeight: "32px", fontWeight: 600, color: "var(--dsw-alias-label-primary)" }, children: [
            rangeLabel,
            "\u7528\u91CF\u603B\u89C8"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: todayText() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
          display: "grid",
          gridTemplateColumns: compact ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
          gap: 12
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HeroStat, { icon: icons.tokens, value: yi?.yi ?? formatUnits(sum.total), label: "\u603B Tokens", delta: deltaBadge(deltaPercent(sum.total, prevSum.total)) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HeroStat, { icon: icons.input, value: formatUnits(sum.input), label: "\u8F93\u5165", delta: deltaBadge(deltaPercent(sum.input, prevSum.input)) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HeroStat, { icon: icons.output, value: formatUnits(sum.output), label: "\u8F93\u51FA", delta: deltaBadge(deltaPercent(sum.output, prevSum.output)) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HeroStat, { icon: icons.requests, value: formatUnits(activity.requests), label: "\u8C03\u7528\u6B21\u6570" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { style: { fontSize: 11, lineHeight: "16px", fontFamily: MONO3, color: "var(--dsw-alias-label-tertiary)" }, children: [
          "\u7CBE\u786E\u5408\u8BA1 ",
          yi?.exact ?? formatExact(sum.total)
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Gauge, { percent: filtered.length > 0 ? hitRate : null, label: "\u7F13\u5B58\u547D\u4E2D\u7387", size: compact ? 170 : 200 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
      flex: "1 1 auto",
      minHeight: 0,
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "minmax(0, 2.2fr) minmax(260px, 1fr)",
      gap: 10,
      alignItems: "stretch"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { ...panel(16, 12), minHeight: 260 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          PanelHead,
          {
            title: showTrend ? "\u7528\u91CF\u8D8B\u52BF" : "\u6A21\u578B\u6D88\u8017\u6392\u884C",
            meta: showTrend ? `${rangeLabel} \xB7 ${GRAIN_NAME[grain]}${anomalyMap !== null ? ` \xB7 ${anomalyMap.size} \u4E2A\u5F02\u5E38\u65E5` : ""}` : rangeLabel
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }, children: showTrend ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(BarChart, { data: series, anomalies: anomalyMap ?? void 0, onSelectAnomaly: anomalyMap !== null && onJumpSignal !== void 0 ? () => onJumpSignal() : void 0 }) : emptyHint(`${rangeLabel}\u6682\u65E0\u53EF\u7ED8\u5236\u7684\u8D8B\u52BF\u6570\u636E`) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { ...panel(16, 12), flex: "none" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PanelHead, { title: "\u4F9B\u5E94\u5546\u5360\u6BD4", meta: `Top ${Math.min(3, share.length)}` }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ShareColumns, { rows: share.map((s) => ({ label: s.provider, value: s.tokens })), total: sum.total, height: compact ? 150 : 176 }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
            share.slice(0, 4).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, lineHeight: "18px", minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { width: 8, height: 8, borderRadius: 2, flex: "none", background: palette[i % palette.length] } }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--dsw-alias-label-primary)" }, title: s.provider, children: s.provider }),
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { marginLeft: "auto", flex: "none", fontFamily: MONO3, color: "var(--dsw-alias-label-secondary)" }, children: formatUnits(s.tokens) })
            ] }, s.provider)),
            share.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: [
              rangeLabel,
              "\u6682\u65E0\u7528\u91CF"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { ...panel(16, 10), flex: "1 1 auto", minHeight: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PanelHead, { title: "\u4F9B\u5E94\u5546\u544A\u8B66", meta: alerts.length > 0 ? `${alerts.length} \u6761` : "\u5168\u90E8\u6B63\u5E38" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }, children: alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: "\u5168\u90E8\u4F9B\u5E94\u5546\u72B6\u6001\u6B63\u5E38\u3002" }) : alerts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
            borderTop: i === 0 ? void 0 : "1px solid var(--dsw-alias-border-l1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { width: 8, height: 8, borderRadius: 4, flex: "none", background: p.alert.level === "critical" ? "var(--dsw-alias-state-error-primary)" : "var(--dsw-alias-state-warn-primary)" } }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 13, lineHeight: "20px", color: "var(--dsw-alias-label-primary)" }, children: p.displayName }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: { marginLeft: "auto", flex: "none", fontSize: 12, lineHeight: "18px", fontFamily: MONO3, color: "var(--dsw-alias-label-secondary)" }, children: p.alert.metric === "remaining-percent" ? `\u5269\u4F59 ${p.alert.value ?? 0}%` : `${p.alert.value ?? ""}` })
          ] }, p.id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("button", { type: "button", onClick: onJumpAccounts, style: {
            flex: "none",
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            lineHeight: "18px",
            color: "var(--dsw-alias-label-secondary)"
          }, children: [
            "\u67E5\u770B\u4F59\u989D/\u914D\u989D",
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M7 17 17 7M9 7h8v8" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: {
      flex: "none",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 10
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Tile, { label: "\u65E5\u5747 Tokens", value: formatUnits(avg), sub: `${filtered.length} \u5929\u6709\u6570\u636E` }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Tile, { label: "\u5DE5\u4F5C\u65F6\u957F", value: formatWorkDuration(activity.workMs), sub: filtered.length > 0 ? `\u65E5\u5747 ${formatWorkDuration(activity.workMs / filtered.length)}` : void 0 }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Tile, { label: "\u7F13\u5B58\u91CF", value: formatUnits(sum.cache), sub: `\u547D\u4E2D\u7387 ${formatHitRate(hitRate)}`, tone: "muted" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Tile, { label: "\u6D3B\u8DC3\u6A21\u578B", value: String(rank.length), sub: rank[0] !== void 0 ? `Top ${rank[0].label}` : void 0, tone: "success" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        Tile,
        {
          label: "\u5F02\u5E38\u65E5",
          value: String(anomalyMap?.size ?? 0),
          sub: anomalyMap !== null ? "\u9AD8\u4E8E\u6D3B\u8DC3\u65E5\u4E2D\u4F4D\u6570 3 \u500D" : "\u65E0\u5F02\u5E38",
          tone: anomalyMap !== null ? "error" : "muted",
          action: onJumpSignal !== void 0 ? "\u67E5\u770B\u4FE1\u53F7" : void 0,
          onAction: onJumpSignal
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { ...panel(16, 12), flex: "none" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PanelHead, { title: "\u6A21\u578B\u6D88\u8017\u6392\u884C", meta: `${rangeLabel} \xB7 Top ${Math.min(10, rank.length)}` }),
      rank.length === 0 ? emptyHint(`${rangeLabel}\u6682\u65E0\u7528\u91CF`) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(RankBars, { rows: rank, nameWidth: compact ? 140 : 220 })
    ] })
  ] });
}

// src/client/usage/dashboard/UsageTab.tsx
var import_react18 = require("react");

// src/client/usage/dashboard/charts/Heatmap.tsx
var import_react16 = require("react");
var import_react_dom5 = require("react-dom");
var import_jsx_runtime18 = require("react/jsx-runtime");
var GAP = 6;
var TIP_GAP = 8;
function Heatmap({ cells, onSelect, rows = 5, cellText = "value" }) {
  const [hover, setHover] = (0, import_react16.useState)(null);
  const levels = (v) => {
    if (v <= 0) return 0;
    if (v < 100) return 1;
    if (v < 1e3) return 2;
    if (v < 1e4) return 3;
    if (v < 1e5) return 4;
    if (v < 1e6) return 5;
    if (v < 1e7) return 6;
    if (v < 1e8) return 7;
    if (v < 1e9) return 8;
    return 9;
  };
  const colors = [
    "var(--dsw-alias-border-l2)",
    "#12314f",
    "#19466f",
    "#215d94",
    "#2a75b8",
    "#398dda",
    "#4f8cff",
    "#6fa0ff",
    "#8d7bff",
    "#ad66ff"
  ];
  const cols = Math.max(1, Math.ceil(cells.length / rows));
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: GAP, width: "100%" }, children: cells.map((c) => {
      const idx = Math.min(9, levels(c.value));
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "div",
        {
          onMouseEnter: (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setHover({ cell: c, left: r.left, top: r.top });
          },
          onMouseLeave: () => setHover(null),
          onClick: () => onSelect?.(c),
          style: { aspectRatio: "1", minWidth: 0, borderRadius: 6, background: colors[idx], cursor: onSelect ? "pointer" : "default", opacity: c.value > 0 ? 1 : 0.35, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, minWidth: 0 }, children: [
            (cellText === "label" || cellText === "both") && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { fontSize: 9, lineHeight: "11px", fontWeight: 600, color: "rgba(255,255,255,0.9)", textShadow: "0 1px 2px rgba(0,0,0,.4)", whiteSpace: "nowrap" }, children: c.short ?? c.label }),
            (cellText === "value" || cellText === "both") && c.value > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { style: { fontSize: 10, lineHeight: "12px", fontWeight: 600, color: "rgba(255,255,255,0.94)", textShadow: "0 1px 2px rgba(0,0,0,.35)", whiteSpace: "nowrap" }, children: formatUnits(c.value) })
          ] })
        },
        c.key
      );
    }) }),
    hover !== null && typeof document !== "undefined" && (0, import_react_dom5.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { style: { position: "fixed", bottom: typeof window !== "undefined" ? window.innerHeight - hover.top + TIP_GAP : 0, left: hover.left, background: "var(--dsw-alias-bg-layer-3)", border: "1px solid var(--dsw-alias-border-l1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, whiteSpace: "nowrap", zIndex: 6100, boxShadow: "0 8px 24px rgba(0,0,0,.35)", pointerEvents: "none" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { style: { fontWeight: 600, marginBottom: 2, color: "var(--dsw-alias-label-primary)" }, children: hover.cell.label }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { style: { color: "var(--dsw-alias-label-secondary)" }, children: [
          "\u5408\u8BA1 ",
          hover.cell.value > 0 ? formatUnits(hover.cell.value) : "\u65E0\u7528\u91CF"
        ] }),
        hover.cell.input !== void 0 && (hover.cell.input ?? 0) + (hover.cell.output ?? 0) + (hover.cell.cache ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { style: { marginTop: 4, display: "flex", flexDirection: "column", gap: 2, color: "var(--dsw-alias-label-secondary)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { children: [
            "\u8F93\u5165 ",
            formatUnits(hover.cell.input ?? 0),
            " \xB7 \u8F93\u51FA ",
            formatUnits(hover.cell.output ?? 0)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { children: [
            "\u7F13\u5B58 ",
            formatUnits(hover.cell.cache ?? 0),
            hover.cell.hitRate !== void 0 ? ` \xB7 \u547D\u4E2D ${formatHitRate(hover.cell.hitRate)}` : ""
          ] })
        ] })
      ] }),
      document.body
    )
  ] });
}

// src/client/usage/dashboard/ActivityGrid.tsx
var import_react17 = require("react");
var import_react_dom6 = require("react-dom");
var import_jsx_runtime19 = require("react/jsx-runtime");
var ACTIVITY_COLUMNS = 52;
var CELL = 20;
var GAP2 = 3;
var RADIUS = 4;
var TIP_GAP2 = 8;
var BLUE = [31, 111, 235];
var STYLE_ID6 = "dsh-activity-styles";
var SHEET5 = `
@keyframes dsh-activity-cell-in {
  from { opacity: 0; transform: translate3d(0, 4px, 0) scale(0.7); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
.dsh-activity-cell {
  border: 0;
  border-radius: ${RADIUS}px;
  width: ${CELL}px;
  height: ${CELL}px;
  flex: none;
  padding: 0;
  cursor: default;
  opacity: 0;
  animation: dsh-activity-cell-in 320ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 140ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-activity-cell[data-clickable="true"] { cursor: pointer; }
.dsh-activity-cell[data-clickable="true"]:hover {
  z-index: 2;
  transform: scale(1.35);
  box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary), 0 6px 14px color-mix(in srgb, var(--dsw-alias-state-business-primary) 38%, transparent);
}
.dsh-activity-cell[data-today="true"] { box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary); }
.dsh-activity-cell[data-selected="true"] { box-shadow: 0 0 0 1px var(--dsw-alias-label-primary), 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-business-primary) 26%, transparent); }
.dsh-activity-tabs {
  position: relative;
  flex: none;
  width: 150px;
  display: flex;
  padding: 3px;
  border-radius: 10px;
  background: var(--dsw-alias-fill-l2);
}
.dsh-activity-ind {
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 3px;
  width: calc((100% - 6px) / 3);
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-2);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
  transform: translateX(calc(var(--dsh-activity-ind, 0) * 100%));
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-activity-tab {
  flex: 1 1 0;
  min-width: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  padding: 0 2px;
  font-family: inherit;
  font-size: 12px;
  line-height: 22px;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  transition: color 220ms cubic-bezier(0.2, 0.8, 0.2, 1), font-weight 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-activity-tab:hover { color: var(--dsw-alias-label-secondary); }
.dsh-activity-tab[data-active="true"] { color: var(--dsw-alias-label-primary); font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .dsh-activity-cell { animation: none; opacity: 1; }
  .dsh-activity-cell[data-clickable="true"]:hover { transform: none; }
  .dsh-activity-ind { transition: none; }
}
`;
function ensureActivityStyles() {
  if (typeof document === "undefined") return () => {
  };
  let tag = document.getElementById(STYLE_ID6);
  if (tag === null) {
    tag = document.createElement("style");
    tag.id = STYLE_ID6;
    tag.dataset.plugin = "dsh-triad";
    tag.textContent = SHEET5;
    document.head.appendChild(tag);
  }
  return () => {
    tag?.remove();
  };
}
function shiftDayKey(key, delta) {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, (d ?? 1) + delta);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function weekdayIndex(key) {
  const [y, m, d] = key.split("-").map(Number);
  return (new Date(y, (m ?? 1) - 1, d ?? 1).getDay() + 6) % 7;
}
function buildActivityGrid(days, mode, today = /* @__PURE__ */ new Date()) {
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const dayMap = /* @__PURE__ */ new Map();
  if (Array.isArray(days)) {
    for (const day of days) {
      if (day !== null && typeof day === "object" && typeof day.date === "string") dayMap.set(day.date, day);
    }
  }
  const columns = ACTIVITY_COLUMNS;
  const totalDays = columns * 7;
  const firstKey = shiftDayKey(todayKey, -((columns - 1) * 7 + weekdayIndex(todayKey)));
  const endKey = shiftDayKey(firstKey, totalDays - 1);
  const buckets = new Array(totalDays);
  const indexByKey = /* @__PURE__ */ new Map();
  for (let i = 0; i < totalDays; i += 1) {
    const key = shiftDayKey(firstKey, i);
    indexByKey.set(key, i);
    buckets[i] = { key, tokens: 0, requests: 0, cumulative: 0, active: false };
  }
  let running = 0;
  let firstRecorded = null;
  for (const key of [...dayMap.keys()].sort()) {
    if (firstRecorded === null) firstRecorded = key;
    const entry = dayMap.get(key);
    const tokens = entry.tokens ?? 0;
    running += tokens;
    const index = indexByKey.get(key);
    if (index === void 0) continue;
    buckets[index].tokens = tokens;
    buckets[index].requests = entry.requests ?? 0;
    buckets[index].cumulative = running;
    buckets[index].active = tokens > 0;
  }
  const weekTokens = new Array(columns).fill(0);
  const weekRequests = new Array(columns).fill(0);
  for (let c = 0; c < columns; c += 1) {
    let t = 0;
    let r = 0;
    for (let i = 0; i < 7; i += 1) {
      t += buckets[c * 7 + i].tokens;
      r += buckets[c * 7 + i].requests;
    }
    weekTokens[c] = t;
    weekRequests[c] = r;
  }
  const cells = [];
  const rows = Array.from({ length: 7 }, () => []);
  let max = 0;
  let total = 0;
  let activeDays = 0;
  let peakDay = null;
  let peakTokens = 0;
  for (let i = 0; i < totalDays; i += 1) {
    const bucket = buckets[i];
    const column = Math.floor(i / 7);
    const value = mode === "week" ? weekTokens[column] : mode === "cumulative" ? bucket.cumulative : bucket.tokens;
    const cell = {
      key: bucket.key,
      column,
      row: i % 7,
      tokens: value,
      dayTokens: bucket.tokens,
      weekTokens: weekTokens[column],
      requests: bucket.requests,
      weekRequests: weekRequests[column],
      hitRate: bucket.active ? dayMap.get(bucket.key)?.cacheHitRate ?? null : null,
      isToday: bucket.key === todayKey,
      past: bucket.key <= todayKey
    };
    cells.push(cell);
    rows[i % 7].push(cell);
    total += bucket.tokens;
    if (bucket.active) activeDays += 1;
    if (bucket.tokens > peakTokens) {
      peakTokens = bucket.tokens;
      peakDay = bucket.key;
    }
    if (value > max) max = value;
  }
  return {
    mode,
    columns,
    cells,
    rows,
    max,
    total,
    activeDays,
    peakDay: activeDays > 0 ? peakDay : null,
    peakTokens,
    startKey: firstKey,
    endKey,
    firstRecorded
  };
}
function activityColor(tokens, max) {
  if (!(tokens > 0)) return "color-mix(in srgb, var(--dsw-alias-border-l2) 55%, transparent)";
  const ratio = max > 0 ? Math.sqrt(Math.min(1, tokens / max)) : 1;
  const alpha = Math.min(1, 0.25 + 0.75 * ratio);
  return `rgba(${BLUE[0]}, ${BLUE[1]}, ${BLUE[2]}, ${alpha.toFixed(3)})`;
}
var MODES = [
  { id: "day", index: 0, label: "\u6BCF\u65E5" },
  { id: "week", index: 1, label: "\u6BCF\u5468" },
  { id: "cumulative", index: 2, label: "\u7D2F\u8BA1" }
];
function ActivityGrid({ days, mode, onMode, selectedKey, onSelect }) {
  const [hover, setHover] = (0, import_react17.useState)(null);
  const snapshot = (0, import_react17.useMemo)(() => buildActivityGrid(days, mode), [days, mode]);
  (0, import_react17.useEffect)(() => ensureActivityStyles(), []);
  const peak = snapshot.peakDay === null ? "" : `${snapshot.peakDay.slice(5).replace("-", " / ")} ${formatUnits(snapshot.peakTokens)}`;
  const summary = snapshot.activeDays === 0 ? "\u6682\u65E0\u8BB0\u5F55" : `${snapshot.activeDays} \u6D3B\u8DC3\u5929 \xB7 \u5CF0\u503C ${peak}`;
  const legendSteps = [0.3, 0.5, 0.68, 0.85, 1];
  const tooltipBody = (cell) => {
    if (mode === "week") {
      const start = shiftDayKey(cell.key, -cell.row);
      const end = shiftDayKey(cell.key, 6 - cell.row);
      return `${start} \uFF5E ${end} \xB7 \u5408\u8BA1 ${formatUnits(cell.tokens)} \xB7 ${cell.weekRequests} \u6B21\u8BF7\u6C42`;
    }
    if (mode === "cumulative") {
      const from = snapshot.firstRecorded ?? snapshot.startKey;
      return `${from} \u2192 ${cell.key} \u7D2F\u8BA1 ${formatUnits(cell.tokens)}`;
    }
    const hit = cell.hitRate === null ? "" : ` \xB7 \u547D\u4E2D ${formatHitRate(cell.hitRate)}`;
    return `${cell.key} \xB7 \u5408\u8BA1 ${formatUnits(cell.dayTokens)} \xB7 ${cell.requests} \u6B21\u8BF7\u6C42${hit}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: { fontSize: 14, lineHeight: "22px", fontWeight: 500, color: "var(--dsw-alias-label-primary)" }, children: "Token \u6D3B\u52A8" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)", fontVariantNumeric: "tabular-nums" }, children: summary }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
        "span",
        {
          className: "dsh-activity-tabs",
          role: "group",
          "aria-label": "Token \u6D3B\u52A8\u53E3\u5F84",
          style: { "--dsh-activity-ind": String(MODES.find((m) => m.id === mode)?.index ?? 0) },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "dsh-activity-ind", "aria-hidden": "true" }),
            MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
              "button",
              {
                type: "button",
                className: "dsh-activity-tab",
                "data-active": m.id === mode,
                "aria-pressed": m.id === mode,
                onClick: () => onMode(m.id),
                children: m.label
              },
              m.id
            ))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { style: { overflowX: "auto", marginTop: 12, paddingBottom: 2 }, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { style: { width: "max-content", margin: "0 auto", display: "flex", flexDirection: "column", gap: GAP2 }, children: snapshot.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { style: { display: "flex", gap: GAP2 }, children: row.map((cell) => {
      if (!cell.past) {
        return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          "span",
          {
            className: "dsh-activity-cell",
            "data-clickable": "false",
            "data-past": "false",
            "aria-hidden": "true",
            style: {
              background: "color-mix(in srgb, var(--dsw-alias-border-l2) 30%, transparent)",
              animationDelay: `${cell.column * 6}ms`
            }
          },
          cell.key
        );
      }
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "button",
        {
          type: "button",
          className: "dsh-activity-cell",
          "data-clickable": "true",
          "data-past": "true",
          "data-today": cell.isToday,
          "data-selected": selectedKey === cell.key,
          "aria-label": `${cell.key} \xB7 ${formatUnits(cell.tokens)}`,
          "aria-pressed": selectedKey === cell.key,
          onClick: () => onSelect(cell.key),
          onMouseEnter: (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setHover({ cell, left: r.left, top: r.top });
          },
          onMouseLeave: () => setHover(null),
          style: {
            background: activityColor(cell.tokens, snapshot.max),
            animationDelay: `${cell.column * 6}ms`
          }
        },
        cell.key
      );
    }) }, rowIndex)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: "\u5C11" }),
      legendSteps.map((alpha, i) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { style: { width: 10, height: 10, borderRadius: 2, background: `rgba(${BLUE[0]}, ${BLUE[1]}, ${BLUE[2]}, ${alpha})` } }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: "\u591A" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { style: { marginLeft: "auto", fontVariantNumeric: "tabular-nums" }, children: [
        snapshot.startKey,
        " ~ ",
        snapshot.endKey
      ] })
    ] }),
    hover !== null && typeof document !== "undefined" && (0, import_react_dom6.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { style: {
        position: "fixed",
        bottom: typeof window !== "undefined" ? window.innerHeight - hover.top + TIP_GAP2 : 0,
        left: hover.left,
        background: "var(--dsw-alias-bg-layer-3)",
        border: "1px solid var(--dsw-alias-border-l1)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        lineHeight: "18px",
        whiteSpace: "nowrap",
        zIndex: 6100,
        boxShadow: "0 8px 24px rgba(0,0,0,.35)",
        pointerEvents: "none",
        color: "var(--dsw-alias-label-secondary)"
      }, children: tooltipBody(hover.cell) }),
      document.body
    )
  ] });
}

// src/client/usage/dashboard/UsageTab.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var MONO4 = "ui-monospace, SFMono-Regular, Menlo, monospace";
var STYLE_ID7 = "dsh-usage-search-styles";
var SHEET6 = `
@keyframes dsh-usage-row-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.dsh-usage-row-in { animation: dsh-usage-row-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
.dsh-usage-search:focus {
  border-color: var(--dsw-alias-state-business-primary) !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 22%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .dsh-usage-row-in { animation: none; }
}
`;
function ensureSearchStyle() {
  if (typeof document === "undefined") return () => {
  };
  let tag = document.getElementById(STYLE_ID7);
  if (tag === null) {
    tag = document.createElement("style");
    tag.id = STYLE_ID7;
    tag.dataset.plugin = "dsh-triad";
    tag.textContent = SHEET6;
    document.head.appendChild(tag);
  }
  return () => {
    tag?.remove();
  };
}
var rowCard2 = {
  border: "1px solid var(--dsw-alias-border-l2)",
  borderRadius: 12,
  padding: "12px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 0
};
function CardHead2({ name, meta }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: { fontSize: 14, lineHeight: "22px", fontWeight: 500, color: "var(--dsw-alias-label-primary)" }, children: name }),
    meta !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: { marginLeft: "auto", fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: meta })
  ] });
}
var thStyle = {
  textAlign: "left",
  padding: "6px 8px",
  fontSize: 12,
  lineHeight: "18px",
  fontWeight: 500,
  color: "var(--dsw-alias-label-secondary)",
  borderBottom: "1px solid var(--dsw-alias-border-l2)",
  whiteSpace: "nowrap"
};
var tdStyle = {
  padding: "6px 8px",
  fontSize: 13,
  lineHeight: "20px",
  color: "var(--dsw-alias-label-primary)"
};
var tdMono = { ...tdStyle, fontFamily: MONO4 };
function buildDetailRows(days, query) {
  const q = query.trim().toLowerCase();
  if (q === "") {
    return days.map((d) => {
      const s = sumTokens([d]);
      return {
        key: d.date,
        date: d.date,
        input: s.input,
        output: s.output,
        cache: s.cache,
        total: s.total,
        hitRate: d.cacheHitRate ?? null
      };
    });
  }
  const rows = [];
  for (const d of days) {
    for (const m of d.models ?? []) {
      const { provider, model } = splitModelKey(m.model);
      if (!provider.toLowerCase().includes(q) && !model.toLowerCase().includes(q)) continue;
      const input = m.inputTokens ?? 0;
      const cacheRead = m.cacheReadTokens ?? 0;
      const cacheWrite = m.cacheWriteTokens ?? 0;
      const prompt = input + cacheRead + cacheWrite;
      rows.push({
        key: `${d.date}:${m.model}`,
        date: d.date,
        model: m.model,
        input,
        output: m.outputTokens ?? 0,
        cache: cacheRead + cacheWrite,
        total: m.tokens ?? 0,
        hitRate: prompt > 0 ? cacheRead / prompt * 100 : null
      });
    }
  }
  return rows;
}
function UsageTab({ range, rangeLabel, refreshTick }) {
  const [usage, setUsage] = (0, import_react18.useState)(null);
  const [selectedDay, setSelectedDay] = (0, import_react18.useState)(null);
  const [activityMode, setActivityMode] = (0, import_react18.useState)("day");
  const [query, setQuery] = (0, import_react18.useState)("");
  const [error, setError] = (0, import_react18.useState)(null);
  const [retryTick, setRetryTick] = (0, import_react18.useState)(0);
  const isMobile = useIsMobile();
  (0, import_react18.useEffect)(() => {
    let alive = true;
    setError(null);
    usageApi.usage().then((p) => {
      if (!alive) return;
      if (p.ok !== true) throw new Error("\u7528\u91CF\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      setUsage(p.days);
    }).catch((e) => {
      if (alive) setError(e instanceof Error ? e.message : String(e));
    });
    return () => {
      alive = false;
    };
  }, [refreshTick, retryTick]);
  (0, import_react18.useEffect)(() => ensureSearchStyle(), []);
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ErrorCard, { message: error, onRetry: () => setRetryTick((t) => t + 1) });
  }
  if (usage === null) return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { padding: "24px 0", textAlign: "center", fontSize: 13, color: "var(--dsw-alias-label-tertiary)" }, children: "\u52A0\u8F7D\u4E2D\u2026" });
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthPrefix = `${year}-${String(month).padStart(2, "0")}`;
  const filtered = filterDays(usage, range);
  const filteredSorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  const modelRankData = modelRank(filtered);
  const detailRows = buildDetailRows(filteredSorted, query);
  const searching = query.trim() !== "";
  const monthDays = usage.filter((d) => d.date.startsWith(monthPrefix));
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthCells = Array.from({ length: daysInMonth }, (_, i) => {
    const dateStr = `${monthPrefix}-${String(i + 1).padStart(2, "0")}`;
    const hit = monthDays.find((d) => d.date === dateStr);
    return {
      key: dateStr,
      label: dateStr,
      short: String(i + 1),
      value: hit?.tokens ?? 0,
      input: hit?.inputTokens ?? 0,
      output: hit?.outputTokens ?? 0,
      cache: hit ? (hit.cacheReadTokens ?? 0) + (hit.cacheWriteTokens ?? 0) : 0,
      hitRate: hit?.cacheHitRate
    };
  });
  const yearCells = Array.from({ length: 12 }, (_, i) => {
    const key = `${year}-${String(i + 1).padStart(2, "0")}`;
    const days = usage.filter((d) => d.date.startsWith(key));
    const sum = sumTokens(days);
    return {
      key,
      label: `${i + 1} \u6708`,
      short: `${i + 1}\u6708`,
      value: sum.total,
      input: sum.input,
      output: sum.output,
      cache: sum.cache,
      hitRate: days.length > 0 ? days.reduce((acc, d) => acc + (d.cacheHitRate ?? 0), 0) / days.length : void 0
    };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: rowCard2, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      ActivityGrid,
      {
        days: usage,
        mode: activityMode,
        onMode: setActivityMode,
        selectedKey: selectedDay,
        onSelect: setSelectedDay
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8, alignItems: "start" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: rowCard2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardHead2, { name: `${year} \u5E74 ${month} \u6708\u70ED\u529B`, meta: "\u70B9\u51FB\u683C\u5B50\u770B\u5F53\u65E5\u6A21\u578B\u660E\u7EC6" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Heatmap, { cells: monthCells, onSelect: (c) => setSelectedDay(c.label), cellText: "both" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: rowCard2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardHead2, { name: `${year} \u5E74\u5EA6\u70ED\u529B`, meta: "1-6 \u6708 / 7-12 \u6708" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Heatmap, { cells: yearCells, rows: 2, cellText: "both" })
      ] })
    ] }),
    selectedDay !== null && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: rowCard2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardHead2, { name: `${selectedDay} \u6A21\u578B\u660E\u7EC6` }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(DayDetailTable, { day: usage.find((d) => d.date === selectedDay) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: rowCard2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardHead2, { name: "\u6A21\u578B\u6D88\u8017\u6392\u884C", meta: `${rangeLabel} \xB7 Top ${Math.min(10, modelRankData.length)}` }),
      modelRankData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { border: "1px dashed var(--dsw-alias-border-l3)", borderRadius: 8, padding: 12, textAlign: "center", fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: "\u8BE5\u8303\u56F4\u6682\u65E0\u7528\u91CF" }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(RankBars, { rows: modelRankData, nameWidth: 220 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: rowCard2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: { fontSize: 14, lineHeight: "22px", fontWeight: 500, color: "var(--dsw-alias-label-primary)" }, children: "\u6BCF\u65E5\u660E\u7EC6" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: [
          rangeLabel,
          " \xB7 ",
          searching ? `\u547D\u4E2D ${detailRows.length} \u884C` : `${filteredSorted.length} \u5929`
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", style: { flex: "none", color: "var(--dsw-alias-label-tertiary)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { d: "m21 21-4.3-4.3" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "input",
            {
              className: "dsh-usage-search",
              type: "text",
              value: query,
              placeholder: "\u641C\u7D22\u4F9B\u5E94\u5546 / \u6A21\u578B\u2026",
              "aria-label": "\u6309\u4F9B\u5E94\u5546\u6216\u6A21\u578B\u641C\u7D22",
              style: {
                height: 26,
                width: isMobile ? 140 : 190,
                padding: "0 8px",
                fontSize: 12,
                lineHeight: "18px",
                borderRadius: 6,
                border: "1px solid var(--dsw-alias-border-l2)",
                background: "var(--dsw-alias-bg-base)",
                color: "var(--dsw-alias-label-primary)",
                fontFamily: "inherit",
                colorScheme: "dark light",
                outline: "none",
                transition: "border-color .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s cubic-bezier(.2,.8,.2,1)"
              },
              onChange: (e) => setQuery(e.target.value)
            }
          ),
          query !== "" && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            "button",
            {
              type: "button",
              "aria-label": "\u6E05\u9664\u641C\u7D22",
              onClick: () => setQuery(""),
              style: {
                flex: "none",
                width: 18,
                height: 18,
                padding: 0,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "color-mix(in srgb, var(--dsw-alias-label-tertiary) 16%, transparent)",
                color: "var(--dsw-alias-label-secondary)",
                fontSize: 11,
                lineHeight: 1,
                transition: "background .22s cubic-bezier(.2,.8,.2,1), transform .22s cubic-bezier(.2,.8,.2,1)"
              },
              children: "\u2715"
            }
          )
        ] })
      ] }),
      filteredSorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { border: "1px dashed var(--dsw-alias-border-l3)", borderRadius: 8, padding: 12, textAlign: "center", fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: "\u8BE5\u8303\u56F4\u6682\u65E0\u7528\u91CF" }) : detailRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { style: { border: "1px dashed var(--dsw-alias-border-l3)", borderRadius: 8, padding: 12, textAlign: "center", fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: [
        "\u6CA1\u6709\u5339\u914D\u300C",
        query.trim(),
        "\u300D\u7684\u4F9B\u5E94\u5546\u6216\u6A21\u578B"
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { maxHeight: 320, overflowY: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("thead", { style: { position: "sticky", top: 0, background: "var(--dsw-alias-bg-layer-2)", zIndex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("tr", { children: (searching ? ["\u65E5\u671F", "\u6A21\u578B", "\u8F93\u5165", "\u8F93\u51FA", "\u7F13\u5B58", "\u5408\u8BA1", "\u547D\u4E2D\u7387"] : ["\u65E5\u671F", "\u8F93\u5165", "\u8F93\u51FA", "\u7F13\u5B58", "\u5408\u8BA1", "\u547D\u4E2D\u7387"]).map((h) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("th", { style: thStyle, children: h }, h)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("tbody", { children: detailRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          "tr",
          {
            className: "dsh-usage-row-in",
            style: { cursor: searching ? "default" : "pointer", borderBottom: "1px solid var(--dsw-alias-border-l1)" },
            onClick: searching ? void 0 : () => setSelectedDay(r.date),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdStyle, children: r.date }),
              r.model !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: { ...tdStyle, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: r.model, children: r.model }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.input) }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.output) }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.cache) }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.total) }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdStyle, children: formatHitRate(r.hitRate) })
            ]
          },
          r.key
        )) })
      ] }) })
    ] })
  ] });
}
function DayDetailTable({ day }) {
  if (day === void 0) return null;
  const rows = [...day.models ?? []].sort((a, b) => b.tokens - a.tokens);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("tr", { children: ["\u6A21\u578B", "\u8F93\u5165", "\u8F93\u51FA", "\u7F13\u5B58", "\u5408\u8BA1", "\u547D\u4E2D\u7387"].map((h) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("th", { style: thStyle, children: h }, h)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("tr", { style: { borderBottom: "1px solid var(--dsw-alias-border-l1)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdStyle, children: r.model }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.inputTokens) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.outputTokens) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.cacheReadTokens) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdMono, children: formatUnits(r.tokens) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("td", { style: tdStyle, children: formatHitRate(r.cacheHitRate) })
    ] }, r.model)) })
  ] });
}

// src/client/usage/dashboard/SignalTab.tsx
var import_react19 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
function clockOf(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function percentOf(share) {
  if (share === null || !isFinite(share)) return "\u2014";
  return `${Math.round(share * 100)}%`;
}
function multipleOf(value) {
  if (value === null || !isFinite(value)) return "\u2014";
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)}x`;
}
function SignalTab() {
  const [signal, setSignal] = (0, import_react19.useState)(null);
  const [error, setError] = (0, import_react19.useState)(null);
  const [retryTick, setRetryTick] = (0, import_react19.useState)(0);
  const [openDate, setOpenDate] = (0, import_react19.useState)(null);
  const [dayRows, setDayRows] = (0, import_react19.useState)(null);
  const [dayLoading, setDayLoading] = (0, import_react19.useState)(false);
  const [dayError, setDayError] = (0, import_react19.useState)(null);
  const [budgetDraft, setBudgetDraft] = (0, import_react19.useState)("");
  const [budgetSaving, setBudgetSaving] = (0, import_react19.useState)(false);
  const [budgetNote, setBudgetNote] = (0, import_react19.useState)(null);
  (0, import_react19.useEffect)(() => {
    let alive = true;
    setError(null);
    usageApi.signal(30).then((payload) => {
      if (!alive) return;
      if (payload.ok !== true) throw new Error("\u4FE1\u53F7\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      setSignal(payload);
    }).catch((e) => {
      if (alive) setError(e instanceof Error ? e.message : String(e));
    });
    return () => {
      alive = false;
    };
  }, [retryTick]);
  (0, import_react19.useEffect)(() => {
    if (signal === null) return;
    setBudgetDraft(signal.budget !== null && signal.budget > 0 ? String(signal.budget) : "");
  }, [signal]);
  const toggleDay = (date) => {
    if (openDate === date) {
      setOpenDate(null);
      setDayRows(null);
      setDayError(null);
      return;
    }
    setOpenDate(date);
    setDayRows(null);
    setDayError(null);
    setDayLoading(true);
    usageApi.daySessions(date).then((payload) => {
      if (payload.ok !== true) throw new Error("\u4F1A\u8BDD\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      setDayRows(payload.sessions);
    }).catch((e) => setDayError(e instanceof Error ? e.message : String(e))).finally(() => setDayLoading(false));
  };
  const saveBudget = () => {
    const raw = budgetDraft.trim().replace(/,/g, "");
    const value = raw === "" ? 0 : Number(raw);
    if (!Number.isFinite(value) || value < 0) {
      setBudgetNote({ ok: false, text: "\u8BF7\u8F93\u5165\u975E\u8D1F\u6570\u5B57" });
      return;
    }
    setBudgetSaving(true);
    setBudgetNote(null);
    usageApi.saveBudget(value).then((payload) => {
      if (payload.ok !== true) throw new Error("\u4FDD\u5B58\u5931\u8D25");
      setBudgetNote({ ok: true, text: value > 0 ? `\u5DF2\u4FDD\u5B58\u9884\u7B97 ${formatUnits(value)} Token` : "\u5DF2\u5173\u95ED\u9884\u7B97" });
      setSignal((prev) => prev === null ? prev : { ...prev, budget: value });
    }).catch((e) => setBudgetNote({ ok: false, text: e instanceof Error ? e.message : String(e) })).finally(() => setBudgetSaving(false));
  };
  if (error !== null) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ErrorCard, { message: error, onRetry: () => setRetryTick((t) => t + 1) });
  }
  if (signal === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { padding: "24px 0", textAlign: "center", fontSize: 13, color: "var(--dsw-alias-label-tertiary)" }, children: "\u52A0\u8F7D\u4E2D\u2026" });
  }
  const { efficiency, signal: sig, budget } = signal;
  const anomalies = sig.anomalyDays;
  const topRoutesText = efficiency.topRoutes.slice(0, 3).map((r) => `${r.model} ${percentOf(r.share)}`).join(" \xB7 ");
  const budgetActive = budget !== null && budget > 0;
  const budgetUsed = budgetActive && sig.projected30 > 0 ? Math.min(1, sig.projected30 / budget) : 0;
  const budgetOver = budgetActive && sig.projected30 > budget;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: editorFace, children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { first: true, label: "\u6A21\u578B\u5C1D\u8BD5\u6B21\u6570", value: formatUnits(efficiency.requests), exact: formatExact(efficiency.requests) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          Stat,
          {
            label: "\u6B21\u5747 Tokens",
            value: efficiency.tokensPerRequest === null ? "\u2014" : formatUnits(efficiency.tokensPerRequest),
            sub: `\u5408\u8BA1 ${formatUnits(efficiency.tokens)}`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { label: "\u7F13\u5B58\u547D\u4E2D\u7387", value: formatHitRate(efficiency.cacheHitRate) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          Stat,
          {
            label: "\u538B\u7F29\u5360\u6BD4",
            value: percentOf(efficiency.compactedShare),
            sub: efficiency.compactedTokens > 0 ? `\u538B\u7F29 ${formatUnits(efficiency.compactedTokens)}` : "\u65E0\u538B\u7F29\u8BB0\u5F55"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          Stat,
          {
            label: "Top \u6A21\u578B\u5360\u6BD4",
            value: percentOf(efficiency.topRouteShare),
            sub: topRoutesText !== "" ? void 0 : "\u6682\u65E0\u6570\u636E"
          }
        )
      ] }),
      topRoutesText !== "" && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { marginTop: 10, fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
        "Top \u6A21\u578B\uFF1A",
        topRoutesText
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: rowCard, children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(CardHead, { name: "\u7528\u91CF\u4FE1\u53F7", meta: `\u8FD1 ${sig.activeDays} \u4E2A\u6D3B\u8DC3\u65E5\u53C2\u4E0E\u57FA\u7EBF` }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { first: true, label: "7 \u65E5\u65E5\u5747", value: formatUnits(sig.dailyAvg7), exact: formatExact(Math.round(sig.dailyAvg7)) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { label: "\u9884\u8BA1 30 \u65E5", value: formatUnits(sig.projected30), exact: formatExact(Math.round(sig.projected30)) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { label: "\u6628\u65E5\u7528\u91CF", value: formatUnits(sig.yesterdayTokens), sub: sig.yesterdayDate }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { label: "\u6628\u65E5 vs \u4E2D\u4F4D\u6570", value: multipleOf(sig.yesterdayMultiple) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Stat, { label: "\u6D3B\u8DC3\u65E5\u4E2D\u4F4D\u6570", value: sig.activeMedian === null ? "\u2014" : formatUnits(sig.activeMedian) })
      ] }),
      anomalies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: anomalies.map((day) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { role: "alert", style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent)",
        background: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent)"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { width: 8, height: 8, borderRadius: 4, flex: "none", background: "var(--dsw-alias-state-error-primary)" } }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-primary)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { fontFamily: MONO3, fontWeight: 600, color: "var(--dsw-alias-state-error-primary)" }, children: day.date }),
          " ",
          "\u4F7F\u7528 ",
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { fontFamily: MONO3, fontWeight: 600, color: "var(--dsw-alias-state-error-primary)" }, children: formatUnits(day.tokens) }),
          " ",
          "Token\uFF0C\u662F\u6D3B\u8DC3\u65E5\u4E2D\u4F4D\u6570\u7684",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { fontFamily: MONO3, fontWeight: 600, color: "var(--dsw-alias-state-error-primary)" }, children: multipleOf(day.multiple) }),
          " ",
          "\u500D"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", { type: "button", onClick: () => toggleDay(day.date), style: {
          marginLeft: "auto",
          height: 28,
          padding: "0 10px",
          border: `1px solid ${openDate === day.date ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-border-l2)"}`,
          borderRadius: 14,
          background: openDate === day.date ? "color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)" : "transparent",
          cursor: "pointer",
          fontSize: 12,
          lineHeight: "18px",
          color: openDate === day.date ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-label-primary)"
        }, children: openDate === day.date ? "\u6536\u8D77\u4F1A\u8BDD" : "\u67E5\u770B\u5F02\u5E38\u65E5\u4F1A\u8BDD" })
      ] }, day.date)) }),
      openDate !== null && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { borderRadius: 12, background: "var(--dsw-alias-bg-module-platform)", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-secondary)" }, children: [
          openDate,
          " \u7684\u4F1A\u8BDD\u7528\u91CF\uFF08\u6309 Token \u964D\u5E8F",
          dayLoading ? " \xB7 \u52A0\u8F7D\u4E2D\u2026" : "",
          "\uFF09"
        ] }),
        dayError !== null && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)" }, children: dayError }),
        dayRows !== null && dayRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-label-tertiary)" }, children: "\u8BE5\u65E5\u6CA1\u6709\u53EF\u7528\u91CF\u8BB0\u5F55\u3002" }),
        dayRows !== null && dayRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderTop: "1px solid var(--dsw-alias-border-l1)", minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { fontSize: 13, lineHeight: "20px", color: "var(--dsw-alias-label-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: row.title ?? "\u672A\u547D\u540D\u4F1A\u8BDD" }),
          row.firstAt !== null && row.lastAt !== null && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { style: { flex: "none", fontSize: 11, fontFamily: MONO3, color: "var(--dsw-alias-label-tertiary)" }, children: [
            clockOf(row.firstAt),
            "\u2013",
            clockOf(row.lastAt)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", { type: "button", title: `\u590D\u5236\u4F1A\u8BDD ID\uFF1A${row.id}`, onClick: () => {
            void navigator.clipboard?.writeText(row.id).catch(() => {
            });
          }, style: {
            flex: "none",
            height: 22,
            padding: "0 8px",
            borderRadius: 11,
            border: "1px solid var(--dsw-alias-border-l2)",
            background: "transparent",
            cursor: "pointer",
            fontSize: 11,
            lineHeight: "16px",
            color: "var(--dsw-alias-label-secondary)"
          }, children: "\u590D\u5236 ID" }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { marginLeft: "auto", flex: "none", fontSize: 12, fontFamily: MONO3, color: "var(--dsw-alias-label-primary)" }, children: formatUnits(row.tokens) }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("span", { style: { flex: "none", fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: [
            formatUnits(row.requests),
            " \u6B21"
          ] })
        ] }, row.id))
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: rowCard, children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(CardHead, { name: "30 \u65E5 Token \u9884\u7B97", meta: "\u4FDD\u5B58\u5728\u672C\u673A DSH \u8BBE\u7F6E\u4E2D" }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "input",
          {
            type: "number",
            min: 0,
            step: 1e6,
            placeholder: "\u4F8B\u5982 2600000000",
            value: budgetDraft,
            onChange: (e) => {
              setBudgetDraft(e.target.value);
              setBudgetNote(null);
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") saveBudget();
            },
            style: {
              width: 220,
              height: 32,
              padding: "0 10px",
              fontSize: 14,
              lineHeight: "22px",
              borderRadius: 8,
              border: "1px solid var(--dsw-alias-border-l2)",
              background: "var(--dsw-alias-bg-layer-1)",
              color: "var(--dsw-alias-label-primary)",
              boxSizing: "border-box",
              outline: "none",
              fontFamily: MONO3
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", { type: "button", disabled: budgetSaving, onClick: saveBudget, style: {
          height: 32,
          padding: "0 16px",
          borderRadius: 16,
          border: "1px solid transparent",
          cursor: budgetSaving ? "default" : "pointer",
          background: "var(--dsw-alias-button-primary-fill)",
          color: "var(--dsw-alias-label-primary-foreground)",
          fontSize: 13,
          lineHeight: "20px",
          opacity: budgetSaving ? 0.6 : 1
        }, children: budgetSaving ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58" }),
        budgetNote !== null && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { style: { fontSize: 12, lineHeight: "18px", color: budgetNote.ok ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-error-primary)" }, children: budgetNote.text })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { fontSize: 11, lineHeight: "16px", color: "var(--dsw-alias-label-tertiary)" }, children: [
        "\u9884\u7B97\u6309\u81EA\u7136\u6708\u6EDA\u52A8\u5BF9\u7167\u300C\u9884\u8BA1 30 \u65E5 Tokens\u300D\u4F30\u7B97\uFF1B\u586B 0 \u53EF\u5173\u95ED\u3002\u5F53\u524D\uFF1A",
        budgetActive ? `${formatUnits(budget)} Token` : "\u5C1A\u672A\u8BBE\u7F6E\u9884\u7B97"
      ] }),
      budgetActive && sig.projected30 > 0 && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { height: 6, borderRadius: 3, background: "var(--dsw-alias-bg-module-platform)", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: {
          width: `${Math.round(budgetUsed * 100)}%`,
          height: "100%",
          borderRadius: 3,
          background: budgetOver ? "var(--dsw-alias-state-error-primary)" : "var(--dsw-alias-state-business-primary)",
          transition: "width .3s ease"
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { fontSize: 12, lineHeight: "18px", color: budgetOver ? "var(--dsw-alias-state-error-primary)" : "var(--dsw-alias-label-secondary)" }, children: budgetOver ? `\u6309\u8FD1 7 \u65E5\u8282\u594F\uFF0C\u9884\u8BA1 30 \u65E5\u7528\u91CF\uFF08${formatUnits(sig.projected30)}\uFF09\u5C06\u8D85\u51FA\u9884\u7B97 ${Math.round((sig.projected30 / budget - 1) * 100)}%` : `\u9884\u8BA1 30 \u65E5\u7528\u91CF\u7EA6\u4E3A\u9884\u7B97\u7684 ${Math.round(budgetUsed * 100)}%` })
      ] })
    ] })
  ] });
}

// src/client/usage/dashboard/AccountsTab.tsx
var import_react23 = require("react");

// src/client/usage/dashboard/primitives/ProviderGroup.tsx
var import_react21 = require("react");

// src/client/usage/dashboard/charts/ProgressBar.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function usageTone(percent) {
  const p = Math.max(0, Math.min(100, percent));
  if (p >= 85) return "var(--dsw-alias-state-error-primary)";
  if (p >= 60) return "var(--dsw-alias-state-warn-primary)";
  return "var(--dsw-alias-state-success-primary)";
}
function ProgressBar({ percent, height = 6 }) {
  const p = Math.max(0, Math.min(100, percent));
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { style: { width: "100%", height, borderRadius: height / 2, background: "var(--dsw-alias-border-l2)", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { style: { height: "100%", width: `${p}%`, background: usageTone(p), borderRadius: height / 2, transition: "width .3s ease" } }) });
}

// src/client/usage/dashboard/primitives/QuotaWindowRow.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function QuotaWindowRow({ window: w, delay = 0, active = true }) {
  const used = w.used ?? 0;
  const limit = w.limit ?? 0;
  const hasAmounts = typeof w.used === "number" && typeof w.limit === "number" && w.limit > 0;
  const pct = Math.max(0, Math.min(100, w.usedPercent ?? 0));
  const resetTs = w.resetsAt ? new Date(w.resetsAt).getTime() : null;
  const label = w.windowType === "5h" ? "5h \u6EDA\u52A8\u7A97\u53E3" : w.windowType === "7d" ? "7\u5929\u7A97\u53E3" : w.kind;
  const meta = {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    flex: "none",
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    color: "var(--dsw-alias-label-tertiary)",
    whiteSpace: "nowrap"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "dsh-acc-win", style: { animationDelay: `${delay}ms` }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 5 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { style: { flex: "none", fontSize: 11, fontWeight: 500, color: "var(--dsw-alias-label-primary)" }, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { style: meta, children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: hasAmounts ? `\u5DF2\u7528 ${formatUnits(used)} / ${formatUnits(limit)} \u79EF\u5206` : `\u5DF2\u7528 ${pct}%` }),
        resetTs !== null && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { children: [
          "\xB7 ",
          relativeTime2(resetTs),
          "\u91CD\u7F6E"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ProgressBar, { percent: active ? pct : 0, height: 6 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        "span",
        {
          title: hasAmounts ? `\u5DF2\u7528 ${formatUnits(used)} / ${formatUnits(limit)} \u79EF\u5206` : "\u5DF2\u7528",
          style: { flex: "none", fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: usageTone(pct) },
          children: [
            pct,
            "%"
          ]
        }
      )
    ] })
  ] });
}

// src/client/usage/dashboard/primitives/PoolQuotaPanel.tsx
var import_react20 = require("react");

// src/client/usage/dashboard/primitives/accounts-sheet.ts
var ACC_STYLE_ID = "dsh-accounts-sheet";
var ACC_SHEET = `
@keyframes dsh-acc-in {
  from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.985); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes dsh-acc-win-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes dsh-acc-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
@keyframes dsh-acc-pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, transparent); }
  50% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--dsw-alias-state-error-primary) 0%, transparent); }
}
@keyframes dsh-acc-spin {
  to { transform: rotate(360deg); }
}
.dsh-acc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 12px;
  align-items: start;
}
.dsh-acc-card {
  position: relative;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-2);
  padding: 14px 16px;
  opacity: 0;
  animation: dsh-acc-in 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-acc-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 42%, var(--dsw-alias-border-l2));
  box-shadow: 0 10px 30px color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent), 0 2px 8px rgba(0, 0, 0, 0.22);
}
.dsh-acc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
  box-shadow: 0 0 6px currentColor;
}
.dsh-acc-dot[data-critical="true"] {
  animation: dsh-acc-pulse 2.2s ease-in-out infinite;
}
.dsh-acc-skel {
  height: 92px;
  border-radius: 14px;
  border: 1px solid var(--dsw-alias-border-l1);
  background:
    linear-gradient(90deg, var(--dsw-alias-bg-layer-2) 25%, var(--dsw-alias-bg-layer-1) 50%, var(--dsw-alias-bg-layer-2) 75%);
  background-size: 200% 100%;
  animation: dsh-acc-shimmer 1.4s linear infinite;
}
.dsh-acc-win {
  opacity: 0;
  animation: dsh-acc-win-in 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.dsh-acc-spin {
  animation: dsh-acc-spin 0.8s linear infinite;
}
.dsh-acc-chip {
  font-size: 11px;
  line-height: 18px;
  border-radius: 6px;
  padding: 0 7px;
  flex: none;
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .dsh-acc-card, .dsh-acc-win, .dsh-acc-skel, .dsh-acc-dot[data-critical="true"], .dsh-acc-spin {
    animation: none;
    opacity: 1;
  }
  .dsh-acc-card { transition: none; }
}
`;
function ensureAccountsStyles() {
  if (typeof document === "undefined") return () => {
  };
  let tag = document.getElementById(ACC_STYLE_ID);
  if (tag === null) {
    tag = document.createElement("style");
    tag.id = ACC_STYLE_ID;
    tag.dataset.plugin = "dsh-triad";
    tag.textContent = ACC_SHEET;
    document.head.appendChild(tag);
  }
  return () => {
    tag?.remove();
  };
}

// src/client/usage/dashboard/primitives/PoolQuotaPanel.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var STYLE_ID8 = "dsh-pool-quota-styles";
var SHEET7 = `
@keyframes dsh-pool-in {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.dsh-pool-block {
  border-left: 3px solid var(--dsh-pool-accent, var(--dsw-alias-state-business-primary));
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsh-pool-accent, var(--dsw-alias-state-business-primary)) 6%, var(--dsw-alias-bg-layer-1));
  padding: 10px 12px;
  opacity: 0;
  animation: dsh-pool-in 320ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: background 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-pool-block:hover {
  background: color-mix(in srgb, var(--dsh-pool-accent, var(--dsw-alias-state-business-primary)) 9%, var(--dsw-alias-bg-layer-1));
}
.dsh-pool-row {
  opacity: 0;
  animation: dsh-pool-in 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.dsh-pool-foot {
  margin-top: 9px;
  padding-top: 8px;
  border-top: 1px dashed var(--dsw-alias-border-l2);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-tertiary);
}
.dsh-pool-rules {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-pool-rules[data-open="true"] { grid-template-rows: 1fr; }
.dsh-pool-rules-inner { min-height: 0; overflow: hidden; }
.dsh-pool-chevron {
  transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-pool-chevron[data-open="true"] { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) {
  .dsh-pool-block, .dsh-pool-row { animation: none; opacity: 1; }
  .dsh-pool-block { transition: none; }
}
`;
function ensurePoolQuotaStyles() {
  if (typeof document === "undefined") return () => {
  };
  let tag = document.getElementById(STYLE_ID8);
  if (tag === null) {
    tag = document.createElement("style");
    tag.id = STYLE_ID8;
    tag.dataset.plugin = "dsh-triad";
    tag.textContent = SHEET7;
    document.head.appendChild(tag);
  }
  return () => {
    tag?.remove();
  };
}
function groupPools(windows) {
  const groups = [];
  const index = /* @__PURE__ */ new Map();
  for (const w of windows) {
    const name = w.poolName ?? w.kind;
    let g = index.get(name);
    if (g === void 0) {
      g = {
        poolName: name,
        poolType: w.poolType ?? "default",
        modelCount: w.modelCount ?? 0,
        grantBalance: w.grantBalance ?? null,
        grantExpiryAt: w.grantExpiryAt ?? null,
        windows: []
      };
      index.set(name, g);
      groups.push(g);
    }
    g.windows.push(w);
  }
  return groups;
}
function poolAccent(poolType) {
  return poolType === "dedicated" ? "var(--dsw-alias-state-warn-primary)" : "var(--dsw-alias-state-business-primary)";
}
function poolLabel(poolType) {
  return poolType === "dedicated" ? "\u4E13\u5C5E\u6C60" : "\u901A\u7528\u6C60";
}
function deductionNote(poolType) {
  return poolType === "dedicated" ? "\u6263\u51CF\u987A\u5E8F\uFF1A\u4E13\u5C5E\u6C60\u5468\u671F \u2192 \u901A\u7528\u6C60\u5468\u671F \u2192 \u901A\u7528\u6C60\u6D3B\u52A8" : "\u6263\u51CF\u987A\u5E8F\uFF1A\u901A\u7528\u6C60\u5468\u671F \u2192 \u901A\u7528\u6C60\u6D3B\u52A8";
}
var rulesRows = [
  { title: "Flash-lite \u6A21\u578B", body: "\u4E13\u5C5E\u6C60\u5468\u671F\u79EF\u5206 \u2192 \u901A\u7528\u6C60\u5468\u671F\u79EF\u5206 \u2192 \u901A\u7528\u6C60\u6D3B\u52A8\u56FA\u5B9A\u79EF\u5206" },
  { title: "\u5176\u4ED6\u6A21\u578B", body: "\u901A\u7528\u6C60\u5468\u671F\u79EF\u5206 \u2192 \u901A\u7528\u6C60\u6D3B\u52A8\u56FA\u5B9A\u79EF\u5206" },
  { title: "5h \u7A97\u53E3\u7EA6\u675F", body: "\u5404\u6C60\u6D88\u8017\u53D7\u6EDA\u52A8 5 \u5C0F\u65F6\u7A97\u53E3\u989D\u5EA6\u4E0A\u9650\u7EA6\u675F\uFF0C\u8FBE\u4E0A\u9650\u81EA\u52A8\u987A\u5EF6\u81F3\u4E0B\u4E00\u6C60\u6263\u51CF" },
  { title: "\u6D3B\u52A8\u56DE\u5145", body: "\u6D3B\u52A8\u671F\u95F4 Flash-lite \u4E13\u5C5E\u6C60\u5B9E\u9645\u6D88\u8017\u6309 1:1 \u6298\u7B97\u56DE\u5145\u4E3A\u901A\u7528\u6C60\u6D3B\u52A8\u79EF\u5206\uFF0C\u5230\u8D26\u540E 30 \u5929\u6709\u6548" }
];
function PoolQuotaPanel({ windows, plan }) {
  const [rulesOpen, setRulesOpen] = (0, import_react20.useState)(false);
  const [mounted, setMounted] = (0, import_react20.useState)(false);
  (0, import_react20.useEffect)(() => {
    ensurePoolQuotaStyles();
    ensureAccountsStyles();
  }, []);
  (0, import_react20.useEffect)(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const pools = (0, import_react20.useMemo)(() => groupPools(windows), [windows]);
  const sectionStyle = { display: "flex", flexDirection: "column", gap: 8 };
  const hasPlan = typeof plan === "string" && plan.trim() !== "" && plan.trim() !== "\u2014" && plan.trim() !== "-";
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: sectionStyle, children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { fontWeight: 600, color: "var(--dsw-alias-label-secondary)", letterSpacing: 0.3 }, children: "\u79EF\u5206\u5236\u914D\u989D" }),
      hasPlan && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: [
        "\xB7 ",
        plan
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { style: { fontVariantNumeric: "tabular-nums" }, children: [
        "\xB7 ",
        pools.length,
        " \u4E2A\u79EF\u5206\u6C60"
      ] })
    ] }),
    pools.map((pool, poolIndex) => {
      const accent = poolAccent(pool.poolType);
      const sorted = [...pool.windows].sort((a, b) => {
        const av = a.windowType === "5h" ? 0 : 1;
        const bv = b.windowType === "5h" ? 0 : 1;
        return av - bv;
      });
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
        "div",
        {
          className: "dsh-pool-block",
          style: { "--dsh-pool-accent": accent, animationDelay: `${poolIndex * 70}ms` },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 9, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--dsw-alias-label-primary)" }, children: pool.poolName }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "dsh-acc-chip", style: { color: accent, background: `color-mix(in srgb, ${accent} 12%, transparent)` }, children: poolLabel(pool.poolType) }),
              pool.modelCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { className: "dsh-acc-chip", style: { color: "var(--dsw-alias-label-tertiary)", background: "var(--dsw-alias-fill-l2)" }, children: [
                pool.modelCount,
                " \u4E2A\u6A21\u578B"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
              sorted.map((w, wi) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                QuotaWindowRow,
                {
                  window: w,
                  delay: poolIndex * 70 + 50 + wi * 60,
                  active: mounted
                },
                w.kind
              )),
              pool.grantBalance !== null && pool.grantBalance > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "dsh-pool-row", style: { animationDelay: `${poolIndex * 70 + 130}ms` }, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--dsw-alias-label-secondary)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { flex: "none", width: 6, height: 6, borderRadius: 3, background: accent } }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { color: "var(--dsw-alias-label-primary)", fontWeight: 500 }, children: "\u6D3B\u52A8\u79EF\u5206\uFF08\u56FA\u5B9A\uFF09" }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { fontVariantNumeric: "tabular-nums", color: "var(--dsw-alias-label-secondary)" }, children: formatUnits(pool.grantBalance) }),
                pool.grantExpiryAt !== null && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { style: { color: "var(--dsw-alias-label-tertiary)" }, children: [
                  "\xB7 \u6700\u8FD1\u5230\u671F ",
                  relativeTime2(new Date(pool.grantExpiryAt).getTime())
                ] })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "dsh-pool-foot", children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { width: "11", height: "11", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, style: { flex: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M4 12V7a3 3 0 0 1 3-3h5M9.5 6.5L12 4 9.5 1.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: deductionNote(pool.poolType) })
              ] })
            ] })
          ]
        },
        pool.poolName
      );
    }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { marginTop: 2 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => setRulesOpen((o) => !o),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "none",
            background: "transparent",
            padding: "6px 2px",
            cursor: "pointer",
            fontSize: 11,
            color: "var(--dsw-alias-label-secondary)"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { className: "dsh-pool-chevron", "data-open": rulesOpen, width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M4 6l4 4 4-4", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }),
            "\u79EF\u5206\u6263\u51CF\u89C4\u5219\u4E0E 5h \u7A97\u53E3\u7EA6\u675F"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "dsh-pool-rules", "data-open": rulesOpen, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "dsh-pool-rules-inner", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 7, padding: "4px 0 10px 18px" }, children: rulesRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { fontSize: 11, lineHeight: 17 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { color: "var(--dsw-alias-label-primary)", fontWeight: 500, marginRight: 8 }, children: r.title }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary)" }, children: r.body })
      ] }, r.title)) }) }) })
    ] })
  ] });
}

// src/client/usage/dashboard/primitives/ProviderGroup.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var nameStyle = {
  fontWeight: 600,
  color: "var(--dsw-alias-label-primary)",
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0
};
var modeTagStyle = {
  fontSize: 11,
  color: "var(--dsw-alias-label-secondary)",
  background: "var(--dsw-alias-interactive-bg-hover)",
  borderRadius: 6,
  padding: "1px 7px",
  flex: "none"
};
var alertStyle = (level) => ({
  fontSize: 11,
  fontWeight: 500,
  padding: "1px 8px",
  borderRadius: 6,
  flex: "none",
  background: level === "critical" ? "color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent)" : "color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent)",
  color: alertColor(level)
});
var iconButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 7,
  flex: "none",
  border: "1px solid var(--dsw-alias-border-l2)",
  background: "transparent",
  color: "var(--dsw-alias-label-secondary)",
  cursor: "pointer",
  transition: "color .18s cubic-bezier(.2,.8,.2,1), border-color .18s cubic-bezier(.2,.8,.2,1)"
};
function ProviderGroup({ provider, onRequireCredential, refreshKey, index }) {
  const [account, setAccount] = (0, import_react21.useState)(null);
  const [loading, setLoading] = (0, import_react21.useState)(false);
  const [error, setError] = (0, import_react21.useState)(null);
  const load = (refresh = false) => {
    setLoading(true);
    setError(null);
    usageApi.account(provider.id, refresh).then((p) => {
      if (p.ok) setAccount(p.account);
      else setError(p.message ?? "\u83B7\u53D6\u5931\u8D25");
    }).catch((e) => setError(e instanceof Error ? e.message : String(e))).finally(() => setLoading(false));
  };
  (0, import_react21.useEffect)(() => {
    load();
  }, [provider.id, refreshKey]);
  const level = account?.alert?.level ?? provider.alert?.level ?? "unknown";
  const statusColor = provider.status === "ok" ? "var(--dsw-alias-state-success-primary)" : provider.status === "critical" ? "var(--dsw-alias-state-error-primary)" : provider.status === "warning" ? "var(--dsw-alias-state-warn-primary)" : "var(--dsw-alias-label-tertiary)";
  const needsCredential = provider.status === "unauthorized" || provider.status === "not-configured";
  const plan = account?.plan;
  const hasPlan = typeof plan === "string" && plan.trim() !== "" && plan.trim() !== "\u2014" && plan.trim() !== "-";
  const hasWindows = (account?.windows?.length ?? 0) > 0;
  const hasAlert = level === "critical" || level === "warning";
  const isPoolQuota = hasWindows && (account?.windows?.some((w) => w.poolType !== void 0) ?? false);
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "dsh-acc-card", style: { animationDelay: `${index * 60}ms` }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, marginBottom: 10 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        "span",
        {
          className: "dsh-acc-dot",
          "data-critical": provider.status === "critical",
          style: { background: statusColor, color: statusColor }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: nameStyle, children: provider.displayName }),
      provider.accountMode !== null && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: modeTagStyle, children: isPoolQuota ? "\u79EF\u5206\u5236" : provider.accountMode === "subscription" ? "\u8BA2\u9605" : "\u4F59\u989D" }),
      hasPlan && !isPoolQuota && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: modeTagStyle, children: plan }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flex: "none" }, children: [
        !needsCredential && account !== null && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)", whiteSpace: "nowrap" }, children: relativeTime2(account.fetchedAt) }),
        !needsCredential && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("button", { type: "button", "aria-label": "\u5237\u65B0", onClick: () => load(true), style: iconButtonStyle, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3.2h-3.2", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      ] })
    ] }),
    hasAlert && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { marginBottom: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { style: alertStyle(level), children: [
      "\u26A0 \u5269\u4F59 ",
      account?.alert?.value ?? provider.alert?.value ?? 0,
      "%"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { minWidth: 0 }, children: needsCredential ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      "button",
      {
        type: "button",
        onClick: () => onRequireCredential(provider.id),
        style: {
          width: "100%",
          padding: "7px 12px",
          fontSize: 12,
          borderRadius: 8,
          cursor: "pointer",
          border: "1px dashed var(--dsw-alias-border-l2)",
          background: "var(--dsw-alias-interactive-bg-hover)",
          color: "var(--dsw-alias-label-secondary)",
          transition: "color .18s cubic-bezier(.2,.8,.2,1), border-color .18s cubic-bezier(.2,.8,.2,1)"
        },
        children: "\u914D\u7F6E\u51ED\u636E"
      }
    ) : loading ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { height: 5, borderRadius: 3, background: "var(--dsw-alias-border-l2)", overflow: "hidden", maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { width: "40%", height: "100%", background: "var(--dsw-alias-border-l1)", animation: "pulse 1.2s infinite" } }) }) : error ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { style: { fontSize: 12, color: "var(--dsw-alias-state-error-primary)", display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }, children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        "button",
        {
          type: "button",
          onClick: () => load(true),
          style: { border: "none", background: "transparent", color: "var(--dsw-alias-state-error-primary)", cursor: "pointer", fontSize: 12, flex: "none" },
          children: "\u91CD\u8BD5"
        }
      )
    ] }) : account === null ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)" }, children: "\u7B49\u5F85\u9996\u6B21\u83B7\u53D6" }) : isPoolQuota ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(PoolQuotaPanel, { windows: account.windows, plan: account.plan }) : hasWindows ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 560 }, children: account.windows.map((w, wi) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(QuotaWindowRow, { window: w, delay: wi * 60 }, w.kind)) }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)", display: "flex", alignItems: "baseline", gap: 4, minWidth: 0 }, children: hasPlan ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { color: "var(--dsw-alias-label-tertiary)", flex: "none" }, children: "\u65B9\u6848" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { color: "var(--dsw-alias-label-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: plan })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { style: { color: "var(--dsw-alias-label-tertiary)" }, children: "\u6682\u65E0\u65B9\u6848\u4FE1\u606F" }) }) })
  ] });
}

// src/client/usage/dashboard/primitives/CredentialModal.tsx
var import_react22 = require("react");
var import_react_dom7 = require("react-dom");
var import_jsx_runtime26 = require("react/jsx-runtime");
var STYLE_ID9 = "dsh-cred-modal-styles";
var SHEET8 = `
@keyframes dsh-cred-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dsh-cred-card-in {
  from { opacity: 0; transform: translate3d(0, 14px, 0) scale(0.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
.dsh-cred-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 10, 14, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: dsh-cred-overlay-in 180ms ease-out both;
}
.dsh-cred-card {
  width: 420px;
  max-width: calc(100vw - 48px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--dsw-alias-border-l1);
  animation: dsh-cred-card-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .dsh-cred-overlay, .dsh-cred-card { animation: none; }
}
`;
var CRED_SOLID_ID = "dsh-cred-card-solid-styles";
var CRED_SOLID_SHEET = [
  ".dsh-cred-card{background:var(--dsw-alias-bg-layer-2)}",
  "html[data-dsh-glass] .dsh-cred-card[data-solid]{background:var(--dsw-static-neutral-bluish-00,#fff);backdrop-filter:none;-webkit-backdrop-filter:none}",
  "html[data-dsh-glass] body[data-ds-dark-theme] .dsh-cred-card[data-solid]{background:var(--dsw-static-neutral-bluish-850,#2c2c2e)}"
].join("\n");
function ensureStyles2() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID9) === null) {
    const tag = document.createElement("style");
    tag.id = STYLE_ID9;
    tag.textContent = SHEET8;
    document.head.appendChild(tag);
  }
  if (document.getElementById(CRED_SOLID_ID) === null) {
    const tag = document.createElement("style");
    tag.id = CRED_SOLID_ID;
    tag.textContent = CRED_SOLID_SHEET;
    document.head.appendChild(tag);
  }
}
var headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 16px",
  borderBottom: "1px solid var(--dsw-alias-border-l1)",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--dsw-alias-label-primary)"
};
var bodyStyle = { display: "flex", flexDirection: "column", gap: 12, padding: 16 };
var inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "7px 10px",
  fontSize: 13,
  borderRadius: 8,
  border: "1px solid var(--dsw-alias-border-l1)",
  background: "var(--dsw-alias-bg-base)",
  color: "var(--dsw-alias-label-primary)",
  transition: "border-color .18s cubic-bezier(.2,.8,.2,1)"
};
var btnBase = {
  padding: "6px 14px",
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--dsw-alias-border-l1)",
  background: "transparent",
  color: "var(--dsw-alias-label-primary)",
  cursor: "pointer"
};
function CredentialModal({ providerName, onClose, onSave }) {
  const [value, setValue] = (0, import_react22.useState)("");
  const [saving, setSaving] = (0, import_react22.useState)(false);
  const [error, setError] = (0, import_react22.useState)(null);
  const [closing, setClosing] = (0, import_react22.useState)(false);
  (0, import_react22.useEffect)(() => {
    ensureStyles2();
  }, []);
  (0, import_react22.useEffect)(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const close = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 160);
  };
  const modal = /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "dsh-cred-overlay", onClick: close, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "div",
    {
      className: "dsh-cred-card",
      "data-solid": "",
      style: closing ? { opacity: 0, transform: "translate3d(0, 8px, 0) scale(0.98)", transition: "opacity 160ms ease, transform 160ms ease" } : void 0,
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { style: headerStyle, children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("span", { children: [
            "\u914D\u7F6E ",
            providerName,
            " \u51ED\u636E"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "button",
            {
              type: "button",
              "aria-label": "\u5173\u95ED",
              onClick: close,
              style: { border: "none", background: "transparent", color: "var(--dsw-alias-label-secondary)", cursor: "pointer", fontSize: 15 },
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { style: bodyStyle, children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-secondary)" }, children: "\u8F93\u5165 API Key\uFF08\u4EC5 SENSENOVA_* \u5F15\u7528\u53EF\u5199\uFF0C\u5B58\u4E8E\u5B89\u5168\u51ED\u636E\u5B58\u50A8\uFF09" }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("input", { type: "password", value, onChange: (e) => setValue(e.target.value), placeholder: "API Key", style: inputStyle, autoFocus: true }),
          error && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-state-error-primary)" }, children: error }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("button", { type: "button", onClick: close, style: btnBase, children: "\u53D6\u6D88" }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
              "button",
              {
                type: "button",
                disabled: value.trim() === "" || saving,
                onClick: async () => {
                  setSaving(true);
                  setError(null);
                  try {
                    await onSave(value.trim());
                    close();
                  } catch (e) {
                    setError(e instanceof Error ? e.message : String(e));
                  } finally {
                    setSaving(false);
                  }
                },
                style: { ...btnBase, background: saving ? "var(--dsw-alias-border-l2)" : "var(--dsw-alias-state-business-primary)", color: "#fff", border: "none", opacity: value.trim() === "" ? 0.6 : 1 },
                children: saving ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
  return typeof document !== "undefined" ? (0, import_react_dom7.createPortal)(modal, document.body) : modal;
}

// src/client/usage/dashboard/AccountsTab.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function AccountsTab({ refreshTick }) {
  const [providers, setProviders] = (0, import_react23.useState)([]);
  const [credentialFor, setCredentialFor] = (0, import_react23.useState)(null);
  const [refreshing, setRefreshing] = (0, import_react23.useState)(false);
  const [error, setError] = (0, import_react23.useState)(null);
  const [refreshKey, setRefreshKey] = (0, import_react23.useState)(0);
  const [loaded, setLoaded] = (0, import_react23.useState)(false);
  (0, import_react23.useEffect)(() => ensureAccountsStyles(), []);
  const load = () => {
    setError(null);
    usageApi.providers().then((p) => {
      if (p.ok !== true) throw new Error("\u4F9B\u5E94\u5546\u6570\u636E\u52A0\u8F7D\u5931\u8D25");
      setProviders(p.providers);
    }).catch((e) => setError(e instanceof Error ? e.message : String(e))).finally(() => setLoaded(true));
  };
  (0, import_react23.useEffect)(() => {
    load();
  }, [refreshTick]);
  const saveCredential = async (value) => {
    const res = await fetch("/api/usage-stats/credentials", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ ref: "SENSENOVA_API_KEY", value })
    });
    const payload = await res.json();
    if (!res.ok || payload.ok !== true) throw new Error(payload?.message ?? `HTTP ${res.status}`);
    load();
  };
  const refreshAll = () => {
    setRefreshing(true);
    setError(null);
    Promise.all(providers.map((p) => usageApi.account(p.id, true).catch(() => null))).finally(() => {
      setRefreshing(false);
      load();
      setRefreshKey((k) => k + 1);
    });
  };
  const alertCount = providers.filter((p) => p.status === "critical" || p.status === "warning").length;
  const poolCount = providers.filter((p) => p.adapter === "sensenova-token-plan").length;
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ErrorCard, { message: error, onRetry: load });
  }
  const headStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 12
  };
  const titleStyle = {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--dsw-alias-label-primary)"
  };
  const chipStyle = (color, bg) => ({
    fontSize: 11,
    lineHeight: "20px",
    borderRadius: 6,
    padding: "0 8px",
    color,
    background: bg,
    flex: "none"
  });
  const refreshStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 12px",
    fontSize: 12,
    border: "1px solid var(--dsw-alias-border-l2)",
    borderRadius: 8,
    background: "transparent",
    color: "var(--dsw-alias-label-primary)",
    cursor: refreshing ? "default" : "pointer",
    transition: "border-color .18s cubic-bezier(.2,.8,.2,1), color .18s cubic-bezier(.2,.8,.2,1)"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { style: headStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { style: titleStyle, children: "\u4F59\u989D/\u914D\u989D" }),
      loaded && providers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { style: chipStyle("var(--dsw-alias-label-secondary)", "var(--dsw-alias-interactive-bg-hover)"), children: [
          providers.length,
          " \u4E2A\u4F9B\u5E94\u5546"
        ] }),
        poolCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { style: chipStyle("var(--dsw-alias-state-business-primary)", "color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)"), children: [
          poolCount,
          " \u4E2A\u79EF\u5206\u5236"
        ] }),
        alertCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { style: chipStyle("var(--dsw-alias-state-warn-primary)", "color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent)"), children: [
          alertCount,
          " \u4E2A\u544A\u8B66"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("button", { type: "button", onClick: refreshAll, disabled: refreshing || providers.length === 0, style: refreshStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("svg", { className: refreshing ? "dsh-acc-spin" : void 0, width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("path", { d: "M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3.2h-3.2", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }),
        refreshing ? "\u5237\u65B0\u4E2D" : "\u5168\u90E8\u5237\u65B0"
      ] })
    ] }),
    !loaded ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "dsh-acc-grid", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "dsh-acc-skel" }, i)) }) : providers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { style: { border: "1px solid var(--dsw-alias-border-l1)", borderRadius: 14, background: "var(--dsw-alias-bg-layer-2)", padding: "44px 20px", textAlign: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--dsw-alias-label-primary)", marginBottom: 6 }, children: "\u6682\u65E0\u53EF\u5C55\u793A\u7684\u4F59\u989D/\u8BA2\u9605\u6570\u636E" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)", lineHeight: 20 }, children: "\u914D\u7F6E\u4F9B\u5E94\u5546\u51ED\u636E\u6216\u4EA7\u751F\u7528\u91CF\u540E\uFF0C\u8FD9\u91CC\u4F1A\u51FA\u73B0\u5BF9\u5E94\u7684\u4F59\u989D\u4E0E\u914D\u989D\u5361\u7247\u3002" })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "dsh-acc-grid", children: providers.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      ProviderGroup,
      {
        provider: p,
        onRequireCredential: setCredentialFor,
        refreshKey,
        index: i
      },
      p.id
    )) }),
    credentialFor !== null && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      CredentialModal,
      {
        providerName: providers.find((p) => p.id === credentialFor)?.displayName ?? credentialFor,
        onClose: () => setCredentialFor(null),
        onSave: saveCredential
      }
    )
  ] });
}

// src/client/usage/dashboard/primitives/RangePicker.tsx
var import_react24 = require("react");
var import_jsx_runtime28 = require("react/jsx-runtime");
var STYLE_ID10 = "dsh-usage-range-picker-styles";
var SHEET9 = `
@media (max-width: 767.98px) {
  .webui-range-btn { min-height: 44px; }
  .webui-range-input { height: 44px; }
}
`;
function ensureStyle() {
  if (typeof document === "undefined") return () => {
  };
  let tag = document.getElementById(STYLE_ID10);
  if (tag === null) {
    tag = document.createElement("style");
    tag.id = STYLE_ID10;
    tag.dataset.plugin = "dsh-triad";
    tag.textContent = SHEET9;
    document.head.appendChild(tag);
  }
  return () => {
    tag?.remove();
  };
}
var PRESETS = [
  { key: "today", label: "\u4ECA\u65E5" },
  { key: "yesterday", label: "\u6628\u65E5" },
  { key: "7d", label: "\u8FD17\u5929" },
  { key: "30d", label: "\u8FD130\u5929" },
  { key: "month", label: "\u672C\u6708" },
  { key: "lastMonth", label: "\u4E0A\u6708" },
  { key: "year", label: "\u4ECA\u5E74" },
  { key: "all", label: "\u5168\u90E8" },
  { key: "custom", label: "\u81EA\u5B9A\u4E49" }
];
var btn = (active) => ({
  padding: "3px 10px",
  fontSize: 12,
  lineHeight: "18px",
  borderRadius: 999,
  border: `1px solid ${active ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-border-l1)"}`,
  cursor: "pointer",
  background: active ? "color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)" : "transparent",
  color: active ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-label-secondary)",
  boxShadow: active ? "0 0 10px color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, transparent)" : "none",
  transition: "background .22s cubic-bezier(.2,.8,.2,1), color .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s cubic-bezier(.2,.8,.2,1), border-color .22s cubic-bezier(.2,.8,.2,1)"
});
var inputStyle2 = {
  height: 26,
  padding: "0 8px",
  fontSize: 12,
  borderRadius: 6,
  border: "1px solid var(--dsw-alias-border-l1)",
  background: "var(--dsw-alias-bg-base)",
  color: "var(--dsw-alias-label-primary)",
  fontFamily: "inherit",
  colorScheme: "dark light"
};
function RangePicker({ preset, custom, onChangePreset, onChangeCustom }) {
  const range = resolveRange(preset, custom).range;
  (0, import_react24.useEffect)(() => ensureStyle(), []);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }, children: [
    PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("button", { type: "button", className: "webui-range-btn", style: btn(preset === p.key), onClick: () => onChangePreset(p.key), children: p.label }, p.key)),
    preset === "custom" && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        "input",
        {
          type: "date",
          className: "webui-range-input",
          value: range.start,
          max: range.end,
          "aria-label": "\u5F00\u59CB\u65E5\u671F",
          style: inputStyle2,
          onChange: (e) => {
            if (e.target.value !== "") onChangeCustom({ start: e.target.value, end: range.end < e.target.value ? e.target.value : range.end });
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 12 }, children: "~" }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
        "input",
        {
          type: "date",
          className: "webui-range-input",
          value: range.end,
          min: range.start,
          "aria-label": "\u7ED3\u675F\u65E5\u671F",
          style: inputStyle2,
          onChange: (e) => {
            if (e.target.value !== "") onChangeCustom({ start: range.start > e.target.value ? e.target.value : range.start, end: e.target.value });
          }
        }
      )
    ] })
  ] });
}

// src/client/usage/dashboard/Workbench.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var NAV = [
  { key: "trend", label: "\u8D8B\u52BF" },
  { key: "detail", label: "\u660E\u7EC6" },
  { key: "signal", label: "\u4FE1\u53F7" },
  { key: "accounts", label: "\u4F59\u989D/\u914D\u989D" }
];
var TAB_SIZES = {
  trend: { width: 1680, height: 1170, fill: true },
  detail: { width: 1500, height: 1080 },
  signal: { width: 1560, height: 1140 },
  accounts: { width: 1230, height: 900 }
};
var css2 = {
  topbar: { height: 48, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", borderBottom: "1px solid var(--dsw-alias-border-l1)", flex: "none" },
  tabNav: { flex: "none", display: "flex", alignItems: "center", gap: 12, padding: "8px 16px", borderBottom: "1px solid var(--dsw-alias-border-l1)", background: "var(--dsw-alias-bg-base)", flexWrap: "wrap" },
  tabGroup: { display: "flex", alignItems: "center", gap: 4 },
  // dense 胶囊（h28 r14 12px），对齐 ModelsSection 行内控件规格；选中走品牌色。
  tabItem: (active) => ({
    height: 28,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    borderRadius: 14,
    cursor: "pointer",
    border: `1px solid ${active ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-border-l2)"}`,
    background: active ? "color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)" : "transparent",
    color: active ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-label-secondary)",
    boxShadow: active ? "0 0 10px color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, transparent)" : "none",
    transition: "background .22s cubic-bezier(.2,.8,.2,1), color .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s cubic-bezier(.2,.8,.2,1), border-color .22s cubic-bezier(.2,.8,.2,1)",
    fontSize: 12,
    lineHeight: "18px",
    fontWeight: active ? 500 : 400
  }),
  content: { flex: 1, overflowY: "auto", padding: "14px 16px 32px", width: "100%", boxSizing: "border-box" },
  // 仪表盘 tab：bento 网格铺满卡片高度（内部区块各自滚动）；内容确实超高时整体兜底可滚。
  contentFill: { flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", padding: "12px 14px 14px", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" },
  title: { fontSize: 15, fontWeight: 600, color: "var(--dsw-alias-label-primary)" },
  close: { marginLeft: "auto", width: 28, height: 28, borderRadius: 6, border: "none", background: "transparent", color: "var(--dsw-alias-label-secondary)", cursor: "pointer", fontSize: 16 }
};
function Workbench({ onClose, closing = false, anchor = null, onCardMouseEnter, onCardMouseLeave, renderTab }) {
  const [tab, setTab] = (0, import_react25.useState)("trend");
  const [preset, setPreset] = (0, import_react25.useState)("today");
  const [custom, setCustom] = (0, import_react25.useState)(null);
  const close = onClose ?? (() => {
  });
  const { range, label: rangeLabel } = resolveRange(preset, custom);
  (0, import_react25.useEffect)(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return void 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply4 = () => {
      if (media.matches) document.documentElement.style.setProperty("--dsh-chart-anim", "none");
      else document.documentElement.style.removeProperty("--dsh-chart-anim");
    };
    apply4();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply4);
      return () => {
        media.removeEventListener("change", apply4);
        document.documentElement.style.removeProperty("--dsh-chart-anim");
      };
    }
    if (typeof media.addListener === "function") {
      media.addListener(apply4);
      return () => {
        media.removeListener(apply4);
        document.documentElement.style.removeProperty("--dsh-chart-anim");
      };
    }
    return void 0;
  }, []);
  const tabContent = {
    trend: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(TrendTab, { range, rangeLabel, onJumpAccounts: () => setTab("accounts"), onJumpSignal: () => setTab("signal") }),
    detail: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(UsageTab, { range, rangeLabel }),
    signal: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SignalTab, {}),
    accounts: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(AccountsTab, {})
  };
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(PopoverShell, { solid: true, closing, onClose: close, anchor, size: TAB_SIZES[tab], onCardMouseEnter, onCardMouseLeave, ariaLabel: "\u7528\u91CF\u5DE5\u4F5C\u53F0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { style: css2.topbar, children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { style: css2.title, children: "\u7528\u91CF\u5DE5\u4F5C\u53F0" }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("button", { type: "button", style: css2.close, "aria-label": "\u5173\u95ED", onClick: close, children: "\u2715" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { style: css2.tabNav, children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { style: css2.tabGroup, children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("button", { type: "button", style: css2.tabItem(tab === item.key), onClick: () => setTab(item.key), children: item.label }, item.key)) }),
      tab !== "accounts" && tab !== "signal" && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        RangePicker,
        {
          preset,
          custom,
          onChangePreset: setPreset,
          onChangeCustom: setCustom
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("main", { style: TAB_SIZES[tab].fill === true ? css2.contentFill : css2.content, className: modalStaggerClass, children: renderTab ? renderTab(tab) : tabContent[tab] })
  ] });
}

// src/client/usage/dashboard/SkillsPanel.tsx
var import_react27 = require("react");
var import_dsh_client_ui_primitives5 = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime31 = require("react/jsx-runtime");
var SKILL_ZH = {
  entry: "\u6280\u80FD",
  panelTitle: "\u6280\u80FD\u7BA1\u7406",
  close: "\u5173\u95ED",
  loading: "\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026",
  error: "\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6280\u80FD\u3002",
  retry: "\u91CD\u8BD5",
  uploadHint: "\u62D6\u5165\u6280\u80FD\u6587\u4EF6\u5939\u5B89\u88C5\uFF0C\u6216\u70B9\u51FB\u9009\u62E9",
  uploadMeta: "{n} \u4E2A\u6587\u4EF6 \xB7 {folder}",
  fileCount: "{n} \u6587\u4EF6",
  expandSkillFiles: "\u5C55\u5F00\u6280\u80FD\u6587\u4EF6",
  previewLoading: "\u6B63\u5728\u52A0\u8F7D\u5185\u5BB9\u2026",
  viewSkillFiles: "\u67E5\u770B\u6280\u80FD\u6587\u4EF6",
  viewerNav: "\u6280\u80FD\u6587\u4EF6",
  assignToBundle: "\u5F52\u5165 Bundle",
  assignTitle: "\u5C06\u300C{name}\u300D\u5F52\u5165",
  assignEmpty: "\u8FD8\u6CA1\u6709\u6280\u80FD\u5305,\u5148\u70B9\u300C\u65B0\u5EFA Bundle\u300D\u521B\u5EFA\u4E00\u4E2A\u3002",
  deleteSkillBtn: "\u5220\u9664\u6280\u80FD",
  installName: "\u6280\u80FD\u540D\u79F0",
  installNamePlaceholder: "\u4F8B\u5982 my-skill",
  installDescription: "\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09",
  installNameFromArchive: "\u6280\u80FD\u540D\u53D6\u81EA\u538B\u7F29\u5305\u5185\u7684 SKILL.md",
  installNameInvalid: "\u6280\u80FD\u540D\u53EA\u80FD\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u8FDE\u5B57\u7B26\uFF08a-z 0-9 -\uFF09",
  installBundle: "\u5F52\u5165 Bundle",
  installLoose: "\u4E0D\u5F52\u7EC4\uFF08\u6563\u88C5\uFF09",
  installConfirm: "\u5B89\u88C5",
  installCancel: "\u53D6\u6D88",
  bundlesTitle: "\u6280\u80FD\u5305",
  bundlesEmpty: "\u8FD8\u6CA1\u6709\u6280\u80FD\u5305\uFF0C\u70B9\u300C\u65B0\u5EFA Bundle\u300D\u521B\u5EFA\u4E00\u4E2A\u3002",
  bundleNoSkills: "\u8FD8\u6CA1\u6709\u6280\u80FD\uFF0C\u53EF\u4E0A\u4F20\u6216\u4ECE\u6563\u88C5\u6280\u80FD\u4E2D\u5F52\u5165\u3002",
  newBundle: "\u65B0\u5EFA Bundle",
  newBundlePlaceholder: "Bundle \u540D\u79F0",
  create: "\u521B\u5EFA",
  cancel: "\u53D6\u6D88",
  renameBundlePlaceholder: "\u65B0\u7684 Bundle \u540D\u79F0",
  rename: "\u91CD\u547D\u540D",
  delete: "\u5220\u9664",
  skillsCount: "{n} \u4E2A\u6280\u80FD",
  removeSkill: "\u79FB\u51FA",
  looseTitle: "\u6563\u88C5\u6280\u80FD",
  looseEmpty: "\u6CA1\u6709\u6563\u88C5 Skill",
  deleteBundleConfirm: "\u5220\u9664 Bundle\u300C{name}\u300D\uFF1F\u5176\u4E2D\u7684\u6280\u80FD\u5C06\u53D8\u4E3A\u6563\u88C5\u3002",
  deleteSkillConfirm: "\u5220\u9664\u6280\u80FD\u300C{name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u5B83\u7684\u6587\u4EF6\u3002",
  enableSkill: "\u542F\u7528",
  disableSkill: "\u7981\u7528",
  enableBundle: "\u542F\u7528\u5168\u90E8",
  disableBundle: "\u7981\u7528\u5168\u90E8",
  toggleFailed: "\u5207\u6362\u5931\u8D25\uFF1A{message}",
  presetAll: "\u5168\u90E8",
  presetAllName: "\u5168\u90E8 Agent",
  presetStripLabel: "Agent \u9884\u8BBE",
  presetHintAll: "\u5F53\u524D\u7F16\u8F91\u300C\u5168\u90E8 Agent\u300D\uFF1A\u5F00\u5173\u76F4\u63A5\u6539\u6280\u80FD\u6587\u4EF6\uFF0C\u5BF9\u6240\u6709\u9884\u8BBE\u751F\u6548\u3002",
  presetHintScoped: "\u5F53\u524D\u7F16\u8F91\u300C{name}\u300D\uFF1A\u53EA\u5BF9\u8BE5 Agent \u9884\u8BBE\u751F\u6548\uFF0C\u5176\u5B83\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\u3002",
  presetReset: "\u6E05\u7A7A\u8BE5\u9884\u8BBE\u7684\u5355\u72EC\u8BBE\u7F6E",
  presetDefaultTag: "\u9ED8\u8BA4",
  presetOverrideCount: "{n} \u9879\u5355\u72EC\u8BBE\u7F6E",
  presetLockedByGlobal: "\u300C\u5168\u90E8 Agent\u300D\u5C42\u5DF2\u7981\u7528\uFF0C\u9884\u8BBE\u5C42\u65E0\u6CD5\u6253\u5F00",
  // 卡片（Skills Hub 风格）文案
  copySkillName: "\u590D\u5236\u6280\u80FD\u540D",
  copiedSkillName: "\u5DF2\u590D\u5236",
  toolsLabel: "\u5DE5\u5177",
  scopeAll: "\u5168\u5C40",
  tagLoose: "\u6563\u88C5",
  // Skills Hub 页面文案
  hubSubtitle: "Skill \u540C\u6B65\u5DE5\u4F5C\u533A",
  hubWorkspace: "\u5DE5\u4F5C\u533A",
  hubManage: "\u7BA1\u7406",
  hubMySkills: "\u6211\u7684\u6280\u80FD",
  hubAddSkills: "\u6DFB\u52A0\u6280\u80FD",
  hubBundles: "\u6280\u80FD\u5305",
  hubPresets: "Agent \u9884\u8BBE",
  hubLoose: "\u6563\u88C5\u6280\u80FD",
  statManaged: "\u7BA1\u7406\u7684\u6280\u80FD",
  statEnabled: "\u5168\u5C40\u542F\u7528",
  statLoose: "\u6563\u88C5\u6280\u80FD",
  statSync: "\u540C\u6B65\u72B6\u6001",
  statHealthy: "\u5168\u90E8\u5065\u5EB7",
  statChecking: "\u68C0\u6D4B\u4E2D\u2026",
  statIssues: "{n} \u4E2A\u95EE\u9898",
  statUnknown: "\u68C0\u6D4B\u5931\u8D25",
  statPending: "\u5F85\u68C0\u6D4B",
  searchPlaceholder: "\u641C\u7D22\u6280\u80FD\u2026",
  filterAll: "\u5168\u90E8",
  filterBundles: "\u6280\u80FD\u5305",
  filterLoose: "\u6563\u88C5\u6280\u80FD",
  sortLabel: "\u540D\u79F0",
  bulk: "\u6279\u91CF",
  bulkEnableAll: "\u5168\u90E8\u542F\u7528",
  bulkDisableAll: "\u5168\u90E8\u7981\u7528",
  presetSelect: "Agent \u9884\u8BBE",
  viewList: "\u5217\u8868",
  viewGrid: "\u7F51\u683C",
  bannerTitle: "\u6DFB\u52A0\u6280\u80FD",
  bannerSub: "\u62D6\u5165\u6280\u80FD\u6587\u4EF6\u5939\u5B89\u88C5\uFF0C\u6216\u70B9\u51FB\u6D4F\u89C8\u9009\u62E9",
  bannerDiscovered: "\u53D1\u73B0\u5F85\u5BFC\u5165\u6280\u80FD",
  bannerFound: "\u53D1\u73B0 {n} \u4E2A\u6587\u4EF6\uFF08{folder}\uFF09\u5F85\u5BFC\u5165",
  bannerBtnBrowse: "\u6D4F\u89C8\u5E76\u5BFC\u5165",
  bannerBtnReview: "\u5BA1\u67E5\u5E76\u5BFC\u5165",
  noMatch: "\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u6761\u4EF6\u7684\u6280\u80FD"
};
function skillT(key, params) {
  let text = SKILL_ZH[key] ?? key;
  if (params) {
    for (const k of Object.keys(params)) text = text.split(`{${k}}`).join(String(params[k]));
  }
  return text;
}
var SKILL_API_BASE = "/api/skill-manager";
async function skillRequest(path, options) {
  const response = await fetch(SKILL_API_BASE + path, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "request failed (" + String(response.status) + ")");
  return body;
}
var skillApi = {
  list: () => skillRequest("/list", { headers: { accept: "application/json" } }),
  toggleStatus: () => fetch("/api/skill-toggles/status", { headers: { accept: "application/json" } }).then((response) => response.json()).then((body) => {
    if (typeof body !== "object" || body === null || body.skills === void 0) {
      throw new Error("toggle status unavailable");
    }
    return body;
  }),
  setSkillEnabled: (name, enabled) => fetch(`/api/skill-toggles/skills/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ enabled })
  }).then((response) => response.json()).then((body) => {
    if (!body.ok) throw new Error(body.error || "toggle failed");
    return body;
  }),
  setBundleEnabled: (bundleId, enabled) => fetch(`/api/skill-toggles/bundles/${encodeURIComponent(bundleId)}`, {
    method: "PUT",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ enabled })
  }).then((response) => response.json()).then((body) => {
    if (!body.ok) throw new Error(body.error || "toggle failed");
    return body;
  }),
  /** 预设名单 + 各预设覆盖 + 全局层状态(一次拉齐)。 */
  presetStatus: () => fetch("/api/skill-toggles/presets", { headers: { accept: "application/json" } }).then((response) => response.json()).then((body) => {
    if (typeof body !== "object" || body === null || !Array.isArray(body.presets)) {
      throw new Error("preset status unavailable");
    }
    return body;
  }),
  setPresetSkillEnabled: (presetId, name, enabled) => fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/skills/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ enabled })
  }).then((response) => response.json()).then((body) => {
    if (!body.ok) throw new Error(body.error || "toggle failed");
    return body;
  }),
  setPresetBundleEnabled: (presetId, bundleId, enabled) => fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/bundles/${encodeURIComponent(bundleId)}`, {
    method: "PUT",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ enabled })
  }).then((response) => response.json()).then((body) => {
    if (!body.ok) throw new Error(body.error || "toggle failed");
    return body;
  }),
  resetPreset: (presetId) => fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/reset`, {
    method: "POST",
    headers: { accept: "application/json" }
  }).then((response) => response.json()).then((body) => {
    if (!body.ok) throw new Error(body.error || "reset failed");
    return body;
  }),
  createBundle: (name) => skillRequest("/bundles", { method: "POST", headers: { accept: "application/json", "content-type": "application/json" }, body: JSON.stringify({ name }) }),
  renameBundle: (bundleId, name) => skillRequest(`/bundles/${encodeURIComponent(bundleId)}`, { method: "PATCH", headers: { accept: "application/json", "content-type": "application/json" }, body: JSON.stringify({ name }) }),
  deleteBundle: (bundleId) => skillRequest(`/bundles/${encodeURIComponent(bundleId)}`, { method: "DELETE", headers: { accept: "application/json" } }),
  setBundleSkills: (bundleId, skillNames) => skillRequest(`/bundles/${encodeURIComponent(bundleId)}/skills`, { method: "PUT", headers: { accept: "application/json", "content-type": "application/json" }, body: JSON.stringify({ skillNames }) }),
  deleteSkill: (name) => skillRequest(`/skills/${encodeURIComponent(name)}`, { method: "DELETE", headers: { accept: "application/json" } }),
  installSkill: (input) => skillRequest("/skills", { method: "POST", headers: { accept: "application/json", "content-type": "application/json" }, body: JSON.stringify(input) }),
  /** 技能目录健康检查：只读扫描（缺 SKILL.md / frontmatter 无效 / 名称不一致 / 账本悬挂引用）。 */
  health: () => fetch("/api/skill-health", { headers: { accept: "application/json" } }).then((response) => response.json()).then((body) => {
    if (typeof body !== "object" || body === null || !Array.isArray(body.issues)) {
      throw new Error("health unavailable");
    }
    return body;
  })
};
var css3 = {
  entry: "skm-entry",
  label: "skm-label",
  modal: "skm-modal",
  modalBody: "skm-modal-body",
  panel: "skm-panel",
  topRow: "skm-top-row",
  newBundleButton: "skm-new-bundle",
  upload: "skm-upload",
  uploadActive: "skm-upload-active",
  hiddenInput: "skm-hidden-input",
  installForm: "skm-install-form",
  installRow: "skm-install-row",
  inlineForm: "skm-inline-form",
  // 块级变体：改名输入行独占一整行（整行内容保留，表单追加在其下方）。
  inlineFormBlock: "skm-inline-form-block",
  inlineInput: "skm-inline-input",
  bundleSelect: "skm-bundle-select",
  installMeta: "skm-install-meta",
  installActions: "skm-install-actions",
  sectionTitle: "skm-section-title",
  status: "skm-status",
  failure: "skm-failure",
  error: "skm-error",
  bundleList: "skm-bundle-list",
  bundle: "skm-bundle",
  bundleRow: "skm-bundle-row",
  bundleName: "skm-bundle-name",
  bundleCount: "skm-bundle-count",
  chevron: "skm-chevron",
  bundleActions: "skm-bundle-actions",
  iconAction: "skm-icon-action",
  skillList: "skm-skill-list",
  skillItem: "skm-skill-item",
  skillRow: "skm-skill-row",
  skillLabel: "skm-skill-label",
  skillName: "skm-skill-name",
  skillDescription: "skm-skill-desc",
  skillExpand: "skm-skill-expand",
  skillCount: "skm-skill-count",
  skillCompat: "skm-skill-compat",
  // 技能卡片（Skills Hub 风格）
  skillGrid: "skm-skill-grid",
  skillCard: "skm-skill-card",
  skillCardHead: "skm-skill-card-head",
  skillIcon: "skm-skill-icon",
  skillTitleWrap: "skm-skill-title-wrap",
  skillTitle: "skm-skill-title",
  skillCopy: "skm-skill-copy",
  skillCardToggle: "skm-skill-card-toggle",
  skillDesc: "skm-skill-card-desc",
  skillTags: "skm-skill-tags",
  tag: "skm-tag",
  tagSource: "skm-tag-source",
  tagScope: "skm-tag-scope",
  skillMeta: "skm-skill-meta",
  skillCardFoot: "skm-skill-card-foot",
  skillFootLabel: "skm-skill-foot-label",
  skillFootIcon: "skm-skill-foot-icon",
  skillCardActions: "skm-skill-card-actions",
  // Skills Hub 页面结构
  hub: "skm-hub",
  hubSide: "skm-hub-side",
  hubBrand: "skm-hub-brand",
  hubLogo: "skm-hub-logo",
  hubBrandText: "skm-hub-brand-text",
  hubBrandTitle: "skm-hub-brand-title",
  hubBrandSub: "skm-hub-brand-sub",
  hubGroup: "skm-hub-group",
  hubItem: "skm-hub-item",
  hubItemActive: "skm-hub-item-active",
  hubItemIcon: "skm-hub-item-icon",
  hubItemLabel: "skm-hub-item-label",
  hubItemCount: "skm-hub-item-count",
  hubMain: "skm-hub-main",
  statsRow: "skm-stats-row",
  stat: "skm-stat",
  statLabel: "skm-stat-label",
  statValue: "skm-stat-value",
  statValueInline: "skm-stat-value-inline",
  statDot: "skm-stat-dot",
  toolbar: "skm-toolbar",
  searchBox: "skm-search-box",
  searchInput: "skm-search-input",
  toolSelectWrap: "skm-tool-select-wrap",
  toolSelect: "skm-tool-select",
  toolSelectChevron: "skm-tool-select-chevron",
  dropWrap: "skm-drop-wrap",
  dropMenu: "skm-drop-menu",
  dropItem: "skm-drop-item",
  dropCheck: "skm-drop-check",
  dropBadge: "skm-drop-badge",
  toolButton: "skm-tool-button",
  toolbarSpacer: "skm-toolbar-spacer",
  bulkWrap: "skm-bulk-wrap",
  bulkOverlay: "skm-bulk-overlay",
  bulkMenu: "skm-bulk-menu",
  bulkItem: "skm-bulk-item",
  bulkDot: "skm-bulk-dot",
  presetPill: "skm-preset-pill",
  presetSelect: "skm-preset-select",
  presetPillChevron: "skm-preset-pill-chevron",
  presetPillLabel: "skm-preset-pill-label",
  viewToggle: "skm-view-toggle",
  viewBtn: "skm-view-btn",
  hintRow: "skm-hint-row",
  hintRowText: "skm-hint-row-text",
  banner: "skm-banner",
  bannerActive: "skm-banner-active",
  bannerIcon: "skm-banner-icon",
  bannerText: "skm-banner-text",
  bannerTitle: "skm-banner-title",
  bannerSub: "skm-banner-sub",
  bannerBtn: "skm-banner-btn",
  mainScroll: "skm-main-scroll",
  hubSection: "skm-hub-section",
  hubSectionHead: "skm-hub-section-head",
  skillGridList: "skm-skill-grid-list",
  noResult: "skm-no-result",
  // 归入技能包弹窗（卡片化）
  assignModal: "skm-assign-modal",
  assignModalBody: "skm-assign-modal-body",
  assignList: "skm-assign-list",
  assignCard: "skm-assign-card",
  assignCardIcon: "skm-assign-card-icon",
  assignCardBody: "skm-assign-card-body",
  assignCardName: "skm-assign-card-name",
  assignCardDesc: "skm-assign-card-desc",
  assignGo: "skm-assign-go",
  // 同步状态健康检查
  healthNotice: "skm-health-notice",
  healthNoticeTitle: "skm-health-notice-title",
  skillFiles: "skm-skill-files",
  skillFile: "skm-skill-file",
  skillPreview: "skm-skill-preview",
  viewerModal: "skm-viewer-modal",
  viewerBody: "skm-viewer-body",
  viewerLayout: "skm-viewer-layout",
  viewerNav: "skm-viewer-nav",
  viewerNavItem: "skm-viewer-nav-item",
  viewerNavDir: "skm-viewer-nav-dir",
  viewerContent: "skm-viewer-content",
  looseEmpty: "skm-loose-empty",
  visuallyHidden: "skm-visually-hidden",
  // 技能/技能包开关
  toggle: "skm-toggle",
  toggleOn: "skm-toggle-on",
  toggleOff: "skm-toggle-off",
  toggleKnob: "skm-toggle-knob",
  bundleToggle: "skm-bundle-toggle",
  // Agent 预设分类（圆球）
  presetStrip: "skm-preset-strip",
  presetBallWrap: "skm-preset-ball-wrap",
  presetBall: "skm-preset-ball",
  presetBallLabel: "skm-preset-ball-label",
  presetHint: "skm-preset-hint",
  presetHintText: "skm-preset-hint-text",
  presetReset: "skm-preset-reset"
};
var STYLE_ID11 = "dsh-skill-manager-styles";
var SHEET10 = `
.skm-entry{flex:1 1 50%;min-width:0;display:inline-flex;align-items:center;gap:8px;height:32px;box-sizing:border-box;border:none;border-radius:10px;padding:0 8px;background:transparent;cursor:pointer;color:var(--dsw-alias-label-primary,#eee);font-family:inherit;font-size:14px;line-height:20px;overflow:hidden}
.skm-entry:hover{background:transparent}
.skm-entry[aria-expanded='true']{background:transparent;color:var(--dsw-alias-label-primary,#eee)}
.skm-entry:focus,.skm-entry:focus-visible{outline:none;border:none}
.skm-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-modal-body{overflow:hidden;display:flex;flex-direction:column}
.skm-panel{flex:1;min-height:0;display:flex;flex-direction:column;gap:8px;overflow-y:auto;padding:2px 2px 6px;box-sizing:border-box}
.skm-top-row{flex:none;display:flex;align-items:center;justify-content:flex-end;gap:8px}
.skm-new-bundle{flex:none;display:inline-flex;align-items:center;gap:4px;appearance:none;border:none;border-radius:12px;padding:4px 10px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#999);background:transparent;cursor:pointer}
.skm-new-bundle:hover,.skm-new-bundle[aria-expanded='true']{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.skm-upload{flex:none;display:flex;align-items:center;justify-content:center;gap:8px;min-height:56px;padding:10px 12px;box-sizing:border-box;border:1px dashed var(--dsw-alias-border-l3,#444);border-radius:12px;color:var(--dsw-alias-label-tertiary,#888);font-size:12px;line-height:18px;text-align:center;cursor:pointer;user-select:none}
.skm-upload:hover{border-color:var(--dsw-alias-state-business-primary,#4a9eff);color:var(--dsw-alias-label-secondary,#bbb)}
.skm-upload-active{border-color:var(--dsw-alias-state-business-primary,#4a9eff);background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-hidden-input{display:none}
.skm-install-form{flex:none;display:flex;flex-direction:column;gap:8px;padding:10px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));border-radius:12px;background:var(--dsw-alias-bg-layer-1,#1c1f26)}
.skm-install-row{display:flex;flex-direction:column;gap:6px}
.skm-inline-form{flex:none;display:flex;align-items:center;gap:6px}
/* \u5757\u7EA7\u53D8\u4F53\uFF1Awidth:100% \u8BA9\u5B83\u5728 .skm-bundle\uFF08flex-wrap\uFF09\u91CC\u81EA\u52A8\u6362\u884C\u72EC\u5360\u4E00\u884C\uFF0C
   \u8F93\u5165\u6846\u56E0\u6B64\u80FD\u5403\u6EE1\u6574\u884C\u5BBD\u5EA6\uFF0C\u4E0D\u5FC5\u88AB\u4E24\u4E2A\u6309\u94AE\u6324\u5230\u53EA\u5269\u9ED8\u8BA4 20 \u5B57\u7B26\u3002 */
.skm-inline-form-block{width:100%;box-sizing:border-box;padding:0 8px 8px;animation:skm-form-in 160ms ease-out}
@keyframes skm-form-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
/* \u6539\u540D\u6210\u529F\uFF1A\u5361\u7247\u8FB9\u6846\u9AD8\u4EAE\u8109\u51B2\uFF081 \u79D2\u540E\u56DE\u843D\uFF09\uFF0C\u4E0E\u6574\u4F53\u6DF1\u8272\u5361\u7247\u8282\u594F\u4E00\u81F4 */
.skm-bundle[data-renamed='true']{animation:skm-card-pop 900ms ease-out}
@keyframes skm-card-pop{0%{border-color:var(--dsw-alias-state-business-primary,#4a9eff);box-shadow:0 0 0 1px var(--dsw-alias-state-business-primary,#4a9eff)}55%{border-color:var(--dsw-alias-state-business-primary,#4a9eff);box-shadow:0 0 0 1px var(--dsw-alias-state-business-primary,#4a9eff)}100%{border-color:var(--dsw-alias-border-l1,rgba(255,255,255,.08));box-shadow:none}}
.skm-inline-input{flex:1;min-width:0;height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));border-radius:8px;padding:0 10px;font-size:13px;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-base,#0e1116)}
.skm-inline-input::placeholder{color:var(--dsw-alias-label-tertiary,#888)}
.skm-bundle-select{display:flex;align-items:center}
.skm-bundle-select select{flex:1;height:32px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));border-radius:8px;padding:0 8px;font-size:13px;color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-bg-base,#0e1116)}
.skm-install-meta{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.skm-install-actions{display:flex;align-items:center;gap:6px}
.skm-section-title{margin:6px 2px 0;font-size:12px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb)}
.skm-status{margin:2px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#888)}
.skm-failure{display:flex;align-items:center;gap:8px}
.skm-failure p{margin:2px;font-size:13px;line-height:20px;color:var(--dsw-alias-state-error-primary,#e0434b)}
.skm-error{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-state-error-primary,#e0434b)}
.skm-bundle-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.skm-bundle{display:flex;flex-wrap:wrap;align-items:center;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.05));border-radius:14px;overflow:hidden;background:var(--dsw-alias-bg-base,#fff);box-shadow:0 1px 2px rgba(16,24,40,.03);transition:border-color 160ms ease,box-shadow 160ms ease}
.skm-bundle:hover{border-color:var(--dsw-alias-border-l2,rgba(0,0,0,.1))}
.skm-bundle-row{flex:1;min-width:0;display:inline-flex;align-items:center;gap:8px;appearance:none;border:none;background:transparent;padding:6px 2px;font-size:15px;cursor:pointer;color:var(--dsw-alias-label-primary,#0f1115);font-family:inherit;border-radius:8px;transition:background 140ms ease}
.skm-bundle-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.03))}
.skm-bundle-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;display:inline-flex;align-items:center;gap:6px}
.skm-bundle-count{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#61666b);background:var(--dsw-alias-bg-module-platform,#f1f3f5);border-radius:999px;padding:0 8px;white-space:nowrap}
.skm-chevron{flex:none;margin-left:auto;color:var(--dsw-alias-label-tertiary,#888);transition:transform 120ms}
.skm-bundle[data-open='true'] .skm-chevron{transform:rotate(180deg)}
.skm-bundle-actions{margin-left:auto;display:flex;align-items:center;gap:2px;padding-right:2px}
.skm-icon-action{flex:none;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;border-radius:50%;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-tertiary,#888);transition:background 140ms ease,color 140ms ease,transform 140ms ease}
.skm-icon-action:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));color:var(--dsw-alias-label-primary,#0f1115)}
.skm-icon-action:active{transform:scale(.9)}

/* \u2500\u2500 \u6280\u80FD\u5361\u7247\uFF08Skills Hub \u98CE\u683C\uFF09\uFF1A\u53CC\u5217\u7F51\u683C\uFF1B\u5217\u8868\u89C6\u56FE\u5207\u5355\u5217\u5BBD\u5361 \u2500\u2500 */
.skm-skill-grid{list-style:none;margin:8px 0 0;padding:0;width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;box-sizing:border-box}
.skm-skill-grid-list{grid-template-columns:minmax(0,1fr)}
.skm-skill-grid > .skm-status{grid-column:1/-1;padding-top:4px}
.skm-skill-card{position:relative;min-width:0;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:16px;background:var(--dsw-alias-bg-base,#fff);padding:14px 16px 0;overflow:hidden;opacity:0;animation:skm-card-in 260ms cubic-bezier(.2,.7,.3,1.06) forwards;animation-delay:calc(var(--skm-i,0)*40ms);transition:border-color 160ms ease,box-shadow 160ms ease,transform 160ms ease}
.skm-skill-card:hover{border-color:var(--dsw-alias-border-l3,rgba(0,0,0,.16));box-shadow:0 3px 14px rgba(16,24,40,.08);transform:translateY(-1px)}
@keyframes skm-card-in{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}
.skm-skill-card-head{display:flex;align-items:center;gap:10px;min-width:0}
.skm-skill-icon{flex:none;width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.08));border-radius:12px;background:var(--dsw-alias-bg-module-platform,#f5f6f7);color:var(--dsw-alias-label-secondary,#61666b);transition:color 160ms ease,border-color 160ms ease,transform 160ms ease}
.skm-skill-card:hover .skm-skill-icon{color:var(--dsw-alias-label-primary,#0f1115);border-color:var(--dsw-alias-border-l3,rgba(0,0,0,.14));transform:scale(1.05)}
.skm-skill-title-wrap{flex:1;min-width:0;display:flex;align-items:center;gap:6px}
.skm-skill-title{flex:1;min-width:0;font-size:15px;font-weight:600;line-height:22px;color:var(--dsw-alias-label-primary,#0f1115);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-skill-copy{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:none;border-radius:6px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-caption,#adb2b8);opacity:.55;transition:opacity 140ms ease,color 140ms ease,background 140ms ease,transform 140ms ease}
.skm-skill-copy:hover{opacity:1;color:var(--dsw-alias-label-secondary,#61666b);background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.04));transform:scale(1.08)}
.skm-skill-copy:active{transform:scale(.9)}
.skm-skill-copy[data-copied='true']{opacity:1;color:var(--dsw-alias-state-success-primary,#22c55e)}
.skm-skill-card-toggle{flex:none;display:inline-flex;align-items:center}
.skm-skill-card-desc{margin:8px 0 0;font-size:13px;line-height:19px;color:var(--dsw-alias-label-tertiary,#81858c);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-skill-tags{display:flex;align-items:center;gap:8px;margin-top:12px;min-width:0}
.skm-tag{flex:none;display:inline-flex;align-items:center;height:22px;padding:0 10px;border-radius:999px;font-size:12px;line-height:20px;box-sizing:border-box;white-space:nowrap;transition:color 160ms ease,border-color 160ms ease,background 160ms ease}
.skm-tag-source{background:var(--dsw-alias-bg-module-platform,#f1f3f5);color:var(--dsw-alias-label-secondary,#61666b)}
.skm-tag-scope{border:1px solid var(--dsw-alias-state-success-primary,#22c55e);color:var(--dsw-alias-state-success-primary,#22c55e);background:transparent}
.skm-tag-scope[data-off='true']{border-color:var(--dsw-alias-border-l2,rgba(0,0,0,.12));color:var(--dsw-alias-label-tertiary,#81858c)}
.skm-skill-meta{margin-left:auto;flex:none;font-size:12px;line-height:17px;color:var(--dsw-alias-label-caption,#adb2b8);white-space:nowrap}
.skm-skill-card-foot{display:flex;align-items:center;gap:6px;margin:12px -16px 0;padding:8px 14px 8px 16px;border-top:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.06))}
.skm-skill-foot-label{flex:none;font-size:12px;line-height:17px;color:var(--dsw-alias-label-caption,#adb2b8)}
.skm-skill-foot-icon{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:none;border-radius:8px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-secondary,#61666b);transition:background 140ms ease,color 140ms ease,transform 140ms ease}
.skm-skill-foot-icon:hover{background:var(--dsw-alias-interactive-bg-hover-solid,#f1f3f5);color:var(--dsw-alias-label-primary,#0f1115);transform:scale(1.05)}
.skm-skill-foot-icon:active{transform:scale(.92)}
.skm-skill-foot-icon:disabled{opacity:.38;cursor:default}
.skm-skill-foot-icon:disabled:hover{background:transparent;color:var(--dsw-alias-label-secondary,#61666b);transform:none}
.skm-skill-card-actions{margin-left:auto;display:flex;align-items:center;gap:4px}

/* \u2500\u2500 Skills Hub \u9875\u9762\u9AA8\u67B6\uFF1A\u4FA7\u680F / \u7EDF\u8BA1\u884C / \u5DE5\u5177\u680F / \u6A2A\u5E45 / \u5206\u533A \u2500\u2500 */
.skm-hub{flex:1 1 auto;min-height:0;display:flex;min-width:0;background:var(--dsw-alias-bg-base,#fff)}
.skm-hub-side{flex:none;width:208px;box-sizing:border-box;padding:14px 10px 16px;border-right:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.06));background:var(--dsw-alias-bg-module-platform,#fafbfc);overflow-y:auto;display:flex;flex-direction:column;gap:2px}
.skm-hub-brand{display:flex;align-items:center;gap:10px;padding:2px 8px 12px}
.skm-hub-logo{flex:none;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;color:#fff;background:linear-gradient(135deg,#4a7df0,#2f5fd7);box-shadow:0 2px 6px rgba(47,95,215,.35);transition:transform 160ms ease}
.skm-hub-brand:hover .skm-hub-logo{transform:rotate(-6deg) scale(1.05)}
.skm-hub-brand-text{min-width:0;display:flex;flex-direction:column}
.skm-hub-brand-title{font-size:15px;font-weight:700;line-height:20px;color:var(--dsw-alias-label-primary,#0f1115)}
.skm-hub-brand-sub{font-size:11px;line-height:15px;color:var(--dsw-alias-label-tertiary,#81858c)}
.skm-hub-group{margin:10px 8px 4px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-caption,#adb2b8)}
.skm-hub-item{flex:none;display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;border:1px solid transparent;border-radius:12px;padding:8px 10px;background:transparent;cursor:pointer;font-family:inherit;color:var(--dsw-alias-label-secondary,#61666b);transition:background 140ms ease,border-color 140ms ease,color 140ms ease,box-shadow 140ms ease}
.skm-hub-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.03));color:var(--dsw-alias-label-primary,#0f1115)}
.skm-hub-item[data-active]{border-color:var(--dsw-alias-border-l2,rgba(0,0,0,.1));background:var(--dsw-alias-bg-base,#fff);box-shadow:0 1px 3px rgba(16,24,40,.05);color:var(--dsw-alias-label-primary,#0f1115)}
.skm-hub-item-icon{flex:none;display:inline-flex;width:18px;height:18px;align-items:center;justify-content:center;color:var(--dsw-alias-label-caption,#adb2b8);transition:color 140ms ease}
.skm-hub-item[data-active] .skm-hub-item-icon,.skm-hub-item:hover .skm-hub-item-icon{color:var(--dsw-alias-label-secondary,#61666b)}
.skm-hub-item-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left;font-size:13px;line-height:18px}
.skm-hub-item-count{flex:none;font-size:12px;line-height:16px;color:var(--dsw-alias-label-caption,#adb2b8)}
.skm-hub-main{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden}
.skm-stats-row{flex:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px 16px 0}
.skm-stat{min-width:0;display:flex;flex-direction:column;gap:6px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:14px;background:var(--dsw-alias-bg-base,#fff);padding:10px 14px;box-shadow:0 1px 2px rgba(16,24,40,.03);opacity:0;animation:skm-card-in 260ms cubic-bezier(.2,.7,.3,1.06) forwards}
.skm-stat:nth-child(1){animation-delay:20ms}
.skm-stat:nth-child(2){animation-delay:70ms}
.skm-stat:nth-child(3){animation-delay:120ms}
.skm-stat:nth-child(4){animation-delay:170ms}
.skm-stat-label{font-size:12px;line-height:17px;color:var(--dsw-alias-label-secondary,#61666b)}
.skm-stat-value{font-size:26px;font-weight:700;line-height:32px;color:var(--dsw-alias-label-primary,#0f1115);font-variant-numeric:tabular-nums}
.skm-stat-value-inline{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;line-height:22px}
.skm-stat-dot{flex:none;width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-state-success-primary,#22c55e);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-success-primary,#22c55e) 18%,transparent)}
.skm-stat-dot[data-tone='warn']{background:var(--dsw-alias-state-warn-primary,#e8a33d);box-shadow:0 0 0 3px rgba(232,163,61,.18)}
.skm-stat-dot[data-tone='pending']{background:var(--dsw-alias-border-l3,rgba(0,0,0,.2));box-shadow:0 0 0 3px rgba(0,0,0,.05)}
.skm-stat-value[data-tone='warn']{color:#b45309}
.skm-stat-value[data-tone='pending']{color:var(--dsw-alias-label-tertiary,#81858c)}
.skm-health-notice{flex:none;margin:8px 16px 0;box-sizing:border-box;border:1px solid #f0cf9e;border-radius:10px;background:#fdf6e3;padding:8px 12px;display:flex;flex-direction:column;gap:4px;animation:skm-form-in 180ms ease-out}
.skm-health-notice-title{font-size:12px;font-weight:700;line-height:17px;color:#b45309}
.skm-health-notice ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.skm-health-notice li{font-size:12px;line-height:17px;color:#8a5a17}
.skm-toolbar{flex:none;display:flex;align-items:center;gap:8px;padding:12px 16px 4px;flex-wrap:wrap}
.skm-search-box{flex:1;min-width:170px;display:flex;align-items:center;gap:8px;height:36px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-base,#fff);padding:0 12px;color:var(--dsw-alias-label-caption,#adb2b8);transition:border-color 140ms ease,box-shadow 140ms ease}
.skm-search-box:focus-within{border-color:var(--dsw-alias-state-business-primary,#4176e6);box-shadow:0 0 0 3px rgba(65,118,230,.14)}
.skm-search-input{flex:1;min-width:0;border:none;outline:none;background:transparent;font-size:13px;line-height:18px;color:var(--dsw-alias-label-primary,#0f1115);font-family:inherit}
.skm-search-input::placeholder{color:var(--dsw-alias-label-caption,#adb2b8)}
.skm-tool-select-wrap{position:relative;flex:none;display:inline-flex;align-items:center}
.skm-tool-select{appearance:none;-webkit-appearance:none;height:36px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#61666b);font-size:13px;line-height:18px;font-family:inherit;padding:0 26px 0 12px;cursor:pointer;transition:border-color 140ms ease,background 140ms ease}
.skm-tool-select:hover{border-color:var(--dsw-alias-border-l3,rgba(0,0,0,.18))}
.skm-tool-select:focus-visible{outline:none;border-color:var(--dsw-alias-state-business-primary,#4176e6)}
.skm-tool-select-chevron{position:absolute;right:9px;pointer-events:none;color:var(--dsw-alias-label-caption,#adb2b8)}
.skm-tool-button{flex:none;display:inline-flex;align-items:center;gap:6px;height:36px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#61666b);font-size:13px;line-height:18px;font-family:inherit;padding:0 12px;cursor:pointer;transition:border-color 140ms ease,background 140ms ease,color 140ms ease,transform 140ms ease}
.skm-tool-button:hover{background:var(--dsw-alias-interactive-bg-hover-solid,#f7f8f9);color:var(--dsw-alias-label-primary,#0f1115)}
.skm-tool-button:active{transform:scale(.97)}
.skm-tool-button:disabled{opacity:.5;cursor:default}
.skm-toolbar-spacer{flex:1 1 12px}
.skm-bulk-wrap{position:relative;flex:none}
.skm-bulk-overlay{position:fixed;inset:0;z-index:995;border:none;background:transparent;cursor:default;padding:0}
.skm-bulk-menu{position:absolute;top:calc(100% + 4px);left:0;z-index:996;min-width:150px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-layer-1,#fff);box-shadow:0 6px 20px rgba(16,24,40,.12);padding:4px;display:flex;flex-direction:column;gap:2px;animation:skm-form-in 140ms ease-out}
.skm-bulk-item{display:flex;align-items:center;gap:8px;border:none;border-radius:8px;padding:7px 10px;background:transparent;font-size:13px;line-height:18px;color:var(--dsw-alias-label-secondary,#61666b);cursor:pointer;font-family:inherit;text-align:left;transition:background 120ms ease,color 120ms ease}
.skm-bulk-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.04));color:var(--dsw-alias-label-primary,#0f1115)}
.skm-bulk-item:disabled{opacity:.5;cursor:default}
.skm-bulk-dot{flex:none;width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-border-l3,rgba(0,0,0,.2))}
.skm-bulk-dot[data-on]{background:var(--dsw-alias-state-success-primary,#22c55e)}
.skm-preset-pill{position:relative;flex:none;display:inline-flex;align-items:center;gap:6px;height:36px;box-sizing:border-box;border:1px solid #c9d6f5;border-radius:10px;background:#eef3fd;color:#3b62d6;padding:0 10px;font-family:inherit;font-size:13px;line-height:18px;cursor:pointer;transition:border-color 140ms ease,background 140ms ease,transform 140ms ease}
.skm-preset-pill:active{transform:scale(.97)}
.skm-preset-pill-label{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-preset-select{appearance:none;-webkit-appearance:none;border:none;outline:none;background:transparent;color:inherit;font-size:13px;line-height:18px;font-family:inherit;padding:0 18px 0 0;cursor:pointer;max-width:150px}
.skm-preset-pill-chevron{pointer-events:none;color:#6f8cd6;transition:transform 140ms ease}
.skm-preset-pill[aria-expanded='true'] .skm-preset-pill-chevron{transform:rotate(180deg)}
.skm-drop-wrap{position:relative;flex:none}
.skm-drop-menu{position:absolute;top:calc(100% + 4px);left:0;z-index:996;min-width:180px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-layer-1,#fff);box-shadow:0 6px 20px rgba(16,24,40,.12);padding:4px;display:flex;flex-direction:column;gap:2px;animation:skm-form-in 140ms ease-out;max-height:320px;overflow-y:auto}
.skm-drop-item{display:flex;align-items:center;gap:8px;border:none;border-radius:8px;padding:7px 10px;background:transparent;font-size:13px;line-height:18px;color:var(--dsw-alias-label-secondary,#61666b);cursor:pointer;font-family:inherit;text-align:left;white-space:nowrap;transition:background 120ms ease,color 120ms ease}
.skm-drop-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.04));color:var(--dsw-alias-label-primary,#0f1115)}
.skm-drop-item[aria-checked='true']{color:var(--dsw-alias-label-primary,#0f1115);font-weight:600}
.skm-drop-check{flex:none;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--dsw-alias-state-success-primary,#22c55e);opacity:0;transform:scale(.6);transition:opacity 140ms ease,transform 140ms ease}
.skm-drop-check[data-on]{opacity:1;transform:scale(1)}
.skm-drop-badge{margin-left:auto;flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#61666b);background:var(--dsw-alias-bg-module-platform,#f1f3f5);border-radius:999px;padding:0 8px}
.skm-view-toggle{flex:none;display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-base,#fff);padding:3px;transition:border-color 140ms ease}
.skm-view-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;width:30px;height:28px;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-caption,#adb2b8);cursor:pointer;transition:background 140ms ease,color 140ms ease,transform 140ms ease}
.skm-view-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.04));color:var(--dsw-alias-label-secondary,#61666b)}
.skm-view-btn[data-active]{background:var(--dsw-alias-bg-module-platform,#eef0f2);color:var(--dsw-alias-label-primary,#0f1115)}
.skm-view-btn:active{transform:scale(.94)}
.skm-hint-row{flex:none;display:flex;align-items:center;gap:10px;padding:6px 16px 0}
.skm-hint-row-text{flex:1;min-width:0;font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary,#81858c)}
.skm-banner{flex:none;display:flex;align-items:center;gap:12px;margin:10px 16px 0;box-sizing:border-box;border:1px solid #f2df9e;border-radius:14px;background:#fdf8e3;padding:10px 12px;cursor:pointer;transition:border-color 140ms ease,box-shadow 140ms ease,transform 140ms ease}
.skm-banner:hover{border-color:#ecd58a;box-shadow:0 2px 8px rgba(232,163,61,.12)}
.skm-banner:active{transform:scale(.995)}
.skm-banner-active{border-color:#e8a33d;box-shadow:0 0 0 3px rgba(232,163,61,.18)}
.skm-banner-icon{flex:none;width:34px;height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1.5px solid #e8a33d;color:#e8a33d;background:transparent}
.skm-banner-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.skm-banner-title{font-size:14px;font-weight:700;line-height:20px;color:#1f2937}
.skm-banner-sub{font-size:12px;line-height:17px;color:#6b7280;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-banner-btn{flex:none;display:inline-flex;align-items:center;height:32px;box-sizing:border-box;border:none;border-radius:10px;background:#e8850c;color:#fff;font-size:13px;font-weight:600;line-height:18px;font-family:inherit;padding:0 14px;cursor:pointer;box-shadow:0 1px 3px rgba(232,133,12,.35);transition:background 140ms ease,transform 140ms ease,box-shadow 140ms ease}
.skm-banner-btn:hover{background:#d67906;box-shadow:0 2px 8px rgba(232,133,12,.4);transform:translateY(-1px)}
.skm-banner-btn:active{transform:translateY(0) scale(.98)}
.skm-main-scroll{flex:1;min-height:0;overflow-y:auto;padding:12px 16px 20px;display:flex;flex-direction:column;gap:14px}
.skm-hub-section{display:flex;flex-direction:column;min-width:0}
.skm-hub-section-head{display:flex;align-items:center;gap:8px;min-width:0;padding:2px 4px 0}
.skm-no-result{padding:18px 4px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#81858c)}

/* \u2500\u2500 \u5F52\u5165\u6280\u80FD\u5305\u5F39\u7A97\uFF08\u5361\u7247\u5316\uFF0C\u4E0E\u6280\u80FD\u5361\u7247\u540C\u8BED\u8A00\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.skm-assign-modal{width:min(560px,calc(100vw - 48px))}
.skm-assign-modal-body{overflow:hidden;display:flex;flex-direction:column;max-height:min(560px,calc(100vh - 180px))}
.skm-assign-list{list-style:none;margin:0;padding:4px 2px 2px;display:flex;flex-direction:column;gap:8px;overflow-y:auto}
.skm-assign-card{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.08));border-radius:12px;background:var(--dsw-alias-bg-base,#fff);padding:10px 12px;cursor:pointer;font-family:inherit;text-align:left;opacity:0;animation:skm-card-in 240ms cubic-bezier(.2,.7,.3,1.06) forwards;animation-delay:calc(var(--skm-i,0)*45ms);transition:border-color 140ms ease,box-shadow 140ms ease,transform 140ms ease}
.skm-assign-card:hover{border-color:var(--dsw-alias-state-success-primary,#22c55e);box-shadow:0 2px 8px rgba(16,24,40,.07);transform:translateY(-1px)}
.skm-assign-card:active{transform:translateY(0) scale(.99)}
.skm-assign-card-icon{flex:none;width:34px;height:34px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.08));border-radius:10px;background:var(--dsw-alias-bg-module-platform,#f5f6f7);color:var(--dsw-alias-label-secondary,#61666b);transition:color 140ms ease,border-color 140ms ease}
.skm-assign-card:hover .skm-assign-card-icon{color:var(--dsw-alias-label-primary,#0f1115);border-color:var(--dsw-alias-border-l3,rgba(0,0,0,.14))}
.skm-assign-card-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.skm-assign-card-name{font-size:14px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary,#0f1115);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-assign-card-desc{font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary,#81858c)}
.skm-assign-go{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;color:var(--dsw-alias-label-caption,#adb2b8);transform:rotate(-90deg);transition:transform 160ms ease,background 140ms ease,color 140ms ease}
.skm-assign-card:hover .skm-assign-go{transform:rotate(-90deg) translateX(2px);color:var(--dsw-alias-state-success-primary,#22c55e);background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.03))}
.skm-skill-list{list-style:none;margin:0;padding:2px 6px 6px;width:100%;display:flex;flex-direction:column;gap:2px}
.skm-skill-item{display:flex;flex-direction:column;gap:2px;padding:2px 0;border-radius:8px}
.skm-skill-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-skill-row{display:flex;align-items:center;gap:6px;padding:2px 6px;border-radius:8px}
.skm-skill-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-skill-label{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden}
.skm-skill-name{font-size:13px;line-height:18px;color:var(--dsw-alias-label-primary,#eee);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-skill-desc{font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skm-skill-expand{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:none;border-radius:6px;padding:0;background:transparent;cursor:pointer;color:var(--dsw-alias-label-tertiary,#888);transition:transform 120ms}
.skm-skill-expand:hover{color:var(--dsw-alias-label-primary,#eee);background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-skill-expand[data-open='true']{transform:rotate(180deg)}
.skm-skill-count{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888);background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.05));border-radius:8px;padding:0 6px;white-space:nowrap}
.skm-skill-compat{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary,#888);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px}
.skm-skill-files{list-style:none;margin:0 0 2px 10px;padding:2px 0 2px 10px;border-left:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.1));display:flex;flex-direction:column;gap:0}
.skm-skill-file{display:flex;align-items:center;gap:6px;padding:2px 6px;border-radius:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb);font-family:ui-monospace,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.skm-skill-file:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-skill-file[data-main='true']{color:var(--dsw-alias-label-primary,#eee);font-weight:500}
.skm-skill-dir{color:var(--dsw-alias-label-tertiary,#888)}
.skm-skill-preview{border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));border-radius:10px;background:var(--dsw-alias-bg-base,#0e1116);padding:8px 12px;margin:0 0 2px 10px;font-size:12px;line-height:20px;color:var(--dsw-alias-label-primary,#eee);overflow:auto;max-height:280px;box-sizing:border-box}
.skm-skill-preview h3,.skm-skill-preview h4,.skm-skill-preview h5{margin:10px 0 4px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary,#eee)}
.skm-skill-preview p{margin:4px 0}
.skm-skill-preview pre{background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.05));border-radius:8px;padding:8px 10px;overflow:auto;font-family:ui-monospace,monospace;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary,#bbb);margin:6px 0}
.skm-skill-preview code{background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.05));border-radius:4px;padding:0 4px;font-family:ui-monospace,monospace;font-size:11px}
.skm-skill-preview a{color:var(--dsw-alias-state-business-primary,#4a9eff)}
.skm-skill-preview ul{margin:4px 0;padding-left:18px}
.skm-skill-preview li{margin:2px 0}
.skm-viewer-modal{width:min(960px,calc(100vw - 48px))}
.skm-viewer-body{overflow:hidden;display:flex;flex-direction:column;height:min(640px,calc(100vh - 120px));--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2)}
.skm-viewer-body > div:nth-of-type(2){flex:1;min-height:0;display:flex;flex-direction:column;margin-top:8px;padding:0 16px 16px}
.skm-viewer-layout{flex:1;min-height:0;display:flex;border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));border-radius:12px;overflow:hidden}
.skm-viewer-nav{flex:none;width:200px;border-right:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));overflow-y:auto;padding:6px;box-sizing:border-box;background:var(--dsw-alias-bg-layer-1,#1c1f26)}
.skm-viewer-nav-item{display:flex;align-items:center;gap:6px;padding:3px 8px;border-radius:6px;font-size:12px;line-height:20px;color:var(--dsw-alias-label-secondary,#bbb);font-family:ui-monospace,monospace;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.skm-viewer-nav-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.skm-viewer-nav-item[data-active='true']{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.skm-viewer-nav-dir{cursor:default;color:var(--dsw-alias-label-tertiary,#888)}
.skm-viewer-content{flex:1;min-width:0;overflow:auto;padding:14px 18px;box-sizing:border-box;font-size:13px;line-height:22px;color:var(--dsw-alias-label-primary,#eee)}
.skm-viewer-content h1,.skm-viewer-content h2,.skm-viewer-content h3,.skm-viewer-content h4{margin:12px 0 6px;line-height:26px;color:var(--dsw-alias-label-primary,#eee)}
.skm-viewer-content h1{font-size:20px}
.skm-viewer-content h2{font-size:17px}
.skm-viewer-content h3{font-size:15px}
.skm-viewer-content h4{font-size:14px}
.skm-viewer-content p{margin:6px 0}
.skm-viewer-content pre{background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.05));border-radius:8px;padding:10px 12px;overflow:auto;font-family:ui-monospace,monospace;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#bbb)}
.skm-viewer-content code{background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.05));border-radius:4px;padding:0 4px;font-family:ui-monospace,monospace;font-size:12px}
.skm-viewer-content a{color:var(--dsw-alias-state-business-primary,#4a9eff)}
.skm-viewer-content ul,.skm-viewer-content ol{margin:6px 0;padding-left:22px}
.skm-viewer-content li{margin:3px 0}
.skm-viewer-content blockquote{margin:8px 0;padding:2px 12px;border-left:3px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));color:var(--dsw-alias-label-secondary,#bbb)}
.skm-viewer-content hr{border:none;border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));margin:10px 0}
.skm-loose-empty{margin:2px;padding:4px 0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.skm-visually-hidden{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}

/* \u2500\u2500 \u6280\u80FD/\u6280\u80FD\u5305\u5F00\u5173\uFF08Skills Hub \u98CE\u683C\uFF1A\u7EFF\u8272\u80F6\u56CA + \u767D\u8272\u5706\u94AE\uFF0C\u56DE\u5F39\u8FC7\u6E21\uFF09 \u2500\u2500 */
.skm-toggle{flex:none;display:inline-flex;align-items:center;width:34px;height:20px;box-sizing:border-box;border-radius:10px;padding:2px;appearance:none;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));background:var(--dsw-alias-bg-module-platform,#e9ebee);cursor:pointer;transition:background 160ms ease,border-color 160ms ease,filter 160ms ease}
.skm-toggle:hover{filter:brightness(1.03)}
.skm-toggle:disabled{opacity:.55;cursor:not-allowed;filter:none}
.skm-toggle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4176e6);outline-offset:1px}
.skm-toggle-on{border-color:transparent;background:var(--dsw-alias-state-success-primary,#22c55e)}
.skm-toggle-off{background:var(--dsw-alias-bg-module-platform,#e9ebee);border-color:var(--dsw-alias-border-l2,rgba(0,0,0,.1))}
.skm-toggle-knob{display:block;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform 180ms cubic-bezier(.3,1.4,.5,1)}
.skm-toggle-on .skm-toggle-knob{transform:translateX(14px)}
.skm-toggle-off .skm-toggle-knob{transform:translateX(0)}
.skm-bundle-toggle{flex:none;display:inline-flex;align-items:center;gap:4px;margin-left:0}

/* \u2500\u2500 Agent \u9884\u8BBE\u5206\u7C7B\u5706\u7403\u6761\uFF08\u5F27\u5F62\u6062\u590D\uFF0C\u6574\u5217\u4F4D\u4E8E\u7EDF\u8BA1\u884C\u4E0E\u5DE5\u5177\u680F\u4E4B\u95F4\uFF09 \u2500\u2500 */
.skm-preset-strip{flex:none;display:flex;align-items:flex-start;gap:10px;padding:12px 16px 0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
.skm-preset-strip::-webkit-scrollbar{display:none}
.skm-preset-ball-wrap{flex:none;display:flex;flex-direction:column;align-items:center;gap:6px;width:56px;border:none;background:transparent;padding:0;cursor:pointer;font-family:inherit}
.skm-preset-ball{position:relative;display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;box-sizing:border-box;font-size:17px;font-weight:600;line-height:1;color:var(--dsw-alias-label-primary,#eee);text-transform:uppercase;background:var(--dsw-alias-bg-layer-2,#262b36);border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));transition:border-color 140ms,filter 140ms}
.skm-preset-ball-wrap:hover .skm-preset-ball{filter:brightness(1.15)}
.skm-preset-ball-wrap[data-active='true'] .skm-preset-ball{border-color:var(--dsw-alias-state-business-primary,#4a9eff);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-business-primary,#4a9eff)}
.skm-preset-ball[data-dot='true']::after{content:'';position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border-radius:50%;background:var(--dsw-alias-state-business-primary,#4a9eff);border:2px solid var(--dsw-alias-bg-layer-1,#1c1f26);box-sizing:border-box}
.skm-preset-ball-label{max-width:56px;font-size:11px;line-height:15px;color:var(--dsw-alias-label-tertiary,#888);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
.skm-preset-ball-wrap[data-active='true'] .skm-preset-ball-label{color:var(--dsw-alias-label-primary,#eee)}
.skm-preset-hint{flex:none;display:flex;align-items:center;gap:8px;padding:0 2px 2px}
.skm-preset-hint-text{flex:1;min-width:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#888)}
.skm-preset-reset{flex:none;appearance:none;border:none;border-radius:12px;padding:2px 10px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#999);background:transparent;cursor:pointer;font-family:inherit}
.skm-preset-reset:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}

/* \u2500\u2500 \u79FB\u52A8\u7AEF\uFF1A\u4FA7\u680F\u6536\u7A84/\u9690\u85CF\u3001\u67E5\u770B\u5668\u4E0A\u4E0B\u5806\u53E0\u3001\u5361\u7247\u7F51\u683C\u5355\u5217 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 767.98px) {
  .skm-viewer-body{height:calc(100vh - 60px)}
  .skm-viewer-layout{flex-direction:column}
  .skm-viewer-nav{width:100%;border-right:none;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));flex:none;max-height:40%}
  .skm-viewer-content{flex:1;min-height:0}
  .skm-hub-side{display:none}
  .skm-stats-row{grid-template-columns:repeat(2,minmax(0,1fr))}
  .skm-skill-grid{grid-template-columns:minmax(0,1fr)}
  .skm-toolbar{padding:12px 12px 4px}
  .skm-stats-row{padding:12px 12px 0}
  .skm-banner{margin:10px 12px 0}
  .skm-main-scroll{padding:12px 12px 20px}
}

/* \u2500\u2500 \u51CF\u5F31\u52A8\u6548\uFF1A\u5361\u7247\u5165\u573A/\u60AC\u505C\u4F4D\u79FB\u4E0E\u5F00\u5173\u56DE\u5F39\u5168\u90E8\u6536\u655B \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (prefers-reduced-motion: reduce) {
  .skm-skill-card{animation:none;opacity:1;transition:none}
  .skm-stat{animation:none;opacity:1;transition:none}
  .skm-assign-card{animation:none;opacity:1;transition:none}
  .skm-bulk-menu{animation:none}
  .skm-toggle-knob{transition:none}
  .skm-toggle{transition:none}
  .skm-tag{transition:none}
  .skm-skill-copy,.skm-skill-icon,.skm-skill-foot-icon,.skm-icon-action,.skm-bundle,.skm-hub-item,.skm-tool-button,.skm-banner,.skm-banner-btn,.skm-view-btn,.skm-drop-item,.skm-assign-card{transition:none}
}
`;
function ensureStyles3() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID11) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID11;
  tag.textContent = SHEET10;
  document.head.appendChild(tag);
}
function readEntryFile(entry) {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject);
  });
}
async function collectEntry(entry, prefix, out) {
  if (entry.isFile) {
    const fileEntry = entry;
    const file = await readEntryFile(fileEntry);
    const path = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
    out.push({ path, file });
    return;
  }
  if (entry.isDirectory) {
    const dirEntry = entry;
    const reader = dirEntry.createReader();
    const all = [];
    while (true) {
      const batch = await new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
      if (batch.length === 0) break;
      all.push(...batch);
    }
    const nextPrefix = prefix === "" ? entry.name : `${prefix}/${entry.name}`;
    for (const child of all) await collectEntry(child, nextPrefix, out);
  }
}
function fileToBase64(file) {
  return file.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunkSize = 32768;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  });
}
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inlineMd(s) {
  return escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}
function renderSkillMarkdown(text) {
  const body = String(text).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const lines = body.split("\n");
  let html = "";
  let inCode = false;
  let codeBuf = [];
  let inList = false;
  let inQuote = false;
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  const closeQuote = () => {
    if (inQuote) {
      html += "</blockquote>";
      inQuote = false;
    }
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      if (inCode) {
        html += "<pre>" + escapeHtml(codeBuf.join("\n")) + "</pre>";
        codeBuf = [];
        inCode = false;
      } else {
        closeList();
        closeQuote();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }
    if (trimmed === "---" || trimmed === "***") {
      closeList();
      closeQuote();
      html += "<hr>";
      continue;
    }
    if (trimmed.startsWith(">")) {
      if (!inQuote) {
        closeList();
        html += "<blockquote>";
        inQuote = true;
      }
      html += "<p>" + inlineMd(trimmed.replace(/^>\s?/, "")) + "</p>";
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading !== null) {
      closeList();
      closeQuote();
      const level = Math.min(heading[1].length + 2, 5);
      html += `<h${String(level)}>` + inlineMd(heading[2]) + `</h${String(level)}>`;
      continue;
    }
    const item = /^[-*]\s+(.*)$/.exec(trimmed);
    if (item !== null) {
      if (!inList) {
        closeQuote();
        html += "<ul>";
        inList = true;
      }
      html += "<li>" + inlineMd(item[1]) + "</li>";
      continue;
    }
    closeList();
    closeQuote();
    if (trimmed === "") {
      html += "<p></p>";
      continue;
    }
    html += "<p>" + inlineMd(trimmed) + "</p>";
  }
  closeList();
  closeQuote();
  if (inCode) html += "<pre>" + escapeHtml(codeBuf.join("\n")) + "</pre>";
  return html;
}
var ALL_PRESETS = "*";
function ballInitial(label) {
  const trimmed = label.trim();
  if (trimmed === "") return "?";
  return [...trimmed][0] ?? "?";
}
function PresetBall({ id, label, active, dot, title, onSelect }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    "button",
    {
      type: "button",
      className: css3.presetBallWrap,
      "data-active": active ? "true" : void 0,
      "aria-pressed": active,
      title,
      onClick: onSelect,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.presetBall, "data-dot": dot ? "true" : void 0, children: id === ALL_PRESETS ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconAgentPresetOutline16, { size: 18, "aria-hidden": "true" }) : ballInitial(label) }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.presetBallLabel, children: label })
      ]
    }
  );
}
function skillFileRows(files) {
  const rows = [];
  const seenDirs = /* @__PURE__ */ new Set();
  for (const path of files) {
    const parts = path.split("/");
    let dirPath = "";
    for (let i = 0; i < parts.length - 1; i += 1) {
      dirPath = dirPath === "" ? parts[i] : dirPath + "/" + parts[i];
      if (!seenDirs.has(dirPath)) {
        seenDirs.add(dirPath);
        rows.push({ kind: "dir", path: dirPath + "/", depth: i, main: false });
      }
    }
    rows.push({ kind: "file", path, depth: parts.length - 1, main: path === "SKILL.md" });
  }
  return rows;
}
function CopyIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
  ] });
}
function CheckIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("polyline", { points: "20 6 9 17 4 12" }) });
}
function SearchIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
  ] });
}
function TagIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "7", y1: "7", x2: "7.01", y2: "7" })
  ] });
}
function GridIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("rect", { x: "3", y: "3", width: "7", height: "7" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("rect", { x: "14", y: "3", width: "7", height: "7" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("rect", { x: "14", y: "14", width: "7", height: "7" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("rect", { x: "3", y: "14", width: "7", height: "7" })
  ] });
}
function ListIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" })
  ] });
}
function BulbIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M9 18h6" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M10 22h4" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" })
  ] });
}
function HubLogoIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M12 1.5l9 5.2v10.6l-9 5.2-9-5.2V6.7l9-5.2z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", { d: "M8.5 9.5l7-3.8M8.5 9.5v2.4c0 .8.6 1.4 1.4 1.4h4.2c.8 0 1.4.6 1.4 1.4v2.6l-7 3.8", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
  ] });
}
function SkillCard({ skill, bundleId, bundleName, enabled, lockedReason, scopeLabel, index, onToggle, onView, onAssign, onRemove, onDelete }) {
  const files = Array.isArray(skill.files) ? skill.files : [];
  const description = skill.description ?? "";
  const [copied, setCopied] = (0, import_react27.useState)(false);
  const copiedTimer = (0, import_react27.useRef)(null);
  (0, import_react27.useEffect)(() => () => {
    if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
  }, []);
  const flashCopied = () => {
    setCopied(true);
    if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => {
      setCopied(false);
    }, 1200);
  };
  const copyName = () => {
    const fallback = () => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = skill.name;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
      }
    };
    try {
      if (navigator.clipboard !== void 0) {
        void navigator.clipboard.writeText(skill.name).then(flashCopied, () => {
          fallback();
          flashCopied();
        });
      } else {
        fallback();
        flashCopied();
      }
    } catch {
      fallback();
      flashCopied();
    }
  };
  const toggleLabel = lockedReason ?? (enabled ? skillT("disableSkill") : skillT("enableSkill"));
  const fileMeta = typeof skill.fileCount === "number" ? skill.fileCount : files.length;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    "li",
    {
      className: css3.skillCard,
      style: { "--skm-i": index },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.skillCardHead, children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.skillIcon, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconSkillOutline16, { size: 20 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.skillTitleWrap, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.skillTitle, title: skill.name, children: skill.name }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              "button",
              {
                type: "button",
                className: css3.skillCopy,
                "data-copied": copied ? "true" : void 0,
                "aria-label": copied ? skillT("copiedSkillName") : skillT("copySkillName"),
                title: copied ? skillT("copiedSkillName") : skillT("copySkillName"),
                onClick: copyName,
                children: copied ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(CheckIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(CopyIcon, {})
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.skillCardToggle, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": enabled,
              "aria-label": toggleLabel,
              title: toggleLabel,
              className: `${css3.toggle} ${enabled ? css3.toggleOn : css3.toggleOff}`,
              disabled: lockedReason !== void 0,
              onClick: (event) => {
                event.stopPropagation();
                onToggle(skill, !enabled);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.toggleKnob, "aria-hidden": "true" })
            }
          ) })
        ] }),
        description !== "" && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.skillDesc, title: description, children: description }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.skillTags, children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: `${css3.tag} ${css3.tagSource}`, children: bundleName ?? skillT("tagLoose") }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: `${css3.tag} ${css3.tagScope}`, "data-off": enabled ? void 0 : "true", children: scopeLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.skillMeta, children: skillT("fileCount", { n: fileMeta }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.skillCardFoot, children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.skillFootLabel, children: skillT("toolsLabel") }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "button",
            {
              type: "button",
              className: css3.skillFootIcon,
              "aria-label": skillT("viewSkillFiles"),
              title: skillT("viewSkillFiles"),
              disabled: files.length === 0,
              onClick: () => {
                onView(skill);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconFolderOpenOutline16, { size: 14, "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.skillCardActions, children: [
            bundleId !== null ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: skillT("removeSkill"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.iconAction, "aria-label": skillT("removeSkill"), onClick: () => {
              onRemove?.(skill);
            }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconCloseOutline16, { size: 14 }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: skillT("assignToBundle"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.iconAction, "aria-label": skillT("assignToBundle"), onClick: () => {
              onAssign?.(skill);
            }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconPlusOutline16, { size: 14 }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: skillT("deleteSkillBtn"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.iconAction, "aria-label": skillT("deleteSkillBtn"), onClick: () => {
              onDelete?.(skill);
            }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconTrashOutline16, { size: 14 }) }) })
          ] })
        ] })
      ]
    }
  );
}
var SKILL_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
function SkillsPanel({ onClose, closing = false, anchor = null, onCardMouseEnter, onCardMouseLeave }) {
  ensureStyles3();
  const [state, setState] = (0, import_react27.useState)({ status: "loading" });
  const [reload, setReload] = (0, import_react27.useState)(0);
  const [expanded, setExpanded] = (0, import_react27.useState)(/* @__PURE__ */ new Set());
  const [viewer, setViewer] = (0, import_react27.useState)(null);
  const [assignTarget, setAssignTarget] = (0, import_react27.useState)(null);
  const [newBundleOpen, setNewBundleOpen] = (0, import_react27.useState)(false);
  const [newBundleName, setNewBundleName] = (0, import_react27.useState)("");
  const [creatingBundle, setCreatingBundle] = (0, import_react27.useState)(false);
  const [renameTarget, setRenameTarget] = (0, import_react27.useState)(null);
  const [renaming, setRenaming] = (0, import_react27.useState)(false);
  const [renamedFlash, setRenamedFlash] = (0, import_react27.useState)(null);
  const renamedTimer = (0, import_react27.useRef)(null);
  const [confirm, setConfirm] = (0, import_react27.useState)(null);
  const [confirming, setConfirming] = (0, import_react27.useState)(false);
  const [install, setInstall] = (0, import_react27.useState)(null);
  const [installName, setInstallName] = (0, import_react27.useState)("");
  const [installDescription, setInstallDescription] = (0, import_react27.useState)("");
  const [installBundleId, setInstallBundleId] = (0, import_react27.useState)(void 0);
  const [installing, setInstalling] = (0, import_react27.useState)(false);
  const [installError, setInstallError] = (0, import_react27.useState)(null);
  const [dropActive, setDropActive] = (0, import_react27.useState)(false);
  const fileInput = (0, import_react27.useRef)(null);
  const [toggles, setToggles] = (0, import_react27.useState)({ skills: {}, bundles: {} });
  const [toggling, setToggling] = (0, import_react27.useState)(/* @__PURE__ */ new Set());
  const [presets, setPresets] = (0, import_react27.useState)([]);
  const [overrides, setOverrides] = (0, import_react27.useState)({});
  const [activePreset, setActivePreset] = (0, import_react27.useState)(ALL_PRESETS);
  const [query, setQuery] = (0, import_react27.useState)("");
  const [sourceFilter, setSourceFilter] = (0, import_react27.useState)("all");
  const [sortAsc, setSortAsc] = (0, import_react27.useState)(true);
  const [bulkOpen, setBulkOpen] = (0, import_react27.useState)(false);
  const [bulkBusy, setBulkBusy] = (0, import_react27.useState)(false);
  const [viewMode, setViewMode] = (0, import_react27.useState)("grid");
  const [openMenu, setOpenMenu] = (0, import_react27.useState)(null);
  const [health, setHealth] = (0, import_react27.useState)({ state: "loading" });
  const refresh = () => {
    void Promise.resolve().then(() => (init_skill_source(), skill_source_exports)).then(({ invalidateSkillCache: invalidateSkillCache2 }) => invalidateSkillCache2());
    setReload((value) => value + 1);
  };
  const refreshTogglesOnly = () => {
    void Promise.resolve().then(() => (init_skill_source(), skill_source_exports)).then(({ invalidateSkillCache: invalidateSkillCache2 }) => invalidateSkillCache2());
    void skillApi.presetStatus().then(
      (status) => {
        setToggles({ skills: status.skills, bundles: status.bundles });
        setOverrides(status.overrides);
        setPresets(status.presets);
      },
      () => {
        void skillApi.toggleStatus().then((status) => {
          setToggles(status);
        }, () => {
        });
      }
    );
  };
  const t = skillT;
  (0, import_react27.useEffect)(() => {
    let current = true;
    setState({ status: "loading" });
    void skillApi.list().then(
      (snapshot) => {
        if (current) setState({ status: "ready", snapshot });
      },
      () => {
        if (current) setState({ status: "error" });
      }
    );
    void skillApi.presetStatus().then(
      (status) => {
        if (!current) return;
        setToggles({ skills: status.skills, bundles: status.bundles });
        setOverrides(status.overrides);
        setPresets(status.presets);
      },
      () => {
        void skillApi.toggleStatus().then(
          (status) => {
            if (current) setToggles(status);
          },
          () => {
          }
        );
      }
    );
    setHealth({ state: "loading" });
    void skillApi.health().then(
      (report) => {
        if (current) setHealth(report.ok ? { state: "ok", report } : { state: "issue", report });
      },
      () => {
        if (current) setHealth({ state: "unavailable" });
      }
    );
    return () => {
      current = false;
    };
  }, [reload]);
  (0, import_react27.useEffect)(() => () => {
    if (renamedTimer.current !== null) window.clearTimeout(renamedTimer.current);
  }, []);
  const runToggle = async (key, action) => {
    if (toggling.has(key)) return;
    setToggling((current) => new Set(current).add(key));
    setInstallError(null);
    try {
      await action();
      refreshTogglesOnly();
    } catch (error) {
      setInstallError(skillT("toggleFailed", { message: error instanceof Error ? error.message : String(error) }));
    } finally {
      setToggling((current) => {
        const next = new Set(current);
        next.delete(key);
        return next;
      });
    }
  };
  const toggleSkill = (skill, enabled) => {
    if (activePreset === ALL_PRESETS) {
      void runToggle(`skill:${skill.name}`, () => skillApi.setSkillEnabled(skill.name, enabled));
      return;
    }
    void runToggle(
      `skill:${skill.name}`,
      () => skillApi.setPresetSkillEnabled(activePreset, skill.name, enabled)
    );
  };
  const toggleBundle = (bundle, enabled) => {
    if (activePreset === ALL_PRESETS) {
      void runToggle(`bundle:${bundle.id}`, () => skillApi.setBundleEnabled(bundle.id, enabled));
      return;
    }
    void runToggle(
      `bundle:${bundle.id}`,
      () => skillApi.setPresetBundleEnabled(activePreset, bundle.id, enabled)
    );
  };
  const presetOverride = activePreset === ALL_PRESETS ? {} : overrides[activePreset] ?? {};
  const skillEnabledIn = (name) => {
    if (toggles.skills[name] === false) return false;
    if (activePreset === ALL_PRESETS) return true;
    return presetOverride[name] !== false;
  };
  const bundleEnabledIn = (bundle) => {
    if (activePreset === ALL_PRESETS) return toggles.bundles[bundle.id] !== false;
    return bundle.skills.every((skill) => skillEnabledIn(skill.name));
  };
  const skillLockedReason = (name) => activePreset !== ALL_PRESETS && toggles.skills[name] === false ? t("presetLockedByGlobal") : void 0;
  const resetActivePreset = () => {
    if (activePreset === ALL_PRESETS) return;
    void runToggle(`reset:${activePreset}`, () => skillApi.resetPreset(activePreset));
  };
  const toggleExpanded = (bundleId) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(bundleId)) next.delete(bundleId);
      else next.add(bundleId);
      return next;
    });
  };
  const loadViewerContent = async (skillName2, filePath) => {
    try {
      const res = await fetch(`/api/skill-manager/skills/${encodeURIComponent(skillName2)}/files/${encodeURIComponent(filePath)}`);
      const body = await res.json();
      if (body.error !== void 0) throw new Error(String(body.error));
      setViewer((v) => v === null ? v : { ...v, loading: false, content: body.content ?? "" });
    } catch (error) {
      setViewer((v) => v === null ? v : { ...v, loading: false, error: error instanceof Error ? error.message : String(error) });
    }
  };
  const openViewer = (skill) => {
    setViewer({ skill, file: "SKILL.md", loading: true });
    void loadViewerContent(skill.name, "SKILL.md");
  };
  const selectViewerFile = (filePath) => {
    if (viewer === null) return;
    setViewer({ ...viewer, file: filePath, loading: true, error: void 0 });
    void loadViewerContent(viewer.skill.name, filePath);
  };
  const doAssign = async (skill, bundleId) => {
    try {
      if (state.status !== "ready") return;
      const bundle = state.snapshot.bundles.find((candidate) => candidate.id === bundleId);
      if (bundle === void 0) throw new Error("bundle not found");
      await skillApi.setBundleSkills(bundleId, [...bundle.skills.map((s) => s.name), skill.name]);
      setAssignTarget(null);
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    }
  };
  const acceptFiles = (files) => {
    if (files === null || files.length === 0) return;
    const collected = [];
    for (const file of files) {
      const relative = file.webkitRelativePath;
      if (relative === "") continue;
      const parts = relative.split("/");
      if (parts.length < 2) continue;
      collected.push({ path: parts.slice(1).join("/"), file });
    }
    if (collected.length === 0) return;
    const zipCandidate = collected.length === 1 && collected[0].path.toLowerCase().endsWith(".zip") ? collected[0] : void 0;
    if (zipCandidate !== void 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = String(reader.result ?? "").split(",")[1] ?? "";
        setInstall({ archive: true, name: zipCandidate.path, data, folderName: zipCandidate.path });
        setInstallError(null);
      };
      reader.readAsDataURL(zipCandidate.file);
      return;
    }
    const rootName = collected[0]?.path.split("/")[0] ?? "";
    setInstallName(rootName);
    setInstallError(null);
    setInstall({ files: collected, folderName: rootName });
  };
  const onDrop = async (event) => {
    event.preventDefault();
    setDropActive(false);
    const collected = [];
    const items = event.dataTransfer.items;
    if (items === void 0) return;
    const pending = [];
    for (const item of Array.from(items)) {
      const entry = item.webkitGetAsEntry?.();
      if (entry !== void 0 && entry !== null) pending.push(collectEntry(entry, "", collected));
    }
    await Promise.all(pending);
    if (collected.length === 0) return;
    const zipCandidate = collected.length === 1 && collected[0].path.toLowerCase().endsWith(".zip") ? collected[0] : void 0;
    if (zipCandidate !== void 0) {
      setInstall({ archive: true, name: zipCandidate.path, data: await fileToBase64(zipCandidate.file), folderName: zipCandidate.path });
      setInstallError(null);
      return;
    }
    const rootName = collected[0]?.path.split("/")[0] ?? "";
    setInstallName(rootName);
    setInstallError(null);
    setInstall({ files: collected, folderName: rootName });
  };
  const confirmInstall = async (event) => {
    event.preventDefault();
    if (install === null || installing) return;
    if (install.archive !== true && installName.trim() === "") return;
    setInstalling(true);
    setInstallError(null);
    try {
      if (install.archive === true) {
        await skillApi.installSkill({
          archive: install.data,
          description: installDescription.trim(),
          ...installBundleId === void 0 ? {} : { bundleId: installBundleId }
        });
      } else {
        const files = await Promise.all(install.files.map(async ({ path, file }) => ({
          path,
          data: await fileToBase64(file)
        })));
        await skillApi.installSkill({
          skillName: installName.trim(),
          description: installDescription.trim(),
          ...installBundleId === void 0 ? {} : { bundleId: installBundleId },
          files
        });
      }
      setInstall(null);
      setInstallName("");
      setInstallDescription("");
      setInstallBundleId(void 0);
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    } finally {
      setInstalling(false);
    }
  };
  const submitNewBundle = async (event) => {
    event.preventDefault();
    if (creatingBundle || newBundleName.trim() === "") return;
    setCreatingBundle(true);
    try {
      await skillApi.createBundle(newBundleName.trim());
      setNewBundleName("");
      setNewBundleOpen(false);
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    } finally {
      setCreatingBundle(false);
    }
  };
  const submitRename = async (event) => {
    event.preventDefault();
    if (renaming || renameTarget === null || renameTarget.name.trim() === "") return;
    setRenaming(true);
    try {
      await skillApi.renameBundle(renameTarget.bundleId, renameTarget.name.trim());
      const renamedId = renameTarget.bundleId;
      if (renamedTimer.current !== null) window.clearTimeout(renamedTimer.current);
      setRenamedFlash(renamedId);
      renamedTimer.current = window.setTimeout(() => {
        setRenamedFlash(null);
      }, 1600);
      setRenameTarget(null);
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    } finally {
      setRenaming(false);
    }
  };
  const confirmDelete = async () => {
    if (confirm === null || confirming) return;
    setConfirming(true);
    try {
      if (confirm.kind === "bundle") await skillApi.deleteBundle(confirm.bundle.id);
      else await skillApi.deleteSkill(confirm.name);
      setConfirm(null);
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    } finally {
      setConfirming(false);
    }
  };
  const removeFromBundle = async (bundleId, name) => {
    try {
      if (state.status !== "ready") return;
      const bundle = state.snapshot.bundles.find((candidate) => candidate.id === bundleId);
      if (bundle === void 0) return;
      await skillApi.setBundleSkills(bundleId, bundle.skills.map((skill) => skill.name).filter((skillName2) => skillName2 !== name));
      refresh();
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error));
    }
  };
  const bundles = state.status === "ready" ? state.snapshot.bundles : [];
  const loose = state.status === "ready" ? state.snapshot.loose : [];
  const scopeLabel = activePreset === ALL_PRESETS ? t("scopeAll") : presets.find((preset) => preset.id === activePreset)?.name ?? activePreset;
  const q = query.trim().toLowerCase();
  const qMatch = (skill) => {
    if (q === "") return true;
    if (skill.name.toLowerCase().includes(q)) return true;
    return (skill.description ?? "").toLowerCase().includes(q);
  };
  const sortedSkills = (list) => [...list].sort((a, b) => {
    const order = a.name.localeCompare(b.name);
    return sortAsc ? order : -order;
  });
  const visibleBundles = (sourceFilter === "loose" ? [] : bundles).map((bundle) => ({ ...bundle, skills: sortedSkills(bundle.skills.filter(qMatch)) })).filter((bundle) => bundle.skills.length > 0);
  const visibleLoose = sourceFilter === "bundles" ? [] : sortedSkills(loose.filter(qMatch));
  const totalSkills = bundles.reduce((n, bundle) => n + bundle.skillCount, 0) + loose.length;
  const bundleCount = bundles.length;
  const presetCount = presets.length;
  const healthView = health.state === "ok" ? { tone: "ok", label: t("statHealthy"), title: t("statHealthy") } : health.state === "issue" ? { tone: "warn", label: t("statIssues", { n: health.report.issues.length }), title: health.report.issues.map((issue) => issue.message).join("\n") } : health.state === "unavailable" ? { tone: "pending", label: t("statPending"), title: t("statPending") } : { tone: "idle", label: t("statChecking"), title: "" };
  const enabledCount = (() => {
    let n = 0;
    for (const bundle of bundles) for (const skill of bundle.skills) if (toggles.skills[skill.name] !== false) n += 1;
    for (const skill of loose) if (toggles.skills[skill.name] !== false) n += 1;
    return n;
  })();
  const noResults = visibleBundles.length === 0 && visibleLoose.length === 0;
  const batchSet = (enabled) => {
    setBulkOpen(false);
    if (bulkBusy) return;
    const targets = visibleBundles.flatMap((bundle) => bundle.skills).concat(visibleLoose);
    if (targets.length === 0) return;
    setBulkBusy(true);
    const actions = targets.map((skill) => activePreset === ALL_PRESETS ? skillApi.setSkillEnabled(skill.name, enabled) : skillApi.setPresetSkillEnabled(activePreset, skill.name, enabled));
    void Promise.all(actions).then(
      () => {
        refreshTogglesOnly();
      },
      (error) => {
        setInstallError(skillT("toggleFailed", { message: error instanceof Error ? error.message : String(error) }));
      }
    ).finally(() => {
      setBulkBusy(false);
    });
  };
  const trimmedName = installName.trim();
  const nameInvalid = trimmedName !== "" && !SKILL_NAME_PATTERN.test(trimmedName);
  const confirmTitle = confirm === null ? t("deleteSkillConfirm", { name: "" }) : confirm.kind === "bundle" ? t("deleteBundleConfirm", { name: confirm.bundle.name }) : t("deleteSkillConfirm", { name: confirm.name });
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    PopoverShell,
    {
      solid: true,
      closing,
      onClose: () => {
        if (installing || confirming) return;
        if (confirm !== null || viewer !== null || assignTarget !== null) return;
        onClose();
      },
      anchor,
      onCardMouseEnter,
      onCardMouseLeave,
      size: { width: 1400, height: 860 },
      ariaLabel: t("panelTitle"),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          PshHead,
          {
            title: t("panelTitle"),
            closeLabel: t("close"),
            onClose: () => {
              if (installing || confirming) return;
              onClose();
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(PshBody, { className: css3.modalBody, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.hub, "aria-busy": state.status === "loading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("aside", { className: css3.hubSide, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.hubBrand, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubLogo, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(HubLogoIcon, {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.hubBrandText, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubBrandTitle, children: t("panelTitle") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubBrandSub, children: t("hubSubtitle") })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: css3.hubGroup, children: t("hubWorkspace") }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "button",
              {
                type: "button",
                className: `${css3.hubItem} ${sourceFilter === "all" ? css3.hubItemActive : ""}`,
                "data-active": sourceFilter === "all" || void 0,
                onClick: () => {
                  setSourceFilter("all");
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(GridIcon, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemLabel, children: t("hubMySkills") }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemCount, children: totalSkills })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("button", { type: "button", className: css3.hubItem, onClick: () => {
              fileInput.current?.click();
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconPlusOutline16, { size: 14 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemLabel, children: t("hubAddSkills") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: css3.hubGroup, children: t("hubManage") }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "button",
              {
                type: "button",
                className: `${css3.hubItem} ${sourceFilter === "bundles" ? css3.hubItemActive : ""}`,
                "data-active": sourceFilter === "bundles" || void 0,
                onClick: () => {
                  setSourceFilter("bundles");
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconFolderOpenOutline16, { size: 14 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemLabel, children: t("hubBundles") }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemCount, children: bundleCount })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "button",
              {
                type: "button",
                className: `${css3.hubItem} ${activePreset !== ALL_PRESETS ? css3.hubItemActive : ""}`,
                "data-active": activePreset !== ALL_PRESETS || void 0,
                onClick: () => {
                  setSourceFilter("all");
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(TagIcon, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemLabel, children: t("hubPresets") }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemCount, children: presetCount })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "button",
              {
                type: "button",
                className: `${css3.hubItem} ${sourceFilter === "loose" ? css3.hubItemActive : ""}`,
                "data-active": sourceFilter === "loose" || void 0,
                onClick: () => {
                  setSourceFilter("loose");
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ListIcon, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemLabel, children: t("hubLoose") }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hubItemCount, children: loose.length })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.hubMain, children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.statsRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.stat, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statLabel, children: t("statManaged") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statValue, children: totalSkills })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.stat, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statLabel, children: t("statEnabled") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statValue, children: enabledCount })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.stat, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statLabel, children: t("statLoose") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statValue, children: loose.length })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.stat, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.statLabel, children: t("statSync") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                  "span",
                  {
                    className: `${css3.statValue} ${css3.statValueInline}`,
                    "data-tone": healthView.tone === "warn" ? "warn" : healthView.tone === "pending" ? "pending" : void 0,
                    title: healthView.title === "" ? void 0 : healthView.title,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("i", { className: css3.statDot, "data-tone": healthView.tone === "warn" ? "warn" : healthView.tone === "pending" ? "pending" : void 0, "aria-hidden": "true" }),
                      healthView.label
                    ]
                  }
                )
              ] })
            ] }),
            health.state === "issue" && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.healthNotice, role: "status", children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.healthNoticeTitle, children: t("statIssues", { n: health.report.issues.length }) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("ul", { children: health.report.issues.slice(0, 4).map((issue, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { children: issue.message }, `${issue.code}-${String(index)}`)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.presetStrip, role: "group", "aria-label": t("presetStripLabel"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                PresetBall,
                {
                  id: ALL_PRESETS,
                  label: t("presetAll"),
                  active: activePreset === ALL_PRESETS,
                  dot: false,
                  title: t("presetAllName"),
                  onSelect: () => {
                    setActivePreset(ALL_PRESETS);
                  }
                }
              ),
              presets.map((preset) => {
                const label = preset.name ?? preset.id;
                const count = Object.values(overrides[preset.id] ?? {}).filter((state2) => state2 === false).length;
                const parts = [label, preset.id];
                if (preset.isDefault === true) parts.push(t("presetDefaultTag"));
                if (count > 0) parts.push(t("presetOverrideCount", { n: count }));
                return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  PresetBall,
                  {
                    id: preset.id,
                    label,
                    active: activePreset === preset.id,
                    dot: count > 0,
                    title: parts.join(" \xB7 "),
                    onSelect: () => {
                      setActivePreset(preset.id);
                    }
                  },
                  preset.id
                );
              })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.hintRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.hintRowText, children: activePreset === ALL_PRESETS ? t("presetHintAll") : t("presetHintScoped", { name: presets.find((preset) => preset.id === activePreset)?.name ?? activePreset }) }),
              activePreset !== ALL_PRESETS && Object.keys(presetOverride).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.presetReset, onClick: resetActivePreset, children: t("presetReset") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.toolbar, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.searchBox, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SearchIcon, {}),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "input",
                  {
                    className: css3.searchInput,
                    value: query,
                    placeholder: t("searchPlaceholder"),
                    "aria-label": t("searchPlaceholder"),
                    onChange: (event) => {
                      setQuery(event.currentTarget.value);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.dropWrap, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: css3.toolButton,
                    "aria-haspopup": "menu",
                    "aria-expanded": openMenu === "source",
                    onClick: () => {
                      setOpenMenu((value) => value === "source" ? null : "source");
                    },
                    children: [
                      sourceFilter === "all" ? t("filterAll") : sourceFilter === "bundles" ? t("filterBundles") : t("filterLoose"),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconChevronDownOutline14, { size: 12, "aria-hidden": "true" })
                    ]
                  }
                ),
                openMenu === "source" && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.bulkOverlay, "aria-label": t("close"), onClick: () => {
                    setOpenMenu(null);
                  } }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: css3.dropMenu, role: "menu", children: [["all", t("filterAll")], ["bundles", t("filterBundles")], ["loose", t("filterLoose")]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                    "button",
                    {
                      type: "button",
                      role: "menuitemradio",
                      className: css3.dropItem,
                      "aria-checked": sourceFilter === value,
                      onClick: () => {
                        setSourceFilter(value);
                        setOpenMenu(null);
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.dropCheck, "data-on": sourceFilter === value || void 0, "aria-hidden": "true", children: sourceFilter === value ? "\u2713" : "" }),
                        label
                      ]
                    },
                    value
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                "button",
                {
                  type: "button",
                  className: css3.toolButton,
                  "aria-pressed": !sortAsc,
                  onClick: () => {
                    setSortAsc((value) => !value);
                  },
                  children: [
                    t("sortLabel"),
                    " ",
                    sortAsc ? "\u2191" : "\u2193"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.bulkWrap, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "button",
                  {
                    type: "button",
                    className: css3.toolButton,
                    "aria-expanded": bulkOpen,
                    disabled: bulkBusy || noResults,
                    onClick: () => {
                      setBulkOpen((value) => !value);
                    },
                    children: t("bulk")
                  }
                ),
                bulkOpen && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("button", { type: "button", className: css3.bulkOverlay, "aria-label": t("close"), onClick: () => {
                    setBulkOpen(false);
                  } }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.bulkMenu, role: "menu", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("button", { type: "button", role: "menuitem", className: css3.bulkItem, disabled: bulkBusy, onClick: () => {
                      batchSet(true);
                    }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("i", { className: css3.bulkDot, "data-on": "true", "aria-hidden": "true" }),
                      t("bulkEnableAll")
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("button", { type: "button", role: "menuitem", className: css3.bulkItem, disabled: bulkBusy, onClick: () => {
                      batchSet(false);
                    }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("i", { className: css3.bulkDot, "aria-hidden": "true" }),
                      t("bulkDisableAll")
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.toolbarSpacer }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: t("newBundle"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                "button",
                {
                  type: "button",
                  className: css3.toolButton,
                  "aria-expanded": newBundleOpen,
                  onClick: () => {
                    setNewBundleOpen((value) => !value);
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconPlusOutline16, { size: 14 }),
                    t("newBundle")
                  ]
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.viewToggle, role: "group", "aria-label": t("viewGrid"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "button",
                  {
                    type: "button",
                    className: css3.viewBtn,
                    "data-active": viewMode === "list" || void 0,
                    "aria-label": t("viewList"),
                    "aria-pressed": viewMode === "list",
                    onClick: () => {
                      setViewMode("list");
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ListIcon, {})
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "button",
                  {
                    type: "button",
                    className: css3.viewBtn,
                    "data-active": viewMode === "grid" || void 0,
                    "aria-label": t("viewGrid"),
                    "aria-pressed": viewMode === "grid",
                    onClick: () => {
                      setViewMode("grid");
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(GridIcon, {})
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "div",
              {
                className: `${css3.banner} ${dropActive ? css3.bannerActive : ""}`,
                onClick: () => {
                  fileInput.current?.click();
                },
                onDragOver: (event) => {
                  event.preventDefault();
                  setDropActive(true);
                },
                onDragLeave: () => {
                  setDropActive(false);
                },
                onDrop: (event) => {
                  void onDrop(event);
                },
                role: "button",
                tabIndex: 0,
                "aria-label": t("uploadHint"),
                onKeyDown: (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInput.current?.click();
                  }
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bannerIcon, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(BulbIcon, {}) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.bannerText, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bannerTitle, children: install === null ? t("bannerTitle") : t("bannerDiscovered") }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bannerSub, children: install === null ? t("bannerSub") : t("bannerFound", { n: install.archive === true ? 1 : install.files.length, folder: install.folderName }) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    "button",
                    {
                      type: "button",
                      className: css3.bannerBtn,
                      onClick: (event) => {
                        event.stopPropagation();
                        fileInput.current?.click();
                      },
                      children: install === null ? t("bannerBtnBrowse") : t("bannerBtnReview")
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    "input",
                    {
                      ref: fileInput,
                      type: "file",
                      className: css3.hiddenInput,
                      multiple: true,
                      ...{ webkitdirectory: "" },
                      onChange: (event) => {
                        acceptFiles(event.currentTarget.files === null ? null : Array.from(event.currentTarget.files));
                      }
                    }
                  )
                ]
              }
            ),
            newBundleOpen && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("form", { className: css3.inlineForm, onSubmit: (event) => {
              void submitNewBundle(event);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                "input",
                {
                  className: css3.inlineInput,
                  value: newBundleName,
                  placeholder: t("newBundlePlaceholder"),
                  "aria-label": t("newBundlePlaceholder"),
                  autoFocus: true,
                  disabled: creatingBundle,
                  onChange: (event) => {
                    setNewBundleName(event.currentTarget.value);
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "primary", type: "submit", disabled: creatingBundle || newBundleName.trim() === "", children: t("create") }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "outline", type: "button", disabled: creatingBundle, onClick: () => {
                setNewBundleOpen(false);
              }, children: t("cancel") })
            ] }),
            install !== null && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("form", { className: css3.installForm, onSubmit: (event) => {
              void confirmInstall(event);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.installRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "input",
                  {
                    className: css3.inlineInput,
                    value: installName,
                    placeholder: install.archive === true ? t("installNameFromArchive") : t("installNamePlaceholder"),
                    "aria-label": t("installName"),
                    disabled: installing || install.archive === true,
                    onChange: (event) => {
                      setInstallName(event.currentTarget.value);
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "input",
                  {
                    className: css3.inlineInput,
                    value: installDescription,
                    placeholder: t("installDescription"),
                    "aria-label": t("installDescription"),
                    disabled: installing,
                    onChange: (event) => {
                      setInstallDescription(event.currentTarget.value);
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("label", { className: css3.bundleSelect, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.visuallyHidden, children: t("installBundle") }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                    "select",
                    {
                      value: installBundleId ?? "",
                      disabled: installing,
                      onChange: (event) => {
                        setInstallBundleId(event.currentTarget.value === "" ? void 0 : event.currentTarget.value);
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("option", { value: "", children: t("installLoose") }),
                        bundles.map((bundle) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("option", { value: bundle.id, children: bundle.name }, bundle.id))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.installMeta, children: install.archive === true ? t("uploadMeta", { n: 1, folder: install.folderName }) : t("uploadMeta", { n: install.files.length, folder: install.folderName }) })
              ] }),
              install.archive !== true && nameInvalid && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.error, role: "alert", children: t("installNameInvalid") }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.installActions, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "primary", type: "submit", disabled: installing || install.archive !== true && (trimmedName === "" || nameInvalid), children: t("installConfirm") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "outline", type: "button", disabled: installing, onClick: () => {
                  setInstall(null);
                }, children: t("installCancel") })
              ] }),
              installError !== null && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.error, role: "alert", children: installError })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: `${css3.mainScroll} ${modalStaggerClass}`, children: [
              state.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.status, children: t("loading") }) : null,
              state.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.failure, children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { role: "alert", children: t("error") }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_dsh_client_ui_primitives5.Button, { variant: "outline", onClick: refresh, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconRefreshOutline14, {}),
                  " ",
                  t("retry")
                ] })
              ] }) : null,
              state.status === "ready" && (noResults ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.noResult, children: t("noMatch") }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
                visibleBundles.map((bundle) => {
                  const open2 = expanded.has(bundle.id);
                  const renamingThis = renameTarget?.bundleId === bundle.id;
                  const bundleEnabled = bundleEnabledIn(bundle);
                  const bundleToggling = toggling.has(`bundle:${bundle.id}`);
                  const gridClass = viewMode === "list" ? `${css3.skillGrid} ${css3.skillGridList}` : css3.skillGrid;
                  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("section", { className: css3.hubSection, "data-open": open2 ? "true" : void 0, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("header", { className: css3.hubSectionHead, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bundleToggle, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                        "button",
                        {
                          type: "button",
                          role: "switch",
                          "aria-checked": bundleEnabled,
                          "aria-label": bundleEnabled ? t("disableBundle") : t("enableBundle"),
                          title: bundleEnabled ? t("disableBundle") : t("enableBundle"),
                          className: `${css3.toggle} ${bundleEnabled ? css3.toggleOn : css3.toggleOff}`,
                          disabled: bundleToggling || bundle.skillCount === 0,
                          onClick: (event) => {
                            event.stopPropagation();
                            toggleBundle(bundle, !bundleEnabled);
                          },
                          children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.toggleKnob, "aria-hidden": "true" })
                        }
                      ) }),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("button", { type: "button", className: css3.bundleRow, "aria-expanded": open2, onClick: () => {
                        toggleExpanded(bundle.id);
                      }, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bundleName, title: bundle.name, children: bundle.name }),
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bundleCount, children: t("skillsCount", { n: bundle.skillCount }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconChevronDownOutline14, { className: css3.chevron, size: 12, "aria-hidden": "true" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.bundleActions, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: t("rename"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                          "button",
                          {
                            type: "button",
                            className: css3.iconAction,
                            "aria-label": t("rename"),
                            onClick: () => {
                              setRenameTarget({ bundleId: bundle.id, name: bundle.name });
                            },
                            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconEditOutline16, { size: 14 })
                          }
                        ) }),
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Tooltip, { label: t("delete"), side: "bottom", delayMs: 500, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                          "button",
                          {
                            type: "button",
                            className: css3.iconAction,
                            "aria-label": t("delete"),
                            onClick: () => {
                              setConfirm({ kind: "bundle", bundle });
                            },
                            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconTrashOutline16, { size: 14 })
                          }
                        ) })
                      ] }),
                      renamingThis && renameTarget !== null && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("form", { className: `${css3.inlineForm} ${css3.inlineFormBlock}`, onSubmit: (event) => {
                        void submitRename(event);
                      }, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                          "input",
                          {
                            className: css3.inlineInput,
                            value: renameTarget.name,
                            placeholder: t("renameBundlePlaceholder"),
                            "aria-label": t("renameBundlePlaceholder"),
                            autoFocus: true,
                            disabled: renaming,
                            onChange: (event) => {
                              const next = event.currentTarget.value;
                              setRenameTarget((current) => current === null ? current : { ...current, name: next });
                            }
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "primary", type: "submit", disabled: renaming || renameTarget.name.trim() === "", children: t("rename") }),
                        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "outline", type: "button", disabled: renaming, onClick: () => {
                          setRenameTarget(null);
                        }, children: t("cancel") })
                      ] })
                    ] }),
                    open2 && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("ul", { className: gridClass, "data-renamed": renamedFlash === bundle.id ? "true" : void 0, children: bundle.skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { className: css3.status, children: t("bundleNoSkills") }) : bundle.skills.map((skill, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                      SkillCard,
                      {
                        skill,
                        bundleId: bundle.id,
                        bundleName: bundle.name,
                        enabled: skillEnabledIn(skill.name),
                        lockedReason: skillLockedReason(skill.name),
                        scopeLabel,
                        index,
                        onToggle: toggleSkill,
                        onView: openViewer,
                        onRemove: (s) => {
                          void removeFromBundle(bundle.id, s.name);
                        },
                        onDelete: (s) => {
                          setConfirm({ kind: "skill", name: s.name });
                        }
                      },
                      skill.name
                    )) })
                  ] }, bundle.id);
                }),
                visibleLoose.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("section", { className: css3.hubSection, "data-open": "true", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("header", { className: css3.hubSectionHead, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.bundleRow, style: { cursor: "default" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.bundleName, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ListIcon, {}),
                      " ",
                      t("looseTitle")
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.bundleCount, children: t("skillsCount", { n: visibleLoose.length }) })
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("ul", { className: viewMode === "list" ? `${css3.skillGrid} ${css3.skillGridList}` : css3.skillGrid, children: visibleLoose.map((skill, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    SkillCard,
                    {
                      skill,
                      bundleId: null,
                      bundleName: null,
                      enabled: skillEnabledIn(skill.name),
                      lockedReason: skillLockedReason(skill.name),
                      scopeLabel,
                      index,
                      onToggle: toggleSkill,
                      onView: openViewer,
                      onAssign: (s) => {
                        setAssignTarget(s);
                      },
                      onDelete: (s) => {
                        setConfirm({ kind: "skill", name: s.name });
                      }
                    },
                    skill.name
                  )) })
                ] })
              ] }))
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          import_dsh_client_ui_primitives5.Modal,
          {
            open: confirm !== null,
            onClose: () => {
              if (!confirming) setConfirm(null);
            },
            closeLabel: t("close"),
            title: confirmTitle,
            footer: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "outline", disabled: confirming, onClick: () => {
                setConfirm(null);
              }, children: t("cancel") }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.Button, { variant: "primary", disabled: confirming, onClick: () => {
                void confirmDelete();
              }, children: t("delete") })
            ] })
          }
        ),
        viewer !== null && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          import_dsh_client_ui_primitives5.Modal,
          {
            open: true,
            onClose: () => {
              setViewer(null);
            },
            closeLabel: t("close"),
            title: viewer.skill.name + (viewer.file === "SKILL.md" ? "" : " \xB7 " + viewer.file),
            className: css3.viewerModal,
            contentClassName: css3.viewerBody,
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: css3.viewerLayout, children: [
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("nav", { className: css3.viewerNav, "aria-label": t("viewerNav"), children: skillFileRows(Array.isArray(viewer.skill.files) ? viewer.skill.files : []).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
                "div",
                {
                  className: css3.viewerNavItem + (row.kind === "dir" ? " " + css3.viewerNavDir : ""),
                  "data-active": row.kind === "file" && row.path === viewer.file ? "true" : void 0,
                  "data-dir": row.kind === "dir" ? "true" : void 0,
                  style: { paddingLeft: 8 + row.depth * 14 },
                  title: row.path,
                  onClick: row.kind === "file" ? () => {
                    selectViewerFile(row.path);
                  } : void 0,
                  children: [
                    row.kind === "dir" ? "\u{1F4C1} " : "\u{1F4C4} ",
                    row.path
                  ]
                },
                row.path + "-" + String(index)
              )) }),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: css3.viewerContent, children: viewer.loading === true ? t("previewLoading") : viewer.error !== void 0 ? viewer.error : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { dangerouslySetInnerHTML: { __html: renderSkillMarkdown(viewer.content ?? "") } }) })
            ] })
          }
        ),
        assignTarget !== null && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          import_dsh_client_ui_primitives5.Modal,
          {
            open: true,
            onClose: () => {
              setAssignTarget(null);
            },
            closeLabel: t("close"),
            title: t("assignTitle", { name: assignTarget.name }),
            className: css3.assignModal,
            contentClassName: css3.assignModalBody,
            children: bundles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: css3.looseEmpty, children: t("assignEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("ul", { className: css3.assignList, children: bundles.map((bundle, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "button",
              {
                type: "button",
                className: css3.assignCard,
                style: { "--skm-i": index },
                onClick: () => {
                  void doAssign(assignTarget, bundle.id);
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.assignCardIcon, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconFolderOpenOutline16, { size: 16 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: css3.assignCardBody, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.assignCardName, children: bundle.name }),
                    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.assignCardDesc, children: t("skillsCount", { n: bundle.skillCount }) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: css3.assignGo, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_dsh_client_ui_primitives5.IconChevronDownOutline14, { size: 14 }) })
                ]
              }
            ) }, bundle.id)) })
          }
        )
      ]
    }
  );
}

// src/client/usage/entry.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function anchorFromEvent(e) {
  return navAnchorFrom(e.currentTarget);
}
function UsageWorkbenchEntry() {
  ensureModalAnimStyles();
  ensureShellStyles();
  const [open, setOpen] = (0, import_react28.useState)(false);
  const [anchor, setAnchor] = (0, import_react28.useState)(null);
  const { closing, requestClose } = useModalClose(open, () => {
    setOpen(false);
  });
  const rail = useRail();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      NavButton,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_dsh_client_ui_primitives6.IconDataOutline16, { size: rail ? 18 : 16 }),
        label: "\u7528\u91CF",
        rail,
        expanded: open,
        onClick: (e) => {
          e.stopPropagation();
          setAnchor(anchorFromEvent(e));
          setOpen(true);
        }
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(ErrorBoundary, { label: "\u7528\u91CF\u5DE5\u4F5C\u53F0", fallback: null, onError: requestClose, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Workbench, { closing, onClose: requestClose, anchor }) })
  ] });
}
function SkillsEntry() {
  ensureModalAnimStyles();
  ensureShellStyles();
  const [open, setOpen] = (0, import_react28.useState)(false);
  const [anchor, setAnchor] = (0, import_react28.useState)(null);
  const { closing, requestClose } = useModalClose(open, () => {
    setOpen(false);
  });
  const rail = useRail();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      NavButton,
      {
        icon: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("svg", { width: rail ? 18 : 16, height: rail ? 18 : 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })
        ] }),
        label: "\u6280\u80FD",
        rail,
        expanded: open,
        onClick: (e) => {
          e.stopPropagation();
          setAnchor(anchorFromEvent(e));
          setOpen(true);
        }
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(ErrorBoundary, { label: "\u6280\u80FD\u9762\u677F", fallback: null, onError: requestClose, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(SkillsPanel, { closing, onClose: requestClose, anchor }) })
  ] });
}
function UsageSkillsNavApp() {
  ensureNavStyles();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(NavPortal, { name: "usage", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(UsageWorkbenchEntry, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(NavPortal, { name: "skills", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(SkillsEntry, {}) })
  ] });
}
function apply2(ctx) {
  ctx.effect(() => {
    ensureNavMount();
    const holder = document.createElement("div");
    const root = (0, import_client2.createRoot)(holder);
    root.render(/* @__PURE__ */ (0, import_jsx_runtime32.jsx)(UsageSkillsNavApp, {}));
    return () => {
      root.unmount();
    };
  }, "webui: usage/skills nav entries");
}

// src/client/index.ts
init_skill_source();
var inject = ["slots", "locale", "inputTriggers", "sessions"];
function safe(label, run, ctx) {
  try {
    run(ctx);
  } catch (error) {
    console.error(`[dsh-triad] ${label} failed:`, error);
  }
}
function apply3(ctx) {
  safe("memory", applyMemoryClient, ctx);
  safe("usage", apply2, ctx);
  safe("skills", apply, ctx);
}
return module.exports; } });
//# sourceMappingURL=client.js.map
