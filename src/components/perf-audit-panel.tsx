"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRealFps } from "@/hooks/use-real-fps";
import { useWebVitals, type WebVitals } from "@/hooks/use-web-vitals";

type Props = {
  motionOn: boolean;
};

export function PerfAuditPanel({ motionOn }: Props) {
  const fps = useRealFps();
  const vitals = useWebVitals();
  const [loading, setLoading] = useState(false);
  const [baseline, setBaseline] = useState<{ vitals: WebVitals; fps: number } | null>(null);
  const [report, setReport] = useState<{
    score: string;
    summary: string;
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    if (!motionOn && !baseline && (vitals.lcp != null || fps > 0)) {
      setBaseline({ vitals, fps });
    }
  }, [motionOn, vitals, fps, baseline]);

  async function runAudit() {
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vitals,
          fps,
          motionEnabled: motionOn,
          baseline,
        }),
      });
      const data = await res.json();
      setReport(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 rounded-2xl border border-white/10 bg-[#030306]/90 p-3 font-mono text-[10px] backdrop-blur-xl">
      <p className="mb-2 uppercase tracking-wider text-zinc-500">Core Web Vitals</p>
      <div className="grid grid-cols-2 gap-2 text-zinc-400">
        <div>
          <p className="text-[9px] text-zinc-600">Motion {motionOn ? "ON" : "OFF"}</p>
          <span>LCP {vitals.lcp ?? "—"}ms</span>
          <span className="ml-2">FPS {fps}</span>
        </div>
        {baseline && (
          <div>
            <p className="text-[9px] text-zinc-600">Baseline</p>
            <span>LCP {baseline.vitals.lcp ?? "—"}ms</span>
            <span className="ml-2">FPS {baseline.fps}</span>
          </div>
        )}
      </div>
      <div className="mt-1 grid grid-cols-3 gap-2 text-zinc-500">
        <span>CLS {vitals.cls ?? "—"}</span>
        <span>INP {vitals.inp ?? "—"}ms</span>
      </div>
      <button
        type="button"
        onClick={runAudit}
        disabled={loading}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-500/15 py-2 text-cyan-300 ring-1 ring-cyan-500/30 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
        AI Motion Report
      </button>
      {report && (
        <div className="mt-3 space-y-1 border-t border-white/10 pt-2 text-zinc-500">
          <p className="text-cyan-400">{report.score}</p>
          <p>{report.summary}</p>
          <ul className="list-inside list-disc">
            {report.recommendations?.slice(0, 3).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
