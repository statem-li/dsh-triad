/**
 * dsh-memory 注入开关（composer 输入框工具行左端）：
 * 按会话控制是否把记忆注入上下文。开启 = 记忆随 pre-step 注入；关闭 = 本会话不注入。
 * 状态持久化在 host（state.json），重启保留。
 */

import { useEffect, useRef, useState } from 'react'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { MemoryApi } from './api.js'
import { BrainIcon } from './Panel.tsx'
import { css, ensureStyles } from './styles.js'

/** 完整 props：composer 插槽 standardProps 的 sessionId + 注入 API 面 + locale。 */
export type MemoryToggleProps =
  { sessionId: string }
  & InjectFace<MemoryApi>
  & PropsLocale<'dshMemory'>

/** 渲染注入开关按钮。 */
export function MemoryToggle({ sessionId, t, ...api }: MemoryToggleProps): JSX.Element {
  ensureStyles()
  const [enabled, setEnabled] = useState<boolean | null>(null)
  // inject 每次渲染返回新 api 对象；固定引用，否则 effect 依赖 api 每次变化
  // 都会重发 /inject-state —— 实测一分钟 498 次请求（请求风暴，composer 每渲染
  // 一次就触发一轮）。与 Panel/Notify 的 apiRef 同款处理。
  const apiRef = useRef(api)
  apiRef.current = api

  useEffect(() => {
    let alive = true
    void apiRef.current.getInjectState(sessionId)
      .then(state => { if (alive) setEnabled(state.enabled) })
      .catch(() => { if (alive) setEnabled(true) })
    return () => { alive = false }
  }, [sessionId])

  const toggle = (): void => {
    const next = !(enabled ?? true)
    setEnabled(next)
    void apiRef.current.setInjectState(sessionId, next)
      .then(state => setEnabled(state.enabled))
      .catch(() => setEnabled(!next))
  }

  const isOn = enabled ?? true
  return (
    <Tooltip label={isOn ? t('injectOn') : t('injectOff')} side="top" delayMs={500}>
      <button
        type="button"
        className={isOn ? `${css.toggle} ${css.toggleOn}` : `${css.toggle} ${css.toggleOff}`}
        aria-label={isOn ? t('injectOn') : t('injectOff')}
        aria-pressed={isOn}
        onClick={toggle}
      >
        <BrainIcon size={14} />
      </button>
    </Tooltip>
  )
}
