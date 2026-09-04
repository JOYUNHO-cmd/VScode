// One-off script: generate hero images for the two new service pages
// (후드청소, 관공서·학교청소) from the owner's real 시공 사진, matching the
// 900x1200 portrait crop already used by every other service-*.webp hero
// (see public/images/services/). Source is the same "메인" folder that
// holds the single named hero source photo for each of the other 12
// services (공장.jpg, 사무실.jpg, ...) — 후드.jpg and 학교&관공서.jpg are
// the owner's dedicated hero photos for these two new services.
import sharp from 'sharp';
import path from 'node:path';

const SRC_ROOT = 'C:/Users/PC/Desktop/홈페이지 이미지 사용/메인';
const OUT_DIR = path.resolve(import.meta.dirname, '..', 'public', 'images', 'services');

async function makeHero(srcName, outName) {
  const src = path.join(SRC_ROOT, `${srcName}.jpg`);
  const dest = path.join(OUT_DIR, `${outName}.webp`);
  const info = await sharp(src)
    .rotate()
    .resize({ width: 900, height: 1200, fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toFile(dest);
  console.log(`${outName}.webp: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`);
}

await makeHero('후드', 'service-hood');
await makeHero('학교&관공서', 'service-government-school');

console.log('Done.');
