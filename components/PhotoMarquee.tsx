import React, { useEffect, useRef } from 'react';
import panoramaManifest from '../lib/panoramaManifest.json';

interface PanoramaPhoto {
  file: string;
  title: string;
  width: number;
  height: number;
}

const photos = panoramaManifest as PanoramaPhoto[];

// Continuous horizontal scroll of real site-visit photos. Pure CSS animation
// (translateX loop, GPU-composited) — no JS scroll loop, so it costs nothing
// on the main thread while visible. The photo list is duplicated once so the
// loop point is seamless; pausing on hover (desktop only) and
// prefers-reduced-motion are handled in index.css (.marquee-track /
// .animate-marquee). We also pause it via IntersectionObserver whenever the
// strip scrolls off-screen, so it isn't burning compositor frames while the
// user is reading a different section — a real contributor to the
// stutter/flicker reported on mobile when this kept animating unseen.
const PhotoMarquee: React.FC = () => {
  const track = [...photos, ...photos];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-paused', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="marquee-track overflow-hidden">
      <div ref={trackRef} className="flex w-max animate-marquee">
        {track.map((photo, idx) => (
          <div
            key={`${photo.file}-${idx}`}
            className="shrink-0 w-40 sm:w-52 md:w-64 mx-2 md:mx-3"
          >
            <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-sm">
              <img
                src={`/images/panorama/${photo.file}`}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                loading={idx < 6 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-xs md:text-sm font-bold text-slate-700 truncate px-1">
              {photo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoMarquee;
