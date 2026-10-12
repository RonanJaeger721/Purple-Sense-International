"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  ClipboardList,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useQuote } from "./quote-context";
import { createWhatsAppLink } from "@/lib/enquiry.mjs";
export function Wordmark() {
  return (
    <span className="wordmark">
      <strong>
        PURPLE SENSE<span className="brand-dot">.</span>
      </strong>
      <small>INTERNATIONAL</small>
    </span>
  );
}
const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["Contact", "/contact"],
];
export function Header() {
  const path = usePathname();
  const { items } = useQuote();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [path]);
  useEffect(() => {
    const scroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last.current) > 8) {
        setHidden(y > last.current && y > 160);
        last.current = y;
      }
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`header ${hidden && !open ? "hidden" : ""}`}>
        <Link href="/" aria-label="Purple Sense International home">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, url]) => (
            <Link
              key={url}
              className={
                path === url || (url !== "/" && path.startsWith(url))
                  ? "active"
                  : ""
              }
              href={url}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link
            href="/request-quote"
            className="basket"
            aria-label={`Quote basket, ${items.length} ${items.length === 1 ? "item" : "items"}`}
          >
            <ClipboardList size={19} />
            <span>{items.length}</span>
          </Link>
          <Link className="button small nav-quote" href="/request-quote">
            Request a quote <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map(([name, url], i) => (
              <Link key={url} href={url} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {name}
                <ArrowUpRight size={22} />
              </Link>
            ))}
            <a
              href={createWhatsAppLink(
                "Hello Purple Sense International, I would like to discuss my requirements.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us <MessageCircle />
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top wrap">
        <div>
          <Wordmark />
          <p>
            Scientific supplies.
            <br />
            Professional hygiene solutions.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          {links.slice(1).map(([name, url]) => (
            <Link key={url} href={url}>
              {name}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <span className="eyebrow">Let’s start a conversation</span>
          <a
            href={createWhatsAppLink(
              "Hello Purple Sense International, I have an enquiry.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            +263 777 218 496 <ArrowUpRight size={20} />
          </a>
          <Link href="/request-quote" className="text-link">
            Build your quotation <ArrowRight size={17} />
          </Link>
          <p>
            Pricing, availability and delivery
            <br />
            confirmed during quotation.
          </p>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} Purple Sense International</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <span>Provisional typographic identity</span>
        </div>
        <a
          href="https://wa.me/263789937251"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website Designed &amp; Developed by Jaeger Media
        </a>
      </div>
    </footer>
  );
}
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      if (reduced) el.classList.add("visible");
      else observer.observe(el);
    });
    return () => observer.disconnect();
  }, [path]);
  return null;
}
