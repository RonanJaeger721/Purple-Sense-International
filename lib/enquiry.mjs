export const BUSINESS_WHATSAPP = "263777218496";
export function createWhatsAppLink(message) {
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
export function formatEnquiry(data, reference) {
  const optional = (value) => String(value || "Not specified");
  return [
    "PURPLE SENSE INTERNATIONAL",
    "NEW QUOTATION ENQUIRY",
    `Reference: ${reference}`,
    `Enquiry type: ${data.kind}`,
    "",
    `Customer: ${data.name}`,
    `Organisation: ${optional(data.organisation)}`,
    `Phone: ${data.phone}`,
    `Email: ${optional(data.email)}`,
    "",
    "PRODUCTS REQUESTED",
    ...(data.items.length
      ? data.items.flatMap((item, i) => [
          `${i + 1}. ${item.name}`,
          `Quantity: ${item.quantity}`,
          `Unit: ${item.unit}`,
          `Specifications: ${optional(item.notes)}`,
          "",
        ])
      : ["No product items"]),
    ...(data.kind !== "Product quotation"
      ? [
          "",
          "SERVICE REQUIREMENTS",
          `Service: ${optional(data.service)}`,
          `Facility: ${optional(data.facility)}`,
          `Approximate area: ${optional(data.size)}`,
          `Preferred date: ${optional(data.serviceDate)}`,
          `Frequency: ${optional(data.frequency)}`,
          `Requirements: ${optional(data.serviceNotes)}`,
        ]
      : []),
    "",
    "DELIVERY / SERVICE INFORMATION",
    `Country: ${optional(data.country)}`,
    `City/Town: ${data.city}`,
    `Area: ${optional(data.area)}`,
    `Address: ${optional(data.address)}`,
    `Delivery required: ${data.delivery}`,
    `Preferred delivery date: ${optional(data.date)}`,
    `Delivery instructions: ${optional(data.deliveryNotes)}`,
    "",
    `Preferred contact: ${data.contactMethod}`,
    "ADDITIONAL NOTES",
    optional(data.notes),
    "",
    "Please assist with pricing and availability.",
  ].join("\n");
}
export function makeReference() {
  return `PSI-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${globalThis.crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
