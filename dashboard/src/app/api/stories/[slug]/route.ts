import { NextResponse } from 'next/server'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { readMarkdownFile, writeMarkdownFile, deleteFile } from '@/lib/fs-utils'
import type { Story } from '@/lib/types'

type Params = { params: { slug: string } }

export async function GET(_req: Request, { params }: Params) {
  const filePath = path.join(PATHS.storyVault, `${params.slug}.md`)
  const file = readMarkdownFile(filePath)
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const story: Story = {
    slug: params.slug,
    title: (file.data.title as string) || params.slug,
    pillar: file.data.pillar as Story['pillar'],
    heat: (file.data.heat as number) || 5,
    status: (file.data.status as Story['status']) || 'Raw',
    sources: (file.data.sources as string[]) || [],
    angle: (file.data.angle as string) || '',
    demon_risk: (file.data.demon_risk as Story['demon_risk']) || 'green',
    created: (file.data.created as string) || '',
    content: file.content,
  }
  return NextResponse.json(story)
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const filePath = path.join(PATHS.storyVault, `${params.slug}.md`)
  const frontmatter = {
    title: body.title,
    pillar: body.pillar,
    heat: body.heat,
    status: body.status,
    sources: body.sources || [],
    angle: body.angle || '',
    demon_risk: body.demon_risk,
    created: body.created,
  }
  writeMarkdownFile(filePath, frontmatter, body.content || '')
  return NextResponse.json({ slug: params.slug, ...frontmatter, content: body.content || '' })
}

export async function DELETE(_req: Request, { params }: Params) {
  const filePath = path.join(PATHS.storyVault, `${params.slug}.md`)
  deleteFile(filePath)
  return NextResponse.json({ ok: true })
}
