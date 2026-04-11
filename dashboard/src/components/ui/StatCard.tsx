import { type LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: number | string
  sub?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ label, value, sub, icon: Icon }: StatCardProps) {
  return (
    <Card accent className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-dim text-xs font-semibold uppercase tracking-widest">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Icon size={15} className="text-accent" strokeWidth={2} />
        </div>
      </div>
      <div>
        <span className="text-4xl font-black text-bone leading-none">{value}</span>
        {sub && <p className="text-dim text-xs mt-1.5 font-medium">{sub}</p>}
      </div>
    </Card>
  )
}
