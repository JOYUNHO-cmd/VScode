import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { dbLite, isMockFirebase } from './firebaseLite';

// Read-only functions for public pages (SiteContext etc.) only. Admin CRUD
// and real-time subscriptions keep using the full lib/firebaseService.ts —
// this file must never import that, or the full Firestore SDK comes right
// back along with it.
export async function getCompanyInfo() {
  const oldLogo1 = 'https://i.ibb.co/kVzK83Kf/image.png';
  const oldLogo2 = 'https://i.ibb.co/Ldcq4XMr/image.png';
  const newLogo = 'https://www.neutiul.com/images/logo.webp';

  if (isMockFirebase) {
    const stored = localStorage.getItem('neutiul_company_info');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.logo === oldLogo1 || parsed.logo === oldLogo2 || !parsed.logo)) {
          parsed.logo = newLogo;
          localStorage.setItem('neutiul_company_info', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse local company info:", e);
      }
    }
    return null;
  }

  try {
    const docRef = doc(dbLite, 'company', 'info');
    const d = await getDoc(docRef);
    if (d.exists()) {
      const data = d.data();
      if (data && (data.logo === oldLogo1 || data.logo === oldLogo2 || !data.logo)) {
        data.logo = newLogo;
        // Logo migration runs in the background — failure doesn't affect the page.
        updateDoc(docRef, { logo: newLogo }).catch(e => console.error("Error migrating remote logo:", e));
      }
      return data;
    }
    return null;
  } catch (error) {
    console.warn("Company info document does not exist yet:", error);
    return null;
  }
}
