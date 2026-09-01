/**
 * UsageTab — 明细 tab（Skills Hub 风格）。
 *
 * 统计行（范围合计/模型数/活跃天数/平均命中率，宽卡 + 悬浮 desc + 点击展开）
 * + 工具栏（供应商/模型搜索、排序下拉）+ 内容区：Token 活动热力、月/年热力、
 * 模型消耗排行、每日明细表（搜索命中时按「天 × 模型」展开）。
 */

import { useEffect, useState } from 'react'
import { usageApi } from './api'
import { averageCacheHitRate, modelRank, splitModelKey, sumTokens, type UsageDay } from './aggregate'
import { filterDays, type DateRange } from './range'
import { formatHitRate, formatUnits } from './format'
import { RankBars } from './charts/RankBars'
import { Heatmap } from './charts/Heatmap'
import { ErrorCard } from './primitives/ErrorCard'
import { useIsMobile } from '../../responsive'
import { ActivityGrid, type ActivityMode } from './ActivityGrid'
import { modalStaggerClass } from '../../modal-animation'
import { css, HubStat, HubStatDetail, HubSection, modelsIcon, daysIcon, hitIcon, tokensIcon } from './hub'

export interface UsageTabProps {
  range: DateRange
  rangeLabel: string
  refreshTick?: number
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

const STYLE_ID = 'dsh-usage-search-styles'

/* ── 搜索交互样式：行入场淡入 + 输入框聚焦光效。
   注释刻意用文字描述「星号紧跟正斜杠」，不写出该两字符序列，防止整串被提前闭合。 ── */
const SHEET = `
@keyframes dsh-usage-row-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.dsh-usage-row-in { animation: dsh-usage-row-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
@media (prefers-reduced-motion: reduce) {
  .dsh-usage-row-in { animation: none; }
}
`

/** 幂等注入搜索样式；返回移除函数。 */
function ensureSearchStyle(): () => void {
  if (typeof document === 'undefined') return () => {}
  let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (tag === null) {
    tag = document.createElement('style')
    tag.id = STYLE_ID
    tag.dataset.plugin = 'dsh-triad'
    tag.textContent = SHEET
    document.head.appendChild(tag)
  }
  return () => { tag?.remove() }
}

/** `.rowCard`：描边行卡片。 */
const rowCard: React.CSSProperties = {
  border: '1px solid var(--dsw-alias-border-l2)',
  borderRadius: 12,
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 0,
}

/** `.rowHead`：卡头。 */
function CardHead({ name, meta }: { name: string; meta?: string }): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 14, lineHeight: '22px', fontWeight: 500, color: 'var(--dsw-alias-label-primary)' }}>{name}</span>
      {meta !== undefined && <span style={{ marginLeft: 'auto', fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)' }}>{meta}</span>}
    </div>
  )
}

/** DSH 表格单元格通用样式。 */
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '6px 8px',
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: 'var(--dsw-alias-label-secondary)',
  borderBottom: '1px solid var(--dsw-alias-border-l2)',
  whiteSpace: 'nowrap',
}
const tdStyle: React.CSSProperties = {
  padding: '6px 8px',
  fontSize: 13,
  lineHeight: '20px',
  color: 'var(--dsw-alias-label-primary)',
}
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: MONO }

/** 每日明细展开行（搜索空 = 按天汇总；搜索非空 = 按天 × 匹配模型）。 */
interface DetailRow {
  key: string
  date: string
  model?: string
  input: number
  output: number
  cache: number
  total: number
  hitRate: number | null
}

/** 由范围数据构建明细行；query 非空时按供应商 / 模型名过滤并按模型展开。 */
function buildDetailRows(days: UsageDay[], query: string): DetailRow[] {
  const q = query.trim().toLowerCase()
  if (q === '') {
    return days.map(d => {
      const s = sumTokens([d])
      return {
        key: d.date, date: d.date,
        input: s.input, output: s.output, cache: s.cache, total: s.total,
        hitRate: d.cacheHitRate ?? null,
      }
    })
  }
  const rows: DetailRow[] = []
  for (const d of days) {
    for (const m of d.models ?? []) {
      const { provider, model } = splitModelKey(m.model)
      if (!provider.toLowerCase().includes(q) && !model.toLowerCase().includes(q)) continue
      const input = m.inputTokens ?? 0
      const cacheRead = m.cacheReadTokens ?? 0
      const cacheWrite = m.cacheWriteTokens ?? 0
      const prompt = input + cacheRead + cacheWrite
      rows.push({
        key: `${d.date}:${m.model}`, date: d.date, model: m.model,
        input,
        output: m.outputTokens ?? 0,
        cache: cacheRead + cacheWrite,
        total: m.tokens ?? 0,
        hitRate: prompt > 0 ? (cacheRead / prompt) * 100 : null,
      })
    }
  }
  return rows
}

