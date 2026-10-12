import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote-builder";
export const metadata: Metadata = {
  title: "Build your quotation",
  description:
    "Build a multi-item product or cleaning service quotation. Add quantities, specifications and your location, review your request and continue through WhatsApp.",
  alternates: { canonical: "/request-quote" },
};
export default function RequestQuote() {
  return <QuoteBuilder />;
}
