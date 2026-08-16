// lib/mobileLineBreak.mjs
//
// Breaks a Korean prose string into short lines at natural pause points,
// then groups them into 2-3 line "stanzas" with a blank line between —
// the '1문장 1줄' / snack-culture formatting style for mobile readability.
// Pure string logic, no DOM — usable from the page component directly.

// Connective endings that mark a natural breathing point mid-sentence.
const BREAK_AFTER = ['해서', '했는데', '하며', '이며', '으로서', '어서', '는데', '이고', '지만'];
const TARGET_LEN = 16;

// Break a single clause (no more commas inside) into short lines,
// preferring a connective-ending or a space near the target length.
function breakLongClause(str, target = TARGET_LEN) {
  const trimmed = str.trim();
  if (trimmed.length <= target + 5) return [trimmed];

  // Prefer breaking right after a connective ending near the target zone.
  for (const ending of BREAK_AFTER) {
    const idx = trimmed.indexOf(ending);
    if (idx > 3) {
      const cut = idx + ending.length;
      if (cut >= 4 && cut <= trimmed.length - 2) {
        return [trimmed.slice(0, cut).trim(), ...breakLongClause(trimmed.slice(cut), target)];
      }
    }
  }

  // Otherwise break at the space closest to the target length.
  let bestSpace = -1;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === ' ') {
      if (bestSpace === -1 || Math.abs(i - target) < Math.abs(bestSpace - target)) {
        bestSpace = i;
      }
      if (i > target + 6) break;
    }
  }
  if (bestSpace > 2) {
    return [trimmed.slice(0, bestSpace).trim(), ...breakLongClause(trimmed.slice(bestSpace), target)];
  }
  return [trimmed];
}

function splitSentence(sentence) {
  // First split on commas — commas are already explicit breath points.
  const commaParts = sentence.split(/(?<=,)\s*/).filter(Boolean);
  return commaParts.flatMap((part) => breakLongClause(part));
}

/**
 * Break a paragraph into short lines at natural pause points.
 * @param {string} text
 * @returns {string[]} lines
 */
export function breakIntoLines(text) {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences.flatMap(splitSentence).filter(Boolean);
}

/**
 * Group lines into 2-3 line stanzas (blank line between groups),
 * matching the visual rhythm from the style guide.
 * @param {string[]} lines
 * @returns {string[][]} stanzas
 */
export function groupIntoStanzas(lines, groupSize = 3) {
  const stanzas = [];
  for (let i = 0; i < lines.length; i += groupSize) {
    stanzas.push(lines.slice(i, i + groupSize));
  }
  return stanzas;
}
