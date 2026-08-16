import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Detect if using placeholder credentials
export const isMockFirebase = !firebaseConfig.projectId || firebaseConfig.projectId === 'remixed-project-id';

let app: any = null;
let db: any = null;
let auth: any = null;

if (!isMockFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId); 
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed, falling back to local simulation:", error);
  }
}

export { db, auth };
