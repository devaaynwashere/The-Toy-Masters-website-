# The Toy Masters

Full-stack catalogue and owner dashboard, built with React, TypeScript and Vinext for Cloudflare Workers through Sites. Read [OWNER-GUIDE.md](OWNER-GUIDE.md) for day-to-day use.

## Data and media

D1 (`DB`) owns products, category relationships, ordered product images, colours, markets, market-product assignments, deals, enquiries, settings, session hashes and rate limits. R2 (`MEDIA`) owns uploaded bytes. Public reads are always assembled from the database. Demo seed data is inserted once, atomically, when the database has no main settings record. Subsequent administration never reads demo prices as overrides.

The three enquiry types share a typed inbox table with separate status workflows. Product metadata is stored in the product row alongside searchable identity and price columns; images, colours and market assignments use related tables. All SQL uses bound parameters.

## Development

Use Node 22.13 or newer and `npm ci`. Set an ignored `.dev.vars` with `ADMIN_PASSWORD=<local password>`. Run `npm run build`, then apply each pending Drizzle migration using Wrangler's local D1 execute command with `--config dist/server/wrangler.json --persist-to .wrangler/state --file <migration>`. Copy your ignored development variables into `dist/server/.dev.vars` for the built preview, then run `npm start`.

The Sites workflow owns publication and applies production migrations. `.openai/hosting.json` contains only the existing site identity and logical D1/R2 binding names. Keep that identity when republishing. Secrets are configured through the Sites environment settings, never in source. See the installed Sites hosting skill for source push, archive packaging and deployment status verification.

## Security

Admin login is checked server-side against the hosting secret. Random session tokens are stored only as hashes and issued in HttpOnly, SameSite=Strict cookies, with Secure on HTTPS. Sessions expire after eight hours, are invalidated by logout, and stop working after a password change. Login attempts are limited in D1. Mutation routes verify authentication and same-origin requests. Enquiries and anonymous reference uploads have separate abuse limits.

Uploads have file-size, extension, MIME and signature checks. SVG and executable formats are rejected. Public media gets immutable caching; private references require admin authentication and use no-store. React escapes text; structured-data JSON escapes `<`. No arbitrary HTML editor is included.

## Verification

Local verification covered TypeScript, the production Worker build, 35 public page/viewport combinations, search, mobile navigation, the admin editor at 320/375/390/430 px and unsaved-change prompts. API workflow checks covered creation, publishing, archiving, prices, markets, enquiries, image uploads and cover ordering, private references, invalid uploads, anonymous access, CSRF, export and logout.

The optional browser catalogue tool uses the same visible search/filter state. No supported native WebMCP browser context was available for runtime tool validation. In-app preview was unavailable; local headless browser verification was used.

## Intentional limits

No checkout, fabricated reviews, invented confirmed markets, or made-up contact details. Automatic email notifications, a blog editor, one-click backup restoration, advanced image derivatives and an owner-configurable legal-policy editor are not included. The initial site stays owner-private until public access is explicitly requested. Final product data, safety guidance and policies need owner review.
