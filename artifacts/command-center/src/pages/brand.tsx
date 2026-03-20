import { ShieldAlert, Palette, Download, Image as ImageIcon } from "lucide-react";

export default function Brand() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="border-b border-primary/20 pb-4">
        <h2 className="text-3xl font-display text-foreground flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-primary" /> BRAND & COMMS
        </h2>
        <p className="text-sm font-mono text-muted-foreground mt-1">Identity Assets & Style Guidelines</p>
      </div>

      {/* Identity Overview */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        <div className="w-full md:w-1/3 bg-background p-8 flex items-center justify-center border-r border-border">
          <img 
            src={`${import.meta.env.BASE_URL}assets/avatar-refined.png`} 
            alt="LMPYOG Refined Avatar" 
            className="w-48 h-48 object-contain drop-shadow-[0_0_20px_rgba(255,95,0,0.3)] hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8 flex-1 flex flex-col justify-center space-y-4">
          <h3 className="font-display text-2xl text-primary uppercase">Let Me Put You On Game</h3>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Investigative journalism channel focused on exposing truth, unmasking narratives, and providing receipts. The tone is authoritative, unyielding, and gritty.
          </p>
          <div className="pt-4 mt-4 border-t border-border/50">
            <h4 className="font-mono text-sm text-muted-foreground mb-2">OFFICIAL MOTTO</h4>
            <p className="font-display text-xl text-foreground uppercase tracking-widest bg-white/5 py-3 px-4 rounded border-l-2 border-primary inline-block">
              "Truth. No Filter. No Apologies."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colors */}
        <div className="space-y-4">
          <h3 className="text-xl font-display text-foreground flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" /> COLOR PROFILE
          </h3>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FF5F00] shadow-[0_0_15px_rgba(255,95,0,0.5)] flex-shrink-0"></div>
              <div>
                <p className="font-display font-bold text-lg text-foreground">Neon Orange (Primary)</p>
                <p className="font-mono text-sm text-muted-foreground">HEX: #FF5F00 | HSL: 22, 100%, 50%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#000000] border border-border flex-shrink-0"></div>
              <div>
                <p className="font-display font-bold text-lg text-foreground">Void Black (Background)</p>
                <p className="font-mono text-sm text-muted-foreground">HEX: #000000 | HSL: 0, 0%, 0%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-border flex-shrink-0"></div>
              <div>
                <p className="font-display font-bold text-lg text-foreground">Stark White (Text)</p>
                <p className="font-mono text-sm text-muted-foreground">HEX: #FFFFFF | HSL: 0, 0%, 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="space-y-4">
          <h3 className="text-xl font-display text-foreground flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" /> DOWNLOAD ASSETS
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-background border border-border rounded flex items-center justify-center overflow-hidden">
                  <img src={`${import.meta.env.BASE_URL}assets/banner.png`} className="w-full h-full object-cover opacity-50" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Channel Banner</p>
                  <p className="font-mono text-xs text-muted-foreground">2560x1440 PNG</p>
                </div>
              </div>
              <a href={`${import.meta.env.BASE_URL}assets/banner.png`} download className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors">
                <Download className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background border border-border rounded flex items-center justify-center overflow-hidden">
                  <img src={`${import.meta.env.BASE_URL}assets/avatar.png`} className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Avatar (Standard)</p>
                  <p className="font-mono text-xs text-muted-foreground">800x800 PNG (Transparent)</p>
                </div>
              </div>
              <a href={`${import.meta.env.BASE_URL}assets/avatar.png`} download className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors">
                <Download className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background border border-border rounded flex items-center justify-center overflow-hidden">
                  <img src={`${import.meta.env.BASE_URL}assets/avatar-refined.png`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Avatar (Refined)</p>
                  <p className="font-mono text-xs text-muted-foreground">800x800 PNG</p>
                </div>
              </div>
              <a href={`${import.meta.env.BASE_URL}assets/avatar-refined.png`} download className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors">
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
