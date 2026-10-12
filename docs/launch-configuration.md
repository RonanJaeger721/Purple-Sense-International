# Phase 1 launch configuration

## Confirmed and active

Company: Purple Sense International. WhatsApp: +263777218496. Four supply categories: laboratory equipment, laboratory reagents, detergents and disinfectants. Services: professional cleaning and disinfection. The quote builder prepares complete requests for the confirmed WhatsApp number.

## Client information still needed

1. Official SVG or PNG logo; the current typography and PS favicon are provisional.
2. Actual inventory: product names, brands, descriptions, verified specifications, packaging, images and relevant safety documents. Representative entries must be replaced with confirmed records.
3. Receiving quotation email and authorised sender domain.
4. Selected domain, domain account access and chosen business mailbox provider.
5. Confirmed delivery/service coverage, operational contact details and any business information the client wants published.

## Four separate services

| Service                       | Role                                       | Phase 1 state                  |
| ----------------------------- | ------------------------------------------ | ------------------------------ |
| Website hosting               | Runs the Next.js application and API       | Isolated Vercel preview        |
| Domain registration / renewal | Owns the selected website and email domain | Not selected; no purchase made |
| Business mailbox hosting      | Staff inboxes, sending and receiving       | Not provisioned                |
| Transactional website email   | Sends quotation notifications from the API | Prepared but disabled          |

## Mailbox choices

- [Google Workspace](https://workspace.google.com/business/): custom-domain Gmail with Google’s collaboration tools.
- [Microsoft 365 Business](https://www.microsoft.com/en-us/microsoft-365/business): business email alongside Microsoft’s productivity tools; choose a plan with Exchange email.
- [Zoho Mail](https://www.zoho.com/mail/): a business email service to consider when the main requirement is hosted mailboxes.

These are options for client selection, not purchased subscriptions. Compare the current regional plan, mailbox count and billing terms before choosing. Suggested mailbox names are `info@[selected-domain]`, `sales@[selected-domain]` and `quotes@[selected-domain]`; none is live yet.

After selection, verify domain ownership, provision accounts, configure provider-issued MX, SPF, DKIM and DMARC records, then test inbound and outbound mail. Maintain one correctly combined SPF record. Start DMARC with monitoring, assess legitimate senders, then adopt the client’s chosen enforcement policy.

## Activate website notification email

Set `QUOTES_TO_EMAIL`, `QUOTES_FROM_EMAIL` and `RESEND_API_KEY` in the correct Vercel environment. Verify the sender domain with Resend, then deploy and test actual delivery to an authorised test destination. Do not use a mailbox password as an API key. All credentials stay server-side.

The endpoint has Zod validation, a honeypot, a payload limit and basic in-memory per-instance rate limiting. Before enabling public mail at scale, add a durable rate limit or Vercel firewall policy; the current limiter does not span server instances. Resend idempotency guards repeated delivery of the same prepared request. Provider idempotency retention is limited; a persistent enquiry store is preferable for long-term duplicate handling.

Optional database: provision a dedicated Postgres database, apply `db/schema.sql`, restrict the server credential, then set `DATABASE_URL`. The adapter records pending, emailed and failed states. No database exists in this preview. Configure retention, backups and staff access before storing live customer details.

## Domain, indexing and analytics

Set `NEXT_PUBLIC_SITE_URL` to the approved canonical URL when the domain is selected. During previews, metadata uses Vercel’s deployment URL. Sitemap and robots are included; preview hosting may apply its own noindex header. Confirm indexing settings on the approved production domain before requesting indexing.

GA4, GTM and Meta integration variables are in `.env.example`. No scripts are activated merely by adding IDs. A future consent-gated adapter can listen to the `psi:conversion` events, without sharing customer names, phone numbers, message contents or addresses. Test consent withdrawal and event deduplication before activating tracking.

## Release checks

Build and test locally, inspect mobile/desktop pages and the quote flow, show the preview, commit and push to the supplied repository. Deploy only this project. Verify public routes, fonts, representative media and quotation interactions. Connect a custom domain only with explicit authorisation.
