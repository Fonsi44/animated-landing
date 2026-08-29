import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 20;

export async function POST(req: Request) {
  try {
    const { tier, projects, views, price } = (await req.json()) as {
      tier?: string;
      projects?: number;
      views?: number;
      price?: number;
    };

    if (!tier) return Response.json({ error: "tier required" }, { status: 400 });

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json({
        advice: `Plan ${tier} ($${price}/mo) cubre ${projects} proyectos y ~${views?.toLocaleString()} pageviews/mes.`,
        fallback: true,
      });
    }

    const { text } = await generateText({
      model: google("gemini-3.6-flash"),
      prompt: `In 2 sentences Spanish, explain why Pulse plan "${tier}" at $${price}/mo fits ${projects} projects and ${views} monthly pageviews.`,
    });

    return Response.json({ advice: text.trim() });
  } catch (error) {
    console.error("[pricing-advice]", error);
    return Response.json({ error: "Advice failed" }, { status: 500 });
  }
}
