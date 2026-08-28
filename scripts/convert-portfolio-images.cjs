// One-off script: convert real 시공 전/후 (before/after) photos into
// web-optimized WebP for the homepage teaser marquee and the full
// /portfolio gallery. Source is organized as one folder per cleaning
// category, each containing "<title> 전.jpg" / "<title> 후.jpg" pairs.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_ROOT = 'C:/Users/PC/Desktop/홈페이지 이미지 사용/전후 사진 업로드 폴더';
// Deliberately NOT public/images/portfolio/ — that folder already holds
// unrelated before/after images used inline in ServiceLanding.tsx's old
// before/after slider. A dedicated folder avoids any chance of this
// script's directory-wipe step deleting that existing, unrelated content.
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'portfolio-gallery');
const MAX_WIDTH = 640;
const QUALITY = 70;

// Korean folder name -> { slug, label } for filter chips / file naming.
const CATEGORY_MAP = {
  '건물복원청소': { slug: 'building-restoration', label: '건물복원청소' },
  '곰팡이제거': { slug: 'mold-removal', label: '곰팡이제거' },
  '관공서': { slug: 'government', label: '관공서' },
  '기타청소': { slug: 'etc', label: '기타청소' },
  '매장&백화점청소': { slug: 'store-department', label: '매장·백화점청소' },
  '바닥(마루코팅)': { slug: 'floor-wood-coating', label: '바닥(마루코팅)' },
  '바닥(본드제거)': { slug: 'floor-adhesive-removal', label: '바닥(본드제거)' },
  '바닥(오일폴티스)': { slug: 'floor-oil-poultice', label: '바닥(오일폴티스)' },
  '바닥(왁스코팅)': { slug: 'floor-wax-coating', label: '바닥(왁스코팅)' },
  '바닥(콩자갈)': { slug: 'floor-pebble', label: '바닥(콩자갈)' },
  '바닥(타일작업)': { slug: 'floor-tile', label: '바닥(타일작업)' },
  '사무실청소': { slug: 'office', label: '사무실청소' },
  '시트지제거': { slug: 'sheet-removal', label: '시트지제거' },
  '신축 준공청소': { slug: 'new-construction', label: '신축 준공청소' },
  '어닝청소': { slug: 'awning', label: '어닝청소' },
  '외벽청소': { slug: 'exterior-wall', label: '외벽청소' },
  '인테리어청소': { slug: 'interior', label: '인테리어청소' },
  '입주청소': { slug: 'move-in', label: '입주청소' },
  '주방청소': { slug: 'kitchen', label: '주방청소' },
  '침수청소': { slug: 'flood', label: '침수청소' },
  '특수청소': { slug: 'special', label: '특수청소' },
  '화재청소': { slug: 'fire', label: '화재청소' },
  '후드청소': { slug: 'hood', label: '후드청소' },
};

async function main() {
  // regionData.mjs is ESM; this script is CJS, so pull it in dynamically.
  const { matchRegion } = await import('../lib/regionData.mjs');

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.readdirSync(OUT_DIR).forEach((f) => {
    const full = path.join(OUT_DIR, f);
    if (fs.statSync(full).isFile()) fs.unlinkSync(full);
  });

  const folders = fs.readdirSync(SRC_ROOT).filter((f) =>
    fs.statSync(path.join(SRC_ROOT, f)).isDirectory()
  );

  const manifest = [];
  let seq = 1;
  let totalPairs = 0;
  let skipped = [];

  for (const folder of folders) {
    const cat = CATEGORY_MAP[folder];
    if (!cat) {
      console.warn(`No category mapping for folder "${folder}", skipping.`);
      continue;
    }

    const dir = path.join(SRC_ROOT, folder);
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));

    // Pair "<title> 전.jpg" with "<title> 후.jpg" by stripping the suffix.
    const bases = new Map(); // title -> { before?: filename, after?: filename }
    for (const f of files) {
      const beforeMatch = f.match(/^(.+?)\s*전\.(jpe?g|png)$/i);
      const afterMatch = f.match(/^(.+?)\s*후\.(jpe?g|png)$/i);
      if (beforeMatch) {
        const title = beforeMatch[1].trim();
        bases.set(title, { ...(bases.get(title) || {}), before: f });
      } else if (afterMatch) {
        const title = afterMatch[1].trim();
        bases.set(title, { ...(bases.get(title) || {}), after: f });
      }
    }

    for (const [title, pair] of bases) {
      if (!pair.before || !pair.after) {
        skipped.push(`${folder}/${title} (missing ${pair.before ? 'after' : 'before'})`);
        continue;
      }

      // Prefix with the matched region's slug when the title names one of
      // our 17 core service areas ("수원 매탄동 베란다 청소" -> suwon-...),
      // so filenames and alt text both carry real local-SEO keywords instead
      // of just a category and a sequence number.
      const region = matchRegion(title);
      const slug = region ? `${region.id}-${cat.slug}` : cat.slug;
      const idStr = String(seq).padStart(3, '0');
      const beforeOut = `${slug}-${idStr}-before.webp`;
      const afterOut = `${slug}-${idStr}-after.webp`;

      const beforeInfo = await sharp(path.join(dir, pair.before))
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUT_DIR, beforeOut));
      const afterInfo = await sharp(path.join(dir, pair.after))
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUT_DIR, afterOut));

      manifest.push({
        id: `${slug}-${idStr}`,
        category: cat.slug,
        categoryLabel: cat.label,
        title,
        before: beforeOut,
        after: afterOut,
        beforeWidth: beforeInfo.width,
        beforeHeight: beforeInfo.height,
        afterWidth: afterInfo.width,
        afterHeight: afterInfo.height,
      });

      seq++;
      totalPairs++;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', 'portfolioManifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  const outSize = fs.readdirSync(OUT_DIR).reduce(
    (sum, f) => sum + fs.statSync(path.join(OUT_DIR, f)).size,
    0
  );

  console.log(`\nDone. ${totalPairs} before/after pairs -> public/images/portfolio-gallery/`);
  console.log(`Manifest -> lib/portfolioManifest.json`);
  console.log(`Total output size: ${(outSize / 1024 / 1024).toFixed(1)}MB`);
  if (skipped.length) {
    console.log(`\nSkipped (unpaired) — ${skipped.length}:`);
    skipped.forEach((s) => console.log(`  - ${s}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
