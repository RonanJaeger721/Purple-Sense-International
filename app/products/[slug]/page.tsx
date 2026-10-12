import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/catalogue";
import { ProductEnquiry } from "@/components/catalogue";
import { Closing } from "@/components/ui";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return {
    title: p?.name || "Product not found",
    description: p?.description,
    alternates: { canonical: `/products/${slug}` },
  };
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const c = categories.find((x) => x.slug === p.category)!;
  return (
    <>
      <section className="product-detail wrap">
        <Link className="text-link" href={`/products/category/${c.slug}`}>
          <ArrowLeft size={17} />
          {c.name}
        </Link>
        <div className="detail-layout">
          <div className="detail-photo">
            <img
              src={p.image}
              alt={`Illustrative category photograph for ${p.name}`}
              width="1000"
              height="1200"
            />
            <span>REPRESENTATIVE IMAGERY / NOT A CONFIRMED STOCK ITEM</span>
          </div>
          <div>
            <p className="eyebrow">{c.name}</p>
            <h1>{p.name}</h1>
            <p className="detail-description">{p.description}</p>
            <p className="notice">
              This is an illustrative enquiry entry. Exact products, brands,
              specifications, packaging and availability are confirmed during
              quotation.
            </p>
            <ProductEnquiry product={p} />
          </div>
        </div>
        <div className="specifications">
          <div>
            <p className="eyebrow">A more useful quotation</p>
            <h2>
              Help us understand
              <br />
              the details.
            </h2>
          </div>
          <div>
            {p.questions.map((q, i) => (
              <p key={q}>
                <span>0{i + 1}</span>
                {q}
              </p>
            ))}
            <small>
              No technical specifications or safety claims are implied. Request
              the relevant documentation for the actual quoted product.
            </small>
          </div>
        </div>
        <Link className="text-link" href="/request-quote?custom=1">
          Need a different product? Add your own requirement{" "}
          <ArrowRight size={18} />
        </Link>
      </section>
      <Closing />
    </>
  );
}
