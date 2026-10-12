import type { Metadata } from "next";
import { Intro, Closing, Picture, Action } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Cleaning & disinfection services",
  description:
    "Request professional cleaning and disinfection services. Specify your facility, location, approximate size and preferred schedule for a tailored quotation.",
  alternates: { canonical: "/services" },
};
export default function Services() {
  return (
    <>
      <Intro
        eyebrow="Professional cleaning & disinfection"
        title="Clean spaces. Professional attention."
      >
        <p>
          Request cleaning and disinfection services tailored to your facility
          and operational needs.
        </p>
        <Action href="/request-quote?type=service">
          Request a service quotation
        </Action>
      </Intro>
      <section className="service-banner wrap">
        <Picture
          src="/images/service.jpg"
          alt="Representative cleaner attending to an indoor space"
          eager
        />
        <span className="image-caption">
          ILLUSTRATIVE PHOTOGRAPHY / PROFESSIONAL CARE
        </span>
      </section>
      <section className="service-offerings section wrap">
        <div>
          <p className="eyebrow">Our service offering</p>
          <h2>
            Care shaped
            <br />
            around your space.
          </h2>
          <p>
            Tell us what your facility requires. Scope, suitability, scheduling
            and availability are confirmed as part of your quotation.
          </p>
        </div>
        <div>
          <article className="reveal">
            <span>01</span>
            <h3>Professional cleaning</h3>
            <p>
              Describe your facility, the areas requiring attention and the
              cleaning work you have in mind. Include access requirements and
              your preferred timing.
            </p>
            <Link
              className="text-link"
              href="/request-quote?type=service&service=Professional%20cleaning"
            >
              Enquire about cleaning <ArrowRight size={17} />
            </Link>
          </article>
          <article className="reveal">
            <span>02</span>
            <h3>Disinfection services</h3>
            <p>
              Share the environment, surfaces and intended scope. Specific
              methods, products and application suitability must be assessed and
              confirmed.
            </p>
            <Link
              className="text-link"
              href="/request-quote?type=service&service=Disinfection%20services"
            >
              Enquire about disinfection <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </section>
      <section className="service-scope wrap">
        <div>
          <p className="eyebrow">Tell us about your facility</p>
          <h2>
            Every space has
            <br />
            its own requirements.
          </h2>
        </div>
        <div>
          <p>
            Office and commercial spaces, institutional facilities, scheduled
            cleaning and specialised requirements are useful starting points for
            an enquiry. These are enquiry examples; specific service
            capabilities are confirmed individually.
          </p>
          <ul>
            <li>Property or facility type and approximate area</li>
            <li>Location, access and operational restrictions</li>
            <li>Once-off or recurring requirements</li>
            <li>Preferred date and any additional details</li>
          </ul>
          <Action href="/request-quote?type=service">
            Build your service request
          </Action>
        </div>
      </section>
      <section className="faq section wrap">
        <p className="eyebrow">Before you enquire</p>
        <h2>A little more clarity.</h2>
        {[
          [
            "Can I combine products and services?",
            "Yes. Choose Mixed enquiry in the quotation builder to include product quantities and service requirements in the same WhatsApp request.",
          ],
          [
            "How is a service quotation prepared?",
            "Provide the facility type, approximate area, location, timing and required work. The team can review the scope and discuss pricing and availability with you.",
          ],
          [
            "Is delivery or service coverage confirmed?",
            "Coverage and arrangements are assessed for your specific location. Add your city or town and area when preparing your request.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <Closing />
    </>
  );
}
