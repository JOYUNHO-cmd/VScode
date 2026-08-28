// lib/regionData.mjs
//
// Local knowledge base for the 17 core service regions. Each entry supplies
// the facts that make a region+service landing page genuinely different
// from another — not just the region name swapped into a template. This is
// what separates a legitimate local-SEO page from a thin "doorway" page.
//
// id: URL slug used in /services/:serviceId/:regionId
// name: display name used in headings/meta
// group: '서울' | '인천' | '경기' — for breadcrumb/JSON-LD grouping
// dongs: 법정동/주요 지구 목록 — used for the "출동 동 안내" section
// landmark: a short place-name phrase, reused verbatim across every FAQ
//   answer and the meta description — keep this one short, not narrative
// story: the area's development history or industrial character, written so
//   it always resolves into a concrete cleaning-relevant consequence (older
//   buildings, dense renovation cycles, industrial-grade dirt, brand-new
//   construction) — never trivia for its own sake. This is what the intro
//   paragraph is actually built from.

export const REGIONS = [
  { id: 'gangnam', name: '강남구', group: '서울',
    dongs: ['역삼동', '삼성동', '논현동', '대치동', '청담동', '신사동'],
    landmark: '테헤란로를 중심으로 한 IT·금융 기업 본사 밀집지구',
    story: '1970~80년대 영동 개발로 조성된 이후 벤처 붐을 거치며 사옥 이전과 리모델링이 유독 잦은 동네로 자리잡아, 입주·퇴거 전후의 신속한 정비 수요가 끊이지 않습니다.' },
  { id: 'yeouido', name: '여의도', group: '서울',
    dongs: ['여의도동'],
    landmark: '국회의사당과 증권가가 자리한 금융·정치 중심지',
    story: '1970년대 한강 개발과 함께 조성된 계획도시로, 국내 최초의 초고층 빌딩들이 지금도 그대로 운영 중이라 준공 수십 년 차 건물 특유의 정밀한 유지관리가 필요한 지역입니다.' },
  { id: 'guro-digital', name: '구로디지털단지', group: '서울',
    dongs: ['구로동', '가리봉동'],
    landmark: '구로디지털단지(G밸리) IT·소프트웨어 벤처타운',
    story: '1960~70년대 한국 최초의 국가산업단지였던 옛 구로공단이 2000년대 이후 지식산업센터로 탈바꿈한 곳으로, 좁고 밀집한 사무공간이 많아 정기적인 관리가 특히 중요한 지역입니다.' },
  { id: 'gasan-digital', name: '가산디지털단지', group: '서울',
    dongs: ['가산동', '독산동'],
    landmark: '가산디지털단지 지식산업센터 밀집지구',
    story: '구로공단의 확장판으로 조성돼 제조업 공장 부지가 지식산업센터로 바뀐 지역이라, 온라인 쇼핑몰·물류 스타트업 사옥이 빽빽이 들어차 회전율 높은 입주·이전 청소 수요가 많습니다.' },
  { id: 'seongsu', name: '성수동', group: '서울',
    dongs: ['성수동1가', '성수동2가'],
    landmark: '준공업지역에서 IT벤처·디자인 스튜디오 밀집지로 재탄생한 지역',
    story: '1960~70년대 수제화·인쇄 공장들이 모여 있던 준공업지역이 최근 카페와 디자인 스튜디오로 빠르게 리모델링되며, 노후 건물을 새 용도로 바꾸는 공사 후 청소 수요가 특히 많은 지역입니다.' },
  { id: 'songdo', name: '송도국제도시', group: '인천',
    dongs: ['송도동'],
    landmark: '송도국제업무단지(IBD)와 인천글로벌캠퍼스',
    story: '2003년 경제자유구역으로 지정되며 갯벌을 매립해 조성한 계획도시로, 지금도 신축 오피스·주거단지가 꾸준히 들어서 준공 직후 첫 입주 청소 수요가 이어지는 지역입니다.' },
  { id: 'cheongna', name: '청라국제도시', group: '인천',
    dongs: ['청라동'],
    landmark: '청라국제업무단지 신축 오피스·상업시설',
    story: '송도와 함께 인천경제자유구역으로 지정된 매립 신도시로, 최근 대형 상업시설과 업무타운이 잇따라 개장하며 신축 시설의 준공·개점 청소 수요가 빠르게 늘고 있습니다.' },
  { id: 'namdong', name: '남동공단', group: '인천',
    dongs: ['남촌동', '논현동', '고잔동'],
    landmark: '남동인더스파크(남동국가산업단지)',
    story: '1980년대 조성된 수도권 서남부 최대 규모의 국가산업단지로, 다양한 제조 설비가 밀집해 기계 분진과 기름때 등 산업 현장 특유의 오염 관리가 중요한 지역입니다.' },
  { id: 'gunpo', name: '군포시', group: '경기',
    dongs: ['산본동', '당동', '금정동', '부곡동'],
    landmark: '군포첨단산업단지와 산본 신도시',
    story: '반월·시화산업단지와 맞닿은 위성도시로, 1기 신도시인 산본과 군포첨단산업단지가 함께 있어 신도시 아파트와 산업단지 사업장의 청소 수요가 두루 발생합니다.' },
  { id: 'sanbon', name: '산본', group: '경기',
    dongs: ['산본동', '금정동'],
    landmark: '산본 신도시 상업지구',
    story: '1989년부터 조성된 1기 신도시로, 입주한 지 30년이 넘은 아파트 단지가 많아 노후 배관·마감재 특유의 하자를 감안한 입주·리모델링 청소 수요가 꾸준합니다.' },
  { id: 'anyang', name: '안양시', group: '경기',
    dongs: ['평촌동', '관양동', '비산동', '안양동'],
    landmark: '안양 IT밸리와 평촌 스마트스퀘어',
    story: '근대에는 방직·제사 공장이 모여 있던 산업도시였다가 평촌 1기 신도시 개발로 주거·업무 기능이 더해진 곳으로, 옛 시가지와 신도시 오피스가 공존해 관리 수요의 폭이 넓습니다.' },
  { id: 'pyeongchon', name: '평촌', group: '경기',
    dongs: ['평촌동', '비산동', '호계동'],
    landmark: '평촌 스마트스퀘어와 범계역 상권',
    story: '1990년대 초 조성된 안양의 1기 신도시로, 범계역 학원가와 오피스 상권이 밀집해 있어 야간·주말에도 지장 없이 진행하는 정기 청소 수요가 많은 지역입니다.' },
  { id: 'suwon', name: '수원시', group: '경기',
    dongs: ['영통동', '매탄동', '인계동', '광교동'],
    landmark: '광교테크노밸리와 삼성디지털시티',
    story: '조선시대 축성된 수원화성이 남아 있는 역사도시이자 삼성디지털시티와 광교테크노밸리가 자리한 첨단산업도시로, 구도심 상권과 신도심 사옥의 관리 수요가 함께 발생합니다.' },
  { id: 'uiwang', name: '의왕시', group: '경기',
    dongs: ['포일동', '오전동', '내손동'],
    landmark: '인덕원 IT밸리와 의왕 ICD(내륙컨테이너기지)',
    story: '인덕원역 인근 IT밸리와 수도권 내륙컨테이너기지(의왕ICD)를 함께 갖춘 물류·업무 거점으로, 사무공간과 물류창고를 오가며 진행하는 관리 수요가 특징적인 지역입니다.' },
  { id: 'pangyo', name: '판교', group: '경기',
    dongs: ['삼평동', '백현동', '판교동'],
    landmark: '판교테크노밸리',
    story: '2000년대 조성된 \'한국의 실리콘밸리\'로, 국내 대표 IT·게임 기업 본사가 밀집해 신축 사옥이 많은 만큼 잦은 인테리어 변경과 그에 따른 정밀 청소 수요가 이어집니다.' },
  { id: 'ansan', name: '안산시', group: '경기',
    dongs: ['원곡동', '고잔동', '성포동', '초지동'],
    landmark: '반월·시화국가산업단지',
    story: '1970~80년대 조성된 반월·시화국가산업단지를 낀 수도권 서남부 대표 산업도시로, 다양한 제조업체와 기숙사가 밀집해 공장 설비와 생활공간을 함께 관리하는 수요가 많습니다.' },
  { id: 'banwol', name: '반월공단', group: '경기',
    dongs: ['원시동', '목내동', '팔곡동'],
    landmark: '반월국가산업단지',
    story: '안산시에 자리한 대규모 국가산업단지로, 자동차부품·금속가공 등 중소 제조업체가 밀집해 있어 기름때와 분진이 누적되기 쉬운 만큼 정기적인 설비·바닥 관리가 특히 중요합니다.' },
];

