// lib/analytics.ts
//
// gtag.js itself is loaded via the standard Google-provided snippet in
// index.html's <head> (async, so it never blocks parsing/rendering — no
// custom deferral needed on top of that). Loading it immediately, rather
// than delaying init until after the page settles, matters here beyond
// just following Google's own setup instructions: a delayed config()
// call would miss the page_view for anyone who bounces in the first
// second or two, which is exactly the fast-exit behavior this tracking
// is meant to catch.
//
// The GA4 property (G-NOB1Y4MP29) has "향상된 측정" (Enhanced Measurement)
// enabled, which auto-tracks page_view (including SPA route changes via
// the History API), scroll depth, and generic outbound-link clicks on its
// own. trackEvent() below exists only for the named conversion events
// (which specific contact button, from where) that enhanced measurement
// can't label by itself.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
