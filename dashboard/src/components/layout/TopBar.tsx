'use client'

import { usePathname } from 'next/navigation'

const PAGE_LABELS: Record<string, string> = {
  '/':          'Dashboard',
  '/vault':     'Story Vault',
  '/scripts':   'Scripts',
  '/skills':    'Skills Runner',
  '/receipts':  'Receipts',
  '/publish':   'Publishing',
  '/settings':  'Settings',
}

function getPageLabel(pathname: string): string {
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname]
  for (const [prefix, label] of Object.entries(PAGE_LABELS)) {
    if (prefix !== '/' && pathname.startsWith(prefix)) return label
  }
  return 'LMPYOG'
}

export function TopBar() {
  const pathname = usePathname()
  const label = getPageLabel(pathname)

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-6 bg-[#0D0D0D] border-b border-edge">
      <h1 className="text-bone font-semibold text-sm tracking-wide">{label}</h1>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-dim text-xs font-mono">Let Me Put You On Game</span>
      </div>
    </header>
  )
}
