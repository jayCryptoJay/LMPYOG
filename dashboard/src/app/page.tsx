'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Archive, FileText, Mic, BookOpen, Send, Zap,
  Plus, TrendingUp, Clock, CheckCircle2, Radio,
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PILLAR_COLORS, STATUS_COLORS } from '@/lib/types'
import type { Stats, Story, StoryStatus } from '@/lib/types'

const PIPELINE_COLS: { status: StoryStatus; color: string }[] = [
  { status: 'Raw',         color: 'bg-zinc-700' },
  { status: 'Researching', color: 'bg-blue-500' },
  { status: 'Scripted',    color: 'bg-purple-500' },
  { status: 'Filmed',      color: 'bg-orange-500' },
  { status: 'Published',   color: 'bg-green-500' },
]

function PipelineColumn({ status, color, stories }: { status: StoryStatus; color: string; stories: Story[] }) {
  return (
    <div className="flex-none w-48 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-xs font-semibold text-dim uppercase tracking-wider">{status}</span>
        </div>
        <span className="text-[11px] font-mono bg-edge text-dim rounded-full px-2 py-0.5 font-semibold">
          {stories.length}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 min-h-[80px]">
        {stories.map(s => (
          <Link key={s.slug} href={`/vault/${s.slug}`}>
            <div className="bg-surface hover:bg-edge border border-edge hover:border-zinc-700 rounded-lg p-2.5 cursor-pointer transition-all group">
              <p className="text-bone text-xs font-medium leading-snug line-clamp-2 group-hover:text-white">
                {s.title}
              </p>
              <div className="mt-1.5">
                <Badge className={PILLAR_COLORS[s.pillar]}>
                  {s.pillar.split(' ')[0]}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
        {stories.length === 0 && (
          <div className="border border-dashed border-edge rounded-lg h-16 flex items-center justify-center">
            <span className="text-dim text-[11px]">empty</span>
          </div>
        )}
      </div>
    </div>
  )
}

const QUICK_ACTIONS = [
  { href: '/vault',    label: 'Story Vault',    desc: 'All ideas',       icon: Archive,       color: 'text-purple-400' },
  { href: '/scripts',  label: 'Scripts',        desc: 'Drafts & finals', icon: FileText,      color: 'text-blue-400' },
  { href: '/skills',   label: 'Skills Runner',  desc: 'Generate prompts',icon: Zap,           color: 'text-yellow-400' },
  { href: '/receipts', label: 'Receipts',       desc: 'Primary sources', icon: BookOpen,      color: 'text-green-400' },
  { href: '/publish',  label: 'Publishing',     desc: 'Final checklist', icon: Send,          color: 'text-accent' },
]

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    storiesInVault: 0, scriptsInProgress: 0, readyToRecord: 0,
    publishedThisMonth: 0, weekNumber: 0, shippedThisWeek: 0,
  })
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
    fetch('/api/stories').then(r => r.json()).then(setStories).catch(() => {})
  }, [])

  async function handleNewStory() {
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
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-dim uppercase tracking-widest">
              Week {stats.weekNumber}
            </span>
            {stats.shippedThisWeek > 0 && (
              <>
                <span className="text-edge">·</span>
                <span className="text-[11px] font-mono text-accent font-semibold">
                  {stats.shippedThisWeek} shipped this week
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-black text-bone">Good to have you back.</h2>
          <p className="text-dim text-sm mt-1">Here's where everything stands.</p>
        </div>
        <button
          onClick={handleNewStory}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={15} strokeWidth={2.5} />
          New Story
        </button>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="In the Vault"
          value={stats.storiesInVault}
          sub="total stories"
          icon={Archive}
        />
        <StatCard
          label="In Progress"
          value={stats.scriptsInProgress}
          sub="active drafts"
          icon={FileText}
        />
        <StatCard
          label="Ready to Record"
          value={stats.readyToRecord}
          sub="voice checked"
          icon={Mic}
        />
        <StatCard
          label="Published"
          value={stats.publishedThisMonth}
          sub="this month"
          icon={Radio}
        />
      </div>

      {/* Pipeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-bone uppercase tracking-widest">Pipeline</h2>
          <span className="text-dim text-xs font-mono">{stories.length} total stories</span>
        </div>
        <Card className="overflow-x-auto p-5">
          <div className="flex gap-4 pb-1" style={{ minWidth: 'max-content' }}>
            {PIPELINE_COLS.map(({ status, color }) => (
              <PipelineColumn
                key={status}
                status={status}
                color={color}
                stories={stories.filter(s => s.status === status)}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-bone uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 bg-surface hover:bg-edge border border-edge hover:border-zinc-700 rounded-xl p-4 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-ink border border-edge flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                <Icon size={17} className={color} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-bone text-sm font-semibold leading-tight">{label}</p>
                <p className="text-dim text-xs mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
