# Mobile audit and makeover, pass 1 (2026-11-03)

Branch `mobile/2026-11-03` (from `seo/2026-10-31`). Not pushed, not deployed.

## How it was checked

- Every page (30) at 360x780, 390x844, 430x932 and 768x1024 with real device emulation (touch, mobile viewport), screenshotted top to bottom at 390 and spot-checked at the other widths; an automated pass at every width for sideways scroll, overflowing elements, tap targets under 44 px and text under 14 px.
- **Desktop proof:** a layout fingerprint of every visible element (position, size and 25 computed styles) on all 30 pages at 1440 and at 1280, taken before and after. Result: 9,776 elements compared at 1440 and 9,689 at 1280, **0 differences**, and no page height changed. All new markup (the "Show all reviews" button, the footer accordion toggles, the menu's Call button) is `display:none` on desktop. Every new rule sits in a `max-width:1023px`, `max-width:760px` or `max-width:374px` query, apart from the "hide on desktop" defaults for the new markup and the opened-menu Call button (`max-width:1180px`, only reachable when the phone/tablet menu is open).
- No sideways scroll at 360, 390, 430 or 768 on any page, before or after.
- `npm run check` (0 errors), `npm run build` (30 pages), `npm run audit` (0 errors; 1 old warning on /404).

Kept as is: brand, colours, every word, every fact, claim and price range, the 24/7 wording, animations (no reduced-motion opt-out), real photos only, phone links with their `data-cta` labels and the `call_click` handler, the quote form fields and the SMS consent text, Calendly. The client rule "card grids are two-up on phones, never stacked or swipe rows" (SITE_RULES, Rock Solid Tile) was kept and now also applies to the related-link cards, which used to stack one per row. Because of that rule the reviews are not a swipe row: they collapse behind a "Show all" button instead.

## Page length on a 390 px phone (scroll height)

| Page | Before | After |
|---|---|---|
| Home | 15,005 | 11,844 (-21%) |
| Services (5) | 11,777-13,317 | 10,469-11,699 (about -12%) |
| Locations (7) | 11,278-14,088 | 9,863-12,752 (about -11%) |
| Blog index | 7,617 | 5,292 (-31%) |
| Blog posts (11) | 7,666-11,196 | 6,608-10,138 (about -10%) |
| Schedule | 6,601 | 5,601 |
| Privacy / Terms | 5,334 / 5,055 | 4,321 / 4,043 |

## Scores (phone feel, out of 10, before -> after)

| Page | Before | After | Main reason |
|---|---|---|---|
| Home | 6.5 | 8.5 | 8 reviews stacked (about 3,000 px), the steps shown twice, two-up cards with 6-line blurbs, a stacked footer |
| Service pages | 6 | 8 | related links stacked one per row (two lists, 12 cards), 4 stacked reviews |
| Location pages | 6 | 8 | same as services; hero chip on two lines |
| Blog index | 6.5 | 8.5 | 11 two-up cards each with a 6-line description |
| Blog posts | 7 | 8.5 | three CTA blocks in a row after the article (side card, closing band, footer panel) |
| Schedule | 7 | 8 | reviews, footer |
| Privacy / Terms / Thank-you / 404 | 7.5 | 8.5 | footer, reviews |
| Tablet (768), home | 5.5 | 8 | squeezed hero mosaic (captions clipped, the "Layout first" caption in a 120 px cell), a 380 px-tall rating card, 8 reviews |

## Per-page issues and changes

### Every page
- **Header:** logo link was 33 px tall; now 44 px (and 44 px wide at 360, where only the mark shows).
- **Menu:** fine already (52 px rows, drop-downs); the opened menu now ends with a big "Call (941) 276-0305" button (`data-cta="menu"`, so it is tracked like every other phone link).
- **Hero chips** ("Licensed & Insured · Free Estimates") wrapped onto two lines; tighter tracking on phones keeps them on one.
- **Reviews (compact, inner pages):** the rating card is a slim strip (60 px score, stars, line, full-width Google button); the first two cards show, the rest open with "Show all N reviews". Without JavaScript every card shows.
- **Related-link cards** (other services, other areas): two-up instead of one per row, tighter padding; an odd last card spans the full row.
- **Closing CTA band:** heading sized for phones (28-34 px), tighter spacing.
- **Footer:** the Services and Service Areas lists fold into accordions (56 px rows with a brass +), the contact block keeps its 44 px links, the bottom line's Privacy/Terms links have 44 px hit areas. The footer is about a third shorter. Without JavaScript the lists show open.
- **Tap targets:** footer links 36 -> 44 px on phones and tablets; the SMS consent checkbox 18 -> 22 px with the whole label tappable; consent text 12.5 -> 13 px; the Privacy/Terms links inside it got a taller hit area without moving the text.

### Home
- Hero: the headline now grows with the screen (39 px at 360, 44 at 390, 49 at 430) so the 430 screen no longer has a big empty band; intro text 16-17.5 px (it was 15 px at 360). Call button bottom: 638 px at 360x780, 700 at 390x844, 788 at 430x932: on the first screen at every size.
- Quote band: the four numbered steps were the same four steps as "How It Works" further down; phones skip them here (desktop unchanged). Lead text 19 -> 16.5 px.
- Reviews: rating strip instead of a 380 px card; the first three reviews (the lead quote first), then "Show all 8 reviews".
- Services: two-up photo tiles with number and name; the one-line blurbs are dropped on phones (each service page says it in full). Photos square. The fifth (lanai) card is a side-by-side row with its blurb.
- Service areas: the pin moved to the card's bottom corner, so the name has the full width; the seventh card (Bradenton) spans the row instead of leaving a hole.
- Tablet (761-1023): the hero stacks (copy and buttons on top, 56-72 px headline, then the full-width 520 px mosaic, where every caption and the "Layout first" signature now have room); the proof strip is one row of four; the reviews get the rating strip and four cards plus "Show all".

### Services and locations
- Related cards two-up (12 stacked cards became 6 rows), reviews collapsed to two, hero chip on one line. The service-page photo strips are a little narrower so the next photo peeks in.

### Blog index
- Cards keep the photo, number, category and title; the long descriptions are dropped on phones. The eleventh card spans the row as a side-by-side card.

### Blog posts
- The "Talk to a local tile crew" side card is hidden on phones and tablets: it repeated the mid-article CTA and the closing band directly below it (the sticky call bar is there too). Reviews collapsed to two.

### Schedule, privacy, terms, thank-you, 404
- Shared changes only (reviews, footer, tap targets).

## Left for pass 2 to double-check

1. **Rule 1.3 (Call button bottom within 560 px at 390x844):** it sits at 700 px, as before this pass. The phone hero follows rule 10.10 (chip, three-line headline, intro beside the floated photo, buttons, full-screen height), and the long intro beside the photo needs about 9 lines. Getting under 560 would mean a shorter intro on phones or the buttons above the intro: an owner call.
2. **Card text sizes:** two-up cards still use 14.5 px for area blurbs and step text, 18-20 px Gloock for card names (the identity brief says 32 px and up for Gloock headings; the two-up rule makes that impossible). Read on a real phone.
3. **Dropped blurbs** (home service cards, blog cards on phones): confirm the owner is happy with photo + name only.
4. **Reviews behind "Show all":** the owner's brief suggested a swipe row; the client rule forbids swipe rows, so it is a collapse. Confirm which the owner prefers.
5. **Long SEO sections** (the end of the home page and the keyword sections on service and location pages, 600-1,500 px each) are untouched. A "Read more" fold would save a lot of scrolling, but it hides indexable text, so it needs a decision.
6. **Calendly embed** on /schedule is a tall fixed-height block on phones; its height is set in the content file, which the platform owns.
7. **Real devices:** check iOS Safari (safe-area under the call bar, the `100svh` hero) and a small Android in Chrome; headless screenshots don't load the horizontally scrolled photos, so the photo strips were checked by URL, not by eye.
8. Tablet landscape (1024-1180) was not changed: it still uses the existing two-column hero.

---

# Pass 2 (2026-11-03, fresh eyes)

## How it was checked

- Every page type (home, a service, a location, the blog index, a post, schedule, plus menu, footer accordions and "Show all reviews" opened) scrolled one screen at a time with real device emulation at 360x780, 390x844, 430x932, 768x1024, and for the first time at 1024x768 and 1180x820 (tablet landscape, touch). Frame-by-frame shots, so the scroll-in reveals, the sticky header, the call bar and the sideways photo strips (scrolled so their lazy photos load) show as a visitor sees them.
- Automated sweeps on all 30 pages: text contrast against its real background (this found the invisible FAQ), load CLS at 360, 390, 430, 768, 1024, 1100 and 1180, sideways scroll, tap targets, small text.
- **Desktop proof:** the same layout fingerprint as pass 1 (every element's box plus 30 computed styles), on all 30 pages at 1440 and 1280, before and after, with reveals finished and animations frozen so timing noise cannot hide a change: **21,267 elements compared, 0 differences, no page height changed.** Every new rule sits in a `max-width:1180px` (or narrower) query.
- `npm run check` 0 errors, `npm run build` 30 pages, `npm run audit` 0 errors (the old /404 warning).

## What pass 1 missed, and the fixes

| # | Where | Problem | Fix |
|---|---|---|---|
| 1 | All 7 location pages, every width | The FAQ sits on the dark band, so its questions took the band's ivory text **on white cards (contrast 1.1:1: invisible)** and the answers its pale grey (1.9:1). | Ink questions, muted answers, on phones and tablets (up to 1180). **Desktop has the same bug and was left alone** (see pass 3, item 1). |
| 2 | Header, 761-1180 px | With the menu folded, the phone number, Call and menu buttons sat packed against the logo, leaving a 100 px (768) to 380 px (1024) empty strip on the right. | They sit at the right edge, as on phones. |
| 3 | 360-374 px (most small Androids) | The wordmark was hidden: the header and the footer showed a bare "I". | "Rock Solid Tile" shows at 20 px (fits with room to spare; hidden again only under 340 px). |
| 4 | Tablet landscape 1024-1180 | Untouched by pass 1: a 360 px rating card with a 1,870 px-wide button, then all 8 reviews (about 2,000 px); the inner-page photos and fact box stopped at 640 px, leaving the right third empty. | The rating strip, lead quote + four cards + "Show all" now apply up to 1180; hero photos and fact boxes use the full width, the facts as one row of four. (A two-column hero was tried first and dropped: the font swap re-wrapped the headline in the narrower column, CLS 0.02-0.03.) |
| 5 | Reviews, 761-1180 | The big lead quote ran down one column as a 10-line sliver beside a short card. | The lead quote takes the full row; four cards follow in two even columns. Phones unchanged (three, then "Show all"). |
| 6 | Footer accordions (phones) | The "+" was a 9 px hairline glyph, easy to miss; the service names in two columns broke over two lines with ragged rows. | A drawn 16 px brass cross; the services list is one column (areas stay two-up); "Schedule a Call" and "Blog" sit side by side instead of in a half-empty grid. |
| 7 | FAQ toggles and the quote band's "Schedule A Call" toggle (phones, tablets) | Same thin Gloock "+" (about 9 px inside a 34 px box). | Drawn crosses. |
| 8 | Blog index and every article (phones) | "Ready to Start Your Tile Project?" band, two reviews, then the footer's "Ready to start your tile project?" panel with the same buttons: the same ask twice within one screen. | Phones keep the page's band and drop the footer panel on those pages only (`body:has(main > .cta-band + [data-rev]:last-child)`). The call bar stays up there, and the footer still clears it. |
| 9 | Tablets 761-1180 | SMS consent checkbox 18 px with 17 px-tall Privacy/Terms links; footer Privacy/Terms 18 px; footer links 36 px at 1024-1180; the email link beside the form 21 px. | 22 px checkbox, 44 px hit areas (inline padding, nothing moves), 44 px footer links. |
| 10 | Phones | "Or get a quote in 30 seconds" link 42 px tall; blog/schedule fact labels 12.5 px. | 44 px; 13.5 px. |
| 11 | Inner-page headlines (up to 1180) | One-word last lines possible ("... Sarasota, / FL"). | `text-wrap: pretty` on the page-hero H1 (not the homepage hero, which keeps rule 10.10). |

Checked and fine: no sideways scroll at any width; load CLS 0 on every page at 360, 390, 430, 768, 1024, 1100 and 1180; the menu (drop-downs, Call button), "Show all reviews" (focus moves to the first new card), footer accordions, the call bar (hides on the form and the footer panel; the footer's last line clears it); photo strips load and crop cleanly; every price, fact, "24/7", `data-cta` label and the forms untouched.

Home page height: 390 px 11,861 -> 11,871 (two 2 px taller tap targets); 768 px 12,926 -> 13,220 (the lead quote's full row plus one more review); 1024 px 12,873 -> 12,408; 1180 px 12,814 -> 12,400. Blog index at 390: 5,309 -> 4,945.

## New evidence on the owner's open decisions (nothing changed)

- **Call button vs the 560 px rule:** unchanged at 700 px (390x844); 638 px at 360x780.
- **Card descriptions dropped on phones:** without the blurb the blog cards are title-only, and the long titles run to 4-5 lines of 18 px Gloock in a 160 px column ("Kitchen Tile Remodeling Guide for Southwest Florida"); that is the cost to weigh.
- **Reviews fold vs swipe row:** the fold now behaves the same up to 1180 px, so iPads in landscape get it too.
- **Folding the long SEO text:** the keyword H2s on service and location pages run to 4-5 lines on phones ("Custom Shower Tile Installation in Southwest Florida — Walk-In Showers, Niches & Waterproofing"); a fold would hide the heading as well.
- **Calendly height:** nothing new.

## Left for pass 3

1. **Desktop location FAQ is invisible** (1181 px and up, all 7 location pages). Needs the owner's OK because it changes desktop. The fix is two lines, the same as the phone/tablet rule: `.section--navy .faq-item summary{color:var(--ink)}` and `.section--navy .faq-item > p,.section--navy .faq-item > div{color:var(--muted)}`.
2. In-article CTAs written into the blog Markdown ("Call (941) 276-0305 Or Schedule A Later Call") are plain inline text links, 22 px tall. They live in `content/`, which the platform owns; turning them into buttons is a content or template-contract change.
3. Inline text links in paragraphs (the city list under "Tile Installers Serving Southwest Florida", "Contact us", "how to choose a tile contractor") are 22 px tall. WCAG exempts inline links; padding them would push the lines apart.
4. At 1024-1180 the opened menu is a full-width sheet with a 960 px Call button; a right-hand panel would feel more at home on an iPad.
5. The hero mosaic captions are 10-10.5 px and the hero chip 11 px (uppercase, tracked labels). They are legible but at the floor.
6. Real devices: iOS Safari (safe area under the call bar, `100svh`) and a small Android; still not done.
