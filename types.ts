export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[]; // Added for detailed work scope
  icon: string; // Lucide icon name placeholder
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  date: string;
}

export interface CompanyInfo {
  name: string;
  logo: string; // URL or Data URI
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  blog: string;
  blog2: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteConfig {
  companyInfo: CompanyInfo;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  themeColor: string; // Primary color hex
}

export interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  isEditable: boolean;
  toggleEditMode: () => void;
}