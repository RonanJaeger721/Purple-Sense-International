import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/components/quote-context";
import { Header, Footer, Motion } from "@/components/chrome";
import { siteUrl } from "@/lib/site";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default:
      "Purple Sense International | Scientific Supplies & Hygiene Solutions",
    template: "%s | Purple Sense International",
  },
  description:
    "Explore laboratory equipment, reagents, detergents, disinfectants and professional cleaning services. Build a quotation enquiry with Purple Sense International.",
  openGraph: {
    type: "website",
    siteName: "Purple Sense International",
    images: [{ url: "/images/glassware.webp", width: 1536, height: 1024 }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dm.variable}`}>
        <QuoteProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Purple Sense International",
                url: siteUrl,
                telephone: "+263777218496",
                description:
                  "Laboratory equipment, reagents, detergents, disinfectants and professional cleaning and disinfection services.",
              }).replace(/</g, "\\u003c"),
            }}
          />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Motion />
        </QuoteProvider>
      </body>
    </html>
  );
}
