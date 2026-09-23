/**
 * Analytics and Event Tracking Abstraction
 * Currently logs cleanly to console with structured event payloads.
 * Prepared for plug-and-play Supabase or telemetry backend integration.
 */

export type TrackingEventType =
  | "opened"
  | "miss_score"
  | "are_you_sure_clicked"
  | "escalation_step"
  | "slider_overridden"
  | "arabic_answer"
  | "video_played"
  | "message_submitted";

export interface EventPayloadMap {
  opened: { timestamp: string; userAgent?: string };
  miss_score: { score: number };
  are_you_sure_clicked: { originalScore: number; attemptCount: number };
  escalation_step: { stepIndex: number; question: string };
  slider_overridden: { fromScore: number; toScore: number };
  arabic_answer: { answer: "yes" | "no" | string };
  video_played: { timestamp: string };
  message_submitted: { message: string; timestamp: string };
}

export function trackEvent<T extends TrackingEventType>(
  event: T,
  payload?: T extends keyof EventPayloadMap ? EventPayloadMap[T] : Record<string, unknown>
) {
  const timestamp = new Date().toISOString();
  const eventData = {
    event,
    timestamp,
    ...payload,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log(`🐾 [TRACKING] ${event}:`, eventData);
  } else {
    // In production, keep console clean or send to analytics endpoint
    console.log(`🐾 [TRACKING] ${event}`, eventData);
  }

  // TODO: Supabase integration point
  // Example:
  // const supabase = getSupabaseClient();
  // await supabase.from('experience_events').insert(eventData);
}

/**
 * Message submission abstraction prepared for Supabase
 */
export async function submitMessage(message: string): Promise<{ success: boolean; error?: string }> {
  trackEvent("message_submitted", {
    message,
    timestamp: new Date().toISOString(),
  });

  // Simulated slight async network delay for satisfying user feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  // TODO: connect Supabase client here:
  // const { data, error } = await supabase.from('girlfriend_messages').insert([{ message, created_at: new Date() }]);
  // if (error) throw error;

  return { success: true };
}
