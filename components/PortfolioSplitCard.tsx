import React from 'react';

export interface PortfolioGalleryItem {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  before: string;
  after: string;
  beforeWidth: number;
  beforeHeight: number;
  afterWidth: number;
  afterHeight: number;
}

interface PortfolioSplitCardProps {
  item: PortfolioGalleryItem;
  onClick: () => void;
  size?: 'marquee' | 'marquee-lg' | 'grid';
  eager?: boolean;
}

// Side-by-side 전/후 split card — both photos visible at once (no tap
// needed to compare), so a strip or grid of these reads as proof at a
// glance rather than a guessing game. Tapping opens the full-size pair
// in a lightbox. Renders the full real-photo gallery in
// lib/portfolioManifest.json.
// 'marquee-lg' is double the width of 'marquee' — used only on service
// landing pages (ServiceBeforeAfterMarquee); the homepage teaser and the
// /portfolio grid stay on 'marquee'/'grid' untouched.
const PortfolioSplitCard: React.FC<PortfolioSplitCardProps> = ({ item, onClick, size = 'grid', eager = false }) => {
  const isMarquee = size === 'marquee' || size === 'marquee-lg';
  const isMarqueeLg = size === 'marquee-lg';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left group ${
        isMarqueeLg
          ? 'shrink-0 w-[32rem] sm:w-[40rem] md:w-[48rem] mx-2 md:mx-3'
          : isMarquee
          ? 'shrink-0 w-64 sm:w-80 md:w-96 mx-2 md:mx-3'
          : 'w-full'
      }`}
      aria-label={`${item.title} 시공 전후 크게 보기`}
    >
      <div className="rounded-xl md:rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group-hover:shadow-lg group-hover:border-primary/40 transition-all bg-white">
        <div className="grid grid-cols-2">
          <div className="relative aspect-square bg-slate-100">
            <img
              src={`/images/portfolio-gallery/${item.before}`}
              alt={`${item.title} 시공 전`}
              width={item.beforeWidth}
              height={item.beforeHeight}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-1.5 left-1.5 rounded-md bg-slate-900/75 text-white font-bold tracking-wide ${isMarqueeLg ? 'px-2.5 py-1 text-sm' : 'px-1.5 py-0.5 text-[10px]'}`}>전</span>
          </div>
          <div className="relative aspect-square bg-slate-100 border-l border-white">
            <img
              src={`/images/portfolio-gallery/${item.after}`}
              alt={`${item.title} 시공 후`}
              width={item.afterWidth}
              height={item.afterHeight}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-1.5 left-1.5 rounded-md bg-primary text-white font-bold tracking-wide ${isMarqueeLg ? 'px-2.5 py-1 text-sm' : 'px-1.5 py-0.5 text-[10px]'}`}>후</span>
          </div>
        </div>
        <div className={`px-2.5 py-2 ${isMarquee ? 'text-center' : ''} ${isMarqueeLg ? 'py-3' : ''}`}>
          {!isMarquee && <p className="text-slate-400 font-bold text-[10px]">{item.categoryLabel}</p>}
          <p className={`text-slate-700 font-bold truncate ${isMarqueeLg ? 'text-base' : isMarquee ? 'text-[10px]' : 'text-xs md:text-sm'}`}>{item.title}</p>
        </div>
      </div>
    </button>
  );
};

export default PortfolioSplitCard;
