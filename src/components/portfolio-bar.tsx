import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PORTFOLIO_URL = "https://portfolio-hub-flax.vercel.app";

export function PortfolioBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-orange-900/30 bg-[#0f0a1a]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={PORTFOLIO_URL}
          className="inline-flex items-center gap-2 text-sm text-orange-300/60 transition hover:text-orange-300 focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Portfolio — Fonsi
        </Link>
        <span className="font-mono text-[10px] tracking-widest text-orange-800 uppercase">
          GSAP · Motion Lab
        </span>
      </div>
    </div>
  );
}
