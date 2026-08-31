/**
 * SkillsPanel — 技能管理面板（自旧 client.js 的 dsh-skill-manager 区域原样提取）。
 *
 * UI 与逻辑保持与旧 bundle 完全一致：技能列表、bundle 管理（新建/重命名/删除/归入）、
 * zip/文件夹上传安装、删除技能、文件查看器。数据全部走 /api/skill-manager/*。
 * 旧代码的 React.createElement 树在此转写为 JSX，样式沿用旧 .skm-* 类名与 token。
 */
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Button, IconChevronDownOutline14, IconCloseOutline16, IconEditOutline16,
  IconFolderOpenOutline16, IconPlusOutline16, IconRefreshOutline14, IconSkillOutline16, IconTrashOutline16, Modal, Tooltip,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { modalStaggerClass } from '../../modal-animation'
import { PshBody, PshHead, PopoverShell, type PopoverAnchor } from '../../popover-shell'

/** ---------------------------------------------------------------- 数据模型 */

interface SkillInfo {
  name: string
  description?: string
  files?: string[]
  fileCount?: number
  compatibility?: string
}

interface BundleInfo {
  id: string
  name: string
  skillCount: number
  skills: SkillInfo[]
}

interface SkillSnapshot {
  bundles: BundleInfo[]
  loose: SkillInfo[]
}

type PanelState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; snapshot: SkillSnapshot }

/** ---------------------------------------------------------------- 文案与参数 */

const SKILL_ZH: Record<string, string> = {
  entry: '技能', panelTitle: '技能管理', close: '关闭', loading: '正在读取技能…',
  error: '暂时无法读取技能。', retry: '重试',
  uploadHint: '拖入技能文件夹安装，或点击选择', uploadMeta: '{n} 个文件 · {folder}',
  fileCount: '{n} 文件', expandSkillFiles: '展开技能文件', previewLoading: '正在加载内容…', viewSkillFiles: '查看技能文件', viewerNav: '技能文件', assignToBundle: '归入 Bundle', assignTitle: '将「{name}」归入', assignEmpty: '还没有技能包,先点「新建 Bundle」创建一个。', deleteSkillBtn: '删除技能',
  installName: '技能名称', installNamePlaceholder: '例如 my-skill', installDescription: '描述（可选）',
  installNameFromArchive: '技能名取自压缩包内的 SKILL.md',
  installNameInvalid: '技能名只能包含小写字母、数字和连字符（a-z 0-9 -）',
  installBundle: '归入 Bundle', installLoose: '不归组（散装）', installConfirm: '安装', installCancel: '取消',
  bundlesTitle: '技能包', bundlesEmpty: '还没有技能包，点「新建 Bundle」创建一个。',
  bundleNoSkills: '还没有技能，可上传或从散装技能中归入。',
  newBundle: '新建 Bundle', newBundlePlaceholder: 'Bundle 名称', create: '创建', cancel: '取消',
  renameBundlePlaceholder: '新的 Bundle 名称', rename: '重命名', delete: '删除',
  skillsCount: '{n} 个技能', removeSkill: '移出',
  looseTitle: '散装技能', looseEmpty: '没有散装 Skill',
  deleteBundleConfirm: '删除 Bundle「{name}」？其中的技能将变为散装。',
  deleteSkillConfirm: '删除技能「{name}」？此操作会删除它的文件。',
  enableSkill: '启用', disableSkill: '禁用',
  enableBundle: '启用全部', disableBundle: '禁用全部',
  toggleFailed: '切换失败：{message}',
  presetAll: '全部',
  presetAllName: '全部 Agent',
  presetStripLabel: 'Agent 预设',
  presetHintAll: '当前编辑「全部 Agent」：开关直接改技能文件，对所有预设生效。',
  presetHintScoped: '当前编辑「{name}」：只对该 Agent 预设生效，其它预设不受影响。',
  presetReset: '清空该预设的单独设置',
  presetDefaultTag: '默认',
  presetOverrideCount: '{n} 项单独设置',
  presetLockedByGlobal: '「全部 Agent」层已禁用，预设层无法打开',
  // 卡片（Skills Hub 风格）文案
  copySkillName: '复制技能名', copiedSkillName: '已复制', toolsLabel: '工具', scopeAll: '全局', tagLoose: '散装',
  // Skills Hub 页面文案
  hubSubtitle: 'Skill 同步工作区', hubWorkspace: '工作区', hubManage: '管理',
  hubMySkills: '我的技能', hubAddSkills: '添加技能', hubBundles: '技能包', hubPresets: 'Agent 预设', hubLoose: '散装技能',
  statManaged: '管理的技能', statEnabled: '全局启用', statLoose: '散装技能', statSync: '同步状态', statHealthy: '全部健康',
  searchPlaceholder: '搜索技能…', filterAll: '全部', filterBundles: '技能包', filterLoose: '散装技能', sortLabel: '名称',
  bulk: '批量', bulkEnableAll: '全部启用', bulkDisableAll: '全部禁用', presetSelect: 'Agent 预设', viewList: '列表', viewGrid: '网格',
  bannerTitle: '添加技能', bannerSub: '拖入技能文件夹安装，或点击浏览选择',
  bannerDiscovered: '发现待导入技能', bannerFound: '发现 {n} 个文件（{folder}）待导入', bannerBtnBrowse: '浏览并导入', bannerBtnReview: '审查并导入',
  noMatch: '没有符合筛选条件的技能',
}

function skillT(key: string, params?: Record<string, string | number>): string {
  let text = SKILL_ZH[key] ?? key
  if (params) {
    for (const k of Object.keys(params)) text = text.split(`{${k}}`).join(String(params[k]))
  }
  return text
}

/** ---------------------------------------------------------------- API */

const SKILL_API_BASE = '/api/skill-manager'

async function skillRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(SKILL_API_BASE + path, options)
  const body = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(body.error || 'request failed (' + String(response.status) + ')')
  return body
}

type InstallInput =
  | { archive: string; description: string; bundleId?: string }
  | { skillName: string; description: string; bundleId?: string; files: Array<{ path: string; data: string }> }

/** 技能开关状态(/api/skill-toggles/status 响应)。 */
interface ToggleStatus {
  skills: Record<string, boolean>
  bundles: Record<string, boolean>
}

/** 一个 Agent 预设(host 从 ctx.agentPresets.list() 投影而来)。 */
interface PresetRow {
  id: string
  trust: 'system' | 'user'
  isDefault?: boolean
  name?: string
  description?: string
  order?: number
}

/** /api/skill-toggles/presets 响应:名单 + 各预设覆盖 + 全局层状态。 */
interface PresetStatus extends ToggleStatus {
  presets: PresetRow[]
  /** presetId → { skillName: false } —— 只有显式 false 才是「该预设下关闭」。 */
  overrides: Record<string, Record<string, boolean>>
}

