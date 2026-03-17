import { subscribeToPostEvents } from "@/lib/liveUpdates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;
  let heartbeat: NodeJS.Timeout | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      sendEvent("connected", { ok: true });

      unsubscribe = subscribeToPostEvents((payload) => {
        sendEvent("post-created", payload);
      });

      heartbeat = setInterval(() => {
        sendEvent("ping", { ts: Date.now() });
      }, 25000);
    },
    cancel() {
      if (heartbeat) {
        clearInterval(heartbeat);
      }

      if (unsubscribe) {
        unsubscribe();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
