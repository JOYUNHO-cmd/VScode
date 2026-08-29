// lib/shuffle.mjs
//
// Fisher-Yates shuffle — unbiased order randomization for portfolio photo
// grids. portfolioManifest.json is generated one category folder at a time,
// so filtering by category (or region) still leaves long same-sub-category
// runs (e.g. all "floor-adhesive-removal" shots before any "floor-tile"
// ones) unless the result is explicitly shuffled.
export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
