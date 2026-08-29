"use client";

import { useState } from "react";

export function PricingCalculator() {
  const [projects, setProjects] = useState(1);
  const [views, setViews] = useState(50_000);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tier =
    projects >= 5 || views >= 500_000 ? "Scale" : projects >= 2 || views >= 100_000 ? "Pro" : "Starter";
  const price = tier === "Scale" ? 99 : tier === "Pro" ? 29 : 0;

  async function explainPlan() {
    setLoading(true);
    try {
      const res = await fetch("/api/pricing-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, projects, views, price }),
      });
      const data = (await res.json()) as { advice?: string };
      setAdvice(data.advice ?? null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
      <p className="font-mono text-xs uppercase tracking-wider text-cyan-400/80">Pricing calculator</p>
      <h3 className="mt-2 text-lg font-semibold text-white">Estima tu plan Pulse</h3>
      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="font-mono text-[10px] text-zinc-500">Proyectos ({projects})</span>
          <input
            type="range"
            min={1}
            max={10}
            value={projects}
            onChange={(e) => setProjects(Number(e.target.value))}
            className="mt-1 w-full accent-cyan-400"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] text-zinc-500">Pageviews/mes ({views.toLocaleString()})</span>
          <input
            type="range"
            min={10_000}
            max={1_000_000}
            step={10_000}
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="mt-1 w-full accent-cyan-400"
          />
        </label>
      </div>
      <p className="mt-4 font-mono text-sm text-zinc-300">
        Recomendado: <span className="text-cyan-300">{tier}</span> —{" "}
        <span className="text-white">${price}/mo</span>
      </p>
      <button
        type="button"
        onClick={explainPlan}
        disabled={loading}
        className="mt-3 rounded-lg border border-violet-500/30 px-3 py-1.5 font-mono text-[10px] text-violet-300 disabled:opacity-40"
      >
        {loading ? "Gemini…" : "Explicar plan (Gemini)"}
      </button>
      {advice && <p className="mt-2 text-xs text-zinc-500">{advice}</p>}
    </div>
  );
}
