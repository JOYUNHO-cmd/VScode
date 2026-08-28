// entry-server.tsx
//
// Built by `vite build --ssr` into dist-ssr/entry-server.js and imported
// from scripts/prerender.mjs (plain Node, no Vite runtime) to render the
// real initial HTML for a given route. App.tsx renders deterministically
// on first paint (SiteContext/AuthContext only touch Firebase/localStorage
// inside useEffect), so this matches what the client hydrates with.
//
// Every route except '/' resolves through a React.lazy() boundary (see
// App.tsx's route table). renderToString is synchronous and has no way to
// wait for a lazy import to resolve — it just paints the Suspense fallback
// (a spinner) and calls it done, which is exactly why those ~221 routes
// were shipping with real content missing: Google crawled them, found a
// spinner, and mostly chose not to index them (confirmed in Search
// Console: 31 pages stuck "Crawled - currently not indexed"). renderToString
// worked fine for '/' only because Home is the one route App.tsx keeps as
// a static import specifically to avoid this.
//
// renderToPipeableStream is Suspense-aware: onAllReady only fires once
// every lazy chunk along the route has actually resolved, so what we
// collect here is the real page, not a fallback.

import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import App from './App';

const RENDER_TIMEOUT_MS = 15000;

export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const collector = new PassThrough();
    collector.on('data', (chunk) => chunks.push(chunk));
    collector.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    collector.on('error', reject);

    const timeout = setTimeout(() => {
      abort(new Error(`SSR render timed out after ${RENDER_TIMEOUT_MS}ms for ${path}`));
    }, RENDER_TIMEOUT_MS);

    const { pipe, abort } = renderToPipeableStream(<App ssrPath={path} />, {
      onAllReady() {
        clearTimeout(timeout);
        pipe(collector);
      },
      onError(err) {
        clearTimeout(timeout);
        reject(err instanceof Error ? err : new Error(String(err)));
      },
    });
  });
}
