// Vercel Edge Middleware: blocks other sites from hotlinking our own
// portfolio/case-study photos (loading our /images/* URLs directly in an
// <img> tag on someone else's page). It only inspects the Referer header,
// so it can't stop someone from downloading a photo and re-hosting it
// elsewhere — that's a copyright/DMCA question, not something a header
// check can solve. It only stops the "steal the URL, skip the download"
// case, and does nothing to HTML/JS/CSS or any other route.
export const config = {
  matcher: '/images/:path*',
};

const ALLOWED_REFERER_HOSTS = new Set([
  'neutiul.com',
  'www.neutiul.com',
  'localhost',
]);

export default function middleware(request: Request): Response | undefined {
  const referer = request.headers.get('referer');

  // No referer at all covers direct URL access, most search/social crawlers
  // fetching the image itself (not as an embed), and privacy-focused
  // browsers that strip Referer by default — none of that is hotlinking,
  // so let it through rather than risk breaking legitimate access.
  if (!referer) return undefined;

  try {
    const refererHost = new URL(referer).hostname;
    if (ALLOWED_REFERER_HOSTS.has(refererHost)) return undefined;
  } catch {
    // Unparseable Referer — fall through to the block below.
  }

  return new Response('Forbidden: hotlinking these images is not allowed.', {
    status: 403,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
