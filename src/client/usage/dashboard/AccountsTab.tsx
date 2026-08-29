import { useEffect, useState, type CSSProperties } from 'react'
import { usageApi, type ProviderInfo } from './api'
import { ProviderGroup } from './primitives/ProviderGroup'
import { CredentialModal } from './primitives/CredentialModal'
import { ErrorCard } from './primitives/ErrorCard'
import { ensureAccountsStyles } from './primitives/accounts-sheet'

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

  if (error) {
    return <ErrorCard message={error} onRetry={load} />
  }

  const headStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12,
  }
  const titleStyle: CSSProperties = {
    fontSize: 15, fontWeight: 600, color: 'var(--dsw-alias-label-primary)',
  }
  const chipStyle = (color: string, bg: string): CSSProperties => ({
    fontSize: 11, lineHeight: '20px', borderRadius: 6, padding: '0 8px', color, background: bg, flex: 'none',
  })
  const refreshStyle: CSSProperties = {
    marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
    padding: '4px 12px', fontSize: 12, border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 8,
    background: 'transparent', color: 'var(--dsw-alias-label-primary)', cursor: refreshing ? 'default' : 'pointer',
    transition: 'border-color .18s cubic-bezier(.2,.8,.2,1), color .18s cubic-bezier(.2,.8,.2,1)',
  }

  return (
    <div>
      <div style={headStyle}>
        <span style={titleStyle}>余额/配额</span>
        {loaded && providers.length > 0 && (
          <>
            <span style={chipStyle('var(--dsw-alias-label-secondary)', 'var(--dsw-alias-interactive-bg-hover)')}>
              {providers.length} 个供应商
            </span>
            {poolCount > 0 && (
              <span style={chipStyle('var(--dsw-alias-state-business-primary)', 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)')}>
                {poolCount} 个积分制
              </span>
            )}
            {alertCount > 0 && (
              <span style={chipStyle('var(--dsw-alias-state-warn-primary)', 'color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent)')}>
                {alertCount} 个告警
              </span>
            )}
          </>
        )}
        <button type="button" onClick={refreshAll} disabled={refreshing || providers.length === 0} style={refreshStyle}>
          <svg className={refreshing ? 'dsh-acc-spin' : undefined} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3.2h-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {refreshing ? '刷新中' : '全部刷新'}
        </button>
      </div>

      {!loaded ? (
        <div className="dsh-acc-grid">
          {[0, 1, 2, 3].map(i => <div key={i} className="dsh-acc-skel" />)}
        </div>
      ) : providers.length === 0 ? (
        <div style={{ border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 14, background: 'var(--dsw-alias-bg-layer-2)', padding: '44px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dsw-alias-label-primary)', marginBottom: 6 }}>暂无可展示的余额/订阅数据</div>
          <div style={{ fontSize: 12, color: 'var(--dsw-alias-label-tertiary)', lineHeight: 20 }}>配置供应商凭据或产生用量后，这里会出现对应的余额与配额卡片。</div>
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

      {credentialFor !== null && (
        <CredentialModal providerName={providers.find(p => p.id === credentialFor)?.displayName ?? credentialFor}
          onClose={() => setCredentialFor(null)} onSave={saveCredential} />
      )}
    </div>
  )
}
