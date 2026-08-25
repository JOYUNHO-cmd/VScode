import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Clock, Sparkles, Quote, Rss, Calendar, Loader2, ArrowUpRight, Target, Compass, Heart, Zap, Shield, Trees, Home as LucideHome, Leaf, ShieldAlert, ChevronDown, HelpCircle, MousePointerClick, Banknote, Award, X } from 'lucide-react';
import { m } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { trackEvent } from '../lib/analytics';
import PhotoMarquee from '../components/PhotoMarquee';
import ReviewMarquee from '../components/ReviewMarquee';

const zelkovaHero = '/images/hero-tree-family.webp';
const zelkovaMobileHero = '/images/hero-tree-family-mobile.webp';
const anxietyTopImage = '/images/professional-cleaning.webp';
const anxietyTopImageMobile = '/images/professional-cleaning-mobile.webp';
const stepImage1 = '/images/visit-notification.webp';
const stepImage1Mobile = '/images/visit-notification-mobile.webp';
const stepImage2 = '/images/diagnosis-process.webp';
const stepImage2Mobile = '/images/diagnosis-process-mobile.webp';
const stepImage3 = '/images/top-to-bottom-cleaning.webp';
const stepImage3Mobile = '/images/top-to-bottom-cleaning-mobile.webp';
const stepImage4 = '/images/eco-neutralization.webp';
const stepImage4Mobile = '/images/eco-neutralization-mobile.webp';
const stepImage5 = '/images/confirmation-aftercare.webp';
const stepImage5Mobile = '/images/confirmation-aftercare-mobile.webp';
import ceoMobile from '../src/assets/images/ceo_mobile.webp';
import ceoPc from '../src/assets/images/ceo_pc.webp';



