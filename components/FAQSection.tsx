import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { m } from 'motion/react';
import { FAQ_DATA } from '../lib/faqData';
import { trackEvent } from '../lib/analytics';

interface FAQSectionProps {
  // If set, the bottom trust badge's "무료 상담 신청" button calls this
  // number directly instead of linking to /contact — used on service
  // landing pages, where a direct call is the more natural next step.
  ctaPhone?: string;
}

// Self-contained "안심 Q&A" section — originally lived inline in Home.tsx;
// extracted so it can also render on every ServiceLanding page without
// duplicating ~250 lines of accordion/dropdown markup and its state.
const FAQSection: React.FC<FAQSectionProps> = ({ ctaPhone }) => {
  const [activeFAQTab, setActiveFAQTab] = useState<string | null>(null);
  const [openFAQIdx, setOpenFAQIdx] = useState<string | null>(null);
  const [faqDropdownOpen, setFaqDropdownOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#ebf7f4] via-[#f7fbf9] to-[#e6f4f1] relative overflow-hidden border-b border-slate-100/80">
      {/* Premium subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#22ba8b_0.8px,transparent_0.8px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.06] pointer-events-none" />

      {/* Soft eco-inspired backdrop highlights */}
      <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-emerald-400/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-teal-400/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[18px] min-[360px]:text-[20px] min-[400px]:text-[22px] sm:text-[32px] md:text-[36.4px] font-black text-slate-900 mb-3.5 leading-tight tracking-tight whitespace-nowrap">
            가장 많이 질문하시는 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent underline decoration-emerald-300 decoration-wavy underline-offset-8">안심 Q&A</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-bold max-w-2xl mx-auto break-keep">
            궁금한 점을 명쾌하게 해결해 드립니다.
          </p>
        </div>

        {/* Mobile FAQ Dropdown Selector */}
        <div className="block md:hidden relative mb-8 z-30">
          <button
            onClick={() => setFaqDropdownOpen(!faqDropdownOpen)}
            className="w-full flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/90 border-2 border-emerald-500 rounded-2xl px-3.5 sm:px-5 py-3.5 text-sm font-extrabold text-slate-900 shadow-md shadow-emerald-500/10 active:scale-[0.99] transition-all duration-200"
          >
            <span className="flex items-center gap-2 overflow-hidden">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              {activeFAQTab === null ? (
                <span className="text-[13px] min-[360px]:text-sm text-emerald-950 font-extrabold tracking-tight whitespace-nowrap">
                  궁금하신 카테고리를 선택해주세요
                </span>
              ) : activeFAQTab === 'all' ? (
                <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm shrink-0">
                  전체 보기
                </span>
              ) : (
                <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm">
                  {FAQ_DATA.find((cat) => cat.category === activeFAQTab)?.categoryName || ''}
                </span>
              )}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm ml-1">
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  faqDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {faqDropdownOpen && (
            <>
              {/* Backdrop to close dropdown easily on clicking outside */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setFaqDropdownOpen(false)}
              />
              <m.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-30 py-1.5"
              >
                <button
                  onClick={() => {
                    setActiveFAQTab('all');
                    setOpenFAQIdx(null);
                    setFaqDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between ${
                    activeFAQTab === 'all'
                      ? 'bg-emerald-50 text-[#04a875] font-black'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>전체 보기</span>
                  {activeFAQTab === 'all' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveFAQTab(cat.category);
                      setOpenFAQIdx(null);
                      setFaqDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between ${
                      activeFAQTab === cat.category
                        ? 'bg-emerald-50 text-[#04a875] font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.categoryName}</span>
                    {activeFAQTab === cat.category && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                ))}
              </m.div>
            </>
          )}
        </div>

        {/* Desktop Category Navigation Bar (Single Line Segmented Control) */}
        <div className="hidden md:flex items-center justify-center mb-10">
          <div className="inline-flex items-center p-1.5 bg-slate-100/90 backdrop-blur-md border border-slate-200/90 rounded-full shadow-inner max-w-full overflow-x-auto scrollbar-none gap-1">
            <button
              onClick={() => {
                setActiveFAQTab('all');
                setOpenFAQIdx(null);
              }}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-full text-xs lg:text-sm font-black transition-all duration-200 cursor-pointer ${
                activeFAQTab === 'all'
                  ? 'bg-gradient-to-r from-[#04a875] to-[#22ba8b] text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              전체 보기
            </button>
            {FAQ_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setActiveFAQTab(cat.category);
                  setOpenFAQIdx(null);
                }}
                className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-full text-xs lg:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  activeFAQTab === cat.category
                    ? 'bg-gradient-to-r from-[#04a875] to-[#22ba8b] text-white shadow-md shadow-emerald-600/25 font-black scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion List */}
        {activeFAQTab === null ? (
          <div className="max-w-2xl mx-auto text-center py-10 md:py-14 px-6 rounded-2xl md:rounded-3xl border-2 border-dashed border-emerald-300/70 bg-white/60">
            <p className="text-slate-600 font-bold text-sm md:text-base mb-5 break-keep">
              위에서 궁금하신 카테고리를 선택하시면 질문을 확인하실 수 있어요.
            </p>
            <div className="flex flex-col gap-2.5 md:flex-row md:items-stretch md:justify-center md:gap-4">
              <button
                onClick={() => setActiveFAQTab('all')}
                className="w-full md:w-auto px-4 py-2.5 md:px-7 rounded-full md:rounded-2xl text-sm md:text-base font-black bg-gradient-to-r from-[#04a875] to-[#22ba8b] text-white shadow-md shadow-emerald-600/25 md:flex md:items-center"
              >
                전체 질문 보기
              </button>
              <div className="grid grid-cols-3 gap-2 md:gap-2.5">
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveFAQTab(cat.category)}
                    className="px-2.5 py-2 md:px-4 md:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors break-keep leading-snug"
                  >
                    {cat.categoryName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_DATA.filter(cat => activeFAQTab === 'all' || cat.category === activeFAQTab)
            .flatMap((cat) => cat.qas.map((qa, index) => {
              const uniqueKey = `${cat.category}-${index}`;
              const isOpen = openFAQIdx === uniqueKey;

              return (
                <div
                  key={uniqueKey}
                  className={`bg-white border rounded-2xl md:rounded-3xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-500/5'
                      : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  {/* Header / Question Trigger */}
                  <button
                    onClick={() => setOpenFAQIdx(isOpen ? null : uniqueKey)}
                    className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex gap-3 sm:gap-4 items-center flex-1">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-sm sm:text-base transition-colors ${
                        isOpen ? 'bg-[#04a875] text-white shadow-md' : 'bg-emerald-100/90 text-[#04a875]'
                      }`}>
                        Q
                      </div>
                      <div className="flex-1">
                        <span className={`text-[15px] sm:text-[18px] md:text-[19px] font-extrabold leading-snug tracking-tight break-keep transition-colors duration-150 ${
                          isOpen ? 'text-[#04a875]' : 'text-slate-900 group-hover:text-emerald-700'
                        }`}>
                          {qa.q}
                        </span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-emerald-500 text-white rotate-180 shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                    }`}>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Collapsible Answer Body */}
                  <m.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-1 sm:px-7 sm:pb-7 text-left">
                      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-slate-50 border border-emerald-100/80 flex gap-3.5 sm:gap-4 items-start shadow-inner">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          A
                        </div>
                        <div className="text-slate-800 text-[14px] sm:text-[16.5px] md:text-[17px] leading-relaxed font-semibold break-keep whitespace-pre-line flex-1">
                          {qa.a}
                        </div>
                      </div>
                    </div>
                  </m.div>
                </div>
              );
            }))}
        </div>
        )}

        {/* Bottom Trust Badge */}
        <div className="text-center mt-12 md:mt-16 p-6 sm:p-8 bg-gradient-to-r from-[#04a875] via-[#03855c] to-[#026344] text-white rounded-3xl max-w-2xl mx-auto shadow-xl shadow-emerald-950/20 border border-emerald-400/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base md:text-lg font-extrabold text-white leading-snug break-keep">
              💡 찾으시는 답변이 없으신가요?
            </p>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1 break-keep">
              <span className="block sm:inline">언제든 문의해 주시면</span>{' '}
              <span className="block sm:inline">속 시원하게 안내해 드리겠습니다.</span>
            </p>
          </div>
          {ctaPhone ? (
            <a
              href={`tel:${ctaPhone}`}
              onClick={() => trackEvent('contact_click', { method: 'phone', location: 'service_faq' })}
              className="shrink-0 px-5 py-2.5 bg-white text-[#04a875] hover:bg-emerald-50 text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>무료 상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              to="/contact"
              onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_faq' })}
              className="shrink-0 px-5 py-2.5 bg-white text-[#04a875] hover:bg-emerald-50 text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>무료 상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
