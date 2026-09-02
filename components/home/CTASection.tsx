import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { trackEvent } from '../../lib/analytics';

const CTASection: React.FC = () => {
  const { config } = useSite();
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <m.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[20px] sm:text-4xl md:text-5xl font-extrabold text-white mb-6 whitespace-nowrap"
        >
          깨끗한 공간, 새로운 시작을 준비하세요
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/90 mb-10 text-lg md:text-2xl font-medium break-keep"
        >
          무료 방문 견적을 통해 합리적인 가격과 맞춤형 청소 계획을 제안해 드립니다.
        </m.p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
           <m.a
             whileHover={{ scale: 1.04, y: -2 }}
             whileTap={{ scale: 0.96 }}
             href={`tel:${cleanPhone}`}
             onClick={() => trackEvent('contact_click', { method: 'phone', location: 'home_bottom_cta' })}
             className="px-6 py-4 md:px-10 md:py-5 bg-white text-primaryDark text-[16px] md:text-xl font-extrabold rounded-xl hover:bg-slate-50 transition-all shadow-lg whitespace-nowrap"
           >
             전화 상담 {config.companyInfo.phone}
           </m.a>
           <m.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
             <Link to="/contact" onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_bottom_cta' })} className="block px-6 py-4 md:px-10 md:py-5 bg-primaryDark text-white text-[16px] md:text-xl font-extrabold rounded-xl hover:bg-[#12b47e] transition-all shadow-lg border border-white/20 whitespace-nowrap">
               온라인 견적 문의
             </Link>
           </m.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
