"use client";

import { useEffect, useState } from "react";

export function ScrollReplayLite() {
  const [maxDepth, setMaxDepth] = useState(0);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const depth = Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100);
      setMaxDepth((m) => Math.max(m, depth));
      if (depth % 25 === 0) {
        setEvents((prev) => {
          const label = `${depth}% @ ${new Date().toLocaleTimeString()}`;
          if (prev[0] === label) return prev;
          return [label, ...prev].slice(0, 6);
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/50 p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Session replay lite</p>
      <p className="mt-2 font-mono text-sm text-cyan-300">Max scroll depth: {maxDepth}%</p>
      <ul className="mt-2 space-y-1 font-mono text-[10px] text-zinc-600">
        {events.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
