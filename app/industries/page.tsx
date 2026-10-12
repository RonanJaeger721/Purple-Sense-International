import type { Metadata } from "next";
import { Intro, Closing, Picture, Action } from "@/components/ui";
import { industries } from "@/lib/catalogue";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Industries & applications",
  description:
    "Explore possible applications of laboratory supplies, hygiene products and professional cleaning in laboratories, education and commercial environments.",
  alternates: { canonical: "/industries" },
};
export default function Industries() {
  return (
    <>
      <Intro
        eyebrow="Industries & possible applications"
        title="Different environments. Thoughtful requirements."
      >
        <p>
          Explore where scientific supplies and professional hygiene may support
          your work.
        </p>
        <p className="notice">
          These are potential application sectors, rather than claims of
          existing clients or verified sector-specific capabilities. Suitability
          is confirmed for each enquiry.
        </p>
      </Intro>
      <section className="industry-panorama wrap">
        <Picture
          src="/images/workplace.jpg"
          alt="Representative modern commercial environment"
          eager
        />
        <div>
          <p className="eyebrow">Spaces with purpose</p>
          <h2>
            What does your
            <br />
            environment need?
          </h2>
        </div>
      </section>
      <section className="industry-sections wrap">
        {industries.map(([name, description, slug], i) => (
          <article
            className="industry-detail reveal"
            id={`${slug}-${i}`}
            key={name}
          >
            <span>0{i + 1}</span>
            <div>
              <p className="eyebrow">Possible application</p>
              <h2>{name}</h2>
            </div>
            <div>
              <p>{description}</p>
              <Link className="text-link" href={`/products/category/${slug}`}>
                Explore relevant product enquiries <ArrowUpRight size={17} />
              </Link>
              <Link className="text-link" href="/request-quote?type=mixed">
                Discuss your requirements <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <Closing />
    </>
  );
}
