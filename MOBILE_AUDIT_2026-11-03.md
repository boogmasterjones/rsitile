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

---

# Pass 3 (final, 2026-11-03)

## How it was checked

- Full-page screenshots of all 30 pages at 360x780, 390x844, 430x932, 768x1024, 1024x1366, 1024x768 and 1180x820 (210 pages, with touch emulation, reveals finished and lazy photos loaded), plus scroll-by-scroll frames of the main page types at 360 and 390 and the opened menu at 768, 1024 and 1180.
- Automated sweeps on all 30 pages at those 7 sizes plus 1112x834: sideways scroll, text under 12.5 px, tap targets under 44 px, text spilling out of its box, one-word last lines in headings and FAQ questions.
- Contrast sweep at 1440 and 1280 (desktop bugs), and a check that every new `nowrap` span keeps its parent's font, size and colour (50 spans on 27 pages, 0 differences).
- **Desktop proof:** the layout fingerprint (box plus 30 computed styles for every element) of all 30 pages at 1440 and 1280, before and after. **26 pages identical.** The only differences are the three approved bug fixes: the FAQ text colours on the 7 location pages (96 elements, colour only) and the stray Markdown on 4 pages (it moves onto the page grid, so those 4 pages grow 270-410 px and everything below it moves down). Inlining the stylesheet changed nothing.
- `npm run check` 0 errors, `npm run build` 30 pages, `npm run audit` 0 errors (the old /404 warning).

## What passes 1 and 2 missed, and the fixes

