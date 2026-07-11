# Rock Solid Tile — rsitile.com

A static marketing website for Rock Solid Tile, a family-owned, licensed & insured tile
contractor based in Port Charlotte, FL, serving Southwest Florida across Charlotte,
Sarasota, Manatee, and Lee Counties.
Plain HTML/CSS/vanilla JS — **no framework, no build step, no package.json**. Deployed
to Netlify via drag-and-drop, so every file in this repo must work as-is when uploaded
directly (no compilation, bundling, or server-side rendering).

## Business details

- **Name:** Rock Solid Tile
- **Phone:** (941) 276-0305 — `tel:+19412760305`
- **Email:** info@rsitile.com
- **Positioning:** Family-owned, locally owned (not a franchise), 30+ years in business,
  1,000+ jobs completed, 5-star rated, licensed & insured, free estimates.
- **Important nuance:** the business does sometimes use outside help/subcontractors —
  **never claim "no subcontractors"** anywhere on the site. This was explicitly walked
  back by the client; it's not a selling point.
- **HQ / service area framing:** based in Port Charlotte, but copy should foreground
  **"Southwest Florida"** rather than leading with Port Charlotte alone or the old
  two-county framing — the service area now spans four counties (Charlotte, Sarasota,
  Manatee, Lee), so "Southwest Florida" is the umbrella brand tagline used in the
  header, H1s, titles, and footer. Port Charlotte can still appear as the literal HQ
  location or in single-project photo captions, just not as the dominant framing in
  headers/H1s.
- **Core service area (dedicated location pages), in display order:** Sarasota, Venice,
  North Port, Port Charlotte, Punta Gorda, Cape Coral, Bradenton. This order (not
  alphabetical) is intentional — keep it consistent across nav, footer, homepage
  area-cards, and every page's cross-linking sections.
- **Broader "also serving" area (mentioned in copy, no dedicated pages):** Charlotte
  County, Englewood, Rotonda West, Deep Creek, Gulf Cove, Osprey, Nokomis, Laurel,
  South Venice, Siesta Key, Fruitville, Bee Ridge, Gulf Gate Estates. The first four
  (Englewood, Rotonda West, Deep Creek, Gulf Cove) previously had dedicated location
  pages that were retired in favor of the new 7-city list above — still served, just
  no dedicated landing page anymore.

## Design system

Defined as CSS custom properties at the top of `css/style.css` — always use the
variables, never hardcode these hex values in new markup/CSS:

| Variable | Value | Use |
|---|---|---|
| `--navy` | `#142338` | Primary / hero / footer background |
| `--navy-mid` | `#1E3250` | Secondary dark section background |
| `--blue` | `#1E6FD9` | CTAs, links |
| `--gold` | `#C9A84C` | Phone number, accents — used sparingly |
| `--off-white` | `#F7F9FC` | Light section backgrounds |
| `--ink` | `#16233A` | Body headings on light backgrounds |
| `--body-text` | `#435066` | Body copy on light backgrounds |

**Typography:** Barlow Condensed (700/800) for all headlines via Google Fonts (`--font-head`),
Inter for body copy (`--font-body`).

**Signature element:** hero sections use a subtle CSS tile-grid background — thin 1px
lines at 80px intervals, `rgba(255,255,255,0.035)` on navy (`.hero::before`) — evoking
grout lines. Don't recreate this with an image; it's pure CSS.

