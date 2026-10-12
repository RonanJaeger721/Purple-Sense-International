import type { Metadata } from "next";
import { Intro } from "@/components/ui";
export const metadata: Metadata = {
  title: "Privacy information",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <>
      <Intro
        eyebrow="Your information"
        title="A clear approach to your details."
      >
        <p>
          How information is used when you prepare a quotation or contact
          enquiry.
        </p>
      </Intro>
      <article className="privacy-copy wrap">
        <h2>Your quote basket</h2>
        <p>
          Product names, quantities, requested units and item notes are saved in
          this browser’s local storage so your selections remain after
          refreshing. Remove items from your basket or clear your browser’s site
          data to delete them. Customer contact fields remain in page memory and
          are cleared when the page is reloaded.
        </p>
        <h2>WhatsApp enquiries</h2>
        <p>
          The website creates a message using the details you enter. Choosing
          “Continue via WhatsApp” opens WhatsApp with that message prepared. You
          must tap Send in WhatsApp to share it with Purple Sense International.
          WhatsApp processes information under its own privacy terms.
        </p>
        <h2>How your details are used</h2>
        <p>
          Your name, contact details, organisation, product requirements and
          location are requested to understand your enquiry and respond about
          pricing, availability or service arrangements. Share only information
          relevant to your request.
        </p>
        <h2>Email and storage</h2>
        <p>
          Email submission is available only when configured. The interface
          states whether a request was actually emailed. An enquiry is stored on
          a server only if a persistent enquiry store has been configured. The
          WhatsApp workflow does not submit your details to the website’s
          server.
        </p>
        <h2>Analytics</h2>
        <p>
          No advertising or analytics trackers are currently active. Future
          optional tracking must be configured and enabled with appropriate
          consent. Functional browser storage is used for the quote basket.
        </p>
        <h2>Questions about your information</h2>
        <p>
          Contact Purple Sense International on the confirmed WhatsApp number,
          +263777218496.
        </p>
      </article>
    </>
  );
}
