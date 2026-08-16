// scripts/optimize-images.mjs
//
// One-off script (not part of the build) to shrink the bundled hero/step
// images flagged by Lighthouse's "Improve image delivery" insight: they
// were copied as-is from another repo at desktop-container size (900px+)
// but are displayed much smaller on mobile. Generates a "-mobile" webp
// variant for responsive <img srcset> use, and re-encodes the logo and
// mobile hero in place at a size/quality that matches how they're shown.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const DIR = path.resolve(import.meta.dirname, '..', 'public', 'images');

async function makeMobileVariant(name, width, quality = 78) {
  const src = path.join(DIR, `${name}.webp`);
  const dest = path.join(DIR, `${name}-mobile.webp`);
  const info = await sharp(src).resize({ width }).webp({ quality }).toFile(dest);
  console.log(`${name}-mobile.webp: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`);
}

// Writes to <name>.webp.new instead of overwriting in place — on Windows the
// source file can be locked (editor/indexer/AV), and toFile()/rename() onto
// an open handle fails with EBUSY/EPERM. Caller swaps the file in after this
// process exits and releases its handles.
async function reencodeToNewFile(name, { width, quality = 80 } = {}) {
  const src = path.join(DIR, `${name}.webp`);
  const out = path.join(DIR, `${name}.webp.new`);
  const buf = await sharp(src).resize(width ? { width } : undefined).webp({ quality }).toBuffer();
  await fs.writeFile(out, buf);
  console.log(`${name}.webp.new: ${(buf.length / 1024).toFixed(0)}KB`);
}

await makeMobileVariant('eco-neutralization', 700);
await makeMobileVariant('visit-notification', 700);
await makeMobileVariant('top-to-bottom-cleaning', 700);
await makeMobileVariant('confirmation-aftercare', 700);
await makeMobileVariant('diagnosis-process', 700);
await makeMobileVariant('professional-cleaning', 520);

await reencodeToNewFile('logo', { width: 200, quality: 75 });
await reencodeToNewFile('hero-tree-family-mobile', { quality: 75 });

console.log('Done.');
