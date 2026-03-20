import { useState } from "react";
import { useRunResearch } from "@workspace/api-client-react";
import { Search, Loader2, Database, ExternalLink, ShieldCheck } from "lucide-react";

export default function Receipts() {
  const [query, setQuery] = useState("");
  
  const research = useRunResearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    research.mutate({ data: { query } });
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-3xl font-display text-foreground">RECEIPTS TERMINAL</h2>
          <p className="text-sm font-mono text-muted-foreground">Deep Web Investigative Engine v2.4</p>
        </div>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur group-hover:bg-primary/30 transition duration-500"></div>
        <div className="relative flex items-center bg-card border border-primary/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <div className="pl-6 pr-2 py-4 text-primary">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ENTER INVESTIGATION TARGET OR KEYWORDS..."
            className="w-full bg-transparent border-none py-6 px-2 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none uppercase"
          />
          <button 
            type="submit"
            disabled={research.isPending || !query}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-display font-bold py-6 px-8 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {research.isPending ? (
              <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> TRACING...</span>
            ) : "RUN TRACE"}
          </button>
        </div>
      </form>

      {/* Results Area */}
      <div className="flex-1 min-h-[400px] bg-card border border-border rounded-xl p-6 overflow-hidden flex flex-col relative">
        {!research.data && !research.isPending && !research.isError && (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
            <ShieldCheck className="w-24 h-24 mb-4 text-primary" />
            <p className="font-display text-xl tracking-widest uppercase">AWAITING INPUT PARAMETERS</p>
          </div>
        )}

        {research.isPending && (
          <div className="flex-1 flex flex-col items-center justify-center font-mono text-primary space-y-4">
            <Loader2 className="w-12 h-12 animate-spin" />
            <div className="typewriter-text">ACCESSING DATABASES... EXTRACTING RECEIPTS...</div>
          </div>
        )}

        {research.isError && (
          <div className="p-6 bg-destructive/10 border border-destructive text-destructive font-mono rounded-md">
            ERROR: FAILED TO ESTABLISH TRACE. CONNECTION INTERRUPTED.
          </div>
        )}

        {research.data && (
          <div className="flex-1 overflow-y-auto pr-4 space-y-8 animate-in slide-in-from-bottom-8">
            <div>
              <h3 className="text-xs font-mono text-primary mb-2 border-b border-primary/20 pb-1">INTEL REPORT // {research.data.query}</h3>
              <div className="font-sans text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {/* Minimal markdown rendering assumption */}
                {research.data.content}
              </div>
            </div>

            {research.data.sources && research.data.sources.length > 0 && (
              <div className="mt-8 bg-black/40 border border-border rounded-lg p-4">
                <h3 className="text-xs font-mono text-muted-foreground mb-4">VERIFIED SOURCES (RECEIPTS)</h3>
                <ul className="space-y-2">
                  {research.data.sources.map((source, i) => (
                    <li key={i}>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-start gap-2 group hover:bg-white/5 p-2 rounded-md transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-display text-sm text-foreground group-hover:text-primary transition-colors">{source.title || 'Unknown Source'}</p>
                          <p className="font-mono text-xs text-muted-foreground truncate max-w-2xl">{source.uri}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
