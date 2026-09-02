import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Star } from 'lucide-react';
import { m } from 'motion/react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-1 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight break-keep">
            <span className="text-[#0f9d6c] font-black">사실</span>로만 입증하는 4대 안심 보장 조건
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 text-center">
          {[
            { icon: ShieldCheck, title: '대표 직접 관리', desc: '상담부터 마무리까지\n대표가 직접 관리합니다.' },
            { icon: CheckCircle2, title: '정직한 투명 견적', desc: '현장 상태와 범위 확인 후\n추가 없는 견적 안내' },
            { icon: Clock, title: '신속 현장 대응', desc: '고객님이 원하는 시간\n언제든 달려갑니다.' },
            { icon: Star, title: '100% 만족 보장', desc: '만족하실 때까지\n끝까지 책임집니다.' }
          ].map((feature, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="px-2 py-5 md:p-10 rounded-2xl md:rounded-3xl bg-white border border-slate-100 shadow-md md:shadow-xl shadow-slate-200/50 hover:border-primary/40 hover:shadow-2xl transition-all group duration-300 cursor-default"
            >
              <div className="w-11 h-11 md:w-20 md:h-20 bg-primaryBright/10 text-primaryBright rounded-full flex items-center justify-center mx-auto mb-3 md:mb-8 group-hover:bg-primaryBright group-hover:text-white group-hover:rotate-12 transition-all duration-300 shadow-sm">
                <feature.icon className="w-5 h-5 md:w-9 md:h-9" strokeWidth={2.5} />
              </div>
              <h3 className="text-[12px] md:text-2xl font-extrabold text-slate-900 mb-1 md:mb-4 whitespace-nowrap break-keep group-hover:text-primaryBright transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-[10px] md:text-lg leading-snug md:leading-relaxed font-medium whitespace-pre-line hidden sm:block">
                {feature.desc}
              </p>
              {/* Mobile version short description */}
              <p className="text-slate-500 text-[12px] leading-tight font-bold sm:hidden whitespace-pre-line">
                {feature.desc}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
