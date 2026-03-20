import { useState } from "react";
import { useListTrends, useCreateTrend, getListTrendsQueryKey, useDeleteTrend } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Target, Activity, Zap, Trash2, Plus } from "lucide-react";

export default function Intel() {
  const queryClient = useQueryClient();
  const { data: trends, isLoading } = useListTrends();
  
  const createTrend = useCreateTrend({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListTrendsQueryKey() });
        setNewTrend({ title: "", volume: "Medium", sentiment: "Neutral" });
      }
    }
  });

  const deleteTrend = useDeleteTrend({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTrendsQueryKey() })
    }
  });

  const [newTrend, setNewTrend] = useState({ title: "", volume: "Medium" as const, sentiment: "Neutral" });

  const handleAddTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrend.title) return;
    createTrend.mutate({
      data: {
        title: newTrend.title,
        volume: newTrend.volume,
        sentiment: newTrend.sentiment,
        active: true
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(255,95,0,0.1)] group">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
        <img 
          src={`${import.meta.env.BASE_URL}assets/banner.png`} 
          alt="LMPYOG Banner" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/80 to-transparent z-20">
          <h2 className="text-3xl md:text-5xl font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TRUTH. NO FILTER. NO APOLOGIES.</h2>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-primary/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Target className="w-16 h-16 text-primary" /></div>
          <p className="text-sm text-muted-foreground font-mono mb-1">ACTIVE TARGETS</p>
          <p className="text-4xl font-display text-primary">{trends?.filter(t => t.active)?.length || 0}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-16 h-16 text-foreground" /></div>
          <p className="text-sm text-muted-foreground font-mono mb-1">NETWORK STATUS</p>
          <p className="text-4xl font-display text-green-500">ONLINE</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16 text-foreground" /></div>
          <p className="text-sm text-muted-foreground font-mono mb-1">BROADCAST SCHEDULE</p>
          <p className="text-xl font-display text-foreground mt-2">M / W / F @ 7PM EST</p>
        </div>
      </div>

      {/* Narrative Targets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <h3 className="text-xl font-display text-primary flex items-center gap-2">
            <Target className="w-5 h-5" /> NARRATIVE TARGETS
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-1">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground font-mono animate-pulse">Scanning network...</div>
            ) : trends?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground font-mono">No active targets.</div>
            ) : (
              <ul className="divide-y divide-border/50">
                {trends?.map(trend => (
                  <li key={trend.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div>
                      <h4 className="font-display text-lg text-foreground">{trend.title}</h4>
                      <div className="flex gap-3 mt-1 text-xs font-mono">
                        <span className={`px-2 py-0.5 rounded-sm ${
                          trend.volume === 'High' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          VOL: {trend.volume}
                        </span>
                        <span className="text-muted-foreground">SENTIMENT: {trend.sentiment}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteTrend.mutate({ id: trend.id })}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      disabled={deleteTrend.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-card border border-primary/20 rounded-xl p-6 h-fit shadow-[0_0_15px_rgba(255,95,0,0.05)]">
            <h4 className="font-display text-lg mb-4 text-foreground">INITIALIZE TARGET</h4>
            <form onSubmit={handleAddTrend} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1">TARGET IDENTIFIER</label>
                <input 
                  type="text" 
                  value={newTrend.title}
                  onChange={e => setNewTrend({...newTrend, title: e.target.value})}
                  className="w-full bg-background border border-border focus:border-primary px-3 py-2 rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Media Group X"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">CHATTER VOL</label>
                  <select 
                    value={newTrend.volume}
                    onChange={e => setNewTrend({...newTrend, volume: e.target.value as any})}
                    className="w-full bg-background border border-border focus:border-primary px-3 py-2 rounded-md font-mono text-sm focus:outline-none"
                  >
                    <option value="Low">LOW</option>
                    <option value="Medium">MEDIUM</option>
                    <option value="High">HIGH</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">SENTIMENT</label>
                  <input 
                    type="text" 
                    value={newTrend.sentiment}
                    onChange={e => setNewTrend({...newTrend, sentiment: e.target.value})}
                    className="w-full bg-background border border-border focus:border-primary px-3 py-2 rounded-md font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={createTrend.isPending}
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(255,95,0,0.4)] disabled:opacity-50"
              >
                {createTrend.isPending ? 'INITIALIZING...' : <><Plus className="w-5 h-5" /> LOCK TARGET</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
