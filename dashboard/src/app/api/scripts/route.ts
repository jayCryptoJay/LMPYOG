import { NextResponse } from 'next/server'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { readMarkdownDir, writeMarkdownFile, readTextFile } from '@/lib/fs-utils'
import { toSlug, today, wordCount } from '@/lib/utils'
import type { Script } from '@/lib/types'

function mapFolder(folder: string): Script['folder'] {
  if (folder === 'final') return 'final'
  if (folder === 'templates') return 'templates'
  return 'drafts'
}

function folderPath(folder: string): string {
  if (folder === 'final') return PATHS.scriptsFinal
  if (folder === 'templates') return PATHS.scriptsTemplates
  return PATHS.scriptsDrafts
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const folder = searchParams.get('folder') || 'drafts'
  const dir = folderPath(folder)
  const files = readMarkdownDir(dir)
  const scripts: Script[] = files.map(f => {
    const wc = wordCount(f.content)
    return {
      slug: f.slug,
      title: (f.data.title as string) || f.slug,
      story: (f.data.story as string) || '',
      status: (f.data.status as Script['status']) || 'Draft',
      word_count: wc,
      demon_risk: (f.data.demon_risk as Script['demon_risk']) || 'green',
      created: (f.data.created as string) || today(),
      content: f.content,
      folder: mapFolder(folder),
    }
  })
  return NextResponse.json(scripts)
}

export async function POST(req: Request) {
  const body = await req.json()
  const folder = body.folder || 'drafts'
  const slug = toSlug(body.title || 'untitled-script')
  const dir = folderPath(folder)

  // If creating from anchor template, load the template content
  let content = body.content || ''
  if (!content && body.from_template) {
    const tmpl = readTextFile(PATHS.anchorTemplate)
    content = tmpl
      ? `<!-- Script: ${body.title} -->\n<!-- Story: ${body.story || ''} -->\n\n${tmpl}`
      : ''
  }

  const frontmatter = {
    title: body.title || 'Untitled Script',
    story: body.story || '',
    status: 'Draft',
    demon_risk: body.demon_risk || 'green',
    created: today(),
  }
  const filePath = path.join(dir, `${slug}.md`)
  writeMarkdownFile(filePath, frontmatter, content)
  return NextResponse.json({ slug, ...frontmatter, content, word_count: wordCount(content), folder: mapFolder(folder) })
}
