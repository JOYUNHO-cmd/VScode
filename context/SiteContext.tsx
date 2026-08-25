import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteConfig, SiteContextType, CompanyInfo } from '../types';
import { INITIAL_CONFIG } from '../constants';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

// Runs the callback once the browser is idle (falls back to a 0ms timeout
// on unsupported browsers). requestIdleCallback alone only watches CPU
// idle time, which on a slow network fires too early — while images/fonts
// are still downloading — and ends up competing with them for bandwidth.
// Waiting for window 'load' instead means it only runs once every initial
// resource has actually finished.
const runWhenIdle = (cb: () => void) => {
  if (document.readyState === 'complete') {
    setTimeout(cb, 0);
  } else {
    window.addEventListener('load', () => cb(), { once: true });
  }
};

export const SiteProvider = ({ children }: { children?: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // INITIAL_CONFIG already renders correctly, so the Firestore call
    // (lib/firebaseService -> firebase/firestore) is deferred behind a
    // dynamic import until after the browser finishes critical rendering
    // (LCP/fonts/main JS). This keeps the full Firestore SDK out of the
    // main bundle entirely, and its connection out of the initial-load race.
    let cancelled = false;

    runWhenIdle(() => {
      if (cancelled) return;
      (async () => {
        try {
          const { getCompanyInfo } = await import('../lib/firebaseServicePublic');
          const info = await getCompanyInfo();
          if (cancelled || !info) return;
          setConfig((prev) => ({
            ...prev,
            companyInfo: {
              ...prev.companyInfo,
              name: info.name === '느티울종합청소' ? '느티울' : (info.name || prev.companyInfo.name),
              phone: info.phone || prev.companyInfo.phone,
              logo: info.logo || prev.companyInfo.logo,
              slogan: info.slogan || prev.companyInfo.slogan,
              description: info.description || prev.companyInfo.description,
              email: info.email || prev.companyInfo.email,
              address: info.address || prev.companyInfo.address,
              instagram: info.instagram || prev.companyInfo.instagram,
              blog: info.blog || prev.companyInfo.blog,
              youtube: info.youtube || prev.companyInfo.youtube,
            },
          }));
        } catch (err) {
          console.error("Error loading remote company info:", err);
        }
      })();
    });

    return () => { cancelled = true; };
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    const sanitizedName = info.name === '느티울종합청소' ? '느티울' : info.name;
    setConfig((prev) => ({
      ...prev,
      companyInfo: { 
        ...prev.companyInfo, 
        ...info,
        ...(sanitizedName ? { name: sanitizedName } : {})
      },
    }));
  };

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <SiteContext.Provider
      value={{ config, updateConfig, updateCompanyInfo, isEditable, toggleEditMode }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};