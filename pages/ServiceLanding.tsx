import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { 
  Sparkles, CheckCircle, ShieldCheck, Clock, Star, 
  ArrowRight, Phone, Send, ChevronRight, ChevronLeft,
  Info, Check, ArrowLeft, Image as ImageIcon,
  CheckCircle2, ExternalLink, Lock, DollarSign, Calculator, TrendingUp, EyeOff, AlertTriangle, MessageCircle,
  Award, FileCheck, FileText, Building2
} from 'lucide-react';
import { m } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import { subscribePortfolioItems } from '../lib/firebaseService';
import { PortfolioItem } from '../types';
import ServiceBeforeAfterMarquee from '../components/ServiceBeforeAfterMarquee';
import ReviewsSection from '../components/ReviewsSection';
import CeoMessageSection from '../components/CeoMessageSection';
import FAQSection from '../components/FAQSection';
import ServiceCaseBlogSection from '../components/ServiceCaseBlogSection';

const certificationsData = [
  { 
    id: 1, 
    title: "청소전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-cleaning-expert.webp" 
  },
  { 
    id: 2, 
    title: "고객상담사 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-customer-service.webp" 
  },
  { 
    id: 3, 
    title: "환경관리전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-environment-management.webp" 
  },
  { 
    id: 4, 
    title: "방역관리사 1급", 
    issuer: "한국방역전문인협회",
    image: "/images/about/cert-pest-control.webp" 
  },
  { 
    id: 5, 
    title: "건물위생관리사 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-building-hygiene.webp" 
  },
  { 
    id: 6, 
    title: "정리수납전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-organizing-expert.webp" 
  },
];

// Must match the exact category strings the admin dashboard's portfolio
// form saves to Firestore (see AdminDashboard.tsx's category <select>) —
// this used to return spaced-out labels like '식당 청소' that never
// equaled any saved item's category (admin saves '식당청소', no space),
// so every single service page's "관련 시공사례" section silently
// filtered down to zero photos regardless of what was uploaded.
const getCategoryMapping = (serviceId: string) => {
  switch (serviceId) {
    case 'new-construction': return '준공청소';
    case 'interior': return '인테리어청소';
    case 'move-in': return '입주청소';
    case 'office': return '사무실청소';
    case 'floor': return '바닥청소';
    case 'floor-wax': return '바닥코팅';
    case 'restaurant': return '주방청소';
    case 'hood': return '후드청소';
    case 'factory': return '공장청소';
    case 'flood': return '침수청소';
    case 'fire': return '화재청소';
    case 'special': return '특수청소';
    case 'external-wall': return '외벽청소';
    case 'government-school': return '관공서청소';
    default: return '';
  }
};

