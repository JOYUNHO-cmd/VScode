import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { getRegion } from '../lib/regionData.mjs';
import { buildRegionServiceContent, REGION_LANDING_SERVICES } from '../lib/regionServiceContent.mjs';
import { breakIntoLines, groupIntoStanzas } from '../lib/mobileLineBreak.mjs';

const RegionServiceLanding: React.FC = () => {
  const { serviceId, regionId } = useParams<{ serviceId: string; regionId: string }>();
  const { config } = useSite();

  const region = regionId ? getRegion(regionId) : null;
  const isEnabled = serviceId ? REGION_LANDING_SERVICES.includes(serviceId) : false;
  const content = region && serviceId ? buildRegionServiceContent(region, serviceId) : null;
  const service = config.services.find((s) => s.id === serviceId);
  const introStanzas = content ? groupIntoStanzas(breakIntoLines(content.intro)) : [];

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

      {/* Situations */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
          {region.name} {content.serviceLabel}가 필요한 상황
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

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
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
