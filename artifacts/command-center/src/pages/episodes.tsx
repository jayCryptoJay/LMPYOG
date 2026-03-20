import { useState } from "react";
import { useListEpisodes, useCreateEpisode, useUpdateEpisode, getListEpisodesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Plus, Calendar, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

export default function Episodes() {
  const queryClient = useQueryClient();
  const { data: episodes, isLoading } = useListEpisodes();
  const [showAdd, setShowAdd] = useState(false);

  const createEpisode = useCreateEpisode({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListEpisodesQueryKey() });
        setShowAdd(false);
        setNewEpisode({ title: "", season: "Season 1", status: "planning", topic: "" });
      }
    }
  });

  const updateEpisode = useUpdateEpisode({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListEpisodesQueryKey() })
    }
  });

  const [newEpisode, setNewEpisode] = useState({
    title: "",
    season: "Season 1",
    status: "planning" as any,
    topic: ""
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createEpisode.mutate({ data: newEpisode });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'editing': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'filming': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'scripting': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/20 pb-4">
        <div>
          <h2 className="text-3xl font-display text-foreground flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-primary" /> OPERATIONS
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-1">Production Pipeline & Schedule</p>
        </div>
        
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-display px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(255,95,0,0.2)]"
        >
          <Plus className="w-4 h-4" /> ADD EPISODE
        </button>
      </div>

      {showAdd && (
        <div className="bg-card border border-primary/50 rounded-xl p-6 shadow-lg shadow-black/50 animate-in slide-in-from-top-4">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1">EPISODE TITLE</label>
                <input required type="text" value={newEpisode.title} onChange={e => setNewEpisode({...newEpisode, title: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded font-mono text-sm focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1">CORE TOPIC</label>
                <input type="text" value={newEpisode.topic} onChange={e => setNewEpisode({...newEpisode, topic: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded font-mono text-sm focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1">SEASON</label>
                <input required type="text" value={newEpisode.season} onChange={e => setNewEpisode({...newEpisode, season: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded font-mono text-sm focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1">INITIAL STATUS</label>
                <select value={newEpisode.status} onChange={e => setNewEpisode({...newEpisode, status: e.target.value as any})} className="w-full bg-background border border-border px-3 py-2 rounded font-mono text-sm focus:border-primary focus:outline-none">
                  <option value="planning">PLANNING</option>
                  <option value="scripting">SCRIPTING</option>
                  <option value="filming">FILMING</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border hover:bg-white/5 rounded font-display text-sm">CANCEL</button>
              <button type="submit" disabled={createEpisode.isPending} className="px-6 py-2 bg-primary text-primary-foreground font-display text-sm rounded hover:bg-primary/90">
                {createEpisode.isPending ? 'CREATING...' : 'CREATE'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban / Table View */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex-1 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background/50 border-b border-border font-mono text-xs text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Episode</th>
                <th className="px-6 py-4 font-medium">Topic</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground font-mono">LOADING SCHEDULE...</td></tr>
              )}
              {episodes?.map(ep => (
                <tr key={ep.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-display font-bold text-foreground text-lg">{ep.title}</div>
                    <div className="text-xs font-mono text-muted-foreground">{ep.season} {ep.episodeNumber ? `| EP ${ep.episodeNumber}` : ''}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-sans text-muted-foreground">{ep.topic || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={ep.status}
                      onChange={(e) => updateEpisode.mutate({ id: ep.id, data: { status: e.target.value as any } })}
                      className={`text-xs font-mono px-2 py-1 rounded border appearance-none cursor-pointer focus:outline-none ${getStatusColor(ep.status)}`}
                    >
                      <option value="planning">PLANNING</option>
                      <option value="scripting">SCRIPTING</option>
                      <option value="filming">FILMING</option>
                      <option value="editing">EDITING</option>
                      <option value="published">PUBLISHED</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                    {ep.publishedDate ? (
                      <div className="flex items-center gap-1 text-green-500/80"><Calendar className="w-3 h-3" /> PUB: {format(new Date(ep.publishedDate), 'MM/dd/yy')}</div>
                    ) : (
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> CREATED: {format(new Date(ep.createdAt), 'MM/dd/yy')}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {ep.youtubeUrl ? (
                      <a href={ep.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex p-2 text-muted-foreground hover:text-primary transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    ) : (
                      <button className="text-xs font-mono text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all">
                        ADD LINK
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
