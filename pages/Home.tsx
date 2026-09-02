import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { m } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import PortfolioMarquee from '../components/PortfolioMarquee';
import ReviewsSection from '../components/ReviewsSection';

const zelkovaHero = '/images/hero-tree-family.webp';
const zelkovaMobileHero = '/images/hero-tree-family-mobile.webp';

// Everything below the fold is lazy-loaded, each section its own chunk.
// Home used to mount all ~1400 lines of this page (hero through the
// bottom CTA — 5-step workflow, certifications, pricing, FAQ, services
// grid, live blog feed, all of it) in one synchronous React commit.
// Long Task profiling showed that commit costing 300-700ms of continuous
// main-thread blocking a couple seconds into every load — the hero photo
// was already fully downloaded by then, just sitting there undrawn
// because the browser couldn't yield to paint. Splitting each section
// into its own lazy chunk spreads that mount cost out over time instead
// of one blocking burst. This does NOT affect SEO or first paint: the
// prerender step (entry-server.tsx + scripts/prerender.mjs) uses
// renderToPipeableStream, which waits on every nested Suspense boundary
// before considering a route "ready" — so the static HTML shipped to
// crawlers and first-time visitors still has every section's real
// content baked in, same as before. Suspense here only changes when the
// *client* does the (already-rendered) work of hydrating each section.
const RealClientAnxietiesSection = lazy(() => import('../components/home/RealClientAnxietiesSection'));
const FiveStepWorkflowSection = lazy(() => import('../components/home/FiveStepWorkflowSection'));
const FeaturesSection = lazy(() => import('../components/home/FeaturesSection'));
const CertificationsSection = lazy(() => import('../components/home/CertificationsSection'));
const TransparentPricingSection = lazy(() => import('../components/home/TransparentPricingSection'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const ServicesPreviewSection = lazy(() => import('../components/home/ServicesPreviewSection'));
const LiveWorkFeedSection = lazy(() => import('../components/home/LiveWorkFeedSection'));
const CTASection = lazy(() => import('../components/home/CTASection'));

const Home: React.FC = () => {
  const heroParallaxRef = useRef<HTMLDivElement>(null);

  // Hero parallax: mutate the DOM node directly via ref instead of
  // React state, so mouse movement anywhere on the page doesn't
  // re-render this entire ~1400-line component on every pixel of
  // movement. That re-render churn was a major contributor to the
  // page's poor INP (Clarity measured 1.1s on the homepage — anything
  // over 500ms is flagged "poor"): it kept the main thread busy
  // re-rendering marquees/FAQ/etc. on every mousemove, so it had to
  // compete with actual click/tap handling for input responsiveness.
  // requestAnimationFrame caps the work to once per frame regardless
  // of how many mousemove events fire in between.
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        const el = heroParallaxRef.current;
        if (el) {
          el.style.transform = `translate(${x * -10}px, ${y * -10}px) scale(1.05)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col bg-light text-textMain">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-6rem)] md:h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white">
        {/* No manual preload link here on purpose: a prior version used two
            <link rel="preload" media="..."> tags (one per breakpoint) to
            avoid React Float's fetchPriority-driven double-preload, but
            resource-timing showed both media-scoped preload links firing
            on the same load regardless of viewport (initiatorType "link"
            on both requests) — a duplicate-fetch bug one layer down from
            the one they were meant to fix. Removing them cuts that
            confirmed extra request. The <picture>/<source> pair below
            still resolves to exactly one image once the viewport is
            settled; very early in the load (before layout has a real
            viewport width to test the media query against) the browser's
            speculative preload scanner can still grab the <img> fallback
            ahead of that, which is inherent to art-directed <picture>
            elements and not something fixable from here. */}

        {/* Mobile Background Image (Absolute full-bleed background on mobile for vertical image) */}
        <div className="block md:hidden absolute inset-0 z-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={zelkovaHero} />
            <img
              src={zelkovaMobileHero}
              alt="느티울종합청소 느티나무 배경"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          {/* Elegant overlay that lets the image show through clearly and vividly, keeping the text readable */}
          <div className="absolute inset-0 bg-white/50" />
        </div>

        {/* Desktop Background Image (Hidden on mobile, absolute overlay on PC) */}
        <div
          ref={heroParallaxRef}
          className="hidden md:block absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{ transform: 'scale(1.05)' }}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={zelkovaHero} />
            <img
              src={zelkovaMobileHero}
              alt="느티울종합청소 느티나무 배경"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/30 md:bg-white/25" />
        </div>

        {/* Text and Buttons Container */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 md:py-0 -translate-y-10 md:translate-y-0">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl md:max-w-6xl mx-auto flex flex-col items-center justify-center"
          >
            <h1 className="font-extrabold text-slate-900 mb-4 md:mb-8 leading-tight drop-shadow-sm break-keep text-center flex flex-col items-center">
              <span className="block text-[13px] sm:text-sm md:text-2xl text-[#444a53] font-extrabold mb-1.5 md:mb-4 uppercase tracking-[0.2em]">
                A FRESH AND PEACEFUL HAVEN
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block mb-1 md:mb-3">
                한결같은 <span className="text-[#0f9d6c] font-black">마음</span>으로
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block">
                이웃의 <span className="text-[#0f9d6c] font-black">소중한 공간</span>을 품습니다
              </span>
            </h1>

            <div className="text-[18px] md:text-xl text-[#000000] mb-5 md:mb-10 leading-[26px] md:leading-relaxed font-bold max-w-2xl md:max-w-3xl mx-auto break-keep text-center">
              <p className="mb-4 md:mb-6 md:text-[25.5px] md:leading-relaxed">
                느티울은 날림 청소나 눈속임식<br />
                요금 유도를 과감히 배제합니다.
              </p>
              <p className="md:text-[25.5px] md:leading-relaxed">
                정직하게 흘린 땀만큼 가치를 증명하는<br />
                청소의 본질을 지킵니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
              <m.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link to="/contact" onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_hero' })} className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-primary text-white text-base sm:text-lg font-bold rounded-xl hover:bg-primaryDark transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                  무료 견적 신청 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-slate-900 py-5 md:py-7 relative">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-2 md:gap-8 text-center divide-x divide-white/10">
            <div>
              <p className="text-xl md:text-4xl font-black text-white">15<span className="text-primary">년</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">대표 현장 경력</p>
            </div>
            <div>
              <p className="text-xl md:text-4xl font-black text-white">5,000<span className="text-primary">+</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">누적 시공 건수</p>
            </div>
            <div>
              <p className="text-xl md:text-4xl font-black text-white">4.9<span className="text-primary">★</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">실제 고객 평점</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Portfolio Teaser */}
      <section className="py-12 md:py-16 bg-white relative border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-6 md:mb-10 relative z-10">
          <p className="text-slate-900 text-xl md:text-3xl font-black tracking-tight break-keep">
            <span className="block md:inline">제가 직접 발로 뛴</span>{' '}
            <span className="block md:inline">현장 <span className="bg-gradient-to-r from-[#04a875] to-[#22ba8b] bg-clip-text text-transparent">사진</span>으로 증명합니다</span>
          </p>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            실제 시공 현장의 전/후 비교 사진입니다.
          </p>
          <m.span
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primaryDark text-xs md:text-sm font-bold shadow-sm"
          >
            🔍 사진을 누르면 크게 볼 수 있어요
          </m.span>
        </div>
        <PortfolioMarquee />
        <div className="flex justify-center mt-6 md:mt-8 relative z-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-bold text-sm md:text-base hover:bg-primaryDark transition-all shadow-lg shadow-primary/25 group"
          >
            전체 시공사례 보기
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <ReviewsSection />

      <Suspense fallback={null}>
        <RealClientAnxietiesSection />
      </Suspense>

      <Suspense fallback={null}>
        <FiveStepWorkflowSection />
      </Suspense>

      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={null}>
        <CertificationsSection />
      </Suspense>

      <Suspense fallback={null}>
        <TransparentPricingSection />
      </Suspense>

      <Suspense fallback={null}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesPreviewSection />
      </Suspense>

      <Suspense fallback={null}>
        <LiveWorkFeedSection />
      </Suspense>

      <Suspense fallback={null}>
        <CTASection />
      </Suspense>
    </div>
  );
};

export default Home;