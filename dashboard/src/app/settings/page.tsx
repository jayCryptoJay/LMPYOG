'use client'

import { useEffect, useState } from 'react'
import { FolderOpen, Mic, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface SettingsData {
  claudeMd: string
  voiceSamplesCount: number
  descriptionTemplate: string
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 text-dim text-sm">Loading…</div>
  if (!data) return <div className="p-8 text-dim text-sm">Could not load settings.</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-7">
        <h2 className="text-2xl font-black text-bone">Settings</h2>
        <p className="text-dim text-sm mt-1">Repo config and reference info</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card accent>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-dim uppercase tracking-widest">Voice Samples</span>
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Mic size={14} className="text-accent" />
            </div>
          </div>
          <p className="text-4xl font-black text-bone mt-3">{data.voiceSamplesCount}</p>
          <p className="text-dim text-xs mt-1 font-mono">in reference/voice-samples/</p>
        </Card>
        <Card accent>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold text-dim uppercase tracking-widest">Repo Root</span>
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <FolderOpen size={14} className="text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-bone font-mono text-sm">~/lmpyog</span>
          </div>
          <p className="text-dim text-xs mt-1 font-mono">parent of this dashboard</p>
        </Card>
      </div>

      {/* CLAUDE.md viewer */}
      <div className="bg-surface border border-edge rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-edge bg-ink">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-dim" />
            <span className="text-[10px] font-bold text-dim uppercase tracking-widest">CLAUDE.md</span>
          </div>
          <span className="text-zinc-700 text-[11px] font-mono">.claude/CLAUDE.md</span>
        </div>
        <pre className="text-bone font-mono text-xs p-5 overflow-x-auto whitespace-pre-wrap max-h-[600px] overflow-y-auto leading-relaxed text-dim">
          {data.claudeMd}
        </pre>
      </div>
    </div>
  )
}
