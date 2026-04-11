import { NextResponse } from 'next/server'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { readMarkdownDir, writeMarkdownFile } from '@/lib/fs-utils'
import { toSlug, today } from '@/lib/utils'
import type { Story } from '@/lib/types'

export async function GET() {
  const files = readMarkdownDir(PATHS.storyVault)
  const stories: Story[] = files.map(f => ({
    slug: f.slug,
    title: (f.data.title as string) || f.slug,
    pillar: (f.data.pillar as Story['pillar']) || "Didn't Tell You",
    heat: (f.data.heat as number) || 5,
    status: (f.data.status as Story['status']) || 'Raw',
    sources: (f.data.sources as string[]) || [],
    angle: (f.data.angle as string) || '',
    demon_risk: (f.data.demon_risk as Story['demon_risk']) || 'green',
    created: (f.data.created as string) || today(),
    content: f.content,
  }))
  return NextResponse.json(stories)
}

export async function POST(req: Request) {
  const body = await req.json()
  const slug = toSlug(body.title || 'untitled')
  const filePath = path.join(PATHS.storyVault, `${slug}.md`)
  const frontmatter = {
    title: body.title || 'Untitled Story',
    pillar: body.pillar || "Didn't Tell You",
    heat: body.heat || 5,
    status: body.status || 'Raw',
    sources: body.sources || [],
    angle: body.angle || '',
    demon_risk: body.demon_risk || 'green',
    created: today(),
  }
  writeMarkdownFile(filePath, frontmatter, body.content || '')
  return NextResponse.json({ slug, ...frontmatter, content: body.content || '' })
}
