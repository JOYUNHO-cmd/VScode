// scripts/prerender.mjs
//
// Runs after `vite build`. For each known route, generates the correct
// <title>/meta/JSON-LD via the shared lib/seoData.mjs (the exact same
// logic SEO.tsx uses at runtime) and writes a fully-baked static HTML
// file to dist/<route>/index.html.
//
// Deliberately does NOT launch a browser (Puppeteer/Playwright) — this
// avoids any dependency on system Chromium libraries being present in
// the build container, so this step cannot fail for that reason.
//
// Netlify serves a real file at a matching path before falling back to
// the SPA redirect in _redirects, so crawlers that never execute
// JavaScript (Naver, most AI answer-engine bots) still get correct
// per-page meta and structured data.

import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { buildMeta } from '../lib/seoData.mjs';
import { SERVICES } from '../lib/servicesData.mjs';
import { REGIONS } from '../lib/regionData.mjs';
import { REGION_LANDING_SERVICES } from '../lib/regionServiceContent.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_ENTRY = path.join(ROOT_DIR, 'dist-ssr', 'entry-server.js');
const PRODUCTION_ORIGIN = 'https://neutiul.com';
const STATIC_ROUTES = ['/', '/about', '/services', '/portfolio', '/contact'];

// Routes that get real, hydratable content baked into <div id="root">
// (via entry-server.tsx / react-dom/server) instead of just meta tags.
// Keep this in sync with any route whose <div id="root"></div> should
// arrive pre-painted for PageSpeed/LCP purposes.
const CONTENT_PRERENDER_ROUTES = new Set(['/']);

function injectRootHtml(html, rootHtml) {
  return html.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
}

