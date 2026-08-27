import React, { useEffect, useRef, useState } from 'react';
// The full ~131KB/388-item portfolioManifest.json isn't needed here — this
// file's picking/shuffling logic runs once at build time (see
// scripts/generate-portfolio-highlights.mjs) and writes just the ~24 items
// this component actually renders. Home.tsx (which renders this) is the one
// page App.tsx keeps out of the lazy route-splitting, so anything imported
// here rides along in the main JS chunk on every load — pulling in the full
// manifest just to extract 24 items from it was real, avoidable bundle
// weight for every visitor.
import portfolioRows from '../lib/portfolioHighlights.json';
import PortfolioSplitCard, { PortfolioGalleryItem } from './PortfolioSplitCard';
import PortfolioLightbox from './PortfolioLightbox';

const rows = portfolioRows as PortfolioGalleryItem[][];

const PortfolioMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<PortfolioGalleryItem | null>(null);
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
