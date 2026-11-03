// Build step: keeps every written phone number on one line. "(941) 276-0305" used to break after its hyphen on phones
// ("Call (941) 276- / 0305") in body copy and FAQ answers that the platform writes in content/. After the build, each
// match in the text of every page (never inside a tag, an attribute, a script, a style or the <title>) is wrapped in
// <span class="nowrap">; site.css keeps that span on one line. No dependencies; nothing else changes.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PHONE = /(?:\+?1[ .-]?)?\(\d{3}\)[ \u00a0]?\d{3}-\d{4}|\b\d{3}[.-]\d{3}-\d{4}\b/g;
// Buttons, the header number and the footer number already sit on one line (and an extra span inside a flex button
// would change its spacing), so text inside them is left alone.
const KEEP = /\bclass="[^"]*\b(btn|btn-sq|num|tel|q-call|nowrap)\b/i;
const VOID = /^<(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr|path|circle|rect|line|polyline|polygon|use|stop)\b/i;

// A whole <script>/<style>/<title>/<textarea> block (its content may hold "<" and ">", e.g. inlined CSS), or one tag.
const TOKEN = /<(script|style|title|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>|<[^>]*>/gi;

export function wrapPhones(html) {
  let out = '';
  let last = 0;
  const keep = []; // one entry per open element: true when its text is left alone
  const text = (t) => (keep[keep.length - 1] ? t : t.replace(PHONE, '<span class="nowrap">$&</span>'));
  for (const m of html.matchAll(TOKEN)) {
    out += text(html.slice(last, m.index));
    const tag = m[0];
    if (!m[1]) {
      if (tag.startsWith('</')) keep.pop();
      else if (!tag.startsWith('<!') && !tag.endsWith('/>') && !VOID.test(tag)) {
        keep.push(KEEP.test(tag) || /^<button\b/i.test(tag) || keep[keep.length - 1] === true);
      }
    }
    out += tag;
    last = m.index + tag.length;
  }
  return out + text(html.slice(last));
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : f.endsWith('.html') ? [p] : [];
  });
}

export default function nowrapPhone() {
  return {
    name: 'nowrap-phone',
    hooks: {
      'astro:build:done': ({ dir }) => {
        let n = 0;
        for (const f of htmlFiles(fileURLToPath(dir))) {
          const html = readFileSync(f, 'utf8');
          const next = wrapPhones(html);
          if (next !== html) { writeFileSync(f, next); n++; }
        }
        console.log(`nowrap-phone: written phone numbers kept on one line on ${n} pages`);
      },
    },
  };
}
