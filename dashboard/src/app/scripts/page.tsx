'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { RISK_COLORS } from '@/lib/types'
import type { Script } from '@/lib/types'

function runtimeLabel(wordCount: number): string {
  const mins = Math.round(wordCount / 140)
  return mins < 1 ? '<1 min' : `~${mins} min`
}

const FOLDER_TABS = ['drafts', 'final', 'templates'] as const
type FolderTab = typeof FOLDER_TABS[number]

const FOLDER_STYLES: Record<FolderTab, string> = {
  drafts:    'bg-zinc-900 text-zinc-300 border border-zinc-700',
  final:     'bg-green-950 text-green-300 border border-green-800/60',
  templates: 'bg-blue-950 text-blue-300 border border-blue-800/60',
}

export default function ScriptsPage() {
  const [folder, setFolder] = useState<FolderTab>('drafts')
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/scripts?folder=${folder}`)
      .then(r => r.json())
      .then(data => { setScripts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [folder])

  async function handleNew() {
    const title = prompt('Script title:')
    if (!title) return
    const res = await fetch('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, folder, from_template: true }),
    })
    const script = await res.json()
    window.location.href = `/scripts/${script.slug}?folder=${folder}`
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-2xl font-black text-bone">Scripts</h2>
          <p className="text-dim text-sm mt-1">{scripts.length} in {folder}</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} strokeWidth={2.5} />
          New Script
        </button>
      </div>

      {/* Folder tabs */}
      <div className="flex gap-2 mb-6">
        {FOLDER_TABS.map(f => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
              folder === f
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'bg-surface text-dim border border-edge hover:border-zinc-600 hover:text-bone'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <div className="text-dim text-sm">Loading…</div>}

      {!loading && scripts.length === 0 && (
        <Card className="text-center py-16">
          <p className="text-dim text-sm">No scripts in {folder}.</p>
        </Card>
      )}

      <div className="space-y-2">
        {scripts.map(script => (
          <Link key={script.slug} href={`/scripts/${script.slug}?folder=${folder}`}>
            <Card className="hover:border-zinc-700 hover:bg-edge transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-bone font-semibold text-sm truncate group-hover:text-white transition-colors">
                    {script.title}
                  </p>
                  {script.story && (
                    <p className="text-dim text-xs mt-0.5 truncate font-mono">↳ {script.story}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <Badge className={FOLDER_STYLES[script.folder]}>{script.folder}</Badge>
                    <Badge className="bg-zinc-900 text-zinc-400 border border-zinc-700">{script.status}</Badge>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-dim">
                      <Clock size={10} />
                      {runtimeLabel(script.word_count)} · {script.word_count}w
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge className={RISK_COLORS[script.demon_risk]}>
                    {script.demon_risk === 'green' ? '● safe' : script.demon_risk === 'yellow' ? '● caution' : '● risk'}
                  </Badge>
                  <span className="text-dim text-[11px] font-mono">{script.created}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
