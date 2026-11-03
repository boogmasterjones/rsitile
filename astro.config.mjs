// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import nowrapPhone from './src/integrations/nowrap-phone.mjs';

const siteData = JSON.parse(readFileSync(new URL('./data/site.json', import.meta.url), 'utf8'));

export default defineConfig({
  site: siteData.site.url,
  // Emits /about.html, which Netlify serves at /about. Keeps URLs free of trailing slashes.
  // The one stylesheet (about 15 KB compressed) is inlined into each page: on a phone the separate request was the
  // only render-blocking resource and cost about 0.3-0.5 s of first paint and LCP in Lighthouse (mobile pass 3).
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'never',
  // a written phone number never breaks across two lines ("276- / 0305" on phones)
  integrations: [nowrapPhone()],
});
