import React from 'react';

// After every deploy, the previous build's already-open tabs still hold an
// HTML/JS bundle that references route chunks by their old content hash
// (e.g. About-DoLwXY.js). Once Vercel's CDN drops that stale build, any
// visitor who navigates to a lazy route (About, Services, Portfolio, ...)
// without a full reload gets a "Failed to fetch dynamically imported
// module" TypeError — exactly the errors showing up in the analytics
// dashboard's JS-error panel. React has no default recovery for an error
// thrown inside a lazy() import, so without this boundary the whole page
// just goes blank.
//
// The fix is a plain reload: the fresh HTML always points at the current
// build's real chunk hashes. Guarded with sessionStorage so a genuinely
// broken chunk (not just a stale one) doesn't reload-loop forever — it
// falls through to the fallback UI on the second failure instead.
const isChunkLoadError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i.test(message);
};

const RELOAD_FLAG_KEY = 'chunk-error-reload-attempted';

interface State {
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;
}

// This project has no @types/react installed (pre-existing, unrelated to
// this file), so TS falls back to inferring React's own class shape from
// its JS source instead of the usual generic-typed declarations — that
// inference doesn't carry the Props/State generics through to `this.props`
// on a subclass. Declaring it explicitly here sidesteps that gap.
class ChunkErrorBoundary extends React.Component<Props, State> {
  declare props: Readonly<Props>;
  state: State = { hasError: false };

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (isChunkLoadError(error) && !sessionStorage.getItem(RELOAD_FLAG_KEY)) {
      sessionStorage.setItem(RELOAD_FLAG_KEY, '1');
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex-grow flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
          <p className="text-slate-600 font-bold">
            페이지를 불러오는 중 문제가 발생했습니다.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primaryDark transition-all"
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ChunkErrorBoundary;
