# Purple Sense International

A full Next.js / TypeScript website for scientific supplies and professional hygiene enquiries. Phase 1 uses the confirmed WhatsApp number **263777218496**. It does not claim live email delivery, a confirmed inventory, delivery coverage or a registered domain.

## Run

```sh
npm install
npm run dev
npm run build
npm run start
npm test
```

## Implemented

- Home, About, Products, four category pages, eight representative product enquiry pages, Services, Industries, Contact, five-step Request Quote, Privacy and a useful 404.
- Structured illustrative catalogue data in `lib/catalogue.ts`, search, category/application/type filters, requested quantities and specification notes.
- Persistent local quote basket; custom items; product, service and mixed enquiries; complete review; encoded WhatsApp composer; copy fallback.
- Hide-on-down / show-on-up navigation, mobile menu, laboratory/workplace discovery, reduced-motion handling, keyboard focus and semantic forms.
- Unique metadata, Open Graph image, sitemap, robots, temporary PS favicon and self-hosted font files through Next.js.
- Prepared server email endpoint, Zod validation, honeypot, basic per-instance rate limiting, provider idempotency and optional Postgres persistence.
- No analytics or advertising trackers are active. `psi:conversion` events expose `add_to_quote` and `whatsapp_quote_handoff` for a future consent-gated integration.

## Activation dependencies

See [launch configuration](docs/launch-configuration.md) and [image sources](docs/image-sources.md).

`GET /api/enquiries` reports capability status. Without mail configuration, `POST /api/enquiries` returns **503**, explaining that no enquiry was received. WhatsApp prepares a message; the visitor must tap Send in WhatsApp. No automatic WhatsApp Business API integration is enabled.

Basket item data stays in localStorage. Contact fields are held in memory and cleared on reload. No public admin interface is exposed. Future admin CRUD must include authentication, authorisation and private storage permissions.

The preview is isolated in its own Vercel project. No custom domain, business mailbox or unrelated client site is modified.

Automatic Git deployments are disabled in `vercel.json` for Phase 1. Deploy a preview explicitly with `vercel deploy`; enable Git deployment or promote production only when a production release is authorised.
