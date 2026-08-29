import React from 'react';

// Extracted from ServiceLanding.tsx so RegionServiceLanding.tsx can carry the
// same "a real, accountable person runs this" trust signal — placed right
// before the certifications section on both, so the credentials that follow
// read as *his* credentials, not an anonymous company's.
const CeoMessageSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-[#f4faf7] to-white border-b border-emerald-100/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-emerald-200/80 shadow-xl shadow-emerald-900/10 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-200/30 rounded-full blur-2xl pointer-events-none" />

          <div className="w-full md:w-1/2 text-left order-2 md:order-1 relative z-10">
            <h3 className="text-[23px] sm:text-3xl md:text-[36.5px] font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-snug">
              느티울 대표 <span className="text-emerald-700 underline decoration-emerald-300 decoration-4 underline-offset-4">조윤호</span>입니다.
            </h3>
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-emerald-100/90 shadow-md shadow-emerald-900/5">
              <p className="text-slate-800 text-[12px] leading-[25px] md:text-[18.5px] md:leading-loose font-bold whitespace-pre-line break-keep">
{`저희는 결과로 증명하는 청소를 합니다.
제가 직접 현장을 관리하며
시작부터 마무리까지 책임지고 작업합니다.

저희 회사명처럼,
편안하고 든든하게 고객님의 공간을 지키며
언제나 믿고 맡길 수 있는 서비스로 보답하겠습니다.`}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-end order-1 md:order-2 relative z-10">
            <div className="relative w-full max-w-md md:max-w-xl overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
              <img
                src="/images/professional-cleaning.webp"
                alt="느티울 대표 조윤호"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 rounded-2xl md:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessageSection;
