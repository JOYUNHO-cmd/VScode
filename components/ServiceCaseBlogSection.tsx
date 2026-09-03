import React from 'react';
import { ChevronDown } from 'lucide-react';
import { m } from 'motion/react';
import { getServiceBlogLinks } from '../lib/serviceBlogLinks.mjs';

interface ServiceCaseBlogSectionProps {
  serviceId: string;
  // Caller supplies layout (max width, padding, background) so this reads
  // as part of each page's own rhythm instead of always looking like it
  // was copy-pasted from the other page — ServiceLanding.tsx is a wide
  // (max-w-7xl) page with a slate-50 section background, while
  // RegionServiceLanding.tsx's sections are all narrower (max-w-5xl) with
  // no background of their own.
  className?: string;
}

// "Want to see the full job, not just the before/after photos?" — a grid
// of real Naver blog posts written by the crew, one curated set per
// service (see lib/serviceBlogLinks.mjs). Shared by the service page and
// every region+service landing page so both point at the same proof.
const ServiceCaseBlogSection: React.FC<ServiceCaseBlogSectionProps> = ({ serviceId, className }) => {
  const activeBlogs = getServiceBlogLinks(serviceId);
  if (!activeBlogs || activeBlogs.length === 0) return null;

  return (
    <section className={className}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 border-2 border-[#03C75A]/25 text-center relative overflow-hidden shadow-[0_8px_30px_rgba(3,199,90,0.04)]">
        {/* Vibrant top brand green bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#03C75A]" />
        <h3 className="text-[17px] sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight break-keep mb-3">
          위에 보여드린 사진들은 실제 작업한 현장의 일부 사진입니다.
        </h3>
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary font-extrabold text-[17.5px] leading-[19px] sm:text-base md:text-[26.25px] tracking-tight">
            전체 작업 과정들이 궁금하시다면??
          </p>
          <div className="flex flex-col items-center mt-2">
            <m.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="flex flex-col items-center -space-y-3.5 text-primary"
            >
              <ChevronDown className="w-8 h-8 sm:w-11 sm:h-11 stroke-[3.5]" />
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 stroke-[3.5]" />
            </m.div>
          </div>
        </div>
      </div>

      <div className={`grid gap-3 sm:gap-6 lg:gap-8 ${
        activeBlogs.length === 1
          ? "grid-cols-1 max-w-md mx-auto"
          : activeBlogs.length === 2
          ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
          : "grid-cols-2 md:grid-cols-3"
      }`}>
        {activeBlogs.map((blog, idx) => (
          <a
            key={idx}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#03C75A] hover:scale-[1.01] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(3,199,90,0.1)] transition-all duration-300 flex flex-col h-full"
          >
            {/* Thumbnail Image */}
            <div className="relative aspect-[4/3] overflow-hidden w-full bg-slate-100 border-b border-slate-100">
              <img
                src={blog.image}
                alt={blog.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80';
                }}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#03C75A] text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded shadow-md z-10 flex items-center gap-1">
                <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                블로그 현장기
              </span>
            </div>

            {/* Body - Only simple title */}
            <div className="p-3.5 sm:p-5">
              <h5 className="text-[13px] sm:text-[16px] font-extrabold text-slate-900 group-hover:text-[#03C75A] transition-colors duration-200 line-clamp-2 leading-snug break-keep">
                {blog.title}
              </h5>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ServiceCaseBlogSection;
