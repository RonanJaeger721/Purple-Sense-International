import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/catalogue";
import { Catalogue } from "@/components/catalogue";
import { Intro, Closing } from "@/components/ui";
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  return {
    title: c?.name || "Category not found",
    description: c?.description,
    alternates: { canonical: `/products/category/${slug}` },
  };
}
export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <Intro eyebrow={`Category ${c.index} / ${c.name}`} title={c.intro}>
        <p>{c.body}</p>
        <Link className="text-link" href="/products">
          <ArrowLeft size={17} />
          All product categories
        </Link>
        <p className="notice">
          Illustrative enquiry entries. Confirmed inventory and technical
          documentation will be added when provided.
        </p>
      </Intro>
      <Catalogue initialCategory={slug} />
      <Closing />
    </>
  );
}
