/**
 * TrendTab — 趋势 tab（参考稿布局）。
 *
 * 自上而下：
 *  - KPI 卡横排 ×4（图标 + 大数 + 「较昨日」环比 chip，点击展开明细）；
 *  - 双栏：左 = 用量趋势卡（内嵌 小时/天/7天/30天 分段 + 单位下拉 + 7天平均虚线）
 *    与「今日概览」瓦片排；右 = 缓存命中率半环卡 + 供应商用量 Top5 + 供应商告警；
 *  - 模型消耗排行（带命中率列 + 排名序号）。
 *
 * 数据逻辑沿旧版：范围由左栏 RangePicker 持有（本 tab 消费 props.range），
 * 图表卡内的分段控件是快捷时间窗（默认「小时」= 今日），与左栏联动（左栏切
 * 范围时图表窗自动跟随推断）。环比统一较上一等长周期（单日范围显示「较昨日」）。
 */

import { useEffect, useState, type ReactNode } from 'react'
import { usageApi, type ProviderInfo } from './api'
import { averageCacheHitRate, modelRank, providerShare, sumActivity, sumTokens, type UsageDay, type UsageHour } from './aggregate'
import {
  aggregateHourSeries, aggregateSeries, dailyAverage, deltaPercent, filterDays, fromDayStr, prevRange, rangeDays,
  resolveRange, toDayStr, type DateRange, type Grain,
} from './range'
import { formatExact, formatUnits, formatWorkDuration, formatYiExact } from './format'
import { providerPalette } from './theme'
import { BarChart } from './charts/BarChart'
import { RankBars } from './charts/RankBars'
import { Gauge } from './charts/Gauge'
import { panel } from './dash'
import { ErrorCard } from './primitives/ErrorCard'
import { EmptyState } from './primitives/EmptyState'
import { useIsMobile } from '../../responsive'
import { modalStaggerClass } from '../../modal-animation'
import { css, HubStat, HubStatDetail, HubSection, callsIcon, inputIcon, outputIcon, tokensIcon } from './hub'

export interface TrendTabProps {
  range: DateRange
  rangeLabel: string
  onJumpAccounts: () => void
  onJumpSignal?: () => void
  onJumpDetail?: () => void
  refreshTick?: number
}

export const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

/** `.rowCard`：描边行卡片（SignalTab 复用）。 */
export const rowCard: React.CSSProperties = {
  border: '1px solid var(--dsw-alias-border-l2)',
  borderRadius: 12,
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 0,
}

/** `.rowHead`：卡头（名称 + 右侧 meta）。 */
export function CardHead({ name, meta }: { name: string; meta?: string }): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 14, lineHeight: '22px', fontWeight: 500, color: 'var(--dsw-alias-label-primary)' }}>{name}</span>
      {meta !== undefined && <span style={{ marginLeft: 'auto', fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>{meta}</span>}
    </div>
  )
}

/** `.editor` 填充面（概要统计的底座）。 */
export const editorFace: React.CSSProperties = {
  borderRadius: 12,
  background: 'var(--dsw-alias-bg-module-platform)',
  padding: '14px 16px',
}

