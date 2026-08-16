// Loaded asynchronously by LazyMotion in App.tsx (features={loadFeatures}).
// A dedicated module — rather than passing `domMax` directly — lets Vite
// code-split it into its own chunk, so the feature bundle's weight comes
// out of the main bundle and loads in parallel instead of blocking it.
import { domMax } from 'motion/react';

export default domMax;
