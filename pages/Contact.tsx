import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Phone, Mail, MapPin, Send, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import { m } from 'motion/react';
import { trackEvent } from '../lib/analytics';

const Contact: React.FC = () => {
  const { config } = useSite();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqeqoorz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        trackEvent('generate_lead', { method: 'contact_form', service_type: formData.get('service_type') });
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('idle');
        alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      setFormStatus('idle');
      alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-svh bg-slate-50 text-slate-800">
      {/* Enhanced Hero Header for Contact Page */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-slate-900">
        {/* Aesthetic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="Clean Office Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          {/* Layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]" />
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-400 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg"
          >
            견적 문의
          </m.h1>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-300 text-[14px] sm:text-[16px] md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto px-4 break-keep leading-relaxed opacity-90 mt-4 md:mt-6"
          >
            <span className="block">공간의 가치를 높이는 느티울이</span>
            <span className="block">정직하고 투명한 견적을 약속드립니다.</span>
          </m.p>
        </div>

        {/* Smooth bottom transition without black line */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10"></div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-10 relative z-20">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/80 overflow-hidden flex flex-col md:flex-row border border-slate-100 backdrop-blur-sm"
        >
          {/* Contact Info Sidebar */}
          <div className="bg-slate-50 border-r border-slate-100 p-8 md:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-10 text-slate-900 tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Contact Info
              </h3>
              <p className="text-slate-600 mt-8 mb-16 leading-[1.8] text-[12px] sm:text-[15px] md:text-lg break-keep font-medium">
                현장 방문 견적은 <span className="text-primary font-bold">100% 무료</span>입니다.
                <br />
                직접 방문하여 공간의 특성을 진단하고
                <br />
                가장 효율적인 클리닝 플랜을 제안합니다.
              </p>
              
              <div className="space-y-8">
                <m.a
                  href={`tel:${cleanPhone}`}
                  onClick={() => trackEvent('contact_click', { method: 'phone', location: 'contact_page' })}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-5 group cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-md border border-slate-200 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Phone</p>
                    <p className="font-extrabold text-[11px] sm:text-sm md:text-lg mt-0.5 whitespace-nowrap text-slate-900 group-hover:text-primary transition-colors">{config.companyInfo.phone}</p>
                  </div>
                </m.a>
                <m.a
                  href={`mailto:${config.companyInfo.email}`}
                  onClick={() => trackEvent('contact_click', { method: 'email', location: 'contact_page' })}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-5 group cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-md border border-slate-200 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Email</p>
                    <p className="font-extrabold text-[11px] sm:text-sm md:text-lg mt-0.5 whitespace-nowrap text-slate-900 group-hover:text-primary transition-colors">{config.companyInfo.email}</p>
                  </div>
                </m.a>
                <m.div whileHover={{ x: 6 }} className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-md border border-slate-200 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Office</p>
                    <p className="font-extrabold text-[11px] sm:text-sm md:text-lg mt-0.5 text-slate-900 leading-tight whitespace-nowrap group-hover:text-primary transition-colors">{config.companyInfo.address}</p>
                  </div>
                </m.div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-14 md:w-3/5 bg-gray-900 relative text-white">
             <div className="mb-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 whitespace-nowrap">
                   견적 요청
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed opacity-95">
                  상세하게 적어주실수록 <br className="sm:hidden" />
                  정확한 견적 산출이 가능합니다.
                </p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <label className="block text-sm md:text-base font-bold text-white mb-2.5">성함 (또는 업체명)</label>
                    <input name="name" required type="text" className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-bold text-white mb-2.5">연락처</label>
                    <input name="phone" required type="tel" className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="010-0000-0000" />
                  </div>
                </div>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                     <label className="block text-sm md:text-base font-bold text-white mb-2.5">청소 유형</label>
                     <select name="service_type" className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-755 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900">
                       <option value="신축/상가 준공청소">신축/상가 준공청소</option>
                       <option value="사무실/상가 정기·대청소">사무실/상가 정기·대청소</option>
                       <option value="바닥 관리 & 왁스코팅/박리">바닥 관리 & 왁스코팅/박리</option>
                       <option value="화재 복구 청소 (그을음/탈취)">화재 복구 청소 (그을음/탈취)</option>
                       <option value="침수 피해 긴급 복구 청소">침수 피해 긴급 복구 청소</option>
                       <option value="특수 청소 (쓰레기집/고독사/유품)">특수 청소 (쓰레기집/고독사/유품)</option>
                       <option value="식당 주방 & 닥트/후드 청소">식당 주방 & 닥트/후드 청소</option>
                       <option value="공장 & 물류창고 대형 청소">공장 & 물류창고 대형 청소</option>
                       <option value="기타 맞춤 견적 문의">기타 맞춤 견적 문의</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm md:text-base font-bold text-white mb-2.5">
                       시공 지역 (서울·인천·경기 전역)
                     </label>
                     <input 
                       name="location" 
                       required 
                       type="text" 
                       className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400" 
                       placeholder="예: 서울 강남구 / 인천 송도 / 경기 수원" 
                     />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                     <label className="block text-sm md:text-base font-bold text-white mb-2.5">현장 면적 (평수)</label>
                     <input name="area_size" type="text" className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 32평형 / 150평 등" />
                  </div>
                  <div>
                     <label className="block text-sm md:text-base font-bold text-white mb-2.5">희망 일정</label>
                     <input name="target_date" type="text" className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 즉시 / 다음 주 화요일 / 협의" />
                  </div>
                </div>

                <div>
                   <label className="block text-sm md:text-base font-bold text-white mb-2.5">문의 및 요청사항</label>
                   <textarea 
                     name="message" 
                     required 
                     rows={4} 
                     className="w-full px-5 py-3.5 md:py-4 text-base rounded-xl border-2 border-slate-750 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-slate-900 placeholder-slate-400 resize-none" 
                     placeholder="희망 일정, 오염 상태 등&#10;특이사항을 입력해 주세요."
                   ></textarea>
                </div>

                <div className="flex items-start gap-2.5">
                  <input id="privacy-consent" name="privacy_consent" type="checkbox" required className="mt-1 w-4 h-4 accent-primary shrink-0" />
                  <label htmlFor="privacy-consent" className="text-xs md:text-sm text-slate-400 leading-relaxed break-keep">
                    (필수) 견적 상담을 위한 개인정보 수집·이용에 동의합니다.{' '}
                    <Link to="/privacy" target="_blank" rel="noreferrer" className="underline text-slate-300 hover:text-primary">개인정보처리방침 보기</Link>
                  </label>
                </div>

                <div className="pt-4">
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full bg-primary text-white text-lg md:text-xl font-black py-4 md:py-5 rounded-2xl hover:bg-primaryDark transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:text-slate-500 shadow-xl shadow-primary/20"
                  >
                    {formStatus === 'submitting' ? (
                       <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          전송 중...
                       </span>
                    ) : (
                       <>견적 문의 전송하기 <Send size={22} /></>
                    )}
                  </m.button>
                </div>
             </form>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default Contact;