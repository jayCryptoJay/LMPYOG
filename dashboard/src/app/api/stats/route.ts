import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PATHS } from '@/lib/paths'
import { currentWeekNumber } from '@/lib/utils'
import type { Stats } from '@/lib/types'

function countMdFiles(dir: string): number {
  if (!fs.existsSync(dir)) return 0
  return fs.readdirSync(dir).filter(f => f.endsWith('.md')).length
}

function countMdFilesByStatus(dir: string, statuses: string[]): number {
  if (!fs.existsSync(dir)) return 0
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .filter(f => {
      try {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
        const { data } = matter(raw)
        return statuses.includes(data.status as string)
      } catch { return false }
    }).length
}

function countPublishedThisMonth(dir: string): number {
  if (!fs.existsSync(dir)) return 0
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .filter(f => {
      try {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
        const { data } = matter(raw)
        return data.created && String(data.created).startsWith(thisMonth)
      } catch { return false }
    }).length
}

function countShippedThisWeek(): number {
  const dirs = [PATHS.scriptsFinal]
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  let count = 0
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue
    fs.readdirSync(dir).forEach(f => {
      if (!f.endsWith('.md')) return
      try {
        const stat = fs.statSync(path.join(dir, f))
        if (stat.mtime >= weekStart) count++
      } catch { /* skip */ }
    })
  }
  return count
}

export async function GET() {
  const stats: Stats = {
    storiesInVault: countMdFiles(PATHS.storyVault),
    scriptsInProgress: countMdFilesByStatus(PATHS.scriptsDrafts, ['Draft', 'Voice Checked']),
    readyToRecord: countMdFilesByStatus(PATHS.scriptsDrafts, ['Voice Checked']),
    publishedThisMonth: countPublishedThisMonth(PATHS.scriptsFinal),
    weekNumber: currentWeekNumber(),
    shippedThisWeek: countShippedThisWeek(),
  }
  return NextResponse.json(stats)
}
