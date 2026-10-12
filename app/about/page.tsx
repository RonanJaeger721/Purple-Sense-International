import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Intro, Closing, Picture, Action } from "@/components/ui";
import { categories } from "@/lib/catalogue";
export const metadata: Metadata = {
  title: "About Purple Sense",
  description:
    "Purple Sense International supplies laboratory equipment, reagents, detergents and disinfectants, alongside professional cleaning and disinfection services.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <Intro
        eyebrow="About Purple Sense International"
        title="Supporting scientific work and professional hygiene."
      >
        <p>
          Two connected worlds. One focus on understanding what your business
          needs.
        </p>
      </Intro>
      <section className="about-story wrap">
        <div className="about-image reveal">
          <Picture
            src="/images/laboratory.jpg"
            alt="Representative laboratory setting"
          />
          <span className="image-caption">
            SCIENTIFIC PRECISION / EVERYDAY PURPOSE
          </span>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">Who we are</p>
          <h2>
            Considered solutions.
            <br />
            Clear conversations.
          </h2>
          <p>
            Purple Sense International focuses on supplying laboratory
            equipment, reagents, detergents and disinfectants, alongside
            professional disinfection and cleaning services.
          </p>
          <p>
            We bring these categories together so businesses and institutions
            can explore their requirements and submit a clear enquiry, with
            quantities, specifications and delivery needs in one place.
          </p>
          <Action href="/request-quote">Discuss your requirements</Action>
        </div>
      </section>
      <section className="about-range section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we offer</p>
            <h2>
              From the laboratory
              <br />
              to the workplace.
            </h2>
          </div>
          <p>
            Products and services that connect scientific work with practical
            facility care.
          </p>
        </div>
        <div className="range-list">
          {categories.map((c) => (
            <Link href={`/products/category/${c.slug}`} key={c.slug}>
              <span>{c.index}</span>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <ArrowUpRight />
            </Link>
          ))}
          <Link href="/services">
            <span>05</span>
            <h3>Professional services</h3>
            <p>
              Cleaning and disinfection enquiries built around your facility.
            </p>
            <ArrowUpRight />
          </Link>
        </div>
      </section>
      <section className="approach">
        <div className="wrap">
          <p className="eyebrow">Our approach</p>
          <h2>
            A good solution starts
            <br />
            with the right questions.
          </h2>
          <div className="approach-columns">
            <p>
              <strong>Understand the requirement.</strong> Tell us what you
              need, where it will be used and any details that matter to your
              work.
            </p>
            <p>
              <strong>Confirm the specifics.</strong> Product availability,
              specifications, packaging and service scope are reviewed during
              quotation.
            </p>
            <p>
              <strong>Make the next step clear.</strong> Keep your requirements
              in one request and continue the conversation directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}