const skillApi = {
  list: (): Promise<SkillSnapshot> => skillRequest<SkillSnapshot>('/list', { headers: { accept: 'application/json' } }),
  toggleStatus: (): Promise<ToggleStatus> =>
    fetch('/api/skill-toggles/status', { headers: { accept: 'application/json' } })
      .then((response) => response.json() as Promise<ToggleStatus & { error?: string }>)
      .then((body) => {
        if (typeof body !== 'object' || body === null || body.skills === undefined) {
          throw new Error('toggle status unavailable')
        }
        return body as ToggleStatus
      }),
  setSkillEnabled: (name: string, enabled: boolean): Promise<{ ok: boolean }> =>
    fetch(`/api/skill-toggles/skills/${encodeURIComponent(name)}`, {
      method: 'PUT',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ enabled }),
    }).then((response) => response.json() as Promise<{ ok: boolean; error?: string }>)
      .then((body) => {
        if (!body.ok) throw new Error(body.error || 'toggle failed')
        return body
      }),
  setBundleEnabled: (bundleId: string, enabled: boolean): Promise<{ ok: boolean; handled?: number }> =>
    fetch(`/api/skill-toggles/bundles/${encodeURIComponent(bundleId)}`, {
      method: 'PUT',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ enabled }),
    }).then((response) => response.json() as Promise<{ ok: boolean; error?: string; handled?: number }>)
      .then((body) => {
        if (!body.ok) throw new Error(body.error || 'toggle failed')
        return body
      }),
  /** 预设名单 + 各预设覆盖 + 全局层状态(一次拉齐)。 */
  presetStatus: (): Promise<PresetStatus> =>
    fetch('/api/skill-toggles/presets', { headers: { accept: 'application/json' } })
      .then((response) => response.json() as Promise<PresetStatus & { error?: string }>)
      .then((body) => {
        if (typeof body !== 'object' || body === null || !Array.isArray(body.presets)) {
          throw new Error('preset status unavailable')
        }
        return body as PresetStatus
      }),
  setPresetSkillEnabled: (presetId: string, name: string, enabled: boolean): Promise<{ ok: boolean }> =>
    fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/skills/${encodeURIComponent(name)}`, {
      method: 'PUT',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ enabled }),
    }).then((response) => response.json() as Promise<{ ok: boolean; error?: string }>)
      .then((body) => {
        if (!body.ok) throw new Error(body.error || 'toggle failed')
        return body
      }),
  setPresetBundleEnabled: (presetId: string, bundleId: string, enabled: boolean): Promise<{ ok: boolean }> =>
    fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/bundles/${encodeURIComponent(bundleId)}`, {
      method: 'PUT',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ enabled }),
    }).then((response) => response.json() as Promise<{ ok: boolean; error?: string }>)
      .then((body) => {
        if (!body.ok) throw new Error(body.error || 'toggle failed')
        return body
      }),
  resetPreset: (presetId: string): Promise<{ ok: boolean }> =>
    fetch(`/api/skill-toggles/presets/${encodeURIComponent(presetId)}/reset`, {
      method: 'POST',
      headers: { accept: 'application/json' },
    }).then((response) => response.json() as Promise<{ ok: boolean; error?: string }>)
      .then((body) => {
        if (!body.ok) throw new Error(body.error || 'reset failed')
        return body
      }),
  createBundle: (name: string): Promise<Record<string, never>> =>
    skillRequest('/bundles', { method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json' }, body: JSON.stringify({ name }) }),
  renameBundle: (bundleId: string, name: string): Promise<Record<string, never>> =>
    skillRequest(`/bundles/${encodeURIComponent(bundleId)}`, { method: 'PATCH', headers: { accept: 'application/json', 'content-type': 'application/json' }, body: JSON.stringify({ name }) }),
  deleteBundle: (bundleId: string): Promise<Record<string, never>> =>
    skillRequest(`/bundles/${encodeURIComponent(bundleId)}`, { method: 'DELETE', headers: { accept: 'application/json' } }),
  setBundleSkills: (bundleId: string, skillNames: string[]): Promise<Record<string, never>> =>
    skillRequest(`/bundles/${encodeURIComponent(bundleId)}/skills`, { method: 'PUT', headers: { accept: 'application/json', 'content-type': 'application/json' }, body: JSON.stringify({ skillNames }) }),
  deleteSkill: (name: string): Promise<Record<string, never>> =>
    skillRequest(`/skills/${encodeURIComponent(name)}`, { method: 'DELETE', headers: { accept: 'application/json' } }),
  installSkill: (input: InstallInput): Promise<Record<string, never>> =>
    skillRequest('/skills', { method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json' }, body: JSON.stringify(input) }),
}

/** ---------------------------------------------------------------- 样式 */

const css = {
  entry: 'skm-entry',
  label: 'skm-label',
  modal: 'skm-modal',
  modalBody: 'skm-modal-body',
  panel: 'skm-panel',
  topRow: 'skm-top-row',
  newBundleButton: 'skm-new-bundle',
  upload: 'skm-upload',
  uploadActive: 'skm-upload-active',
  hiddenInput: 'skm-hidden-input',
  installForm: 'skm-install-form',
  installRow: 'skm-install-row',
  inlineForm: 'skm-inline-form',
  // 块级变体：改名输入行独占一整行（整行内容保留，表单追加在其下方）。
  inlineFormBlock: 'skm-inline-form-block',
  inlineInput: 'skm-inline-input',
  bundleSelect: 'skm-bundle-select',
  installMeta: 'skm-install-meta',
  installActions: 'skm-install-actions',
  sectionTitle: 'skm-section-title',
  status: 'skm-status',
  failure: 'skm-failure',
  error: 'skm-error',
  bundleList: 'skm-bundle-list',
  bundle: 'skm-bundle',
  bundleRow: 'skm-bundle-row',
  bundleName: 'skm-bundle-name',
  bundleCount: 'skm-bundle-count',
  chevron: 'skm-chevron',
  bundleActions: 'skm-bundle-actions',
  iconAction: 'skm-icon-action',
  skillList: 'skm-skill-list',
  skillItem: 'skm-skill-item',
  skillRow: 'skm-skill-row',
  skillLabel: 'skm-skill-label',
  skillName: 'skm-skill-name',
  skillDescription: 'skm-skill-desc',
  skillExpand: 'skm-skill-expand',
  skillCount: 'skm-skill-count',
  skillCompat: 'skm-skill-compat',
  // 技能卡片（Skills Hub 风格）
  skillGrid: 'skm-skill-grid',
  skillCard: 'skm-skill-card',
  skillCardHead: 'skm-skill-card-head',
  skillIcon: 'skm-skill-icon',
  skillTitleWrap: 'skm-skill-title-wrap',
  skillTitle: 'skm-skill-title',
  skillCopy: 'skm-skill-copy',
  skillCardToggle: 'skm-skill-card-toggle',
  skillDesc: 'skm-skill-card-desc',
  skillTags: 'skm-skill-tags',
  tag: 'skm-tag',
  tagSource: 'skm-tag-source',
  tagScope: 'skm-tag-scope',
  skillMeta: 'skm-skill-meta',
  skillCardFoot: 'skm-skill-card-foot',
  skillFootLabel: 'skm-skill-foot-label',
  skillFootIcon: 'skm-skill-foot-icon',
  skillCardActions: 'skm-skill-card-actions',
  // Skills Hub 页面结构
  hub: 'skm-hub',
  hubSide: 'skm-hub-side',
  hubBrand: 'skm-hub-brand',
  hubLogo: 'skm-hub-logo',
  hubBrandText: 'skm-hub-brand-text',
  hubBrandTitle: 'skm-hub-brand-title',
  hubBrandSub: 'skm-hub-brand-sub',
  hubGroup: 'skm-hub-group',
  hubItem: 'skm-hub-item',
  hubItemActive: 'skm-hub-item-active',
  hubItemIcon: 'skm-hub-item-icon',
  hubItemLabel: 'skm-hub-item-label',
  hubItemCount: 'skm-hub-item-count',
  hubMain: 'skm-hub-main',
  statsRow: 'skm-stats-row',
  stat: 'skm-stat',
  statLabel: 'skm-stat-label',
  statValue: 'skm-stat-value',
  statValueInline: 'skm-stat-value-inline',
  statDot: 'skm-stat-dot',
  toolbar: 'skm-toolbar',
  searchBox: 'skm-search-box',
  searchInput: 'skm-search-input',
  toolSelectWrap: 'skm-tool-select-wrap',
  toolSelect: 'skm-tool-select',
  toolSelectChevron: 'skm-tool-select-chevron',
  toolButton: 'skm-tool-button',
  toolbarSpacer: 'skm-toolbar-spacer',
  bulkWrap: 'skm-bulk-wrap',
  bulkOverlay: 'skm-bulk-overlay',
  bulkMenu: 'skm-bulk-menu',
  bulkItem: 'skm-bulk-item',
  bulkDot: 'skm-bulk-dot',
  presetPill: 'skm-preset-pill',
  presetSelect: 'skm-preset-select',
  presetPillChevron: 'skm-preset-pill-chevron',
  viewToggle: 'skm-view-toggle',
  viewBtn: 'skm-view-btn',
  hintRow: 'skm-hint-row',
  hintRowText: 'skm-hint-row-text',
  banner: 'skm-banner',
  bannerActive: 'skm-banner-active',
  bannerIcon: 'skm-banner-icon',
  bannerText: 'skm-banner-text',
  bannerTitle: 'skm-banner-title',
  bannerSub: 'skm-banner-sub',
  bannerBtn: 'skm-banner-btn',
  mainScroll: 'skm-main-scroll',
  hubSection: 'skm-hub-section',
  hubSectionHead: 'skm-hub-section-head',
  skillGridList: 'skm-skill-grid-list',
  noResult: 'skm-no-result',
  skillFiles: 'skm-skill-files',
  skillFile: 'skm-skill-file',
  skillPreview: 'skm-skill-preview',
  viewerModal: 'skm-viewer-modal',
  viewerBody: 'skm-viewer-body',
  viewerLayout: 'skm-viewer-layout',
  viewerNav: 'skm-viewer-nav',
  viewerNavItem: 'skm-viewer-nav-item',
  viewerNavDir: 'skm-viewer-nav-dir',
  viewerContent: 'skm-viewer-content',
  looseEmpty: 'skm-loose-empty',
  visuallyHidden: 'skm-visually-hidden',
  // 技能/技能包开关
  toggle: 'skm-toggle',
  toggleOn: 'skm-toggle-on',
  toggleOff: 'skm-toggle-off',
  toggleKnob: 'skm-toggle-knob',
  bundleToggle: 'skm-bundle-toggle',
  // Agent 预设分类（圆球）
  presetStrip: 'skm-preset-strip',
  presetBallWrap: 'skm-preset-ball-wrap',
  presetBall: 'skm-preset-ball',
  presetBallLabel: 'skm-preset-ball-label',
  presetHint: 'skm-preset-hint',
  presetHintText: 'skm-preset-hint-text',
  presetReset: 'skm-preset-reset',
}

const STYLE_ID = 'dsh-skill-manager-styles'
const SHEET = `
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
/* 块级变体：width:100% 让它在 .skm-bundle（flex-wrap）里自动换行独占一行，
   输入框因此能吃满整行宽度，不必被两个按钮挤到只剩默认 20 字符。 */
.skm-inline-form-block{width:100%;box-sizing:border-box;padding:0 8px 8px;animation:skm-form-in 160ms ease-out}
@keyframes skm-form-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
/* 改名成功：卡片边框高亮脉冲（1 秒后回落），与整体深色卡片节奏一致 */
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

/* ── 技能卡片（Skills Hub 风格）：双列网格；列表视图切单列宽卡 ── */
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

/* ── Skills Hub 页面骨架：侧栏 / 统计行 / 工具栏 / 横幅 / 分区 ── */
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
.skm-preset-pill{position:relative;flex:none;display:inline-flex;align-items:center;gap:6px;height:36px;box-sizing:border-box;border:1px solid #c9d6f5;border-radius:10px;background:#eef3fd;color:#3b62d6;padding:0 10px;transition:border-color 140ms ease,background 140ms ease}
.skm-preset-pill:hover{border-color:#acc4f0;background:#e4edfc}
.skm-preset-select{appearance:none;-webkit-appearance:none;border:none;outline:none;background:transparent;color:inherit;font-size:13px;line-height:18px;font-family:inherit;padding:0 18px 0 0;cursor:pointer;max-width:150px}
.skm-preset-pill-chevron{position:absolute;right:8px;pointer-events:none;color:#6f8cd6}
.skm-view-toggle{flex:none;display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.12));border-radius:10px;background:var(--dsw-alias-bg-base,#fff);padding:3px;transition:border-color 140ms ease}
.skm-view-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;width:30px;height:28px;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-caption,#adb2b8);cursor:pointer;transition:background 140ms ease,color 140ms ease,transform 140ms ease}
.skm-view-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.04));color:var(--dsw-alias-label-secondary,#61666b)}
.skm-view-btn[data-active]{background:var(--dsw-alias-bg-module-platform,#eef0f2);color:var(--dsw-alias-label-primary,#0f1115)}
.skm-view-btn:active{transform:scale(.94)}
.skm-hint-row{flex:none;display:flex;align-items:center;gap:10px;padding:8px 16px 0}
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

/* ── 技能/技能包开关（Skills Hub 风格：绿色胶囊 + 白色圆钮，回弹过渡） ── */
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

/* ── Agent 预设分类圆球条 ─────────────────────────────────────── */
.skm-preset-strip{flex:none;display:flex;align-items:flex-start;gap:14px;padding:2px 2px 6px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
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

/* ── 移动端：侧栏收窄/隐藏、查看器上下堆叠、卡片网格单列 ───────── */
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

/* ── 减弱动效：卡片入场/悬停位移与开关回弹全部收敛 ───────────── */
@media (prefers-reduced-motion: reduce) {
  .skm-skill-card{animation:none;opacity:1;transition:none}
  .skm-stat{animation:none;opacity:1;transition:none}
  .skm-bulk-menu{animation:none}
  .skm-toggle-knob{transition:none}
  .skm-toggle{transition:none}
  .skm-tag{transition:none}
  .skm-skill-copy,.skm-skill-icon,.skm-skill-foot-icon,.skm-icon-action,.skm-bundle,.skm-hub-item,.skm-tool-button,.skm-banner,.skm-banner-btn,.skm-view-btn{transition:none}
}
`

function ensureStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID) !== null) return
  const tag = document.createElement('style')
  tag.id = STYLE_ID
  tag.textContent = SHEET
  document.head.appendChild(tag)
}

