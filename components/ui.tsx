import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
export function Action({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button ${light ? "light" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <p className="eyebrow">
        <span className="tiny-dot" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      {children && <div className="intro-body">{children}</div>}
    </section>
  );
}
export function Closing() {
  return (
    <section className="closing">
      <div className="wrap">
        <p className="eyebrow">Your next step</p>
        <h2>
          Tell us what you need.
          <br />
          <span>
            We’ll help you take
            <br className="mobile-only" /> the next step.
          </span>
        </h2>
        <div className="actions">
          <Action href="/request-quote" light>
            Build my quote
          </Action>
          <Link className="text-link" href="/contact">
            Contact Purple Sense <ArrowRight size={18} />
          </Link>
        </div>
        <span className="closing-monogram" aria-hidden="true">
          PS
        </span>
      </div>
    </section>
  );
}
export function Picture({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width="1600"
      height="1100"
      loading={eager ? "eager" : "lazy"}
    />
  );
}
