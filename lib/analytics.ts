// lib/analytics.ts
//
// GA4 (gtag.js) is loaded lazily, after window 'load' (+ idle callback when
// available), so it never competes with LCP/hydration-critical work. The
// GA4 property already has "향상된 측정" (Enhanced Measurement) enabled,
// which auto-tracks page_view (including SPA route changes via the History
// API), scroll depth, and generic outbound-link clicks on its own —
// trackEvent() below exists only for the named conversion events (which
// specific contact button, from where) that enhanced measurement can't
// label by itself.

const MEASUREMENT_ID = 'G-NOB1Y4MP29';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const load = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };

  const runWhenIdle = () => {
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
    } else {
      load();
    }
  };

  if (document.readyState === 'complete') {
    runWhenIdle();
  } else {
    window.addEventListener('load', runWhenIdle, { once: true });
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
