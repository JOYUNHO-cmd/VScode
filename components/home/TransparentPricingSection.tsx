import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Banknote } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

const TransparentPricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 relative overflow-hidden border-b border-slate-100">
      <div className="absolute top-16 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 -right-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primaryDark text-xs md:text-sm font-bold mb-3 md:mb-4">
            <Banknote size={14} />
            인건비, 숨기지 않고 공개합니다
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 md:mb-5 leading-tight break-keep">
            왜 견적이 이렇게 나올까요?
          </h2>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed md:leading-loose break-keep">
            <span className="block md:inline">가격을 숨기는 업체는 믿지 않으셔도 됩니다.</span>{' '}
            <span className="block md:inline">저희는 인건비 산정 기준부터 투명하게 말씀드리고,</span>{' '}
            <span className="block">정확한 인원은 현장을 직접 보고 결정합니다.</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 px-5 py-2 md:px-10 md:py-4">
          <h2 className="text-sm md:text-2xl font-black text-slate-900 text-center pt-6 md:pt-8 whitespace-nowrap">
            정확한 견적의 기준, <span className="text-primaryDark">투입 인원</span>입니다
          </h2>

          {/* Labor cost comparison */}
          <div className="py-6 md:py-8">
            <h3 className="flex items-center gap-2 font-black text-slate-900 text-base md:text-xl mb-4 md:mb-5">
              <span className="w-1.5 h-5 md:h-6 rounded-full bg-primary" />
              인건비, 왜 다른가요?
            </h3>
            <div className="grid grid-cols-3 text-sm md:text-base rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm">
              <div className="bg-slate-100" />
              <div className="font-bold text-slate-600 text-center py-3 bg-slate-100 text-xs md:text-sm border-l border-slate-200">일반 인력사무소</div>
              <div className="font-black text-white text-center py-3 bg-gradient-to-r from-[#04a875] to-[#22ba8b] text-xs md:text-sm border-l border-emerald-600">느티울 전문팀</div>

              <div className="text-slate-500 font-semibold py-3 px-3 border-t-2 border-slate-200 text-xs md:text-sm flex items-center">일당</div>
              <div className="text-slate-700 font-semibold text-center py-3 border-t-2 border-l border-slate-200 flex items-center justify-center">14~16만원</div>
              <div className="text-primaryDark font-black text-center py-3 border-t-2 border-l border-slate-200 bg-primary/5 flex items-center justify-center">20만원</div>

              <div className="text-slate-500 font-semibold py-3 px-3 border-t-2 border-slate-200 text-xs md:text-sm flex items-center">투입 인력</div>
              <div className="text-slate-700 text-center py-3 border-t-2 border-l border-slate-200 text-xs md:text-sm flex items-center justify-center">비전문 일용직</div>
              <div className="text-primaryDark font-bold text-center py-3 border-t-2 border-l border-slate-200 bg-primary/5 text-xs md:text-sm flex items-center justify-center">15년 경력 전담팀</div>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mt-3 break-keep">
              일용직은 소개 수수료(약 10%) 제외 시 실수령 13~15만원 수준으로, 청소 방법을 제대로 숙지하지 못한 비전문 인력인 경우가 많습니다.
            </p>
          </div>

          {/* How headcount is determined */}
          <div className="py-6 md:py-8 border-t border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-slate-900 text-base md:text-xl mb-3 md:mb-4">
              <span className="w-1.5 h-5 md:h-6 rounded-full bg-primary" />
              투입 인원, 어떻게 정하나요?
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed break-keep mb-3">
              <span className="block md:inline">전화로 대충 정하지 않습니다. 15년 경력 대표가</span>{' '}
              <span className="block md:inline">직접 방문해 평수·오염도·난이도를 확인 후,</span>{' '}
              <span className="block md:inline">꼭 필요한 인원만 산정합니다.</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              <li className="px-3 py-1.5 rounded-full bg-primary/10 text-primaryDark text-xs md:text-sm font-bold">방문 견적 무료</li>
              <li className="px-3 py-1.5 rounded-full bg-primary/10 text-primaryDark text-xs md:text-sm font-bold">계약 의무 없음</li>
            </ul>
          </div>

          {/* Why flat per-pyeong pricing is unreliable */}
          <div className="py-6 md:py-8 border-t border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-slate-900 text-base md:text-xl mb-3 md:mb-4">
              <span className="w-1.5 h-5 md:h-6 rounded-full bg-primary" />
              '평당 얼마'가 위험한 이유
            </h3>
            <div className="grid grid-cols-3 text-sm md:text-base mb-3 rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm">
              <div className="bg-slate-100" />
              <div className="font-bold text-slate-600 text-center py-3 bg-slate-100 text-xs md:text-sm border-l border-slate-200">텅 빈 공실 100평</div>
              <div className="font-bold text-slate-600 text-center py-3 bg-slate-100 text-xs md:text-sm border-l border-slate-200">집기 가득 50평</div>

              <div className="text-slate-500 font-semibold py-3 px-3 border-t-2 border-slate-200 text-xs md:text-sm flex items-center">작업 난이도</div>
              <div className="text-slate-700 font-semibold text-center py-3 border-t-2 border-l border-slate-200 flex items-center justify-center">수월함</div>
              <div className="text-slate-700 font-semibold text-center py-3 border-t-2 border-l border-slate-200 flex items-center justify-center">고됨</div>

              <div className="text-slate-500 font-semibold py-3 px-3 border-t-2 border-slate-200 text-xs md:text-sm flex items-center">평당 계산 시</div>
              <div className="text-rose-600 font-black text-center py-3 border-t-2 border-l border-slate-200 bg-rose-50/60 flex items-center justify-center">더 비쌈</div>
              <div className="text-emerald-600 font-black text-center py-3 border-t-2 border-l border-slate-200 bg-emerald-50/60 flex items-center justify-center">더 저렴함</div>
            </div>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed break-keep">
              <span className="block md:inline">같은 평수여도 작업량은 정반대일 수 있습니다.</span>{' '}
              <span className="block md:inline">평당 계산은 쉬운 현장을 더 비싸게 만들고,</span>{' '}
              <span className="block md:inline">인원 배치 오류로 제 시간 내에 작업을</span>{' '}
              <span className="block md:inline">끝내지 못할 위험도 있습니다.</span>{' '}
              <strong className="block md:inline mt-3 md:mt-0 text-primaryDark">그래서 현장을 직접 보고 정확히 산정합니다.</strong>
            </p>
          </div>

          {/* No-surprise-fee promise */}
          <div className="py-6 md:py-8 border-t border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-slate-900 text-base md:text-xl mb-3 md:mb-4">
              <span className="w-1.5 h-5 md:h-6 rounded-full bg-primary" />
              추가 요금이 생기면 어떻게 하나요?
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed break-keep">
              <span className="block md:inline">예상 못한 특수 오염이나 상황이 발견되면,</span>{' '}
              <span className="block md:inline">먼저 안내드리고 동의 받은 후에 진행합니다.</span>{' '}
              <strong className="block md:inline mt-3 md:mt-0 text-primaryDark">사전 협의 없는 추가 청구는 없습니다!</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            to="/contact"
            onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_pricing' })}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-primaryDark transition-all shadow-lg shadow-primary/25 group"
          >
            내 공간 견적 확인하기
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricingSection;
