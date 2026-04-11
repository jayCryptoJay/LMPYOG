import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { PATHS } from '@/lib/paths'
import { today } from '@/lib/utils'
import type { ReceiptType } from '@/lib/types'

interface ReceiptEntry {
  filename: string
  type: ReceiptType
  path: string
  created: string
  sizeMb: string
}

const RECEIPT_FOLDERS: ReceiptType[] = [
  'FARA', 'Court', 'FEC', 'SEC', 'FOIA', '990', 'USASpending', 'Congress', 'Other'
]

export async function GET() {
  const receipts: ReceiptEntry[] = []
  const base = PATHS.primaryDocs

  if (!fs.existsSync(base)) {
    return NextResponse.json(receipts)
  }

  for (const type of RECEIPT_FOLDERS) {
    const dir = path.join(base, type)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir)
    for (const filename of files) {
      const full = path.join(dir, filename)
      try {
        const stat = fs.statSync(full)
        receipts.push({
          filename,
          type,
          path: full,
          created: stat.mtime.toISOString().split('T')[0],
          sizeMb: (stat.size / 1024 / 1024).toFixed(2),
        })
      } catch {
        // skip unreadable files
      }
    }
  }

  // Sort newest first
  receipts.sort((a, b) => b.created.localeCompare(a.created))
  return NextResponse.json(receipts)
}