export function getRegion(id) {
  if (!id) return null;
  const lower = id.toLowerCase();
  return REGIONS.find((r) => r.id === lower) || null;
}

// The region's colloquial short name, with the admin-unit suffix stripped
// (수원시 -> 수원, 송도국제도시 -> 송도) so it matches how the place is
// actually written in portfolio photo titles. Deliberately region-name-only,
// not dong-name-based: dong names collide across unrelated regions (e.g.
// 논현동 exists in both 강남구 and 남동공단; 당동 shortened to "당" matched
// "강당"/"식당"/"분당" anywhere in a title) and would misattribute another
// area's photos as this region's proof.
export function regionCoreTerm(region) {
  return region.name.replace(/(국제도시|디지털단지|첨단산업단지|공단|시|구)$/, '');
}

// Word-boundary match (token *starts with* the term, not "contains it
// anywhere") — plain substring matching lets short terms like "남동" match
// inside unrelated words such as "한남동".
export function titleMatchesRegion(title, term) {
  return title.split(/\s+/).some((token) => token.startsWith(term));
}

// Find which of the 17 core regions (if any) a free-text title is about —
// used both to surface region-specific proof photos on a region landing
// page, and to bake the region into a photo's filename at import time.
export function matchRegion(title) {
  return REGIONS.find((r) => titleMatchesRegion(title, regionCoreTerm(r))) || null;
}
