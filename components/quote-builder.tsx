"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  MessageCircle,
  Copy,
  Check,
  Mail,
  ClipboardList,
} from "lucide-react";
import { useQuote } from "./quote-context";
import { products, categories } from "@/lib/catalogue";
import {
  createWhatsAppLink,
  formatEnquiry,
  makeReference,
} from "@/lib/enquiry.mjs";
const steps = [
  "Requirements",
  "Quantities",
  "Location",
  "Your details",
  "Review",
];
const initial = {
  kind: "Product quotation",
  service: "Professional cleaning",
  facility: "",
  size: "",
  serviceDate: "",
  frequency: "Not sure",
  serviceNotes: "",
  country: "",
  city: "",
  area: "",
  address: "",
  delivery: "Discuss",
  date: "",
  deliveryNotes: "",
  name: "",
  organisation: "",
  phone: "",
  email: "",
  contactMethod: "WhatsApp",
  notes: "",
  consent: false,
  website: "",
};
type Data = typeof initial;
function Field({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder = "",
  maxLength = 500,
}: {
  label: string;
  name: keyof Data;
  value: string;
  onChange: (key: keyof Data, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label>
      {label}
      {required && <span className="required"> *</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </label>
  );
}
export function QuoteBuilder() {
  const { items, add, update, remove, ready } = useQuote();
  const [data, setData] = useState(initial);
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState("");
  const [custom, setCustom] = useState("");
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [copy, setCopy] = useState(false);
  const [emailStatus, setEmailStatus] = useState<
    "unknown" | "disabled" | "enabled"
  >("unknown");
  const [sending, setSending] = useState(false);
  const [emailResult, setEmailResult] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setData((old) => ({
      ...old,
      kind:
        params.get("type") === "service"
          ? "Cleaning service quotation"
          : params.get("type") === "mixed"
            ? "Mixed enquiry"
            : old.kind,
      service: params.get("service") || old.service,
    }));
    setReference(makeReference());
    fetch("/api/enquiries")
      .then((r) => r.json())
      .then((r) => setEmailStatus(r.emailConfigured ? "enabled" : "disabled"))
      .catch(() => setEmailStatus("disabled"));
  }, []);
  const change = (key: keyof Data, value: string) => {
    setData((old) => ({ ...old, [key]: value }));
    setEmailResult("");
  };
  const move = (n: number) => {
    setStep(n);
    setError("");
    setEmailResult("");
    setTimeout(() => {
      heading.current?.focus();
      document
        .querySelector(".quote-shell")
        ?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
    }, 0);
  };
  const services = data.kind !== "Product quotation";
  const productMode = data.kind !== "Cleaning service quotation";
  const enquiry = { ...data, items: productMode ? items : [] };
  const message = reference ? formatEnquiry(enquiry, reference) : "";
  function next(e: React.FormEvent) {
    e.preventDefault();
    if (step === 0 && productMode && items.length === 0) {
      setError("Add at least one catalogue or custom item to continue.");
      return;
    }
    if (step === 1 && productMode && items.length === 0) {
      setError("Add at least one product, or choose a service enquiry.");
      return;
    }
    if (
      step === 1 &&
      productMode &&
      items.some(
        (x) =>
          !x.name.trim() ||
          !x.unit.trim() ||
          !Number.isInteger(x.quantity) ||
          x.quantity < 1 ||
          x.quantity > 999999,
      )
    ) {
      setError(
        "Each item needs a description, a unit and a whole quantity from 1 to 999,999.",
      );
      return;
    }
    if (
      step === 3 &&
      (!data.name.trim() || !/[0-9]{6}/.test(data.phone.replace(/[^0-9]/g, "")))
    ) {
      setError("Enter your name and a valid phone number.");
      return;
    }
    if (step === 3 && data.contactMethod === "Email" && !data.email.trim()) {
      setError("Enter an email address for your preferred contact method.");
      return;
    }
    move(step + 1);
  }
  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(message);
      setCopy(true);
      setTimeout(() => setCopy(false), 3000);
    } catch {
      setError(
        "Automatic copying is unavailable. Select and copy the complete request below.",
      );
    }
  }
  async function sendEmail() {
    if (sending) return;
    setSending(true);
    setEmailResult("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": reference,
        },
        body: JSON.stringify({ ...enquiry, reference }),
      });
      const result = await response.json();
      if (!response.ok)
        throw Error(
          result.error ||
            "Email delivery failed. Please continue through WhatsApp.",
        );
      setEmailResult(
        `Your request was emailed to Purple Sense. Reference: ${result.reference}.`,
      );
    } catch (e) {
      setEmailResult(
        e instanceof Error
          ? e.message
          : "Email delivery failed. Please use WhatsApp.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <section className="quote-shell wrap">
      <aside className="quote-sidebar">
        <p className="eyebrow">Your quotation</p>
        <h1>
          A clearer way
          <br />
          to ask.
        </h1>
        <p>Bring every requirement into one conversation.</p>
        <ol className="quote-progress">
          {steps.map((name, i) => (
            <li
              key={name}
              className={step === i ? "current" : step > i ? "complete" : ""}
            >
              <button
                type="button"
                disabled={i > step}
                onClick={() => move(i)}
                aria-current={step === i ? "step" : undefined}
              >
                <span>{i < step ? <Check size={16} /> : i + 1}</span>
                {name}
              </button>
            </li>
          ))}
        </ol>
        <div className="quote-sidebar-note">
          <ClipboardList size={23} />
          <p>
            {items.length} basket {items.length === 1 ? "item" : "items"}
            <br />
            <small>Saved in this browser</small>
          </p>
        </div>
        <p className="quiet">
          A quotation enquiry, with pricing and availability confirmed by the
          team.
        </p>
      </aside>
      <div className="quote-form-panel">
        <div className="quote-step-heading">
          <p className="eyebrow">Step {step + 1} of 5</p>
          <h2 ref={heading} tabIndex={-1}>
            {
              [
                "What do you need?",
                "Make the details clear.",
                "Where is it needed?",
                "Let’s stay in touch.",
                "Review your request.",
              ][step]
            }
          </h2>
          <p>
            {
              [
                "Select your enquiry type, add products or describe the service you need.",
                "Check quantities and requested units. Add any specifications that matter.",
                "Add your delivery or service location so arrangements can be discussed.",
                "These details help the team respond to your enquiry.",
                "Check everything below, then open WhatsApp and tap Send.",
              ][step]
            }
          </p>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {step < 4 ? (
          <form onSubmit={next}>
            {step === 0 && (
              <>
                <fieldset className="enquiry-type">
                  <legend className="sr-only">Enquiry type</legend>
                  {[
                    "Product quotation",
                    "Cleaning service quotation",
                    "Mixed enquiry",
                  ].map((kind) => (
                    <label
                      className={data.kind === kind ? "selected" : ""}
                      key={kind}
                    >
                      <input
                        type="radio"
                        name="kind"
                        checked={data.kind === kind}
                        onChange={() => change("kind", kind)}
                      />
                      <span>{kind}</span>
                    </label>
                  ))}
                </fieldset>
                {productMode && (
                  <div className="requirements-block">
                    <h3>Products &amp; supplies</h3>
                    <p className="quiet">
                      Add catalogue examples or describe an unlisted product.
                    </p>
                    <label>
                      Choose a catalogue enquiry
                      <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                      >
                        <option value="">Select an enquiry entry</option>
                        {categories.map((c) => (
                          <optgroup key={c.slug} label={c.name}>
                            {products
                              .filter((p) => p.category === c.slug)
                              .map((p) => (
                                <option key={p.slug} value={p.slug}>
                                  {p.name}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                    </label>
                    <button
                      className="outline-button"
                      type="button"
                      disabled={!selected || !ready}
                      onClick={() => {
                        const p = products.find((p) => p.slug === selected)!;
                        add({
                          name: p.name,
                          quantity: 1,
                          unit: "Requested units",
                          notes: "",
                        });
                        setSelected("");
                      }}
                    >
                      Add selected item <Plus size={17} />
                    </button>
                    <div className="custom-item">
                      <label>
                        Or describe an unlisted product
                        <input
                          value={custom}
                          onChange={(e) => setCustom(e.target.value)}
                          maxLength={200}
                          placeholder="e.g. the product or equipment you need"
                        />
                      </label>
                      <button
                        type="button"
                        className="outline-button"
                        disabled={!custom.trim() || !ready}
                        onClick={() => {
                          add({
                            name: custom.trim(),
                            quantity: 1,
                            unit: "Requested units",
                            notes: "",
                          });
                          setCustom("");
                        }}
                      >
                        Add another item <Plus size={17} />
                      </button>
                    </div>
                    <div className="selected-items" aria-live="polite">
                      {items.map((item) => (
                        <div key={item.id}>
                          <span>{item.name}</span>
                          <small>× {item.quantity}</small>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => remove(item.id)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Link className="text-link" href="/products">
                      Browse the full catalogue <ArrowRight size={17} />
                    </Link>
                  </div>
                )}
                {services && (
                  <div className="requirements-block">
                    <h3>Service requirements</h3>
                    <div className="form-grid">
                      <label>
                        Service required
                        <select
                          value={data.service}
                          onChange={(e) => change("service", e.target.value)}
                        >
                          <option>Professional cleaning</option>
                          <option>Disinfection services</option>
                          <option>Cleaning and disinfection</option>
                          <option>Specialised enquiry</option>
                        </select>
                      </label>
                      <Field
                        label="Property / facility type"
                        name="facility"
                        value={data.facility}
                        onChange={change}
                        required
                        placeholder="Office, institution or other facility"
                      />
                      <Field
                        label="Approximate area / size"
                        name="size"
                        value={data.size}
                        onChange={change}
                        placeholder="Include the unit, if known"
                      />
                      <Field
                        label="Preferred service date"
                        name="serviceDate"
                        value={data.serviceDate}
                        onChange={change}
                        type="date"
                      />
                      <label>
                        Frequency
                        <select
                          value={data.frequency}
                          onChange={(e) => change("frequency", e.target.value)}
                        >
                          <option>Not sure</option>
                          <option>Once-off</option>
                          <option>Recurring</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      Additional service requirements
                      <textarea
                        value={data.serviceNotes}
                        onChange={(e) => change("serviceNotes", e.target.value)}
                        maxLength={4000}
                        rows={4}
                        placeholder="Describe the work, surfaces, access and any restrictions."
                      />
                    </label>
                  </div>
                )}
              </>
            )}
            {step === 1 && (
              <>
                {productMode &&
                  items.map((item, i) => (
                    <fieldset className="quote-line" key={item.id}>
                      <legend>Item {i + 1}</legend>
                      <div className="line-top">
                        <label>
                          Product / requirement
                          <input
                            required
                            value={item.name}
                            maxLength={200}
                            onChange={(e) =>
                              update(item.id, { name: e.target.value })
                            }
                          />
                        </label>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => remove(item.id)}
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                      <div className="form-grid">
                        <label>
                          Quantity
                          <input
                            type="number"
                            min="1"
                            max="999999"
                            step="1"
                            required
                            value={item.quantity}
                            onChange={(e) =>
                              update(item.id, {
                                quantity: Number(e.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Requested unit / packaging
                          <input
                            required
                            value={item.unit}
                            maxLength={100}
                            placeholder="Units, litres, packs or specify"
                            onChange={(e) =>
                              update(item.id, { unit: e.target.value })
                            }
                          />
                        </label>
                      </div>
                      <label>
                        Specifications &amp; notes
                        <textarea
                          value={item.notes}
                          maxLength={2000}
                          onChange={(e) =>
                            update(item.id, { notes: e.target.value })
                          }
                          rows={3}
                          placeholder="Exact product, dimensions, grade or packaging requested"
                        />
                      </label>
                    </fieldset>
                  ))}
                {productMode && (
                  <>
                    <button
                      type="button"
                      className="outline-button"
                      onClick={() => move(0)}
                    >
                      Add another item <Plus size={17} />
                    </button>
                    <p className="notice">
                      Units are your requested quantities, rather than confirmed
                      packaging or availability.
                    </p>
                  </>
                )}
                {services && (
                  <div className="service-summary">
                    <p className="eyebrow">Your service request</p>
                    <h3>{data.service}</h3>
                    <p>
                      {data.facility} {data.size && ` / ${data.size}`}
                    </p>
                    <p>
                      {data.frequency}
                      {data.serviceDate && ` / ${data.serviceDate}`}
                    </p>
                    <p>
                      {data.serviceNotes ||
                        "No additional service requirements entered."}
                    </p>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => move(0)}
                    >
                      Edit service requirements <ArrowLeft size={17} />
                    </button>
                  </div>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-grid">
                  <Field
                    label="Country"
                    name="country"
                    value={data.country}
                    onChange={change}
                  />
                  <Field
                    label="City / town"
                    name="city"
                    value={data.city}
                    onChange={change}
                    required
                  />
                  <Field
                    label="Suburb / area"
                    name="area"
                    value={data.area}
                    onChange={change}
                  />
                  <label>
                    Delivery required
                    <select
                      value={data.delivery}
                      onChange={(e) => change("delivery", e.target.value)}
                    >
                      <option>Discuss</option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Collection enquiry</option>
                    </select>
                  </label>
                </div>
                <Field
                  label="Detailed address (optional)"
                  name="address"
                  value={data.address}
                  onChange={change}
                />
                <Field
                  label="Preferred delivery date (optional)"
                  name="date"
                  value={data.date}
                  onChange={change}
                  type="date"
                />
                <label>
                  Delivery / access instructions
                  <textarea
                    value={data.deliveryNotes}
                    onChange={(e) => change("deliveryNotes", e.target.value)}
                    maxLength={2000}
                    rows={3}
                  />
                </label>
                <p className="notice">
                  Delivery and service arrangements are assessed for your
                  location. Coverage and dates are confirmed during quotation.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-grid">
                  <Field
                    label="Full name"
                    name="name"
                    value={data.name}
                    onChange={change}
                    required
                    maxLength={120}
                  />
                  <Field
                    label="Business / organisation"
                    name="organisation"
                    value={data.organisation}
                    onChange={change}
                    maxLength={200}
                  />
                  <Field
                    label="WhatsApp / phone number"
                    name="phone"
                    value={data.phone}
                    onChange={change}
                    required
                    type="tel"
                    maxLength={40}
                  />
                  <Field
                    label="Email (optional)"
                    name="email"
                    value={data.email}
                    onChange={change}
                    type="email"
                    maxLength={254}
                  />
                  <label>
                    Preferred contact method
                    <select
                      value={data.contactMethod}
                      onChange={(e) => change("contactMethod", e.target.value)}
                    >
                      <option>WhatsApp</option>
                      <option>Phone</option>
                      <option>Email</option>
                    </select>
                  </label>
                </div>
                <label>
                  Additional notes
                  <textarea
                    value={data.notes}
                    onChange={(e) => change("notes", e.target.value)}
                    rows={4}
                    maxLength={4000}
                  />
                </label>
                <label className="consent">
                  <input
                    type="checkbox"
                    required
                    checked={data.consent}
                    onChange={(e) =>
                      setData((old) => ({ ...old, consent: e.target.checked }))
                    }
                  />
                  <span>
                    I agree that my details may be used to respond to this
                    quotation enquiry.{" "}
                    <Link href="/privacy">Privacy information</Link>
                  </span>
                </label>
                <label className="honeypot" aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={data.website}
                    onChange={(e) => change("website", e.target.value)}
                  />
                </label>
              </>
            )}
            <div className="form-navigation">
              {step > 0 && (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => move(step - 1)}
                >
                  <ArrowLeft size={17} />
                  Back
                </button>
              )}
              <button className="button" type="submit">
                {step === 3 ? "Review request" : "Continue"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        ) : (
          <div className="review">
            <div className="review-reference">
              <span className="eyebrow">Prepared request reference</span>
              <strong>{reference}</strong>
            </div>
            {[
              [
                "Requirements",
                data.kind + (productMode ? ` / ${items.length} items` : ""),
                0,
              ],
              [
                "Location",
                [data.city, data.area, data.country].filter(Boolean).join(", "),
                2,
              ],
              ["Contact", `${data.name} / ${data.phone}`, 3],
            ].map(([label, value, index]) => (
              <div className="review-section" key={label}>
                <div>
                  <span className="eyebrow">{label}</span>
                  <p>{value}</p>
                </div>
                <button
                  className="text-link"
                  onClick={() => move(Number(index))}
                >
                  Edit
                </button>
              </div>
            ))}
            <details className="message-preview" open>
              <summary>Complete quotation request</summary>
              <pre tabIndex={0}>{message}</pre>
            </details>
            <p className="handoff-note">
              <MessageCircle size={22} />
              <span>
                Opening WhatsApp prepares your message. Tap{" "}
                <strong>Send</strong> in WhatsApp to deliver it to Purple Sense.
              </span>
            </p>
            <a
              className="button whatsapp-button"
              href={createWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("psi:conversion", {
                    detail: { event: "whatsapp_quote_handoff", reference },
                  }),
                )
              }
            >
              Continue via WhatsApp <ArrowRight size={18} />
            </a>
            <button className="outline-button" onClick={copyRequest}>
              {copy ? <Check size={18} /> : <Copy size={18} />}{" "}
              {copy ? "Request copied" : "Copy request"}
            </button>
            {emailStatus === "enabled" ? (
              <>
                <button
                  className="outline-button"
                  disabled={
                    sending ||
                    emailResult.startsWith("Your request was emailed")
                  }
                  onClick={sendEmail}
                >
                  <Mail size={18} />
                  {sending ? "Sending…" : "Send request by email"}
                </button>
                {emailResult && (
                  <p role="status" className="notice">
                    {emailResult}
                  </p>
                )}
              </>
            ) : (
              <p className="quiet email-note">
                Email delivery is not available yet. Please send your completed
                request through WhatsApp. This website has not received or
                stored your enquiry.
              </p>
            )}
            <button className="text-link" onClick={() => move(3)}>
              <ArrowLeft size={17} />
              Back to your details
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
