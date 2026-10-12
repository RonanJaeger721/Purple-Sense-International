"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { categories, products } from "@/lib/catalogue";
import { useQuote } from "./quote-context";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [world, setWorld] = useState<"laboratory" | "hygiene">("laboratory");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          const p = Math.min(1, Math.max(0, window.scrollY / 700));
          ref.current.style.setProperty("--hero-progress", String(p));
        }
      });
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const lab = world === "laboratory";
  return (
    <section className="hero-compose" ref={ref} aria-labelledby="hero-title">
      <svg
        className="hero-clip-definitions"
        aria-hidden="true"
        width="0"
        height="0"
      >
        <defs>
          <clipPath id="science-aperture" clipPathUnits="objectBoundingBox">
            <path d="M .20 0 H .96 Q 1 0 1 .05 V .75 Q 1 .79 .96 .79 H .86 Q .81 .79 .81 .84 V .95 Q .81 1 .76 1 H .04 Q 0 1 0 .95 V .23 Q 0 .18 .05 .18 H .15 Q .20 .18 .20 .13 Z" />
          </clipPath>
          <clipPath id="workplace-aperture" clipPathUnits="objectBoundingBox">
            <path d="M .03 0 H .77 Q .83 0 .87 .1 L .97 .37 Q 1 .43 1 .53 V .93 Q 1 1 .96 1 H .04 Q 0 1 0 .93 V .08 Q 0 0 .03 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="hero-editorial wrap">
        <div className="hero-statement">
          <p className="eyebrow">
            <span className="tiny-dot" />
            Precision meets protection
          </p>
          <h1 id="hero-title">
            Precision <br />
            for the lab.
            <br />
            <span>
              Confidence in <br />
              every space.
            </span>
          </h1>
          <p className="hero-summary">
            Laboratory equipment and reagents. Detergents and disinfectants.
            Professional care for your spaces.
          </p>
          <div className="hero-action-pair">
            <Link className="button" href="/products">
              Explore products <ArrowUpRight size={18} />
            </Link>
            <Link className="text-link" href="/request-quote">
              Request a quote <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-subject">
          <div
            className="hero-mode-controls"
            aria-label="Choose your environment"
          >
            <button onClick={() => setWorld("laboratory")} aria-pressed={lab}>
              The laboratory
            </button>
            <button onClick={() => setWorld("hygiene")} aria-pressed={!lab}>
              Everyday hygiene
            </button>
          </div>
          <div className="hero-aperture">
            <img
              className={lab ? "is-active" : ""}
              src="/images/glassware.webp"
              alt="Illustrative laboratory glassware with translucent violet liquid"
              aria-hidden={!lab}
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <img
              className={!lab ? "is-active" : ""}
              src="/images/hygiene.jpg"
              alt="Representative professional surface cleaning with protective gloves"
              aria-hidden={lab}
              width="1400"
              height="933"
              loading="lazy"
            />
            <div className="hero-aperture-marker" aria-hidden="true">
              <span>PS / SCIENCE &amp; CARE</span>
              <div>
                {Array.from({ length: 11 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
            </div>
            <span className="hero-image-note">
              ILLUSTRATIVE CATEGORY IMAGERY
            </span>
          </div>
          <div className="hero-subject-caption" aria-live="polite">
            <span className="hero-scene-number">{lab ? "01" : "02"}</span>
            <p>
              {lab ? "Scientific" : "Professional"}
              <br />
              {lab ? "precision." : "hygiene."}
            </p>
          </div>
          <Link
            className="hero-subject-destination"
            href={
              lab
                ? "/products/category/laboratory-equipment"
                : "/products/category/disinfectants"
            }
          >
            <span>
              {lab ? "Explore laboratory supplies" : "Explore hygiene products"}
            </span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <Link className="hero-workplace" href="/services">
          <div className="hero-workplace-image">
            <img
              src="/images/workplace.jpg"
              alt="Representative bright commercial workplace"
              width="1600"
              height="1100"
            />
            <span className="hero-workplace-shade" />
          </div>
          <div className="hero-workplace-copy">
            <span className="eyebrow">Beyond the laboratory</span>
            <h2>
              Care for the spaces
              <br />
              that matter.
            </h2>
            <span className="hero-service-link">
              Cleaning &amp; disinfection <ArrowUpRight size={16} />
            </span>
          </div>
          <span className="hero-workplace-label">ILLUSTRATIVE ENVIRONMENT</span>
        </Link>
      </div>
      <div className="hero-category-line wrap">
        <p>
          Scientific supplies.
          <br />
          <span>Professional hygiene solutions.</span>
        </p>
        <div>
          {categories.map((c) => (
            <Link href={"/products/category/" + c.slug} key={c.slug}>
              {c.short}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
        <a
          className="hero-discover"
          href="#expertise"
          aria-label="Discover Purple Sense expertise"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
export function Discovery() {
  const [active, setActive] = useState(categories[0].slug);
  const { add } = useQuote();
  const category = categories.find((x) => x.slug === active)!;
  const featured = products.filter((x) => x.category === active);
  return (
    <section className="discovery section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A clearer way to enquire</p>
            <h2>
              Find exactly what
              <br />
              your business needs.
            </h2>
          </div>
          <p>
            Explore a category, describe your requirements and add them to one
            simple quotation.
          </p>
        </div>
        <div
          className="category-tabs"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={active === c.slug}
              aria-controls="discovery-panel"
              id={`tab-${c.slug}`}
              onClick={() => setActive(c.slug)}
            >
              {c.short}
              <span>{c.index}</span>
            </button>
          ))}
        </div>
        <div
          className="discovery-panel"
          id="discovery-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          key={active}
        >
          <div className="discovery-image">
            <img
              src={category.image}
              alt={`Representative ${category.name.toLowerCase()} photography`}
              width="1000"
              height="800"
              loading="lazy"
            />
            <span>REPRESENTATIVE CATEGORY IMAGERY</span>
          </div>
          <div className="discovery-content">
            <p className="eyebrow">{category.name}</p>
            <h3>{category.intro}</h3>
            <p>{category.description}</p>
            <div className="discovery-items">
              {featured.map((p) => (
                <div key={p.slug}>
                  <Link href={`/products/${p.slug}`}>
                    {p.name}
                    <ArrowUpRight size={17} />
                  </Link>
                  <button
                    onClick={() =>
                      add({
                        name: p.name,
                        quantity: 1,
                        unit: "Requested units",
                        notes: "",
                      })
                    }
                    aria-label={`Add ${p.name} to quote`}
                  >
                    Add to quote <span>+</span>
                  </button>
                </div>
              ))}
            </div>
            <small>
              Illustrative enquiry entries. Exact products, specifications and
              availability are confirmed during quotation.
            </small>
            <Link className="text-link" href={`/products/category/${active}`}>
              Explore this category <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ScienceScene() {
  const [world, setWorld] = useState<"science" | "hygiene">("science");
  return (
    <section className={`science-scene ${world}`}>
      <div className="scene-images">
        <img
          className={world === "science" ? "selected" : ""}
          src="/images/laboratory.jpg"
          alt="Representative laboratory environment"
          width="1600"
          height="1100"
          loading="lazy"
        />
        <img
          className={world === "hygiene" ? "selected" : ""}
          src="/images/workplace.jpg"
          alt="Representative bright commercial workplace"
          width="1600"
          height="1100"
          loading="lazy"
        />
      </div>
      <div className="scene-content wrap">
        <p className="eyebrow">Precision meets protection</p>
        <h2>
          Different environments.
          <br />
          One considered approach.
        </h2>
        <p>
          {world === "science"
            ? "Supporting precision in the laboratory, with equipment and reagent enquiries built around your work."
            : "Supporting confidence in the workplace, with hygiene products and professional service enquiries built around your space."}
        </p>
        <div className="world-toggle" aria-label="Explore science and hygiene">
          <button
            className={world === "science" ? "active" : ""}
            aria-pressed={world === "science"}
            onClick={() => setWorld("science")}
          >
            01 / The laboratory
          </button>
          <button
            className={world === "hygiene" ? "active" : ""}
            aria-pressed={world === "hygiene"}
            onClick={() => setWorld("hygiene")}
          >
            02 / The workplace
          </button>
        </div>
        <Link
          className="text-link"
          href={
            world === "science"
              ? "/products/category/laboratory-equipment"
              : "/services"
          }
        >
          {world === "science"
            ? "Explore laboratory supplies"
            : "Explore professional services"}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <span className="scene-caption">
        ILLUSTRATIVE ENVIRONMENT /{" "}
        {world === "science" ? "SCIENTIFIC PRECISION" : "PROFESSIONAL HYGIENE"}
      </span>
    </section>
  );
}
export function QuoteSteps() {
  const [step, setStep] = useState(0);
  const content = [
    [
      "Browse & select",
      "Choose products or services that match your requirements. Add catalogue entries or describe an unlisted item.",
    ],
    [
      "Add your details",
      "Set quantities, specifications and your delivery or service area. Keep all your requirements together.",
    ],
    [
      "Review & send",
      "Review the complete request, then open WhatsApp and tap Send to begin the conversation.",
    ],
  ];
  return (
    <section className="quote-steps section wrap">
      <div>
        <p className="eyebrow">Simple by design</p>
        <h2>
          Three steps.
          <br />
          One simple enquiry.
        </h2>
        <Link className="text-link" href="/request-quote">
          Start your quotation <ArrowRight size={18} />
        </Link>
      </div>
      <div>
        <div className="step-controls" aria-label="Quotation process">
          {content.map((c, i) => (
            <button
              key={c[0]}
              aria-pressed={i === step}
              className={i === step ? "active" : ""}
              onClick={() => setStep(i)}
            >
              <span>
                {i < step ? (
                  <Check size={18} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {c[0]}
            </button>
          ))}
        </div>
        <div className="step-content" key={step}>
          <span className="large-index">0{step + 1}</span>
          <h3>{content[step][0]}</h3>
          <p>{content[step][1]}</p>
        </div>
      </div>
    </section>
  );
}
