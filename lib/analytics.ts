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
    karrotPixel?: { track: (...args: unknown[]) => void };
    clarity?: (...args: unknown[]) => void;
  }
}

// Maps our GA4 event names to the Karrot (당근마켓) ads pixel's own event
// taxonomy, so a single trackEvent() call at each contact touchpoint keeps
// both platforms' conversion data in sync instead of tracking page views
// only (ViewPage, already fired from index.html, can't tell Karrot's ad
// dashboard which visitors actually contacted us). Lead = "특정 서비스
// 신청 전 발생하는 이벤트" (about to contact — phone/kakao/email tap),
// SubmitApplication = an actually-completed quote request.
const KARROT_EVENT_MAP: Record<string, string> = {
  contact_click: 'Lead',
  generate_lead: 'SubmitApplication',
};

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (window.gtag) window.gtag('event', name, params);

  const karrotEvent = KARROT_EVENT_MAP[name];
  if (karrotEvent && window.karrotPixel) window.karrotPixel.track(karrotEvent);

  // Custom Clarity event, same name as the GA4 event, so a recording/
  // heatmap session can be filtered down to exactly the ones where a
  // visitor actually contacted us (not just page views). Also tags the
  // session with the touchpoint's method/location so recordings can be
  // filtered by e.g. method=phone in the Clarity dashboard.
  if (window.clarity) {
    window.clarity('event', name);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) window.clarity('set', key, String(value));
      }
    }
  }
}
