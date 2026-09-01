/**
 * AccountsTab — 余额/配额 tab（Skills Hub 风格）。
 *
 * 统计行（供应商/积分池/告警/已配置，宽卡 + 悬浮 desc + 点击展开明细）
 * + 工具栏（全部刷新）+ 供应商卡片网格（积分制展示积分池卡片组）。
 */

import { useEffect, useState } from 'react'
import { usageApi, type ProviderInfo } from './api'
import { ProviderGroup } from './primitives/ProviderGroup'
import { CredentialModal } from './primitives/CredentialModal'
import { ErrorCard } from './primitives/ErrorCard'
import { ensureAccountsStyles } from './primitives/accounts-sheet'
import { css, HubStat, HubStatDetail, HubSection, walletIcon, tokensIcon, hitIcon, modelsIcon } from './hub'
import { modalStaggerClass } from '../../modal-animation'

export interface AccountsTabProps { refreshTick?: number }

/**
 * 余额/配额：供应商卡片网格（不再是官方列表行）。
 * 每个供应商一张卡片：状态点 + 徽标 + 告警 + 单卡刷新；SenseNova 积分制
 * 展示积分池卡片组。加载中显示与卡片同形的骨架屏，空态带引导文案。
 */
export function AccountsTab({ refreshTick }: AccountsTabProps): JSX.Element {
  const [providers, setProviders] = useState<ProviderInfo[]>([])
  const [credentialFor, setCredentialFor] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [openStat, setOpenStat] = useState<string | null>(null)

  useEffect(() => ensureAccountsStyles(), [])

  const load = (): void => {
    setError(null)
    usageApi.providers().then(p => {
      if (p.ok !== true) throw new Error('供应商数据加载失败')
      setProviders(p.providers)
    }).catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoaded(true))
  }
  useEffect(() => { load() }, [refreshTick]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveCredential = async (value: string): Promise<void> => {
    const res = await fetch('/api/usage-stats/credentials', {
      method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ ref: 'SENSENOVA_API_KEY', value }),
    })
    const payload = await res.json()
    if (!res.ok || payload.ok !== true) throw new Error(payload?.message ?? `HTTP ${res.status}`)
    load()
  }

  const refreshAll = (): void => {
    setRefreshing(true); setError(null)
    Promise.all(providers.map(p => usageApi.account(p.id, true).catch(() => null)))
      .finally(() => { setRefreshing(false); load(); setRefreshKey(k => k + 1) })
  }

  const alertCount = providers.filter(p => p.status === 'critical' || p.status === 'warning').length
  const poolCount = providers.filter(p => p.adapter === 'sensenova-token-plan').length
  const configuredCount = providers.filter(p => p.configured).length

  if (error) {
    return <ErrorCard message={error} onRetry={load} />
  }

  const toggleStat = (key: string): void => { setOpenStat(v => v === key ? null : key) }

  return (
    <>
      {/* ── 统计行 ── */}
      <div className={css.statsRow}>
        <HubStat
          tone="blue"
          icon={walletIcon(18)}
          label="供应商"
          value={loaded ? String(providers.length) : '—'}
          desc={loaded ? `${providers.length} 个已接入的账户/订阅` : '加载中…'}
          open={openStat === 'total'}
          onToggle={() => { toggleStat('total') }}
          delay={0}
        />
        <HubStat
          tone="violet"
          icon={tokensIcon(18)}
          label="积分池"
          value={loaded ? String(poolCount) : '—'}
          desc="SenseNova 积分制账户池"
          open={openStat === 'pool'}
          onToggle={() => { toggleStat('pool') }}
          delay={40}
        />
        <HubStat
          tone="orange"
          icon={hitIcon(18)}
          label="告警"
          value={loaded ? String(alertCount) : '—'}
          valueWarn={alertCount > 0}
          desc={alertCount > 0 ? `${alertCount} 个账户处于警告/紧急状态` : '全部账户状态正常'}
          open={openStat === 'alert'}
          onToggle={() => { toggleStat('alert') }}
          delay={80}
        />
        <HubStat
          tone="green"
          icon={modelsIcon(18)}
          label="已配置"
          value={loaded ? String(configuredCount) : '—'}
          desc={`${configuredCount} 个账户已配置凭据/订阅`}
          open={openStat === 'configured'}
          onToggle={() => { toggleStat('configured') }}
          delay={120}
        />
      </div>

      {openStat !== null && (
        <HubStatDetail
          title={`${openStat === 'total' ? '供应商' : openStat === 'pool' ? '积分池' : openStat === 'alert' ? '告警' : '已配置'} · 余额/配额`}
          rows={openStat === 'total'
            ? (loaded ? providers.map(p => ({ label: p.displayName, value: p.status })) : [{ label: '…', value: '加载中' }])
            : [
              { label: '积分制', value: String(poolCount) },
              { label: '订阅制', value: String(providers.filter(p => p.accountMode === 'subscription').length) },
              { label: '余额制', value: String(providers.filter(p => p.accountMode === 'balance').length) },
            ]}
        />
      )}

      {/* ── 工具栏：全部刷新 ── */}
      <div className={css.toolbar}>
        <span className={css.toolbarMeta}>余额与配额快照，可单卡或全部刷新</span>
        <span className={css.toolbarSpacer} />
        <button type="button" className={css.toolButton} onClick={refreshAll} disabled={refreshing || providers.length === 0}>
          <svg className={refreshing ? 'dsh-acc-spin' : undefined} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3.2h-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {refreshing ? '刷新中' : '全部刷新'}
        </button>
      </div>

      <div className={`${css.mainScroll} ${modalStaggerClass}`}>
        <HubSection title="供应商余额与配额" meta={loaded ? `最后更新 ${(() => {
          const ts = Math.max(...providers.map(p => p.fetchedAt ?? 0), 0)
          return ts > 0 ? new Date(ts).toLocaleTimeString() : '—'
        })()}` : undefined}>
          {!loaded ? (
            <div className="dsh-acc-grid">
              {[0, 1, 2, 3].map(i => <div key={i} className="dsh-acc-skel" />)}
            </div>
          ) : providers.length === 0 ? (
            <div className={css.empty}>
              暂无可展示的余额/订阅数据。配置供应商凭据或产生用量后，这里会出现对应的余额与配额卡片。
            </div>
          ) : (
            <div className="dsh-acc-grid">
              {providers.map((p, i) => (
                <ProviderGroup
                  key={p.id}
                  provider={p}
                  onRequireCredential={setCredentialFor}
                  refreshKey={refreshKey}
                  index={i}
                />
              ))}
            </div>
          )}
        </HubSection>
      </div>

      {credentialFor !== null && (
        <CredentialModal providerName={providers.find(p => p.id === credentialFor)?.displayName ?? credentialFor}
          onClose={() => setCredentialFor(null)} onSave={saveCredential} />
      )}
    </>
  )
}
