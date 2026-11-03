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
