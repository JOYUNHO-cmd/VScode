import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import firebaseConfig from '../firebase-applet-config.json';

// Public-page-only Firestore instance. firebase/firestore/lite is a plain
// REST client with no real-time Watch/onSnapshot support at all, so even a
// single getDoc() call here never opens the long-lived Listen channel that
// the full SDK does — and the bundle is substantially smaller too. Admin-only
// real-time features (subscribePortfolioItems etc.) keep using the full SDK
// in lib/firebase.ts unaffected.
export const isMockFirebase = !firebaseConfig.projectId || firebaseConfig.projectId === 'remixed-project-id';

let dbLite: any = null;

if (!isMockFirebase) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    dbLite = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } catch (error) {
    console.error("Firebase Lite initialization failed, falling back to local simulation:", error);
  }
}

export { dbLite };
