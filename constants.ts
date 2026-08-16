

import { SiteConfig } from './types';
import { SERVICES } from './lib/servicesData.mjs';

// Logo updated as requested.
const GENERATED_LOGO_URL = '/images/logo.webp';

export const INITIAL_CONFIG: SiteConfig = {
  companyInfo: {
    name: '느티울',
    logo: GENERATED_LOGO_URL,
    slogan: 'A FRESH AND PEACEFUL HAVEN',
    description: '상담부터 청소까지 대표가 직접\n관리하는 신뢰받는 기업.\n\n고객님의 공간에\n평화와 휴식을 선물합니다.',
    phone: '010-4880-7386',
    email: 'danger3662@naver.com',
    address: '군포시 도마교동 463 1층',
    blog: 'https://blog.naver.com/kslee0143',
    blog2: 'https://blog.naver.com/decline11731',
  },
  themeColor: '#34D399',
  services: SERVICES,
};