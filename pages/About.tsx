import React from 'react';
import { useSite } from '../context/SiteContext';
import { Target, Users, Award, Quote, Sparkles, CheckCircle, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const { config } = useSite();

  const certifications = [
    { 
      id: 1, 
      title: "청소전문가 1급", 
      issuer: "한국자격검정평가진흥원",
      image: "https://i.ibb.co/XrGQYWFf/image.jpg" 
    },
    { 
      id: 2, 
      title: "고객상담사 1급", 
      issuer: "한국자격검정평가진흥원",
      image: "https://i.ibb.co/WvRmhZPC/image.jpg" 
    },
    { 
      id: 3, 
      title: "환경관리전문가 1급", 
      issuer: "한국자격검정평가진흥원",
      image: "https://i.ibb.co/vWTbyPt/image.jpg" 
    },
    { 
      id: 4, 
      title: "방역관리사 1급", 
      issuer: "한국방역전문인협회",
      image: "https://i.ibb.co/Z6QX6mhd/image.jpg" 
    },
    { 
      id: 5, 
      title: "건물위생관리사 1급", 
      issuer: "한국자격검정평가진흥원",
      image: "https://i.ibb.co/99V7ZFXT/image.jpg" 
    },
    { 
      id: 6, 
      title: "정리수납전문가 1급", 
      issuer: "한국자격검정평가진흥원",
      image: "https://i.ibb.co/W4cJMhmc/image.jpg" 
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#334155]">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-transparent to-slate-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.3] drop-shadow-2xl break-keep px-4 flex flex-col items-center"
          >
            <span className="block mb-2 md:mb-3 font-bold tracking-tight text-[15px] sm:text-lg md:text-4xl opacity-90">
              <span className="hidden md:inline">
                느티울은 고객의 <span className="text-primary">신뢰</span>를 최우선으로 생각하는
              </span>
              <span className="block md:hidden text-center leading-normal">
                <span className="block whitespace-nowrap text-[18px]">느티울은 고객의 <span className="text-[#22ba8b] font-extrabold">신뢰</span>를</span>
                <span className="block whitespace-nowrap mt-1 text-[18px]">최우선으로 생각하는</span>
              </span>
            </span>
            <span className="bg-white/15 px-4 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-md mt-3 md:mt-4 inline-block text-[1.35rem] sm:text-2xl md:text-7xl font-black tracking-normal md:tracking-wider shadow-2xl whitespace-nowrap">
               청소 전문 기업입니다
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-6 xl:gap-8 mt-10 md:mt-16 lg:mt-24 max-w-7xl mx-auto px-4 w-full"
          >
             <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-4 xl:gap-5 text-white font-extrabold text-[16px] sm:text-xl md:text-2xl lg:bg-white/10 lg:backdrop-blur-md lg:border lg:border-white/20 lg:px-7 lg:py-4 xl:px-8 xl:py-5 lg:rounded-2xl lg:shadow-xl transition-all duration-300 w-auto cursor-default">
                <CheckCircle className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 shrink-0" />
                <p className="text-[17px] sm:text-inherit lg:text-[27px] font-black leading-none whitespace-nowrap">100% 대표 직접 관리</p>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-4 xl:gap-5 text-white font-extrabold text-[16px] sm:text-xl md:text-2xl lg:bg-white/10 lg:backdrop-blur-md lg:border lg:border-white/20 lg:px-7 lg:py-4 xl:px-8 xl:py-5 lg:rounded-2xl lg:shadow-xl transition-all duration-300 w-auto cursor-default">
                <CheckCircle className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 shrink-0" />
                <p className="text-[17px] sm:text-inherit lg:text-[27px] font-black leading-none whitespace-nowrap">검수 후 후불제</p>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-4 xl:gap-5 text-white font-extrabold text-[16px] sm:text-xl md:text-2xl lg:bg-white/10 lg:backdrop-blur-md lg:border lg:border-white/20 lg:px-7 lg:py-4 xl:px-8 xl:py-5 lg:rounded-2xl lg:shadow-xl transition-all duration-300 w-auto cursor-default">
                <CheckCircle className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 shrink-0" />
                <p className="text-[17px] sm:text-inherit lg:text-[27px] font-black leading-none whitespace-nowrap">체계적인 전문 장비</p>
             </motion.div>
          </motion.div>

        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Brand Name Meaning & Promise Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center pointer-events-none -z-10"></div>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Premium Visual breakdown */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            >
              <h2 className="text-[16px] xs:text-[18px] sm:text-2xl md:text-3xl lg:text-[32px] font-black text-slate-900 leading-tight mb-6 whitespace-nowrap text-center lg:text-left">
                '느티울' 이라는 이름에 담긴 <span className="text-[#22ba8b] font-black border-b-4 border-[#22ba8b]/20">소중한 약속</span>
              </h2>
              
              <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed mb-8 break-keep text-center lg:text-left">
                <span className="block md:whitespace-nowrap font-bold" style={{ fontWeight: 'bold' }}>
                  저희의 사명 '느티울'에는 고객 한분 한분의 <br className="block md:hidden" />소중한 생활 터전을 지키고,
                </span>
                <span className="block md:whitespace-nowrap font-bold mt-4 md:mt-0" style={{ fontWeight: 'bold' }}>
                  쾌적하고 맑은 공간을 제공하겠다는 <br className="block md:hidden" />든든한 다짐이 담겨 있습니다.
                </span>
              </p>

              {/* Syllable Breakdown Cards */}
              <div className="space-y-4 w-full text-left">
                {/* Neuti Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-slate-100/70 hover:shadow-md cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md flex items-center justify-center bg-white border border-slate-100">
                    <img 
                      src="https://i.ibb.co/Kjb910QF/image.png" 
                      alt="느티" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mb-1">
                      <span className="text-lg font-bold text-slate-955"><strong className="font-black text-[#22ba8b]" style={{ fontSize: '30px', fontFamily: '"Noto Sans KR", sans-serif', lineHeight: '32px' }}>느티</strong>나무(Zelkova)</span>
                      <span className="text-xs text-[#22ba8b] font-bold">든든한 그늘과 쉼</span>
                    </div>
                    <p className="text-slate-600 text-[11.5px] xs:text-xs sm:text-sm leading-relaxed font-bold break-keep" style={{ fontWeight: 'bold' }}>
                      <span className="block sm:inline">마을 한가운데에서 오랜 세월 변함없이</span>
                      <span className="hidden sm:inline"> </span>
                      <br className="hidden xs:block sm:hidden" />
                      <span className="block sm:inline">시원한 그늘과 신뢰 가득한 안식을 전해주는</span>
                      <span className="hidden sm:inline"> </span>
                      <br className="hidden xs:block sm:hidden" />
                      <span className="block sm:inline">아름다운 느티나무를 의미합니다</span>
                    </p>
                  </div>
                </motion.div>

                {/* Ul Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-slate-100/70 hover:shadow-md cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md flex items-center justify-center bg-white border border-slate-100">
                    <img 
                      src="https://i.ibb.co/bgL3rtzj/image.png" 
                      alt="울" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mb-1">
                      <span className="text-lg font-bold text-slate-955"><strong className="font-black text-[#22ba8b]" style={{ fontSize: '32px', fontFamily: '"Noto Sans KR", sans-serif', lineHeight: '32px' }}>울</strong>타리(Fence)</span>
                      <span className="text-xs text-primaryDark font-bold">따뜻하게 품는 울타리</span>
                    </div>
                    <p className="text-slate-600 text-[11px] xs:text-xs sm:text-sm leading-relaxed font-bold break-keep" style={{ fontWeight: 'bold' }}>
                      {/* Mobile version (three lines) */}
                      <span className="block sm:hidden">이웃들의 소중한 공간을 포근하고 든든하게</span>
                      <span className="block sm:hidden">에워싸고 안전하게 보호해 주는 건강한</span>
                      <span className="block sm:hidden">보금자리를 의미합니다.</span>

                      {/* PC version (two lines) */}
                      <span className="hidden sm:block">
                        이웃들의 소중한 공간을 포근하고 든든하게 에워싸고
                        <br />
                        안전하게 보호해 주는 건강한 보금자리를 의미합니다.
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Narrative content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col justify-center px-1 sm:px-4 py-6"
            >
              <div className="mb-8">
                <p className="text-[#22ba8b] font-black text-[18px] sm:text-[22px] md:text-[24px] leading-snug tracking-wide break-keep">
                  "언제나 한자리에 서서 이웃을 품다"
                </p>
              </div>
              
              <div className="space-y-6 text-slate-700 text-[13px] xs:text-[14px] sm:text-[16px] leading-relaxed font-medium break-keep">
                <p className="font-['Verdana'] font-bold text-slate-700">
                  예로부터 느티나무는 <br className="block sm:hidden" />
                  마을 한가운데에서 사람들에게 시원한 그늘을 제공하고, <br />
                  쉼과 만남의 공간이 되어 주는 나무였습니다.
                </p>
                
                <p className="font-['Verdana'] font-bold text-slate-700">
                  오랜 세월 한자리를 지키며 사람들의 이야기를 <br className="block sm:hidden" />
                  품어 온 신뢰와 든든함의 상징이기도 합니다.
                </p>
                
                <p className="font-['Verdana'] font-bold text-slate-700">
                  또한 '울'은 울타리, 마을을 뜻하는 정겨운 우리말로, <br className="block" />
                  사람과 소중한 공간을 따뜻하게 품고 평화롭게 보호하는 의미를 담고 있습니다.
                </p>
                
                <p className="text-slate-700 font-bold font-['Verdana'] break-keep">
                  느티울은 고객의 공간을 느티나무처럼 든든하게 지키고, <br className="block" />
                  "언제나 믿고 맡길 수 있는"<br className="block sm:hidden" />
                  공간환경 전문 기업이 되겠다는 진심을 담았습니다.
                </p>

                <p className="text-[#20bf96] font-extrabold text-[15px] sm:text-[17px] font-['Verdana']">
                  언제나 고객에게 편안한 그늘이 되고,<br />
                  믿음직한 울타리가 되는 동반자로 함께하겠습니다.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* CEO Message Section */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-32 relative"
        >
          <div className="bg-white rounded-[2rem] p-8 md:p-20 shadow-2xl border border-slate-100 relative overflow-hidden">
            <Quote className="absolute top-10 left-10 text-primary/5 transform -scale-x-100" size={160} />
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
               <div className="w-full md:w-3/5 order-2 md:order-1">
                   <div className="mb-10">
                      <p className="text-primaryDark font-bold tracking-widest uppercase text-sm mb-3">CEO Message</p>
                      <h2 className="text-[20px] sm:text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.5] md:leading-tight mb-6 break-keep tracking-tight">
                        "고객님의 만족이<br/>
                        <span className="text-primary">저의 행복이자 보람</span>입니다."
                      </h2>
                   </div>

                   {/* CEO Body Text: Strictly following requested line-by-line structure */}
                   <div className="space-y-7 text-slate-600 text-[14.5px] sm:text-lg md:text-lg leading-[1.7] md:leading-loose font-medium break-keep">
                       <p>
                        안녕하세요.<br />
                        느티울 대표 조윤호입니다.<br />
                      </p>
                      <p>
                        저에게 청소란,<br />
                        힘든 시기에 찾아온 선물같은 일이였습니다.
                      </p>
                      <p>
                        시작은 생계를 위한 수단으로 시작했지만,<br />
                      </p>
                      <p> 
                        매일 현장에서 땀 흘리며 깨끗해진 공간을<br />
                        마주할 때마다 이 일이 가진 매력에<br />
                        깊이 빠져들었습니다.
                      </p>
                      <p>
                        하루하루 현장에서 일할 수 있음에<br />
                        항상 감사함을 느낍니다.
                      </p>
                      <p>
                        예전에는 단지 돈을 벌기 위해 달렸다면,<br />
                      </p>
                      <p>
                        지금은 저희의 손길이 닿은 공간을 보며<br />
                        좋아하시는 고객님의 모습을 보는것에서<br />
                        가장 큰 행복을 느낍니다.
                      </p>
                      <p>
                        느티울은<br />
                        고객님과의 만남을 일회성으로 끝나는<br />
                        가벼운 관계로 생각하지 않습니다.
                      </p>
                      <p>
                        진심을 담은 서비스로 신뢰를 쌓고,<br />
                        좋은 인연으로 오랫동안 함께하는<br />
                        사이가 되고 싶습니다.
                      </p>
                      <p>
                        항상 초심을 잃지 않고 양심있게<br />
                        정성을 다하겠습니다.
                      </p>
                      <p className="pt-2">
                        긴 글 읽어주셔서 감사합니다.
                      </p>
                   </div>
                    
                    <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <h3 className="text-2xl font-extrabold text-slate-900">대표 조윤호</h3>
                           <span 
                              className="text-[36px] md:text-[44px] text-slate-700 select-none transform -rotate-3 inline-block tracking-widest pl-2 font-bold" 
                              style={{ fontFamily: "'Nanum Brush Script', cursive" }}
                            >
                              조윤호
                            </span>
                        </div>
                        <div className="text-slate-300 font-serif italic text-4xl select-none hidden sm:block"></div>
                    </div>
                </div>

                <div className="w-full md:w-2/5 order-1 md:order-2 flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.03, rotate: 0 }}
                      className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-[12px] border-slate-50 bg-slate-200 transform md:rotate-3 transition-transform duration-500"
                    >
                       <img 
                         src="https://i.ibb.co/Lq3Zh09/Chat-GPT-Image-2026-7-18-11-27-38.png" alt="CEO 조윤호" className="w-full h-full object-cover" 
                        />
                        {/* 대표 표기 배지 및 오버레이 (모바일/PC 최적화) */}
                        <div className="absolute top-4 left-4 hidden z-10 bg-slate-900/90 text-primary font-bold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                          <span>대표</span>
                        </div>
                    </motion.div>
                </div>
             </div>
           </div>
         </motion.div>

        {/* Values - Updated for 4 columns, optimized for mobile and PC */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-10 mb-32 px-1 md:px-0">
          {[
            {
              icon: Target,
              title: "Professional",
              descDesktop: "체계적인 매뉴얼과 전문 장비로\n어떤 오염도 완벽하게 해결합니다.",
              descMobile: "체계적 매뉴얼\n전문 장비 사용"
            },
            {
              icon: Users,
              title: "Trust",
              descDesktop: "상담부터 현장까지\n대표가 직접 관리하여\n고객과의 약속을 반드시 지킵니다.",
              descMobile: "대표 직접 관리\n약속 이행 철저"
            },
            {
              icon: Award,
              title: "Satisfaction",
              descDesktop: "시공 후 고객 검수를 원칙으로 하며\n완벽한 만족을 위해 노력합니다.",
              descMobile: "현장 검수 원칙\n고객 만족 보장"
            },
            {
              icon: Leaf,
              title: "Eco-friendly",
              descDesktop: "인체에 무해한 친환경 세제와\n안전한 소독제만 사용하여\n고객님의 건강과 공간을 보호합니다.",
              descMobile: "친환경 세제 사용\n안심 공간 케어"
            }
          ].map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-3.5 sm:p-6 md:p-12 rounded-xl md:rounded-[2rem] border border-slate-200 shadow-lg md:shadow-xl shadow-slate-200/50 text-center hover:border-primary/50 transition-all duration-300 group relative overflow-hidden flex flex-col items-center cursor-default"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-10 h-10 md:w-24 md:h-24 mx-auto bg-primary/10 rounded-xl md:rounded-3xl flex items-center justify-center text-primary mb-3 md:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <val.icon className="w-5 h-5 md:w-12 md:h-12" strokeWidth={2} />
              </div>
              <h3 className="text-xs sm:text-lg md:text-2xl font-extrabold mb-1 md:mb-5 text-slate-900 break-keep group-hover:text-primary transition-colors">{val.title}</h3>
              <p className="text-slate-500 text-[10px] sm:text-base md:text-lg font-medium leading-normal md:leading-relaxed break-keep hidden xs:block whitespace-pre-line">
                {val.descDesktop}
              </p>
              <p className="text-slate-500 text-[13px] md:text-[25px] font-bold leading-tight break-keep xs:hidden whitespace-pre-line">
                {val.descMobile}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section - Updated for 3 columns on mobile */}
        <div className="border-t border-slate-200 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">전문 자격증 보유 현황</h2>
            <p className="text-slate-500 text-[15px] sm:text-xl max-w-3xl mx-auto leading-relaxed break-keep font-medium">
              느티울은 검증된 전문 자격을 갖춘 대표가 직접 시공합니다.<br />
              전문성과 기술력을 바탕으로 신뢰할 수 있는 서비스를 제공합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-1 md:px-0">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative cursor-default"
              >
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
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default About;