/** 概要统计格（SignalTab 复用）：label caption 上、mono 主值中、精确值/sub 下。 */
export function Stat({ label, value, exact, sub, delta, first }: {
  label: string
  value: string
  exact?: string
  sub?: string
  delta?: number | null
  first?: boolean
}): JSX.Element {
  const deltaView = delta === undefined || delta === null
    ? null
    : delta > 0
      ? { text: `↑${delta >= 10 ? Math.round(delta) : delta.toFixed(1)}%`, color: 'var(--dsw-alias-state-success-primary)' }
      : delta < 0
        ? { text: `↓${Math.abs(delta) >= 10 ? Math.round(Math.abs(delta)) : Math.abs(delta).toFixed(1)}%`, color: 'var(--dsw-alias-state-error-primary)' }
        : { text: '持平', color: 'var(--dsw-alias-label-tertiary)' }
  return (
    <div style={{
      minWidth: 0,
      paddingLeft: first ? 0 : 16,
      borderLeft: first ? undefined : '1px solid var(--dsw-alias-border-l2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <span style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-secondary)', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 20, lineHeight: '28px', fontWeight: 600, fontFamily: MONO, color: 'var(--dsw-alias-label-primary)', whiteSpace: 'nowrap' }}>{value}</span>
        {deltaView !== null && <span style={{ fontSize: 11, fontFamily: MONO, color: deltaView.color }}>{deltaView.text}</span>}
      </span>
      {(exact !== undefined || sub !== undefined) && (
        <span style={{ fontSize: 11, lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)', fontFamily: exact !== undefined ? MONO : undefined, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {exact ?? sub}
        </span>
      )}
    </div>
  )
}

/** 面板级窄断点：主区两列改单列（fill 下卡片宽≈视口宽）。 */
function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 1150px)').matches)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1150px)')
    const onChange = (e: MediaQueryListEvent): void => { setNarrow(e.matches) }
    setNarrow(mql.matches)
    mql.addEventListener('change', onChange)
    return () => { mql.removeEventListener('change', onChange) }
  }, [])
  return narrow
}

/** YYYY-MM-DD 平移 n 天。 */
function shiftDayStr(s: string, n: number): string {
  const d = fromDayStr(s)
  d.setDate(d.getDate() + n)
  return toDayStr(d)
}

/** 异常日判定（日粒度）：tokens > 活跃日中位数 ×3 的天数。 */
function anomalyCountOf(days: UsageDay[]): number {
  const actives = days.map(d => d.tokens ?? 0).filter(v => v > 0).sort((a, b) => a - b)
  if (actives.length === 0) return 0
  const mid = Math.floor(actives.length / 2)
  const median = actives.length % 2 === 1 ? actives[mid] : (actives[mid - 1] + actives[mid]) / 2
  if (!(median > 0)) return 0
  return days.filter(d => (d.tokens ?? 0) > median * 3).length
}

/** 环比 chip：较昨日/较上期 + 箭头 + 百分比（调用侧保证 pct 非 null；上一期无数据时由调用侧整行省略）。 */
function DeltaChip({ pct, label }: { pct: number; label: string }): JSX.Element {
  if (pct > 0) return <><span style={{ color: 'var(--dsw-alias-label-tertiary)' }}>{label}</span> ▲{pct >= 10 ? Math.round(pct) : pct.toFixed(1)}%</>
  if (pct < 0) return <><span style={{ color: 'var(--dsw-alias-label-tertiary)' }}>{label}</span> ▼{Math.abs(pct) >= 10 ? Math.round(Math.abs(pct)) : Math.abs(pct).toFixed(1)}%</>
  return <><span style={{ color: 'var(--dsw-alias-label-tertiary)' }}>{label}</span> 持平</>
}

/** 计数差 chip（活跃模型/异常日这类整数指标）。 */
function CountChip({ delta, label }: { delta: number; label: string }): JSX.Element {
  return (
    <><span style={{ color: 'var(--dsw-alias-label-tertiary)' }}>{label}</span>{delta > 0 ? ` +${delta}` : delta < 0 ? ` ${delta}` : ' 0'}</>
  )
}

/** 行尾链接按钮（查看全部/查看更多）。 */
function LinkButton({ children, onClick }: { children: ReactNode; onClick: () => void }): JSX.Element {
  return (
    <button type="button" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 3, padding: 0, border: 'none', background: 'transparent',
      cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-state-business-primary)',
      transition: 'opacity 140ms ease',
    }}>
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </button>
  )
}

/* ── 图表卡分段（快捷时间窗） ── */
type ChartTabKey = 'hour' | 'day' | '7d' | '30d'
const CHART_TABS: Array<{ key: ChartTabKey; label: string }> = [
  { key: 'hour', label: '小时' },
  { key: 'day', label: '天' },
  { key: '7d', label: '7天' },
  { key: '30d', label: '30天' },
]

