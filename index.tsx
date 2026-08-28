import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './src/styles.css';

// Naver login callback handler for popup redirect
const handleNaverCallback = () => {
  const url = window.location.href;
  if (url.includes('access_token')) {
    // Helper to extract param robustly from query or hash
    const getParamFromUrl = (targetUrl: string, paramName: string): string | null => {
      const regex = new RegExp(`[?#&]${paramName}=([^&#]*)`);
      const match = targetUrl.match(regex);
      return match ? decodeURIComponent(match[1]) : null;
    };

    const accessToken = getParamFromUrl(url, 'access_token');
    
    if (accessToken) {
      if (window.opener) {
        window.opener.postMessage({ type: 'NAVER_LOGIN_SUCCESS', access_token: accessToken }, '*');
        // Give it a tiny bit of time to send before closing
        setTimeout(() => {
          try { window.close(); } catch (e) { console.error(e); }
        }, 100);
      } else {
        // If loaded directly, save token to sessionStorage and redirect to admin
        sessionStorage.setItem('naver_access_token', accessToken);
        window.location.replace(window.location.origin + '/admin');
      }
      return true;
    }
  }
  return false;
};

if (handleNaverCallback()) {
  // Stop further rendering for popup
  console.log("Naver callback handled, stopping React mount.");
} else {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }

  // scripts/prerender.mjs only bakes real, hydratable markup into <div
  // id="root"> for '/' (see CONTENT_PRERENDER_ROUTES there) — every other
  // route ships an empty root with meta-only prerendering. hydrateRoot on
  // an empty root doesn't just warn: it throws a hydration-mismatch error
  // on every single load of every other page and forces React to redo the
  // whole render from scratch anyway, so it's strictly worse than a plain
  // client render there. Only hydrate where there's actually something to
  // hydrate against; otherwise mount fresh.
  const hasPrerenderedContent = rootElement.childNodes.length > 0;
  const root = hasPrerenderedContent
    ? ReactDOM.hydrateRoot(
        rootElement,
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    : ReactDOM.createRoot(rootElement);
  if (!hasPrerenderedContent) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}