import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Detect if using placeholder credentials
export const isMockFirebase = !firebaseConfig.projectId || firebaseConfig.projectId === 'remixed-project-id';

let app: any = null;
let db: any = null;

if (!isMockFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } catch (error) {
    console.error("Firebase initialization failed, falling back to local simulation:", error);
  }
}

// firebase/auth (and the ~90KB+ iframe helper it fetches on init) is only
// needed on /admin. A static top-level `getAuth(app)` here used to run on
// every page — including public ones — because this module is also
// imported by firebaseService.ts for read-only Firestore access. Dynamic
// import + lazy init means it only loads when AuthContext.tsx (which only
// exists in the /admin lazy chunk) actually asks for it.
let authInstance: any = null;
let authInitPromise: Promise<any> | null = null;

export function getFirebaseAuth(): Promise<any> {
  if (isMockFirebase || !app) return Promise.resolve(null);
  if (!authInitPromise) {
    authInitPromise = import('firebase/auth').then(({ getAuth }) => {
      try {
        authInstance = getAuth(app);
      } catch (error) {
        console.error("Firebase auth initialization failed:", error);
      }
      return authInstance;
    });
  }
  return authInitPromise;
}

// Synchronous read of whatever's already been initialized (or null if
// getFirebaseAuth() was never called). Safe for non-critical paths like
// error diagnostics that shouldn't themselves force firebase/auth to load.
export function getCachedAuth() {
  return authInstance;
}

export { db };
