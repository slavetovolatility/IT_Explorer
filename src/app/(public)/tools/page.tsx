import { TOURIST_TOOLS } from '@/data'
import { ToolCard } from '@/app/(public)/page'

export default function ToolsPage() {
  return (
    <main className="route-mount">
      <section className="wrap" style={{ padding: '32px 0 24px' }}>
        <div className="mono">Built for everyday Thailand</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Tourist tools</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, marginTop: 10 }}>
          Small utilities for the stuff travel guides never quite cover — scams, prices, transit, emergencies, the local SIM.
        </p>
      </section>
      <section className="wrap" style={{ marginBottom: 56 }}>
        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {TOURIST_TOOLS.map(t => <ToolCard key={t.id} tool={t}/>)}
        </div>
      </section>
    </main>
  )
}
