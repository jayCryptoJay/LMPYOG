'use client'

import { useEffect, useState } from 'react'
import { ClipboardCopy, Check, CheckCircle2, Circle, Send } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Script } from '@/lib/types'

interface PublishScript extends Script {
  checked: {
    scriptLocked: boolean
    thumbnailReady: boolean
    descriptionWritten: boolean
  }
}

const CHECK_LABELS: Record<keyof PublishScript['checked'], string> = {
  scriptLocked:       'Script locked',
  thumbnailReady:     'Thumbnail ready',
  descriptionWritten: 'Description written',
}

const DESC_TEMPLATE = (title: string) => `🔍 ${title}

They don't want you to see this. Here's what the documents actually say.

SOURCES USED IN THIS VIDEO:
- [source 1]
- [source 2]

FOLLOW US:
Twitter/X: @LMPYOG
YouTube: youtube.com/@LMPYOG

TIMESTAMPS:
00:00 — Hook
00:15 — Stakes
00:45 — The Receipts
06:00 — What It Means
09:00 — Subscribe

#MediaExposed #FakeNews #Receipts #LMPYOG #Conservative #News`

export default function PublishPage() {
  const [scripts, setScripts] = useState<PublishScript[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/scripts?folder=final')
      .then(r => r.json())
      .then((data: Script[]) => {
        const withChecks: PublishScript[] = data.map(s => ({
          ...s,
          checked: {
            scriptLocked: s.status === 'Final',
            thumbnailReady: false,
            descriptionWritten: false,
          },
        }))
        setScripts(withChecks)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function toggleCheck(slug: string, key: keyof PublishScript['checked']) {
    setScripts(prev =>
      prev.map(s =>
        s.slug === slug ? { ...s, checked: { ...s.checked, [key]: !s.checked[key] } } : s
      )
    )
  }

  async function copyDescription(title: string, slug: string) {
    await navigator.clipboard.writeText(DESC_TEMPLATE(title))
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) return <div className="p-8 text-dim text-sm">Loading…</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-7">
        <h2 className="text-2xl font-black text-bone">Publishing Queue</h2>
        <p className="text-dim text-sm mt-1">{scripts.length} final scripts ready to review</p>
      </div>

      {scripts.length === 0 && (
        <Card className="text-center py-16">
          <Send size={32} className="text-dim mx-auto mb-3" strokeWidth={1} />
          <p className="text-dim text-sm">No final scripts yet.</p>
          <p className="text-zinc-700 text-xs mt-1 font-mono">Move a script to /final to see it here.</p>
        </Card>
      )}

      <div className="space-y-4">
        {scripts.map(script => {
          const doneCount = Object.values(script.checked).filter(Boolean).length
          const allDone = doneCount === 3
          return (
            <Card
              key={script.slug}
              className={`transition-all ${allDone ? 'border-l-2 border-l-green-500' : ''}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-bone font-semibold text-sm">{script.title}</p>
                  <p className="text-dim text-xs font-mono mt-0.5">
                    {script.word_count} words · {script.created}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {allDone && (
                    <Badge className="bg-green-950 text-green-300 border border-green-800/60">
                      ● Ready to publish
                    </Badge>
                  )}
                  <span className="text-dim text-xs font-mono">{doneCount}/3</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-edge rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-green-500' : 'bg-accent'}`}
                  style={{ width: `${(doneCount / 3) * 100}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="flex flex-wrap gap-3 mb-4">
                {(Object.keys(script.checked) as (keyof typeof script.checked)[]).map(key => (
                  <button
                    key={key}
                    onClick={() => toggleCheck(script.slug, key)}
                    className="flex items-center gap-2 text-xs font-medium transition-colors"
                  >
                    {script.checked[key]
                      ? <CheckCircle2 size={15} className="text-green-400" />
                      : <Circle size={15} className="text-dim" />
                    }
                    <span className={script.checked[key] ? 'text-bone' : 'text-dim'}>
                      {CHECK_LABELS[key]}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyDescription(script.title, script.slug)}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-edge border border-edge hover:border-zinc-600 text-dim hover:text-bone text-xs font-semibold rounded-lg transition-all"
              >
                {copied === script.slug ? <Check size={12} className="text-green-400" /> : <ClipboardCopy size={12} />}
                {copied === script.slug ? 'Copied!' : 'Copy description template'}
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
