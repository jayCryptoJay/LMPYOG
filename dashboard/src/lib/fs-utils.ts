import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function readMarkdownDir(
  dirPath: string
): { slug: string; data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    return []
  }
  return fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      try {
        const filePath = path.join(dirPath, filename)
        const raw = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(raw)
        return { slug: filename.replace(/\.md$/, ''), data, content: content.trim() }
      } catch {
        return null
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => {
      const da = a.data.created ? new Date(a.data.created as string).getTime() : 0
      const db = b.data.created ? new Date(b.data.created as string).getTime() : 0
      return db - da
    })
}

export function readMarkdownFile(
  filePath: string
): { data: Record<string, unknown>; content: string } | null {
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content: content.trim() }
}

export function writeMarkdownFile(
  filePath: string,
  frontmatter: Record<string, unknown>,
  content: string
): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  const fileContent = matter.stringify(content, frontmatter)
  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

export function readTextFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export function writeTextFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
}

export function deleteFile(filePath: string): void {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

export function listFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    return []
  }
  return fs.readdirSync(dirPath)
}

export function readJsonFile<T>(filePath: string, defaultValue: T): T {
  if (!fs.existsSync(filePath)) return defaultValue
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return defaultValue
  }
}

export function writeJsonFile(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath)
}
