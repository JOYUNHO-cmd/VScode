import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, Loader2 } from 'lucide-react';
import { m } from 'motion/react';

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

const LiveWorkFeedSection: React.FC = () => {
  const [rssItems, setRssItems] = useState<NaverRssItem[]>([]);
  const [rssLoading, setRssLoading] = useState(true);

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

  return (
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
  );
};

export default LiveWorkFeedSection;
