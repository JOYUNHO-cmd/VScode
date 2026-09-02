import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointerClick } from 'lucide-react';
import { m } from 'motion/react';
import { useSite } from '../../context/SiteContext';

const ServicesPreviewSection: React.FC = () => {
  const { config } = useSite();

  return (
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
                  <img src={service.image} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
  );
};

export default ServicesPreviewSection;
