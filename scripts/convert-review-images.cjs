// One-off script: convert real customer review screenshots (숨고 + 카카오톡)
// into web-optimized WebP for the homepage review gallery. These are
// text-heavy images, so quality is kept higher than decorative photos to
// keep the Korean text legible after compression.
//
// Two sources are mixed together (interleaved proportionally, not just
// concatenated) so the marquee doesn't read as "all Soomgo, then all
// KakaoTalk" — the interleave order becomes the actual manifest/display
// order since the marquee just renders the manifest in sequence.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOOMGO_DIR = 'C:/Users/PC/Desktop/홈페이지 이미지 사용/리뷰';
const KAKAO_DIR = 'C:/Users/PC/Desktop/홈페이지 이미지 사용/리뷰/카카오톡 리뷰';
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'reviews');
const MAX_WIDTH = 640;
const QUALITY = 82;

// Soomgo source files are named by plain numbers (1.jpg, 2.png, ...) —
// sort numerically, not alphabetically (which would put "10" before "2").
function listSoomgo() {
  return fs.readdirSync(SOOMGO_DIR)
    .filter((f) => /^\d+\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((f) => path.join(SOOMGO_DIR, f));
}

// KakaoTalk screenshots are named KakaoTalk_<date>_<time>[_<seq>].png — the
// first screenshot in a series has no _<seq> suffix (treated as 0), the
// rest increment from there. Sort by that sequence to preserve chat order.
const KAKAO_RE = /^KakaoTalk_\d+_\d+(?:_(\d+))?\.png$/i;
function listKakao() {
  if (!fs.existsSync(KAKAO_DIR)) return [];
  return fs.readdirSync(KAKAO_DIR)
    .filter((f) => KAKAO_RE.test(f))
    .map((f) => {
      const m = f.match(KAKAO_RE);
      return { f, seq: m[1] ? parseInt(m[1], 10) : 0 };
    })
    .sort((a, b) => a.seq - b.seq)
    .map(({ f }) => path.join(KAKAO_DIR, f));
}

// Proportionally fair interleave (Bresenham-style) — keeps both sources
// spread evenly across the output instead of clustering.
function interleave(a, b) {
  const result = [];
  let ai = 0, bi = 0;
  while (ai < a.length || bi < b.length) {
    const aRatio = a.length ? ai / a.length : Infinity;
    const bRatio = b.length ? bi / b.length : Infinity;
    if (bi >= b.length || (ai < a.length && aRatio <= bRatio)) {
      result.push(a[ai++]);
    } else {
      result.push(b[bi++]);
    }
  }
  return result;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.readdirSync(OUT_DIR).forEach((f) => fs.unlinkSync(path.join(OUT_DIR, f)));

  const soomgo = listSoomgo();
  const kakao = listKakao();
  const files = interleave(soomgo, kakao);

  const manifest = [];
  let seq = 1;
  for (const srcPath of files) {
    const outName = `review-${String(seq).padStart(2, '0')}.webp`;
    const outPath = path.join(OUT_DIR, outName);

    const outInfo = await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const outStat = fs.statSync(outPath);
    const srcStat = fs.statSync(srcPath);
    manifest.push({ file: outName, width: outInfo.width, height: outInfo.height });
    console.log(`${path.basename(srcPath)} (${(srcStat.size / 1024).toFixed(0)}KB) -> ${outName} (${(outStat.size / 1024).toFixed(0)}KB)`);
    seq++;
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', 'reviewManifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nDone. ${soomgo.length} Soomgo + ${kakao.length} KakaoTalk = ${manifest.length} images -> public/images/reviews/, manifest -> lib/reviewManifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