type SortKey = 'total' | 'name'

export function UsageTab({ range, rangeLabel, refreshTick }: UsageTabProps): JSX.Element {
  const [usage, setUsage] = useState<UsageDay[] | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [activityMode, setActivityMode] = useState<ActivityMode>('day')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('total')
  const [sortAsc, setSortAsc] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [openStat, setOpenStat] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryTick, setRetryTick] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    let alive = true
    setError(null)
    usageApi.usage().then((p) => {
      if (!alive) return
      if (p.ok !== true) throw new Error('用量数据加载失败')
      setUsage(p.days)
    }).catch((e: unknown) => { if (alive) setError(e instanceof Error ? e.message : String(e)) })
    return () => { alive = false }
  }, [refreshTick, retryTick])

  useEffect(() => ensureSearchStyle(), [])

  if (error) {
    return <ErrorCard message={error} onRetry={() => setRetryTick(t => t + 1)} />
  }
  if (usage === null) return <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 13, color: 'var(--dsw-alias-label-tertiary)' }}>加载中…</div>

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`

  const filtered = filterDays(usage, range)
  const filteredSorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

  const modelRankData = modelRank(filtered).map(row => {
    const { provider, model } = splitModelKey(row.label)
    return { ...row, provider, model: model === provider ? row.label : model }
  })
  const sortedRank = [...modelRankData].sort((a, b) => {
    if (sortKey === 'total') return sortAsc ? a.value - b.value : b.value - a.value
    const order = a.label.localeCompare(b.label)
    return sortAsc ? order : -order
  })

  const detailRows = buildDetailRows(filteredSorted, query)
  const searching = query.trim() !== ''
  const inRangeSum = sumTokens(filtered)
  const hitRate = averageCacheHitRate(filtered)

  const monthDays = usage.filter(d => d.date.startsWith(monthPrefix))
  const daysInMonth = new Date(year, month, 0).getDate()
  const monthCells = Array.from({ length: daysInMonth }, (_, i) => {
    const dateStr = `${monthPrefix}-${String(i + 1).padStart(2, '0')}`
    const hit = monthDays.find(d => d.date === dateStr)
    return {
      key: dateStr, label: dateStr, short: String(i + 1), value: hit?.tokens ?? 0,
      input: hit?.inputTokens ?? 0,
      output: hit?.outputTokens ?? 0,
      cache: hit ? (hit.cacheReadTokens ?? 0) + (hit.cacheWriteTokens ?? 0) : 0,
      hitRate: hit?.cacheHitRate,
    }
  })
  const yearCells = Array.from({ length: 12 }, (_, i) => {
    const key = `${year}-${String(i + 1).padStart(2, '0')}`
    const days = usage.filter(d => d.date.startsWith(key))
    const sum = sumTokens(days)
    return {
      key, label: `${i + 1} 月`, short: `${i + 1}月`, value: sum.total,
      input: sum.input,
      output: sum.output,
      cache: sum.cache,
      hitRate: days.length > 0 ? days.reduce((acc, d) => acc + (d.cacheHitRate ?? 0), 0) / days.length : undefined,
    }
  })

  const toggleStat = (key: string): void => { setOpenStat(v => v === key ? null : key) }

  return (
    <>
      {/* ── 统计行 ── */}
      <div className={css.statsRow}>
        <HubStat
          tone="blue"
          icon={tokensIcon(18)}
          label="范围合计"
          value={formatUnits(inRangeSum.total)}
          desc={`输入 ${formatUnits(inRangeSum.input)} · 输出 ${formatUnits(inRangeSum.output)} · 缓存 ${formatUnits(inRangeSum.cache)}`}
          open={openStat === 'total'}
          onToggle={() => { toggleStat('total') }}
          delay={0}
        />
        <HubStat
          tone="violet"
          icon={modelsIcon(18)}
          label="模型数"
          value={String(modelRankData.length)}
          desc={`范围内用到 ${modelRankData.length} 个不同模型`}
          open={openStat === 'models'}
          onToggle={() => { toggleStat('models') }}
          delay={40}
        />
        <HubStat
          tone="green"
          icon={daysIcon(18)}
          label="活跃天数"
          value={String(filtered.filter(d => (d.tokens ?? 0) > 0).length)}
          desc={`${filtered.length} 天位于所选范围`}
          open={openStat === 'days'}
          onToggle={() => { toggleStat('days') }}
          delay={80}
        />
        <HubStat
          tone="orange"
          icon={hitIcon(18)}
          label="平均命中率"
          value={formatHitRate(hitRate)}
          desc="缓存读占提示词比重 · 左右平均"
          open={openStat === 'hit'}
          onToggle={() => { toggleStat('hit') }}
          delay={120}
        />
      </div>

      {openStat !== null && (
        <HubStatDetail
          title={`${openStat === 'total' ? '范围合计' : openStat === 'models' ? '模型数' : openStat === 'days' ? '活跃天数' : '平均命中率'} · ${rangeLabel}`}
          rows={openStat === 'total'
            ? [
              { label: '输入', value: formatUnits(inRangeSum.input) },
              { label: '输出', value: formatUnits(inRangeSum.output) },
              { label: '缓存', value: formatUnits(inRangeSum.cache) },
            ]
            : openStat === 'models'
              ? modelRankData.slice(0, 5).map(r => ({ label: r.model, value: formatUnits(r.value) }))
              : openStat === 'days'
                ? [
                  { label: '范围天数', value: `${filtered.length} 天` },
                  { label: '有量天数', value: `${filtered.filter(d => (d.tokens ?? 0) > 0).length} 天` },
                  { label: '空白天数', value: `${filtered.filter(d => (d.tokens ?? 0) === 0).length} 天` },
                ]
                : [
                  { label: '缓存读', value: formatUnits(inRangeSum.cache) },
                  { label: '输入', value: formatUnits(inRangeSum.input) },
                ]}
        />
      )}

      {/* ── 工具栏：搜索 + 排序 ── */}
      <div className={css.toolbar}>
        <div className={css.searchBox}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flex: 'none' }}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            className={css.searchInput}
            type="text"
            value={query}
            placeholder="搜索供应商 / 模型…"
            aria-label="按供应商或模型搜索"
            onChange={e => setQuery(e.target.value)}
          />
          {query !== '' && (
            <button type="button" className={css.searchClear} aria-label="清除搜索" onClick={() => { setQuery('') }}>✕</button>
          )}
        </div>
        <div className={css.dropWrap}>
          <button
            type="button"
            className={css.toolButton}
            aria-haspopup="menu"
            aria-expanded={sortMenuOpen || undefined}
            onClick={() => { setSortMenuOpen(v => !v) }}
          >
            {sortKey === 'total' ? '用量' : '名称'}
            <span aria-hidden="true" style={{ fontSize: 11, opacity: 0.7 }}>{sortAsc ? '↑' : '↓'}</span>
          </button>
          {sortMenuOpen && (
            <>
              <button type="button" className={css.bulkOverlay} aria-label="关闭" onClick={() => { setSortMenuOpen(false) }} />
              <div className={css.dropMenu} role="menu">
                <button
                  type="button" role="menuitemradio" className={css.dropItem} aria-checked={sortKey === 'total' && !sortAsc}
                  onClick={() => { setSortKey('total'); setSortAsc(false); setSortMenuOpen(false) }}
                >
                  <span className={css.dropCheck} data-on={sortKey === 'total' && !sortAsc || undefined} aria-hidden="true">{sortKey === 'total' && !sortAsc ? '✓' : ''}</span>
                  用量 最多优先
                </button>
                <button
                  type="button" role="menuitemradio" className={css.dropItem} aria-checked={sortKey === 'total' && sortAsc}
                  onClick={() => { setSortKey('total'); setSortAsc(true); setSortMenuOpen(false) }}
                >
                  <span className={css.dropCheck} data-on={sortKey === 'total' && sortAsc || undefined} aria-hidden="true">{sortKey === 'total' && sortAsc ? '✓' : ''}</span>
                  用量 最少优先
                </button>
                <button
                  type="button" role="menuitemradio" className={css.dropItem} aria-checked={sortKey === 'name' && !sortAsc}
                  onClick={() => { setSortKey('name'); setSortAsc(false); setSortMenuOpen(false) }}
                >
                  <span className={css.dropCheck} data-on={sortKey === 'name' && !sortAsc || undefined} aria-hidden="true">{sortKey === 'name' && !sortAsc ? '✓' : ''}</span>
                  名称 A→Z
                </button>
                <button
                  type="button" role="menuitemradio" className={css.dropItem} aria-checked={sortKey === 'name' && sortAsc}
                  onClick={() => { setSortKey('name'); setSortAsc(true); setSortMenuOpen(false) }}
                >
                  <span className={css.dropCheck} data-on={sortKey === 'name' && sortAsc || undefined} aria-hidden="true">{sortKey === 'name' && sortAsc ? '✓' : ''}</span>
                  名称 Z→A
                </button>
              </div>
            </>
          )}
        </div>
        <span className={css.toolbarSpacer} />
        <span className={css.toolbarMeta}>{rangeLabel} · {searching ? `命中 ${detailRows.length} 行` : `${filteredSorted.length} 天`}</span>
      </div>

      <div className={`${css.mainScroll} ${modalStaggerClass}`}>
        {/* Token 活动：全量记录贡献热力（52 周） */}
        <HubSection title="Token 活动" meta="52 周贡献热力，点格子看当日模型明细">
          <div style={rowCard}>
            <ActivityGrid
              days={usage}
              mode={activityMode}
              onMode={setActivityMode}
              selectedKey={selectedDay}
              onSelect={setSelectedDay}
            />
          </div>
        </HubSection>

        {/* 热力行 */}
        <HubSection title="热力">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, alignItems: 'start' }}>
            <div style={rowCard}>
              <CardHead name={`${year} 年 ${month} 月热力`} meta="点击格子看当日模型明细" />
              <Heatmap cells={monthCells} onSelect={c => setSelectedDay(c.label)} cellText="both" />
            </div>
            <div style={rowCard}>
              <CardHead name={`${year} 年度热力`} meta="1-6 月 / 7-12 月" />
              <Heatmap cells={yearCells} rows={2} cellText="both" />
            </div>
          </div>
        </HubSection>

        {/* 点热力格子：当日模型明细 */}
        {selectedDay !== null && (
          <HubSection title={`${selectedDay} 模型明细`}>
            <div style={rowCard}>
              <DayDetailTable day={usage.find(d => d.date === selectedDay)} />
            </div>
          </HubSection>
        )}

        {/* 模型消耗排行（受搜索/排序影响） */}
        <HubSection title="模型消耗排行" meta={`${rangeLabel} · ${sortedRank.length} 个模型`}>
          <div style={rowCard}>
            {sortedRank.length === 0
              ? <div className={css.empty}>{searching ? `没有匹配「${query.trim()}」的供应商或模型` : '该范围暂无用量'}</div>
              : <RankBars rows={sortedRank} nameWidth={isMobile ? 140 : 220} />}
          </div>
        </HubSection>

        {/* 每日明细 */}
        <HubSection title="每日明细" meta={searching ? `命中 ${detailRows.length} 行` : `${filteredSorted.length} 天`}>
          <div style={rowCard}>
            {filteredSorted.length === 0 ? (
              <div className={css.empty}>该范围暂无用量</div>
            ) : detailRows.length === 0 ? (
              <div className={css.empty}>没有匹配「{query.trim()}」的供应商或模型</div>
            ) : (
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, background: 'var(--dsw-alias-bg-layer-2)', zIndex: 1 }}>
                    <tr>{(searching ? ['日期', '模型', '输入', '输出', '缓存', '合计', '命中率'] : ['日期', '输入', '输出', '缓存', '合计', '命中率']).map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {detailRows.map(r => (
                      <tr key={r.key} className="dsh-usage-row-in"
                        style={{ cursor: searching ? 'default' : 'pointer', borderBottom: '1px solid var(--dsw-alias-border-l1)' }}
                        onClick={searching ? undefined : () => setSelectedDay(r.date)}>
                        <td style={tdStyle}>{r.date}</td>
                        {r.model !== undefined && (
                          <td style={{ ...tdStyle, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.model}>{r.model}</td>
                        )}
                        <td style={tdMono}>{formatUnits(r.input)}</td>
                        <td style={tdMono}>{formatUnits(r.output)}</td>
                        <td style={tdMono}>{formatUnits(r.cache)}</td>
                        <td style={tdMono}>{formatUnits(r.total)}</td>
                        <td style={tdStyle}>{formatHitRate(r.hitRate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </HubSection>
      </div>
    </>
  )
}

function DayDetailTable({ day }: { day?: UsageDay }): JSX.Element | null {
  if (day === undefined) return null
  const rows = [...(day.models ?? [])].sort((a, b) => b.tokens - a.tokens)
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead><tr>{['模型', '输入', '输出', '缓存', '合计', '命中率'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.model} style={{ borderBottom: '1px solid var(--dsw-alias-border-l1)' }}>
            <td style={tdStyle}>{r.model}</td>
            <td style={tdMono}>{formatUnits(r.inputTokens)}</td>
            <td style={tdMono}>{formatUnits(r.outputTokens)}</td>
            <td style={tdMono}>{formatUnits(r.cacheReadTokens)}</td>
            <td style={tdMono}>{formatUnits(r.tokens)}</td>
            <td style={tdStyle}>{formatHitRate(r.cacheHitRate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
