import { NextResponse } from 'next/server'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { readTextFile, listFiles } from '@/lib/fs-utils'

export async function GET() {
  const claudeMd = readTextFile(PATHS.claudeMd) || ''

  const voiceSampleFiles = listFiles(PATHS.voiceSamples)
  const voiceSamplesCount = voiceSampleFiles.filter(
    f => !f.startsWith('README') && !f.startsWith('.')
  ).length

  const descriptionTemplatePath = path.join(PATHS.publishing, 'description-template.md')
  const descriptionTemplate = readTextFile(descriptionTemplatePath) || ''

  return NextResponse.json({ claudeMd, voiceSamplesCount, descriptionTemplate })
}
