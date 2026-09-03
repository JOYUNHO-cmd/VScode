import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle2, HelpCircle, Award } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { getRegion, regionCoreTerm, titleMatchesRegion } from '../lib/regionData.mjs';
import { buildRegionServiceContent, REGION_LANDING_SERVICES } from '../lib/regionServiceContent.mjs';
import { breakIntoLines, groupIntoStanzas } from '../lib/mobileLineBreak.mjs';
import { josa } from '../lib/korean.mjs';
import { shuffle } from '../lib/shuffle.mjs';
import ServiceBeforeAfterMarquee, { SERVICE_CATEGORY_MAP } from '../components/ServiceBeforeAfterMarquee';
import ReviewsSection from '../components/ReviewsSection';
import CeoMessageSection from '../components/CeoMessageSection';
import PortfolioSplitCard, { PortfolioGalleryItem } from '../components/PortfolioSplitCard';
import PortfolioLightbox from '../components/PortfolioLightbox';
import ServiceCaseBlogSection from '../components/ServiceCaseBlogSection';
import portfolioManifest from '../lib/portfolioManifest.json';

const allPortfolioItems = portfolioManifest as PortfolioGalleryItem[];

const certifications = [
  { id: 1, title: '청소전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-cleaning-expert.webp' },
  { id: 2, title: '고객상담사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-customer-service.webp' },
  { id: 3, title: '환경관리전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-environment-management.webp' },
  { id: 4, title: '방역관리사 1급', issuer: '한국방역전문인협회', image: '/images/about/cert-pest-control.webp' },
  { id: 5, title: '건물위생관리사 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-building-hygiene.webp' },
  { id: 6, title: '정리수납전문가 1급', issuer: '한국자격검정평가진흥원', image: '/images/about/cert-organizing-expert.webp' },
];

