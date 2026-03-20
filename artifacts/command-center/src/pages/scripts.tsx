import { useState } from "react";
import { useListScripts, useCreateScript, useUpdateScript, useDeleteScript, getListScriptsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, Plus, Trash2, Edit3, Save } from "lucide-react";
import { format } from "date-fns";

export default function Scripts() {
  const queryClient = useQueryClient();
  const { data: scripts, isLoading } = useListScripts();
  
  const [selectedScriptId, setSelectedScriptId] = useState<number | null>(null);
  const selectedScript = scripts?.find(s => s.id === selectedScriptId);

  const [editForm, setEditForm] = useState({ title: "", episode: "", content: "", status: "draft" as any });

  const createScript = useCreateScript({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: getListScriptsQueryKey() });
        setSelectedScriptId(data.id);
        setEditForm({ title: data.title, episode: data.episode || "", content: data.content, status: data.status });
      }
    }
  });

  const updateScript = useUpdateScript({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListScriptsQueryKey() });
      }
    }
  });

  const deleteScript = useDeleteScript({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListScriptsQueryKey() });
        setSelectedScriptId(null);
      }
    }
  });

  const handleCreateNew = () => {
    createScript.mutate({
      data: {
        title: "UNTITLED DRAFT",
        content: "Start typing...",
        status: "draft"
      }
    });
  };

  const handleSelect = (script: any) => {
    setSelectedScriptId(script.id);
    setEditForm({
      title: script.title,
      episode: script.episode || "",
      content: script.content,
      status: script.status
    });
  };

  const handleSave = () => {
    if (!selectedScriptId) return;
    updateScript.mutate({
      id: selectedScriptId,
      data: editForm
    });
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-primary/20 pb-4 mb-4 flex-shrink-0">
        <h2 className="text-3xl font-display text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" /> SCRIPT LAB
        </h2>
        <button 
          onClick={handleCreateNew}
          disabled={createScript.isPending}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-display px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(255,95,0,0.2)]"
        >
          <Plus className="w-4 h-4" /> NEW DRAFT
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="p-3 bg-secondary/50 border-b border-border font-display text-sm tracking-wider">DOCUMENTS</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {isLoading && <div className="p-4 text-center font-mono text-muted-foreground text-sm">Loading...</div>}
            {scripts?.map(script => (
              <button
                key={script.id}
                onClick={() => handleSelect(script)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group ${
                  selectedScriptId === script.id 
                    ? "bg-primary/10 border-primary/50" 
                    : "border-transparent hover:border-border hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-display font-bold truncate pr-2 ${selectedScriptId === script.id ? 'text-primary' : 'text-foreground'}`}>
                    {script.title}
                  </h4>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase ${
                    script.status === 'final' ? 'bg-green-500/20 text-green-500' :
                    script.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {script.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>{script.episode || 'Unassigned'}</span>
                  <span>{format(new Date(script.updatedAt), 'MM/dd')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-background border border-primary/30 rounded-xl flex flex-col overflow-hidden shadow-[0_0_20px_rgba(255,95,0,0.05)]">
          {selectedScript ? (
            <>
              {/* Editor Header */}
              <div className="p-4 border-b border-border bg-card/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <input 
                    type="text" 
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="bg-transparent border-none text-2xl font-display font-bold text-foreground focus:outline-none focus:ring-0 w-2/3"
                    placeholder="Document Title"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => deleteScript.mutate({ id: selectedScript.id })}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleSave}
                      disabled={updateScript.isPending}
                      className="px-4 py-2 bg-secondary hover:bg-white/10 text-foreground font-display text-sm rounded flex items-center gap-2 transition-colors border border-border hover:border-primary/50"
                    >
                      {updateScript.isPending ? 'SAVING...' : <><Save className="w-4 h-4" /> SAVE</>}
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">EPISODE:</span>
                    <input 
                      type="text" 
                      value={editForm.episode}
                      onChange={(e) => setEditForm({...editForm, episode: e.target.value})}
                      className="bg-background border border-border px-2 py-1 text-sm font-mono rounded focus:border-primary focus:outline-none"
                      placeholder="e.g. S1E4"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">STATUS:</span>
                    <select 
                      value={editForm.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value as any})}
                      className="bg-background border border-border px-2 py-1 text-sm font-mono rounded focus:border-primary focus:outline-none"
                    >
                      <option value="draft">DRAFT</option>
                      <option value="in-progress">IN-PROGRESS</option>
                      <option value="final">FINAL</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Textarea */}
              <div className="flex-1 p-4 bg-background">
                <textarea 
                  value={editForm.content}
                  onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                  className="w-full h-full bg-transparent border-none resize-none text-foreground font-sans text-lg leading-relaxed focus:outline-none focus:ring-0"
                  placeholder="Begin drafting..."
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <Edit3 className="w-16 h-16 mb-4" />
              <p className="font-display text-lg tracking-widest uppercase">SELECT OR CREATE A SCRIPT</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
