'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { RISK_COLORS, SCRIPT_STATUSES, DEMON_RISKS } from '@/lib/types'
import type { Script } from '@/lib/types'
import { wordCount } from '@/lib/utils'

function runtimeLabel(wc: number): string {
  const mins = Math.round(wc / 140)
  return mins < 1 ? '<1 min' : `~${mins} min`
}

const labelCls = 'block text-[10px] font-bold text-dim uppercase tracking-widest mb-1.5'
const selectCls = 'w-full bg-ink text-bone text-sm rounded-lg border border-edge focus:border-accent outline-none px-3 py-2 transition-colors'
const inputCls = 'w-full bg-ink text-bone text-sm rounded-lg border border-edge focus:border-accent outline-none px-3 py-2 transition-colors placeholder:text-zinc-700'

export default function ScriptDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [script, setScript] = useState<Script | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [liveWc, setLiveWc] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetch(`/api/scripts/${slug}`)
      .then(r => r.json())
      .then((s: Script) => {
        setScript(s)
        setLiveWc(s.word_count)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  async function handleSave() {
    if (!script) return
    setSaving(true)
    await fetch(`/api/scripts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: script.title,
        story: script.story,
        status: script.status,
        demon_risk: script.demon_risk,
        content: script.content,
      }),
    })
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-dim text-sm">Loading…</div>
  if (!script) return <div className="p-8 text-dim text-sm">Script not found.</div>

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push('/scripts')}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-edge text-dim hover:text-bone hover:border-zinc-600 transition-all"
        >
          <ArrowLeft size={15} />
        </button>
        <h2 className="text-lg font-bold text-bone flex-1 truncate">{script.title}</h2>
        <div className="flex items-center gap-2 text-dim text-xs font-mono">
          <Clock size={12} />
          <span>{liveWc}w · {runtimeLabel(liveWc)}</span>
          <Badge className={RISK_COLORS[script.demon_risk]}>{script.demon_risk}</Badge>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Save size={13} />
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-surface border border-edge rounded-xl p-3">
          <label className={labelCls}>Status</label>
          <select className={selectCls} value={script.status}
            onChange={e => setScript({ ...script, status: e.target.value as Script['status'] })}>
            {SCRIPT_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="bg-surface border border-edge rounded-xl p-3">
          <label className={labelCls}>Demon Risk</label>
          <select className={selectCls} value={script.demon_risk}
            onChange={e => setScript({ ...script, demon_risk: e.target.value as Script['demon_risk'] })}>
            {DEMON_RISKS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="bg-surface border border-edge rounded-xl p-3">
          <label className={labelCls}>Linked Story</label>
          <input className={inputCls} value={script.story}
            onChange={e => setScript({ ...script, story: e.target.value })}
            placeholder="story-slug" />
        </div>
      </div>

      {/* Script body */}
      <div className="bg-surface border border-edge rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-edge bg-ink">
          <span className="text-[10px] font-bold text-dim uppercase tracking-widest">Script Content</span>
          <span className="text-dim text-[11px] font-mono">{script.created}</span>
        </div>
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent text-bone font-mono text-sm outline-none resize-none p-5 min-h-[600px] leading-relaxed"
          value={script.content}
          onChange={e => {
            setScript({ ...script, content: e.target.value })
            setLiveWc(wordCount(e.target.value))
          }}
          placeholder="Script content goes here…"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
