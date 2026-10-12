import type { Metadata } from "next";
import { Intro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/enquiry.mjs";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Contact Purple Sense",
  description:
    "Contact Purple Sense International on WhatsApp at +263777218496 for laboratory supplies, hygiene products and cleaning or disinfection service enquiries.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <Intro eyebrow="Let’s talk" title="Let’s discuss your requirements.">
        <p>
          Products, services or a question before you start. Tell us what you
          have in mind.
        </p>
      </Intro>
      <section className="contact-layout wrap">
        <div className="contact-info">
          <p className="eyebrow">Direct contact</p>
          <a
            className="contact-number"
            href={createWhatsAppLink(
              "Hello Purple Sense International, I would like to discuss my requirements.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            +263 777
            <br />
            218 496 <ArrowUpRight size={30} />
          </a>
          <a
            className="text-link"
            href={createWhatsAppLink(
              "Hello Purple Sense International, I have an enquiry.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
          <a className="text-link" href="tel:+263777218496">
            <Phone size={18} />
            Call Purple Sense
          </a>
          <div className="contact-paths">
            <Link href="/request-quote">
              Product quotations <ArrowUpRight size={18} />
            </Link>
            <Link href="/request-quote?type=service">
              Cleaning &amp; disinfection enquiries <ArrowUpRight size={18} />
            </Link>
          </div>
          <p className="quiet">
            Email contact will be published once confirmed.
            <br />
            For now, use the verified WhatsApp number.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
