import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createWhatsAppLink,
  formatEnquiry,
  makeReference,
} from "../lib/enquiry.mjs";
const sample = {
  kind: "Mixed enquiry",
  name: "A & B",
  organisation: "Science + Care",
  phone: "+263 700 000 000",
  email: "",
  items: [
    {
      name: "Glassware / special",
      quantity: 7,
      unit: "sets",
      notes: "100 ml & 250 ml",
    },
    { name: "Unlisted item", quantity: 2, unit: "packs", notes: "" },
  ],
  service: "Professional cleaning",
  facility: "Office",
  size: "200 m²",
  frequency: "Once-off",
  serviceDate: "2026-11-20",
  serviceNotes: "Access after 5pm",
  country: "Zimbabwe",
  city: "Harare",
  area: "Central",
  address: "",
  delivery: "Discuss",
  date: "",
  deliveryNotes: "Call first",
  contactMethod: "WhatsApp",
  notes: "Pricing & availability, please.",
};
test("WhatsApp handoff preserves special characters and complete mixed enquiry", () => {
  const message = formatEnquiry(sample, "PSI-20261012-ABCD1234");
  const url = new URL(createWhatsAppLink(message));
  assert.equal(url.pathname, "/263777218496");
  assert.equal(url.searchParams.get("text"), message);
  assert.match(message, /2\. Unlisted item\nQuantity: 2\nUnit: packs/);
  assert.match(message, /200 m²/);
  assert.match(message, /100 ml & 250 ml/);
  assert.match(message, /DELIVERY \/ SERVICE INFORMATION/);
  assert.match(message, /Email: Not specified/);
  assert.match(message, /Access after 5pm/);
});
test("product enquiry omits unrelated service details", () => {
  const message = formatEnquiry(
    { ...sample, kind: "Product quotation" },
    "PSI-20261012-ABCD1234",
  );
  assert.doesNotMatch(message, /SERVICE REQUIREMENTS/);
  assert.match(message, /Glassware/);
});
test("service enquiry handles an empty product list", () => {
  const message = formatEnquiry(
    { ...sample, kind: "Cleaning service quotation", items: [] },
    "PSI-20261012-ABCD1234",
  );
  assert.match(message, /No product items/);
  assert.match(message, /Service: Professional cleaning/);
});
test("references are unique and conform to the supported format", () => {
  const a = makeReference(),
    b = makeReference();
  assert.notEqual(a, b);
  assert.match(a, /^PSI-\d{8}-[A-F0-9]{8}$/);
});