async function renderContentByRoute() {
  const rendered = new Map();
  if (!fsSync.existsSync(SSR_ENTRY)) {
    console.warn('  ! dist-ssr/entry-server.js not found, skipping content prerender (meta-only for all routes)');
    return rendered;
  }
  const { render } = await import(pathToFileURL(SSR_ENTRY).href);
  for (const route of CONTENT_PRERENDER_ROUTES) {
    rendered.set(route, render(route));
  }
  return rendered;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setMetaByAttr(html, attr, key, content) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function setCanonical(html, href) {
  const re = /<link\s+rel="canonical"[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function setJsonLd(html, jsonLd) {
  const script = `<script type="application/ld+json" id="aeo-geo-schema">\n${JSON.stringify(jsonLd)}\n</script>`;
  const re = /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i;
  if (re.test(html)) return html.replace(re, script);
  return html.replace(/<\/head>/i, `  ${script}\n</head>`);
}

function applyMeta(templateHtml, meta, currentUrl) {
  let html = templateHtml;
  html = setTitle(html, meta.title);
  html = setMetaByAttr(html, 'name', 'title', meta.title);
  html = setMetaByAttr(html, 'name', 'description', meta.description);
  html = setMetaByAttr(html, 'name', 'keywords', meta.keywords);
  html = setMetaByAttr(
    html, 'name', 'robots',
    meta.shouldNoindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  html = setCanonical(html, currentUrl);
  html = setMetaByAttr(html, 'property', 'og:title', meta.title);
  html = setMetaByAttr(html, 'property', 'og:description', meta.description);
  html = setMetaByAttr(html, 'property', 'og:image', meta.image);
  html = setMetaByAttr(html, 'property', 'og:url', currentUrl);
  html = setMetaByAttr(html, 'property', 'og:type', meta.ogType);
  html = setMetaByAttr(html, 'name', 'twitter:title', meta.title);
  html = setMetaByAttr(html, 'name', 'twitter:description', meta.description);
  html = setMetaByAttr(html, 'name', 'twitter:image', meta.image);
  html = setMetaByAttr(html, 'name', 'DC.title', meta.title);
  html = setJsonLd(html, meta.jsonLd);
  return html;
}

async function writeRouteHtml(route, html) {
  const dir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`  ✓ ${route}`);
}

async function main() {
  if (!fsSync.existsSync(DIST_DIR)) {
    console.error('dist/ not found — run `vite build` first.');
    process.exit(1);
  }

  const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf-8');
  // dist/index.html is both the template we read here AND the file we
  // overwrite for the '/' route below. If this script runs twice without
  // an intervening `vite build` (which empties dist/), the second run
  // would read back its own injected content and leak the '/' route's
  // body into every other route's output. Fail loudly instead.
  if (!template.includes('<div id="root"></div>')) {
    console.error('dist/index.html already has content in <div id="root">. Run `vite build` again before re-running this script.');
    process.exit(1);
  }

  // Firebase client SDK works fine under plain Node for read-only queries —
  // no service account / admin SDK needed since these collections are
  // publicly readable (see firestore.rules).
  const firebaseConfigPath = path.join(ROOT_DIR, 'firebase-applet-config.json');
  const firebaseConfig = JSON.parse(await fs.readFile(firebaseConfigPath, 'utf-8'));
  const app = initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  });
  const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

  console.log('Fetching site data from Firestore...');
  let companyInfo = {};
  try {
    const infoSnap = await getDoc(doc(db, 'company', 'info'));
    if (infoSnap.exists()) {
      companyInfo = infoSnap.data();
      console.log('  company info loaded from Firestore');
    } else {
      console.log('  no company/info doc found, using defaults');
    }
  } catch (err) {
    console.warn('  ! could not fetch company info, using defaults:', err.message);
  }

  let services = SERVICES;
  console.log(`  using ${services.length} service(s) from constants.ts: ${services.map((s) => s.id).join(', ')}`);

  console.log('Rendering initial HTML for content-prerendered routes...');
  const contentByRoute = await renderContentByRoute();
  for (const route of contentByRoute.keys()) {
    console.log(`  ✓ ${route} (${contentByRoute.get(route).length} chars of markup)`);
  }

  console.log('Writing prerendered routes...');
  const serviceRoutes = services.map((s) => `/services/${s.id}`);
  const regionRoutes = REGION_LANDING_SERVICES.flatMap((serviceId) =>
    REGIONS.map((region) => `/services/${serviceId}/${region.id}`)
  );
  console.log(`  + ${regionRoutes.length} region-landing route(s) for service(s): ${REGION_LANDING_SERVICES.join(', ')}`);
  const allRoutes = [...STATIC_ROUTES, ...serviceRoutes, ...regionRoutes];

  for (const route of allRoutes) {
    const parts = route.startsWith('/services/') ? route.split('/services/')[1].split('/').filter(Boolean) : [];
    const serviceId = parts[0];
    const regionId = parts[1];
    const currentUrl = `${PRODUCTION_ORIGIN}${route === '/' ? '/' : route}`;
    const meta = buildMeta({ pathname: route, serviceId, regionId, companyInfo, services, currentUrl });
    let html = applyMeta(template, meta, currentUrl);
    if (contentByRoute.has(route)) {
      html = injectRootHtml(html, contentByRoute.get(route));
    }
    await writeRouteHtml(route, html);
  }

  console.log(`\nDone. Prerendered ${allRoutes.length} routes (no browser required).`);

  await writeSitemap(allRoutes);
  await writeRobotsTxt();
}

async function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = `${PRODUCTION_ORIGIN}${route === '/' ? '/' : route}`;
      const isRegionRoute = route.startsWith('/services/') && route.split('/services/')[1].split('/').filter(Boolean).length > 1;
      const priority = route === '/' ? '1.0' : isRegionRoute ? '0.7' : route.startsWith('/services/') ? '0.8' : '0.6';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  ✓ sitemap.xml (${routes.length} URLs)`);
}

async function writeRobotsTxt() {
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  // Don't clobber a hand-written robots.txt that Vite already copied from public/.
  if (fsSync.existsSync(robotsPath)) {
    const existing = await fs.readFile(robotsPath, 'utf-8');
    if (existing.includes('Sitemap:')) {
      console.log('  ✓ robots.txt already references a sitemap, leaving as-is');
      return;
    }
    await fs.appendFile(robotsPath, `\nSitemap: ${PRODUCTION_ORIGIN}/sitemap.xml\n`);
    console.log('  ✓ appended Sitemap line to existing robots.txt');
    return;
  }
  const content = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${PRODUCTION_ORIGIN}/sitemap.xml\n`;
  await fs.writeFile(robotsPath, content, 'utf-8');
  console.log('  ✓ robots.txt created');
}

main().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