const RegionServiceLanding: React.FC = () => {
  const { serviceId, regionId } = useParams<{ serviceId: string; regionId: string }>();
  const { config } = useSite();
  const [openItem, setOpenItem] = useState<PortfolioGalleryItem | null>(null);

  const region = regionId ? getRegion(regionId) : null;
  const isEnabled = serviceId ? REGION_LANDING_SERVICES.includes(serviceId) : false;
  const content = region && serviceId ? buildRegionServiceContent(region, serviceId) : null;
  const service = config.services.find((s) => s.id === serviceId);
  const introStanzas = content ? groupIntoStanzas(breakIntoLines(content.intro)) : [];

  // Real photos taken in this specific region, for this specific service —
  // proof that isn't just "we work in your area" but "here's your area".
  // Requires at least 2 matches so the section never renders with a single
  // token photo; below that it stays silent and the service-wide marquee
  // above still carries the visual proof.
  //
  // Shuffle order lives in state, seeded from the unshuffled filter and
  // reshuffled only in an effect (see the matching comment in
  // ServiceBeforeAfterMarquee.tsx) — this route is server-rendered by
  // scripts/prerender.mjs and hydrated on the client, so shuffling during
  // render would have the server's Math.random() call and the client's
  // hydration pass disagree on the order and silently mismatch (production
  // React mostly drops hydration-mismatch console warnings, so this
  // wouldn't even be visible as an error, just as wrong photos). Effects
  // never run on the server, so seeding with the deterministic unshuffled
  // list keeps the first render — server and client alike — identical, and
  // the reshuffle that follows is an ordinary post-mount state update.
  const filteredRegionItems = useMemo(() => {
    if (!region || !serviceId) return [];
    const categories = SERVICE_CATEGORY_MAP[serviceId] || [];
    return allPortfolioItems.filter(
      (item) => categories.includes(item.category) && titleMatchesRegion(item.title, regionCoreTerm(region))
    );
  }, [region, serviceId]);
  const [regionItems, setRegionItems] = useState(filteredRegionItems);
  useEffect(() => {
    setRegionItems(shuffle(filteredRegionItems));
  }, [filteredRegionItems]);

  // Unknown region or a service that doesn't have region pages enabled yet —
  // fall back to the regular service page rather than a dead end.
  if (!isEnabled || !region || !content) {
    return <Navigate to={`/services/${serviceId || ''}`} replace />;
  }

  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <div className="w-full flex-grow">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
        <Link to="/services" className="hover:text-primary">서비스</Link>
        <span>/</span>
        <Link to={`/services/${serviceId}`} className="hover:text-primary">{service?.title || content.serviceLabel}</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{region.name}</span>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight text-center sm:text-left">
          {region.name} {content.serviceLabel}
        </h1>
        {/* Mobile: short-line "1문장 1줄" stanza formatting for readability */}
        <div className="sm:hidden text-gray-600 text-base leading-relaxed text-center">
          {introStanzas.map((stanza, si) => (
            <p key={si} className="mb-4 last:mb-0">
              {stanza.map((line, li) => (
                <React.Fragment key={li}>
                  {line}
                  {li < stanza.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
        {/* Desktop: normal flowing paragraph */}
        <p className="hidden sm:block text-gray-600 text-lg leading-relaxed break-keep">
          {content.intro}
        </p>
        <div className="text-center sm:text-left">
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base whitespace-nowrap shadow-lg shadow-primary/30 hover:bg-primaryDark transition-colors"
          >
            전화 상담 {config.companyInfo.phone}
          </a>
        </div>
      </section>

      {/* Service-wide before/after proof (same real photos as the main service page) */}
      <ServiceBeforeAfterMarquee serviceId={serviceId || ''} />

      {/* Region-specific before/after proof, only when we actually have it */}
      {regionItems.length >= 2 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
            {region.name}에서 직접 진행한 시공 사례
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {regionItems.map((item) => (
              <PortfolioSplitCard key={item.id} item={item} onClick={() => setOpenItem(item)} />
            ))}
          </div>
        </section>
      )}

      {openItem && (
        <PortfolioLightbox item={openItem} onClose={() => setOpenItem(null)} />
      )}

      {/* "Want the full job, not just before/after photos?" — real blog
          posts for this service, right after the photos it refers back to
          (its own heading text says "위에 보여드린 사진들") and before the
          page moves on to situations/FAQ. Same component + curated links
          as the /services/:id page (lib/serviceBlogLinks.mjs), just laid
          out at this page's narrower max-w-5xl width. */}
      <ServiceCaseBlogSection serviceId={serviceId || ''} className="max-w-5xl mx-auto px-4 sm:px-6 pb-10" />

      {/* Situations */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
          {region.name} {content.serviceLabel}{josa(content.serviceLabel, '이', '가')} 필요한 상황
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {content.situations.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-4 text-gray-700 text-sm sm:text-base">
              <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
              <span className="break-keep">{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 출동 동 안내 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
          {region.name} 출동 지역 안내
        </h2>
        <p className="text-gray-600 mb-4 break-keep">
          {region.name} 전 지역에서 상담·출동합니다. 동 단위로 문의해 주시면 가까운 인력을 배치합니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {content.dongs.map((dong) => (
            <span key={dong} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primaryDark text-sm font-medium">
              <MapPin size={14} />
              {dong}
            </span>
          ))}
        </div>
      </section>

      {/* 대표 소개 — a named, accountable person, right before his credentials */}
      <CeoMessageSection />

      {/* 공인 자격 보유 — same trust badges as the homepage/service pages */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Award className="text-primary" size={22} />
          말이 아닌 자격증으로 증명합니다
        </h2>
        <p className="text-gray-500 mb-5 break-keep">대표와 전담팀이 취득한 6개 공인 자격증입니다.</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="text-center">
              <img
                src={cert.image}
                alt={`${cert.title} 자격증`}
                className="w-full aspect-square object-cover rounded-lg border border-gray-100 mb-1.5"
                loading="lazy"
              />
              <p className="text-[11px] sm:text-xs font-bold text-slate-700 truncate">{cert.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 실제 고객 후기 */}
      <ReviewsSection />

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">자주 묻는 질문</h2>
        <div className="space-y-4">
          {content.faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2 flex items-start gap-2">
                <HelpCircle className="text-primary shrink-0 mt-0.5" size={18} />
                <span className="break-keep">{faq.q}</span>
              </h3>
              <p className="text-gray-600 text-base pl-6 break-keep">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gray-900 rounded-2xl p-6 sm:p-10 text-center">
          <h2 className="text-white text-sm sm:text-2xl font-bold mb-3 whitespace-nowrap">
            {region.name} {content.serviceLabel} 무료 상담 접수
          </h2>
          <p className="text-gray-300 mb-6 break-keep">
            현장 상황을 알려 주시면 필요한 작업 범위부터 무료로 안내해 드립니다.
          </p>
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg whitespace-nowrap shadow-lg shadow-primary/30 hover:bg-primaryDark transition-colors"
          >
            전화 상담 {config.companyInfo.phone}
          </a>
        </div>
      </section>
    </div>
  );
};

export default RegionServiceLanding;
