import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { m } from 'motion/react';

const anxietyTopImage = '/images/professional-cleaning.webp';
const anxietyTopImageMobile = '/images/professional-cleaning-mobile.webp';

const RealClientAnxietiesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-[#f4faf7] to-[#eaf7f3] relative overflow-hidden border-b border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section Graphic Image with Representative Greeting */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 mb-10 md:mb-14 max-w-5xl mx-auto px-4">
          {/* Speech Bubble (모바일: 12시 방향 말꼬리, 데스크톱: 우측 사진 방향 말꼬리) */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] mx-auto sm:mx-0 select-none animate-float"
          >
            {/* Desktop Rectangular Speech Bubble (우측 사진을 향하는 3시 방향 말꼬리) */}
            <div className="hidden sm:block relative w-full">
              <svg
                viewBox="0 0 460 130"
                className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.07)] overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 8 8 H 392 V 68 H 452 L 392 104 V 122 H 8 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />
              </svg>

              {/* Centered Text for Desktop */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pr-[13%] pl-[2%]">
                <h2 className="text-slate-900 font-black text-[20px] md:text-[23px] tracking-tight whitespace-nowrap text-center">
                  안녕하세요, 대표 <span className="text-[#0b7a54] font-black">조윤호</span> 입니다
                </h2>
              </div>
            </div>

            {/* Mobile Rectangular Speech Bubble (상단 사진을 향하는 12시 방향 말꼬리) */}
            <div className="block sm:hidden relative w-full">
              <svg
                viewBox="0 0 360 115"
                className="w-full h-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 8 28 H 155 L 180 6 L 205 28 H 352 V 107 H 8 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="4.5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />
              </svg>

              {/* Centered Text for Mobile */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-[22px] pb-[6px] px-3">
                <h2 className="text-slate-900 font-black text-[15.5px] tracking-tight whitespace-nowrap text-center">
                  안녕하세요, 대표 <span className="text-[#0b7a54] font-black">조윤호</span> 입니다
                </h2>
              </div>
            </div>
          </m.div>

          {/* Representative Image (우측 배치) */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative shrink-0"
          >
            <img
              src={anxietyTopImage}
              srcSet={`${anxietyTopImageMobile} 600w, ${anxietyTopImage} 880w`}
              sizes="(min-width: 768px) 440px, (min-width: 640px) 360px, 280px"
              alt="느티울 대표 조윤호"
              width={880}
              height={806}
              className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] h-auto object-contain mx-auto drop-shadow-md rounded-2xl"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </m.div>
        </div>

        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[20px] sm:text-2xl md:text-4xl font-extrabold text-slate-955 mb-4 leading-tight break-keep">
            <span className="block md:inline">청소업체를 알아볼 때,</span>
            <span className="block md:inline md:ml-2">이런 <span className="text-red-500 font-black">불쾌한 경험이나 두려움</span>이</span>
            <span className="block md:inline md:ml-2">앞서지 않으셨나요?</span>
          </h2>
          <p className="text-slate-600 text-[13px] md:text-[18.25px] font-bold max-w-2xl mx-auto break-keep leading-relaxed">
            <span className="block md:inline">상당수의 고객님이 타사 청소 서비스를 경험하신 후</span>
            <span className="block md:inline md:ml-1">후회하며 저희 느티울을 다시 찾아주고 계십니다.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {[
            {
              title: "교묘한 현장 추가요금 요구",
              desc: "유선 상으로 저렴하게 예약을 유도한 뒤, 막상 작업 당일이 되면 현장 오염이나 분진을 핑계로 10~20만원의 일방적인 추가금을 청구합니다."
            },
            {
              title: "하청 및 일용직 대리 파견",
              desc: "정식 직원이 아닌, 청소 방법을 제대로 숙지하지 못한 불분명한 일용직이나 외국인 하청팀을 대리 파견하여 무책임한 날림 청소가 이뤄집니다."
            },
            {
              title: "귀중품 분실 및 파손 면피",
              desc: "청소 도중 가구가 긁히거나 가전제품 내부 침수로 고장이 났음에도 보증 및 보험 장치가 없어 고객에게 모든 책임을 전가하려 합니다."
            },
            {
              title: "유독 세제 잔존 미처리",
              desc: (
                <>
                  빠른 시간 내에 오염을 제거하기 위해<br />
                  독한 세제를 무분별하게 사용하여<br />
                  청소 후 집안 곳곳에 유해 가스가 남아<br />
                  어지러운 두통을 만듭니다.
                </>
              )
            }
          ].map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100/80 flex flex-col items-center text-center h-full shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group duration-300 select-none cursor-default"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 block group-hover:hidden" />
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 hidden group-hover:block" />
              </div>
              <h3 className="text-base md:text-xl font-extrabold text-slate-900 mb-3 break-keep transition-colors duration-300 group-hover:text-[#048a60]">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs md:text-[15px] leading-relaxed font-semibold break-keep">
                {item.desc}
              </p>
            </m.div>
          ))}
        </div>

        {/* Solution Highlight Banner */}
        <div className="max-w-4xl mx-auto text-center mt-8 p-6 md:p-10 bg-gradient-to-br from-[#10945f] to-[#085f42] rounded-3xl border-none relative overflow-hidden shadow-lg shadow-emerald-900/10">
          {/* Subtle decorative elements for the premium banner */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />

          <h4 className="text-[16px] sm:text-lg md:text-2xl font-black text-white mb-4 break-keep drop-shadow-sm">
            "느티울은 고객님의 모든 의심과 피로를 정면으로 해결합니다."
          </h4>
          <p className="text-emerald-50/90 text-xs sm:text-sm md:text-[17px] leading-relaxed md:leading-loose font-bold max-w-3xl mx-auto break-keep">
            낯선 사람이 나의 삶의 공간을 만지는 직업이기에
            <br className="block md:hidden" />
            <span className="hidden md:inline"> </span>
            신분 보증, 사후 관리, 투명한 요금 약속은
            <br className="hidden md:block" />
            <span className="inline md:hidden"> </span>
            단순한
            <br className="block md:hidden" />
            <span className="hidden md:inline"> </span>
            서비스 규정이 아닌 브랜드의 핵심 윤리입니다.
            <br className="block md:hidden" />
            <span className="hidden md:inline"> </span>
            느티울은 투명함과 철저함으로 보답합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RealClientAnxietiesSection;
