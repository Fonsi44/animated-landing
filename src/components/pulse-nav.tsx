"use client";

import Link from "next/link";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function PulseNav() {
  return (
    <header className="fixed inset-x-0 top-[57px] z-40 border-b border-white/5 bg-[#030306]/80 backdrop-blur-xl">
        <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3"
        aria-label="Pulse"
      >
        <span className="shrink-0 font-mono text-xs tracking-widest text-cyan-400/80">Motion Analytics</span>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-4 sm:justify-center sm:gap-8">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none sm:gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 text-sm text-zinc-400 transition hover:text-cyan-300 focus-visible:text-cyan-300 focus-visible:outline-none"
            >
              {l.label}
            </Link>
          ))}
          </div>
        </div>
        <a
          href="#pricing"
          className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Start free
        </a>
      </nav>
    </header>
  );
}
