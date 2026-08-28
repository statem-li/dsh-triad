/**
 * dsh-triad — host half entry.
 *
 * Mounts three modules on one Cordis plugin:
 *
 *  - memory  → local memory engine (LLM extraction, embedding retrieval,
 *              `agent/pre-step` injection, tools, `/api/dsh-memory/*`)
 *  - usage   → token-usage analytics + provider balances (`/api/usage-stats/*`)
 *  - skills  → skill bundle management (`/api/skill-manager/*`)
 *
 * The usage + skills halves are the already-proven `dsh-usage-skill` host,
 * vendored under `vendor/usage-skill/`. The memory engine is ported from
 * `dsh-webui`. No DSH source is modified.
 *
 * Each module mounts inside its own try/catch: a failure in one must never
 * stop the others from mounting.
 */

import type { Context } from '@deepseek-ai/cordis'
import { applyMemory } from './memory/index.js'
// @ts-expect-error — vendored JS half (no type declarations shipped)
import { apply as applyUsageHost } from '../vendor/usage-skill/index.js'
import { apply as applySkillToggles } from './skill-toggles.js'
import type { MemoryConfig } from './memory/types.js'

/** Stable Cordis plugin name. */
export const name = 'dsh-triad'

/**
 * Host services required before this plugin activates.
 *
 * Union of both halves:
 *  - memory → webServer, tools
 *  - usage  → webServer, credentials, sessions, sessionPersistence, settings, llm
 */
export const inject = [
  'webServer',
  'tools',
  'credentials',
  'sessions',
  'sessionPersistence',
  'settings',
  'llm',
]

/** Runtime config shape (supplied through `cordis.patch.yml`). */
export interface TriadConfig {
  /** Memory engine overrides; omitted keys fall back to DEFAULT_CONFIG. */
  memory?: Partial<MemoryConfig>
  /** Usage/account overrides forwarded to the vendored usage host. */
  usage?: Record<string, unknown>
}

export async function apply(ctx: Context, config: TriadConfig = {}): Promise<void> {
  // ── 记忆引擎 ────────────────────────────────────────────────────────
  try {
    applyMemory(ctx, config.memory)
    ctx.logger?.info?.('[dsh-triad] memory engine mounted')
  } catch (error) {
    ctx.logger?.warn?.(
      `[dsh-triad] memory engine failed to mount: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`,
    )
  }

  // ── 用量 + 技能 ─────────────────────────────────────────────────────
  try {
    await applyUsageHost(ctx, config.usage ?? {})
    ctx.logger?.info?.('[dsh-triad] usage + skills host mounted')
  } catch (error) {
    ctx.logger?.warn?.(
      `[dsh-triad] usage host failed to mount: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`,
    )
  }

  // ── 技能开关（全局层 + Agent 预设层）───────────────────────────────
  // /api/skill-toggles/*：技能面板的开关与「Agent 预设」筛选条都靠它。
  // 与 skill-manager（集合管理）是 webui 里两个独立模块，缺了这个
  // 面板顶部就没有预设条，且所有开关请求 404。
  try {
    await applySkillToggles(ctx)
    ctx.logger?.info?.('[dsh-triad] skill toggles mounted')
  } catch (error) {
    ctx.logger?.warn?.(
      `[dsh-triad] skill toggles failed to mount: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`,
    )
  }
}
