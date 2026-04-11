'use client'

import { useEffect, useState } from 'react'
import { ClipboardCopy, Check, Play, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { SkillRun } from '@/lib/types'

interface SkillEntry {
  name: string
  description: string
  hasSkillMd: boolean
}

const SKILL_INPUTS: Record<string, { key: string; label: string; required: boolean; placeholder: string }[]> = {
  'research-brief': [
    { key: 'topic', label: 'Topic', required: true, placeholder: 'Story idea, news link, or URL' },
    { key: 'pillar', label: 'Pillar (optional)', required: false, placeholder: "Follow the Money, Didn't Tell You, Caught Lacking…" },
    { key: 'angle_priority', label: 'Angle Priority (optional)', required: false, placeholder: '"money", "hypocrisy", or "buried"' },
  ],
  'script-draft': [
    { key: 'brief_path', label: 'Brief File', required: true, placeholder: 'research/weekly-briefs/YYYY-MM-DD-slug.md' },
    { key: 'angle', label: 'Angle', required: true, placeholder: 'A, B, or C' },
    { key: 'pillar', label: 'Pillar', required: true, placeholder: 'Follow the Money, Receipts…' },
    { key: 'target_runtime', label: 'Target Runtime (optional)', required: false, placeholder: '9–12 min' },
    { key: 'style_notes', label: 'Style Notes (optional)', required: false, placeholder: 'Any tone direction…' },
  ],
  'voice-check': [
    { key: 'script_path', label: 'Script File', required: true, placeholder: 'scripts/drafts/YYYY-MM-DD-slug.md' },
    { key: 'focus_sections', label: 'Focus Sections (optional)', required: false, placeholder: 'hook, punchline, all…' },
    { key: 'intensity', label: 'Intensity (optional)', required: false, placeholder: '"light" or "full" (default: full)' },
    { key: 'specific_notes', label: 'Specific Notes (optional)', required: false, placeholder: 'The stakes feel passive…' },
  ],
  'receipts-pull': [
    { key: 'story_path', label: 'Story File', required: true, placeholder: 'research/story-vault/slug.md' },
    { key: 'claims', label: 'Claims to Verify (optional)', required: false, placeholder: 'Specific claims that need receipts' },
  ],
  'thumbnail-brief': [
    { key: 'script_path', label: 'Script File', required: true, placeholder: 'scripts/final/YYYY-MM-DD-slug.md' },
    { key: 'style_notes', label: 'Style Notes (optional)', required: false, placeholder: 'Any visual direction…' },
  ],
}

function RunModal({ skill, onClose, onDone }: {
  skill: SkillEntry
  onClose: () => void
  onDone: (run: SkillRun) => void
}) {
  const fields = SKILL_INPUTS[skill.name] || [
    { key: 'input', label: 'Input', required: false, placeholder: 'Describe what you want…' },
  ]
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.key, '']))
  )
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<SkillRun | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleRun() {
    setRunning(true)
    const res = await fetch('/api/skills/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: skill.name, inputs: values }),
    })
    const run: SkillRun = await res.json()
    setResult(run)
    setRunning(false)
    onDone(run)
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div>
            <span className="text-bone font-mono font-semibold text-sm">{skill.name}</span>
            <p className="text-zinc-500 text-xs font-mono mt-0.5">{skill.description}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-bone transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!result ? (
            <div className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="text-zinc-400 text-xs font-mono uppercase tracking-widest block mb-1">
                    {field.label}
                    {field.required && <span className="text-accent ml-1">*</span>}
                  </label>
                  <input
                    className="w-full bg-zinc-800 text-bone font-mono text-sm rounded border border-zinc-700 focus:border-accent outline-none px-3 py-2 transition-colors"
                    placeholder={field.placeholder}
                    value={values[field.key]}
                    onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-2">Generated Prompt</p>
              <pre className="bg-zinc-950 border border-zinc-800 rounded p-4 text-bone font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {result.prompt}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-800">
          {!result ? (
            <>
              <button onClick={onClose} className="text-zinc-500 hover:text-bone text-sm font-mono transition-colors">
                Cancel
              </button>
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm font-mono rounded transition-colors"
              >
                <Play size={13} />
                {running ? 'Generating…' : 'Generate Prompt'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setResult(null)}
                className="text-zinc-500 hover:text-bone text-sm font-mono transition-colors"
              >
                Edit Inputs
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-bone text-sm font-mono transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-bone text-sm font-mono rounded transition-colors"
                >
                  {copied ? <Check size={13} /> : <ClipboardCopy size={13} />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([])
  const [runs, setRuns] = useState<SkillRun[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSkill, setActiveSkill] = useState<SkillEntry | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/skills').then(r => r.json()),
      fetch('/api/skills/runs').then(r => r.json()),
    ]).then(([s, r]) => {
      setSkills(s)
      setRuns(r)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function lastRunForSkill(skillName: string): SkillRun | undefined {
    return runs.find(r => r.skill === skillName)
  }

  function handleRunDone(run: SkillRun) {
    setRuns(prev => [run, ...prev])
  }

  if (loading) return <div className="p-8 text-zinc-500 font-mono text-sm">Loading...</div>

  return (
    <div className="p-8">
      {activeSkill && (
        <RunModal
          skill={activeSkill}
          onClose={() => setActiveSkill(null)}
          onDone={handleRunDone}
        />
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bone font-mono">Skills</h1>
        <p className="text-zinc-500 text-sm font-mono mt-1">{skills.length} skills — click to generate a prompt</p>
      </div>

      {skills.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-zinc-500 font-mono text-sm">No skills found in ~/lmpyog/skills/</p>
        </Card>
      )}

      <div className="space-y-2">
        {skills.map(skill => {
          const lastRun = lastRunForSkill(skill.name)
          return (
            <Card
              key={skill.name}
              className="flex items-start justify-between gap-4 hover:border-zinc-600 cursor-pointer transition-colors"
              onClick={() => setActiveSkill(skill)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-bone font-mono font-medium text-sm">{skill.name}</span>
                  {skill.hasSkillMd && (
                    <Badge className="bg-zinc-800 text-zinc-400">SKILL.md</Badge>
                  )}
                </div>
                {skill.description && (
                  <p className="text-zinc-500 text-xs font-mono">{skill.description}</p>
                )}
                {lastRun && (
                  <p className="text-zinc-600 text-xs font-mono mt-1">
                    Last run: {lastRun.timestamp.split('T')[0]} — {lastRun.input.slice(0, 80)}
                    {lastRun.input.length > 80 ? '…' : ''}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {lastRun ? (
                  <Badge className="bg-green-900/50 text-green-400">ran</Badge>
                ) : (
                  <Badge className="bg-zinc-800 text-zinc-600">never run</Badge>
                )}
                <button
                  onClick={e => { e.stopPropagation(); setActiveSkill(skill) }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 text-xs font-mono rounded transition-colors"
                >
                  <Play size={11} />
                  Run
                </button>
              </div>
            </Card>
          )
        })}
      </div>

      {runs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Recent Runs</h2>
          <div className="space-y-2">
            {runs.slice(0, 20).map(run => (
              <Card key={run.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-zinc-800 text-zinc-300">{run.skill}</Badge>
                    <span className="text-zinc-400 text-xs font-mono truncate">{run.input}</span>
                  </div>
                </div>
                <span className="text-zinc-600 text-xs font-mono shrink-0">{run.timestamp.split('T')[0]}</span>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
