/**
 * AccountDrawer — 余额/配额页右侧供应商详情抽屉（对齐新版设计稿）。
 *
 * 打开时整体 slide-in（宽度展开 + 内容右滑入场），关闭时反向收回，
 * 由 AccountsTab 持有 closing 态并在结束后卸载。内容分五段：
 * 头部（logo/名称/关闭）→ 状态行（状态点 + 徽标 + 方案/模型数）→
 * 配额主体（积分池面板或窗口行或暂无方案）→ 模型使用 → 最近活动 → 管理操作。
 */

import { useEffect, useState, type CSSProperties } from 'react'
import type { AccountSnapshot, ProviderInfo } from '../api'
import type { UsagePayload } from '../aggregate'
import { PoolQuotaPanel } from './PoolQuotaPanel'
import { QuotaWindowRow } from './QuotaWindowRow'
import { formatUnits } from '../format'
import { providerPalette } from '../theme'
import { ensureAccountsStyles } from './accounts-sheet'

export interface AccountDrawerProps {
  provider: ProviderInfo
  account: AccountSnapshot | null
  usage: UsagePayload | null
  index: number
  closing: boolean
  onClose: () => void
  /** 打开「明细」tab（模型消耗/用量日志）。 */
  onJumpDetail: () => void
  /** 打开凭据配置。 */
  onManage: () => void
}

function localDayKey(ts: number): string {
  const d = new Date(ts)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** 今日/近 7 天请求 + 最近活跃日，全部来自 usage 载荷，纯前端推导。 */
function usageStats(usage: UsagePayload | null, now = Date.now()): { todayReq: number; weekReq: number; lastText: string } | null {
  if (usage === null) return null
  const days = usage.days ?? []
  const hours = usage.hours ?? []
  const todayKey = localDayKey(now)
  const todayReq = hours
    .filter(h => h.hour.startsWith(todayKey))
    .reduce((acc, h) => acc + (h.requests ?? 0), 0)
  const weekStartKey = localDayKey(now - 6 * 86_400_000)
  const weekReq = days
    .filter(d => d.date >= weekStartKey)
    .reduce((acc, d) => acc + (d.requests ?? 0), 0)
  let lastActive: string | null = null
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if ((days[i]?.tokens ?? 0) > 0) { lastActive = days[i]!.date; break }
  }
  let lastText = '暂无记录'
  if (lastActive !== null) {
    const dayStart = new Date(`${lastActive}T00:00:00`).getTime()
    const days = Math.max(0, Math.round((now - dayStart) / 86_400_000))
    lastText = days <= 0 ? '今天' : `${days} 天前`
  }
  return { todayReq, weekReq, lastText }
}

const labelStyle: CSSProperties = { fontSize: 11, lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)', whiteSpace: 'nowrap' }

