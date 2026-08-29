"use client";

import { useRealFps } from "@/hooks/use-real-fps";

export function LiveFpsBadge() {
  const fps = useRealFps();
  const tone =
    fps >= 55 ? "text-emerald-400" : fps >= 30 ? "text-amber-400" : "text-red-400";

  return (
    <div
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-white/8 bg-[#030306]/80 px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase backdrop-blur-xl"
      aria-live="polite"
      aria-label={`Live frame rate ${fps} frames per second`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" aria-hidden="true" />
      <span className="text-zinc-500">FPS</span>
      <span className={`tabular-nums ${tone}`}>{fps}</span>
    </div>
  );
}
