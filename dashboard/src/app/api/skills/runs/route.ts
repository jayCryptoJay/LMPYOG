import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { PATHS } from '@/lib/paths'
import { readJsonFile, writeJsonFile, readTextFile } from '@/lib/fs-utils'
import { generateId } from '@/lib/utils'
import type { SkillRun } from '@/lib/types'

export async function GET() {
  const runs = readJsonFile<SkillRun[]>(PATHS.runsFile, [])
  return NextResponse.json([...runs].reverse().slice(0, 100))
}

export async function POST(req: Request) {
  const body = await req.json()
  const { skill, inputs } = body as { skill: string; inputs: Record<string, string> }

  if (!skill) {
    return NextResponse.json({ error: 'skill required' }, { status: 400 })
  }

  const skillMdPath = path.join(PATHS.skills, skill, 'SKILL.md')
  if (!fs.existsSync(skillMdPath)) {
    return NextResponse.json({ error: 'SKILL.md not found' }, { status: 404 })
  }

  const skillContent = readTextFile(skillMdPath) || ''

  // Build the invocation string from inputs
  const inputLines = Object.entries(inputs || {})
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const prompt = `Run the ${skill} skill for the LMPYOG channel.\n\n${inputLines ? `## Inputs\n${inputLines}\n\n` : ''}## Skill Definition\n\n${skillContent}`

  const run: SkillRun = {
    id: generateId(),
    skill,
    input: inputLines || '(no inputs)',
    prompt,
    timestamp: new Date().toISOString(),
  }

  const runs = readJsonFile<SkillRun[]>(PATHS.runsFile, [])
  runs.push(run)
  writeJsonFile(PATHS.runsFile, runs)

  return NextResponse.json(run)
}