/** ---------------------------------------------------------------- 文件收集 */

function readEntryFile(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => {
    entry.file(resolve, reject)
  })
}

interface CollectedFile { path: string; file: File }

async function collectEntry(entry: FileSystemEntry, prefix: string, out: CollectedFile[]): Promise<void> {
  if (entry.isFile) {
    const fileEntry = entry as FileSystemFileEntry
    const file = await readEntryFile(fileEntry)
    const path = prefix === '' ? entry.name : `${prefix}/${entry.name}`
    out.push({ path, file })
    return
  }
  if (entry.isDirectory) {
    const dirEntry = entry as FileSystemDirectoryEntry
    const reader = dirEntry.createReader()
    const all: FileSystemEntry[] = []
    while (true) {
      const batch = await new Promise<FileSystemEntry[]>((resolve, reject) => {
        reader.readEntries(resolve, reject)
      })
      if (batch.length === 0) break
      all.push(...batch)
    }
    const nextPrefix = prefix === '' ? entry.name : `${prefix}/${entry.name}`
    for (const child of all) await collectEntry(child, nextPrefix, out)
  }
}

function fileToBase64(file: File): Promise<string> {
  return file.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    const chunkSize = 32768
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
    }
    return btoa(binary)
  })
}

/** ---------------------------------------------------------------- markdown 预览 */

// 技能内容预览：极简 markdown 渲染（frontmatter 隐藏，标题/列表/代码块/粗体/行内代码/链接）。
function escapeHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineMd(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

function renderSkillMarkdown(text: string): string {
  const body = String(text).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  const lines = body.split('\n')
  let html = ''
  let inCode = false
  let codeBuf: string[] = []
  let inList = false
  let inQuote = false
  const closeList = (): void => {
    if (inList) { html += '</ul>'; inList = false }
  }
  const closeQuote = (): void => {
    if (inQuote) { html += '</blockquote>'; inQuote = false }
  }
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('```')) {
      if (inCode) {
        html += '<pre>' + escapeHtml(codeBuf.join('\n')) + '</pre>'
        codeBuf = []
        inCode = false
      } else {
        closeList(); closeQuote()
        inCode = true
      }
      continue
    }
    if (inCode) { codeBuf.push(line); continue }
    if (trimmed === '---' || trimmed === '***') {
      closeList(); closeQuote()
      html += '<hr>'
      continue
    }
    if (trimmed.startsWith('>')) {
      if (!inQuote) { closeList(); html += '<blockquote>'; inQuote = true }
      html += '<p>' + inlineMd(trimmed.replace(/^>\s?/, '')) + '</p>'
      continue
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed)
    if (heading !== null) {
      closeList(); closeQuote()
      const level = Math.min(heading[1].length + 2, 5)
      html += `<h${String(level)}>` + inlineMd(heading[2]) + `</h${String(level)}>`
      continue
    }
    const item = /^[-*]\s+(.*)$/.exec(trimmed)
    if (item !== null) {
      if (!inList) { closeQuote(); html += '<ul>'; inList = true }
      html += '<li>' + inlineMd(item[1]) + '</li>'
      continue
    }
    closeList(); closeQuote()
    if (trimmed === '') { html += '<p></p>'; continue }
    html += '<p>' + inlineMd(trimmed) + '</p>'
  }
  closeList(); closeQuote()
  if (inCode) html += '<pre>' + escapeHtml(codeBuf.join('\n')) + '</pre>'
  return html
}

/** ---------------------------------------------------------------- 预设 */

/** 「全部 Agent」虚拟预设的哨兵 id（不会与真实 preset id 冲突：真实 id 不含 *）。 */
const ALL_PRESETS = '*'

/** ---------------------------------------------------------------- 技能行 */

interface ViewRow { kind: 'dir' | 'file'; path: string; depth: number; main: boolean }

function skillFileRows(files: string[]): ViewRow[] {
  const rows: ViewRow[] = []
  const seenDirs = new Set<string>()
  for (const path of files) {
    const parts = path.split('/')
    let dirPath = ''
    for (let i = 0; i < parts.length - 1; i += 1) {
      dirPath = dirPath === '' ? parts[i] : dirPath + '/' + parts[i]
      if (!seenDirs.has(dirPath)) {
        seenDirs.add(dirPath)
        rows.push({ kind: 'dir', path: dirPath + '/', depth: i, main: false })
      }
    }
    rows.push({ kind: 'file', path, depth: parts.length - 1, main: path === 'SKILL.md' })
  }
  return rows
}

/** 复制图标（Feather copy，线性描边，与导航手绘图标同风）。 */
function CopyIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

/** 完成勾图标（Feather check）。 */
function CheckIcon(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ── Skills Hub 页面图标（Feather 线性风） ─────────────── */

function SearchIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function TagIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}

function GridIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function BulbIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  )
}

