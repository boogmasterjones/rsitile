// Blog front matter still names the old /assets/photos files (they stay as the og:image and schema image, unchanged).
// On the page we show a straightened real job photo instead, and never the stock city photos (SITE_RULES 4.1).
import photos from '../../data/photos.json';

const all = [...photos.gallery, ...photos.mosaic, ...Object.values(photos.more)];
const byFile = (f: string) => all.find((p) => p.src.endsWith('/' + f));

const REAL: Record<string, string> = {
  '/assets/photos/kitchen/hero.jpg': '/images/work/c07-mosaic-backsplash.jpg',
  '/assets/photos/shower/hero.jpg': '/images/work/svc-travertine-shower.jpg',
  '/assets/photos/bathroom/hero.jpg': '/images/work/hero-bath.jpg',
};

/** The photo shown at the top of a post: only when its own front-matter image is a real job photo. */
export function displayPhoto(src: string | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('/images/')) return src;
  return REAL[src] ?? null;
}

// Blog index cards: a real job photo that matches each guide's topic (no lanai photo exists, so that card shows the tile panel).
const CARD: Record<string, string> = {
  'bathroom-remodel-cost-port-charlotte': 'c11-penny-wall-tub.jpg',
  'tub-to-shower-conversion-port-charlotte': 'c09-diamond-panel-shower.jpg',
  'bathroom-tile-installation-bradenton': 'hero-bath.jpg',
  'historic-home-tile-bradenton': 'c15-brick-entry.jpg',
  'tile-contractor-bradenton': 'c06-herringbone.jpg',
  'tile-contractor-southwest-florida': 'hero-slab-shower.jpg',
  'kitchen-tile-remodeling-guide': 'c07-mosaic-backsplash.jpg',
  'bathroom-tile-installation-cape-coral': 'c05-subway-tub.jpg',
  'how-to-choose-a-tile-contractor': 'hero-kitchen.jpg',
  'shower-tile-installation-guide': 'svc-travertine-shower.jpg',
};

export function cardPhoto(slug: string): { src: string; alt: string } | null {
  const f = CARD[slug];
  const p = f ? byFile(f) : undefined;
  return p ? { src: p.src, alt: p.alt } : null;
}
