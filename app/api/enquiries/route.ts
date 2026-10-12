import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { emailConfigured, deliverEnquiry } from "@/lib/email";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
export async function GET() {
  return NextResponse.json(
    {
      emailConfigured: emailConfigured(),
      storageConfigured: Boolean(process.env.DATABASE_URL),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { error: "This request must originate from the website." },
      { status: 403 },
    );
  if (!emailConfigured())
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Please send your prepared request through WhatsApp. No enquiry has been received.",
      },
      { status: 503 },
    );
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  const bucket = attempts.get(ip);
  if (bucket && bucket.count >= 5)
    return NextResponse.json(
      {
        error:
          "Too many email attempts. Please try again later or use WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  attempts.set(ip, {
    count: (bucket?.count || 0) + 1,
    expires: bucket?.expires || now + 600000,
  });
  try {
    const content = await request.text();
    if (content.length > 150000)
      return NextResponse.json(
        { error: "Your request is too large." },
        { status: 413 },
      );
    const parsed = enquirySchema.safeParse(JSON.parse(content));
    if (!parsed.success)
      return NextResponse.json(
        {
          error: "Check your enquiry details.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const result = await deliverEnquiry(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json(
        { error: "Enter a valid enquiry request." },
        { status: 400 },
      );
    console.error("Enquiry delivery failed", {
      type: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        error:
          "Your enquiry could not be emailed. Please use WhatsApp to send the complete request.",
      },
      { status: 502 },
    );
  }
}
