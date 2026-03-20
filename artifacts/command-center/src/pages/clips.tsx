import { useState } from "react";
import { useListClips, useCreateClip, useDeleteClip, getListClipsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Video, Plus, Youtube, Tv, Trash2, Tag, Search } from "lucide-react";
import { format } from "date-fns";

export default function Clips() {
  const queryClient = useQueryClient();
  const { data: clips, isLoading } = useListClips();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const deleteClip = useDeleteClip({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListClipsQueryKey() })
    }
  });

  const createClip = useCreateClip({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListClipsQueryKey() });
        setShowAdd(false);
        setNewClip({ title: "", sourceUrl: "", platform: "youtube", keywords: "", season: "Season 1" });
      }
    }
  });

  const [newClip, setNewClip] = useState({
    title: "",
    sourceUrl: "",
    platform: "youtube" as "youtube" | "cspan" | "other",
    keywords: "",
    season: "Season 1"
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createClip.mutate({
      data: {
        title: newClip.title,
        sourceUrl: newClip.sourceUrl,
        platform: newClip.platform,
        keywords: newClip.keywords.split(",").map(k => k.trim()).filter(Boolean),
        season: newClip.season
      }
    });
  };

  const filteredClips = clips?.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/20 pb-4">
        <div>
          <h2 className="text-3xl font-display text-foreground flex items-center gap-3">
            <Video className="w-8 h-8 text-primary" /> B-ROLL HARVEST
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-1">Asset Vault & Transcription Engine</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter by keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border border-border focus:border-primary pl-9 pr-4 py-2 rounded-md font-mono text-sm w-64"
            />
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-display px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(255,95,0,0.2)]"
          >
            <Plus className="w-4 h-4" /> ADD CLIP
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-card border border-primary/50 rounded-xl p-6 animate-in slide-in-from-top-4">
          <h3 className="font-display text-lg mb-4">INGEST NEW ASSET</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground">TITLE / IDENTIFIER</label>
                <input required type="text" value={newClip.title} onChange={e => setNewClip({...newClip, title: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded mt-1 font-mono text-sm" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground">SOURCE URL</label>
                <input type="url" value={newClip.sourceUrl} onChange={e => setNewClip({...newClip, sourceUrl: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded mt-1 font-mono text-sm" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground">PLATFORM</label>
                  <select value={newClip.platform} onChange={e => setNewClip({...newClip, platform: e.target.value as any})} className="w-full bg-background border border-border px-3 py-2 rounded mt-1 font-mono text-sm">
                    <option value="youtube">YouTube</option>
                    <option value="cspan">C-SPAN</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground">SEASON</label>
                  <input type="text" value={newClip.season} onChange={e => setNewClip({...newClip, season: e.target.value})} className="w-full bg-background border border-border px-3 py-2 rounded mt-1 font-mono text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground">KEYWORDS (Comma separated)</label>
                <input type="text" value={newClip.keywords} onChange={e => setNewClip({...newClip, keywords: e.target.value})} placeholder="iran, border, funding" className="w-full bg-background border border-border px-3 py-2 rounded mt-1 font-mono text-sm" />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border hover:bg-white/5 rounded font-display text-sm">CANCEL</button>
              <button type="submit" disabled={createClip.isPending} className="px-6 py-2 bg-primary text-primary-foreground font-display text-sm rounded shadow-[0_0_10px_rgba(255,95,0,0.3)] hover:bg-primary/90">
                {createClip.isPending ? 'SAVING...' : 'SAVE ASSET'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20 font-mono text-primary animate-pulse">LOADING ARCHIVES...</div>
      ) : filteredClips?.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl text-muted-foreground font-mono">
          NO CLIPS FOUND IN ARCHIVE.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips?.map(clip => (
            <div key={clip.id} className="bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-xl overflow-hidden group flex flex-col">
              <div className="h-32 bg-background flex items-center justify-center border-b border-border relative overflow-hidden">
                {clip.platform === 'youtube' ? <Youtube className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" /> : <Tv className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => deleteClip.mutate({ id: clip.id })}
                    className="p-1.5 bg-black/50 hover:bg-destructive/80 text-white rounded backdrop-blur opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-display font-bold text-lg leading-tight mb-2 line-clamp-2" title={clip.title}>{clip.title}</h4>
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {clip.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {kw}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border/50 pt-3">
                  <span>{clip.season}</span>
                  <span>{format(new Date(clip.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
