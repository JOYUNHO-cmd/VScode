// One-off script: replace the AI/stock Unsplash hero images at the top of
// /portfolio and /contact with the owner's real photos, converted to
// web-optimized WebP (desktop + mobile variants), matching the pattern
// already used for the homepage hero (scripts/optimize-images.mjs).
import sharp from 'sharp';
import path from 'node:path';

const SRC_DIR = 'C:/Users/PC/Desktop/홈페이지 이미지 사용';
const OUT_DIR = path.resolve(import.meta.dirname, '..', 'public', 'images');

async function makeVariant(srcName, outName, width, quality) {
  const src = path.join(SRC_DIR, `${srcName}.jpg`);
  const dest = path.join(OUT_DIR, `${outName}.webp`);
  const info = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(dest);
  console.log(`${outName}.webp: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`);
}

// 현장시공사례.jpg: /portfolio hero — real crew photo, source is 4282x2992
// (3.6MB), way past any display size, so both variants downscale hard.
// Sits behind a heavy dark overlay (opacity-60 + gradient) on the page, so
// the extra compression here is essentially invisible in practice.
await makeVariant('현장시공사례', 'portfolio-hero', 1400, 66);
await makeVariant('현장시공사례', 'portfolio-hero-mobile', 800, 66);

// 견적문의.jpg: /contact hero — source is already small (1079x621), so
// `withoutEnlargement` keeps the desktop variant at its native size
// instead of upscaling past what's actually there.
await makeVariant('견적문의', 'contact-hero', 1400, 78);
await makeVariant('견적문의', 'contact-hero-mobile', 700, 78);

console.log('Done.');
