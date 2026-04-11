import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { PATHS } from '@/lib/paths'
import { readTextFile } from '@/lib/fs-utils'

export async function GET() {
  const skillsDir = PATHS.skills

  if (!fs.existsSync(skillsDir)) {
    return NextResponse.json([])
  }

  const skills: Array<{ name: string; description: string; hasSkillMd: boolean }> = []

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const skillMdPath = path.join(skillsDir, entry.name, 'SKILL.md')
    const hasSkillMd = fs.existsSync(skillMdPath)
    let description = ''

    if (hasSkillMd) {
      const content = readTextFile(skillMdPath) || ''
      const firstLine = content
        .split('\n')
        .find(l => l.trim() && !l.startsWith('#') && !l.startsWith('---'))
      description = firstLine?.trim() || ''
    }

    skills.push({ name: entry.name, description, hasSkillMd })
  }

  return NextResponse.json(skills)
}
