import React, { useEffect, useMemo, useRef, useState } from 'react';
import portfolioManifest from '../lib/portfolioManifest.json';
import { shuffle } from '../lib/shuffle.mjs';
import PortfolioSplitCard, { PortfolioGalleryItem } from './PortfolioSplitCard';
import PortfolioLightbox from './PortfolioLightbox';

const allItems = portfolioManifest as PortfolioGalleryItem[];

// Maps each of the 14 service landing pages to the portfolio-gallery
// category slugs that belong on it. Several photo categories (마루코팅/
// 왁스코팅 vs 본드제거/오일폴티스/콩자갈/타일작업) split across the two
// "바닥" services rather than mapping 1:1, and a few categories with no
// dedicated service page (매장·백화점청소, 시트지제거, 어닝청소,
// 건물복원청소, 곰팡이제거, 기타청소) are folded into the closest-fit
// service. 'factory' has no matching source photos, so it renders nothing.
// 'hood' and 'government' used to be folded into restaurant/office
// respectively before they got their own dedicated service pages.
export const SERVICE_CATEGORY_MAP: Record<string, string[]> = {
  'new-construction': ['new-construction'],
  interior: ['interior', 'sheet-removal'],
  'move-in': ['move-in'],
  office: ['office', 'store-department'],
  floor: ['floor-adhesive-removal', 'floor-oil-poultice', 'floor-pebble', 'floor-tile'],
  'floor-wax': ['floor-wood-coating', 'floor-wax-coating'],
  restaurant: ['kitchen'],
  hood: ['hood'],
  factory: [],
  flood: ['flood'],
  fire: ['fire'],
  special: ['special', 'mold-removal', 'etc'],
  'external-wall': ['exterior-wall', 'awning', 'building-restoration'],
  'government-school': ['government'],
};

interface Props {
  serviceId: string;
}

const ServiceBeforeAfterMarquee: React.FC<Props> = ({ serviceId }) => {
  const categories = SERVICE_CATEGORY_MAP[serviceId] || [];
  // portfolioManifest.json is generated one category folder at a time, so
  // an unshuffled filter shows long same-sub-category runs (e.g. every
  // floor-adhesive-removal shot before any floor-tile one) instead of a
  // mix. Every route here gets rendered server-side too (scripts/prerender.mjs),
  // and hydrateRoot reconciles against that markup — if the shuffle ran in
  // render (e.g. useMemo), the server's Math.random() call and the client's
  // hydration pass would produce two different orders and silently mismatch
  // (production React drops most hydration-mismatch warnings, so this
  // wouldn't even show up as a console error, just wrong img srcs).
  // Keeping the *first* render — server and client alike — on the same
  // unshuffled, deterministic order sidesteps that entirely; the shuffle
  // then runs once in an effect, which by definition never executes on the
  // server, so there's nothing for hydration to mismatch against.
  const filteredItems = useMemo(
    () => allItems.filter((item) => categories.includes(item.category)),
    [serviceId]
  );
  const [items, setItems] = useState(filteredItems);
  useEffect(() => {
    setItems(shuffle(filteredItems));
  }, [filteredItems]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<PortfolioGalleryItem | null>(null);
  // The track keeps scrolling every item through the browser's near-viewport
  // lazy-load distance regardless of whether it's actually been seen, which
  // defeats loading="lazy" on the ~100+ images across all the region/service
  // marquees (measured ~6.5MB downloaded before any real scroll). Once the
  // section has been seen the first time, every card is allowed to load its
  // real src; before that, PortfolioSplitCard renders none.
  const [everVisible, setEverVisible] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-paused', !entry.isIntersecting);
        if (entry.isIntersecting) setEverVisible(true);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  // Animation is paused (is-paused, above) until first seen, so the second
  // copy needed for the seamless-loop illusion buys nothing before then —
  // only doubling once visible keeps ~half these DOM nodes out of the
  // initial hydration/layout pass on every service landing page.
  const track = everVisible ? [...items, ...items] : items;

  return (
    <section className="py-12 md:py-16 bg-white relative border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-6 md:mb-10 relative z-10">
        <p className="text-slate-900 text-xl md:text-3xl font-black tracking-tight break-keep">
          제가 직접 시공한 <span className="bg-gradient-to-r from-[#04a875] to-[#22ba8b] bg-clip-text text-transparent">전후 사진</span>입니다
        </p>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          사진을 누르면 크게 볼 수 있어요.
        </p>
      </div>

      <div className="marquee-track overflow-hidden">
        <div ref={trackRef} className="flex w-max animate-marquee">
          {track.map((item, idx) => (
            <PortfolioSplitCard
              key={`${item.id}-${idx}`}
              item={item}
              size="marquee-lg"
              eager={idx < 4}
              visible={everVisible}
              onClick={() => setOpenItem(item)}
            />
          ))}
        </div>
      </div>

      {openItem && (
        <PortfolioLightbox item={openItem} onClose={() => setOpenItem(null)} />
      )}
    </section>
  );
};

export default ServiceBeforeAfterMarquee;
