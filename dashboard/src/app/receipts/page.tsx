'use client'

import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface ReceiptEntry {
  filename: string
  type: string
  path: string
  created: string
  sizeMb: string
}

const TYPE_COLORS: Record<string, string> = {
  FARA:       'bg-purple-950 text-purple-300 border border-purple-800/60',
  Court:      'bg-red-950 text-red-300 border border-red-800/60',
  FEC:        'bg-blue-950 text-blue-300 border border-blue-800/60',
  SEC:        'bg-cyan-950 text-cyan-300 border border-cyan-800/60',
  FOIA:       'bg-orange-950 text-orange-300 border border-orange-800/60',
  '990':      'bg-yellow-950 text-yellow-300 border border-yellow-800/60',
  USASpending:'bg-green-950 text-green-300 border border-green-800/60',
  Congress:   'bg-indigo-950 text-indigo-300 border border-indigo-800/60',
  Other:      'bg-zinc-900 text-zinc-400 border border-zinc-700',
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/receipts')
      .then(r => r.json())
      .then(data => { setReceipts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const types = ['all', ...Array.from(new Set(receipts.map(r => r.type)))]
  const filtered = filter === 'all' ? receipts : receipts.filter(r => r.type === filter)

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-7">
        <h2 className="text-2xl font-black text-bone">Receipts</h2>
        <p className="text-dim text-sm mt-1">{receipts.length} primary source documents</p>
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === t
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'bg-surface text-dim border border-edge hover:border-zinc-600 hover:text-bone'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <div className="text-dim text-sm">Loading…</div>}

      {!loading && filtered.length === 0 && (
        <Card className="text-center py-16">
          <FileText size={32} className="text-dim mx-auto mb-3" strokeWidth={1} />
          <p className="text-dim text-sm">No receipts found.</p>
          <p className="text-zinc-700 text-xs mt-1 font-mono">
            Drop files into ~/lmpyog/research/primary-docs/[TYPE]/
          </p>
        </Card>
      )}

      <div className="space-y-2">
        {filtered.map((r, i) => (
          <Card key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Badge className={TYPE_COLORS[r.type] || 'bg-zinc-900 text-zinc-400 border border-zinc-700'}>
                {r.type}
              </Badge>
              <span className="text-bone text-sm truncate font-medium">{r.filename}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-dim text-xs font-mono">
              <span>{r.sizeMb} MB</span>
              <span>{r.created}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
