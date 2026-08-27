import React, { useEffect, useMemo, useRef, useState } from 'react';
import portfolioManifest from '../lib/portfolioManifest.json';
import PortfolioSplitCard, { PortfolioGalleryItem } from './PortfolioSplitCard';
import PortfolioLightbox from './PortfolioLightbox';

const allItems = portfolioManifest as PortfolioGalleryItem[];
const PER_CATEGORY = 2;

// Categories to front-load on the homepage teaser, so the very first
// photos a visitor sees (before scrolling, and in every row at once
// since all 3 rows render simultaneously) showcase these service types.
const PRIORITY_CATEGORIES = ['special', 'fire', 'flood', 'interior', 'new-construction'];

// Fixed-seed shuffle — deterministic (no Math.random) so the "mixed"
// order among priority items is identical on server prerender and
// client hydration, and stays stable across reloads/deploys.
function seededShuffle<T>(arr: T[], seed: number): T[] {
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

// Deterministic, category-diverse subset for the homepage teaser — full
// gallery lives on /portfolio. Picking the first N per category (by
// manifest/file order) rather than "curating the best ones" avoids
// pretending to a quality judgment on photos nobody has actually reviewed.
function pickHighlights(items: PortfolioGalleryItem[], perCategory: number): PortfolioGalleryItem[] {
  const counts = new Map<string, number>();
  const picked: PortfolioGalleryItem[] = [];
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
// Priority-category items go first — shuffled among themselves so they
// read as randomly mixed rather than one category block after another —
// then everything else follows in its original order.
const priorityHighlights = seededShuffle(
  rawHighlights.filter((item) => PRIORITY_CATEGORIES.includes(item.category)),
  20260825
);
const restHighlights = rawHighlights.filter((item) => !PRIORITY_CATEGORIES.includes(item.category));
const highlights = [...priorityHighlights, ...restHighlights];
const ROW_COUNT = 3;
// Alternate into N rows so each row still spans most categories, instead
// of row 1 getting the first chunk of categories and the rest trailing
// off. Odd rows scroll the opposite direction for a crossing effect.
const rows = Array.from({ length: ROW_COUNT }, (_, r) =>
  highlights.filter((_, i) => i % ROW_COUNT === r)
);

const PortfolioMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<PortfolioGalleryItem | null>(null);
  // See ServiceBeforeAfterMarquee for why: the CSS scroll animation keeps
  // dragging every card through the near-viewport lazy-load distance even
  // when this section (3 rows, all rendered at once) has never actually
  // been on screen, so native loading="lazy" alone doesn't stay lazy here.
  const [everVisible, setEverVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.querySelectorAll('.animate-marquee').forEach((track) => {
          track.classList.toggle('is-paused', !entry.isIntersecting);
        });
        if (entry.isIntersecting) setEverVisible(true);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={containerRef} className="space-y-3 md:space-y-4">
        {rows.map((row, rowIdx) => {
          const track = [...row, ...row];
          const reverse = rowIdx % 2 === 1;
          return (
            <div key={rowIdx} className="marquee-track overflow-hidden">
              <div className={`flex w-max animate-marquee ${reverse ? 'animate-marquee-reverse' : ''}`}>
                {track.map((item, idx) => (
                  <PortfolioSplitCard
                    key={`${item.id}-${idx}`}
                    item={item}
                    size="marquee"
                    eager={rowIdx === 0 && idx < 4}
                    visible={everVisible}
                    onClick={() => setOpenItem(item)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {openItem && (
        <PortfolioLightbox item={openItem} onClose={() => setOpenItem(null)} />
      )}
    </>
  );
};

export default PortfolioMarquee;
