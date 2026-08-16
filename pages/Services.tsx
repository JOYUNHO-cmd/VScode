import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { 
  Sparkles, Building, Store, Layers, Utensils, 
  Droplets, Flame, Waves, Building2, Paintbrush, 
  Home, Briefcase, Eraser, Factory, Biohazard, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={20} />,
  Building: <Building size={20} />,
  Store: <Store size={20} />,
  Layers: <Layers size={20} />,
  Utensils: <Utensils size={20} />,
  Droplets: <Droplets size={20} />,
  Flame: <Flame size={20} />,
  Waves: <Waves size={20} />,
  Building2: <Building2 size={20} />,
  Paintbrush: <Paintbrush size={20} />,
  Home: <Home size={20} />,
  Briefcase: <Briefcase size={20} />,
  Eraser: <Eraser size={20} />,
  Factory: <Factory size={20} />,
  Biohazard: <Biohazard size={20} />,
};

const Services: React.FC = () => {
  const { config } = useSite();
  const location = useLocation();
  const [activeServiceId, setActiveServiceId] = useState(config.services[0].id);
  const detailViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && config.services.some(s => s.id === id)) {
      setActiveServiceId(id);
    }
  }, [location, config.services]);
  
  const activeService = config.services.find(s => s.id === activeServiceId) || config.services[0];

  const handleServiceSelect = (id: string) => {
    setActiveServiceId(id);
    if (window.innerWidth < 768 && detailViewRef.current) {
      detailViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderDetailItem = (detail: string, index: number) => {
    const parts = detail.split(':');
    const title = parts.length > 1 ? parts[0] + ' :' : '';
    const desc = parts.length > 1 ? parts.slice(1).join(':') : detail;

    return (
      <div key={index} className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-primary/30 transition-colors">
        <div className="flex-shrink-0 mt-1 text-primary">
          <CheckCircle2 size={18} />
        </div>
        <div className="flex flex-col">
          {title && <span className="text-slate-900 font-bold text-[15px] md:text-lg mb-1 break-keep">{title}</span>}
          <span className="text-slate-500 text-[13px] md:text-base leading-relaxed font-medium break-keep">{desc}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100 text-slate-800 flex flex-col md:h-[calc(100vh-6rem)] p-2 md:p-6 gap-6 md:overflow-hidden">
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full max-w-[1800px] mx-auto w-full">

        {/* Sidebar (Service List) */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-2xl md:rounded-3xl border border-slate-200 flex flex-col shadow-xl shadow-slate-200/50 overflow-hidden md:h-full">
          <div className="p-4 md:p-6 border-b border-slate-100 bg-white z-10">
            <h1 className="text-lg md:text-xl font-extrabold text-slate-900 mb-1">서비스 목록</h1>
            <p className="text-slate-400 text-xs font-medium">서비스를 선택해 보세요</p>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-1.5 md:space-y-2">
            {config.services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className={`w-full flex items-center gap-3 px-3 py-3 md:px-4 md:py-3.5 rounded-xl md:rounded-2xl transition-all duration-300 text-left border ${
                    activeServiceId === service.id
                      ? 'bg-primary text-white border-primary font-bold shadow-lg shadow-primary/20'
                      : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 transition-colors ${activeServiceId === service.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {iconMap[service.icon]}
                  </div>
                  <span className="text-xs md:text-[15px]">{service.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div 
          ref={detailViewRef}
          className="w-full md:w-3/4 lg:w-4/5 bg-white rounded-2xl md:rounded-3xl border border-slate-200 flex flex-col shadow-xl shadow-slate-200/50 overflow-hidden relative md:h-full scroll-mt-20"
        >
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              <motion.div 
                key={activeServiceId} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pb-20"
              >
                
                {/* Hero Section */}
                <div className="relative h-48 md:h-[400px] w-full overflow-hidden">
                   <img 
                     src={activeService.image} 
                     alt={activeService.title} 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                   <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 text-center">
                      <h2 className="text-2xl md:text-6xl font-black text-slate-900 leading-tight break-keep">
                        {activeService.title}
                      </h2>
                   </div>
                </div>

                <div className="px-4 md:px-12 py-8 md:py-10">
                   {/* Description Box - Centered Content */}
                   <div className="bg-slate-50 rounded-xl md:rounded-2xl p-5 md:p-8 mb-8 border border-slate-100 flex flex-col items-center">
                      <p className="text-slate-600 text-[13px] md:text-xl leading-relaxed whitespace-pre-line break-keep font-medium text-center max-w-4xl">
                        {activeService.description}
                      </p>
                   </div>

                   {/* Second Section: CEO Photo & Message */}
                   <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 md:mb-12 border-2 border-emerald-200/80 shadow-xl shadow-emerald-900/10 relative overflow-hidden">
                      {/* Decorative soft glow circles */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-200/30 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto relative z-10">
                         {/* Message Content (Left) */}
                         <div className="w-full md:w-1/2 text-left order-2 md:order-1">
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

                         {/* CEO Image (Right, Larger Size with Gradient Border) */}
                         <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-end order-1 md:order-2">
                            <div className="relative w-full max-w-md md:max-w-xl p-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-200 rounded-2xl md:rounded-3xl shadow-2xl">
                               <div className="relative rounded-[14px] md:rounded-[22px] overflow-hidden border-4 md:border-6 border-white bg-slate-100">
                                  <img 
                                    src="https://i.ibb.co/60w35yYJ/111.png" 
                                    alt="느티울 대표 조윤호" 
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                  />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Work Scope Grid */}
                   <div className="space-y-6 md:space-y-8">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                         <div className="w-1 h-6 bg-primary rounded-full hidden md:block"></div>
                         <h3 className="text-lg md:text-3xl font-extrabold text-slate-900">주요 작업 범위</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {activeService.details && activeService.details.length > 0 ? (
                          activeService.details.map((detail, index) => renderDetailItem(detail, index))
                        ) : (
                          <p className="text-slate-400 text-center">상세 작업 내용이 곧 업데이트 될 예정입니다.</p>
                        )}
                      </div>
                   </div>

                   {/* CTA Box */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5 }}
                     className="mt-12 md:mt-16 bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden group"
                   >
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                      <div className="relative z-10 space-y-4 md:space-y-6">
                         <h4 className="text-xl md:text-4xl font-black text-white leading-tight">
                           지금 바로 전문가와 <br className="sm:hidden" />
                           상담해 보세요
                         </h4>
                         <p className="text-slate-400 text-xs md:text-lg font-medium break-keep">
                           현장 방문을 통한 <span className="text-primary font-bold">100% 무료 견적</span>으로 합리적인 비용을 제안해 드립니다.
                         </p>
                         <div className="pt-2 md:pt-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-block"
                            >
                              <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-white text-sm md:text-xl font-bold rounded-xl hover:bg-primaryDark transition-all shadow-xl shadow-primary/20"
                              >
                                무료 견적 신청하기 <Sparkles size={20} />
                              </Link>
                            </motion.div>
                         </div>
                      </div>
                   </motion.div>
                </div>

              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Services;