import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'LMPYOG Dashboard',
  description: 'Let Me Put You On Game — Ops Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
