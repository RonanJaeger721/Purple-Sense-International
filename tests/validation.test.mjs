import { test } from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../lib/enquiry-schema.ts";
const valid = {
  reference: "PSI-20261012-ABCD1234",
  kind: "Product quotation",
  items: [
    { id: "test", name: "Glassware", quantity: 2, unit: "sets", notes: "" },
  ],
  name: "Website QA",
  organisation: "",
  phone: "+263700000000",
  email: "",
  service: "",
  facility: "",
  size: "",
  serviceDate: "",
  frequency: "Not sure",
  serviceNotes: "",
  country: "",
  city: "Harare",
  area: "",
  address: "",
  delivery: "Discuss",
  date: "",
  deliveryNotes: "",
  contactMethod: "WhatsApp",
  notes: "",
  consent: true,
  website: "",
};
test("allows the phase-one optional email and custom requested units", () =>
  assert.equal(enquirySchema.safeParse(valid).success, true));
test("rejects product enquiries without items and fractional quantities", () => {
  assert.equal(enquirySchema.safeParse({ ...valid, items: [] }).success, false);
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      items: [{ ...valid.items[0], quantity: 1.5 }],
    }).success,
    false,
  );
});
test("service enquiries require facility details but not products", () => {
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      kind: "Cleaning service quotation",
      items: [],
      facility: "",
    }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      kind: "Cleaning service quotation",
      items: [],
      facility: "Office",
    }).success,
    true,
  );
});
test("requires consent and rejects honeypot input or invalid email", () => {
  for (const patch of [
    { consent: false },
    { website: "https://spam.invalid" },
    { email: "invalid" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
});
