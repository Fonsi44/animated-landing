"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Check,
  Sparkles,
  Zap,
  Layers,
  MousePointer2,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { PortfolioBar } from "./portfolio-bar";
import { LiveLandingStats } from "./live-landing-stats";
import { useLandingTelemetry } from "@/hooks/use-landing-telemetry";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: "Scroll heatmaps",
    desc: "Mapa de profundidad en tiempo real — sabe dónde pierdes atención en cada viewport.",
  },
  {
    icon: Zap,
    title: "Frame budget alerts",
    desc: "Alertas cuando GSAP timelines superan 16ms — antes de que el usuario lo note.",
  },
  {
    icon: Layers,
    title: "Layer profiler",
    desc: "Detecta repaints costosos y capas que no están en el compositor.",
  },
  {
    icon: MousePointer2,
    title: "Interaction replay",
    desc: "Graba hover, scroll y taps para reproducir sesiones con telemetría sincronizada.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "Para landings en desarrollo",
    features: ["1 proyecto", "FPS + viewers live", "7 días de histórico"],
  },
  {
    name: "Pro",
    price: "29",
    desc: "Equipos de producto y marketing",
    features: ["5 proyectos", "Scroll heatmaps", "Alertas Slack", "Export CSV"],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "99",
    desc: "Alto tráfico y A/B tests",
    features: ["Ilimitado", "API + webhooks", "SSO", "SLA 99.9%"],
  },
];

const testimonials = [
  {
    quote: "Pulse nos avisó de un jank en mobile antes del launch. Salvó la campaña.",
    author: "Laura M.",
    role: "Head of Growth · SaaS B2B",
  },
  {
    quote: "Ver viewers y FPS en la misma landing del demo convence a clientes al instante.",
    author: "Carlos R.",
    role: "Freelance · Motion UI",
  },
];

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { fps, visitors, gpuLoad, connected } = useLandingTelemetry();

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

      gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
        });
      });

      gsap.from(".cta-block", {
        scrollTrigger: { trigger: ".cta-block", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: rootRef },
  );

  const liveStats = [
    { value: String(fps), unit: "fps", label: "Live frame rate" },
    { value: String(visitors), unit: "", label: "Viewers now" },
    { value: String(gpuLoad), unit: "%", label: "GPU compositor" },
  ];

  return (
    <div ref={rootRef} className="overflow-x-hidden bg-[#0f0a1a] text-zinc-100">
      <PortfolioBar />
      <LiveLandingStats fps={fps} visitors={visitors} gpuLoad={gpuLoad} connected={connected} />

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
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

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="hero-eyebrow mb-4 font-mono text-xs tracking-[0.35em] text-orange-400/70 uppercase">
            Pulse · Motion Analytics
          </p>
          <h1 className="hero-title text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Mide el{" "}
            <span className="bg-gradient-to-r from-orange-300 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              pulso
            </span>{" "}
            de tu landing
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-xl text-pretty text-lg text-zinc-400">
            SaaS de telemetría para interfaces animadas — FPS, viewers y scroll depth en vivo vía
            Partykit. Esta página es el producto y el demo a la vez.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#pricing"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:from-orange-300 hover:to-rose-400 focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Empezar gratis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="#features"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-orange-500/30 hover:text-orange-300 focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Ver features
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
            {liveStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <p className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                  {s.value}
                  <span className="text-sm text-orange-400">{s.unit}</span>
                </p>
                <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
          {connected && (
            <p className="mt-4 font-mono text-[10px] tracking-widest text-emerald-400/70 uppercase">
              ● Telemetry stream active
            </p>
          )}
        </div>
      </section>

      <section id="features" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-orange-400/70 uppercase">
            Product
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            Todo lo que un motion lead necesita
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

      <section className="marquee-section overflow-hidden border-y border-white/5 py-16">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) =>
            ["Pulse", "GSAP", "Partykit", "ScrollTrigger", "60fps", "Realtime", "Telemetry"].map(
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

      <section id="pricing" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center font-mono text-xs tracking-[0.3em] text-orange-400/70 uppercase">
            Pricing
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Planes simples</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`pricing-card rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-transparent"
                    : "border-white/8 bg-[#1a1028]/40"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{plan.desc}</p>
                <p className="mt-4 text-4xl font-bold text-orange-400">
                  €{plan.price}
                  <span className="text-sm font-normal text-zinc-500">/mo</span>
                </p>
                <ul className="mt-6 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                      <Check className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-center gap-2 text-orange-400/70">
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase">Social proof</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-2xl border border-white/8 bg-[#1a1028]/50 p-6"
              >
                <p className="text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-xs text-zinc-500">
                  <span className="font-medium text-orange-300">{t.author}</span> · {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="cta-block mx-auto max-w-2xl rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-rose-600/10 p-12 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            ¿Listo para medir motion en producción?
          </h2>
          <p className="mt-3 text-zinc-400">
            Explora el ecosistema completo — agentes IA, dashboards SaaS y colaboración en tiempo
            real.
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
