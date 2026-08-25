import React from 'react';
import { X } from 'lucide-react';
import type { PortfolioGalleryItem } from './PortfolioSplitCard';

interface PortfolioLightboxProps {
  item: PortfolioGalleryItem;
  onClose: () => void;
}

const PortfolioLightbox: React.FC<PortfolioLightboxProps> = ({ item, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="닫기"
      >
        <X size={22} />
      </button>

      <div
        className="flex flex-col items-center gap-4 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
          <div className="relative">
            <img
              src={`/images/portfolio-gallery/${item.before}`}
              alt={`${item.title} 시공 전`}
              className="w-full h-auto max-h-[65vh] object-contain rounded-lg md:rounded-xl shadow-2xl bg-black/20"
            />
            <span className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-900/80 text-white text-xs font-bold">전</span>
          </div>
          <div className="relative">
            <img
              src={`/images/portfolio-gallery/${item.after}`}
              alt={`${item.title} 시공 후`}
              className="w-full h-auto max-h-[65vh] object-contain rounded-lg md:rounded-xl shadow-2xl bg-black/20"
            />
            <span className="absolute top-2 left-2 px-2 py-1 rounded-md bg-primary text-white text-xs font-bold">후</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-primary text-xs md:text-sm font-bold">{item.categoryLabel}</p>
          <p className="text-white font-bold text-sm md:text-base">{item.title}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLightbox;
