/**
 * dsh-triad — browser half entry.
 *
 * Mounts three modules, each isolated so a failure in one cannot take down
 * the others:
 *
 *  - memory   → sidebar nav row + panel + composer inject toggle
 *  - usage    → sidebar nav row + workbench (usage / trend / accounts / signal)
 *  - skills   → sidebar nav row + panel + `/` slash source + skill tool row
 *
 * All data comes from the host half's loopback-only HTTP routes via
 * same-origin fetch. No DSH source is modified.
 */

import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { applyMemoryClient } from './memory/index.js'
import { apply as applyUsageEntries } from './usage/entry.js'
import { apply as applySkillSource } from './skill-source/index.js'

/** Client services required before the browser half activates. */
export const inject = ['slots', 'locale', 'inputTriggers', 'sessions']

/** Run one module's apply, logging and swallowing any failure. */
function safe(label: string, run: (ctx: ClientContext) => void, ctx: ClientContext): void {
  try {
    run(ctx)
  } catch (error) {
    console.error(`[dsh-triad] ${label} failed:`, error)
  }
}

export function apply(ctx: ClientContext): void {
  safe('memory', applyMemoryClient, ctx)
  safe('usage', applyUsageEntries, ctx)
  safe('skills', applySkillSource, ctx)
}
