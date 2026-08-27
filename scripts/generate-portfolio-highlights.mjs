// scripts/generate-portfolio-highlights.mjs
//
// Precomputes the homepage portfolio-teaser's 3 marquee rows (~24 items)
// at build time. Previously PortfolioMarquee.tsx did this picking/shuffling
// itself from the full lib/portfolioManifest.json (388 items, ~131KB) — and
// because it renders on Home, the one page App.tsx keeps out of the lazy
// route-splitting (SSR only ever matches '/'), that whole manifest rode
// along in the main JS chunk just to extract 24 items from it. Every other
// page that needs the full manifest (Portfolio.tsx, ServiceBeforeAfterMarquee
// on service-landing pages) is already lazy-loaded, so only the homepage
// teaser needed this treatment.
//
// Run before vite build (see package.json/vercel.json) so the small output
// file is on disk when Home.tsx's static import graph resolves it — and
// before `vite`/dev too, since nothing else produces it.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const allItems = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'lib/portfolioManifest.json'), 'utf-8')
);

const PER_CATEGORY = 2;
// Categories to front-load on the homepage teaser, so the very first
// photos a visitor sees showcase these service types.
const PRIORITY_CATEGORIES = ['special', 'fire', 'flood', 'interior', 'new-construction'];
const ROW_COUNT = 3;

// Fixed-seed shuffle — deterministic (no Math.random) so the output is
// identical on every build, not just identical between SSR and hydration.
function seededShuffle(arr, seed) {
  const result = [...arr];
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Deterministic, category-diverse subset — first N per category (by
// manifest/file order) rather than "curating the best ones", so as not to
// pretend to a quality judgment on photos nobody has actually reviewed.
function pickHighlights(items, perCategory) {
  const counts = new Map();
  const picked = [];
  for (const item of items) {
    const n = counts.get(item.category) || 0;
    if (n < perCategory) {
      picked.push(item);
      counts.set(item.category, n + 1);
    }
  }
  return picked;
}

const rawHighlights = pickHighlights(allItems, PER_CATEGORY);
const priorityHighlights = seededShuffle(
  rawHighlights.filter((item) => PRIORITY_CATEGORIES.includes(item.category)),
  20260825
);
const restHighlights = rawHighlights.filter((item) => !PRIORITY_CATEGORIES.includes(item.category));
const highlights = [...priorityHighlights, ...restHighlights];
// Alternate into N rows so each row still spans most categories, instead
// of row 1 getting the first chunk of categories and the rest trailing off.
const rows = Array.from({ length: ROW_COUNT }, (_, r) =>
  highlights.filter((_, i) => i % ROW_COUNT === r)
);

fs.writeFileSync(
  path.join(ROOT, 'lib/portfolioHighlights.json'),
  JSON.stringify(rows),
  'utf-8'
);
console.log(`  ✓ lib/portfolioHighlights.json (${highlights.length} items across ${ROW_COUNT} rows)`);
