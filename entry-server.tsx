// entry-server.tsx
//
// Built by `vite build --ssr` into dist-ssr/entry-server.js and imported
// from scripts/prerender.mjs (plain Node, no Vite runtime) to render the
// real initial HTML for a given route. App.tsx renders deterministically
// on first paint (SiteContext/AuthContext only touch Firebase/localStorage
// inside useEffect), so this matches what the client hydrates with.

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(path: string): string {
  return renderToString(<App ssrPath={path} />);
}
