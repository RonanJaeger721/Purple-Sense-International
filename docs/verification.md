# Phase 1 verification — 12 October 2026

## Local release checks

- Next.js 16.4 production build and TypeScript compilation passed.
- Eight automated tests passed: WhatsApp encoding, mixed/product/service message contents, reference uniqueness, optional email, item quantities, service validation, consent and honeypot validation.
- HTTP checks passed for 20 content routes, 37 distinct internal destinations and 23 media/font/script/style/SEO/API resources.
- Every content page has a unique title and a rendered h1. Invalid product routes return 404.
- Seven core page compositions were checked at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px (70 DOM layout checks), without horizontal overflow. Homepage additionally checked at all ten widths. Selected desktop, tablet and mobile views visually inspected; the tablet hero overlap was corrected.
- Browser checked: mobile menu and catalogue navigation, search empty results/reset, category filtering, quantity increment, add multiple items, persistence after reload, custom item entry, removal, mixed enquiry, required-field validation, specification edits, service scope, location, review and copy request.
- Final review preserves quantities, units, service details, delivery details, customer fields and special characters in the WhatsApp URL. No test message was sent to the business.
- Homepage category discovery changes content and destinations. Laboratory/workplace switch changes image, copy and destination. Navigation hides on down-scroll and returns on up-scroll.
- Browser console showed no warnings or errors during the tested local quotation flow.
- `GET /api/enquiries`: emailConfigured=false, storageConfigured=false. Disabled `POST` returns 503 and explains that no enquiry was received.
- Secrets and `.vercel` account state are ignored by Git. `git diff --check` passed.

## Limits

Actual Resend delivery and database persistence are not verified because no receiving email, API key or database has been supplied. No domain or mailbox has been provisioned. Representative catalogue content needs replacement with client inventory. Advertising/analytics trackers are not active. No claim of measured Core Web Vitals or independent award endorsement is made.

## Public deployment checks

The isolated public demo at https://purple-sense-international-rosy.vercel.app passed the same 20-route, 37-destination and 23-resource HTTP checks. The deployed browser flow passed product-detail selection, basket transfer, quantity/specification review, location/contact validation and the final WhatsApp composer link; no message was sent. The deployed console was clear. Email and database remained disabled, with truthful 503 responses.

Vercel assigned the first deployment to its default production environment automatically. A separate preview deployment was then created. No custom domain was registered, connected or changed, and no other client project was modified. The preview retains Vercel authentication; it was checked with the authenticated CLI. A connector share-link request returned a scope-related 403, so the permanent, publicly accessible demo alias is used for handoff.

The first deployment’s protected build hostname was discovered in its metadata. Site URL selection was corrected to prefer the project’s public production URL in production, while retaining the unique deployment hostname for authenticated previews. `NEXT_PUBLIC_SITE_URL` remains the override for an approved custom domain.
