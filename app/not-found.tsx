import { Intro, Action } from "@/components/ui";
export default function NotFound() {
  return (
    <Intro eyebrow="Page not found" title="Let’s find what you need.">
      <p>
        This page isn’t available. Explore the catalogue or describe your
        requirements in a quotation.
      </p>
      <Action href="/products">Explore products</Action>
    </Intro>
  );
}
