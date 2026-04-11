'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Archive,
  FileText,
  Receipt,
  Send,
  Zap,
  Settings,
} from 'lucide-react'

const NAV = [
  { href: '/',         label: 'Dashboard',    Icon: LayoutDashboard },
  { href: '/vault',    label: 'Story Vault',  Icon: Archive },
  { href: '/scripts',  label: 'Scripts',      Icon: FileText },
  { href: '/skills',   label: 'Skills Runner', Icon: Zap },
  { href: '/receipts', label: 'Receipts',     Icon: Receipt },
  { href: '/publish',  label: 'Publishing',   Icon: Send },
]

const BOTTOM_NAV = [
  { href: '/settings', label: 'Settings', Icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen sticky top-0 bg-[#0D0D0D] border-r border-edge">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-edge">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-accent flex items-center justify-center">
            <span className="text-white font-black text-xs leading-none">L</span>
          </div>
          <div>
            <span className="font-black text-bone text-sm tracking-widest uppercase">LMPYOG</span>
            <p className="text-dim text-[10px] font-mono mt-0.5 leading-none">Ops Dashboard</p>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-dim uppercase tracking-widest px-2 mb-2">Navigation</p>
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-accent/10 text-bone border border-accent/20'
                  : 'text-dim hover:text-bone hover:bg-surface border border-transparent'
                }
              `}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
              )}
              <Icon
                size={16}
                strokeWidth={active ? 2 : 1.5}
                className={active ? 'text-accent' : ''}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 border-t border-edge space-y-0.5">
        {BOTTOM_NAV.map(({ href, label, Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-accent/10 text-bone border border-accent/20'
                  : 'text-dim hover:text-bone hover:bg-surface border border-transparent'
                }
              `}
            >
              <Icon size={16} strokeWidth={1.5} className={active ? 'text-accent' : ''} />
              {label}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
