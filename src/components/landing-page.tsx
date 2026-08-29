"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Zap, Layers, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { PortfolioBar } from "./portfolio-bar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: "Scroll-triggered reveals",
    desc: "Cada sección entra con timing orchestrado vía ScrollTrigger y stagger.",
  },
  {
    icon: Zap,
    title: "Performance-first",
    desc: "Solo transform y opacity — compositor-friendly, respeta reduced motion.",
  },
  {
    icon: Layers,
    title: "Depth & parallax",
    desc: "Capas con velocidades distintas crean profundidad sin WebGL.",
  },
  {
    icon: MousePointer2,
    title: "Micro-interacciones",
    desc: "Hover magnético, cursor glow y feedback táctil en cada CTA.",
  },
];

const stats = [
  { value: "60", unit: "fps", label: "Target frame rate" },
  { value: "0", unit: "jank", label: "Layout thrashing" },
  { value: "100", unit: "%", label: "GPU composited" },
];

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, "-=0.4")
        .from(".hero-stat", { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.2");

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power2.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: "back.out(1.7)",
        });
      });

      gsap.from(".marquee-inner", {
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".cta-block", {
        scrollTrigger: {
          trigger: ".cta-block",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="overflow-x-hidden bg-[#0f0a1a] text-zinc-100">
      <PortfolioBar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center px-6 pt-20"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,146,60,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="hero-eyebrow mb-4 font-mono text-xs tracking-[0.35em] text-orange-400/70 uppercase">
            Motion Design · GSAP · Next.js
          </p>
          <h1 className="hero-title text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Interfaces que{" "}
            <span className="bg-gradient-to-r from-orange-300 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              respiran
            </span>
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-xl text-pretty text-lg text-zinc-400">
            Landing animada con GSAP ScrollTrigger — scroll orchestration,
            parallax layers y micro-interacciones de última generación.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#features"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:from-orange-300 hover:to-rose-400 focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Ver animaciones
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="https://github.com/Fonsi44/animated-landing"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-orange-500/30 hover:text-orange-300 focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Ver código
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <p className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                  {s.value}
                  <span className="text-sm text-orange-400">{s.unit}</span>
                </p>
                <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-orange-400/70 uppercase">
            Capabilities
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            Animación con propósito
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <article
                key={f.title}
                className="feature-card group rounded-2xl border border-white/8 bg-[#1a1028]/60 p-8 transition hover:border-orange-500/25 hover:bg-[#1a1028]/90"
              >
                <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-400 transition group-hover:bg-orange-500/20">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee-section overflow-hidden border-y border-white/5 py-16">
        <div className="marquee-inner flex w-max animate-none gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) =>
            ["GSAP", "ScrollTrigger", "useGSAP", "Next.js 16", "React 19", "Tailwind v4", "60fps", "Compositor"].map(
              (word) => (
                <span
                  key={`${word}-${dup}`}
                  className="font-mono text-5xl font-bold text-white/5 md:text-7xl"
                >
                  {word}
                </span>
              ),
            ),
          )}
        </div>
      </section>

      {/* Stats band */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-4xl font-bold tabular-nums text-orange-400 md:text-5xl">
                {s.value}
                <span className="text-lg">{s.unit}</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="cta-block mx-auto max-w-2xl rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-rose-600/10 p-12 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            ¿Te gusta este nivel de craft?
          </h2>
          <p className="mt-3 text-zinc-400">
            Explora el resto del portfolio — agentes IA, dashboards y plataformas en producción.
          </p>
          <Link
            href="https://portfolio-hub-flax.vercel.app"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:from-orange-300 hover:to-rose-400 focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Volver al portfolio
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