interface NaverRssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  thumbnail: string;
  description: string;
  content: string;
  blogName?: string;
  blogCode?: string;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=850&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=850&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=850&auto=format&fit=crop&q=80'
];

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  categoryName: string;
  qas: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    category: 'reservation',
    categoryName: '예약 & 견적',
    qas: [
      {
        q: "정확한 견적은 어떻게 받을 수 있나요?",
        a: "평수만으로도 대략적인 견적은 가능하지만, 현장 상태(오염도, 자재 종류, 짐 유무)에 따라 작업 방식이 달라지기 때문에 정확한건 무료로 현장 방문 후 안내해드립니다. 방문 견적 시 저희가 살펴보고 통화로 소통이 가능하니 현장에 계실 필요가 없습니다. 또한 15년간 수많은 현장을 다뤄온 경험으로, 전화 상담만으로도 상당히 근접한 견적을 바로 안내해드릴 수 있습니다."
      },
      {
        q: "서울, 인천, 경기 전 지역도 무료 방문 출장 견적이 가능한가요?",
        a: "네, 100% 무료로 출장 방문 견적을 진행합니다. 군포, 안양, 수원뿐만 아니라 서울 전지역(강남, 여의도, 가산, 마곡, 성수 등), 인천 전지역(송도, 청라, 영종, 남동공단 등), 경기 전지역(판교, 동탄, 안산, 시흥, 화성, 평택 등) 어디든 조윤호 대표가 직접 현장을 찾아가 꼼꼼히 진단하고 투명한 견적서를 제공합니다."
      },
      {
        q: "견적 후 추가 비용이 발생하는 경우가 있나요?",
        a: "사전에 협의되지 않은 추가 비용은 절대 없습니다. 현장 확인 후 안내드린 견적이 최종 금액이며, 작업 중 예상치 못한 사항이 생기더라도 반드시 사전에 안내드리고 고객님 동의 후에만 진행합니다."
      },
      {
        q: "예약금이나 계약금이 있나요?",
        a: "정확한 일정을 확정하기 위해서 총 금액의 5%만 예약금을 받고 있습니다."
      }
    ]
  },
  {
    category: 'process',
    categoryName: '작업 과정 & 범위',
    qas: [
      {
        q: "청소는 보통 몇 시간/며칠 정도 걸리나요?",
        a: "보통 평수와 오염도에 따라 다르지만, 특별한 경우가 아니면 하루면 다 끝낼 수 있습니다. (이른 오전 시작 - 오후 마무리)"
      },
      {
        q: "청소 당일 저희가 꼭 있어야 하나요?",
        a: "꼭 계실 필요는 없습니다. 작업 시작과 종료 시간을 정확히 안내드리고, 외출하셔도 안심하고 맡기실 수 있도록 책임감 있게 작업합니다. 원하시면 진행 상황을 사진으로 공유해드릴 수도 있습니다."
      },
      {
        q: "가구나 짐이 있는 상태에서도 진행 가능한가요?",
        a: "가능합니다. 짐이 있는 상태에서도 손상 없이 작업할 수 있는 노하우를 갖추고 있으며, 필요 시 가구 이동도 조심스럽게 도와드립니다."
      },
      {
        q: "냉장고, 에어컨 내부까지 포함되나요?",
        a: "네, 원하시는 범위에 맞춰 세부 작업까지 모두 가능합니다. 냉장고 내부, 에어컨 내부 세척, 창틀, 방충망 등 눈에 잘 안 띄는 부분까지 꼼꼼히 챙겨드립니다."
      }
    ]
  },
  {
    category: 'safety',
    categoryName: '안전 & 신뢰',
    qas: [
      {
        q: "사용하는 세제가 아이/반려동물에게 안전한가요?",
        a: "네, 친환경 세정제를 사용하며 작업 후에는 중화 처리까지 진행해 세정 성분이 남지 않도록 합니다. 아이와 반려동물이 있는 가정에서도 안심하고 이용하실 수 있습니다."
      },
      {
        q: "작업자분들이 보험에 가입되어 있나요?",
        a: "네, 만일의 상황에 대비한 보험이 가입되어 있어 안심하고 맡기실 수 있습니다."
      },
      {
        q: "방문하시는 분들 신원이 확실한가요?",
        a: "15년간 함께해온 저희 전문팀(오직 1팀 입니다) 인력이 방문하며, 방문 전 담당팀 정보를 미리 안내해드리기 때문에 누가 오는지 알고 안심하고 맞이하실 수 있습니다."
      }
    ]
  },
  {
    category: 'materials',
    categoryName: '소재 & 오염 케어',
    qas: [
      {
        q: "마루나 타일이 오래됐는데 손상되지 않을까요?",
        a: "가장 많이 걱정하시는 부분인데요, 여태껏 다양한 자재(마루, 포세린 타일, 대리석 등)를 다뤄온 경험으로 소재별 특성에 맞는 세정제와 방법을 선정합니다. 오히려 잘못된 셀프 청소로 인한 손상을 막아드릴 수 있습니다."
      },
      {
        q: "곰팡이나 심한 오염도 제거가 가능한가요?",
        a: "네, 어떤 상태든 가능합니다. 고독사 현장, 화재 현장, 장기 방치된 공간까지 다뤄온 경험이 있기 때문에 일반 오염은 물론 심한 곰팡이, 찌든 때도 확실하게 제거해드립니다."
      },
      {
        q: "냄새(반려동물, 담배 등)도 확실히 제거되나요?",
        a: "네, 표면적인 방향제 처리가 아니라 냄새의 원인 자체를 제거하는 방식으로 작업하며, 마무리 단계의 피톤치드 분사로 쾌적함까지 더해드립니다."
      }
    ]
  },
  {
    category: 'aftercare',
    categoryName: '일정 & 사후 관리',
    qas: [
      {
        q: "청소 후 만족스럽지 않으면 어떻게 되나요?",
        a: "작업 완료 후 고객님과 함께 결과물을 직접 확인하며, 미흡한 부분이 있다면 그 자리에서 바로 보완해드립니다. 정산은 고객님이 만족하신 후에 진행됩니다."
      },
      {
        q: "재청소나 A/S 기간이 있나요?",
        a: "기한 없는 사후 관리를 약속드립니다. 시간이 지난 후 문제가 발견되어도 언제든 연락 주시면 책임지고 대응해드립니다."
      },
      {
        q: "원하는 날짜에 바로 예약 가능한가요?",
        a: "가능한 빠른 일정 조율을 도와드리며, 예약이 몰릴 수 있어 여유 있게 문의 주시는 것을 추천드립니다."
      },
      {
        q: "예약 변경이나 취소는 어떻게 하나요?",
        a: "작업 2~3일 전 변경은 확실히 말씀드리기 어려우나 그전에 시간상 여유(1주일)가 있다면 변경이나 취소가 가능합니다."
      },
      {
        q: "주말/공휴일에도 가능한가요?",
        a: "네, 고객님의 일정에 맞춰 주말과 공휴일(야간도 가능합니다)에도 유연하게 작업 가능합니다."
      }
    ]
  },
  {
    category: 'special',
    categoryName: '특수 상황',
    qas: [
      {
        q: "이사 전/후 청소도 가능한가요?",
        a: "네, 입주 전 청소부터 이사 후 정리까지 모두 가능합니다."
      },
      {
        q: "준공청소와 입주청소는 뭐가 다른가요?",
        a: "준공청소는 신축 공사 후 건축 자재 분진과 잔여물을 제거하는 작업이고, 입주청소는 이사 들어가기 전 생활 공간을 위생적으로 준비하는 작업입니다. 상황에 맞는 작업을 안내해드립니다."
      },
      {
        q: "반려동물이 있는 집도 괜찮나요?",
        a: "네, 전혀 문제없습니다. 반려동물의 털, 냄새까지 고려한 청소 방식으로 진행합니다."
      }
    ]
  }
];

