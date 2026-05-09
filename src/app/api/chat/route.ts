import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/chat-context";
import { isValidLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const client = new Anthropic();

// Simple in-memory rate limiting: max 10 requests per minute per IP
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60_000;
  const max = 10;

  const timestamps = rateMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < window);

  if (recent.length >= max) {
    rateMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

// Dictionary loader that works on the server without "server-only" restriction
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
  it: () => import("@/dictionaries/it.json").then((m) => m.default as Dictionary),
  es: () => import("@/dictionaries/es.json").then((m) => m.default as Dictionary),
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many messages. Please wait a moment." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const { messages, locale } = body as {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    locale: string;
  };

  if (!messages?.length || !locale) {
    return Response.json({ error: "Missing messages or locale" }, { status: 400 });
  }

  if (!isValidLocale(locale)) {
    return Response.json({ error: "Invalid locale" }, { status: 400 });
  }

  const dict = await dictionaries[locale]();
  const systemPrompt = buildSystemPrompt(dict, locale);

  // Cap conversation history to last 20 messages
  const trimmedMessages = messages.slice(-20);

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: systemPrompt,
    messages: trimmedMessages,
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`),
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "Something went wrong" })}\n\n`,
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
