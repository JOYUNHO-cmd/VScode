// lib/korean.mjs
//
// Batchim-aware particle helper. Korean syllable blocks occupy
// U+AC00–U+D7A3 as (초성 × 21 + 중성) × 28 + 종성 + 0xAC00, so
// (codepoint - 0xAC00) % 28 === 0 means no trailing consonant (batchim) —
// e.g. 코 has none, 팅 does. Needed because region/service names are
// interpolated into fixed Korean templates (이/가, 을/를 ...), and a few of
// them (바닥 왁스코팅, 성수동1가·성수동2가) don't take the same particle as
// most others do.

export function hasBatchim(word) {
  const ch = (word || '').trim().slice(-1);
  const code = ch.charCodeAt(0);
  if (Number.isNaN(code) || code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

export function josa(word, withBatchim, withoutBatchim) {
  return hasBatchim(word) ? withBatchim : withoutBatchim;
}
