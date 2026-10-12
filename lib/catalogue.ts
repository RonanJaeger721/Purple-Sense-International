export const categories = [
  {
    slug: "laboratory-equipment",
    name: "Laboratory equipment",
    short: "Lab equipment",
    index: "01",
    image: "/images/glassware.webp",
    description:
      "Equipment and laboratory essentials for practical scientific and testing applications.",
    intro: "Start with the tools your work requires.",
    body: "Tell us about your application, required equipment and quantities. Include any model, dimensions or performance requirements you need confirmed in your quotation.",
  },
  {
    slug: "laboratory-reagents",
    name: "Laboratory reagents",
    short: "Reagents",
    index: "02",
    image: "/images/laboratory.jpg",
    description:
      "Reagent enquiries shaped around your laboratory requirements.",
    intro: "Specify what your laboratory needs.",
    body: "Provide the reagent name, required grade, quantity and intended application. Exact formulations, availability, packaging and technical documentation will be confirmed during quotation.",
  },
  {
    slug: "detergents",
    name: "Detergents",
    short: "Detergents",
    index: "03",
    image: "/images/cleaning.jpg",
    description:
      "Cleaning product enquiries for commercial and institutional needs.",
    intro: "Practical care starts with the right requirements.",
    body: "Describe the surfaces, cleaning task and quantities you need. Product suitability, packaging and availability are assessed as part of your enquiry.",
  },
  {
    slug: "disinfectants",
    name: "Disinfectants",
    short: "Disinfectants",
    index: "04",
    image: "/images/hygiene.jpg",
    description:
      "Disinfectant enquiries for your intended environment and application.",
    intro: "An informed approach to hygiene.",
    body: "Tell us about the environment and intended use. Product specifications and suitability must be confirmed before selection; no medical or regulatory claims are implied by these representative entries.",
  },
];
export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  type: string;
  application: string;
  questions: string[];
};
export const products: Product[] = [
  {
    slug: "laboratory-glassware-enquiry",
    name: "Laboratory glassware",
    category: "laboratory-equipment",
    description:
      "An illustrative enquiry for glassware and practical laboratory essentials.",
    image: "/images/glassware.webp",
    type: "Equipment",
    application: "Laboratory",
    questions: [
      "Glassware type and required dimensions",
      "Quantity and capacity requirements",
      "Any documentation or compatibility requirements",
    ],
  },
  {
    slug: "laboratory-equipment-enquiry",
    name: "Laboratory equipment enquiry",
    category: "laboratory-equipment",
    description:
      "Describe the equipment your scientific or testing application requires.",
    image: "/images/laboratory.jpg",
    type: "Equipment",
    application: "Laboratory",
    questions: [
      "Equipment name or model requirement",
      "Intended application",
      "Required features or technical specifications",
    ],
  },
  {
    slug: "reagent-enquiry",
    name: "Laboratory reagent enquiry",
    category: "laboratory-reagents",
    description:
      "Specify the reagent name, required grade and quantity for your laboratory.",
    image: "/images/laboratory.jpg",
    type: "Reagent",
    application: "Laboratory",
    questions: [
      "Reagent name and grade",
      "Quantity and packaging requirements",
      "Required safety and technical documentation",
    ],
  },
  {
    slug: "custom-reagent-enquiry",
    name: "Specific reagent requirements",
    category: "laboratory-reagents",
    description:
      "A starting point for a reagent requirement that needs detailed specification.",
    image: "/images/glassware.webp",
    type: "Reagent",
    application: "Laboratory",
    questions: [
      "Exact product or chemical name",
      "Specification or concentration requested",
      "Intended application and documentation needs",
    ],
  },
  {
    slug: "detergent-enquiry",
    name: "Commercial detergent enquiry",
    category: "detergents",
    description:
      "Tell us about your cleaning task and required product quantities.",
    image: "/images/cleaning.jpg",
    type: "Cleaning product",
    application: "Facility care",
    questions: [
      "Cleaning task and surface type",
      "Required quantity and packaging",
      "Any site-specific restrictions",
    ],
  },
  {
    slug: "facility-detergent-enquiry",
    name: "Facility cleaning supplies",
    category: "detergents",
    description:
      "Bring together your facility’s cleaning product requirements in one enquiry.",
    image: "/images/workplace.jpg",
    type: "Cleaning product",
    application: "Facility care",
    questions: [
      "Facility type and cleaning requirements",
      "Product names if known",
      "Quantities and delivery location",
    ],
  },
  {
    slug: "disinfectant-enquiry",
    name: "Disinfectant product enquiry",
    category: "disinfectants",
    description:
      "Describe your intended application so specifications can be confirmed.",
    image: "/images/hygiene.jpg",
    type: "Hygiene product",
    application: "Facility care",
    questions: [
      "Environment and intended application",
      "Product requirements and quantity",
      "Required technical or safety documentation",
    ],
  },
  {
    slug: "hygiene-supplies-enquiry",
    name: "Hygiene supply requirements",
    category: "disinfectants",
    description:
      "Discuss disinfectant requirements for your workplace or institution.",
    image: "/images/workplace.jpg",
    type: "Hygiene product",
    application: "Facility care",
    questions: [
      "Facility and application details",
      "Specific product requirements",
      "Packaging, quantities and delivery needs",
    ],
  },
];
export const industries = [
  [
    "Laboratories & research",
    "Laboratory equipment and reagent enquiries for scientific and testing requirements.",
    "laboratory-equipment",
  ],
  [
    "Education & training",
    "Enquire about laboratory essentials for practical learning, alongside facility hygiene requirements.",
    "laboratory-equipment",
  ],
  [
    "Healthcare facilities",
    "Discuss laboratory and facility hygiene requirements. Product suitability and specifications require confirmation.",
    "disinfectants",
  ],
  [
    "Commercial spaces",
    "Explore detergents, disinfectant enquiries and professional cleaning for workplace requirements.",
    "detergents",
  ],
  [
    "Hospitality",
    "Discuss product supplies and cleaning requirements for the spaces your guests and teams use.",
    "detergents",
  ],
  [
    "Industrial & institutional facilities",
    "Combine product and service enquiries around your site’s operational requirements.",
    "disinfectants",
  ],
];