/** 由左栏范围推断图表分段（左栏切范围时自动跟随）。 */
function inferChartTab(r: DateRange): ChartTabKey {
  const n = rangeDays(r)
  if (n <= 1) return 'hour'
  if (n <= 7) return '7d'
  return '30d'
}

/** 图表单位（Y 轴/数值格式化）。 */
type UnitKey = 'auto' | 'wan' | 'yi'

export function TrendTab({ range, rangeLabel, onJumpAccounts, onJumpSignal, onJumpDetail, refreshTick }: TrendTabProps): JSX.Element {
  const [usage, setUsage] = useState<UsageDay[] | null>(null)
  const [hours, setHours] = useState<UsageHour[]>([])
  const [providers, setProviders] = useState<ProviderInfo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [retryTick, setRetryTick] = useState(0)
  const isMobile = useIsMobile()
  const narrow = useNarrow()
  const compact = isMobile || narrow

  /** 统计卡展开的明细（哪个卡开着；null = 全收）。 */
  const [openStat, setOpenStat] = useState<string | null>(null)

  /** 图表卡分段（快捷时间窗）+ 单位。 */
  const [chartTab, setChartTab] = useState<ChartTabKey>('hour')
  const [chartTabTouched, setChartTabTouched] = useState(false)
  const [unit, setUnit] = useState<UnitKey>('auto')
  const [unitOpen, setUnitOpen] = useState(false)

  useEffect(() => {
    let alive = true
    setError(null)
    Promise.all([usageApi.usage(), usageApi.providers()])
      .then(([u, p]) => {
        if (!alive) return
        if (u.ok !== true) throw new Error('用量数据加载失败')
        if (p.ok !== true) throw new Error('供应商数据加载失败')
        setUsage(u.days)
        setHours(u.hours ?? [])
        setProviders(p.providers ?? [])
      })
      .catch((e: unknown) => { if (alive) setError(e instanceof Error ? e.message : String(e)) })
    return () => { alive = false }
  }, [refreshTick, retryTick])

  // 左栏切范围：图表分段自动跟随一次（用户手动点过分段后不强行覆盖）。
  useEffect(() => {
    if (!chartTabTouched) setChartTab(inferChartTab(range))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.start, range.end])

  if (error) {
    return <ErrorCard message={error} onRetry={() => setRetryTick(t => t + 1)} />
  }
  if (usage === null) {
    return <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 13, color: 'var(--dsw-alias-label-tertiary)' }}>加载中…</div>
  }

  const filtered = filterDays(usage, range)
  const previous = filterDays(usage, prevRange(range))
  const sum = sumTokens(filtered)
  const prevSum = sumTokens(previous)
  const hitRate = averageCacheHitRate(filtered)
  const prevHitRate = averageCacheHitRate(previous)
  const avg = dailyAverage(filtered)
  const prevAvg = dailyAverage(previous)
  const activity = sumActivity(filtered)
  const prevActivity = sumActivity(previous)

  const periodLabel = rangeDays(range) <= 1 ? '较昨日' : '较上期'

  /* ── 图表卡：分段 → 时间窗与粒度 ── */
  const chartRange: DateRange = chartTab === 'hour' || chartTab === 'day'
    ? resolveRange('today').range
    : resolveRange(chartTab).range
  const grain: Grain = chartTab === 'hour' ? 'hour' : 'day'
  const chartDays = filterDays(usage, chartRange)
  const series = grain === 'hour' ? aggregateHourSeries(hours, chartRange) : aggregateSeries(chartDays, 'day')
  const showTrend = series.length >= 1

  /** 7天平均（输入）参考线：小时窗 = 同小时 7 天均值；天窗 = 近 7 点滚动均值。
   *  注意：此计算必须在「提前 return」之前完成——早期版本把 useMemo 放在
   *  error/空态 return 之后，数据到达时钩子数变化触发 React #310 崩溃。 */
  const baseline = ((): { label: string; values: Array<number | null> } | undefined => {
    if (series.length === 0) return undefined
    if (grain === 'hour' && chartRange.start === chartRange.end) {
      const day = chartRange.start
      const values = series.map(p => {
        const hh = p.label.slice(0, 2)
        let bucket = 0
        let n = 0
        for (let k = 6; k >= 0; k -= 1) {
          const d = shiftDayStr(day, -k)
          const entry = hours.find(h => h.hour === `${d}-${hh}`)
          if (entry !== undefined) { bucket += entry.inputTokens ?? 0; n += 1 }
        }
        return n > 0 ? bucket / n : null
      })
      return { label: '7天平均（输入）', values }
    }
    if (grain === 'day') {
      const values = series.map((_, i) => {
        const start = Math.max(0, i - 6)
        let bucket = 0
        let n = 0
        for (let k = start; k <= i; k += 1) { bucket += series[k]!.input; n += 1 }
        return bucket / n
      })
      return { label: '7天平均（输入）', values }
    }
    return undefined
  })()

  const fmt = (n: number): string => unit === 'wan' ? `${(n / 1e4).toFixed(0)}万` : unit === 'yi' ? `${(n / 1e8).toFixed(1)}亿` : formatUnits(n)

  /* ── 排行与分布 ── */
  const rank = modelRank(filtered)
  const prevRank = modelRank(previous)
  const share = providerShare(filtered)
  const palette = providerPalette()
  const shareTotal = share.reduce((a, s) => a + s.tokens, 0)
  const shareTop = share[0]?.tokens ?? 1
  const anomalyCount = anomalyCountOf(filtered)
  const prevAnomalyCount = anomalyCountOf(previous)

  const anomalyMap = (() => {
    if (grain !== 'day' || chartDays.length === 0) return null
    const actives = chartDays.map(d => d.tokens ?? 0).filter(v => v > 0).sort((a, b) => a - b)
    if (actives.length === 0) return null
    const mid = Math.floor(actives.length / 2)
    const median = actives.length % 2 === 1 ? actives[mid] : (actives[mid - 1] + actives[mid]) / 2
    if (!(median > 0)) return null
    const map = new Map<string, { multiple: number; tokens: number }>()
    for (const d of chartDays) {
      const tokens = d.tokens ?? 0
      if (tokens > median * 3) map.set(d.date, { multiple: tokens / median, tokens })
    }
    return map.size > 0 ? map : null
  })()

  const alerts = providers
    .filter(p => p.alert && (p.alert.level === 'critical' || p.alert.level === 'warning'))
    .sort((a, b) => (a.alert!.level === 'critical' ? -1 : 1) - (b.alert!.level === 'critical' ? -1 : 1))

  const emptyHint = (title: string): JSX.Element => <EmptyState title={title} hint="去聊两句就会在这里出现数据" />
  const yi = formatYiExact(sum.total)

  const deltaTotal = deltaPercent(sum.total, prevSum.total)
  const deltaInput = deltaPercent(sum.input, prevSum.input)
  const deltaOutput = deltaPercent(sum.output, prevSum.output)
  const deltaRequests = deltaPercent(activity.requests, prevActivity.requests)
  const hitDelta = filtered.length > 0 && previous.length > 0 ? hitRate - prevHitRate : null
  const deltaAvg = deltaPercent(avg, prevAvg)
  const deltaWork = deltaPercent(activity.workMs, prevActivity.workMs)
  const deltaCache = deltaPercent(sum.cache, prevSum.cache)

  /** 统计卡切换：开着的点一下收起。 */
  const toggleStat = (key: string): void => { setOpenStat(v => v === key ? null : key) }

  const statDetailRows = {
    total: [
      { label: '输入', value: formatUnits(sum.input) },
      { label: '输出', value: formatUnits(sum.output) },
      { label: '缓存', value: formatUnits(sum.cache) },
      { label: '精确合计', value: yi?.exact ?? formatExact(sum.total) },
    ],
    input: [
      { label: '输入 Token', value: formatUnits(sum.input) },
      { label: '日平均', value: formatUnits(avg) },
      { label: '环比', value: deltaInput === null ? '—' : `${deltaInput >= 10 ? Math.round(deltaInput) : deltaInput.toFixed(1)}%` },
    ],
    output: [
      { label: '输出 Token', value: formatUnits(sum.output) },
      { label: '占比', value: `${sum.total > 0 ? Math.round((sum.output / sum.total) * 100) : 0}%` },
      { label: '环比', value: deltaOutput === null ? '—' : `${deltaOutput >= 10 ? Math.round(deltaOutput) : deltaOutput.toFixed(1)}%` },
    ],
    requests: [
      { label: '调用次数', value: formatUnits(activity.requests) },
      { label: '工作时长', value: formatWorkDuration(activity.workMs) },
      { label: '日均 Tokens', value: formatUnits(avg) },
    ],
  }

  const deltaTone = (pct: number | null): 'up' | 'down' | 'flat' => pct === null ? 'flat' : pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat'
  const hitTone: 'up' | 'down' | 'flat' = hitDelta === null ? 'flat' : hitDelta > 0 ? 'up' : hitDelta < 0 ? 'down' : 'flat'

  return (
    <div style={{ maxWidth: 1380, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* ── KPI 统计行：方块图标 + 大数 + 较昨日/较上期 chip ── */}
      <div className={css.statsRow}>
        <HubStat
          tone="blue"
          iconShape="square"
          icon={tokensIcon(20)}
          label="总 Tokens"
          value={yi?.yi ?? formatUnits(sum.total)}
          sub={deltaTotal !== null ? <DeltaChip pct={deltaTotal} label={periodLabel} /> : undefined}
          subTone={deltaTone(deltaTotal)}
          desc={deltaTotal === null ? `范围合计 ${formatUnits(sum.total)}` : `环比上一周期 ${deltaTotal >= 0 ? '+' : ''}${Math.round(deltaTotal)}%`}
          open={openStat === 'total'}
          onToggle={() => { toggleStat('total') }}
          delay={0}
        />
        <HubStat
          tone="violet"
          iconShape="square"
          icon={inputIcon(20)}
          label="输入"
          value={formatUnits(sum.input)}
          sub={deltaInput !== null ? <DeltaChip pct={deltaInput} label={periodLabel} /> : undefined}
          subTone={deltaTone(deltaInput)}
          desc={`输入精确 ${formatExact(sum.input)}`}
          open={openStat === 'input'}
          onToggle={() => { toggleStat('input') }}
          delay={40}
        />
        <HubStat
          tone="orange"
          iconShape="square"
          icon={outputIcon(20)}
          label="输出"
          value={formatUnits(sum.output)}
          sub={deltaOutput !== null ? <DeltaChip pct={deltaOutput} label={periodLabel} /> : undefined}
          subTone={deltaTone(deltaOutput)}
          desc={`输出精确 ${formatExact(sum.output)}`}
          open={openStat === 'output'}
          onToggle={() => { toggleStat('output') }}
          delay={80}
        />
        <HubStat
          tone="green"
          iconShape="square"
          icon={callsIcon(20)}
          label="调用次数"
          value={formatUnits(activity.requests)}
          sub={deltaRequests !== null ? <DeltaChip pct={deltaRequests} label={periodLabel} /> : undefined}
          subTone={deltaTone(deltaRequests)}
          desc={`累计工作时长 ${formatWorkDuration(activity.workMs)}；活跃 ${filtered.length} 天`}
          open={openStat === 'requests'}
          onToggle={() => { toggleStat('requests') }}
          delay={120}
        />
      </div>

      {/* 点统计卡展开的明细块 */}
      {openStat !== null && openStat in statDetailRows ? (
        <HubStatDetail
          title={`${openStat === 'total' ? '总 Tokens' : openStat === 'input' ? '输入' : openStat === 'output' ? '输出' : '调用次数'} · ${rangeLabel} 明细`}
          rows={statDetailRows[openStat as keyof typeof statDetailRows]}
        />
      ) : null}

      <div className={`${css.mainScroll} ${modalStaggerClass}`}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : 'minmax(0, 2.2fr) minmax(280px, 1fr)',
          gap: 10,
          alignItems: 'start',
          minWidth: 0,
        }}>
          {/* ── 左列：趋势卡 + 概览 ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <HubSection
              title="用量趋势"
              action={(
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className={css.seg} role="tablist" aria-label="趋势时间窗">
                    {CHART_TABS.map(t => (
                      <button
                        key={t.key}
                        type="button"
                        role="tab"
                        aria-selected={chartTab === t.key}
                        className={css.segBtn}
                        data-active={chartTab === t.key || undefined}
                        onClick={() => { setChartTab(t.key); setChartTabTouched(true) }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {/* 单位下拉：Tokens 自动 / 万 / 亿 */}
                  <div className={css.dropWrap}>
                    <button type="button" className={css.toolButton} style={{ height: 24, padding: '0 8px', fontSize: 11, gap: 5 }} onClick={() => setUnitOpen(v => !v)}>
                      {unit === 'auto' ? 'Tokens' : unit === 'wan' ? '万' : '亿'}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {unitOpen && (
                      <>
                        <div className={css.bulkOverlay} onClick={() => setUnitOpen(false)} />
                        <div className={css.dropMenu}>
                          {([['auto', 'Tokens（自动）'], ['wan', '万'], ['yi', '亿']] as Array<[UnitKey, string]>).map(([key, name]) => (
                            <button key={key} type="button" className={css.dropItem} aria-checked={unit === key} onClick={() => { setUnit(key); setUnitOpen(false) }}>
                              <span className={css.dropCheck} data-on={unit === key || undefined}>✓</span>
                              {name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            >
              <div style={{ ...panel(14, 10), minHeight: 250 }}>
                <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {showTrend
                    ? (
                      <BarChart
                        data={series}
                        variant="io"
                        baseline={baseline}
                        format={fmt}
                        anomalies={anomalyMap ?? undefined}
                        onSelectAnomaly={anomalyMap !== null && onJumpSignal !== undefined ? () => onJumpSignal() : undefined}
                        height={compact ? 200 : 250}
                      />
                    )
                    : emptyHint('暂无可绘制的趋势数据')}
                </div>
              </div>
            </HubSection>

            {/* ── 概览瓦片 ── */}
            <HubSection title={`${rangeLabel.replace(/\s/g, '')}概览`}>
              <div className={css.ovGrid}>
                <div className={css.ovTile} style={{ animationDelay: '120ms' }}>
                  <span className={css.ovLabel}>日均 Tokens</span>
                  <span className={css.ovValue}>{formatUnits(avg)}</span>
                  {deltaAvg !== null && (
                    <span style={{ fontSize: 11, lineHeight: '15px', fontFamily: MONO, color: deltaTone(deltaAvg) === 'up' ? 'var(--dsw-alias-state-success-primary)' : deltaTone(deltaAvg) === 'down' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-tertiary)' }}>
                      <DeltaChip pct={deltaAvg} label={periodLabel} />
                    </span>
                  )}
                </div>
                <div className={css.ovTile} style={{ animationDelay: '160ms' }}>
                  <span className={css.ovLabel}>工作时长</span>
                  <span className={css.ovValue}>{formatWorkDuration(activity.workMs)}</span>
                  {deltaWork !== null && (
                    <span style={{ fontSize: 11, lineHeight: '15px', fontFamily: MONO, color: deltaTone(deltaWork) === 'up' ? 'var(--dsw-alias-state-success-primary)' : deltaTone(deltaWork) === 'down' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-tertiary)' }}>
                      <DeltaChip pct={deltaWork} label={periodLabel} />
                    </span>
                  )}
                </div>
                <div className={css.ovTile} style={{ animationDelay: '200ms' }}>
                  <span className={css.ovLabel}>缓存量</span>
                  <span className={css.ovValue}>{formatUnits(sum.cache)}</span>
                  {deltaCache !== null && (
                    <span style={{ fontSize: 11, lineHeight: '15px', fontFamily: MONO, color: deltaTone(deltaCache) === 'up' ? 'var(--dsw-alias-state-success-primary)' : deltaTone(deltaCache) === 'down' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-tertiary)' }}>
                      <DeltaChip pct={deltaCache} label={periodLabel} />
                    </span>
                  )}
                </div>
                <div className={css.ovTile} style={{ animationDelay: '240ms' }}>
                  <span className={css.ovLabel}>活跃模型</span>
                  <span className={css.ovValue}>{String(rank.length)}</span>
                  <span style={{ fontSize: 11, lineHeight: '15px', fontFamily: MONO, color: rank.length === prevRank.length ? 'var(--dsw-alias-label-tertiary)' : 'var(--dsw-alias-label-secondary)' }}>
                    <CountChip delta={rank.length - prevRank.length} label={periodLabel} />
                  </span>
                </div>
                <div className={css.ovTile} style={{ animationDelay: '280ms' }}>
                  <span className={css.ovLabel}>异常日</span>
                  <span className={css.ovValue} style={{ color: anomalyCount > 0 ? 'var(--dsw-alias-state-error-primary)' : undefined }}>{String(anomalyCount)}</span>
                  <span style={{ fontSize: 11, lineHeight: '15px', fontFamily: MONO, color: anomalyCount === prevAnomalyCount ? 'var(--dsw-alias-label-tertiary)' : 'var(--dsw-alias-label-secondary)' }}>
                    <CountChip delta={anomalyCount - prevAnomalyCount} label={periodLabel} />
                  </span>
                </div>
              </div>
            </HubSection>
          </div>

          {/* ── 右列：命中率 + 供应商 Top5 + 告警 ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <HubSection
              title="缓存命中率"
              meta={hitDelta !== null ? (
                <span style={{ fontSize: 11, lineHeight: '16px', fontFamily: MONO, color: hitTone === 'up' ? 'var(--dsw-alias-state-success-primary)' : hitTone === 'down' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-tertiary)' }}>
                  <DeltaChip pct={hitDelta} label={periodLabel} />
                </span>
              ) : undefined}
            >
              <div style={{ ...panel(14, 8), alignItems: 'center' }}>
                <Gauge percent={filtered.length > 0 ? hitRate : null} label="命中率" size={compact ? 140 : 168} />
                <div style={{ alignSelf: 'stretch', display: 'flex', borderTop: '1px solid var(--dsw-alias-border-l1)', paddingTop: 8 }}>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontSize: 11, lineHeight: '16px', color: 'var(--dsw-alias-label-secondary)' }}>命中 Tokens</span>
                    <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600, fontFamily: MONO, color: 'var(--dsw-alias-label-primary)' }}>{formatUnits(sum.cache)}</span>
                  </div>
                  <div style={{ width: 1, background: 'var(--dsw-alias-border-l2)', margin: '4px 0' }} />
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontSize: 11, lineHeight: '16px', color: 'var(--dsw-alias-label-secondary)' }}>缓存读取 Tokens</span>
                    <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600, fontFamily: MONO, color: 'var(--dsw-alias-label-primary)' }}>{formatUnits(sum.cache)}</span>
                  </div>
                </div>
              </div>
            </HubSection>

            <HubSection
              title="供应商用量"
              meta="Top 5"
              action={share.length > 0 ? <LinkButton onClick={onJumpAccounts}>查看全部</LinkButton> : undefined}
            >
              <div style={{ ...panel(12, 2) }}>
                {share.length === 0 ? (
                  <div style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>{rangeLabel}暂无用量</div>
                ) : share.slice(0, 5).map((s, i) => {
                  const pct = shareTotal > 0 ? Math.round((s.tokens / shareTotal) * 1000) / 10 : 0
                  return (
                    <div key={s.provider} className={css.provRow}>
                      <span style={{ width: 18, flex: 'none', textAlign: 'right', fontSize: 11, fontFamily: MONO, color: 'var(--dsw-alias-label-tertiary)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ width: compact ? 64 : 88, flex: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: 'var(--dsw-alias-label-primary)' }} title={s.provider}>{s.provider}</span>
                      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--dsw-alias-border-l2)', overflow: 'hidden', minWidth: 0 }}>
                        <div style={{
                          height: '100%', width: `${Math.max(2, (s.tokens / (shareTop || 1)) * 100)}%`,
                          background: `linear-gradient(90deg, ${palette[i % palette.length]}, color-mix(in srgb, ${palette[i % palette.length]} 72%, #7c5cf0))`,
                          borderRadius: 4, transition: 'width .45s cubic-bezier(.2,.8,.2,1)',
                        }} />
                      </div>
                      <span style={{ flex: 'none', width: 44, textAlign: 'right', fontSize: 12, fontFamily: MONO, color: 'var(--dsw-alias-label-secondary)' }}>{pct}%</span>
                      <span style={{ flex: 'none', width: 64, textAlign: 'right', fontSize: 12, fontWeight: 600, fontFamily: MONO, color: 'var(--dsw-alias-label-primary)' }}>{formatUnits(s.tokens)}</span>
                    </div>
                  )
                })}
              </div>
            </HubSection>

            <HubSection title="供应商告警" meta={alerts.length > 0 ? `${alerts.length} 条` : '全部正常'}>
              <div style={{ ...panel(12, 8), flex: '1 1 auto', minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {alerts.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-secondary)' }}>
                      <span style={{ width: 18, height: 18, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--dsw-alias-state-success-primary)', background: 'color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent)' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 13 4 4 10-10" /></svg>
                      </span>
                      全部供应商状态正常。
                    </div>
                  ) : alerts.map((p, i) => (
                    <div key={p.id} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      borderTop: i === 0 ? undefined : '1px solid var(--dsw-alias-border-l1)',
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: 4, flex: 'none', background: p.alert!.level === 'critical' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-state-warn-primary)' }} />
                      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, lineHeight: '20px', color: 'var(--dsw-alias-label-primary)' }}>{p.displayName}</span>
                      <span style={{ marginLeft: 'auto', flex: 'none', fontSize: 12, lineHeight: '18px', fontFamily: MONO, color: 'var(--dsw-alias-label-secondary)' }}>
                        {p.alert!.metric === 'remaining-percent' ? `剩余 ${p.alert!.value ?? 0}%` : `${p.alert!.value ?? ''}`}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 2 }}>
                  <LinkButton onClick={onJumpAccounts}>查看余额/配额</LinkButton>
                </div>
              </div>
            </HubSection>
          </div>
        </div>

        {/* ── 模型消耗排行 ── */}
        <HubSection
          title="模型消耗排行"
          meta={`${rangeLabel} · Top ${Math.min(10, rank.length)}`}
          action={rank.length > 0 && onJumpDetail !== undefined ? <LinkButton onClick={onJumpDetail}>查看更多</LinkButton> : undefined}
        >
          <div style={{ ...panel(14, 10) }}>
            {rank.length === 0 ? emptyHint(`${rangeLabel}暂无用量`) : <RankBars rows={rank} nameWidth={compact ? 140 : 200} ranked />}
          </div>
        </HubSection>
      </div>
    </div>
  )
}
