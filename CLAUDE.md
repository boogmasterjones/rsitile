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

The site runs a **dark theme** site-wide (rebuilt 2026-10-02, modeled on
clearvantwc.com's modern look but on Rock Solid Tile's own palette — navy surfaces
and gold accents in place of Clearvant's bronze/orange). There is no light mode;
every page sits on the same dark surface stack.

Defined as CSS custom properties at the top of `css/style.css` — always use the
variables, never hardcode these hex values in new markup/CSS:

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#0A111D` | Page background (carries a faint dot field) |
| `--bg-alt` | `#0E1726` | `.section--mid` tinted band, form inputs, breadcrumbs |
| `--surface` | `#142034` | Cards, form panel, FAQ items, dropdown |
| `--line` | `#243550` | Card/input borders |
| `--navy` | `#142338` | Hero base + gradient bands (`.section--navy`, `.stats-bar`) |
| `--blue` | `#0E6EF5` | Primary CTAs, card top rules, focus rings |
| `--gold` | `#D2AE52` | Accents: eyebrows, corner folds, header rule, phone icon |
| `--text` | `#F4EFE4` | Headings (warm cream, not pure white) |
| `--body-text` | `#BAC4D3` | Body copy |
| `--muted` | `#8392A8` | Labels, captions, footer links |

**Typography:** Barlow Condensed (600/700/800) for all headlines, uppercase by
default via a global `h1–h4` rule (`--font-head`); Plus Jakarta Sans for body copy
and buttons (`--font-body`). Both via Google Fonts — the `<link>` is identical on
all 25 pages, so change it everywhere at once if it's ever updated.

**Signature elements:**
- Hero sections keep the tile-grid background — thin 1px lines at 80px intervals
  (`.hero::before`), now layered *above* the hero photo so the grout lines read over
  the image. Pure CSS; don't recreate it with an image.
- **Card language:** a shared rule styles `.card`, `.related-card`, `.area-card`,
  `.material`, `.testimonial-card` and `.contact-card` as flat dark panels with a
  3px blue top rule, a gold corner-fold triangle (`::before`), and a lift on hover
  (top rule turns gold). New card types should join that selector list rather than
  inventing their own treatment.
- **Diamond icon badges:** 45°-rotated rounded squares with the icon counter-rotated
  inside (`.why-item .icon`, `.area-card .icon-badge`, `.stat .stat-icon`). Blue
  gradient for service/area icons, gold gradient for stat tiles.
- **Buttons** are square-ish (`--radius-sm`, 4px), uppercase, letter-spaced, with
  gradient fills and a 3px hover lift.

**Carousels:** `.carousel` is a CSS grid — the track spans row 1 and the prev/next
round buttons sit centered *underneath* it in row 2 (no absolute positioning, and
they stay visible on mobile). Slides are cards: photo on top, caption in a padded
footer.

**Progressive quote form:** the contact form on `index.html` and `schedule.html`
opens as just Name + Phone and reveals the next group each time the previous one is
satisfied (phone+name → email/zip → service → timing/status/details/submit), with a
"Step X of 4" progress bar injected by JS. The groups are wrapped in
`.qf-step[data-step]` divs; `js/main.js` hides steps 2+ at runtime, so **without JS
the whole form renders normally** — keep that fallback intact. Submitting early
reveals every step and then runs native validation, so a hidden `required` field can
never silently block submission.

**Placeholders:** dashed-border placeholder blocks (`.placeholder` class) with
descriptive `aria-label`s (e.g. "Kitchen tile backsplash installation Port Charlotte
FL") are still used where real photography doesn't exist yet — currently that's just
the lanai page's hero/header slots (see Real photos below for everywhere else). When
dropping in a real photo over a placeholder, carry the `aria-label` text over as `alt`
text, and add `loading="lazy"` + explicit width/height to protect Core Web Vitals
(hero images are the exception — see below).

**Real photos:** client-supplied photos live in `assets/photos/<category>/`
(`bathroom`, `floor`, `kitchen`, `shower`, `lanai`, `locations`), used on the homepage
and all 5 service pages. Naming convention per category: `hero.jpg` (hero section
background), `header.jpg` (the content-block image beside the intro copy),
`example-1.jpg` through `example-4.jpg` (the "See Our Work" carousel photos; the
homepage carousel reuses the same 16 example files, shuffled, across
bathroom/floor/kitchen/shower — lanai's photos are excluded there since they're
materials, not project shots). The lanai category instead has 4 material-named files
(`porcelain-pavers.jpg`, `travertine.jpg`, `textured-tile.jpg`,
`natural-stone-coping.jpg`) dropped into the patio-lanai page's Materials cards.

**Location page photos:** unlike the 5 service categories, `assets/photos/locations/`
has only one client-supplied source photo per city (not separate hero/example shots),
so both the hero background and the content-block image on each location page reuse
the same source photo — one resized/cropped to `<city>-hero.jpg` (1600×900 cover-crop)
and one resized without cropping to `<city>-header.jpg` (native aspect ratio, long
edge capped at 1600px). Source photos originally lived in `website pictures/locations/`
(one arbitrary-sized file per city, one was `.webp`) and were processed with a
PowerShell script using WPF imaging (`System.Windows.Media.Imaging`), not
System.Drawing/GDI+, since GDI+ can't decode WebP. `port-charlotte`'s source was only
707×472, so its hero is upscaled to fill 1600×900 — a bit softer than the others, but
acceptable since the hero scrim darkens it substantially; ask for a higher-res Port
Charlotte photo if one becomes available.
  - **Sizing:** hero images are pre-cropped to 1600×900 and loaded eager with
    `fetchpriority="high"` (never lazy — they're the LCP element). Header images are
    capped at 1600px on the long edge; example/carousel photos are capped at 900px —
    both re-encoded at JPEG quality ~90 with high-quality bicubic resampling. Don't
    ship multi-thousand-pixel originals into small display boxes: letting the browser
    downscale a huge source image on the fly (rather than pre-resizing it close to its
    actual display size) causes visible moiré/softness on fine tile patterns no matter
    how high the JPEG quality is — resize server-side (well, file-side, no server here)
    instead.
  - **Carousel sizing model:** `.carousel-slide img` is sized by a fixed `height`
    (300px) with `width: auto` up to a `max-width` (340px), so mixed portrait/landscape
    photos share a uniform row height; landscape photos that would otherwise run wider
    than that cap get a light `object-fit: cover` crop instead of stretching the row.
    A couple of specific photos whose native ratio didn't suit their slide got a
    one-off override class (`crop-5-4`, `crop-5-7-right` in `style.css`) forcing a
    different `aspect-ratio` + `object-position` — check there before assuming every
    carousel photo uses its native ratio.

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
  service in `makesOffer`, plus `hasMap` (the real GBP link), `sameAs` (the business's
  real Facebook page), `openingHoursSpecification` (Mon–Fri 8am–6pm, Sat 10am–2pm), an
  `aggregateRating` (5.0, based on 5 reviews — confirmed by the client as the true
  current total, not an estimate), and five `Review` entries sourced verbatim from real
  Google reviews the client pasted in (Jill, Craig, Mary, Jed, Jessica). The schema
  also carries the business's real street address (`3321 Beacon Dr, Port Charlotte, FL
  33980`) and hours for SEO purposes only — **neither the address nor the hours may
  ever appear in visible/rendered page content**, only in the JSON-LD, per explicit
  client instruction. If the review count on GBP grows beyond 5, update
  `aggregateRating.reviewCount` to match — don't let it drift stale. Service pages
  carry their own `Service` + `BreadcrumbList` JSON-LD (see
  `services/bathroom-tile-installation.html` for the pattern).
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
- `sitemap.xml` lists every page with a `<lastmod>` date on each entry; `robots.txt`
  allows all. Keep both in sync any time a page is added or removed — `schedule.html`
  was initially missed and had to be added after the fact, so don't assume a new page
  is done until it's confirmed present in the sitemap. `404.html` is intentionally
  excluded (not a real crawlable page) and is `noindex`.
- **Google Analytics (GA4)**: the client's real gtag.js snippet (measurement ID
  `G-1VZNJ7102H`) is pasted into every one of the 15 pages, immediately after the
  opening `<head>` tag (Google's own placement requirement). If a new page is added,
  copy this same snippet into its `<head>` too, in the same position — don't forget it
  the way `schedule.html` was initially forgotten from the sitemap. Google Search
  Console is not yet set up (needs the client to create a property and either verify
  via a meta tag/DNS record or confirm ownership through the same Google account used
  for GA4).

## Page structure

**Built — 15 pages complete:**
- `index.html` — homepage
- `schedule.html` — dedicated scheduling page (live Calendly embed) that service and
  location pages' "Get a Free Estimate" buttons link to; linked from the homepage nav
  and every other page's header/footer
- `404.html` — branded not-found page (`noindex`), links back to the homepage and
  popular service pages
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
- `sitemap.xml`, `robots.txt` — list/allow all 14 crawlable pages (everything above
  except `404.html`)
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

**Homepage section order:** reveal-on-scroll header → hero (photo + tile-grid +
glass panel of 6 service tiles) → manual-scroll "Our Work" photo carousel → stats
band (30+ years / 1,000+ jobs / 5★ / free estimates, as diamond-icon tiles) →
testimonials carousel → contact (progressive quote form beside the live Calendly
embed) → services grid → "How It Works" 4-step row → why-us → service areas grid →
footer.

Background rhythm alternates deliberately: plain body (`.section`) → tinted band
(`.section--mid`) → deep gradient band (`.section--navy` / `.stats-bar`). Keep that
alternation when adding sections so long runs of the same surface don't flatten out.

## Notable implementation patterns

- **"Our Work" carousel:** CSS `scroll-snap` horizontal list, manually navigated via
  prev/next buttons (no autoplay/marquee — that was removed). `js/main.js`'s
  `scrollByAmount()` adds wrap-around: clicking next past the last slide scrolls back
  to the start, and prev past the first slide scrolls to the end. This same
  `.carousel`/`.carousel-track`/`.carousel-slide` markup and JS is shared by the
  homepage "Our Work" section, the homepage reviews carousel, and every service
  page's "See Our Work" section. The arrows are placed by grid (row 2, centered),
  not absolute positioning — the markup order is still prev → track → next.
- **Mobile card grids are two-up, not stacked and not swipe rows** (changed
  2026-10-02 at the client's request — this replaces the earlier swipe-row pattern).
  `.card-grid`, `.area-grid`, `.related-grid`, `.materials-grid` and `.steps` all go
  to `repeat(2, 1fr)` with a 12px gap inside the `@media (max-width: 640px)` block, so
  a phone screen shows several options at once instead of one full-width card per
  row. Card text is kept compact with `-webkit-line-clamp` (titles 3 lines, body
  copy 3 lines) so the cards in a row stay the same height. The only remaining
  horizontal swipe row on mobile is the reviews carousel, which is a carousel by
  design. Apply the two-up grid to any new card type.
- **Mobile CTA treatment:** buttons go full-width and stack (`.hero-actions`,
  `.section-cta`, `.cta-actions` all become `flex-direction: column`) at ~0.92rem —
  the client wants CTAs to be big and prominent on phones, so don't shrink them to
  fit two across.
- **The homepage hero's glass service panel (`.hero-visual`) is desktop-only** —
  `display: none` on mobile, where it pushed the CTAs below the fold. The hero lede
  is also clamped to 4 lines on mobile so the headline and buttons lead; the full
  text stays in the DOM.
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
