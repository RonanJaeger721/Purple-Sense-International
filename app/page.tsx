import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Hero,
  Discovery,
  ScienceScene,
  QuoteSteps,
} from "@/components/home-scenes";
import { categories, industries } from "@/lib/catalogue";
import { Action, Closing, Picture } from "@/components/ui";
export default function Home() {
  return (
    <>
      <Hero />
      <section id="expertise" className="expertise section wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Our expertise</p>
            <h2>
              Essential products.
              <br />
              Professional solutions.
            </h2>
          </div>
          <p>
            From the tools that support discovery to the care that supports
            everyday operations.
          </p>
        </div>
        <div className="expertise-layout">
          <Link
            className="expertise-lead reveal"
            href="/products/category/laboratory-equipment"
          >
            <Picture
              src="/images/laboratory.jpg"
              alt="Representative laboratory workspace"
            />
            <div>
              <span className="eyebrow">01 / Scientific supplies</span>
              <h3>
                For the work
                <br />
                that moves us forward.
              </h3>
              <span className="round-arrow">
                <ArrowUpRight />
              </span>
            </div>
          </Link>
          <div className="expertise-list">
            {categories.map((c) => (
              <Link
                className="reveal"
                href={`/products/category/${c.slug}`}
                key={c.slug}
              >
                <small>{c.index}</small>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
                <ArrowUpRight size={23} />
              </Link>
            ))}
            <Link className="reveal" href="/services">
              <small>05</small>
              <div>
                <h3>Cleaning &amp; disinfection services</h3>
                <p>
                  Professional service enquiries tailored to your facility and
                  requirements.
                </p>
              </div>
              <ArrowUpRight size={23} />
            </Link>
          </div>
        </div>
      </section>
      <Discovery />
      <ScienceScene />
      <section className="values section wrap">
        <div className="reveal">
          <p className="eyebrow">Why Purple Sense</p>
          <h2>
            Your requirements.
            <br />
            <span>Our focus.</span>
          </h2>
          <p className="values-intro">
            Different environments have different needs. Bring your product and
            service requirements together in one convenient place.
          </p>
        </div>
        <div className="values-list">
          {[
            [
              "A broad product range",
              "Laboratory and hygiene essentials presented in one organised catalogue.",
            ],
            [
              "Quotations made simple",
              "Choose products, specify quantities and send an enquiry without unnecessary steps.",
            ],
            [
              "Delivery enquiries",
              "Provide your destination so delivery arrangements can be assessed with your quotation.",
            ],
            [
              "Practical service requests",
              "Describe your facility and submit cleaning and disinfection enquiries directly.",
            ],
          ].map(([title, copy], i) => (
            <article className="reveal" key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="service-feature wrap">
        <div className="service-photo reveal">
          <Picture
            src="/images/service.jpg"
            alt="Representative professional cleaning activity"
          />
          <small>ILLUSTRATIVE SERVICE PHOTOGRAPHY</small>
        </div>
        <div className="service-copy reveal">
          <p className="eyebrow">Beyond the product</p>
          <h2>
            Professional care
            <br />
            for the spaces
            <br />
            that matter.
          </h2>
          <p>
            Tell us about your facility, the cleaning or disinfection required
            and your preferred schedule. Our team can review the details and
            prepare a quotation.
          </p>
          <Action href="/request-quote?type=service">
            Request a service quote
          </Action>
          <Link className="text-link" href="/services">
            Discover our services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <QuoteSteps />
      <section className="industry-home section wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Possible applications</p>
            <h2>
              Solutions for
              <br />
              different environments.
            </h2>
          </div>
          <div>
            <p>
              Explore how our categories may relate to your work. Suitability
              and service scope are confirmed with each enquiry.
            </p>
            <Link className="text-link" href="/industries">
              Explore industries <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="industry-line">
          {industries.map(([name, , slug], i) => (
            <Link href={`/industries#${slug}-${i}`} key={name}>
              <small>0{i + 1}</small>
              <span>{name}</span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
