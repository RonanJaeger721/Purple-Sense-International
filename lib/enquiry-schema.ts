import { z } from "zod";
const text = (max = 500) => z.string().trim().max(max);
export const enquirySchema = z
  .object({
    reference: z.string().regex(/^PSI-\d{8}-[A-F0-9]{8}$/),
    kind: z.enum([
      "Product quotation",
      "Cleaning service quotation",
      "Mixed enquiry",
    ]),
    items: z
      .array(
        z.object({
          id: text(100),
          name: text(200).min(1),
          quantity: z.number().int().min(1).max(999999),
          unit: text(100).min(1),
          notes: text(2000),
        }),
      )
      .max(50),
    name: text(120).min(2),
    organisation: text(200),
    phone: text(40)
      .min(6)
      .regex(/^[+\d\s().-]+$/),
    email: z.union([z.literal(""), z.email().max(254)]),
    service: text(200),
    facility: text(200),
    size: text(200),
    serviceDate: text(30),
    frequency: text(100),
    serviceNotes: text(4000),
    country: text(100),
    city: text(100).min(1),
    area: text(200),
    address: text(500),
    delivery: z.enum(["Yes", "No", "Discuss", "Collection enquiry"]),
    date: text(30),
    deliveryNotes: text(2000),
    contactMethod: z.enum(["WhatsApp", "Phone", "Email"]),
    notes: text(4000),
    consent: z.literal(true),
    website: z.literal(""),
  })
  .superRefine((value, context) => {
    if (value.kind !== "Cleaning service quotation" && !value.items.length)
      context.addIssue({
        code: "custom",
        path: ["items"],
        message: "Add at least one product.",
      });
    if (value.kind !== "Product quotation" && !value.facility)
      context.addIssue({
        code: "custom",
        path: ["facility"],
        message: "Enter your facility type.",
      });
  });
