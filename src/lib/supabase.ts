/**
 * Supabase direct REST client for logging responses.
 * Uses PostgREST API with fetch — no extra packages required, works seamlessly in browser & server.
 */

export type ResponseEvent =
  | "message"
  | "branch"
  | "surgery_option"
  | "song_pick"
  | "proposal"
  | "tarha";

export async function saveResponse(
  event: ResponseEvent | string,
  value: string,
  metadata?: Record<string, unknown> | null
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Supabase credentials not found in .env.local. Logged locally:", {
      event,
      value,
      metadata,
    });
    return;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event,
        value,
        metadata: metadata ?? null,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ Supabase error:", err);
    } else {
      console.log(`🐾 [Supabase Saved] ${event}:`, value);
    }
  } catch (err) {
    console.error("❌ Failed to send to Supabase:", err);
  }
}