const Home: React.FC = () => {
  const { config } = useSite();
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const [rssItems, setRssItems] = useState<NaverRssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [activeFAQTab, setActiveFAQTab] = useState<string | null>(null);
  const [openFAQIdx, setOpenFAQIdx] = useState<string | null>(null);
  const [faqDropdownOpen, setFaqDropdownOpen] = useState(false);
  const [openCertIdx, setOpenCertIdx] = useState<number | null>(null);

  const certifications = [
    { title: '청소전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-cleaning-expert.webp' },
    { title: '고객상담사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-customer-service.webp' },
    { title: '환경관리전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-environment-management.webp' },
    { title: '방역관리사 1급', issuer: '한국방역전문인협회', image: '/images/about/cert-pest-control.webp' },
    { title: '건물위생관리사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-building-hygiene.webp' },
    { title: '정리수납전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-organizing-expert.webp' },
  ];

  // Hero parallax: mutate the DOM node directly via ref instead of
  // React state, so mouse movement anywhere on the page doesn't
  // re-render this entire ~1400-line component on every pixel of
  // movement. That re-render churn was a major contributor to the
  // page's poor INP (Clarity measured 1.1s on the homepage — anything
  // over 500ms is flagged "poor"): it kept the main thread busy
  // re-rendering marquees/FAQ/etc. on every mousemove, so it had to
  // compete with actual click/tap handling for input responsiveness.
  // requestAnimationFrame caps the work to once per frame regardless
  // of how many mousemove events fire in between.
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        const el = heroParallaxRef.current;
        if (el) {
          el.style.transform = `translate(${x * -10}px, ${y * -10}px) scale(1.05)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const fetchNaverRss = async () => {
      try {
        setRssLoading(true);
        const rssUrl1 = "https://rss.blog.naver.com/kslee0143.xml";
        const rssUrl2 = "https://rss.blog.naver.com/decline11731.xml";
        
        const proxyUrl1 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl1)}`;
        const proxyUrl2 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl2)}`;
        
        const [res1, res2] = await Promise.all([
          fetch(proxyUrl1).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(proxyUrl2).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);

        const items1 = (res1 && res1.status === 'ok' && res1.items) ? res1.items.map((item: any) => ({
          ...item,
          blogName: "현장 일지 1",
          blogCode: "kslee0143"
        })) : [];

        const items2 = (res2 && res2.status === 'ok' && res2.items) ? res2.items.map((item: any) => ({
          ...item,
          blogName: "현장 일지 2",
          blogCode: "decline11731"
        })) : [];

        const combined = [...items1, ...items2];
        combined.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        
        setRssItems(combined.slice(0, 3));
      } catch (err) {
        console.error("Home Naver RSS fetch error:", err);
      } finally {
        setRssLoading(false);
      }
    };
    fetchNaverRss();
  }, []);

  const getPostCoverImage = (item: NaverRssItem, index: number) => {
    if (item.thumbnail && item.thumbnail !== "") return item.thumbnail;
    try {
      const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    } catch (e) {}
    return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  };

  const cleanDescription = (htmlStr: string) => {
    if (!htmlStr) return '';
    try {
      const stripped = htmlStr.replace(/<[^>]*>/g, '');
      const unescaped = stripped
        .replace(/&middot;/g, '·')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
      return unescaped.trim().substring(0, 85) + (unescaped.length > 85 ? '...' : '');
    } catch (e) {
      return '';
    }
  };

  const formatDateString = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col bg-light text-textMain">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-6rem)] md:h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white">
        {/* Mobile Background Image (Absolute full-bleed background on mobile for vertical image) */}
        <div className="block md:hidden absolute inset-0 z-0">
          <img
            src={zelkovaMobileHero}
            alt="느티울종합청소 느티나무 배경"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          {/* Elegant overlay that lets the image show through clearly and vividly, keeping the text readable */}
          <div className="absolute inset-0 bg-white/50" />
        </div>

        {/* Desktop Background Image (Hidden on mobile, absolute overlay on PC) */}
        <div
          ref={heroParallaxRef}
          className="hidden md:block absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{ transform: 'scale(1.05)' }}
        >
          <img
            src={zelkovaHero}
            alt="느티울종합청소 느티나무 배경"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/30 md:bg-white/25" />
        </div>

        {/* Text and Buttons Container */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center py-10 md:py-0 -translate-y-10 md:translate-y-0">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl md:max-w-6xl mx-auto flex flex-col items-center justify-center"
          >
            <h1 className="font-extrabold text-slate-900 mb-4 md:mb-8 leading-tight drop-shadow-sm break-keep text-center flex flex-col items-center">
              <span className="block text-[13px] sm:text-sm md:text-2xl text-[#444a53] font-extrabold mb-1.5 md:mb-4 uppercase tracking-[0.2em]">
                A FRESH AND PEACEFUL HAVEN
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block mb-1 md:mb-3">
                한결같은 <span className="text-[#0f9d6c] font-black">마음</span>으로
              </span>
              <span className="text-[25px] sm:text-4xl md:text-7xl block">
                이웃의 <span className="text-[#0f9d6c] font-black">소중한 공간</span>을 품습니다
              </span>
            </h1>

            <div className="text-[18px] md:text-xl text-[#000000] mb-5 md:mb-10 leading-[26px] md:leading-relaxed font-bold max-w-2xl md:max-w-3xl mx-auto break-keep text-center">
              <p className="mb-4 md:mb-6 md:text-[25.5px] md:leading-relaxed">
                느티울은 날림 청소나 눈속임식<br />
                요금 유도를 과감히 배제합니다.
              </p>
              <p className="md:text-[25.5px] md:leading-relaxed">
                정직하게 흘린 땀만큼 가치를 증명하는<br />
                청소의 본질을 지킵니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
              <m.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link to="/contact" onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_hero' })} className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-primary text-white text-base sm:text-lg font-bold rounded-xl hover:bg-primaryDark transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                  무료 견적 신청 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-slate-900 py-5 md:py-7 relative">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-2 md:gap-8 text-center divide-x divide-white/10">
            <div>
              <p className="text-xl md:text-4xl font-black text-white">15<span className="text-primary">년</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">대표 현장 경력</p>
            </div>
            <div>
              <p className="text-xl md:text-4xl font-black text-white">5,000<span className="text-primary">+</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">누적 시공 건수</p>
            </div>
            <div>
              <p className="text-xl md:text-4xl font-black text-white">4.9<span className="text-primary">★</span></p>
              <p className="text-slate-400 text-[10px] md:text-sm font-medium mt-0.5">실제 고객 평점</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Site Photo Marquee */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50/60 via-white to-white relative border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-6 md:mb-10 relative z-10">
          <p className="text-slate-900 text-xl md:text-3xl font-black tracking-tight break-keep">
            이런 곳들도 <span className="bg-gradient-to-r from-[#04a875] to-[#22ba8b] bg-clip-text text-transparent">느티울</span>과 함께했습니다
          </p>
        </div>
        <PhotoMarquee />
      </section>

      {/* Real Client Anxieties Section */}
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

      {/* 5-Step Progress Workflow Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/30 border-b border-slate-100/80 relative overflow-hidden">
        {/* Natural & Eco-friendly Decorative Background Elements */}
        <div className="absolute top-10 -left-16 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Soft floating leaves and tree indicators */}
        <div className="absolute top-20 right-[8%] text-emerald-600/5 pointer-events-none select-none transform rotate-12 hidden lg:block">
          <Leaf size={140} strokeWidth={0.8} />
        </div>
        <div className="absolute bottom-16 left-[5%] text-emerald-700/5 pointer-events-none select-none transform -rotate-12 hidden lg:block">
          <Trees size={180} strokeWidth={0.6} />
        </div>
        <div className="absolute top-1/2 left-[8%] text-emerald-500/5 pointer-events-none select-none transform rotate-45 hidden xl:block">
          <Leaf size={70} strokeWidth={0.8} />
        </div>

        {/* Inject CSS animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flowHorizontalRight {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes flowVerticalDown {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes flowHorizontalLeft {
            0% { right: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { right: 100%; opacity: 0; }
          }
          .animate-flow-hr-right {
            animation: flowHorizontalRight 2s infinite linear;
          }
          .animate-flow-v-down {
            animation: flowVerticalDown 2s infinite linear;
          }
          .animate-flow-hr-left {
            animation: flowHorizontalLeft 2s infinite linear;
          }
        `}} />

        <div className="max-w-3xl lg:max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[22px] sm:text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4 leading-tight break-keep">
              고객님을 위한 5단계 진행 과정
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto break-keep">
              처음부터 끝까지 투명하고 철저하게 진행되는<br className="block sm:hidden" />{' '}
              느티울만의 안심 청소 서비스 시스템입니다.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-3xl lg:max-w-4xl mx-auto w-full">
            {[
              { img: stepImage1, mobileImg: stepImage1Mobile, step: 'STEP 01', width: 900, height: 675 },
              { img: stepImage2, mobileImg: stepImage2Mobile, step: 'STEP 02', width: 900, height: 675 },
              { img: stepImage3, mobileImg: stepImage3Mobile, step: 'STEP 03', width: 900, height: 637 },
              { img: stepImage4, mobileImg: stepImage4Mobile, step: 'STEP 04', width: 900, height: 600 },
              { img: stepImage5, mobileImg: stepImage5Mobile, step: 'STEP 05', width: 900, height: 600 },
            ].map((item, idx, arr) => (
              <div key={idx} className="w-full flex flex-col items-center">
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  whileHover={{ y: -4, scale: 1.005 }}
                  className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(34,186,139,0.14)] overflow-hidden transition-all duration-300 relative group"
                >
                  {/* Image Container with Crisp Rendering & Contrast Enhancement */}
                  <div className="w-full bg-white flex items-center justify-center">
                    <img
                      src={item.img}
                      srcSet={`${item.mobileImg} 800w, ${item.img} 900w`}
                      sizes="(min-width: 1024px) 900px, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 1.5rem)"
                      alt={`느티울 5단계 진행 과정 - ${item.step}`}
                      width={item.width}
                      height={item.height}
                      className="w-full h-auto object-contain block contrast-[1.06] brightness-[1.01] sharp-render group-hover:scale-[1.003] transition-transform duration-500 ease-out"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                      loading="eager"
                      decoding="sync"
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </m.div>

                {/* Animated Lively Downward Connector Flow */}
                {idx < arr.length - 1 && (
                  <div className="my-5 sm:my-8 flex flex-col items-center justify-center relative">
                    {/* Glowing flow line with moving light tracer */}
                    <div className="w-[3px] h-8 sm:h-12 bg-gradient-to-b from-[#0f9d6c]/40 via-[#0f9d6c] to-[#0f9d6c]/40 rounded-full relative overflow-hidden shadow-[0_0_12px_rgba(34,186,139,0.4)]">
                      <m.div
                        animate={{ y: [-24, 48] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-full h-5 bg-white rounded-full opacity-90 blur-[0.5px]"
                      />
                    </div>
                    
                    {/* Floating bouncing animated circle badge with bold downward chevron */}
                    <m.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                      className="mt-1 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#0f9d6c] to-emerald-600 text-white shadow-[0_4px_18px_rgba(34,186,139,0.45)] border-2 border-white ring-4 ring-[#0f9d6c]/15"
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                    </m.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Certifications Section */}
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

      {/* Transparent Pricing Section */}
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

      {/* Real Customer Reviews */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative border-b border-slate-100 overflow-hidden">
        <div className="absolute top-10 right-[10%] w-64 h-64 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[10%] w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-8 md:mb-14 relative z-10">
          <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-4 md:mb-5">
            {[...Array(5)].map((_, i) => (
              <m.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 14 }}
              >
                <Star
                  size={30}
                  className="md:w-9 md:h-9 text-amber-400 fill-amber-400 animate-star-twinkle"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              </m.div>
            ))}
          </div>
          <h2 className="text-sm md:text-4xl font-black text-slate-900 leading-tight mb-3 md:mb-5 whitespace-nowrap">
            직접 이용해보신 고객님들의 후기
          </h2>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed break-keep">
            <span className="block md:inline">저희가 아닌, 실제로 청소를 맡기신</span>{' '}
            <span className="block md:inline">고객님들의 이야기입니다.</span>{' '}
            <span className="block md:inline mt-3 md:mt-0">사진을 눌러 크게 볼 수 있습니다.</span>
          </p>
        </div>

        <ReviewMarquee />
      </section>

      {/* 5th Section: Beautiful & Interactive Q&A Accordion */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#ebf7f4] via-[#f7fbf9] to-[#e6f4f1] relative overflow-hidden border-b border-slate-100/80">
        {/* Premium subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#0f9d6c_0.8px,transparent_0.8px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.06] pointer-events-none" />
        
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
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-700"></span>
                </span>
                {activeFAQTab === null ? (
                  <span className="text-[13px] min-[360px]:text-sm text-emerald-950 font-extrabold tracking-tight whitespace-nowrap">
                    궁금하신 카테고리를 선택해주세요
                  </span>
                ) : activeFAQTab === 'all' ? (
                  <span className="flex items-center gap-1.5 min-[380px]:gap-2 whitespace-nowrap overflow-hidden">
                    <span className="bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm shrink-0">
                      전체 보기
                    </span>
                    <span className="text-[11.5px] min-[360px]:text-xs min-[400px]:text-[13px] text-emerald-950 font-extrabold tracking-tight whitespace-nowrap">
                      (궁금하신 카테고리 선택)
                    </span>
                  </span>
                ) : (
                  <span className="bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black shadow-sm">
                    {FAQ_DATA.find((cat) => cat.category === activeFAQTab)?.categoryName || ''}
                  </span>
                )}
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm ml-1">
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
                        ? 'bg-emerald-50 text-[#0b7a54] font-black'
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
                          ? 'bg-emerald-50 text-[#0b7a54] font-black'
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
                    ? 'bg-gradient-to-r from-[#0b7a54] to-[#0f9d6c] text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
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
                      ? 'bg-gradient-to-r from-[#0b7a54] to-[#0f9d6c] text-white shadow-md shadow-emerald-600/25 font-black scale-[1.02]'
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
                  className="w-full md:w-auto px-4 py-2.5 md:px-7 rounded-full md:rounded-2xl text-sm md:text-base font-black bg-gradient-to-r from-[#0b7a54] to-[#0f9d6c] text-white shadow-md shadow-emerald-600/25 md:flex md:items-center"
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
                          isOpen ? 'bg-[#0b7a54] text-white shadow-md' : 'bg-emerald-100/90 text-[#0b7a54]'
                        }`}>
                          Q
                        </div>
                        <div className="flex-1">
                          <span className={`text-[15px] sm:text-[18px] md:text-[19px] font-extrabold leading-snug tracking-tight break-keep transition-colors duration-150 ${
                            isOpen ? 'text-[#0b7a54]' : 'text-slate-900 group-hover:text-emerald-700'
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
          <div className="text-center mt-12 md:mt-16 p-6 sm:p-8 bg-gradient-to-r from-[#0b7a54] via-[#0da36c] to-[#085f42] text-white rounded-3xl max-w-2xl mx-auto shadow-xl shadow-emerald-950/20 border border-emerald-400/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg font-extrabold text-white leading-snug break-keep">
                💡 찾으시는 답변이 없으신가요?
              </p>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1 break-keep">
                언제든 문의해 주시면 친절하고 속 시원히 안내해 드리겠습니다.
              </p>
            </div>
            <Link
              to="/contact"
              onClick={() => trackEvent('contact_click', { method: 'quote', location: 'home_faq' })}
              className="shrink-0 px-5 py-2.5 bg-white text-[#0b7a54] hover:bg-emerald-50 text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>무료 상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4">전문적인 청소 솔루션</h3>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primaryDark font-bold text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md transition-all">
              <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 text-primaryDark animate-pulse" />
              <span>아래 사진을 클릭하면 이동합니다</span>
              <span className="inline-block animate-bounce text-base sm:text-lg">👇</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {config.services.map((service, idx) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="w-full h-full lg:max-w-[310px] lg:mx-auto"
              >
                <Link 
                  to={`/services/${service.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full w-full"
                >
                  <div className="h-32 sm:h-48 lg:h-52 overflow-hidden relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex items-center justify-center text-center">
                    <h4 className="text-[17px] sm:text-[20px] md:text-[22px] lg:text-[23px] font-extrabold text-slate-900 group-hover:text-primaryBright transition-colors break-keep">
                      {service.title}
                    </h4>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Work Feed Section */}
      <section className="py-16 md:py-24 bg-white relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 md:mb-16">
            <div className="text-center">
              <h3 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight">실시간 작업 현장 공유</h3>
              <p className="text-slate-500 mt-3 md:mt-5 leading-relaxed break-keep px-4">
                <span className="block md:inline text-[14px] md:text-[22px] lg:text-[26px] font-bold md:font-semibold text-slate-500">실시간으로 공유되는 느티울의</span>{' '}
                <br className="hidden md:block" />
                <span className="block md:inline text-[14px] md:text-[22px] lg:text-[26px] font-bold md:font-semibold text-slate-500">생생한 실제 현장 작업 사진과</span>{' '}
                <span className="block md:inline text-[14px] md:text-[22px] lg:text-[26px] font-bold md:font-semibold text-slate-500">진행하는 과정들을 만나보세요.</span>
              </p>
            </div>
            
            <Link 
              to="/portfolio"
              className="mt-4 md:mt-6 inline-flex items-center gap-1.5 text-primary hover:text-primaryDark font-bold text-sm md:text-lg transition-colors group"
            >
              현장 시공사례 전체보기
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {rssLoading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
              <Loader2 className="w-10 h-10 text-primaryBright animate-spin mb-3" />
              <p className="text-slate-500 text-sm font-bold">시공 완료 현장 소식을 실시간으로 전송받고 있습니다...</p>
            </div>
          ) : rssItems.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-sm font-bold">실시간 시공 기록을 불러오는 데 일시적인 지연이 발생했습니다.</p>
              <div className="mt-4 flex justify-center gap-4 text-xs font-bold">
                <a 
                  href="https://blog.naver.com/kslee0143" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#03C75A]/10 text-[#03C75A] border border-[#03C75A]/20 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#03C75A]/20 transition-all hover:scale-105"
                >
                  현장 일지 1 <ArrowUpRight size={12} />
                </a>
                <a 
                  href="https://blog.naver.com/decline11731" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-100 transition-all hover:scale-105"
                >
                  현장 일지 2 <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rssItems.map((item, index) => {
                const coverImage = getPostCoverImage(item, index);
                const isSecondBlog = item.blogCode === 'decline11731';
                return (
                  <m.a
                    key={item.guid || index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img 
                        src={coverImage} 
                        alt="Work Thumbnail" 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute top-3 left-3 text-white text-[9px] md:text-xs font-black px-2 py-0.5 rounded shadow-sm flex items-center gap-1 ${isSecondBlog ? 'bg-indigo-600' : 'bg-primary'}`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        {item.blogName || '시공 사례'}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow text-left">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-2.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{formatDateString(item.pubDate)}</span>
                      </div>
                      
                      <h4 className="text-base md:text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-primaryBright transition-colors tracking-tight">
                        {item.title}
                      </h4>
                      
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                        {cleanDescription(item.description || item.content || '')}
                      </p>

                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-xs">
                        <span>현장 상세 보기</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </m.a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};

export default Home;