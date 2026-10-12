"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Plus, Minus, ArrowRight } from "lucide-react";
import { products, categories, Product } from "@/lib/catalogue";
import { useQuote } from "./quote-context";
function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        disabled={value <= 1}
      >
        <Minus size={15} />
      </button>
      <input
        aria-label="Quantity"
        type="number"
        min="1"
        max="999999"
        value={value}
        onChange={(e) =>
          onChange(Math.min(999999, Math.max(1, Number(e.target.value) || 1)))
        }
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(999999, value + 1))}
        aria-label="Increase quantity"
        disabled={value >= 999999}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useQuote();
  return (
    <article className="product-card">
      <Link className="product-image" href={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={`Representative imagery for ${product.name.toLowerCase()}`}
          width="700"
          height="550"
          loading="lazy"
        />
        <span className="image-badge">Illustrative enquiry</span>
        <span className="round-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <p className="eyebrow">
        {categories.find((c) => c.slug === product.category)?.name}
      </p>
      <Link href={`/products/${product.slug}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>{product.description}</p>
      <div className="product-controls">
        <Quantity value={quantity} onChange={setQuantity} />
        <button
          className="add-button"
          onClick={() =>
            add({
              name: product.name,
              quantity,
              unit: "Requested units",
              notes: "",
            })
          }
        >
          Add to quote <Plus size={17} />
        </button>
      </div>
      <Link className="detail-link" href={`/products/${product.slug}`}>
        View details &amp; specify units <ArrowRight size={16} />
      </Link>
    </article>
  );
}
export function Catalogue({
  initialCategory = "all",
}: {
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState("all");
  const [type, setType] = useState("all");
  const shown = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (application === "all" || p.application === application) &&
      (type === "all" || p.type === type) &&
      `${p.name} ${p.description} ${categories.find((c) => c.slug === p.category)?.name}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section className="catalogue wrap">
      <div className="catalogue-toolbar">
        <label className="search">
          <Search size={20} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search names or categories"
            aria-label="Search catalogue"
          />
        </label>
        <label className="select-label">
          Application
          <select
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          >
            <option value="all">All applications</option>
            {Array.from(new Set(products.map((p) => p.application))).map(
              (x) => (
                <option key={x}>{x}</option>
              ),
            )}
          </select>
        </label>
        <label className="select-label">
          Product type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            {Array.from(new Set(products.map((p) => p.type))).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-row">
        <button
          aria-pressed={category === "all"}
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            aria-pressed={category === c.slug}
            className={category === c.slug ? "active" : ""}
            onClick={() => setCategory(c.slug)}
          >
            {c.short}
          </button>
        ))}
      </div>
      <div className="catalogue-meta">
        <span role="status">
          {shown.length} illustrative enquiry{" "}
          {shown.length === 1 ? "entry" : "entries"}
        </span>
        <button
          onClick={() => {
            setCategory("all");
            setSearch("");
            setApplication("all");
            setType("all");
          }}
        >
          Reset filters
        </button>
      </div>
      {shown.length ? (
        <div className="product-grid">
          {shown.map((p) => (
            <ProductCard product={p} key={p.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={28} />
          <h3>No matching entries</h3>
          <p>Try another search or describe the exact product you need.</p>
          <Link className="button" href="/request-quote?custom=1">
            Request an unlisted item <Plus size={17} />
          </Link>
        </div>
      )}
      <div className="unlisted">
        <div>
          <p className="eyebrow">A specific requirement?</p>
          <h3>If it’s not listed, let’s talk.</h3>
          <p>
            Add your own product description, quantities and specifications to
            your quotation.
          </p>
        </div>
        <Link className="button" href="/request-quote?custom=1">
          Custom item enquiry <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function ProductEnquiry({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Requested units");
  const [notes, setNotes] = useState("");
  const { add } = useQuote();
  const [added, setAdded] = useState(false);
  return (
    <div className="product-enquiry">
      <label>
        Required quantity
        <Quantity value={quantity} onChange={setQuantity} />
      </label>
      <label>
        Requested unit / packaging
        <input
          value={unit}
          maxLength={100}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g. units, litres or packs"
        />
        <small>Your requested unit will be confirmed during quotation.</small>
      </label>
      <label>
        Specifications &amp; notes
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Describe the exact product, dimensions, packaging or documentation you need."
        />
      </label>
      <button
        className="button"
        disabled={!unit.trim()}
        onClick={() => {
          add({ name: product.name, quantity, unit: unit.trim(), notes });
          setAdded(true);
        }}
      >
        {added ? "Add another quantity" : "Add to quote"}
        <Plus size={18} />
      </button>
      {added && (
        <Link className="text-link" href="/request-quote">
          Review your quotation <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
