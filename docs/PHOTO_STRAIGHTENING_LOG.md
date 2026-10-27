# Photo straightening and privacy log (v3 redesign)

Every photo on the v3 site is one of Rock Solid Tile's own job photos, in `public/images/work/`. They are the processed copies made for the owner-approved concept mock-up (biggify-platform `docs/design-options/preview/rock-solid-tile-concept/images/`), reused as is, with the extra steps noted below. No new photo was added for the build.

How they were processed (concept round, 2026-10-26, Node + sharp): tilt measured from real straight lines in each frame (tile joints, wall corners, door and window frames, glass edges); a plain rotation where one angle fixes it, a keystone (four-point) warp where the verticals lean differently on the left and the right; cropped clean; checked on a grid overlay; privacy-cropped (phone stamps, toiletries, a TV reflection, private items). Build round, 2026-10-27: every file re-checked on an 8 x 8 grid overlay (all verticals and horizontals read true), four tall files capped at 1600 px, one retouch (c08).

| File | Source | Correction | Out (px) | Notes |
|---|---|---|---|---|
| c01-arched-window-shower.jpg | live carousel #1 (`shower/example-1`) | rotated -0.43° | 1100 x 1550 | live caption was "Glass-Enclosed Shower" (swapped with #12); corrected to "Shower with Built-In Bench" |
| c02-wood-plank-shower.jpg | live #2 (`bathroom/example-2`) | 0.00° (true) | 772 x 1600 | capped from 817 x 1694 |
| c03-white-kitchen.jpg | live #3 (`kitchen/example-1`) | 0.00° | 1400 x 787 | |
| c04-hex-strip-shower.jpg | live #4 (`shower/example-4`) | keystone: verticals 0.94 / -0.83°, horizontals 0 / 0 | 974 x 1600 | capped from 1100 x 1807 |
| c05-subway-tub.jpg | live #5 (`bathroom/example-4`) | keystone: verticals 2.36 / -4.57° | 627 x 1095 | |
| c06-herringbone.jpg | live #6 (`floor/example-3`) | 0.00° | 1400 x 1052 | |
| c07-mosaic-backsplash.jpg | live #7 (`kitchen/example-3`) | 0.00° | 695 x 1292 | cropped to the island and backsplash |
| c08-corner-tub.jpg | live #8 (`bathroom/example-1`) | keystone: verticals 0.15 / -1.31°, horizontals 0 / 0.71° | 993 x 1403 | 2026-10-27: a bar of soap on the tub rim cloned out (patched from the rim beside it, 2 px blur on the seam) |
| c09-diamond-panel-shower.jpg | live #9 (`shower/example-2`) | keystone: verticals 1.70 / -1.96°, horizontals 1.26 / -2.08° | 1038 x 1600 | capped from 1100 x 1695 |
| c10-geometric-shower.jpg | live #10 (`bathroom/example-3`) | keystone: verticals 0.00 / -2.40° | 481 x 759 | |
| c11-penny-wall-tub.jpg | live #11 (`kitchen/example-2`, mis-filed) | 0.00° | 1400 x 786 | |
| c12-glass-shower-bench.jpg | live #12 (`shower/example-3`) | keystone: verticals 1.83 / -0.79° | 803 x 668 | live caption was "Shower with Built-In Bench" (swapped with #1); corrected to "Glass-Enclosed Shower" |
| c13-pebble-strip.jpg | live #13 (`floor/example-4`) | 0.00° | 502 x 451 | |
| c14-blue-glass-backsplash.jpg | live #14 (`kitchen/example-4`) | 0.00° | 1400 x 1052 | |
| c15-brick-entry.jpg | live #15 (`floor/example-1`) | 0.00° | 1400 x 1120 | |
| hero-bath.jpg | `bathroom/hero` | 0.00° | 1600 x 971 | |
| hero-bath-phone.jpg | same frame, phone crop | 0.00° | 800 x 1068 | the phone hero float |
| hero-hex-floor.jpg | `floor/hero` | perspective-corrected so the hexagons are regular and pointy-topped (side 94.77 px, a centre at 321.1, 237.3) | 1400 x 823 | the signature's grout lines are drawn on this geometry |
| hero-slab-shower.jpg | library `20250627_151439.jpg` | keystone: verticals 6.35 / -1.68°, horizontals -0.45 / -0.92° | 827 x 1600 | phone stamp cropped; capped from 1000 x 1934 |
| hero-tub-window.jpg | `shower/header` | keystone: verticals 4.72 / 1.26°, horizontals 2.72 / -1.33° | 1200 x 674 | |
| hero-kitchen.jpg | library frame | 0.00° | 1200 x 959 | |
| hero-fireplace.jpg | `floor/header` | rotated 0.25° | 1200 x 552 | TV screen (photographer reflection) cropped out |
| svc-travertine-shower.jpg | `shower/hero` | 0.00° | 1100 x 834 | |
| svc-floor-room.jpg | library `floor example (4).jpg` | 0.00° | 1100 x 880 | |

## Removed from the pages (not straightened, not used)

- `assets/photos/locations/*`: aerial and skyline photos of the towns, not Rock Solid Tile's work (stock). Location pages now show real job photos instead.
- `assets/photos/lanai/*`: supplier swatches (one carries a supplier caption). The patio and lanai page has no photo (owner decision 5); its hero shows the four confirmed facts and its material cards are text.
- `assets/photos/testimonials/*`: customers' rooms beside their reviews; one shows a vanity with toiletries. The review cards carry no photos.

The old `/assets/photos/...` files stay in the repo because blog front matter still names a few of them as the og:image and schema image (unchanged on purpose; see the build report).
