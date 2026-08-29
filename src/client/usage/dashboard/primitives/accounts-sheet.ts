/**
 * 余额/配额页卡片网格的共享样式：卡片入场、悬浮光晕、状态点辉光、
 * 骨架屏 shimmer、刷新旋转、空态入场。
 *
 * 注入式 CSS 红线：本块内不写任何注释（注释闭合序列会把后续规则拖成
 * 非法选择器整条丢弃），类名全部带 dsh-acc- 前缀避免与宿主冲突。
 */

export const ACC_STYLE_ID = 'dsh-accounts-sheet'

export const ACC_SHEET = `
@keyframes dsh-acc-in {
  from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.985); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes dsh-acc-win-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes dsh-acc-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
@keyframes dsh-acc-pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, transparent); }
  50% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--dsw-alias-state-error-primary) 0%, transparent); }
}
@keyframes dsh-acc-spin {
  to { transform: rotate(360deg); }
}
.dsh-acc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 12px;
  align-items: start;
}
.dsh-acc-card {
  position: relative;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-2);
  padding: 14px 16px;
  opacity: 0;
  animation: dsh-acc-in 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dsh-acc-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 42%, var(--dsw-alias-border-l2));
  box-shadow: 0 10px 30px color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent), 0 2px 8px rgba(0, 0, 0, 0.22);
}
.dsh-acc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
  box-shadow: 0 0 6px currentColor;
}
.dsh-acc-dot[data-critical="true"] {
  animation: dsh-acc-pulse 2.2s ease-in-out infinite;
}
.dsh-acc-skel {
  height: 92px;
  border-radius: 14px;
  border: 1px solid var(--dsw-alias-border-l1);
  background:
    linear-gradient(90deg, var(--dsw-alias-bg-layer-2) 25%, var(--dsw-alias-bg-layer-1) 50%, var(--dsw-alias-bg-layer-2) 75%);
  background-size: 200% 100%;
  animation: dsh-acc-shimmer 1.4s linear infinite;
}
.dsh-acc-win {
  opacity: 0;
  animation: dsh-acc-win-in 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.dsh-acc-spin {
  animation: dsh-acc-spin 0.8s linear infinite;
}
.dsh-acc-chip {
  font-size: 11px;
  line-height: 18px;
  border-radius: 6px;
  padding: 0 7px;
  flex: none;
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .dsh-acc-card, .dsh-acc-win, .dsh-acc-skel, .dsh-acc-dot[data-critical="true"], .dsh-acc-spin {
    animation: none;
    opacity: 1;
  }
  .dsh-acc-card { transition: none; }
}
`

export function ensureAccountsStyles(): () => void {
  if (typeof document === 'undefined') return () => {}
  let tag = document.getElementById(ACC_STYLE_ID) as HTMLStyleElement | null
  if (tag === null) {
    tag = document.createElement('style')
    tag.id = ACC_STYLE_ID
    tag.dataset.plugin = 'dsh-triad'
    tag.textContent = ACC_SHEET
    document.head.appendChild(tag)
  }
  return () => { tag?.remove() }
}
