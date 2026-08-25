import React from 'react';
import { Star } from 'lucide-react';
import { m } from 'motion/react';
import ReviewMarquee from './ReviewMarquee';

// Self-contained customer-reviews section — originally lived inline in
// Home.tsx; extracted so ServiceLanding pages can render the same real
// review screenshots without duplicating the markup.
const ReviewsSection: React.FC = () => {
  return (
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
  );
};

export default ReviewsSection;
