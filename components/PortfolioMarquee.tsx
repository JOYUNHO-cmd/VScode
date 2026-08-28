import React, { useEffect, useRef, useState } from 'react';
// The full ~131KB/388-item portfolioManifest.json isn't needed here — the
// hand-picked subset (see lib/portfolioHighlightIds.json) is resolved once
// at build time (scripts/generate-portfolio-highlights.mjs) into this much
// smaller file. Home.tsx (which renders this) is the one page App.tsx
// keeps out of the lazy route-splitting, so anything imported here rides
// along in the main JS chunk on every load — pulling in the full manifest
// just to use ~45 items from it was real, avoidable bundle weight.
import initialRows from '../lib/portfolioHighlights.json';
import PortfolioSplitCard, { PortfolioGalleryItem } from './PortfolioSplitCard';
import PortfolioLightbox from './PortfolioLightbox';

const ROW_COUNT = 3;
const SSR_ROWS = initialRows as PortfolioGalleryItem[][];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function splitIntoRows(items: PortfolioGalleryItem[]): PortfolioGalleryItem[][] {
  return Array.from({ length: ROW_COUNT }, (_, r) => items.filter((_, i) => i % ROW_COUNT === r));
}

const PortfolioMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<PortfolioGalleryItem | null>(null);
  // Server/first-client-render both use the same static, build-time order
  // (required — React would flag a hydration mismatch otherwise). Once
  // mounted, this reshuffles into a genuinely random arrangement using
  // Math.random(), so each visit sees the hand-picked cases in a different
  // order/rows. Runs client-only and after hydration, so it's safe.
  const [rows, setRows] = useState(SSR_ROWS);
  useEffect(() => {
    setRows(splitIntoRows(shuffle(SSR_ROWS.flat())));
  }, []);
  // See ServiceBeforeAfterMarquee for why: the CSS scroll animation keeps
  // dragging every card through the near-viewport lazy-load distance even
  // when this section (3 rows, all rendered at once) has never actually
  // been on screen, so native loading="lazy" alone doesn't stay lazy here.
  // Row 0's first 4 items used to load eagerly regardless of visibility
  // (to avoid a pop-in flash) — removed after Lighthouse showed those
  // fetches competing for bandwidth with the actual hero LCP image on
  // page load, since this whole section sits below the fold anyway and
  // everVisible already prevents any pop-in once it's actually scrolled to.
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
          // See ServiceBeforeAfterMarquee: paused until first seen, so the
          // seamless-loop duplicate buys nothing before then — deferring it
          // keeps ~half these nodes (3 rows' worth) out of initial hydration.
          const track = everVisible ? [...row, ...row] : row;
          const reverse = rowIdx % 2 === 1;
          return (
            <div key={rowIdx} className="marquee-track overflow-hidden">
              <div className={`flex w-max animate-marquee ${reverse ? 'animate-marquee-reverse' : ''}`}>
                {track.map((item, idx) => (
                  <PortfolioSplitCard
                    key={`${item.id}-${idx}`}
                    item={item}
                    size="marquee"
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
