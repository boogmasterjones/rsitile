import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

export type ImageInfo = { src: string; webp: string | null; webpSmall: string | null; width: number; height: number };

const cache = new Map<string, Promise<ImageInfo | null>>();
const PUBLIC_DIR = join(process.cwd(), 'public');
const nonEmpty = (p: string) => existsSync(join(PUBLIC_DIR, p)) && statSync(join(PUBLIC_DIR, p)).size > 0;

// Resolves a /images/... path to its real dimensions and its WebP siblings (full and 800w, made by scripts/optimize-images.mjs).
export function imageInfo(src: string | undefined): Promise<ImageInfo | null> {
  if (!src) return Promise.resolve(null);
  if (!cache.has(src)) {
    cache.set(
      src,
      (async () => {
        const file = join(PUBLIC_DIR, src);
        if (!existsSync(file)) return null;
        const meta = await sharp(file).metadata();
        const webpPath = src.replace(/\.(jpe?g|png)$/i, '.webp');
        const smallPath = src.replace(/\.(jpe?g|png)$/i, '-800w.webp');
        const hasWebp = webpPath !== src && nonEmpty(webpPath);
        return { src, webp: hasWebp ? webpPath : null, webpSmall: hasWebp && nonEmpty(smallPath) ? smallPath : null, width: meta.width ?? 1200, height: meta.height ?? 800 };
      })(),
    );
  }
  return cache.get(src)!;
}

/** The WebP srcset for a photo: the 800 px copy plus the full file, with their real widths. */
export function webpSrcset(info: ImageInfo): string | undefined {
  if (!info.webp) return undefined;
  return info.webpSmall ? `${info.webpSmall} 800w, ${info.webp} ${info.width}w` : info.webp;
}
