// Static hosting (Vercel) can resolve a route to a URL with a trailing
// slash (e.g. /contact/) even though every route in App.tsx and the SSR
// path list in scripts/prerender.mjs is defined without one (/contact).
// Comparing location.pathname against a route path with a bare `===`
// then disagrees between the server's prerendered HTML (always the exact
// route string) and the client's hydration pass (whatever the browser's
// actual URL is) — a real hydration-mismatch bug this site hit on every
// top-level page (about/services/portfolio/contact) whose nav-active
// state and services-page footer visibility depend on that exact match.
export const normalizePathname = (pathname: string): string =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
