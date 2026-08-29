import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

const schema = z.object({
  score: z.enum(["good", "needs-improvement", "poor"]),
  summary: z.string(),
  recommendations: z.array(z.string()),
});

export async function POST(req: Request) {
  try {
    const { vitals, fps, motionEnabled } = (await req.json()) as {
      vitals?: { lcp?: number; cls?: number; inp?: number };
      fps?: number;
      motionEnabled?: boolean;
    };

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json({
        fallback: true,
        score: "needs-improvement",
        summary: "Mock motion audit — configure GOOGLE_GENERATIVE_AI_API_KEY.",
        recommendations: ["Enable reduced-motion fallback", "Lazy-load below-fold GSAP"],
      });
    }

    const { object } = await generateObject({
      model: google("gemini-3.6-flash"),
      schema,
      prompt: `Audit this landing page performance for a motion analytics SaaS demo.
LCP ms: ${vitals?.lcp ?? "unknown"}
CLS: ${vitals?.cls ?? "unknown"}
INP ms: ${vitals?.inp ?? "unknown"}
FPS: ${fps ?? "unknown"}
Motion enabled: ${motionEnabled ?? true}
Give 3 actionable frontend recommendations in Spanish.`,
    });

    return Response.json(object);
  } catch (error) {
    console.error("[audit]", error);
    return Response.json({ error: "Audit failed" }, { status: 500 });
  }
}
