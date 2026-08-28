/**
 * Token 活动 —— GitHub 风格贡献热力（52 周 × 7 天，右对齐当前周）。
 *
 * 卡头分段控件切换三种口径：
 *  - 每日：当天 token 总量；
 *  - 每周：周一起始的整周合计（同列七格同值）；
 *  - 累计：自首个有记录日起的滚动累计（跨 52 周窗口，保持曲线连续）。
 *
 * 点击带日期（过去）的格子下钻「当日模型明细」，与月/年热力共用同一个
 * selectedDay 状态。未到的未来天渲染为不可交互占位格，日历形状不跳动。
 * 数据取完整记录（不限查询范围）——「活动」是横跨历史的总览。
 */
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { formatUnits, formatHitRate } from './format'
import type { UsageDay } from './aggregate'

export type ActivityMode = 'day' | 'week' | 'cumulative'

/** 列数固定为 52 周（GitHub 年视图惯例）；数据不足时左侧自然留空。 */
export const ACTIVITY_COLUMNS = 52
const CELL = 20
const GAP = 3
const RADIUS = 4
const TIP_GAP = 8
const BLUE = [31, 111, 235] as const

const STYLE_ID = 'dsh-activity-styles'

/**
 * 贡献格子样式：入场回落 + 悬浮放大光晕 + 选中环 / 今日环 + 模式切换时的
 * 背景色过渡（rgba 可插值）。CSS 块内不写注释，防注入式注释提前闭合（对应
 * 「星号紧跟正斜杠」红线：任何注释闭合序列都会把后续规则拖成非法选择器）。
 */
const SHEET = `
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
`

