import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getISOWeek } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function estimateRuntime(text: string, wpm = 140): number {
  return Math.round(wordCount(text) / wpm)
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}

export function currentWeekNumber(): number {
  return getISOWeek(new Date())
}

export function today(): string {
  return new Date().toISOString().split('T')[0]
}

export function heatDots(heat: number): string {
  const filled = Math.min(10, Math.max(0, heat))
  return '●'.repeat(filled) + '○'.repeat(10 - filled)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
