import { FAQ_DATA as RAW_FAQ_DATA } from './faqData.mjs';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  categoryName: string;
  qas: FAQItem[];
}

// Re-exported from faqData.mjs (plain JS) so lib/seoData.mjs — imported
// both in the browser and by the Node-only scripts/prerender.mjs — can
// share the exact same data without a TypeScript toolchain.
export const FAQ_DATA: FAQCategory[] = RAW_FAQ_DATA;
