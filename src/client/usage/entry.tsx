/**
 * 用量工作台 + 技能面板入口：侧边栏导航行。
 *
 * 「用量」「技能」「记忆」三个入口合并成一行、等分居中；点击任一按钮以
 * 按钮位置为锚点打开完整卡片（popover，视口过窄回退底部 sheet）。
 */
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { IconDataOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { Workbench } from './dashboard/Workbench'
import { SkillsPanel } from './dashboard/SkillsPanel'
import { ensureModalAnimStyles, useModalClose } from '../modal-animation'
import { ErrorBoundary } from '../error-boundary'
import { NavButton, NavPortal, ensureNavMount, ensureNavStyles, navAnchorFrom, useRail } from '../sidebar-nav'
import { ensureShellStyles, type PopoverAnchor } from '../popover-shell'

/** 从点击事件取锚点：所在导航行右缘 +8、按钮顶缘 -6（合并行统一滑出位）。 */
function anchorFromEvent(e: React.MouseEvent<HTMLButtonElement>): PopoverAnchor | null {
  return navAnchorFrom(e.currentTarget)
}

/**
 * 用量入口：导航行 + 点击打开完整工作台。
 *
 * 本行原先在行尾常驻「今日总用量」并每 60s 轮询一次。三个入口合并成一行后
 * 每格只有约 1/3 侧栏宽，放不下「文字 + 数字」（且行尾的 margin-left:auto
 * 会顶掉居中），故整块去掉——完整数据点开工作台卡片即可，顺带省掉轮询。
 */
function UsageWorkbenchEntry(): JSX.Element {
  ensureModalAnimStyles()
  ensureShellStyles()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<PopoverAnchor | null>(null)
  const { closing, requestClose } = useModalClose(open, () => { setOpen(false) })
  const rail = useRail()

  return (
    <>
      <NavButton
        icon={<IconDataOutline16 size={rail ? 18 : 16} />}
        label="用量"
        rail={rail}
        expanded={open}
        onClick={e => {
          e.stopPropagation()
          setAnchor(anchorFromEvent(e))
          setOpen(true)
        }}
      />
      {/* 面板单独包边界：面板内部崩了只收面板，导航行按钮留着（否则 React 18
          会卸载整个 root，侧边栏入口凭空消失且控制台无痕）。 */}
      {open && (
        <ErrorBoundary label="用量工作台" fallback={null} onError={requestClose}>
          <Workbench closing={closing} onClose={requestClose} anchor={anchor} />
        </ErrorBoundary>
      )}
    </>
  )
}

/** 技能入口：导航行 + 贴右侧滑出的技能管理卡片。 */
function SkillsEntry(): JSX.Element {
  ensureModalAnimStyles()
  ensureShellStyles()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<PopoverAnchor | null>(null)
  const { closing, requestClose } = useModalClose(open, () => { setOpen(false) })
  const rail = useRail()
  return (
    <>
      {/* 打开的书（Feather book-open 线性风，与自动化/记忆的自绘图标同款描边） */}
      <NavButton
        icon={(
          <svg width={rail ? 18 : 16} height={rail ? 18 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        )}
        label="技能"
        rail={rail}
        expanded={open}
        onClick={e => {
          e.stopPropagation()
          setAnchor(anchorFromEvent(e))
          setOpen(true)
        }}
      />
      {open && (
        <ErrorBoundary label="技能面板" fallback={null} onError={requestClose}>
          <SkillsPanel closing={closing} onClose={requestClose} anchor={anchor} />
        </ErrorBoundary>
      )}
    </>
  )
}

/** 导航行应用：用量入口 portal 到 nav host 的 usage 槽（独立行）；
 * 技能入口 portal 到「自动化」host 的 skills 槽——与自动化、记忆合成一行。 */
function UsageSkillsNavApp(): JSX.Element | null {
  ensureNavStyles()
  return (
    <>
      <NavPortal name="usage">
        <UsageWorkbenchEntry />
      </NavPortal>
      <NavPortal name="skills">
        <SkillsEntry />
      </NavPortal>
    </>
  )
}

export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    ensureNavMount()
    // React 根挂在游离容器上（React 18 支持容器后入树）；实际 UI 经 portal
    // 落到 sidebar-nav 的槽位 div。
    const holder = document.createElement('div')
    const root = createRoot(holder)
    root.render(<UsageSkillsNavApp />)
    return () => { root.unmount() }
  }, 'webui: usage/skills nav entries')
}
