// scripts/generate-portfolio-highlights.mjs
//
// Builds the homepage portfolio-teaser's initial (SSR-safe) 3 rows from a
// hand-picked list of item ids in lib/portfolioHighlightIds.json, rather
// than pulling in the full ~131KB/388-item portfolioManifest.json client
// side. Home.tsx (which renders PortfolioMarquee) is the one page App.tsx
// keeps out of the lazy route-splitting, so anything imported there rides
// along in the main JS chunk on every load.
//
// The actual on-visit randomization happens client-side in
// PortfolioMarquee.tsx (a real per-visit shuffle can't be baked into a
// prerendered file without breaking SSR/hydration) — this script only
// produces the deterministic order used for the very first paint, before
// that shuffle runs.
//
// To change which cases appear here: edit lib/portfolioHighlightIds.json
// (just the id strings — order doesn't matter, it gets shuffled anyway)
// and re-run `npm run build` or `npm run dev`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const allItems = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'lib/portfolioManifest.json'), 'utf-8')
);
const highlightIds = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'lib/portfolioHighlightIds.json'), 'utf-8')
);

const byId = new Map(allItems.map((item) => [item.id, item]));
const missing = highlightIds.filter((id) => !byId.has(id));
if (missing.length > 0) {
  console.error(`  ✗ lib/portfolioHighlightIds.json references ${missing.length} unknown id(s): ${missing.join(', ')}`);
  process.exit(1);
}

const highlights = highlightIds.map((id) => byId.get(id));

const ROW_COUNT = 3;
const rows = Array.from({ length: ROW_COUNT }, (_, r) =>
  highlights.filter((_, i) => i % ROW_COUNT === r)
);

fs.writeFileSync(
  path.join(ROOT, 'lib/portfolioHighlights.json'),
  JSON.stringify(rows),
  'utf-8'
);
console.log(`  ✓ lib/portfolioHighlights.json (${highlights.length} hand-picked items across ${ROW_COUNT} rows)`);
