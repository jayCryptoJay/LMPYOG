import { NextResponse } from 'next/server'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { readMarkdownFile, writeMarkdownFile, fileExists } from '@/lib/fs-utils'
import { today, wordCount } from '@/lib/utils'
import type { Script } from '@/lib/types'

const FOLDERS = [
  { key: 'drafts' as const, dir: PATHS.scriptsDrafts },
  { key: 'final' as const, dir: PATHS.scriptsFinal },
  { key: 'templates' as const, dir: PATHS.scriptsTemplates },
]

function findScript(slug: string): { file: ReturnType<typeof readMarkdownFile>; folder: Script['folder']; filePath: string } | null {
  for (const { key, dir } of FOLDERS) {
    const filePath = path.join(dir, `${slug}.md`)
    if (fileExists(filePath)) {
      const file = readMarkdownFile(filePath)
      return { file, folder: key, filePath }
    }
  }
  return null
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const result = findScript(params.slug)
  if (!result || !result.file) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const { file, folder } = result
  const wc = wordCount(file.content)
  const script: Script = {
    slug: params.slug,
    title: (file.data.title as string) || params.slug,
    story: (file.data.story as string) || '',
    status: (file.data.status as Script['status']) || 'Draft',
    word_count: wc,
    demon_risk: (file.data.demon_risk as Script['demon_risk']) || 'green',
    created: (file.data.created as string) || today(),
    content: file.content,
    folder,
  }
  return NextResponse.json(script)
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json()
  const result = findScript(params.slug)
  if (!result) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const frontmatter = {
    title: body.title || params.slug,
    story: body.story || '',
    status: body.status || 'Draft',
    demon_risk: body.demon_risk || 'green',
    created: result.file?.data.created || today(),
  }
  writeMarkdownFile(result.filePath, frontmatter, body.content || '')
  return NextResponse.json({ slug: params.slug, ...frontmatter, content: body.content || '', folder: result.folder })
}