const ServiceLanding: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { config } = useSite();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const detailsRef = useRef<HTMLDivElement>(null);
  const beforeAfterRef = useRef<HTMLDivElement>(null);

  // Find the current service based on the URL parameter
  const service = config.services.find(s => s.id === serviceId);

  // Scroll to top when serviceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Fetch portfolios dynamically from Firestore/local fallback
  useEffect(() => {
    const unsubscribe = subscribePortfolioItems((items) => {
      setPortfolioItems(items as PortfolioItem[]);
      setIsPortfolioLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!service) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <Info size={48} className="text-slate-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">원하시는 서비스를 찾을 수 없습니다</h2>
        <p className="text-slate-500 mb-6 font-medium">잘못된 경로이거나 존재하지 않는 서비스입니다.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primaryDark transition-all shadow-md">
          홈으로 가기
        </Link>
      </div>
    );
  }

  // Handle Formspree submission
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
        trackEvent('generate_lead', { method: 'contact_form', location: 'service_landing', service_type: formData.get('service_type') });
        alert('문의가 성공적으로 전달되었습니다! 기재해주신 번호로 신속히 연락해 드리겠습니다.');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('idle');
        alert('전송에 실패했습니다. 다시 시도해 주시거나 전화(010-4880-7386)로 연락 주세요.');
      }
    } catch (error) {
      setFormStatus('idle');
      alert('네트워크 에러가 발생하였습니다. 대표번호로 직접 전전화를 주시면 즉시 상담 드립니다!');
    }
  };

  // Filter portfolio cases matching this specific service
  const targetCategory = getCategoryMapping(serviceId || '');
  const filteredPortfolios = portfolioItems.filter(item => item.category === targetCategory);

  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <div className="bg-slate-50 text-slate-800 min-h-svh">
      
      {/* Dynamic Immersive Premium Hero Header */}
      <section className="relative min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] py-10 sm:py-14 md:py-18 flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Background Responsive Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-70 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Layered Advanced Gradients & Film Grain */}
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-slate-950/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-400/5" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* Decorative Floating Particle Lights */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none z-10">
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-primary rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-emerald-300 rounded-full blur-[120px]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center mt-2 sm:mt-4 md:mt-2 flex flex-col items-center justify-center">
          
          {/* Subtitle Accent */}
          <h2 className="text-slate-400 text-xs sm:text-sm md:text-[23.25px] md:leading-[30px] font-bold tracking-tight uppercase mb-2 md:mb-4.5 break-keep leading-snug">
            상담부터 마감까지
            <br />
            대표가 책임지고 직접 관리하는
          </h2>

          {/* Main Display Title */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.2] tracking-tight drop-shadow-2xl">
            {service.title}
          </h1>

          {/* Slogan Descriptive paragraph */}
          <div className="text-slate-200 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium tracking-tight break-keep leading-relaxed opacity-95 px-4 flex flex-col gap-3 sm:gap-4">
            <p className="md:text-[25.25px] md:font-normal">보여주기식 청소는 절대 하지 않습니다.</p>
          </div>

          {/* Navigation/Call to actions in Hero */}
          <div className="flex flex-wrap gap-3.5 justify-center mt-7 sm:mt-9">
            <button 
              onClick={() => beforeAfterRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-primary text-white text-sm sm:text-base font-extrabold rounded-xl hover:bg-primaryDark transition-all duration-300 shadow-xl shadow-primary/20 transform hover:-translate-y-0.5 active:scale-95"
            >
              청소 사례 확인하기
            </button>
            <button 
              onClick={() => detailsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/10 text-white border border-white/30 backdrop-blur-md text-sm sm:text-base font-extrabold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              상세 작업범위 보기
            </button>
          </div>
        </div>

        {/* Elegant Wave Subdivider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-20 translate-y-[2px]">
          <svg className="relative block w-full h-8 sm:h-12 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.58V0Z" transform="rotate(180 600 60)" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      <div ref={beforeAfterRef}>
        <ServiceBeforeAfterMarquee serviceId={serviceId || ''} />
      </div>

      <ServiceCaseBlogSection serviceId={serviceId || ''} className="py-16 md:py-24 max-w-7xl mx-auto px-4 bg-slate-50" />

      <ReviewsSection />

      <CeoMessageSection />

      {/* Professional Certifications Status Section (전문 자격증 보유 현황) */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[31.75px] md:text-5xl font-extrabold text-slate-900 mb-6">전문 자격증 보유 현황</h2>
            <p className="text-slate-500 text-[11px] font-bold leading-[18px] sm:text-[15px] md:text-xl sm:font-medium sm:leading-relaxed max-w-3xl mx-auto break-keep">
              느티울은 검증된 전문 자격을 갖춘 대표가 직접 시공합니다.<br />
              전문성과 기술력을 바탕으로 신뢰할 수 있는 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-1 md:px-0">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg group-hover:border-primary/50 group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-0 w-full px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                     <p className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider">{cert.issuer}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-5 text-center px-1">
                  <h4 className="text-xs sm:text-base md:text-[17px] font-bold text-slate-800 mb-1 group-hover:text-primaryDark transition-colors leading-tight break-keep">
                    {cert.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Cleaning Tile Diagnostic & Solution Section (바닥청소/왁스 전용 타일 오염 솔루션 안내) */}
      {(serviceId === 'floor' || serviceId === 'floor-wax') && (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 text-slate-900 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Main Header */}
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-lg sm:text-3xl md:text-[38px] md:leading-[50px] font-extrabold text-slate-900 tracking-tight leading-snug">
                <span className="block sm:inline">닦아도 닦아도 지저분해지는 이유,</span>{" "}
                <span className="block sm:inline">알고 나면 해결이 보입니다</span>
              </h3>
            </div>

            {/* Intro & Core Problem Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 md:mb-12 space-y-6 sm:space-y-8">
              <p className="text-slate-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-bold tracking-tight sm:tracking-normal">
                <span className="block sm:inline text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap sm:whitespace-normal">아무리 쓸고 닦아도 어느순간 바닥이 얼룩지고</span>{" "}
                <span className="block sm:inline text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap sm:whitespace-normal">오염이 번져가는 현상을 겪으셨을 것입니다.</span>
              </p>
              
              <div className="p-6 sm:p-8 md:p-9 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="text-emerald-950 font-extrabold text-base sm:text-lg md:text-xl">
                    이유는 간단합니다.
                  </h4>
                </div>
                <p className="text-slate-800 text-xs sm:text-base leading-relaxed font-medium space-y-0.5 sm:space-y-0">
                  <span className="block sm:inline">타일 표면에는 눈에 보이지 않는</span>{" "}
                  <span className="block sm:inline">미세한 기공과 패턴이 있어,</span>{" "}
                  <span className="block sm:inline">오염물이 표면이 아니라</span>{" "}
                  <span className="block sm:inline"><strong className="text-emerald-700 underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">그 속으로 스며들기 때문</strong>입니다.</span>{" "}
                  <span className="block sm:inline">그리고 여기서 잘못된 청소방식이</span>{" "}
                  <span className="block sm:inline">오염을 오히려 악화시킵니다.</span>
                </p>
              </div>
            </div>

            {/* Why Normal Cleaning Fails */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-2.5 mb-6 sm:mb-8 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h4 className="text-[16.5px] leading-[22px] sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  왜 일반 청소로는 해결되지 않을까요?
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ①
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 leading-snug">
                      <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">타일(기공,패턴)속에 굳어버린 오염,</span>{" "}
                      <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">단순한 세정으로 해결 불가</span>
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      오염이 깊이 스며들어 경화되면, 표면만 닦는 세정으로는 절대 제거되지 않습니다.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ②
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 leading-snug whitespace-nowrap sm:whitespace-normal tracking-tight sm:tracking-normal">
                      억지로 오염을 닦아내면 오히려 확산
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      세제로 때를 불려도 그대로 닦아내면, 불려진 오염수가 옆으로 퍼지면서 다시 스며듭니다. 결국 얼룩의 위치만 이동할 뿐, 근본적으로는 사라지지 않습니다.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ③
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 break-keep leading-snug">
                      잔류 세제로 인한 2차 오염
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      세제 사용 후 충분히 헹구지 않으면 잔류 세제가 남아 끈적임, 광택 저하, 먼지 흡착을 유발하고 오염이 반복되는 악순환이 시작됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </section>
      )}

      {/* 5th Section: Special Cleaning Pricing & Transparency Guide (특수청소/쓰레기집 비용 및 투명 견적 안내) */}
      {serviceId === 'special' && (
        <section className="py-16 md:py-24 bg-slate-50/80 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
          {/* Background Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Header Badge & Title */}
            <div className="text-center mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug break-keep">
                투명하고 합리적인 <br className="block sm:hidden" /><span className="text-emerald-600">맞춤 비용 산정 가이드</span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3 font-medium leading-relaxed max-w-3xl mx-auto break-keep">
                과잉 청구나 무단 추가금 우려 없이, <br className="block sm:hidden" />정직하고 세심한 기준으로 가격을 제시합니다.
              </p>
            </div>

            {/* Top Important Notice Banner */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 sm:p-7 mb-10 md:mb-12 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="text-emerald-950 font-extrabold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <span>정확한 비용은 현장 기준으로 <br className="block sm:hidden" />세심하게 산정됩니다</span>
                </h4>
                <p className="text-slate-800 text-[11px] xs:text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose tracking-tighter sm:tracking-normal font-medium">
                  <span className="block sm:inline">쓰레기 적치량 · 오염도 · 투입 인원 · 작업 시간</span>{" "}
                  <span className="block sm:inline">층수 및 엘리베이터 동선 등에 따라 맞춤 견적이</span>{" "}
                  <span className="block sm:inline">산정되며, 사진 전송 시 <strong className="text-emerald-700 font-bold">10분 이내에 빠르게</strong></span>{" "}
                  <span className="block sm:inline"><strong className="text-emerald-700 font-bold">비대면 예상 견적</strong>을 바로 안내드립니다.</span>
                </p>
              </div>
            </div>

            {/* Main Grid: Left Table & Right Chart Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
              
              {/* Left Column: Average Price Table (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 sm:mb-6 border-b border-slate-200/80 pb-3 sm:pb-4 text-center sm:text-left">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug text-center sm:text-left">
                      쓰레기집 &amp; 특수청소 <br className="block sm:hidden" />평균 비용 안내
                    </h4>
                  </div>

                  {/* Mobile Card View (block sm:hidden) */}
                  <div className="block sm:hidden space-y-3">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900">원룸 · 소형</span>
                        <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          30만 원 ~
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        쓰레기 적치량 및 오염 수준에 따라 유연하게 책정
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900">빌라 · 아파트</span>
                        <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          70만 원 ~
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        작업 인원 · 소요 시간 · 층수 및 운반 동선 반영
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900 leading-tight">
                          심각한<br />특수 현장
                        </span>
                        <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 text-right leading-tight">
                          맞춤 상담 후<br />현장 실사 견적
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        고독사 · 부패 · 분뇨 · 해충 박멸 및 특수 탈취 소독 포함
                      </p>
                    </div>
                  </div>

                  {/* Desktop Table View (hidden sm:block) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200/80 text-slate-500 font-bold">
                          <th className="pb-3 px-2 w-1/4">구분</th>
                          <th className="pb-3 px-2 w-1/3 text-emerald-700">평균 비용 범위</th>
                          <th className="pb-3 px-2">산정 및 주요 작업 설명</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 text-slate-800">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            원룸 · 소형
                          </td>
                          <td className="py-4 px-2 font-extrabold text-emerald-700 text-sm sm:text-base">
                            30만 원 ~
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            쓰레기 적치량 및 오염 수준에 따라 유연하게 책정
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            빌라 · 아파트
                          </td>
                          <td className="py-4 px-2 font-extrabold text-emerald-700 text-sm sm:text-base">
                            70만 원 ~
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            작업 인원 · 소요 시간 · 층수 및 운반 동선 반영
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            심각한 특수 현장
                          </td>
                          <td className="py-4 px-2 font-extrabold text-amber-700 text-xs sm:text-sm">
                            현장 맞춤 상담 후 견적
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            고독사 · 부패 · 분뇨 · 해충 박멸 및 특수 탈취 소독 포함
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80 text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                  * 정확한 금액은 폐기물의 최종 무게(톤) 및 특수 약품/소독 범위에 따라 사전 상의 후 확정됩니다.
                </div>
              </div>

              {/* Right Column: Estimated Price Distribution Chart & Transparency Guarantee (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      합리적인 가성비 견적
                    </h4>
                  </div>

                  <p className="text-[12.5px] sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    폐기물량, 오염도, 청소 범위를 기준으로<br />
                    불필요한 거품 없이 합리적이고 정직하게<br />
                    책정하여 고객님께 말씀드립니다.
                  </p>

                  {/* Visual Bar Chart / Range Indicator */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">최저 시작 비용 (부분/경미)</span>
                        <span className="text-emerald-700">25만 원 ~</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">평균 작업 비용 (표준 원/투룸)</span>
                        <span className="text-emerald-700">85만 원 선</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: '55%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">고가/중증 특수현장 (대형/고난도)</span>
                        <span className="text-amber-700">200만 원 ~</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                  사진으로 먼저 상담받으시면 불필요한 작업 항목을 제외하고 꼭 필요한 부분만 예산에 맞춰 진행해 드립니다.
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* Structured Detailed Job Scope Content with custom Noto Sans Layout */}
      <section ref={detailsRef} className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-xl sm:text-4xl md:text-[41.5px] md:leading-[54px] font-extrabold text-slate-900 tracking-tight leading-snug">
              <span className="block sm:inline">{service.title}</span>{" "}
              <span className="block sm:inline text-emerald-700">작업 범위 및 정밀 프로세스</span>
            </h3>
            <p className="text-slate-600 text-[13px] sm:text-base md:text-lg mt-3 font-medium leading-relaxed max-w-2xl mx-auto break-keep">
              <span className="block sm:inline">체계적인 단계별 클리닝과 대표 직접 검수로</span>{" "}
              <span className="block sm:inline">완성하는 프리미엄 서비스입니다.</span>
            </p>
          </div>



          {/* Work details Step Cards Grid */}
          {service.details && service.details.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {service.details.map((detail, index) => {
                const parts = detail.split(':');
                const stepNum = String(index + 1).padStart(2, '0');
                let title = '';
                let desc = detail.trim();

                if (parts.length > 1) {
                  title = parts[0].replace(/^(1|2|3|4|5|6|7|8|9|0)+단계\s*/, '').replace(/:\s*$/, '').trim();
                  desc = parts.slice(1).join(':').trim();
                }

                return (
                  <div 
                    key={index} 
                    className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Subtle top accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/70 tracking-wider">
                          STEP {stepNum}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>

                      {title && (
                        <h4 className="text-slate-900 font-extrabold text-base sm:text-lg md:text-xl mb-2 group-hover:text-emerald-700 transition-colors break-keep">
                          {title}
                        </h4>
                      )}
                      
                      <p className="text-slate-600 text-xs sm:text-sm md:text-[18px] md:leading-[25px] md:font-bold leading-relaxed break-keep font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="col-span-2 text-center py-10 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-400 font-medium">상세 작업 프로세스가 곧 업데이트 될 예정입니다.</p>
            </div>
          )}

          {/* Bottom Trust Guarantee Banner */}
          <div className="mt-8 sm:mt-12 bg-emerald-50/80 rounded-2xl p-5 sm:p-6 border border-emerald-200/70 text-center flex items-center justify-center gap-3 text-emerald-900 text-xs sm:text-sm font-bold break-keep">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>모든 청소 작업은 사전 현장 진단 후 진행되며, 작업 완료 후 고객님과 함께 현장을 직접 검수하여 마감합니다.</span>
          </div>

        </div>
      </section>

      {/* Main Multi-Bento Core Values Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h3 className="text-[17px] min-[360px]:text-xl min-[410px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight whitespace-nowrap">
            느티울이 약속하는 3대 작업 원칙
          </h3>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">대표 직접 성실 관리</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                하청이나 외주팀에 일을<br />
                넘겨주는 행위는 절대 없습니다.
              </p>
              <p>
                상담 과정부터 실제 세척,<br />
                그리고 최종 점검까지!
              </p>
              <p>
                대표인 제가 직접 관리 감독하며<br />
                디테일을 마감합니다.
              </p>
            </div>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Star className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">추가없는 투명한 견적 약속</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                애매한 견적서, 숨겨진 추가비용<br />
                저희와 거리가 먼 얘기입니다.
              </p>
              <p>
                현장을 직접 확인하고<br />
                작업 범위와 단가를 근거로 제시
              </p>
              <p>
                투명하게 금액을 공개하고<br />
                고객님께 의뢰를 제시합니다.
              </p>
            </div>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.19 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">100% 고객 만족 정직 시공</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                고객님이 현장을 함께 확인하시고<br />
                만족할 때까지 책임을 다합니다.
              </p>
              <p>
                투명하고 양심적인 비용 대비<br />
                완벽한 시공 퀄리티로 작업하여,
              </p>
              <p>
                감동적인 공간으로 되돌려드립니다.
              </p>
            </div>
          </m.div>

        </div>
      </section>

      <FAQSection ctaPhone={cleanPhone} />

      {/* Embedded Real, Seamless Consultation Contact Formspree Area (No placeholders) */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          
          <m.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-[2rem] border border-white/10 shadow-xl shadow-black/20 p-6 sm:p-12 md:p-16 relative"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-center mb-10">
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                {service.title}
                <br />
                무료 견적 신청
              </h3>
              <p className="text-slate-300 text-[11.5px] xs:text-[13.5px] sm:text-base md:text-[18px] font-bold leading-normal xs:leading-relaxed sm:leading-loose break-keep px-2 sm:px-4 opacity-95">
                필요 조건만 적어 접수해주시면, 빠르게<br />
                합리적인 비용으로 마스터 플랜을 구성해<br />
                친절하게 안내드리겠습니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10 text-left">
              {/* Invisible hidden parameters to pass the actual service context to Formspree */}
              <input type="hidden" name="service_type" value={`${service.title} (개별랜딩 특별견적)`} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">성함 또는 단체명 <span className="text-red-500 font-bold">*</span></label>
                  <input name="name" required type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="성함 기재" />
                </div>
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">연락처 <span className="text-red-500 font-bold">*</span></label>
                  <input name="phone" required type="tel" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 010-0000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">시공 예정일 (희망 일정)</label>
                  <input name="date" type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 11월 중순 또는 일정 협의" />
                </div>
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">현장 위치 / 예상 평수</label>
                  <input name="area_size" type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 군포 도마교동 / 25평" />
                </div>
              </div>

              <div>
                 <label className="block text-xs sm:text-sm font-bold text-white mb-2">추가 문의 및 현장 요청사항 <span className="text-red-500 font-bold">*</span></label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  className="w-full px-4.5 py-3.5 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition bg-white text-slate-900 placeholder-slate-400 resize-none leading-relaxed" 
                  placeholder="예: 실리콘 그을음 제거 필수, 인테리어 수납 마감 먼지 케어 요청, 찌든기름때 제거 등 희망하시는 세심한 요구조건을 자유롭게 적어주세요."
                ></textarea>
              </div>

              <div className="flex items-start gap-2.5">
                <input id="privacy-consent-service" name="privacy_consent" type="checkbox" required className="mt-1 w-4 h-4 accent-primary shrink-0" />
                <label htmlFor="privacy-consent-service" className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">
                  (필수) 견적 상담을 위한 개인정보 수집·이용에 동의합니다.{' '}
                  <Link to="/privacy" target="_blank" rel="noreferrer" className="underline text-slate-200 hover:text-primary">개인정보처리방침 보기</Link>
                </label>
              </div>

              <div className="pt-2">
                <m.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={formStatus === 'submitting'}
                  type="submit"
                  className="w-full bg-primary text-white text-[15px] xs:text-[16px] sm:text-xl md:text-[22px] font-black py-4 sm:py-[22px] md:py-[24px] px-4 rounded-xl sm:rounded-2xl hover:bg-[#1fa178] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:bg-slate-700 disabled:text-slate-500 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/45 whitespace-nowrap"
                >
                  {formStatus === 'submitting' ? (
                     <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        작업전송 처리중...
                     </span>
                  ) : (
                     <>무료 상세 견적 신청 및 문의 전송 <Send className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" /></>
                  )}
                </m.button>
              </div>
            </form>
          </m.div>

          <div className="text-center mt-12 mb-4">
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-800 hover:text-primary transition-all font-extrabold text-base sm:text-lg md:text-[21px] border-b-2 border-slate-300/60 hover:border-primary pb-1">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" /> 다른 청소 전체 서비스 둘러보기
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ServiceLanding;
