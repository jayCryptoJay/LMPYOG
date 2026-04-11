'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Trash2, Save, ArrowLeft, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import {
  PILLARS, STORY_STATUSES, DEMON_RISKS, PILLAR_COLORS, STATUS_COLORS, RISK_COLORS,
} from '@/lib/types'
import type { Story } from '@/lib/types'

const labelCls = 'block text-[10px] font-bold text-dim uppercase tracking-widest mb-1.5'
const inputCls = 'w-full bg-ink text-bone text-sm rounded-lg border border-edge focus:border-accent outline-none px-3 py-2 transition-colors placeholder:text-zinc-700'
const selectCls = 'w-full bg-ink text-bone text-sm rounded-lg border border-edge focus:border-accent outline-none px-3 py-2 transition-colors'

export default function StoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sourcesText, setSourcesText] = useState('')

  useEffect(() => {
    fetch(`/api/stories/${slug}`)
      .then(r => r.json())
      .then(data => {
        setStory(data)
        setSourcesText((data.sources || []).join('\n'))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  async function handleSave() {
    if (!story) return
    setSaving(true)
    const sources = sourcesText.split('\n').map(s => s.trim()).filter(Boolean)
    await fetch(`/api/stories/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...story, sources }),
    })
    setSaving(false)
  }

  async function handleDelete() {
    if (!confirm('Delete this story? Cannot be undone.')) return
    await fetch(`/api/stories/${slug}`, { method: 'DELETE' })
    router.push('/vault')
  }

  if (loading) return <div className="p-8 text-dim text-sm">Loading…</div>
  if (!story) return <div className="p-8 text-dim text-sm">Story not found.</div>

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <button
          onClick={() => router.push('/vault')}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-edge text-dim hover:text-bone hover:border-zinc-600 transition-all"
        >
          <ArrowLeft size={15} />
        </button>
        <h2 className="text-lg font-bold text-bone flex-1 truncate">{story.title}</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Save size={13} />
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={handleDelete}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-edge text-dim hover:text-red-400 hover:border-red-900/60 hover:bg-red-950 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <Card>
          <label className={labelCls}>Title</label>
          <input
            className={inputCls}
            value={story.title}
            onChange={e => setStory({ ...story, title: e.target.value })}
          />
        </Card>

        {/* Pillar / Status / Risk */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <label className={labelCls}>Pillar</label>
            <select
              className={selectCls}
              value={story.pillar}
              onChange={e => setStory({ ...story, pillar: e.target.value as Story['pillar'] })}
            >
              {PILLARS.map(p => <option key={p}>{p}</option>)}
            </select>
            <div className="mt-2.5">
              <Badge className={PILLAR_COLORS[story.pillar]}>{story.pillar}</Badge>
            </div>
          </Card>

          <Card>
            <label className={labelCls}>Status</label>
            <select
              className={selectCls}
              value={story.status}
              onChange={e => setStory({ ...story, status: e.target.value as Story['status'] })}
            >
              {STORY_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="mt-2.5">
              <Badge className={STATUS_COLORS[story.status]}>{story.status}</Badge>
            </div>
          </Card>

          <Card>
            <label className={labelCls}>Demon Risk</label>
            <select
              className={selectCls}
              value={story.demon_risk}
              onChange={e => setStory({ ...story, demon_risk: e.target.value as Story['demon_risk'] })}
            >
              {DEMON_RISKS.map(r => <option key={r}>{r}</option>)}
            </select>
            <div className="mt-2.5">
              <Badge className={RISK_COLORS[story.demon_risk]}>
                {story.demon_risk === 'green' ? '● safe' : story.demon_risk === 'yellow' ? '● caution' : '● risk'}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Heat */}
        <Card>
          <label className={labelCls}>
            <span className="flex items-center gap-1.5">
              <Flame size={11} className={story.heat >= 7 ? 'text-accent' : 'text-dim'} />
              Heat — {story.heat}/10
            </span>
          </label>
          <input
            type="range" min={1} max={10} step={1}
            className="w-full accent-accent mt-1"
            value={story.heat}
            onChange={e => setStory({ ...story, heat: Number(e.target.value) })}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-dim font-mono">cold</span>
            <span className="text-[10px] text-dim font-mono">🔥 viral</span>
          </div>
        </Card>

        {/* Angle */}
        <Card>
          <label className={labelCls}>Angle</label>
          <input
            className={inputCls}
            value={story.angle}
            onChange={e => setStory({ ...story, angle: e.target.value })}
            placeholder="The angle you're taking on this story"
          />
        </Card>

        {/* Sources */}
        <Card>
          <label className={labelCls}>Sources (one per line)</label>
          <textarea
            className={`${inputCls} resize-y min-h-[80px] font-mono text-xs`}
            value={sourcesText}
            onChange={e => setSourcesText(e.target.value)}
            placeholder="https://fara.gov/...&#10;https://opensecrets.org/..."
          />
        </Card>

        {/* Notes */}
        <Card>
          <label className={labelCls}>Research Notes</label>
          <textarea
            className={`${inputCls} resize-y min-h-[220px] font-mono text-xs leading-relaxed`}
            value={story.content}
            onChange={e => setStory({ ...story, content: e.target.value })}
            placeholder="Key facts, receipts to pull, quotes, connections…"
          />
        </Card>

        <p className="text-zinc-700 text-xs font-mono pl-1">Created {story.created}</p>
      </div>
    </div>
  )
}