function HubLogoIcon(): JSX.Element {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.5l9 5.2v10.6l-9 5.2-9-5.2V6.7l9-5.2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 9.5l7-3.8M8.5 9.5v2.4c0 .8.6 1.4 1.4 1.4h4.2c.8 0 1.4.6 1.4 1.4v2.6l-7 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/**
 * 技能卡片（Skills Hub 风格）：
 *   [图标瓷片] 标题(粗)  [复制钮]      [绿色开关]
 *   描述一行（省略号）
 *   [来源 pill][作用域 pill]        N 文件
 *   ────────────────────────────
 *   工具  [查看]  [查看文件按钮]   [归入/移出] [删除]
 */
function SkillCard({ skill, bundleId, bundleName, enabled, lockedReason, scopeLabel, index, onToggle, onView, onAssign, onRemove, onDelete }: {
  skill: SkillInfo
  bundleId: string | null
  bundleName: string | null
  enabled: boolean
  /** 非空时开关被锁住（如：全局层已禁用，预设层无法打开），并显示原因。 */
  lockedReason?: string
  /** 当前作用域 pill 文案（「全部 Agent」= 全局）。 */
  scopeLabel: string
  /** 网格序号：入场错峰动画延时。 */
  index: number
  onToggle: (skill: SkillInfo, enabled: boolean) => void
  onView: (skill: SkillInfo) => void
  onAssign?: (skill: SkillInfo) => void
  onRemove?: (skill: SkillInfo) => void
  onDelete?: (skill: SkillInfo) => void
}): JSX.Element {
  const files = Array.isArray(skill.files) ? skill.files : []
  const description = skill.description ?? ''
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<number | null>(null)
  useEffect(() => () => {
    if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
  }, [])

  const flashCopied = (): void => {
    setCopied(true)
    if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => { setCopied(false) }, 1200)
  }
  /** 复制技能名：主用 clipboard API，回退一个隐藏 textarea + execCommand。 */
  const copyName = (): void => {
    const fallback = (): void => {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = skill.name
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      } catch {
        /* 复制失败静默：按钮仍给出已复制反馈，无副作用。 */
      }
    }
    try {
      if (navigator.clipboard !== undefined) {
        void navigator.clipboard.writeText(skill.name).then(flashCopied, () => { fallback(); flashCopied() })
      } else {
        fallback()
        flashCopied()
      }
    } catch {
      fallback()
      flashCopied()
    }
  }

  const toggleLabel = lockedReason ?? (enabled ? skillT('disableSkill') : skillT('enableSkill'))
  const fileMeta = typeof skill.fileCount === 'number' ? skill.fileCount : files.length
  return (
    <li
      className={css.skillCard}
      style={{ '--skm-i': index } as CSSProperties}
    >
      <div className={css.skillCardHead}>
        <span className={css.skillIcon} aria-hidden="true"><IconSkillOutline16 size={20} /></span>
        <span className={css.skillTitleWrap}>
          <span className={css.skillTitle} title={skill.name}>{skill.name}</span>
          <button
            type="button"
            className={css.skillCopy}
            data-copied={copied ? 'true' : undefined}
            aria-label={copied ? skillT('copiedSkillName') : skillT('copySkillName')}
            title={copied ? skillT('copiedSkillName') : skillT('copySkillName')}
            onClick={copyName}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </span>
        <span className={css.skillCardToggle}>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={toggleLabel}
            title={toggleLabel}
            className={`${css.toggle} ${enabled ? css.toggleOn : css.toggleOff}`}
            disabled={lockedReason !== undefined}
            onClick={(event) => {
              event.stopPropagation()
              onToggle(skill, !enabled)
            }}
          >
            <span className={css.toggleKnob} aria-hidden="true" />
          </button>
        </span>
      </div>
      {description !== '' && (
        <p className={css.skillDesc} title={description}>{description}</p>
      )}
      <div className={css.skillTags}>
        <span className={`${css.tag} ${css.tagSource}`}>{bundleName ?? skillT('tagLoose')}</span>
        <span className={`${css.tag} ${css.tagScope}`} data-off={enabled ? undefined : 'true'}>{scopeLabel}</span>
        <span className={css.skillMeta}>{skillT('fileCount', { n: fileMeta })}</span>
      </div>
      <div className={css.skillCardFoot}>
        <span className={css.skillFootLabel}>{skillT('toolsLabel')}</span>
        <button
          type="button"
          className={css.skillFootIcon}
          aria-label={skillT('viewSkillFiles')}
          title={skillT('viewSkillFiles')}
          disabled={files.length === 0}
          onClick={() => { onView(skill) }}
        >
          <IconFolderOpenOutline16 size={14} aria-hidden="true" />
        </button>
        <div className={css.skillCardActions}>
          {bundleId !== null ? (
            <Tooltip label={skillT('removeSkill')} side="bottom" delayMs={500}>
              <button type="button" className={css.iconAction} aria-label={skillT('removeSkill')} onClick={() => { onRemove?.(skill) }}>
                <IconCloseOutline16 size={14} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip label={skillT('assignToBundle')} side="bottom" delayMs={500}>
              <button type="button" className={css.iconAction} aria-label={skillT('assignToBundle')} onClick={() => { onAssign?.(skill) }}>
                <IconPlusOutline16 size={14} />
              </button>
            </Tooltip>
          )}
          <Tooltip label={skillT('deleteSkillBtn')} side="bottom" delayMs={500}>
            <button type="button" className={css.iconAction} aria-label={skillT('deleteSkillBtn')} onClick={() => { onDelete?.(skill) }}>
              <IconTrashOutline16 size={14} />
            </button>
          </Tooltip>
        </div>
      </div>
    </li>
  )
}

/** ---------------------------------------------------------------- 面板 */

type ConfirmState = { kind: 'bundle'; bundle: BundleInfo } | { kind: 'skill'; name: string }
type InstallState =
  | { archive: true; name: string; data: string; folderName: string }
  | { archive?: false; files: CollectedFile[]; folderName: string }
type ViewerState = { skill: SkillInfo; file: string; loading: boolean; error?: string; content?: string }

const SKILL_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