export function AccountDrawer({ provider, account, usage, index, closing, onClose, onJumpDetail, onManage }: AccountDrawerProps): JSX.Element {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { ensureAccountsStyles() }, [])
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const palette = providerPalette()
  const color = palette[index % palette.length]
  const windows = account?.windows ?? []
  const isPool = windows.length > 0 && windows.some(w => w.poolType !== undefined)
  const hasPlan = typeof account?.plan === 'string' && account.plan.trim() !== '' && account.plan.trim() !== '—' && account.plan.trim() !== '-'
  const modelCount = windows.find(w => (w.modelCount ?? 0) > 0)?.modelCount ?? null
  const stats = usageStats(usage)

  const statusLabel = provider.status === 'ok' ? '正常运行'
    : provider.status === 'critical' ? '紧急'
    : provider.status === 'warning' ? '警告'
    : provider.status === 'not-configured' || provider.status === 'unauthorized' ? '未配置'
    : provider.status === 'pending' ? '等待'
    : '未知'
  const statusColor = provider.status === 'ok' ? 'var(--dsw-alias-state-success-primary)'
    : provider.status === 'critical' ? 'var(--dsw-alias-state-error-primary)'
    : provider.status === 'warning' ? 'var(--dsw-alias-state-warn-primary)'
    : provider.status === 'pending' ? 'var(--dsw-alias-label-tertiary)'
    : 'var(--dsw-alias-state-warn-primary)'

  const initial = provider.displayName.trim().slice(0, 1).toUpperCase() || '?'

  const sectionTitle: CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--dsw-alias-label-primary)', lineHeight: '18px',
  }
  const divider: CSSProperties = { height: 1, background: 'var(--dsw-alias-border-l1)', margin: '12px 0' }
  const outBtn: CSSProperties = {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: '7px 10px', fontSize: 12, borderRadius: 9, cursor: 'pointer',
    border: '1px solid var(--dsw-alias-border-l1)', background: 'transparent',
    color: 'var(--dsw-alias-label-secondary)',
    transition: 'color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), background 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  }

  return (
    <div className="dsh-acc-drawer-wrap" data-closing={closing}>
      <aside className="dsh-acc-drawer" data-closing={closing} aria-label={`${provider.displayName} 详情`}>
        {/* ── 头部 ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' }}>
          <span className="dsh-acc-logo" style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}>
            {initial}
          </span>
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' }}>
            {provider.displayName}
          </span>
          <button
            type="button" aria-label="关闭详情" onClick={onClose}
            style={{ border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 7, transition: 'background 160ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── 状态行 + 方案 ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '12px 16px 0' }}>
          <span className="dsh-acc-dot" style={{ background: statusColor, color: statusColor }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: statusColor }}>{statusLabel}</span>
          {isPool && <span className="dsh-acc-chip" style={{ color: 'var(--dsw-alias-state-business-primary)', background: 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent)' }}>积分池</span>}
        </div>
        <div style={{ padding: '2px 16px 0', fontSize: 11, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>
          {hasPlan ? account!.plan : provider.accountMode === 'balance' ? '余额制' : provider.accountMode === 'subscription' ? '订阅制' : '暂无方案'}
          {modelCount !== null && ` · ${modelCount} 个模型`}
        </div>

        {/* ── 配额主体 ── */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px' }}>
          {!mounted || account === null ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1].map(i => <div key={i} className="dsh-acc-skel" style={{ height: 64 }} />)}
            </div>
          ) : isPool ? (
            <PoolQuotaPanel windows={windows} plan={account.plan} />
          ) : windows.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {windows.map((w, wi) => <QuotaWindowRow key={w.kind} window={w} delay={wi * 60} active={mounted} />)}
            </div>
          ) : (
            <div style={{ fontSize: 12, lineHeight: '20px', color: 'var(--dsw-alias-label-tertiary)' }}>暂无方案信息</div>
          )}

          <div style={divider} />

          {/* ── 模型使用 ── */}
          <div style={{ borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, background: 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-layer-1))' }}>
            <span className="dsh-acc-kpi-icon" style={{ width: 32, height: 32, borderRadius: 9, background: 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent)', color: 'var(--dsw-alias-state-business-primary)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="5.4" height="5.4" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
                <rect x="9.1" y="1.5" width="5.4" height="5.4" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
                <rect x="1.5" y="9.1" width="5.4" height="5.4" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
                <rect x="9.1" y="9.1" width="5.4" height="5.4" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={labelStyle}>可用模型</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dsw-alias-label-primary)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {modelCount !== null ? `${modelCount} 个` : '—'}
              </span>
            </div>
            <button
              type="button" onClick={onJumpDetail}
              style={{ border: 'none', background: 'transparent', color: 'var(--dsw-alias-state-business-primary)', cursor: 'pointer', fontSize: 12, flex: 'none', padding: '4px 2px' }}
            >
              查看模型
            </button>
          </div>

          {/* ── 最近活动 ── */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={sectionTitle}>最近活动</div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
              {[
                { label: '今日请求', value: stats !== null ? `${formatUnits(stats.todayReq)} 次` : '—' },
                { label: '本周请求', value: stats !== null ? `${formatUnits(stats.weekReq)} 次` : '—' },
                { label: '最近活动', value: stats !== null ? stats.lastText : '—' },
              ].map((row, ri) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: ri === 0 ? undefined : '1px solid var(--dsw-alias-border-l1)' }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: 'var(--dsw-alias-label-tertiary)', flex: 'none' }}>
                    <path d="M2.5 8.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M8 5.2V8l2 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 12, color: 'var(--dsw-alias-label-secondary)' }}>{row.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--dsw-alias-label-primary)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 管理操作 ── */}
          <div style={{ marginTop: 12 }}>
            <div style={sectionTitle}>管理操作</div>
            <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
              <button type="button" style={outBtn} onClick={onManage}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M9 2.5 13.5 7 5 15.5H1.5V12L9 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                管理供应商
              </button>
              <button type="button" style={outBtn} onClick={onJumpDetail}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                查看日志
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
