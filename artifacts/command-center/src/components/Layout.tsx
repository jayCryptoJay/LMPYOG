import { Link, useLocation } from "wouter";
import { 
  TerminalSquare, 
  Search, 
  Video, 
  FileText, 
  CalendarDays, 
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/", label: "INTEL", icon: TerminalSquare },
  { href: "/receipts", label: "RECEIPTS", icon: Search },
  { href: "/b-roll", label: "B-ROLL HARVEST", icon: Video },
  { href: "/scripts", label: "SCRIPT LAB", icon: FileText },
  { href: "/ops", label: "OPERATIONS", icon: CalendarDays },
  { href: "/brand", label: "BRAND / COMMS", icon: ShieldAlert },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 border-r border-primary/20 bg-card/50 backdrop-blur-xl flex flex-col z-40">
        <div className="p-6 border-b border-primary/20 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary/30 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={`${import.meta.env.BASE_URL}assets/avatar.png`} 
              alt="LMPYOG Avatar" 
              className="relative w-24 h-24 rounded-full border-2 border-primary object-cover"
            />
          </div>
          <h1 className="mt-4 text-xl font-display text-primary uppercase text-center drop-shadow-[0_0_8px_rgba(255,95,0,0.5)]">
            Command Center
          </h1>
          <p className="text-xs text-muted-foreground font-mono tracking-widest mt-1">LMPYOG // SYS.ACTIVE</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-md font-display uppercase tracking-wider text-sm transition-all duration-200 border",
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/50 shadow-[0_0_15px_rgba(255,95,0,0.15)]" 
                      : "text-muted-foreground border-transparent hover:border-primary/20 hover:bg-card hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-primary/70">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>SECURE CONNECTION</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-y-auto overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-50"></div>
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
