/**
 * Workbench — 用量工作台（Skills Hub 风格骨架）。
 *
 * 布局照搬技能面板：左侧分类导航（趋势/明细/信号/余额配额，图标 + 计数）、
 * 主区统计行 + 工具栏 + 内容滚动区。查询范围（RangePicker）收进左栏
 * 「查询范围」分组，与技能面板「快捷筛选」同款交互。
 *
 * 各 tab 自行渲染「统计行 + 工具栏 + 内容」三段（统计行数据在各 tab 内），
 * 本壳只负责左栏导航、尺寸过渡与范围状态。
 */
import { useEffect, useState, type ReactNode } from 'react'
import { TrendTab } from './TrendTab'
import { UsageTab } from './UsageTab'
import { SignalTab } from './SignalTab'
import { AccountsTab } from './AccountsTab'
import { RangePicker } from './primitives/RangePicker'
import { resolveRange, type DateRange, type RangePreset } from './range'
import { usageApi } from './api'
import { filterDays } from './range'
import { ensureHubStyles, css, HubCatItem, trendIcon, detailIcon, signalIcon, walletIcon } from './hub'
import { PshBody, PopoverShell, type PopoverAnchor, type PopoverSize } from '../../popover-shell'

export type TabKey = 'trend' | 'detail' | 'signal' | 'accounts'

const NAV: Array<{ key: TabKey; label: string; icon: (size?: number, stroke?: number) => JSX.Element }> = [
  { key: 'trend', label: '趋势', icon: trendIcon },
  { key: 'detail', label: '明细', icon: detailIcon },
  { key: 'signal', label: '信号', icon: signalIcon },
  { key: 'accounts', label: '余额/配额', icon: walletIcon },
]

/** 每个 tab 的理想卡片尺寸（趋势页 1240→1440：用户要求再往右扩 200px）。 */
const TAB_SIZES: Record<TabKey, PopoverSize> = {
  trend: { width: 1440, height: 880 },
  detail: { width: 1240, height: 860 },
  signal: { width: 1240, height: 860 },
  accounts: { width: 1180, height: 820 },
}

export interface WorkbenchProps {
  onClose?: () => void
  closing?: boolean
  anchor?: PopoverAnchor | null
  onCardMouseEnter?: () => void
  onCardMouseLeave?: () => void
  renderTab?: (tab: TabKey) => ReactNode
}

/** 左栏计数（打开时一次性拉取；失败降级为 '—'）。 */
interface SideCounts {
  trend: string
  detail: string
  signal: string
  signalWarn: boolean
  accounts: string
  accountsWarn: boolean
}

