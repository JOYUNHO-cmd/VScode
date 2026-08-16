import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteConfig, SiteContextType, CompanyInfo } from '../types';
import { INITIAL_CONFIG } from '../constants';
import { getCompanyInfo } from '../lib/firebaseService';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children?: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchRemoteInfo = async () => {
      try {
        const info = await getCompanyInfo();
        if (info) {
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
        }
      } catch (err) {
        console.error("Error loading remote company info:", err);
      }
    };
    fetchRemoteInfo();
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