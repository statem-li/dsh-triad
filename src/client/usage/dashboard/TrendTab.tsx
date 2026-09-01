/**
 * TrendTab — 趋势 tab（Skills Hub 风格）。
 *
 * 骨架与技能面板一致：顶部统计行（宽卡，desc 悬浮、点击展开明细）+ 工具栏
 * （范围/粒度 meta + 跳转按钮）+ 内容滚动区（bento 卡：趋势图 / 供应商占比 /
 * 告警 / 命中率半环 / 小指标块 / 模型排行）。查询范围由左栏 RangePicker 持有。
 */

import { useEffect, useState } from 'react'
import { usageApi, type ProviderInfo } from './api'
import { averageCacheHitRate, modelRank, providerShare, sumActivity, sumTokens, type UsageDay, type UsageHour } from './aggregate'
import {
  aggregateHourSeries, aggregateSeries, dailyAverage, deltaPercent, filterDays, pickGrain, prevRange,
  type DateRange,
} from './range'
import { formatExact, formatHitRate, formatUnits, formatWorkDuration, formatYiExact } from './format'
import { providerPalette } from './theme'
import { BarChart } from './charts/BarChart'
import { RankBars } from './charts/RankBars'
import { Gauge } from './charts/Gauge'
import { ShareColumns } from './charts/ShareColumns'
import { Tile, icons, panel } from './dash'
import { ErrorCard } from './primitives/ErrorCard'
import { EmptyState } from './primitives/EmptyState'
import { useIsMobile } from '../../responsive'
import { modalStaggerClass } from '../../modal-animation'
import { css, HubStat, HubStatDetail, HubSection } from './hub'

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

/** 概要统计格：label caption 上、mono 主值中、精确值/sub 下；格间竖线分隔。 */
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

const GRAIN_NAME = { hour: '按小时', day: '按日', week: '按周', month: '按月' } as const

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

/** 环比徽章（hero 大数右侧小字）。 */
function deltaBadge(delta: number | null): { text: string; color: string } | null {
  if (delta === null) return null
  if (delta > 0) return { text: `↑${delta >= 10 ? Math.round(delta) : delta.toFixed(1)}%`, color: 'var(--dsw-alias-state-success-primary)' }
  if (delta < 0) return { text: `↓${Math.abs(delta) >= 10 ? Math.round(Math.abs(delta)) : Math.abs(delta).toFixed(1)}%`, color: 'var(--dsw-alias-state-error-primary)' }
  return { text: '持平', color: 'var(--dsw-alias-label-tertiary)' }
}

/** 今天的中文日期串。 */
function todayText(now = new Date()): string {
  const week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()]
  return `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 · 星期${week}`
}

