import React, { useState } from 'react';
import { Award, X } from 'lucide-react';

const certifications = [
  { title: '청소전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-cleaning-expert.webp' },
  { title: '고객상담사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-customer-service.webp' },
  { title: '환경관리전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-environment-management.webp' },
  { title: '방역관리사 1급', issuer: '한국방역전문인협회', image: '/images/about/cert-pest-control.webp' },
  { title: '건물위생관리사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-building-hygiene.webp' },
  { title: '정리수납전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-organizing-expert.webp' },
];

const CertificationsSection: React.FC = () => {
  const [openCertIdx, setOpenCertIdx] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primaryDark text-xs md:text-sm font-bold mb-3 md:mb-4">
            <Award size={14} />
            공인 자격 보유
          </span>
          <h2 className="text-sm md:text-4xl font-black text-slate-900 mb-3 md:mb-5 leading-tight whitespace-nowrap">
            말이 아닌 자격증으로 증명합니다
          </h2>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed break-keep">
            <span className="block md:inline">대표와 전담팀이 취득한 6개 공인 자격증입니다.</span>{' '}
            <span className="block md:inline">눌러서 실제 자격증을 확인하실 수 있습니다.</span>
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
          {certifications.map((cert, idx) => (
            <button
              key={cert.title}
              type="button"
              onClick={() => setOpenCertIdx(idx)}
              className="text-center group"
              aria-label={`${cert.title} 자격증 크게 보기`}
            >
              <div className="aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:shadow-lg group-hover:border-primary/40 transition-all mb-2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-slate-700 text-[10px] md:text-sm font-bold leading-tight break-keep">{cert.title}</p>
            </button>
          ))}
        </div>
      </div>

      {openCertIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setOpenCertIdx(null)}
        >
          <button
            type="button"
            onClick={() => setOpenCertIdx(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={22} />
          </button>
          <div className="flex flex-col items-center gap-4 max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={certifications[openCertIdx].image}
              alt={certifications[openCertIdx].title}
              className="max-w-full max-h-[75vh] w-auto h-auto rounded-xl shadow-2xl"
            />
            <p className="text-white font-bold text-center">
              {certifications[openCertIdx].title} · {certifications[openCertIdx].issuer}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
