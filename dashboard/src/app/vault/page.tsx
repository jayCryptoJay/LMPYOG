'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { heatDots } from '@/lib/utils'
import { PILLAR_COLORS, STATUS_COLORS, RISK_COLORS } from '@/lib/types'
import type { Story } from '@/lib/types'

export default function VaultPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stories')
      .then(r => r.json())
      .then(data => { setStories(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleNew() {
    const title = prompt('Story title:')
    if (!title) return
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const story = await res.json()
    window.location.href = `/vault/${story.slug}`
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-bone">Story Vault</h2>
          <p className="text-dim text-sm mt-1">{stories.length} stories across all stages</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} strokeWidth={2.5} />
          New Story
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-dim text-sm">
          <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
          Loading…
        </div>
      )}

      {!loading && stories.length === 0 && (
        <Card className="text-center py-16">
          <p className="text-dim text-sm">No stories yet. Drop one in.</p>
        </Card>
      )}

      <div className="space-y-2">
        {stories.map(story => (
          <Link key={story.slug} href={`/vault/${story.slug}`}>
            <Card className="hover:border-zinc-700 hover:bg-edge transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-bone font-semibold text-sm truncate group-hover:text-white transition-colors">
                    {story.title}
                  </p>
                  {story.angle && (
                    <p className="text-dim text-xs mt-0.5 truncate">{story.angle}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <Badge className={PILLAR_COLORS[story.pillar]}>{story.pillar}</Badge>
                    <Badge className={STATUS_COLORS[story.status]}>{story.status}</Badge>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-dim">
                      <Flame size={10} className={story.heat >= 8 ? 'text-accent' : 'text-dim'} />
                      {story.heat}/10
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge className={RISK_COLORS[story.demon_risk]}>
                    {story.demon_risk === 'green' ? '● safe' : story.demon_risk === 'yellow' ? '● caution' : '● risk'}
                  </Badge>
                  <span className="text-dim text-[11px] font-mono">{story.created}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
