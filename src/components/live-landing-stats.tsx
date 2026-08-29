"use client";

import { Radio, Users, Zap } from "lucide-react";

type Props = {
  fps: number;
  visitors: number;
  gpuLoad: number;
  connected: boolean;
};

export function LiveLandingStats({ fps, visitors, gpuLoad, connected }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="rounded-2xl border border-orange-500/20 bg-[#0f0a1a]/90 p-4 shadow-lg backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          <Radio
            className={`h-3.5 w-3.5 ${connected ? "text-emerald-400" : "text-red-400"}`}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] tracking-widest text-orange-400/70 uppercase">
            Live Telemetry
          </span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Zap className="h-3 w-3 text-orange-400" aria-hidden="true" />
              FPS
            </span>
            <span className="tabular-nums text-orange-300">{fps}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Users className="h-3 w-3 text-orange-400" aria-hidden="true" />
              Viewers
            </span>
            <span className="tabular-nums text-orange-300">{visitors}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-zinc-500">GPU</span>
            <span className="tabular-nums text-orange-300">{gpuLoad}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
