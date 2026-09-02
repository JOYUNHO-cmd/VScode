import React from 'react';
import { ChevronDown, Leaf, Trees } from 'lucide-react';
import { m } from 'motion/react';

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

const FiveStepWorkflowSection: React.FC = () => {
  return (
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
                    loading="lazy"
                    decoding="async"
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
  );
};

export default FiveStepWorkflowSection;
