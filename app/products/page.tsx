import type { Metadata } from "next";
import { Intro, Closing } from "@/components/ui";
import { Catalogue } from "@/components/catalogue";
export const metadata: Metadata = {
  title: "Product catalogue",
  description:
    "Explore laboratory equipment, reagents, detergents and disinfectant categories. Add quantities to your quotation or enquire about an unlisted product.",
  alternates: { canonical: "/products" },
};
export default function Products() {
  return (
    <>
      <Intro
        eyebrow="The enquiry catalogue"
        title="Your requirements, clearly organised."
      >
        <p>
          Explore scientific supplies and hygiene solutions. Choose a category
          or describe the exact product you need.
        </p>
        <p className="notice">
          Individual inventory is being prepared. Entries and photography are
          representative examples, with products, packaging and availability
          confirmed during quotation.
        </p>
      </Intro>
      <Catalogue />
      <Closing />
    </>
  );
}