export function TrendTab({ range, rangeLabel, onJumpAccounts, onJumpSignal, onJumpDetail, refreshTick }: TrendTabProps): JSX.Element {
  const [usage, setUsage] = useState<UsageDay[] | null>(null)
  const [hours, setHours] = useState<UsageHour[]>([])
  const [providers, setProviders] = useState<ProviderInfo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [retryTick, setRetryTick] = useState(0)
  const isMobile = useIsMobile()
  const narrow = useNarrow()
  const compact = isMobile || narrow

  /** 点统计卡展开的明细（哪个卡开着；null = 全收）。 */
  const [openStat, setOpenStat] = useState<string | null>(null)

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
  const avg = dailyAverage(filtered)
  const activity = sumActivity(filtered)

  const grain = pickGrain(range)
  const series = grain === 'hour' ? aggregateHourSeries(hours, range) : aggregateSeries(filtered, grain)
  const showTrend = series.length >= 1
  const rank = modelRank(filtered)

  const anomalyMap = (() => {
    if (grain !== 'day' || filtered.length === 0) return null
    const actives = filtered.map(d => d.tokens ?? 0).filter(v => v > 0).sort((a, b) => a - b)
    if (actives.length === 0) return null
    const mid = Math.floor(actives.length / 2)
    const median = actives.length % 2 === 1 ? actives[mid] : (actives[mid - 1] + actives[mid]) / 2
    if (!(median > 0)) return null
    const map = new Map<string, { multiple: number; tokens: number }>()
    for (const d of filtered) {
      const tokens = d.tokens ?? 0
      if (tokens > median * 3) map.set(d.date, { multiple: tokens / median, tokens })
    }
    return map.size > 0 ? map : null
  })()

  const share = providerShare(filtered)
  const palette = providerPalette()

  const alerts = providers
    .filter(p => p.alert && (p.alert.level === 'critical' || p.alert.level === 'warning'))
    .sort((a, b) => (a.alert!.level === 'critical' ? -1 : 1) - (b.alert!.level === 'critical' ? -1 : 1))

  const emptyHint = (title: string): JSX.Element => <EmptyState title={title} hint="去聊两句就会在这里出现数据" />
  const yi = formatYiExact(sum.total)
  const deltaTotal = deltaPercent(sum.total, prevSum.total)
  const deltaInput = deltaPercent(sum.input, prevSum.input)
  const deltaOutput = deltaPercent(sum.output, prevSum.output)

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
      { label: '带宽', value: `↑${deltaInput === null ? '—' : `${deltaInput >= 10 ? Math.round(deltaInput) : deltaInput.toFixed(1)}%`}` },
    ],
    output: [
      { label: '输出 Token', value: formatUnits(sum.output) },
      { label: '占比', value: `${sum.total > 0 ? Math.round((sum.output / sum.total) * 100) : 0}%` },
      { label: '带宽', value: `↑${deltaOutput === null ? '—' : `${deltaOutput >= 10 ? Math.round(deltaOutput) : deltaOutput.toFixed(1)}%`}` },
    ],
    requests: [
      { label: '调用次数', value: formatUnits(activity.requests) },
      { label: '工作时长', value: formatWorkDuration(activity.workMs) },
      { label: '日均 Tokens', value: formatUnits(avg) },
    ],
  }

  return (
    <>
      {/* ── 统计行：宽卡，hover 悬浮 desc、点击展开明细 ── */}
      <div className={css.statsRow}>
        <HubStat
          tone="blue"
          icon={icons.tokens}
          label="总 Tokens"
          value={yi?.yi ?? formatUnits(sum.total)}
          desc={deltaTotal === null ? `范围合计 ${formatUnits(sum.total)}` : `环比上一周期 ${deltaTotal >= 0 ? '+' : ''}${Math.round(deltaTotal)}%`}
          open={openStat === 'total'}
          onToggle={() => { toggleStat('total') }}
          delay={0}
        />
        <HubStat
          tone="violet"
          icon={icons.input}
          label="输入"
          value={formatUnits(sum.input)}
          desc={`输入精确 ${formatExact(sum.input)}；环比${deltaInput === null ? '—' : ` ${deltaInput >= 10 ? Math.round(deltaInput) : deltaInput.toFixed(1)}%`}`}
          open={openStat === 'input'}
          onToggle={() => { toggleStat('input') }}
          delay={40}
        />
        <HubStat
          tone="orange"
          icon={icons.output}
          label="输出"
          value={formatUnits(sum.output)}
          desc={`输出精确 ${formatExact(sum.output)}；环比${deltaOutput === null ? '—' : ` ${deltaOutput >= 10 ? Math.round(deltaOutput) : deltaOutput.toFixed(1)}%`}`}
          open={openStat === 'output'}
          onToggle={() => { toggleStat('output') }}
          delay={80}
        />
        <HubStat
          tone="green"
          icon={icons.requests}
          label="调用次数"
          value={formatUnits(activity.requests)}
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

      {/* ── 工具栏：范围·粒度 meta + 跳转 ── */}
      <div className={css.toolbar}>
        <span className={css.toolbarMeta}>
          {rangeLabel} · {GRAIN_NAME[grain]}{anomalyMap !== null ? ` · ${anomalyMap.size} 个异常日` : ''}
        </span>
        <span className={css.toolbarSpacer} />
        <button type="button" className={css.toolButton} onClick={onJumpDetail}>{'查看明细'}</button>
        {onJumpSignal !== undefined && (
          <button type="button" className={css.toolButton} onClick={onJumpSignal}>查看信号</button>
        )}
        <button type="button" className={css.toolButton} onClick={onJumpAccounts}>余额/配额</button>
        <span className={css.toolbarMeta}>{todayText()}</span>
      </div>

      <div className={`${css.mainScroll} ${modalStaggerClass}`}>
        {/* ── 主区：趋势图 + 右列（命中率 / 占比 / 告警） ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : 'minmax(0, 2.2fr) minmax(260px, 1fr)',
          gap: 12,
          alignItems: 'stretch',
          minWidth: 0,
        }}>
          <HubSection title={showTrend ? '用量趋势' : '模型消耗排行'} meta={showTrend ? `${rangeLabel} · ${GRAIN_NAME[grain]}` : rangeLabel}>
            <div style={{ ...panel(16, 12), minHeight: 280 }}>
              <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {showTrend
                  ? <BarChart data={series} anomalies={anomalyMap ?? undefined} onSelectAnomaly={anomalyMap !== null && onJumpSignal !== undefined ? () => onJumpSignal() : undefined} />
                  : emptyHint(`${rangeLabel}暂无可绘制的趋势数据`)}
              </div>
            </div>
          </HubSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <HubSection title="缓存命中率" meta={filtered.length > 0 ? `${filtered.length} 天平均` : undefined}>
              <div style={{ ...panel(16, 12), alignItems: 'center' }}>
                <Gauge percent={filtered.length > 0 ? hitRate : null} label="缓存命中率" size={compact ? 150 : 170} />
              </div>
            </HubSection>

            <HubSection title="供应商占比" meta={`Top ${Math.min(3, share.length)}`}>
              <div style={{ ...panel(16, 12) }}>
                <ShareColumns rows={share.map(s => ({ label: s.provider, value: s.tokens }))} total={sum.total} height={compact ? 150 : 176} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {share.slice(0, 4).map((s, i) => (
                    <div key={s.provider} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, lineHeight: '18px', minWidth: 0 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, flex: 'none', background: palette[i % palette.length] }} />
                      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' }} title={s.provider}>{s.provider}</span>
                      <span style={{ marginLeft: 'auto', flex: 'none', fontFamily: MONO, color: 'var(--dsw-alias-label-secondary)' }}>{formatUnits(s.tokens)}</span>
                    </div>
                  ))}
                  {share.length === 0 && (
                    <span style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>{rangeLabel}暂无用量</span>
                  )}
                </div>
              </div>
            </HubSection>

            <HubSection title="供应商告警" meta={alerts.length > 0 ? `${alerts.length} 条` : '全部正常'}>
              <div style={{ ...panel(16, 10), flex: '1 1 auto', minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  {alerts.length === 0 ? (
                    <div style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>全部供应商状态正常。</div>
                  ) : alerts.map((p, i) => (
                    <div key={p.id} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
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
                <button type="button" onClick={onJumpAccounts} style={{
                  flex: 'none', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 4,
                  padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-secondary)',
                }}>
                  查看余额/配额
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </button>
              </div>
            </HubSection>
          </div>
        </div>

        {/* ── 底排小指标块 ── */}
        <div style={{
          flex: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 12,
        }}>
          <Tile label="日均 Tokens" value={formatUnits(avg)} sub={`${filtered.length} 天有数据`} />
          <Tile label="工作时长" value={formatWorkDuration(activity.workMs)} sub={filtered.length > 0 ? `日均 ${formatWorkDuration(activity.workMs / filtered.length)}` : undefined} />
          <Tile label="缓存量" value={formatUnits(sum.cache)} sub={`命中率 ${formatHitRate(hitRate)}`} tone="muted" />
          <Tile label="活跃模型" value={String(rank.length)} sub={rank[0] !== undefined ? `Top ${rank[0].label}` : undefined} tone="success" />
          <Tile
            label="异常日"
            value={String(anomalyMap?.size ?? 0)}
            sub={anomalyMap !== null ? '高于活跃日中位数 3 倍' : '无异常'}
            tone={anomalyMap !== null ? 'error' : 'muted'}
            action={onJumpSignal !== undefined ? '查看信号' : undefined}
            onAction={onJumpSignal}
          />
        </div>

        {/* ── 模型消耗排行 ── */}
        <HubSection title="模型消耗排行" meta={`${rangeLabel} · Top ${Math.min(10, rank.length)}`}>
          <div style={{ ...panel(16, 12) }}>
            {rank.length === 0 ? emptyHint(`${rangeLabel}暂无用量`) : <RankBars rows={rank} nameWidth={compact ? 140 : 220} />}
          </div>
        </HubSection>
      </div>
    </>
  )
}
