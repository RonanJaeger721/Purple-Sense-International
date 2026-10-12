"use client";
import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { createWhatsAppLink } from "@/lib/enquiry.mjs";
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General enquiry");
  const [message, setMessage] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const text = `PURPLE SENSE INTERNATIONAL\n${topic.toUpperCase()}\n\nCustomer: ${name}\nPhone: ${phone}\n\n${message}`;
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setPrepared(true);
      }}
    >
      <h2>A conversation starts here.</h2>
      <p>Prepare a message and continue directly on WhatsApp.</p>
      <div className="form-grid">
        <label>
          Full name *
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPrepared(false);
            }}
            maxLength={120}
          />
        </label>
        <label>
          Phone / WhatsApp *
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPrepared(false);
            }}
            maxLength={40}
          />
        </label>
      </div>
      <label>
        Enquiry topic
        <select
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setPrepared(false);
          }}
        >
          <option>General enquiry</option>
          <option>Product quotation</option>
          <option>Cleaning service enquiry</option>
          <option>Disinfection service enquiry</option>
        </select>
      </label>
      <label>
        Your requirements *
        <textarea
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setPrepared(false);
          }}
          rows={5}
          maxLength={4000}
        />
      </label>
      <label className="consent">
        <input type="checkbox" required />
        <span>
          I agree to share these details with Purple Sense to respond to my
          enquiry. <a href="/privacy">Privacy information</a>
        </span>
      </label>
      {prepared ? (
        <div className="contact-ready">
          <pre>{text}</pre>
          <a
            href={createWhatsAppLink(text)}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Open WhatsApp <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            className="outline-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
              } catch {
                setError("Select and copy the message above.");
              }
            }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}{" "}
            {copied ? "Copied" : "Copy message"}
          </button>
          <p className="quiet">
            Tap Send in WhatsApp to deliver your message. No enquiry has been
            submitted to this website.
          </p>
          {error && <p role="alert">{error}</p>}
        </div>
      ) : (
        <button className="button" type="submit">
          Prepare my message <ArrowUpRight size={18} />
        </button>
      )}
    </form>
  );
}
