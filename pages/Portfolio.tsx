import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, Calendar, ArrowUpRight, ExternalLink, Loader2, Rss, ChevronRight } from 'lucide-react';
import { m } from 'motion/react';

interface NaverRssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author?: string;
  thumbnail: string;
  description: string;
  content: string;
  categories?: string[];
  blogName?: string;
  blogCode?: string;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1627905646269-7f0321957b42?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=80'
];

export const Portfolio: React.FC = () => {
  const { config } = useSite();
  const [rssItems, setRssItems] = useState<NaverRssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [rssError, setRssError] = useState<string | null>(null);

  // Naver Blog URLs
  const naverBlogUrl1 = "https://blog.naver.com/PostList.naver?blogId=kslee0143&from=postList&categoryNo=98&parentCategoryNo=98";
  const naverBlogUrl2 = "https://blog.naver.com/decline11731";

  // Naver Blog Live feeds
  useEffect(() => {
    const fetchNaverRss = async () => {
      try {
        setRssLoading(true);
        setRssError(null);
        
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
        
        if (combined.length === 0) {
          throw new Error('시공 사례 소식을 실시간으로 불러오는데 실패하였습니다.');
        }
        
        // Sort by publication date desc
        combined.sort((a, b) => {
          const dateA = new Date(a.pubDate).getTime();
          const dateB = new Date(b.pubDate).getTime();
          return dateB - dateA;
        });
        
        setRssItems(combined);
      } catch (err) {
        console.error("Naver RSS fetch error:", err);
        setRssError(err instanceof Error ? err.message : String(err));
      } finally {
        setRssLoading(false);
      }
    };

    fetchNaverRss();
  }, []);

  // Helper inside RSS description to find first image if thumbnail is missing
  const getPostCoverImage = (item: NaverRssItem, index: number) => {
    if (item.thumbnail && item.thumbnail !== "") return item.thumbnail;
    
    // Parse description for image matches
    try {
      const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    } catch (e) {
      // Ignore
    }
    
    return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  };

  // Helper to strip HTML tags for preview description
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
      return unescaped.trim().substring(0, 110) + (unescaped.length > 110 ? '...' : '');
    } catch (e) {
      return '';
    }
  };

  // Helper to format Date standardly
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
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Premium Hero Header Section */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1920" 
            alt="Neutiul Blog Posts" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter saturate-[0.8] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-transparent to-primary/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pb-6 md:pb-10">
          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight drop-shadow-md tracking-tight"
          >
            실시간 <span className="text-primary font-bold">작업 현장 공유</span>
          </m.h1>
          
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-300 text-[14px] sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-4xl mx-auto font-medium leading-relaxed md:leading-loose lg:leading-[1.7] opacity-90 break-keep px-4"
          >
            <span className="block md:inline">실시간으로 공유되는 느티울의</span>{' '}
            <br className="hidden md:block" />
            <span className="block md:inline">생생한 실제 현장 작업 사진과</span>{' '}
            <span className="block md:inline">진행하는 과정들을 만나보세요.</span>
          </m.p>
        </div>

        {/* Smooth bottom transition without black line */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-20"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Construction Channel Callout */}
        <m.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-emerald-900/10 mb-12"
        >
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-center gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
            <div className="max-w-xl md:max-w-2xl">
              <h2 className="text-xl md:text-3xl font-black mb-4 tracking-tight break-keep">
                전체 현장 시공 일지
              </h2>
              <p className="text-emerald-100 text-xs md:text-base font-medium leading-relaxed md:leading-loose break-keep">
                저희의 준공청소, 바닥코팅, 화재청소 등<br />
                전체 시공 일지를 생생하게 기록하였습니다.<br />
                원하는 시공 기록지를 직접 확인해보세요.
              </p>
            </div>
            
            <div className="flex flex-col gap-3.5 w-full md:w-64 shrink-0">
              <m.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={naverBlogUrl1} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 bg-white text-emerald-800 font-extrabold px-5 py-4 rounded-xl hover:bg-emerald-50 transition-all shadow-md text-sm md:text-base group"
              >
                <span>현장 일지 1</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </m.a>
              <m.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={naverBlogUrl2} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 bg-emerald-950/40 text-white border border-white/20 font-extrabold px-5 py-4 rounded-xl hover:bg-emerald-950/60 transition-all shadow-md text-sm md:text-base group"
              >
                <span>현장 일지 2</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </m.a>
            </div>
          </div>
        </m.div>

        {/* 1. Live Blog Feed */}
        {rssLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-slate-500 font-bold tracking-tight">현장 시공 소식을 가져오는 중입니다...</p>
          </div>
        ) : rssError ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 max-w-2xl mx-auto">
            <p className="text-amber-600 font-bold mb-3 text-lg">⚠️ 네트워크 통신에 지연이 있습니다.</p>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              네트워크 상태나 서비스 지연에 의해 일시적으로 불러오지 못한 경우일 수 있습니다.<br />
              아래 링크를 통해 공식 시공 기록지에서 직접 확인해보세요!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href={naverBlogUrl1} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl hover:bg-emerald-800 transition-all text-sm shadow-md"
              >
                현장 일지 1 (kslee0143) <ExternalLink size={14} />
              </a>
              <a 
                href={naverBlogUrl2} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl hover:bg-emerald-800 transition-all text-sm shadow-md"
              >
                현장 일지 2 (decline11731) <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-8">
            {rssItems.map((item, index) => {
              const coverImage = getPostCoverImage(item, index);
              const isSecondBlog = item.blogCode === 'decline11731';
              return (
                <m.a
                  key={item.guid || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Blog Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img 
                      src={coverImage} 
                      alt="Work Thumbnail" 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute top-1.5 left-1.5 md:top-3 md:left-3 text-white text-[7px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-md uppercase tracking-wider flex items-center gap-0.5 md:gap-1 ${isSecondBlog ? 'bg-indigo-600' : 'bg-emerald-500'}`}>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-ping"></span>
                      {item.blogName || '시공 사례'}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-2.5 sm:p-5 md:p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 text-slate-400 text-[8px] sm:text-[10px] md:text-xs font-medium mb-1.5 sm:mb-3">
                      <Calendar className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                      <span>{formatDateString(item.pubDate)}</span>
                    </div>
                    
                    <h3 className="text-[11px] sm:text-base md:text-xl font-bold text-slate-900 mb-1.5 sm:mb-3 leading-tight md:leading-snug group-hover:text-primary transition-colors line-clamp-2 break-all tracking-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm line-clamp-1 sm:line-clamp-3 leading-relaxed mb-2 md:mb-4 flex-grow break-all pr-1 hidden sm:block">
                      {cleanDescription(item.description || item.content || '')}
                    </p>

                    <div className="mt-auto pt-1.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-[9px] sm:text-xs">
                      <span className="group-hover:translate-x-1 transition-all duration-300">상세 현장 일지 보기</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </m.a>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;