/** 幂等注入贡献区样式；返回移除函数。 */
export function ensureActivityStyles(): () => void {
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

// ── 日期工具（与 range.ts 同构：YYYY-MM-DD 字典序即时间序） ──────────────

/** `YYYY-MM-DD` 偏移 N 天（Date 滚转，跨月/年正确）。 */
function shiftDayKey(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, (m ?? 1) - 1, (d ?? 1) + delta)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** 周一起始的星期索引（周一 = 0 … 周日 = 6）。 */
function weekdayIndex(key: string): number {
  const [y, m, d] = key.split('-').map(Number)
  return (new Date(y, (m ?? 1) - 1, d ?? 1).getDay() + 6) % 7
}

export interface ActivityCell {
  key: string
  column: number
  row: number
  /** 当前口径下的展示值（dayTokens / weekTokens / 累计）。 */
  tokens: number
  dayTokens: number
  weekTokens: number
  requests: number
  weekRequests: number
  hitRate: number | null
  isToday: boolean
  /** 该日已到（<= 今天）；false = 当前周内未到的占位格。 */
  past: boolean
}

export interface ActivitySnapshot {
  mode: ActivityMode
  columns: number
  cells: ActivityCell[]
  /** 7 行（周一 → 周日），每行一列一周。 */
  rows: ActivityCell[][]
  max: number
  total: number
  activeDays: number
  peakDay: string | null
  peakTokens: number
  startKey: string
  endKey: string
  firstRecorded: string | null
}

/**
 * 由完整记录构建 52 周贡献热力。纯函数，`today` 可注入以便测试。
 * 累计口径贯穿全部记录（含窗口外更早的天），末格累计 == 全部 token 总量。
 */
export function buildActivityGrid(days: UsageDay[] | null | undefined, mode: ActivityMode, today: Date = new Date()): ActivitySnapshot {
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const dayMap = new Map<string, UsageDay>()
  if (Array.isArray(days)) {
    for (const day of days) {
      if (day !== null && typeof day === 'object' && typeof day.date === 'string') dayMap.set(day.date, day)
    }
  }

  const columns = ACTIVITY_COLUMNS
  const totalDays = columns * 7
  const firstKey = shiftDayKey(todayKey, -((columns - 1) * 7 + weekdayIndex(todayKey)))
  const endKey = shiftDayKey(firstKey, totalDays - 1)

  const buckets = new Array<{ key: string; tokens: number; requests: number; cumulative: number; active: boolean }>(totalDays)
  const indexByKey = new Map<string, number>()
  for (let i = 0; i < totalDays; i += 1) {
    const key = shiftDayKey(firstKey, i)
    indexByKey.set(key, i)
    buckets[i] = { key, tokens: 0, requests: 0, cumulative: 0, active: false }
  }

  let running = 0
  let firstRecorded: string | null = null
  for (const key of [...dayMap.keys()].sort()) {
    if (firstRecorded === null) firstRecorded = key
    const entry = dayMap.get(key)!
    const tokens = entry.tokens ?? 0
    running += tokens
    const index = indexByKey.get(key)
    if (index === undefined) continue
    buckets[index].tokens = tokens
    buckets[index].requests = entry.requests ?? 0
    buckets[index].cumulative = running
    buckets[index].active = tokens > 0
  }

  const weekTokens = new Array<number>(columns).fill(0)
  const weekRequests = new Array<number>(columns).fill(0)
  for (let c = 0; c < columns; c += 1) {
    let t = 0
    let r = 0
    for (let i = 0; i < 7; i += 1) {
      t += buckets[c * 7 + i].tokens
      r += buckets[c * 7 + i].requests
    }
    weekTokens[c] = t
    weekRequests[c] = r
  }

  const cells: ActivityCell[] = []
  const rows: ActivityCell[][] = Array.from({ length: 7 }, () => [])
  let max = 0
  let total = 0
  let activeDays = 0
  let peakDay: string | null = null
  let peakTokens = 0
  for (let i = 0; i < totalDays; i += 1) {
    const bucket = buckets[i]
    const column = Math.floor(i / 7)
    const value = mode === 'week' ? weekTokens[column]
      : mode === 'cumulative' ? bucket.cumulative
        : bucket.tokens
    const cell: ActivityCell = {
      key: bucket.key,
      column,
      row: i % 7,
      tokens: value,
      dayTokens: bucket.tokens,
      weekTokens: weekTokens[column],
      requests: bucket.requests,
      weekRequests: weekRequests[column],
      hitRate: bucket.active ? (dayMap.get(bucket.key)?.cacheHitRate ?? null) : null,
      isToday: bucket.key === todayKey,
      past: bucket.key <= todayKey,
    }
    cells.push(cell)
    rows[i % 7].push(cell)
    total += bucket.tokens
    if (bucket.active) activeDays += 1
    if (bucket.tokens > peakTokens) {
      peakTokens = bucket.tokens
      peakDay = bucket.key
    }
    if (value > max) max = value
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
    firstRecorded,
  }
}

/**
 * 贡献格配色：Codex 蓝 alpha 渐变（平方根曲线，低值可见、高峰突出）。
 * 零值/占位返回中性灰；未来占位格由更浅的背景色区分。
 */
export function activityColor(tokens: number, max: number): string {
  if (!(tokens > 0)) return 'color-mix(in srgb, var(--dsw-alias-border-l2) 55%, transparent)'
  const ratio = max > 0 ? Math.sqrt(Math.min(1, tokens / max)) : 1
  const alpha = Math.min(1, 0.25 + 0.75 * ratio)
  return `rgba(${BLUE[0]}, ${BLUE[1]}, ${BLUE[2]}, ${alpha.toFixed(3)})`
}

const MODES: Array<{ id: ActivityMode; index: number; label: string }> = [
  { id: 'day', index: 0, label: '每日' },
  { id: 'week', index: 1, label: '每周' },
  { id: 'cumulative', index: 2, label: '累计' },
]

interface HoverState { cell: ActivityCell; left: number; top: number }

export function ActivityGrid({ days, mode, onMode, selectedKey, onSelect }: {
  days: UsageDay[] | null
  mode: ActivityMode
  onMode: (mode: ActivityMode) => void
  selectedKey: string | null
  onSelect: (key: string) => void
}): JSX.Element {
  const [hover, setHover] = useState<HoverState | null>(null)
  const snapshot = useMemo(() => buildActivityGrid(days, mode), [days, mode])

  useEffect(() => ensureActivityStyles(), [])

  const peak = snapshot.peakDay === null
    ? ''
    : `${snapshot.peakDay.slice(5).replace('-', ' / ')} ${formatUnits(snapshot.peakTokens)}`
  const summary = snapshot.activeDays === 0
    ? '暂无记录'
    : `${snapshot.activeDays} 活跃天 · 峰值 ${peak}`
  const legendSteps = [0.3, 0.5, 0.68, 0.85, 1]

  const tooltipBody = (cell: ActivityCell): string => {
    if (mode === 'week') {
      const start = shiftDayKey(cell.key, -cell.row)
      const end = shiftDayKey(cell.key, 6 - cell.row)
      return `${start} ～ ${end} · 合计 ${formatUnits(cell.tokens)} · ${cell.weekRequests} 次请求`
    }
    if (mode === 'cumulative') {
      const from = snapshot.firstRecorded ?? snapshot.startKey
      return `${from} → ${cell.key} 累计 ${formatUnits(cell.tokens)}`
    }
    const hit = cell.hitRate === null ? '' : ` · 命中 ${formatHitRate(cell.hitRate)}`
    return `${cell.key} · 合计 ${formatUnits(cell.dayTokens)} · ${cell.requests} 次请求${hit}`
  }

  return (
    <div>
      {/* 卡头：标题 + 摘要 + 分段控件（滑动指示器） */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, lineHeight: '22px', fontWeight: 500, color: 'var(--dsw-alias-label-primary)' }}>Token 活动</span>
        <span style={{ fontSize: 12, lineHeight: '18px', color: 'var(--dsw-alias-label-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</span>
        <span style={{ marginLeft: 'auto' }}>
          <span
            className="dsh-activity-tabs"
            role="group"
            aria-label="Token 活动口径"
            style={{ '--dsh-activity-ind': String(MODES.find(m => m.id === mode)?.index ?? 0) } as CSSProperties}
          >
            <span className="dsh-activity-ind" aria-hidden="true" />
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                className="dsh-activity-tab"
                data-active={m.id === mode}
                aria-pressed={m.id === mode}
                onClick={() => onMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </span>
        </span>
      </div>

      {/* 7 行 × 52 列贡献网格：整块居中，窄视口横向滚动兜底 */}
      <div style={{ overflowX: 'auto', marginTop: 12, paddingBottom: 2 }}>
        <div style={{ width: 'max-content', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: GAP }}>
          {snapshot.rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: GAP }}>
              {row.map(cell => {
                if (!cell.past) {
                  return (
                    <span
                      key={cell.key}
                      className="dsh-activity-cell"
                      data-clickable="false"
                      data-past="false"
                      aria-hidden="true"
                      style={{
                        background: 'color-mix(in srgb, var(--dsw-alias-border-l2) 30%, transparent)',
                        animationDelay: `${cell.column * 6}ms`,
                      }}
                    />
                  )
                }
                return (
                  <button
                    key={cell.key}
                    type="button"
                    className="dsh-activity-cell"
                    data-clickable="true"
                    data-past="true"
                    data-today={cell.isToday}
                    data-selected={selectedKey === cell.key}
                    aria-label={`${cell.key} · ${formatUnits(cell.tokens)}`}
                    aria-pressed={selectedKey === cell.key}
                    onClick={() => onSelect(cell.key)}
                    onMouseEnter={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      setHover({ cell, left: r.left, top: r.top })
                    }}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      background: activityColor(cell.tokens, snapshot.max),
                      animationDelay: `${cell.column * 6}ms`,
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 图例 + 范围标注 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 11, lineHeight: '16px', color: 'var(--dsw-alias-label-tertiary)' }}>
        <span>少</span>
        {legendSteps.map((alpha, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: 2, background: `rgba(${BLUE[0]}, ${BLUE[1]}, ${BLUE[2]}, ${alpha})` }} />
        ))}
        <span>多</span>
        <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{snapshot.startKey} ~ {snapshot.endKey}</span>
      </div>

      {/* 悬浮 tooltip：portal 到 body，防祖先 backdrop-filter/transform 钉死坐标系 */}
      {hover !== null && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          bottom: typeof window !== 'undefined' ? window.innerHeight - hover.top + TIP_GAP : 0,
          left: hover.left,
          background: 'var(--dsw-alias-bg-layer-3)',
          border: '1px solid var(--dsw-alias-border-l1)',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 12,
          lineHeight: '18px',
          whiteSpace: 'nowrap',
          zIndex: 6100,
          boxShadow: '0 8px 24px rgba(0,0,0,.35)',
          pointerEvents: 'none',
          color: 'var(--dsw-alias-label-secondary)',
        }}>
          {tooltipBody(hover.cell)}
        </div>,
        document.body,
      )}
    </div>
  )
}