| # | Where | Problem | Fix |
|---|---|---|---|
| 1 | **Desktop bug.** All 7 location pages, every width | FAQ questions invisible (ivory on white, 1.1:1), answers 1.9:1 (approved fix) | Ink questions, muted answers at every width (moved out of the tablet query) |
| 2 | **Desktop bug.** Kitchen and bathroom service pages, North Port, Port Charlotte, every width | The Markdown the platform appended after the last HTML section ("Serving Sarasota, Punta Gorda...", "Bathroom Tiling in North Port"...) sat straight in `<main>`: no side gutter (text against the screen edge), 1,400 px lines on desktop, browser-default bullets | `main > h2/h3/p/ul/ol` sit on the page grid with the content-block type, a 780 px measure, brass tile bullets, underlined links and spacing to the sections around them; on phones the town links are 44 px rows. No content file touched |
| 3 | **Bug at every width.** 27 pages | A written phone number broke after its hyphen ("Call (941) 276- / 0305") in body copy and FAQ answers | A build step (`src/integrations/nowrap-phone.mjs`) wraps written numbers in `<span class="nowrap">` after the build, never inside a tag, attribute, script, style, button or the big phone links. No desktop line changed |
| 4 | **Bug at every width** (old iPhones) | A picked service or timing option is styled only with `:has()`; on iOS Safari before 15.4 a picked option looked unpicked | `main.js` also sets `.is-on` on the option, styled the same |
| 5 | Phones and tablets | Older iOS (no `svh`): the opened menu had no height limit, so an opened drop-down could run off the screen without scrolling | `100vh` fallback before the `100svh` value |
| 6 | Tablet landscape 1024-1180 | Opened menu a full-width sheet with a 960 px Call button | A 400 px right-hand panel that slides in over a dimmed page (tap outside or Esc closes it) |
| 7 | 1024-1180 (iPad landscape, 12.9-inch portrait) | Proof strip a 2 x 2 block with a wide empty middle | One row of four, as on smaller tablets |
| 8 | Blog index, phones | Title-only cards with 4-5 ragged lines of tight 18 px Gloock under a short 16:10 photo; categories breaking unevenly | 17 px titles, line-height 1.2, balanced lines; a 4:3 photo; balanced 11 px category; slightly tighter padding (descriptions stay off) |
| 9 | Footer, phones | Privacy/Terms were inline-blocks with 11 px padding, which opened a 32 px gap inside the copyright line ("Licensed & / [gap] Insured.") | The copyright reads as one balanced block; Privacy · Terms sit on their own 44 px row |
| 10 | Footer, phones and tablets | "Blog" 30 px wide, "Terms" 37-41 px | Wider hit areas (padding with matching negative margin, the words don't move) |
| 11 | Quote form consent, phones and tablets | Privacy Policy / Terms links 41 px tall, Terms 36 px wide | 45 px tall, 44 px wide, nothing moves |
| 12 | Card names, FAQ questions, headings (phones; headings and FAQ up to 1180) | One-word last lines: "Port Charlotte, / FL", "Tile Installer in Sarasota, / FL" (768), "...call you / back", about ten FAQ questions at 768 | `text-wrap: balance` on card names, FAQ and schedule toggles, page headlines and content headings; `pretty` on running text. Not on the step titles, where balance split "Free In- / Home" |
| 13 | Location and service pages, up to 1180 | "Why ... Homeowners Choose Us" was the only section label without the brass tile mark | Mark added (desktop left as it is: a design point, not a bug) |
| 14 | Phones | Hero chips 11 px, hero photo caption 10 px, photo-strip place names 10.5 px; tablets: inner-page photo captions 10 px | 11.5 px chips (still one line at 360), 10.5 px caption, 11 px place names and tablet captions. The homepage mosaic captions stay 10.5 px: its 110 px cells clip anything larger |
| 15 | Every page (speed) | The one stylesheet was the only render-blocking request (est. 0.3-0.5 s) | Inlined into each page (`build.inlineStylesheets: 'always'`, about 15 KB compressed); no visual change |

Checked and fine: no sideways scroll anywhere; animations are transform/opacity only (the new menu slide and scrim too) and nothing new moves on scroll; older iOS without `:has()` or `text-wrap` falls back to plain wrapping, the duplicate footer CTA on the blog shows again (harmless) and the option picks now still show; every price, fact, "24/7", `data-cta`, `call_click` (the click handler uses `closest()`, so the new spans inside tel links still fire it), the forms, SMS consent and Calendly are untouched; two-up grids kept.

## Lighthouse (mobile, local production build with gzip, analytics and Calendly blocked)

| Page | Performance (before -> after) | LCP | FCP | CLS | TBT | Accessibility / Best practices / SEO |
|---|---|---|---|---|---|---|
| Home | 97 -> 99 | 2.4 -> 2.1 s | 1.4 -> 1.2 s | 0 | 60 ms | 100 / 100 / 100 |
| Service (shower) | 98 -> 99 | 2.2 -> 2.0 s | 1.4 -> 1.2 s | 0 | 0 | 100 / 100 / 100 |
| Location (Venice) | 99 -> 99 | 2.0 -> 1.8 s | 1.4 -> 1.2 s | 0 | 0 | 100 / 100 / 100 |
| Blog index | 98 -> 99 | 2.3 -> 2.0 s | 1.4 -> 1.2 s | 0 | 0 | 100 / 100 / 100 |
| Article (kitchen guide) | n/a -> 98 | 2.3 s | 1.2 s | 0 | 0 | 100 / 100 / 100 |

The win is the inlined stylesheet (render-blocking request gone, FCP 1.4 -> 1.2 s on every page). Lab numbers on a local machine; rule 7.1 still wants PageSpeed Insights on the live URL after a deploy.

Left alone (no look change possible without new image sizes): the homepage and service-page photo strips download the 800 px WebP for a 200-300 px slot (Lighthouse estimates 120-260 KB). They are lazy and off the first screen, so they don't affect LCP. A 400 px variant from `optimize-images.mjs` would fix it; that writes new files into `public/images`, so it's left for a template change.

## Still the owner's call (unchanged)

Call-button position (700 px at 390x844), dropped card descriptions, reviews fold, SEO-text fold, Calendly height; the in-article CTAs written into the blog Markdown remain inline text links (content-owned).

## Real-phone checklist for the owner (iPhone)

1. Home page: the Call button is on the first screen without scrolling, and tapping it opens the dialer with (941) 276-0305.
2. Scroll down any page: the dark "Call now / Free estimate" bar slides up, hides while the quote form is on screen, and nothing hides behind it at the very bottom of the footer.
3. In the quote form, tap two services and a timing: each tapped button turns dark brown. Tick the SMS box by tapping its text.
4. Open the menu (top-right), open "Services", scroll inside it, then tap a page: it goes there and the menu closes.
5. Open a location page (say Venice), scroll to "Venice Tile Installation Questions" and open one: the question and answer are dark and easy to read.
6. Blog page: the cards look even and read well, two across; nothing is cut off.
7. Footer: open "Services" with the +, tap "Privacy": it opens. Check the phone number never splits over two lines anywhere you see it in the text.
8. If you have an iPad: turn it sideways and open the menu: it should slide in from the right as a panel.