export function Workbench({ onClose, closing = false, anchor = null, onCardMouseEnter, onCardMouseLeave, renderTab }: WorkbenchProps): JSX.Element {
  const [tab, setTab] = useState<TabKey>('trend')
  const [preset, setPreset] = useState<RangePreset>('today')
  const [custom, setCustom] = useState<DateRange | null>(null)
  const [refreshTick, setRefreshTick] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [counts, setCounts] = useState<SideCounts>({ trend: '—', detail: '—', signal: '—', signalWarn: false, accounts: '—', accountsWarn: false })
  const close = onClose ?? (() => {})

  ensureHubStyles()

  const { range, label: rangeLabel } = resolveRange(preset, custom)

  /** 头部刷新：推进 refreshTick（趋势 tab 重拉），按钮短暂 spin。 */
  const doRefresh = (): void => {
    setRefreshing(true)
    setRefreshTick(t => t + 1)
    window.setTimeout(() => setRefreshing(false), 900)
  }

  /** 头部日期：YYYY-MM-DD 星期X。 */
  const headDate = ((): string => {
    const now = new Date()
    const week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()]
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${mm}-${dd} 星期${week}`
  })()

  useEffect(() => {
    let alive = true
    Promise.all([
      usageApi.usage().catch(() => null),
      usageApi.signal(30).catch(() => null),
      usageApi.providers().catch(() => null),
    ]).then(([u, s, p]) => {
      if (!alive) return
      const days = u !== null && u.ok === true ? u.days : null
      const inRange = days !== null ? filterDays(days, resolveRange(preset, custom).range) : []
      const activeDays = inRange.filter(d => (d.tokens ?? 0) > 0).length
      const modelSet = new Set<string>()
      for (const day of inRange) for (const m of day.models ?? []) modelSet.add(m.model)
      const anomalies = s !== null && s.ok === true ? s.signal.anomalyDays.length : 0
      const providers = p !== null && p.ok === true ? p.providers : []
      const alertCount = providers.filter(x => x.status === 'critical' || x.status === 'warning').length
      setCounts({
        trend: days === null ? '—' : String(activeDays),
        detail: days === null ? '—' : String(modelSet.size),
        signal: s === null ? '—' : String(anomalies),
        signalWarn: anomalies > 0,
        accounts: p === null ? '—' : String(providers.length),
        accountsWarn: alertCount > 0,
      })
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, custom])

  const tabContent: Record<TabKey, JSX.Element> = {
    trend: (
      <TrendTab
        range={range}
        rangeLabel={rangeLabel}
        onJumpAccounts={() => setTab('accounts')}
        onJumpSignal={() => setTab('signal')}
        onJumpDetail={() => setTab('detail')}
        refreshTick={refreshTick}
      />
    ),
    detail: <UsageTab range={range} rangeLabel={rangeLabel} />,
    signal: <SignalTab />,
    accounts: <AccountsTab onJumpSignal={() => setTab('signal')} onJumpDetail={() => setTab('detail')} />,
  }

  return (
    <PopoverShell solid closing={closing} onClose={close} anchor={anchor} size={TAB_SIZES[tab]} onCardMouseEnter={onCardMouseEnter} onCardMouseLeave={onCardMouseLeave} ariaLabel="用量工作台">
      <div className="psh-head">
        <span className="psh-title" style={{ flex: 'none' }}>用量工作台</span>
        <span style={{ flex: 1, minWidth: 0 }} />
        <button type="button" className={css.refresh} data-spin={refreshing || undefined} aria-label="刷新用量数据" onClick={doRefresh}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 0 1-15.9 5.7M3 12a9 9 0 0 1 15.9-5.7" />
            <path d="M21 3v6h-6M3 21v-6h6" />
          </svg>
        </button>
        <span style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)', whiteSpace: 'nowrap', marginRight: 2 }}>{headDate}</span>
        <button type="button" className="psh-close" aria-label="关闭" onClick={close}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <PshBody>
        <div className={css.hub}>
          {/* ── 左栏：分类 + 查询范围 ── */}
          <aside className={css.side}>
            <div className={css.catTitle}>工作台分类</div>
            <div className={css.catList} role="group" aria-label="工作台分类">
              {NAV.map(item => (
                <HubCatItem
                  key={item.key}
                  active={tab === item.key}
                  icon={item.icon(16)}
                  label={item.label}
                  count={counts[item.key === 'trend' ? 'trend' : item.key === 'detail' ? 'detail' : item.key === 'signal' ? 'signal' : 'accounts']}
                  warn={item.key === 'signal' ? counts.signalWarn : item.key === 'accounts' ? counts.accountsWarn : false}
                  onClick={() => { setTab(item.key) }}
                />
              ))}
            </div>
            {(tab === 'trend' || tab === 'detail') && (
              <>
                <div className={css.filtersTitle}>查询范围</div>
                <RangePicker
                  preset={preset}
                  custom={custom}
                  onChangePreset={setPreset}
                  onChangeCustom={setCustom}
                />
              </>
            )}
          </aside>

          {/* ── 主区（tab 自带统计行/工具栏/内容） ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {renderTab ? renderTab(tab) : tabContent[tab]}
          </div>
        </div>
      </PshBody>
    </PopoverShell>
  )
}