**Placeholders:** all photos are dashed-border placeholder blocks (`.placeholder` class)
with descriptive `aria-label`s (e.g. "Kitchen tile backsplash installation Port
Charlotte FL") until real photography is available. When real photos are dropped in,
carry the `aria-label` text over as `alt` text, and add `loading="lazy"` + explicit
width/height to protect Core Web Vitals.

**Accessibility baked in:** skip link, visible `:focus-visible` states (gold outline),
`prefers-reduced-motion` respected globally (see `@media (prefers-reduced-motion:
reduce)` block near the top of `style.css`).

## SEO strategy

- One `<h1>` per page containing the primary keyword; H2s for sections; phone
  numbers/CTAs are never headings.
- Every page: unique `<title>` (~60 chars), unique meta description (~150-160 chars,
  includes keyword + location + a trust signal), canonical URL, Open Graph tags.
- Homepage carries the full `HomeAndConstructionBusiness` JSON-LD schema (in
  `index.html`'s `<head>`) with every service-area city in `areaServed` and every
  service in `makesOffer`. Service pages carry their own `Service` + `BreadcrumbList`
  JSON-LD (see `services/bathroom-tile-installation.html` for the pattern).
- **Target keyword pattern:** homepage and service pages target
  "[service] tile installer/installation" + "Southwest Florida"
  (broad regional framing — see the Business details note above on why this isn't
  Port-Charlotte-only or limited to the old two-county framing). **Location pages**
  are the place for hyper-local, single-city keyword targeting ("tile installer Punta
  Gorda FL", etc.) — that's their whole purpose, so don't dilute them with regional
  framing.
- Location pages must have genuinely differentiated content per city (different local
  details, service emphasis, copy) — not template city-name swaps.
- Service pages: 500+ words, an FAQ section (native `<details>/<summary>`, no JS), a
  materials section where relevant, and internal links to related services + all
  location pages.
- Internal linking: every page's footer links to all services and all locations;
  services and locations cross-link to each other in-content.
- `sitemap.xml` and `robots.txt` are still to be built (see Page structure below) —
  hold off until all pages exist so the sitemap is complete in one pass.

## Page structure

**Built — all 13 pages complete:**
- `index.html` — homepage
- 5 service pages (in `services/`): `bathroom-tile-installation.html` (original
  client-approved template), `shower-tile-installation.html`,
  `kitchen-tile-installation.html` (includes backsplash), `floor-tile-installation.html`
  (ceramic/porcelain/stone/LVT materials content), `patio-lanai-tile.html`
- 7 location pages (in `locations/`), in display order: `sarasota.html`, `venice.html`,
  `north-port.html`, `port-charlotte.html`, `punta-gorda.html`, `cape-coral.html`,
  `bradenton.html` — each with genuinely differentiated local content (a `why-list` of
  local highlights, a 3-question FAQ, and a "Services We Offer" + "Other Areas We
  Serve" cross-link section) rather than template city-name swaps. Note: `englewood.html`,
  `rotonda-west.html`, `deep-creek.html`, `gulf-cove.html` were retired from this lineup
  — those cities are now in the broader "also serving" tier (see Business details)
  with no dedicated page.
- `sitemap.xml`, `robots.txt` — list/allow all 13 pages
- `css/style.css`, `js/main.js` — shared across every page

**Folder structure note:** service and location pages live in separate `services/` and
`locations/` directories (not a single generic `/pages/`) so URLs carry category
context — e.g. `/services/bathroom-tile-installation.html`,
`/locations/punta-gorda.html`. Both folders sit at the same depth as the old `/pages/`
did, so the relative-path conventions below (`../css/style.css`, `../index.html`) are
unchanged; the only difference is that a service page linking to a location page (or
vice versa) needs to cross into the sibling folder, e.g. `../locations/punta-gorda.html`
from within `services/`.

**Explicitly dropped from scope:** a "Tile Repair & Replacement" service page was in
the original plan but the client doesn't offer that service — don't build
`tile-repair-replacement.html` or link to it anywhere.

**Homepage section order:** sticky header → hero (with tile-grid background) →
infinite auto-scrolling "Our Work" photo carousel → stats bar (30+ years / 1,000+ jobs
/ 5★ / free estimates) → services grid → why-us → service areas grid → contact
(live Calendly embed) → footer.

## Notable implementation patterns

- **"Our Work" carousel:** CSS `scroll-snap` horizontal list is the accessible,
  no-JS/reduced-motion baseline (real content, one set of slides). `js/main.js`
  progressively enhances it into an infinite looping marquee for motion-OK users by
  cloning the slide set once (`aria-hidden` on the clones) and animating with CSS
  custom properties (`--marquee-distance`, `--marquee-duration`). Fully skipped under
  `prefers-reduced-motion`.
- **Mobile-only sections use horizontal swipe carousels, not vertical stacks:** the
  "What We Do" services grid and "Service Areas" grid both switch from a CSS grid to a
  `scroll-snap` flex row on mobile (inside the `@media (max-width: 640px)` block) so
  users swipe sideways through cards instead of scrolling through a long vertical
  stack. This is a deliberate mobile UX pattern — apply it to new card grids on mobile
  if they'd otherwise stack more than ~3 cards deep.
- **Mobile changes are scoped inside the existing `@media (max-width: 640px)` block in
  `style.css` and must never touch base/desktop rules** — this has been an explicit,
  repeated client instruction across multiple rounds of mobile-only tweaks. When asked
  for a mobile-only change, add to that block; don't touch anything outside it.
- **CSS gotcha to remember:** a `position:absolute` element is the containing block for
  its own `::before`/`::after` pseudo-elements (regardless of transforms). If you need
  pseudo-element "siblings" of a positioned element, put the pseudo-elements on the
  *shared positioned ancestor*, not on the positioned element itself — this caused a
  real bug where the mobile hamburger icon only ever showed one of its three bars.
- **`js/dev-preview-toggle.js` is a temporary dev tool**, safe to delete along with its
  `<script>` tag in each page. It adds a floating "Preview Mobile" button that opens
  the current page in a phone-width iframe (real iframe, not a CSS width hack, so
  `@media` queries actually trigger) for checking mobile layout without resizing the
  real browser window. Guards against duplicating itself inside its own iframe via
  `window.self !== window.top`.
- **Calendly:** the contact section has a live inline embed (event type
  `rsitile-info/30min`, `hide_event_type_details` + `hide_gdpr_banner` both set),
  wrapped in `.calendly-embed` — a white rounded card (`var(--radius)`, `var(--shadow)`)
  so the widget's white UI doesn't float bare on the navy section background. The
  `.contact-grid` uses `align-items: start`, so the embed (700px tall) and the
  `.contact-card` (~440px) are allowed to have different heights side by side — that's
  expected, not a bug. Note: headless screenshot tools may time out trying to capture
  this page because the live Calendly iframe's background activity prevents the
  "network idle" state some capture tools wait for — verify via DOM inspection
  (check for `.calendly-inline-widget iframe` and its `src`/dimensions) instead of
  relying on a screenshot when working on this section.

## Deployment

Static files only — **no build step**. Deploy by dragging the project folder (or a zip
of it) into Netlify. Relative paths matter: pages inside `/services/` or `/locations/`
reference shared assets as `../css/style.css`, `../js/main.js`, and link back to the
homepage as `../index.html`; the homepage references them as `css/style.css`,
`js/main.js`, `services/*.html`, `locations/*.html`. A service page linking to a
location page (or vice versa) crosses into the sibling folder, e.g.
`../locations/punta-gorda.html` from within `services/`. Keep this relative-path
convention when adding new pages.

## Local dev / preview

There's no Node or Python on this machine by default. A minimal static file server for
local preview lives at `.claude/serve.ps1` (plain PowerShell, uses
`System.Net.HttpListener`), wired up via `.claude/launch.json` under the config name
`static-site` (port 8080). Use the preview tool's `preview_start` with that name rather
than trying to `npx serve` or similar.

## Git

Repo is on GitHub at `https://github.com/boogmasterjones/rsitile`. Author identity for
commits in this repo is `Wyatt <boogmasterjones@gmail.com>` (set locally, not global).
Note: this machine has Windows **Controlled Folder Access** enabled, which blocks
`git.exe`/`bash.exe`/`powershell.exe` from writing to this Documents-folder project
unless explicitly exempted by exact binary path — if git commands mysteriously fail
with permission-flavored errors on a fresh machine, that's almost certainly why.
