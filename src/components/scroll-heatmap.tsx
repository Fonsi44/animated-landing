"use client";

type Props = {
  depth: number;
};

export function ScrollHeatmap({ depth }: Props) {
  const buckets = Array.from({ length: 10 }, (_, i) => {
    const start = i * 10;
    const end = start + 10;
    const active = depth >= start;
    const intensity = active ? Math.min(1, (depth - start) / 10 + 0.3) : 0.08;
    return { start, end, intensity };
  });

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-orange-400/70 uppercase">
          Live scroll depth
        </p>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Tu profundidad de scroll: {depth}%
        </h2>
        <div className="flex h-12 overflow-hidden rounded-xl border border-white/10">
          {buckets.map((b) => (
            <div
              key={b.start}
              className="flex-1 border-r border-white/5 last:border-r-0"
              style={{
                background: `rgba(251, 146, 60, ${b.intensity})`,
              }}
              title={`${b.start}–${b.end}%`}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-zinc-500">
          Telemetría agregada via Partykit · se actualiza al hacer scroll
        </p>
      </div>
    </section>
  );
}
