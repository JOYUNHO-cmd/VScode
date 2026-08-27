import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import reviewManifest from '../lib/reviewManifest.json';

interface ReviewPhoto {
  file: string;
  width: number;
  height: number;
}

const reviews = reviewManifest as ReviewPhoto[];

// Continuous horizontal scroll of real review screenshots (pure CSS
// animation, pause on hover/off-screen — see index.css) but slower and
// uncropped, since these have to stay readable as they drift by. Tapping
// a card still opens a full-size lightbox for reading the whole thing at
// leisure.
const ReviewMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openFile, setOpenFile] = useState<string | null>(null);
  // The track keeps scrolling every card through the browser's
  // near-viewport lazy-load distance even before this section has ever
  // been on screen, which defeats loading="lazy" below idx 4. Once it's
  // been seen once, every review image is allowed to load its real src.
  // It's also paused until then, so the seamless-loop duplicate below
  // buys nothing yet — deferring it keeps ~35 fewer nodes out of the
  // initial hydration/layout pass.
  const [everVisible, setEverVisible] = useState(false);
  const track = everVisible ? [...reviews, ...reviews] : reviews;

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

  return (
    <>
      <div className="marquee-track overflow-hidden">
        <div ref={trackRef} className="flex w-max items-start animate-marquee animate-marquee-slow">
          {track.map((review, idx) => (
            <button
              key={`${review.file}-${idx}`}
              type="button"
              onClick={() => setOpenFile(review.file)}
              className="shrink-0 w-48 sm:w-60 md:w-72 mx-2 md:mx-3 rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow bg-white text-left"
              aria-label="후기 크게 보기"
            >
              <img
                src={idx < 4 || everVisible ? `/images/reviews/${review.file}` : undefined}
                alt="느티울 실제 고객 후기"
                width={review.width}
                height={review.height}
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>
      </div>

      {openFile && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setOpenFile(null)}
        >
          <button
            type="button"
            onClick={() => setOpenFile(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={22} />
          </button>
          <img
            src={`/images/reviews/${openFile}`}
            alt="느티울 실제 고객 후기"
            className="max-w-full max-h-full w-auto h-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ReviewMarquee;
