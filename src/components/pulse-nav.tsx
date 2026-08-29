"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function PulseNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-12 z-40 transition ${
        scrolled
          ? "border-b border-white/5 bg-[#0f0a1a]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <span className="font-mono text-sm font-bold text-orange-400">Pulse</span>
        <div className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition hover:text-orange-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a
          href="#pricing"
          className="rounded-full bg-orange-500/15 px-4 py-1.5 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30 transition hover:bg-orange-500/25"
        >
          Start free
        </a>
      </nav>
    </header>
  );
}
