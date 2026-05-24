'use client'

import { useEffect, useState } from 'react'
import { adminFetchGuides, type GuideRow } from '@/lib/db'
import { GUIDES } from '@/data'
import GuideEditor from '../GuideEditor'

export default function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const [guide, setGuide] = useState<GuideRow | null | undefined>(undefined)

  useEffect(() => {
    params.then(({ id }) =>
      adminFetchGuides().then(guides => {
        let found: GuideRow | undefined = guides.find(g => g.id === id)
        if (!found) {
          const sg = GUIDES.find(g => g.id === id)
          if (sg) {
            found = {
              id: sg.id, title: sg.title, mins: sg.mins, area: sg.area,
              body: sg.body, steps: sg.steps ?? [], warnings: sg.warnings ?? [],
              cover_url: null, status: 'published', sort_order: 0,
              created_at: '', updated_at: '',
            }
          }
        }
        setGuide(found ?? null)
      })
    )
  }, [params])

  if (guide === undefined) return <div style={{ color: 'var(--muted)', fontSize: 14 }}>Loading…</div>
  if (guide === null) return <div style={{ color: 'var(--brand)' }}>Guide not found.</div>
  return <GuideEditor initial={guide}/>
}
