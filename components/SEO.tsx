import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { buildMeta } from '../lib/seoData.mjs';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noindex = false,
}) => {
  const location = useLocation();
  const params = useParams<{ serviceId?: string; regionId?: string }>();
  const { config } = useSite();

  useEffect(() => {
    const pathname = location.pathname;
    const currentUrl = canonicalUrl || window.location.href;

    const meta = buildMeta({
      pathname,
      serviceId: params.serviceId,
      regionId: params.regionId,
      companyInfo: config.companyInfo,
      services: config.services || [],
      currentUrl,
    });

    // Custom prop overrides win over the computed defaults.
    const pageTitle = title || meta.title;
    const pageDescription = description || meta.description;
    const pageKeywords = keywords || meta.keywords;
    const pageImage = ogImage || meta.image;
    const shouldNoindex = noindex || meta.shouldNoindex;

    document.title = pageTitle;

    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMetaTag('name', 'title', pageTitle);
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('name', 'keywords', pageKeywords);
    setMetaTag('name', 'author', '느티울종합청소 (대표 조윤호)');
    setMetaTag('name', 'publisher', '느티울종합청소');
    setMetaTag('name', 'copyright', 'Copyright © 느티울종합청소 (대표 조윤호) All Rights Reserved.');
    setMetaTag('name', 'reply-to', 'danger3662@naver.com');
    setMetaTag('name', 'coverage', '대한민국 서울특별시, 인천광역시, 경기도 전역 (수도권 전 지역)');
    setMetaTag('name', 'distribution', 'Global');
    setMetaTag('name', 'rating', 'General');
    setMetaTag(
      'name',
      'robots',
      shouldNoindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setLinkTag('canonical', currentUrl);

    setMetaTag('name', 'geo.region', 'KR-41;KR-11;KR-28');
    setMetaTag('name', 'geo.placename', '대한민국 수도권 (군포시, 서울특별시, 인천광역시, 경기도 전역)');
    setMetaTag('name', 'geo.position', '37.3323;126.9037');
    setMetaTag('name', 'ICBM', '37.3323, 126.9037');
    setMetaTag('name', 'DC.title', pageTitle);
    setMetaTag('name', 'DC.creator', '느티울종합청소 (대표 조윤호)');
    setMetaTag('name', 'DC.coverage', '서울, 인천, 경기 수도권 전지역');

    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:image', pageImage);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:site_name', '느티울종합청소');
    setMetaTag('property', 'og:locale', 'ko_KR');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', pageImage);

    let scriptTag = document.getElementById('aeo-geo-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'aeo-geo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(meta.jsonLd);
  }, [location.pathname, params.serviceId, params.regionId, config, title, description, keywords, ogImage, canonicalUrl, noindex]);

  return null;
};

export default SEO;