export function SkillsPanel({ onClose, closing = false, anchor = null, onCardMouseEnter, onCardMouseLeave }: { onClose: () => void; closing?: boolean; anchor?: PopoverAnchor | null; onCardMouseEnter?: () => void; onCardMouseLeave?: () => void }): JSX.Element {
  ensureStyles()
  const [state, setState] = useState<PanelState>({ status: 'loading' })
  const [reload, setReload] = useState(0)
  // Skills Hub 默认全展开：collapsed 只记录「被用户收起」的分区（空 = 全部展开）。
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [viewer, setViewer] = useState<ViewerState | null>(null)
  const [assignTarget, setAssignTarget] = useState<SkillInfo | null>(null)
  const [newBundleOpen, setNewBundleOpen] = useState(false)
  const [newBundleName, setNewBundleName] = useState('')
  const [creatingBundle, setCreatingBundle] = useState(false)
  const [renameTarget, setRenameTarget] = useState<{ bundleId: string; name: string } | null>(null)
  const [renaming, setRenaming] = useState(false)
  // 改名成功的卡片 id：触发一次高亮脉冲，随后自动清除。
  const [renamedFlash, setRenamedFlash] = useState<string | null>(null)
  const renamedTimer = useRef<number | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [install, setInstall] = useState<InstallState | null>(null)
  const [installName, setInstallName] = useState('')
  const [installDescription, setInstallDescription] = useState('')
  const [installBundleId, setInstallBundleId] = useState<string | undefined>(undefined)
  const [installing, setInstalling] = useState(false)
  const [installError, setInstallError] = useState<string | null>(null)
  const [dropActive, setDropActive] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  // 技能/技能包开关状态（skillName → enabled；bundleId → enabled）
  const [toggles, setToggles] = useState<{ skills: Record<string, boolean>; bundles: Record<string, boolean> }>({ skills: {}, bundles: {} })
  // 切换进行中的 key（避免重复点击）
  const [toggling, setToggling] = useState<Set<string>>(new Set())
  // Agent 预设分类：名单 + 各预设覆盖 + 当前选中的预设（'*' = 全部 Agent）
  const [presets, setPresets] = useState<PresetRow[]>([])
  const [overrides, setOverrides] = useState<Record<string, Record<string, boolean>>>({})
  const [activePreset, setActivePreset] = useState<string>(ALL_PRESETS)
  // Skills Hub 工具栏：搜索词 / 来源筛选(全部=all|bundles|loose) / 名称排序 / 批量菜单 / 视图切换
  const [query, setQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'bundles' | 'loose'>('all')
  const [sortAsc, setSortAsc] = useState(true)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkBusy, setBulkBusy] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const refresh = (): void => {
    // 技能目录变更后,同步失效 skill-source 的 slash 菜单快照缓存。
    void import('../../skill-source').then(({ invalidateSkillCache }) => invalidateSkillCache())
    setReload((value) => value + 1)
  }

  /** 开关切换后静默同步:仅失效 slash 缓存并重拉开关状态,不重载整个面板(避免闪烁)。 */
  const refreshTogglesOnly = (): void => {
    void import('../../skill-source').then(({ invalidateSkillCache }) => invalidateSkillCache())
    void skillApi.presetStatus().then(
      (status) => {
        setToggles({ skills: status.skills, bundles: status.bundles })
        setOverrides(status.overrides)
        setPresets(status.presets)
      },
      () => {
        // 预设接口不可用（老 host）时退回只读全局层状态。
        void skillApi.toggleStatus().then((status) => { setToggles(status) }, () => { /* 保持当前显示 */ })
      },
    )
  }

  const t = skillT

  useEffect(() => {
    let current = true
    setState({ status: 'loading' })
    void skillApi.list().then(
      (snapshot) => {
        if (current) setState({ status: 'ready', snapshot })
      },
      () => {
        if (current) setState({ status: 'error' })
      },
    )
    void skillApi.presetStatus().then(
      (status) => {
        if (!current) return
        setToggles({ skills: status.skills, bundles: status.bundles })
        setOverrides(status.overrides)
        setPresets(status.presets)
      },
      () => {
        // 预设接口不可用时退化为「只有全局层」：圆球条只剩「全部 Agent」。
        void skillApi.toggleStatus().then(
          (status) => { if (current) setToggles(status) },
          () => { /* 开关接口也不可用时保持空状态（开关仍可操作,失败会提示）。 */ },
        )
      },
    )
    return () => { current = false }
    // reload 拆分为变化键；open 恒 true（本组件在打开时才渲染）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  // 卸载时清掉改名高亮定时器，避免卸载后 setState。
  useEffect(() => () => {
    if (renamedTimer.current !== null) window.clearTimeout(renamedTimer.current)
  }, [])

  const runToggle = async (key: string, action: () => Promise<unknown>): Promise<void> => {
    if (toggling.has(key)) return
    setToggling((current) => new Set(current).add(key))
    setInstallError(null)
    try {
      await action()
      // 开关只改 frontmatter,技能列表结构不变:静默同步即可,不重载面板。
      refreshTogglesOnly()
    } catch (error) {
      setInstallError(skillT('toggleFailed', { message: error instanceof Error ? error.message : String(error) }))
    } finally {
      setToggling((current) => {
        const next = new Set(current)
        next.delete(key)
        return next
      })
    }
  }

  const toggleSkill = (skill: SkillInfo, enabled: boolean): void => {
    if (activePreset === ALL_PRESETS) {
      void runToggle(`skill:${skill.name}`, () => skillApi.setSkillEnabled(skill.name, enabled))
      return
    }
    void runToggle(
      `skill:${skill.name}`,
      () => skillApi.setPresetSkillEnabled(activePreset, skill.name, enabled),
    )
  }

  const toggleBundle = (bundle: BundleInfo, enabled: boolean): void => {
    if (activePreset === ALL_PRESETS) {
      void runToggle(`bundle:${bundle.id}`, () => skillApi.setBundleEnabled(bundle.id, enabled))
      return
    }
    void runToggle(
      `bundle:${bundle.id}`,
      () => skillApi.setPresetBundleEnabled(activePreset, bundle.id, enabled),
    )
  }

  /** 该预设下被单独关掉的技能（'*' 视图下为空表）。 */
  const presetOverride = activePreset === ALL_PRESETS ? {} : (overrides[activePreset] ?? {})

  /**
   * 当前视图里一个技能的开关值。
   *  - 「全部 Agent」：直接读全局层（SKILL.md frontmatter）；
   *  - 某个预设：全局层关掉的仍显示为关（预设层无法打开全局关掉的技能），
   *    否则看该预设是否有 false 覆盖。
   */
  const skillEnabledIn = (name: string): boolean => {
    if (toggles.skills[name] === false) return false
    if (activePreset === ALL_PRESETS) return true
    return presetOverride[name] !== false
  }

  /** 技能包在当前视图下的开关值：内部技能全开才算开。 */
  const bundleEnabledIn = (bundle: BundleInfo): boolean => {
    if (activePreset === ALL_PRESETS) return toggles.bundles[bundle.id] !== false
    return bundle.skills.every((skill) => skillEnabledIn(skill.name))
  }

  /** 预设视图下，被全局层禁用的技能行锁住开关（预设层只能收窄，无法打开）。 */
  const skillLockedReason = (name: string): string | undefined =>
    activePreset !== ALL_PRESETS && toggles.skills[name] === false ? t('presetLockedByGlobal') : undefined

  /** 清空当前预设的全部单独设置。 */
  const resetActivePreset = (): void => {
    if (activePreset === ALL_PRESETS) return
    void runToggle(`reset:${activePreset}`, () => skillApi.resetPreset(activePreset))
  }

  const toggleExpanded = (bundleId: string): void => {
    setCollapsed((current) => {
      const next = new Set(current)
      if (next.has(bundleId)) next.delete(bundleId)
      else next.add(bundleId)
      return next
    })
  }

  // Skills Hub 默认全展开（参考图整页可见）；用户手动收起后保持各自状态。

  const loadViewerContent = async (skillName: string, filePath: string): Promise<void> => {
    try {
      const res = await fetch(`/api/skill-manager/skills/${encodeURIComponent(skillName)}/files/${encodeURIComponent(filePath)}`)
      const body = await res.json() as { error?: unknown; content?: unknown }
      if (body.error !== undefined) throw new Error(String(body.error))
      setViewer((v) => v === null ? v : { ...v, loading: false, content: (body.content ?? '') as string })
    } catch (error) {
      setViewer((v) => v === null ? v : { ...v, loading: false, error: error instanceof Error ? error.message : String(error) })
    }
  }

  const openViewer = (skill: SkillInfo): void => {
    setViewer({ skill, file: 'SKILL.md', loading: true })
    void loadViewerContent(skill.name, 'SKILL.md')
  }

  const selectViewerFile = (filePath: string): void => {
    if (viewer === null) return
    setViewer({ ...viewer, file: filePath, loading: true, error: undefined })
    void loadViewerContent(viewer.skill.name, filePath)
  }

  const doAssign = async (skill: SkillInfo, bundleId: string): Promise<void> => {
    try {
      if (state.status !== 'ready') return
      const bundle = state.snapshot.bundles.find((candidate) => candidate.id === bundleId)
      if (bundle === undefined) throw new Error('bundle not found')
      await skillApi.setBundleSkills(bundleId, [...bundle.skills.map((s) => s.name), skill.name])
      setAssignTarget(null)
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    }
  }

  const acceptFiles = (files: File[] | null): void => {
    if (files === null || files.length === 0) return
    const collected: CollectedFile[] = []
    for (const file of files) {
      const relative = file.webkitRelativePath
      if (relative === '') continue
      const parts = relative.split('/')
      if (parts.length < 2) continue
      collected.push({ path: parts.slice(1).join('/'), file })
    }
    if (collected.length === 0) return
    const zipCandidate = collected.length === 1 && collected[0].path.toLowerCase().endsWith('.zip') ? collected[0] : undefined
    if (zipCandidate !== undefined) {
      const reader = new FileReader()
      reader.onload = () => {
        const data = String(reader.result ?? '').split(',')[1] ?? ''
        setInstall({ archive: true, name: zipCandidate.path, data, folderName: zipCandidate.path })
        setInstallError(null)
      }
      reader.readAsDataURL(zipCandidate.file)
      return
    }
    const rootName = collected[0]?.path.split('/')[0] ?? ''
    setInstallName(rootName)
    setInstallError(null)
    setInstall({ files: collected, folderName: rootName })
  }

  const onDrop = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault()
    setDropActive(false)
    const collected: CollectedFile[] = []
    const items = event.dataTransfer.items
    if (items === undefined) return
    const pending: Array<Promise<void>> = []
    for (const item of Array.from(items)) {
      const entry = item.webkitGetAsEntry?.()
      if (entry !== undefined && entry !== null) pending.push(collectEntry(entry, '', collected))
    }
    await Promise.all(pending)
    if (collected.length === 0) return
    const zipCandidate = collected.length === 1 && collected[0].path.toLowerCase().endsWith('.zip') ? collected[0] : undefined
    if (zipCandidate !== undefined) {
      setInstall({ archive: true, name: zipCandidate.path, data: await fileToBase64(zipCandidate.file), folderName: zipCandidate.path })
      setInstallError(null)
      return
    }
    const rootName = collected[0]?.path.split('/')[0] ?? ''
    setInstallName(rootName)
    setInstallError(null)
    setInstall({ files: collected, folderName: rootName })
  }

  const confirmInstall = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (install === null || installing) return
    if (install.archive !== true && installName.trim() === '') return
    setInstalling(true)
    setInstallError(null)
    try {
      if (install.archive === true) {
        await skillApi.installSkill({
          archive: install.data,
          description: installDescription.trim(),
          ...installBundleId === undefined ? {} : { bundleId: installBundleId },
        })
      } else {
        const files = await Promise.all(install.files.map(async ({ path, file }) => ({
          path,
          data: await fileToBase64(file),
        })))
        await skillApi.installSkill({
          skillName: installName.trim(),
          description: installDescription.trim(),
          ...installBundleId === undefined ? {} : { bundleId: installBundleId },
          files,
        })
      }
      setInstall(null)
      setInstallName('')
      setInstallDescription('')
      setInstallBundleId(undefined)
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    } finally {
      setInstalling(false)
    }
  }

  const submitNewBundle = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (creatingBundle || newBundleName.trim() === '') return
    setCreatingBundle(true)
    try {
      await skillApi.createBundle(newBundleName.trim())
      setNewBundleName('')
      setNewBundleOpen(false)
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    } finally {
      setCreatingBundle(false)
    }
  }

  const submitRename = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (renaming || renameTarget === null || renameTarget.name.trim() === '') return
    setRenaming(true)
    try {
      await skillApi.renameBundle(renameTarget.bundleId, renameTarget.name.trim())
      // 改名成功后让卡片闪一下高亮（1600ms 后自动清除）。
      const renamedId = renameTarget.bundleId
      if (renamedTimer.current !== null) window.clearTimeout(renamedTimer.current)
      setRenamedFlash(renamedId)
      renamedTimer.current = window.setTimeout(() => { setRenamedFlash(null) }, 1600)
      setRenameTarget(null)
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    } finally {
      setRenaming(false)
    }
  }

  const confirmDelete = async (): Promise<void> => {
    if (confirm === null || confirming) return
    setConfirming(true)
    try {
      if (confirm.kind === 'bundle') await skillApi.deleteBundle(confirm.bundle.id)
      else await skillApi.deleteSkill(confirm.name)
      setConfirm(null)
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    } finally {
      setConfirming(false)
    }
  }

  const removeFromBundle = async (bundleId: string, name: string): Promise<void> => {
    try {
      if (state.status !== 'ready') return
      const bundle = state.snapshot.bundles.find((candidate) => candidate.id === bundleId)
      if (bundle === undefined) return
      await skillApi.setBundleSkills(bundleId, bundle.skills.map((skill) => skill.name).filter((skillName) => skillName !== name))
      refresh()
    } catch (error) {
      setInstallError(error instanceof Error ? error.message : String(error))
    }
  }

  const bundles = state.status === 'ready' ? state.snapshot.bundles : []
  const loose = state.status === 'ready' ? state.snapshot.loose : []
  /** 当前作用域 pill 文案：「全部 Agent」视图 = 全局（Global），预设视图 = 预设名。 */
  const scopeLabel = activePreset === ALL_PRESETS
    ? t('scopeAll')
    : (presets.find((preset) => preset.id === activePreset)?.name ?? activePreset)

  /* ── Skills Hub 派生数据：搜索 / 来源筛选 / 排序 ── */
  const q = query.trim().toLowerCase()
  const qMatch = (skill: SkillInfo): boolean => {
    if (q === '') return true
    if (skill.name.toLowerCase().includes(q)) return true
    return (skill.description ?? '').toLowerCase().includes(q)
  }
  const sortedSkills = (list: SkillInfo[]): SkillInfo[] => [...list].sort((a, b) => {
    const order = a.name.localeCompare(b.name)
    return sortAsc ? order : -order
  })
  const visibleBundles = (sourceFilter === 'loose' ? [] : bundles)
    .map((bundle) => ({ ...bundle, skills: sortedSkills(bundle.skills.filter(qMatch)) }))
    .filter((bundle) => bundle.skills.length > 0)
  const visibleLoose = sourceFilter === 'bundles' ? [] : sortedSkills(loose.filter(qMatch))
  const totalSkills = bundles.reduce((n, bundle) => n + bundle.skillCount, 0) + loose.length
  const bundleCount = bundles.length
  const presetCount = presets.length
  const enabledCount = (() => {
    let n = 0
    for (const bundle of bundles) for (const skill of bundle.skills) if (toggles.skills[skill.name] !== false) n += 1
    for (const skill of loose) if (toggles.skills[skill.name] !== false) n += 1
    return n
  })()
  const noResults = visibleBundles.length === 0 && visibleLoose.length === 0

  /** 批量启用/禁用当前筛选下可见的技能（一次串行推进，失败提示）。 */
  const batchSet = (enabled: boolean): void => {
    setBulkOpen(false)
    if (bulkBusy) return
    const targets = visibleBundles.flatMap((bundle) => bundle.skills).concat(visibleLoose)
    if (targets.length === 0) return
    setBulkBusy(true)
    const actions = targets.map((skill) => activePreset === ALL_PRESETS
      ? skillApi.setSkillEnabled(skill.name, enabled)
      : skillApi.setPresetSkillEnabled(activePreset, skill.name, enabled))
    void Promise.all(actions).then(
      () => { refreshTogglesOnly() },
      (error) => {
        setInstallError(skillT('toggleFailed', { message: error instanceof Error ? error.message : String(error) }))
      },
    ).finally(() => { setBulkBusy(false) })
  }

  const trimmedName = installName.trim()
  const nameInvalid = trimmedName !== '' && !SKILL_NAME_PATTERN.test(trimmedName)

  const confirmTitle = confirm === null
    ? t('deleteSkillConfirm', { name: '' })
    : confirm.kind === 'bundle'
      ? t('deleteBundleConfirm', { name: confirm.bundle.name })
      : t('deleteSkillConfirm', { name: confirm.name })

  return (
    <PopoverShell
      solid
      closing={closing}
      onClose={() => {
        // 安装/确认进行中禁止关闭；二级弹窗（确认/查看器/归组）打开时 Esc 归二级弹窗。
        if (installing || confirming) return
        if (confirm !== null || viewer !== null || assignTarget !== null) return
        onClose()
      }}
      anchor={anchor}
      onCardMouseEnter={onCardMouseEnter}
      onCardMouseLeave={onCardMouseLeave}
      size={{ width: 1400, height: 860 }}
      ariaLabel={t('panelTitle')}
    >
      <PshHead
        title={t('panelTitle')}
        closeLabel={t('close')}
        onClose={() => {
          if (installing || confirming) return
          onClose()
        }}
      />
      <PshBody className={css.modalBody}>
      <div className={css.hub} aria-busy={state.status === 'loading'}>
        {/* ── 左侧栏：品牌 + 工作区/管理导航 ── */}
        <aside className={css.hubSide}>
          <div className={css.hubBrand}>
            <span className={css.hubLogo}><HubLogoIcon /></span>
            <span className={css.hubBrandText}>
              <span className={css.hubBrandTitle}>{t('panelTitle')}</span>
              <span className={css.hubBrandSub}>{t('hubSubtitle')}</span>
            </span>
          </div>
          <div className={css.hubGroup}>{t('hubWorkspace')}</div>
          <button
            type="button"
            className={`${css.hubItem} ${sourceFilter === 'all' ? css.hubItemActive : ''}`}
            data-active={sourceFilter === 'all' || undefined}
            onClick={() => { setSourceFilter('all') }}
          >
            <span className={css.hubItemIcon}><GridIcon /></span>
            <span className={css.hubItemLabel}>{t('hubMySkills')}</span>
            <span className={css.hubItemCount}>{totalSkills}</span>
          </button>
          <button type="button" className={css.hubItem} onClick={() => { fileInput.current?.click() }}>
            <span className={css.hubItemIcon}><IconPlusOutline16 size={14} /></span>
            <span className={css.hubItemLabel}>{t('hubAddSkills')}</span>
          </button>
          <div className={css.hubGroup}>{t('hubManage')}</div>
          <button
            type="button"
            className={`${css.hubItem} ${sourceFilter === 'bundles' ? css.hubItemActive : ''}`}
            data-active={sourceFilter === 'bundles' || undefined}
            onClick={() => { setSourceFilter('bundles') }}
          >
            <span className={css.hubItemIcon}><IconFolderOpenOutline16 size={14} /></span>
            <span className={css.hubItemLabel}>{t('hubBundles')}</span>
            <span className={css.hubItemCount}>{bundleCount}</span>
          </button>
          <button
            type="button"
            className={`${css.hubItem} ${activePreset !== ALL_PRESETS ? css.hubItemActive : ''}`}
            data-active={activePreset !== ALL_PRESETS || undefined}
            onClick={() => { setSourceFilter('all') }}
          >
            <span className={css.hubItemIcon}><TagIcon /></span>
            <span className={css.hubItemLabel}>{t('hubPresets')}</span>
            <span className={css.hubItemCount}>{presetCount}</span>
          </button>
          <button
            type="button"
            className={`${css.hubItem} ${sourceFilter === 'loose' ? css.hubItemActive : ''}`}
            data-active={sourceFilter === 'loose' || undefined}
            onClick={() => { setSourceFilter('loose') }}
          >
            <span className={css.hubItemIcon}><ListIcon /></span>
            <span className={css.hubItemLabel}>{t('hubLoose')}</span>
            <span className={css.hubItemCount}>{loose.length}</span>
          </button>
        </aside>

        {/* ── 主区 ── */}
        <div className={css.hubMain}>
          {/* 统计行 */}
          <div className={css.statsRow}>
            <div className={css.stat}><span className={css.statLabel}>{t('statManaged')}</span><span className={css.statValue}>{totalSkills}</span></div>
            <div className={css.stat}><span className={css.statLabel}>{t('statEnabled')}</span><span className={css.statValue}>{enabledCount}</span></div>
            <div className={css.stat}><span className={css.statLabel}>{t('statLoose')}</span><span className={css.statValue}>{loose.length}</span></div>
            <div className={css.stat}>
              <span className={css.statLabel}>{t('statSync')}</span>
              <span className={`${css.statValue} ${css.statValueInline}`}><i className={css.statDot} aria-hidden="true" />{t('statHealthy')}</span>
            </div>
          </div>

          {/* 工具栏：搜索 / 来源筛选 / 排序 / 批量 / 新建 / 预设 / 视图 */}
          <div className={css.toolbar}>
            <div className={css.searchBox}>
              <SearchIcon />
              <input
                className={css.searchInput}
                value={query}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                onChange={(event) => { setQuery(event.currentTarget.value) }}
              />
            </div>
            <label className={css.toolSelectWrap}>
              <span className={css.visuallyHidden}>{t('filterAll')}</span>
              <select
                className={css.toolSelect}
                value={sourceFilter}
                onChange={(event) => { setSourceFilter(event.currentTarget.value as 'all' | 'bundles' | 'loose') }}
              >
                <option value="all">{t('filterAll')}</option>
                <option value="bundles">{t('filterBundles')}</option>
                <option value="loose">{t('filterLoose')}</option>
              </select>
              <IconChevronDownOutline14 size={12} className={css.toolSelectChevron} aria-hidden="true" />
            </label>
            <button
              type="button"
              className={css.toolButton}
              aria-pressed={!sortAsc}
              onClick={() => { setSortAsc((value) => !value) }}
            >
              {t('sortLabel')} {sortAsc ? '↑' : '↓'}
            </button>
            <div className={css.bulkWrap}>
              <button
                type="button"
                className={css.toolButton}
                aria-expanded={bulkOpen}
                disabled={bulkBusy || noResults}
                onClick={() => { setBulkOpen((value) => !value) }}
              >
                {t('bulk')}
              </button>
              {bulkOpen && (
                <>
                  <button type="button" className={css.bulkOverlay} aria-label={t('close')} onClick={() => { setBulkOpen(false) }} />
                  <div className={css.bulkMenu} role="menu">
                    <button type="button" role="menuitem" className={css.bulkItem} disabled={bulkBusy} onClick={() => { batchSet(true) }}>
                      <i className={css.bulkDot} data-on="true" aria-hidden="true" />{t('bulkEnableAll')}
                    </button>
                    <button type="button" role="menuitem" className={css.bulkItem} disabled={bulkBusy} onClick={() => { batchSet(false) }}>
                      <i className={css.bulkDot} aria-hidden="true" />{t('bulkDisableAll')}
                    </button>
                  </div>
                </>
              )}
            </div>
            <span className={css.toolbarSpacer} />
            <Tooltip label={t('newBundle')} side="bottom" delayMs={500}>
              <button
                type="button"
                className={css.toolButton}
                aria-expanded={newBundleOpen}
                onClick={() => { setNewBundleOpen((value) => !value) }}
              >
                <IconPlusOutline16 size={14} />
                {t('newBundle')}
              </button>
            </Tooltip>
            <label className={css.presetPill}>
              <TagIcon />
              <select
                className={css.presetSelect}
                value={activePreset}
                aria-label={t('presetSelect')}
                onChange={(event) => { setActivePreset(event.currentTarget.value) }}
              >
                <option value={ALL_PRESETS}>{t('presetAllName')}</option>
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>{preset.name ?? preset.id}</option>
                ))}
              </select>
              <IconChevronDownOutline14 size={12} className={css.presetPillChevron} aria-hidden="true" />
            </label>
            <div className={css.viewToggle} role="group" aria-label={t('viewGrid')}>
              <button
                type="button"
                className={css.viewBtn}
                data-active={viewMode === 'list' || undefined}
                aria-label={t('viewList')}
                aria-pressed={viewMode === 'list'}
                onClick={() => { setViewMode('list') }}
              >
                <ListIcon />
              </button>
              <button
                type="button"
                className={css.viewBtn}
                data-active={viewMode === 'grid' || undefined}
                aria-label={t('viewGrid')}
                aria-pressed={viewMode === 'grid'}
                onClick={() => { setViewMode('grid') }}
              >
                <GridIcon />
              </button>
            </div>
          </div>

          {/* 预设提示行：当前编辑层说明 + 清空该预设的单独设置 */}
          <div className={css.hintRow}>
            <span className={css.hintRowText}>
              {activePreset === ALL_PRESETS
                ? t('presetHintAll')
                : t('presetHintScoped', { name: presets.find((preset) => preset.id === activePreset)?.name ?? activePreset })}
            </span>
            {activePreset !== ALL_PRESETS && Object.keys(presetOverride).length > 0 && (
              <button type="button" className={css.presetReset} onClick={resetActivePreset}>
                {t('presetReset')}
              </button>
            )}
          </div>

          {/* 黄色发现横幅：安装 / 导入入口（可拖放） */}
          <div
            className={`${css.banner} ${dropActive ? css.bannerActive : ''}`}
            onClick={() => { fileInput.current?.click() }}
            onDragOver={(event) => { event.preventDefault(); setDropActive(true) }}
            onDragLeave={() => { setDropActive(false) }}
            onDrop={(event) => { void onDrop(event) }}
            role="button"
            tabIndex={0}
            aria-label={t('uploadHint')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                fileInput.current?.click()
              }
            }}
          >
            <span className={css.bannerIcon}><BulbIcon /></span>
            <span className={css.bannerText}>
              <span className={css.bannerTitle}>
                {install === null ? t('bannerTitle') : t('bannerDiscovered')}
              </span>
              <span className={css.bannerSub}>
                {install === null
                  ? t('bannerSub')
                  : t('bannerFound', { n: install.archive === true ? 1 : install.files.length, folder: install.folderName })}
              </span>
            </span>
            <button
              type="button"
              className={css.bannerBtn}
              onClick={(event) => {
                event.stopPropagation()
                fileInput.current?.click()
              }}
            >
              {install === null ? t('bannerBtnBrowse') : t('bannerBtnReview')}
            </button>
            <input
              ref={fileInput}
              type="file"
              className={css.hiddenInput}
              multiple
              {...{ webkitdirectory: '' }}
              onChange={(event) => {
                acceptFiles(event.currentTarget.files === null ? null : Array.from(event.currentTarget.files))
              }}
            />
          </div>

          {newBundleOpen && (
            <form className={css.inlineForm} onSubmit={(event) => { void submitNewBundle(event) }}>
              <input className={css.inlineInput} value={newBundleName} placeholder={t('newBundlePlaceholder')}
                aria-label={t('newBundlePlaceholder')} autoFocus disabled={creatingBundle}
                onChange={(event) => { setNewBundleName(event.currentTarget.value) }} />
              <Button variant="primary" type="submit" disabled={creatingBundle || newBundleName.trim() === ''}>{t('create')}</Button>
              <Button variant="outline" type="button" disabled={creatingBundle} onClick={() => { setNewBundleOpen(false) }}>{t('cancel')}</Button>
            </form>
          )}

          {install !== null && (
            <form className={css.installForm} onSubmit={(event) => { void confirmInstall(event) }}>
              <div className={css.installRow}>
                <input className={css.inlineInput} value={installName}
                  placeholder={install.archive === true ? t('installNameFromArchive') : t('installNamePlaceholder')}
                  aria-label={t('installName')}
                  disabled={installing || install.archive === true}
                  onChange={(event) => { setInstallName(event.currentTarget.value) }} />
                <input className={css.inlineInput} value={installDescription} placeholder={t('installDescription')}
                  aria-label={t('installDescription')} disabled={installing}
                  onChange={(event) => { setInstallDescription(event.currentTarget.value) }} />
                <label className={css.bundleSelect}>
                  <span className={css.visuallyHidden}>{t('installBundle')}</span>
                  <select value={installBundleId ?? ''} disabled={installing}
                    onChange={(event) => { setInstallBundleId(event.currentTarget.value === '' ? undefined : event.currentTarget.value) }}>
                    <option value="">{t('installLoose')}</option>
                    {bundles.map((bundle) => <option key={bundle.id} value={bundle.id}>{bundle.name}</option>)}
                  </select>
                </label>
                <span className={css.installMeta}>
                  {install.archive === true
                    ? t('uploadMeta', { n: 1, folder: install.folderName })
                    : t('uploadMeta', { n: install.files.length, folder: install.folderName })}
                </span>
              </div>
              {install.archive !== true && nameInvalid && <p className={css.error} role="alert">{t('installNameInvalid')}</p>}
              <div className={css.installActions}>
                <Button variant="primary" type="submit" disabled={installing || (install.archive !== true && (trimmedName === '' || nameInvalid))}>{t('installConfirm')}</Button>
                <Button variant="outline" type="button" disabled={installing} onClick={() => { setInstall(null) }}>{t('installCancel')}</Button>
              </div>
              {installError !== null && <p className={css.error} role="alert">{installError}</p>}
            </form>
          )}

          {/* 内容区：技能包 sections + 散装技能 */}
          <div className={`${css.mainScroll} ${modalStaggerClass}`}>
            {state.status === 'loading' ? <p className={css.status}>{t('loading')}</p> : null}
            {state.status === 'error' ? (
              <div className={css.failure}>
                <p role="alert">{t('error')}</p>
                <Button variant="outline" onClick={refresh}><IconRefreshOutline14 /> {t('retry')}</Button>
              </div>
            ) : null}

            {state.status === 'ready' && (
              noResults ? (
                <p className={css.noResult}>{t('noMatch')}</p>
              ) : (
                <>
                  {visibleBundles.map((bundle) => {
                    const open2 = !collapsed.has(bundle.id)
                    const renamingThis = renameTarget?.bundleId === bundle.id
                    const bundleEnabled = bundleEnabledIn(bundle)
                    const bundleToggling = toggling.has(`bundle:${bundle.id}`)
                    const gridClass = viewMode === 'list' ? `${css.skillGrid} ${css.skillGridList}` : css.skillGrid
                    return (
                      <section key={bundle.id} className={css.hubSection} data-open={open2 ? 'true' : undefined}>
                        <header className={css.hubSectionHead}>
                          <span className={css.bundleToggle}>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={bundleEnabled}
                              aria-label={bundleEnabled ? t('disableBundle') : t('enableBundle')}
                              title={bundleEnabled ? t('disableBundle') : t('enableBundle')}
                              className={`${css.toggle} ${bundleEnabled ? css.toggleOn : css.toggleOff}`}
                              disabled={bundleToggling || bundle.skillCount === 0}
                              onClick={(event) => {
                                event.stopPropagation()
                                toggleBundle(bundle, !bundleEnabled)
                              }}
                            >
                              <span className={css.toggleKnob} aria-hidden="true" />
                            </button>
                          </span>
                          <button type="button" className={css.bundleRow} aria-expanded={open2} onClick={() => { toggleExpanded(bundle.id) }}>
                            <span className={css.bundleName} title={bundle.name}>{bundle.name}</span>
                            <span className={css.bundleCount}>{t('skillsCount', { n: bundle.skillCount })}</span>
                            <IconChevronDownOutline14 className={css.chevron} size={12} aria-hidden="true" />
                          </button>
                          <div className={css.bundleActions}>
                            <Tooltip label={t('rename')} side="bottom" delayMs={500}>
                              <button type="button" className={css.iconAction} aria-label={t('rename')}
                                onClick={() => { setRenameTarget({ bundleId: bundle.id, name: bundle.name }) }}>
                                <IconEditOutline16 size={14} />
                              </button>
                            </Tooltip>
                            <Tooltip label={t('delete')} side="bottom" delayMs={500}>
                              <button type="button" className={css.iconAction} aria-label={t('delete')}
                                onClick={() => { setConfirm({ kind: 'bundle', bundle }) }}>
                                <IconTrashOutline16 size={14} />
                              </button>
                            </Tooltip>
                          </div>
                          {renamingThis && renameTarget !== null && (
                            <form className={`${css.inlineForm} ${css.inlineFormBlock}`} onSubmit={(event) => { void submitRename(event) }}>
                              <input className={css.inlineInput} value={renameTarget.name} placeholder={t('renameBundlePlaceholder')}
                                aria-label={t('renameBundlePlaceholder')} autoFocus disabled={renaming}
                                onChange={(event) => {
                                  // 先把值取出再进 setState 回调：React 合成事件在
                                  // 回调执行完毕后会把 currentTarget 置空，若在函数式
                                  // updater 里才读 event.currentTarget.value，渲染阶段
                                  // 会抛 Cannot read properties of null，整个技能面板
                                  // 被 ErrorBoundary 摘掉——表现就是「改名时卡片消失」。
                                  const next = event.currentTarget.value
                                  setRenameTarget((current) => current === null ? current : { ...current, name: next })
                                }} />
                              <Button variant="primary" type="submit" disabled={renaming || renameTarget.name.trim() === ''}>{t('rename')}</Button>
                              <Button variant="outline" type="button" disabled={renaming} onClick={() => { setRenameTarget(null) }}>{t('cancel')}</Button>
                            </form>
                          )}
                        </header>
                        {open2 && (
                          <ul className={gridClass} data-renamed={renamedFlash === bundle.id ? 'true' : undefined}>
                            {bundle.skills.length === 0 ? (
                              <li className={css.status}>{t('bundleNoSkills')}</li>
                            ) : bundle.skills.map((skill, index) => (
                              <SkillCard key={skill.name} skill={skill} bundleId={bundle.id} bundleName={bundle.name}
                                enabled={skillEnabledIn(skill.name)}
                                lockedReason={skillLockedReason(skill.name)}
                                scopeLabel={scopeLabel}
                                index={index}
                                onToggle={toggleSkill}
                                onView={openViewer}
                                onRemove={(s) => { void removeFromBundle(bundle.id, s.name) }}
                                onDelete={(s) => { setConfirm({ kind: 'skill', name: s.name }) }} />
                            ))}
                          </ul>
                        )}
                      </section>
                    )
                  })}

                  {visibleLoose.length > 0 && (
                    <section className={css.hubSection} data-open="true">
                      <header className={css.hubSectionHead}>
                        <span className={css.bundleRow} style={{ cursor: 'default' }}>
                          <span className={css.bundleName}><ListIcon /> {t('looseTitle')}</span>
                          <span className={css.bundleCount}>{t('skillsCount', { n: visibleLoose.length })}</span>
                        </span>
                      </header>
                      <ul className={viewMode === 'list' ? `${css.skillGrid} ${css.skillGridList}` : css.skillGrid}>
                        {visibleLoose.map((skill, index) => (
                          <SkillCard key={skill.name} skill={skill} bundleId={null} bundleName={null}
                            enabled={skillEnabledIn(skill.name)}
                            lockedReason={skillLockedReason(skill.name)}
                            scopeLabel={scopeLabel}
                            index={index}
                            onToggle={toggleSkill}
                            onView={openViewer}
                            onAssign={(s) => { setAssignTarget(s) }}
                            onDelete={(s) => { setConfirm({ kind: 'skill', name: s.name }) }} />
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
      </PshBody>

      <Modal
        open={confirm !== null}
        onClose={() => {
          if (!confirming) setConfirm(null)
        }}
        closeLabel={t('close')}
        title={confirmTitle}
        footer={
          <>
            <Button variant="outline" disabled={confirming} onClick={() => { setConfirm(null) }}>{t('cancel')}</Button>
            <Button variant="primary" disabled={confirming} onClick={() => { void confirmDelete() }}>{t('delete')}</Button>
          </>
        }
      />

      {viewer !== null && (
        <Modal
          open
          onClose={() => { setViewer(null) }}
          closeLabel={t('close')}
          title={viewer.skill.name + (viewer.file === 'SKILL.md' ? '' : ' · ' + viewer.file)}
          className={css.viewerModal}
          contentClassName={css.viewerBody}
        >
          <div className={css.viewerLayout}>
            <nav className={css.viewerNav} aria-label={t('viewerNav')}>
              {skillFileRows(Array.isArray(viewer.skill.files) ? viewer.skill.files : []).map((row, index) => (
                <div
                  key={row.path + '-' + String(index)}
                  className={css.viewerNavItem + (row.kind === 'dir' ? ' ' + css.viewerNavDir : '')}
                  data-active={row.kind === 'file' && row.path === viewer.file ? 'true' : undefined}
                  data-dir={row.kind === 'dir' ? 'true' : undefined}
                  style={{ paddingLeft: 8 + row.depth * 14 }}
                  title={row.path}
                  onClick={row.kind === 'file' ? () => { selectViewerFile(row.path) } : undefined}
                >
                  {row.kind === 'dir' ? '📁 ' : '📄 '}
                  {row.path}
                </div>
              ))}
            </nav>
            <div className={css.viewerContent}>
              {viewer.loading === true
                ? t('previewLoading')
                : viewer.error !== undefined
                  ? viewer.error
                  : <div dangerouslySetInnerHTML={{ __html: renderSkillMarkdown(viewer.content ?? '') }} />}
            </div>
          </div>
        </Modal>
      )}

      {assignTarget !== null && (
        <Modal
          open
          onClose={() => { setAssignTarget(null) }}
          closeLabel={t('close')}
          title={t('assignTitle', { name: assignTarget.name })}
          className={css.viewerModal}
          contentClassName={css.viewerBody}
        >
          <div className={css.skillList}>
            {bundles.length === 0 ? (
              <p className={css.looseEmpty}>{t('assignEmpty')}</p>
            ) : bundles.map((bundle) => (
              <div
                key={bundle.id}
                className={css.skillRow}
                style={{ cursor: 'pointer' }}
                onClick={() => { void doAssign(assignTarget, bundle.id) }}
              >
                <span className={css.skillLabel}>
                  <span className={css.skillName}>{bundle.name}</span>
                  <span className={css.skillDescription}>{t('skillsCount', { n: bundle.skillCount })}</span>
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </PopoverShell>
  )
}
