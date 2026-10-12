import { createHash } from "node:crypto";
import postgres from "postgres";
import { formatEnquiry } from "./enquiry.mjs";
export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.QUOTES_TO_EMAIL &&
    process.env.QUOTES_FROM_EMAIL,
  );
}
export async function deliverEnquiry(
  data: Parameters<typeof formatEnquiry>[0] & { reference: string },
) {
  const content = formatEnquiry(data, data.reference);
  const digest = createHash("sha256").update(content).digest("hex");
  const idempotencyKey = `${data.reference}-${digest}`;
  const sql = process.env.DATABASE_URL
    ? postgres(process.env.DATABASE_URL, {
        max: 1,
        idle_timeout: 5,
        connect_timeout: 5,
      })
    : null;
  try {
    if (sql) {
      await sql`INSERT INTO quote_enquiries (reference, payload, status) VALUES (${data.reference}, ${sql.json(data)}, 'pending') ON CONFLICT (reference) DO NOTHING`;
      const existing =
        await sql`SELECT payload,status FROM quote_enquiries WHERE reference=${data.reference}`;
      if (existing[0]?.status === "emailed")
        return { reference: data.reference, emailed: true, stored: true };
      if (
        existing[0] &&
        formatEnquiry(existing[0].payload, data.reference) !== content
      )
        throw Error("REFERENCE_CONFLICT");
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: process.env.QUOTES_FROM_EMAIL,
        to: [process.env.QUOTES_TO_EMAIL],
        subject: `${data.reference} | ${data.kind} | ${data.name}`,
        text: content,
        ...(data.email ? { reply_to: data.email } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error("Enquiry email rejected", {
        reference: data.reference,
        status: response.status,
      });
      if (sql)
        await sql`UPDATE quote_enquiries SET status='failed' WHERE reference=${data.reference}`;
      throw Error("EMAIL_FAILED");
    }
    if (sql)
      await sql`UPDATE quote_enquiries SET status='emailed' WHERE reference=${data.reference}`;
    return { reference: data.reference, emailed: true, stored: Boolean(sql) };
  } finally {
    if (sql) await sql.end({ timeout: 2 });
  }
}
