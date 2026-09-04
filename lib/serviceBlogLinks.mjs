// lib/serviceBlogLinks.mjs
//
// Real Naver blog posts (written by the actual crew) linking each service
// page to its own on-site 'we really did this' proof, shown right after
// the before/after photos. Shared between pages/ServiceLanding.tsx (the
// /services/:id page) and pages/RegionServiceLanding.tsx (the 204
// /services/:id/:region pages) via getServiceBlogLinks() below, so both
// show the exact same curated links per service rather than duplicating
// this data (or drifting out of sync) in two files.

export const naverBlogLinks = [
  {
    title: "안산쓰레기집청소 쥐퇴치업체, 전후 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/223930795266",
    desc: "안산 쓰레기집 쥐 퇴치 및 쓰레기 수거, 소독 살균 종합 세정 과정",
    category: "안산 쓰레기집",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MTJfMTM3/MDAxNzUyMjc3MTMwMDcy.ebdYBxDfJJXwK5YIzV22BGmD7YwVfj6J68TdPth32Owg.hSehogiN-_HaOdnA-PUmmgDb9HVPp1jnkzWtUtwcEWQg.PNG/%BE%C8%BB%EA%BE%B2%B7%B9%B1%E2%C1%FD%C3%BB%BC%D2.png?type=w966"
  },
  {
    title: "안산쓰레기집청소, 쥐로 인한 특수한 오염 제거 과정",
    url: "https://blog.naver.com/kslee0143/223966114653",
    desc: "쥐 배설물 및 특수 오염물 정밀 스팀 살균, 악취 차단 세정 과정",
    category: "특수 오염 제거",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA4MTBfMTky/MDAxNzU0ODIxODI1MTUx.GKNEpI2613L-2F7WuslcZZrFylLLO3cp6EHYMC8wkoUg.6QJC-S37pSTtxhvmcJc5KTH73GGkYw8O4KDeRb8wwqog.PNG/%EC%95%88%EC%82%B0%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91.png?type=w966"
  },
  {
    title: "수원 쓰레기집 청소, 특수했던 니코틴 제거 현장 과정",
    url: "https://blog.naver.com/kslee0143/223981232662",
    desc: "벽면 및 천장 니코틴 노란 묵은때 스팀 박리 및 살균 탈취",
    category: "수원 니코틴 청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA4MjRfMTI1/MDAxNzU1OTg0ODgxMDYz.YBM-mZDlZbfkpJIETFlJFF81Yr02qD4G8fwM7gyy5wAg.fa1G6xkxxXSF6V342dJuJ1M920UD7ocp7rcQ0qiaqFwg.PNG/%BC%F6%BF%F8%BF%F8%B7%EB%B4%CF%C4%DA%C6%BE%C1%A6%B0%C5%C3%BB%BC%D2.png?type=w966"
  },
  {
    title: "안양 원룸 쓰레기집 청소업체, 최적의 방법으로 해결해드려요",
    url: "https://blog.naver.com/decline11731/223781462184",
    desc: "안양 원룸 쓰레기 방치 현장의 신속한 방역 및 폐기물 분리 처리",
    category: "안양 쓰레기집",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAzMDNfOTYg/MDAxNzQwOTQ1NDYwMjc4._z_L1oQMJy8uegc8Sw5OnLrNx47cqWIlKY-glQ7-GQ4g.yh_dmK9qopvf8z-1ZUXLoUY-5e9ksLkG2KDf20QrNukg.PNG/%BE%C8%BE%E7_%BF%F8%B7%EB_%BE%B2%B7%B9%B1%E2%C1%FD.png?type=w966"
  },
  {
    title: "인천 원룸 쓰레기집, 전문업체를 통한 청소사례",
    url: "https://blog.naver.com/decline11731/223792811039",
    desc: "전문 탈취제 및 살균 가포화 처리를 통해 심각한 오염 및 고독사/쓰레기 현장 원상복구",
    category: "인천 전문특수청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAzMTJfMTMy/MDAxNzQxNzA2NzY3ODgx.5IVrXMEyLhrDDc2LuHUyBXWgVVbQf0FZDpFhTlfPsZkg.WZjQjtgIOSJwJn9kfOAsMKRTtlN19KYMC5KSbc6MTWEg.PNG/%EC%9D%B8%EC%B2%9C_%EC%9B%90%EB%A3%B8_%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91.png?type=w966"
  },
  {
    title: "새 출발을 위한 수원 쓰레기집 청소, 과정과 견적 공유해요",
    url: "https://blog.naver.com/decline11731/223835398320",
    desc: "고객님의 편안한 새 출발을 응원하며 체계적인 폐기물 처리 및 살균 탈취 과정 가이드",
    category: "수원 쓰레기집 견적",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA0MTZfNDcg/MDAxNzQ0NzY3MjQyNjQz.pLk55QaCh3o3FCHJ6k457bMon41-KCO_yKLmwKBvb7gg.K-gxx7rMXBOJYSuG-oi0gxxOesFGu4MG9O2D66QTRG4g.PNG/%EC%88%98%EC%9B%90%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91%EC%B2%AD%EC%86%8C.png?type=w966"
  }
];

export const floorWaxBlogLinks = [
  {
    title: "에폭시코팅, 바닥 얼룩 기스 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224020368491",
    desc: "에폭시코팅 바닥 세척 및 왁스 코팅 작업",
    category: "에폭시코팅",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA5MjRfMjYy/MDAxNzU4NzAyMTkzMDIy.oY3i965bVg3et8G6DMKrXYq7_a081KarMKJg0o7lMakg.C0YQ7nMO2gLEOcGEzYhnwSHPuDTwkPYodQ5bApFyy08g.PNG/%EC%97%90%ED%8F%AD%EC%8B%9C%EC%BD%94%ED%8C%85.png?type=w966"
  },
  {
    title: "인천 바닥왁스, 청소 후 5회 코팅 과정 공유합니다",
    url: "https://blog.naver.com/decline11731/223840045095",
    desc: "인천 사무실 바닥 왁스 재코팅 상세 과정",
    category: "바닥왁스재코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MTlfMjk5/MDAxNzQ1MDcxOTg3ODEz.mLj4aYb_h2Wift_cixPRd1ckDrarodp7rLgcxYGvQYwg.tfNxmyGSjKgMvi66X8sawNCoBVPZsMg4ug_Br6xzJwcg.PNG/%B9%D9%B4%DA%BF%CE%BD%BA%C0%E7%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "데코타일 바닥왁스코팅, 대형마켓의 화려한 변신",
    url: "https://blog.naver.com/decline11731/223844606446",
    desc: "대형 매장 데코타일 딥클리닝 및 왁스 코팅 현장",
    category: "데코타일 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MjRfNzYg/MDAxNzQ1NDUyMDk0NTcx.EKK_PpeOxFIu0w2qNoGlebDR_lJXC8lkXKCitXAdWJAg.aXVc3ICV61qS60Aglks2xssWRJ7frrEEoAze0o5XkZ0g.PNG/%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "아름다운 퇴장, 왁스박리 후 바닥코팅으로 상가 원상복구",
    url: "https://blog.naver.com/decline11731/223824318110",
    desc: "상가 퇴거 복구를 위한 기존 왁스 박리 작업 및 재시공",
    category: "바닥 왁스박리",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MDZfMjIw/MDAxNzQzOTQ2Mjk4MTgw.dIeA8tIgYSraqXH48-YMFMMaTfRz_DOKXXCCYuoGCzEg.jcOVh6E5IsOMZew0WQnJ5lszJrxsozOPwVTXl19Y7HMg.PNG/%B9%DA%B8%AE_%C8%C4_%B9%D9%B4%DA%BF%CE%BD%BA.png?type=w2"
  },
  {
    title: "용인 교회 왁스코팅, 전문 업체의 바닥 시공 과정 공유합니다.",
    url: "https://blog.naver.com/decline11731/223814685051",
    desc: "용인 교회 대예배실 데코타일 바닥 왁스 작업 현장",
    category: "교회 바닥왁스",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTAzMzBfNjQg/MDAxNzQzMjkwODM2MTkw.Mypf4q0C7hWL9A0KzZOF2YtxAoWja77IfkIjTLckH5sg.YZIE7n993kP9ob79XrtV64SHI4zjaPCQkHSJ8-L33Pwg.PNG/%BF%EB%C0%CE_%B1%B3%C8%B8_%B9%D9%B4%DA%BF%CE%BD%BA.png?type=w2"
  },
  {
    title: "원목마루 나무바닥코팅 작업 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223923456510",
    desc: "원목마루 및 강화마루 전용 코팅제 도포 현장",
    category: "나무바닥코팅",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MDZfMjA1/MDAxNzUxNzU3MTAzNzUy.EYUzhWUIHRdjIglVfqAruJkBiNNNjOdxxilnRLOfrP8g.xDrP83TKDvpEz0Shrnpti8IIj6p9zYEWTY-CpazVA6wg.PNG/%EB%82%98%EB%AC%B4%EB%B0%94%EB%8B%A5%BD%EC%BD%94%ED%8C%85.png?type=w966"
  }
];

export const floorBlogLinks = [
  {
    title: "안양 사무실 바닥 왁스코팅, 묵은 오염 청소 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/224302952491",
    desc: "안양 무역센터 사무실 바닥왁스코팅 현장입니다. 기계 청소를 통해 틈새에 고착된 시꺼먼 묵은 때와 얼룩을 전용 세제로 정밀 세정하고 최고급 바닥 왁스코팅을 적용했습니다.",
    category: "데코타일 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDFfMjk3/MDAxNzgwMjgxNTQzNDM1.JD0dVM6sWv3AfgSRiLChmR2cVQVun3xzZAkepOLnSg8g.-xjFbcy8qRXJjVb9q44RX5Aq-v3rGR8W4L-rSOwasJIg.PNG/%BE%C8%BE%E7%BB%E7%B9%AB%BD%C7%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "성동구 성수동 바닥 청소, 육각 모자이크 타일 오염 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224303447043",
    desc: "성수동 레스토랑 현장입니다. 이전 여러 청소업체에서도 포기했던 육각 모자이크 타일 깊은 틈새 of 시꺼먼 오염물과 고착 먼지를 완벽하게 복원 세척했습니다.",
    category: "타일 정밀 세정",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDJfMTEg/MDAxNzgwMzU0MzI1MDQz.NOiyi0xGIDTkLBjccQZJ1qTWySkIyiu7RJYfACJd8Agg.3y1GEErievDbBssd3DdjdTDrtDwTR9x7OZo5buINUqAg.PNG/%BC%BA%BC%F6%B5%BF%B9%D9%B4%DA%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강남 콩자갈 청소, 업체의 전문적인 관리 과정 공유",
    url: "https://blog.naver.com/kslee0143/223997542273",
    desc: "강남 고급 양복점 콩자갈 바닥 청소 현장입니다. 자재 틈새에 박힌 미세 유해 분진과 음료 얼룩을 콩자갈 전용 특수 친환경 세제와 석션 기계로 완전히 해결했습니다.",
    category: "콩자갈 특수 청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA5MDZfNTIg/MDAxNzU3MTI4NTY4NDk0.Ej9WFUuFA9WH0fvqdnjnrYQ4aRkyz3-GFEp9bfRFlQYg.QXB7IqqWCPjJrk48wG3BWaM4PSYETi32mbYt0cYgsJ0g.PNG/%C4%E1%C0%DA%B0%A5%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "사무실 복원청소, 바닥본드제거 왁스코팅 과정 공유",
    url: "https://blog.naver.com/kslee0143/223954353145",
    desc: "사무실 이전 공간의 골칫거리인 데코타일 바닥 본드 접착제 끈적임 자국을 전용 용해제와 연마 클리닝 기계를 동원하여 흔적 없이 제거하고 왁스코팅으로 신축 복원했습니다.",
    category: "바닥본드 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MzFfMjU5/MDAxNzUzOTY5ODM0OTIx.eKNaq_9BhfTMGQ8sZ44hCmFcatw_eHNcYc5YZHw7WqEg.wKcolsaZ5vel2EHcMg2BJqmlCFivNzHZzqW8qHn1XrYg.PNG/%B9%D9%B4%DA%BA%BB%B5%E5%C1%A6%B0%C5.png?type=w2"
  },
  {
    title: "콩자갈 청소, 전문업체가 과정 알려드려요",
    url: "https://blog.naver.com/decline11731/223872265240",
    desc: "콩자갈 바닥 전문 청소 노하우를 바탕으로 한 전후 클리닝 과정입니다. 복잡한 골재 틈새 속에 깊숙이 박힌 물때와 음료 흔적, 미세먼지를 불림 작업 후 말끔하게 스크럽 및 흡입 흡수했습니다.",
    category: "콩자갈 정밀 세척",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA1MjBfMTA1/MDAxNzQ3NzQ4MTgyMDE5.B_jc2hAlbU92KzwzrvDqGP7pIstzRLI8O7j60K62gSkg.oI-v4jIZkwPH3B4x6Ad1vMiMGaOkFGNwLhSkh6tz1p8g.PNG/%C4%E1%C0%DA%B0%A5%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "데코타일 철거 후 바닥본드제거 그 과정 공유할게요",
    url: "https://blog.naver.com/decline11731/224120090281",
    desc: "서울 논현동 빌딩 현장입니다. 바닥 마루 데코타일 철거 후 남아 있는 유독성 접착 본드층을 안전한 친환경 본드 제거제와 강력 전문 장비로 바닥면 손상 없이 정교하게 걷어냈습니다.",
    category: "바닥 본드제거",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTEyMjNfNjMg/MDAxNzY2NDc1MjIxMTY2.sGTiwtyXUbvkzDKRU14jTbHMkXSHSdjcCUlpwPl9Sa0g.YL-5Py5PcxSIi7jfaEPMZb0xG3XA2Ygqt7PkHiNbqmkg.PNG/%B9%D9%B4%DA%BA%BB%B5%E5%C1%A6%B0%C5.png?type=w2"
  }
];

export const restaurantBlogLinks = [
  {
    title: "안양 주방 바닥청소, 기름때 제거 과정 공유합니다",
    url: "https://blog.naver.com/decline11731/223770380603",
    desc: "안양 주방 바닥청소 현장입니다. 두껍게 고착화된 미끄러운 주방 기름때와 찌든 먼지를 전문 장비와 기름때 제거제로 완벽히 복원 처리했습니다.",
    category: "주방 바닥청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAyMjNfMjU5/MDAxNzQwMjcwNDQ5NjIz.CLAp_8Gj0uGDTAQV27ZSGskg9FYHkv2CYg2MuaMb1dog.SJawWpxCFoKXpMVot4HlLQ6fwO4vWh8AX8nlpe5lqj4g.PNG/%C1%D6%B9%E6_%C3%BB%BC%D2_%B9%D9%B4%DA_%B1%E2%B8%A7%B6%A7_%C1%A6%B0%C5.png?type=w966"
  },
  {
    title: "화성 주방청소업체, 식당 상가 음식점 후드등 전문가의 과정 공유해요",
    url: "https://blog.naver.com/decline11731/223816142305",
    desc: "화성 주방청소업체 현장입니다. 식당 상가 음식점의 후드와 환기 시설 내부의 끈적한 유분 기름때를 고온 스팀과 친환경 세제로 복원 세정했습니다.",
    category: "주방 후드청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTAzMzFfMjA0/MDAxNzQzMzc4Nzk3NDY1.1lEPWQhGliLf0PdKZaqUqtu96vuMEAQwgmqrZhfA188g.X1cNmY2H8pdTLiIa9cwkEtSg1ZrYeFPXJdTymLT3JDYg.PNG/%C0%CE%C3%B5_%C1%D6%B9%E6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "방치된 식당 대변신, 수원 주방청소업체의 노하우",
    url: "https://blog.naver.com/decline11731/223851580082",
    desc: "방치되었던 식당 주방과 홀 내부를 수원 주방청소 전문업체의 축적된 기술력과 친환경 약품, 기계 세척을 동원하여 깨끗하고 위생적인 공간으로 대변신시켰습니다.",
    category: "수원 주방청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MzBfMTM2/MDAxNzQ2MDE1MTE3NDg4.C-Sb93vD5CprVwEstD0TxiNCibkXUlrKN5KYftrlzuQg.mgTxqBZLBbBUR6Xn0bAOV6Q3XOmL0U6YerM150FbalIg.PNG/%BC%F6%BF%F8%C1%D6%B9%E6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "주방의 놀라운 변화, 인천 후드청소업체가 만들어드려요",
    url: "https://blog.naver.com/decline11731/223854651094",
    desc: "인천 식당 후드 및 덕트 세정 현장입니다. 기름 방울이 떨어지던 심각한 오염 상태의 후드를 고온 스팀 클리닝과 전문 오일 용해제로 깨끗하게 변화시켜 드렸습니다.",
    category: "인천 후드청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA1MDNfMTA0/MDAxNzQ2Mjc5ODkyNTAx.5nvRl-bIKbxwnl6MbAd0YL9oWnVGjLpXsExR8_kU0b4g.M3OwgsC5vJiORO0-evBrDuS3Tiq6qv_aokI_1_82ZRAg.PNG/%EC%9D%B8%EC%B2%9C%ED%9B%84%EB%93%9C%EC%B2%AD%EC%86%8C2.png?type=w800"
  },
  {
    title: "화성 동탄 상가 식당 홀 청소업체, 기름때 제거 깔끔하게",
    url: "https://blog.naver.com/decline11731/223950865815",
    desc: "화성 동탄 식당 상가 홀 청소 현장입니다. 테이블, 가구, 그리고 바닥 전체의 미끄러운 기름 막과 묵은 때들을 꼼꼼하게 중화 클리닝하여 쾌적하게 만들었습니다.",
    category: "식당 홀청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MjlfMjA2/MDAxNzUzNzUwMTY1MzY1.-jEHtioS0NWao0CCxjd9pYEk-7XRVl496eh83fsrvckg.rOWrnsVVur5zDu8HzBgj-FTVHiTZUheYR4tK2-KVXIMg.PNG/%C8%AD%BC%BA%B5%BF%C5%BA%BB%F3%B0%A1%BD%C4%B4%E7%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w966"
  },
  {
    title: "안양 해썹청소, HACCP 인증업체가 과정 보여드려요",
    url: "https://blog.naver.com/decline11731/223867869442",
    desc: "HACCP 식품 제조업체 및 단체급식 조리실 청소 현장입니다. 위생 검열 기준에 부합할 수 있도록 철저한 세정, 고온 멸균 소독, 약품 살균을 제공합니다.",
    category: "해썹/위생 세정",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA1MTZfNTUg/MDAxNzQ3MzgxNjUyNzU3.Qzft_Kh9Wk_OEYVxjTvE6ubX-G0wtyoSGcNlixrpTVog.ri8-J1vOZQ30MAYPtUPsIKXFA2bf_BORJ_c6JEFOKcsg.PNG/%C7%D8%BD%E7%C3%BB%BC%D2.png?type=w966"
  }
];

export const floodBlogLinks = [
  {
    title: "오수관 터짐으로 생긴 오물과 오수, 인천 침수청소 과정 공유",
    url: "https://blog.naver.com/kslee0143/223940315962",
    desc: "오수관이 터져 지하 또는 건물 내부에 고인 오염된 오수와 오물을 완벽하게 석션 및 세정 처리한 정밀 침수청소 현장입니다. 부유 오물과 찌꺼기를 집중 회수하고 철저한 소독·탈취 작업을 통해 본래의 위생적인 공간으로 신속하게 복구해 드렸습니다.",
    category: "인천 침수청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MjBfNjEg/MDAxNzUyOTgyMDYzOTk1.EQICpbbWHt2dNUownQaYcffQ5EIxf7kyTriDOLaIAPMg.tQcLeuqT0JPOr0xKC969H1Qilt47FpW1z_LCsPJhfVEg.PNG/%EC%98%A4%EB%AC%BC%EC%98%A4%EC%88%98%EC%B9%A8%EC%88%98%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "방치된 인천 건물 지하에서 발생한 침수 청소 과정",
    url: "https://blog.naver.com/kslee0143/224347135366",
    desc: "오랫동안 방치되었던 인천 건물의 지하 주차장 및 보일러실 침수 공간을 배수 펌프와 고성능 스크러버로 고인 물과 펄, 토사를 전부 제거한 침수 복구 현장입니다. 습기와 곰팡이를 억제하고 악취를 예방하기 위한 살균 및 건조 케어까지 꼼꼼하게 시공했습니다.",
    category: "인천 침수청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNjA3MTVfNjIg/MDAxNzg0MDY5NDU0Njcy._s77oz085tO8LZHgS9Z5FvhaJjfobpNwLVAdID2Q1-cg.XPdSSRnXQlIXZxiL-w0UDrpVd90lWTKnWXNHURFYe4Eg.PNG/%EB%8A%90%ED%8B%B0%EC%9A%B8_%EC%B5%9C%EC%A0%81_%EC%8B%9C%EC%9E%91.png?type=w800"
  }
];

export const officeBlogLinks = [
  {
    title: "안양 평촌 사무실 청소, 5년 묵은 오염 제거 과정",
    url: "https://blog.naver.com/decline11731/224300392530",
    desc: "안양 평촌 사무실 입주 청소 현장입니다. 5년 동안 묵은 끈끈한 먼지와 사각지대의 오염들을 입주 전에 철저히 진공 청소 및 고온 소독 클리닝해 드렸습니다.",
    category: "사무실 입주청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA1MjlfMjE2/MDAxNzgwMDU0NTAzMjky.cvDk37N3qjEO6uw-TXA9Uy0QCu2ehh-3GMjj-XnquUUg.whTqu3yNCNkL07zpvp_rf63aslzwfXqRl1hjGXggKpwg.PNG/%BE%C8%BE%E7%C6%F2%C3%CC%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강남사무실청소, 전 세입자가 남겨놓은 오염 제거 과정",
    url: "https://blog.naver.com/kslee0143/224204600447",
    desc: "강남 사무실 복원 케어 현장입니다. 이전 입차인이 오랜 기간 사용하며 묵은 때와 찌꺼기로 가득했던 바닥 데코타일을 복원 연마하여 깨끗하게 세정했습니다.",
    category: "사무실 오염제거",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjAzMDRfNCAg/MDAxNzcyNjM0NTU4MDM2.bYmKyi7y681Oemd52fc9W_ia9AESVKpQSXoCVx4a-tYg.jizmXGcN6ncQqVig9xCT2mOtALoIqqu915PJMHB6jV0g.PNG/%B0%AD%B3%B2%BB%E7%B9%AB%BD%C7%C3%BB%BC%D21.png?type=w2"
  },
  {
    title: "용인 사무실 청소업체, 입주 전 마무리 과정 공유",
    url: "https://blog.naver.com/kslee0143/223987105401",
    desc: "용인 사무실 클리닝 현장입니다. 사무실을 이전하여 새로운 공간에 정착하시기 직전, 쾌적하고 티끌 하나 없는 위생적인 업무 공간을 제공해 드렸습니다.",
    category: "용인 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjhfMjY0/MDAxNzU2Mzg4NTI4MDcy.rz92oz2JCoZsQ3jmNm-Yv-CCCerNTvl2fuA5_rDv0EEg.t7NIr75RvIwZ4Eag8UM4j-_6Yzl067NvfSUJfPZdo84g.PNG/%B4%C0%C6%BF_%C3%D6%C0%FB_%BD%C3%C0%DB.png?type=w2"
  },
  {
    title: "수원 사무실 청소, 샷시 관리와 왁스코팅 과정",
    url: "https://blog.naver.com/kslee0143/223983188023",
    desc: "수원 사무실 정밀 청소 및 왁스코팅 현장입니다. 수북이 쌓였던 이물질과 먼지로 막혀 있던 샷시 창틀을 정밀 흡입 클리닝하고, 바닥 수명을 연장해 주는 프리미엄 왁스코팅을 적용했습니다.",
    category: "수원 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjVfMTI5/MDAxNzU2MTIxMjc0MTY3.ZXIvU1ziLEjvEiHizs3pDIr3jCr7-KChLmLcPTn7TY4g.E8XKdAiNphOEf7kAYljyEvLx_F6iijhlvS6_jibOKtog.PNG/%BC%F6%BF%F8%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C349.png?type=w2"
  },
  {
    title: "안양 사무실 청소업체, 입주를 위한 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223981001686",
    desc: "안양 만안구/동안구 입주 전문 크리닝입니다. 천장 텍스 먼지 흡입부터 바닥 디테일 세척, 탕비실 물때까지 신축 빌딩 수준으로 완벽한 세정 서비스를 마쳤습니다.",
    category: "안양 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjNfMTk3/MDAxNzU1OTU5MjA1NDY1.xMObm81liZSv7HPiwaoJMOCtYwDSyeCj02KglPNEFIAg.cZU6EUEQZF3gGF27a6ceD46eybbuCWMphyafHtgn-r8g.PNG/%BE%C8%BE%E7%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "서울 준공청소, 종로 사무실 인테리어 마무리 과정",
    url: "https://blog.naver.com/kslee0143/223970810302",
    desc: "서울 종로 사무실 준공/인테리어 청소 현장입니다. 유독 분진이 많은 석고 가루와 톱밥, 미세 먼지들을 전용 특수 집진 기기로 정밀 흡입하고 쾌적하게 클리닝했습니다.",
    category: "종로 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MTRfMTAz/MDAxNzU1MTY2NDU2ODYy.wF1mazRsi8cESU6hTeTdW0PBMDyJPUsS36pOqkSQrzkg.Jb42nakvwWmOFul6GkRCUkEAsziNovnboUB_YRTXJgEg.PNG/%BC%AD%BF%EF%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  }
];

export const constructionBlogLinks = [
  {
    title: "강동구 성수 준공청소, 공장이 팝업스토어가 되던날",
    url: "https://blog.naver.com/kslee0143/224302094656",
    desc: "성수동의 오래된 공장 건물을 핫한 팝업스토어로 완벽 탈바꿈시킨 준공청소 현장입니다. 깊숙한 분진과 먼지, 묵은 오염물들을 완전히 세정하고 위생적인 행사 공간으로 복원했습니다.",
    category: "성수동 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA1MzFfMTIg/MDAxNzgwMjM3NTQ2NDI5.zrdCxA4kKaraI47tAWPg4FrKjEfIi4XDxHh1Ml0atTUg.WrQhB7tOxRW_D0reBXu7q2M51L0a_wbjpO4Fru6r6XEg.PNG/%B0%AD%B5%BF%B1%B8%BC%BA%BC%F6%B5%BF%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "과천 준공청소, 상가 유리창 공사 잔재 제거 과정",
    url: "https://blog.naver.com/kslee0143/223997683194",
    desc: "과천의 높은 상가 준공청소 현장입니다. 4미터 높이의 거대 통유리창과 창틀에 찌든 실리콘, 먼지, 본드 등의 공사 잔재들을 고소 작업 장비와 전문 약품으로 깔끔하고 맑게 클리닝해 드렸습니다.",
    category: "과천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA5MDZfMjU3/MDAxNzU3MTQwNjIwMjU5.dZXioaw5lMBp1Du3ftmm0hXgnSfRDBsMPRXbpTSGG5wg.AEvJtmkha2KsQo3Ezgydawhqu9YHCtCLDE_yF8LItUMg.PNG/%B0%FA%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강서구 준공청소, 병원 개업을 위한 마무리 과정",
    url: "https://blog.naver.com/decline11731/224195414574",
    desc: "강서구 마곡 병원/의원 준공청소 현장입니다. 병원 개원을 앞두고 인테리어 공사 후 남은 미세한 석고보드 가루, 시멘트 분진, 보양 필름들을 완벽하게 살균 제거하여 쾌적하고 청결한 진료 환경을 마련해 드렸습니다.",
    category: "강서구 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjAyMjVfOCAg/MDAxNzcxOTkzNTIyMTA4.DTgK_mRiIrf3ZxAV5GJ8xoyQ4S8nGR1JVBGpJkfdPqEg.jDj03s8kkkJgkUxAMYZ30dqs_FozWyLuQ-pHblHg-NQg.PNG/%B0%AD%BC%AD%B1%B8%BA%B4%BF%F8%C1%D8%B0%F8%C3%BB%BC%D282.png?type=w2"
  },
  {
    title: "군포 준공청소, 인테리어 의료 공간의 마무리 과정",
    url: "https://blog.naver.com/decline11731/223936269727",
    desc: "군포의 새로운 의료 및 상업 공간 준공 현장입니다. 환자분들이 직접 접하게 될 민감한 공간인 만큼, 눈에 띄는 백시멘트와 실리콘 잔여물 제거는 물론 미세한 공사 유해 먼지까지 고정밀 집진 기기로 완벽 분해 청소했습니다.",
    category: "군포 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MTZfMTkx/MDAxNzUyNjY4OTE1NDI1.nkJvxVO2qKE-rF7DhnJIOLPSJBcNDsB-6vSgE5skB9gg.zE6cAeD2iVdMYhEtTDfiY9TV2gV7alEr4Z5ghLJpf3og.PNG/%B1%BA%C6%F7%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "인천 준공청소업체, 쿠우쿠우 오픈 마무리 과정 공유해요",
    url: "https://blog.naver.com/decline11731/223864598483",
    desc: "인천 쿠우쿠우 패밀리 레스토랑의 초대형 매장 준공청소 현장입니다. 단 하루 만에 대규모 매장 전체의 공사 분진, 주방 유해물질, 미세 먼지들을 완벽히 제거하여 깔끔하고 성공적인 오픈을 완벽 지원해 드렸습니다.",
    category: "인천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA1MTNfMjYz/MDAxNzQ3MTM1NTgyNTAz.msE24ICAdICoFe3wrcpndoGo9l60XLEFgJlu_EAUPvAg.AoNL09p2IPFeSStOk48BNDSdL9Of-NODiOkFlQDsGYQg.PNG/%C0%CE%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "부천 준공청소, 사무실 분진제거와 왁스코팅까지",
    url: "https://blog.naver.com/decline11731/223939225668",
    desc: "부천 사무실 입주 전 대형 준공청소 현장입니다. 전체 층의 리모델링 공사 후 남은 막대한 톱밥, 석고 가루 분진들을 깔끔히 밀어내고, 바닥면 내구성을 지탱해 줄 왁스코팅 시공까지 원스톱으로 처리해 드렸습니다.",
    category: "부천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MTlfMTIg/MDAxNzUyODgxMzU1NjQx.791luFCwZtGGW_gh56QKy8dHJAZHWyS9ZmLE0kPAaJQg.VOqFsVNKnK0pCwT9J4-f2TtiQs7NuoQlDYUQeWU-aVgg.PNG/%BA%CE%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  }
];

export const interiorBlogLinks = [
  {
    title: "인천 준공청소 인테리어 후 마무리 과정 공유",
    url: "https://blog.naver.com/kslee0143/224112904830",
    desc: "인천 매장의 인테리어 마무리 준공청소 현장입니다. 인테리어 시공 후 구석구석 쌓인 미세한 먼지와 톱밥, 유해 물질들을 정밀 세척하여 쾌적한 영업을 시작하실 수 있도록 가꿔드렸습니다.",
    category: "인천 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTEyMTdfNjcg/MDAxNzY1OTQzOTM1OTgw.Lv4xS18JoaUeOIsfI2VjZU4jgrM4Uph_X6jwBkR5kzkg.LhOn-dsuedwWDu8VZW4TKKRCC4fNCIc74fD_f1pNEYkg.PNG/%EC%9D%B8%EC%B2%9C%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "김포 쿠우쿠우 준공청소, 인테리어 후 마무리 과정",
    url: "https://blog.naver.com/kslee0143/224067639693",
    desc: "김포의 쿠우쿠우 대형 매장 인테리어 청소 현장입니다. 대규모 공간 전체의 미세 분진과 도배 자국, 자재 틈새 먼지들을 완벽하게 케어해 성공적인 매장 오픈을 지원했습니다.",
    category: "김포 인테리어청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTExMDdfMjYg/MDAxNzYyNDcyNjY0Mzk3.WWPrxy1rDLz2ewMRLkCs-1lOHU3SZXBtjUloFVR-dYYg.vi2Kfiw8Exc-hTHomeRRY6UpXmr1Yqr_xYGA2a5NKoog.PNG/%EA%B9%80%ED%8F%AC%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w966"
  },
  {
    title: "용인 수지구 사무실 인테리어 청소 과정 공유",
    url: "https://blog.naver.com/kslee0143/223965254838",
    desc: "용인 수지구 사무실의 새 단장 후 인테리어 청소 현장입니다. 직원들의 건강한 근무 환경과 높은 업무 효율을 위하여 보이지 않는 사각지대의 공사 유해 물질과 먼지들을 완벽하게 제거했습니다.",
    category: "용인 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA4MTBfMjg5/MDAxNzU0Nzc4NjM0Mzg1.JEUwnesSAwbx8Yajv5w1j9iPUZGrDOeCMOEKUcPUTYkg.vF9I4xZQTyOM2HxR0BjQwO16Li8XnRemLp7pWCYycrIg.PNG/%EC%9A%A9%EC%9D%B8%EC%88%98%EC%A7%80%EA%B5%AC%EC%82%AC%EB%AC%B4%EC%8B%A4%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "서초 준공청소, 인테리어 공사 잔재 꼼꼼하게 손봐요",
    url: "https://blog.naver.com/kslee0143/223938852808",
    desc: "서초구 인테리어 준공청소 현장입니다. 타일 틈의 백시멘트 분진, 유리에 묻은 페인트와 본드 잔해, 깊은 틈새 오염까지 꼼꼼하고 말끔히 세정했습니다.",
    category: "서초 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTdfMjY3/MDAxNzUyNzU1MDk3NTg3.ffJFfyOqqaBE_zEq4N2v-LmI43PhJ57WaGo6oJNnYW0g.r--J107Qoicirnp5SdRIsdTPm-kQvmYUdy8X0nNJOykg.PNG/%EC%84%9C%EC%B4%88%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "용인 준공청소, 인테리어 마감처리 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223936178311",
    desc: "용인 상가의 인테리어 마감 청소 현장입니다. 새로운 출발을 기분 좋게 시작하실 수 있도록 가재도구의 먼지와 주방, 홀 공간 전체의 유해 먼지들을 정밀 클리닝했습니다.",
    category: "용인 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTZfMTcx/MDAxNzUyNjYyMjE3MDQw.cuHeavwAaMzNdCKguaJ_m4JSA6mn3DCgN_nkgekUErQg.AB7foqY-LhSIxdc9krKKGAHE87mMICbSaC954RPIfc4g.PNG/%EC%9A%A9%EC%9D%B8%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "수원 준공청소, 병원 인테리어 후 마무리의 중요성과 이유",
    url: "https://blog.naver.com/kslee0143/223932772517",
    desc: "수원 병원 인테리어 완료 후 마감 청소 현장입니다. 특히 위생이 철저해야 하는 의료 환경에 걸맞게 고성능 집진 세정과 꼼꼼한 마감 제거로 안심하고 진료할 수 있는 건강한 의료 공간을 선사해 드렸습니다.",
    category: "수원 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTRfMTc0/MDAxNzUyNDUzODk5NTE5.AvIfvY4jioGJigCcSjEE7_13Z_U8s_iSwWYcG6dVkuog.gyLDjGKlZ2QPOvjDvyTQ2tQFJlwlx6WTxq11_nydoeMg.PNG/%EC%88%98%EC%9B%90%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  }
];

export const moveInBlogLinks = [
  {
    title: "원룸 벌레 퇴치, 청소와 방역의 완벽한 만남",
    url: "https://blog.naver.com/decline11731/223840623549",
    desc: "원룸 입주 청소와 함께 진행된 정밀 벌레 퇴치 및 특수 방역 케어 현장입니다. 구석구석 틈새에 숨어있기 쉬운 먼지 제거는 물론 빈틈없는 해충 방제 작업까지 완벽히 마쳐, 입주 첫날부터 안심하고 생활할 수 있는 깨끗하고 안전한 환경을 선사해 드렸습니다.",
    category: "원룸 입주청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA0MjBfNDQg/MDAxNzQ1MTQ2NjU4Mjgy.OXisCfl-g4QuTAEo0oTeB8K44GQWbY6ocESySYGKVuog.F5LGlrwIGHylSRR4eX0pHMtkBgmzYOX2F27DdpD8FBMg.PNG/%EC%9B%90%EB%A3%B8%EB%B2%8C%EB%A0%88%ED%87%B4%EC%B9%98.png?type=w966"
  },
  {
    title: "거주청소업체를 고르는 팁 6가지, 청소업체 대표가 알려드려요",
    url: "https://blog.naver.com/kslee0143/223921023427",
    desc: "입주 및 거주 청소 업체를 선택할 때 반드시 살펴봐야 할 핵심 기준 6가지를 정직하게 공개합니다. 신뢰할 수 있는 전문성과 정성스러운 클리닝 관리 비결까지, 대표가 솔직하고 유용한 선택 팁을 알기 쉽게 정리해 공유해 드립니다.",
    category: "거주청소 정보",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MDNfMiAg/MDAxNzUxNTUwMDYxMzIz.wuY9p2kNzbIgzg47lkhPRDzcqQv1mp3cn5Bi7LX6KJ8g.iks6XOp7EcxKPzihhjH6Z58Jz4spm7AVWfqhjuD7W1Mg.PNG/%B0%C5%C1%D6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  }
];

export const factoryBlogLinks = [
  {
    title: "기름때 바닥청소, 왁스코팅으로 봄처럼 산뜻해진 공장 내부 공개해요",
    url: "https://blog.naver.com/decline11731/223826771079",
    desc: "공장 바닥의 묵은 기름때 청소 및 고밀도 왁스코팅 현장입니다. 유성 먼지 및 찌든 기름때를 완벽히 딥클리닝하고 고광택 왁스코팅으로 시설 내구성과 위생을 한 단계 업그레이드해 드렸습니다.",
    category: "공장 바닥청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA0MDhfMjE2/MDAxNzQ0MTEzOTUyNDg5.mr9TPQNrDmjmrxb-W9QB98iEmDzK9yCnMGQHOkLl1fkg.Z4bG4DXdkVzrQtlfKKaen4r2FIUD_htDIHJNG8S5igIg.PNG/%EA%B3%B5%EC%9E%A5%EB%B0%94%EB%8B%A5%EC%B2%AD%EC%86%8C%EC%99%81%EC%8A%A4%EC%BD%94%ED%8C%85.png?type=w800"
  },
  {
    title: "악세스 플로어 청소, 데이터센터 깔끔하게 만드는 단계별 이야기",
    url: "https://blog.naver.com/decline11731/223770735539",
    desc: "데이터센터 및 산업 시설의 고난이도 악세스 플로어(이중 바닥) 청소 과정입니다. 전자기기 안전을 위한 미세 정전기 방지 먼지 제거와 정밀 기계 클리닝을 통해 안정적이고 청결한 장비실 환경을 조성해 드렸습니다.",
    category: "악세스플로어 청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTAyMjNfMjk3/MDAxNzQwMjg2MjA1NDgy.Nw3aFiYaKpgeTB-unPhuTUQ8akBnrJIGiHMWvj8Qu7wg.GZp2yPUnR_eiE-FAC_huxl7ZibUZLvL9-MczrEstKIAg.PNG/%EC%95%85%EC%84%B8%EC%8A%A4_%ED%94%8C%EB%A1%9C%EC%96%B4_%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "에폭시코팅, 바닥 얼룩 기스 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224020368491",
    desc: "공장 및 상업 공간의 바닥 얼룩 및 기스 제거, 에폭시 하이브리드 코팅 현장입니다. 수년간 쌓인 바닥 스크래치와 깊은 오염 얼룩을 완벽히 박리·연마한 뒤 보호 코팅막을 씌워 새것과 같은 견고한 바닥을 선사해 드렸습니다.",
    category: "공장 바닥청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA5MjRfMjYy/MDAxNzU4NzAyMTkzMDIy.oY3i965bVg3et8G6DMKrXYq7_a081KarMKJg0o7lMakg.C0YQ7nMO2gLEOcGEzYhnwSHPuDTwkPYodQ5bApFyy08g.PNG/%EC%97%90%ED%8F%AD%EC%8B%9C%EC%BD%94%ED%8C%85.png?type=w966"
  }
];

export const fireBlogLinks = [
  {
    title: "간접화재청소, 그을림제거 어떻게 진행되는지 알려드려요",
    url: "https://blog.naver.com/decline11731/223890211078",
    desc: "인천 화재 청소 현장입니다. 시꺼먼 그을음 분진과 유독 탄 타르 성분을 자재 무손상 전문 약품으로 정교하게 세정해 내고, 오존 화학 산화 가공을 병행하여 밴 탄내를 완벽 차단 및 특수 복구해 드렸습니다.",
    category: "화재 그을음 복원",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA2MDZfMjg3/MDAxNzQ5MTU3OTA5MTI2.WRGck-YH3hoctr9CfqU91KctP74Ssh-rEUOQyXtre0sg.oZx6p0TA7v48xToMIxznZSQVSFJhjUGfc6hHOWlEDMog.PNG/%EA%B0%84%EC%A0%91%ED%99%94%EC%9E%AC%EC%B2%AD%EC%86%8C.png?type=w966"
  },
  {
    title: "인천 화재청소 공장 피해 복구 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/224150367937",
    desc: "갑작스러운 화재로 인해 유독물질과 끈적한 그을음 타르로 가득 찬 실내를 디테일한 친환경 특수 약품 처리 및 고온 스팀, 기계 세척을 동원하여 완전 제거하고 매캐한 연기 냄새를 말끔히 해결했습니다.",
    category: "화재 탄내 제거",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNjAxMTdfMzQg/MDAxNzY4NjYwMTk4NDM3.nlCpe5nDpabuMeVwMGzlHLvhJ4jgG5RwiNK9Dz363Dwg.TjxuwpufukGec1qS36MO06yyRB2ntAQovNlF9opAyjMg.PNG/%C0%CE%C3%B5%C8%AD%C0%E7%C3%BB%BC%D2.png?type=w966"
  }
];

export const externalWallBlogLinks = [
  {
    title: "성동구 성수동 외벽 청소, 테라코타 타일 메지 제거 과정",
    url: "https://blog.naver.com/kslee0143/224311103623",
    desc: "성동구 성수동 현장의 외벽 청소 이야기입니다. 테라코타 타일 사이의 찌든 메지와 오염 물질들을 자재 손상 없는 맞춤 약품과 고압 세척으로 말끔하게 제거하고 본래의 고급스러운 외관을 복원해 드렸습니다.",
    category: "성수동 외벽청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDlfMTIy/MDAxNzgxMDEyOTIxOTk5.AqfJrNAE4WRVj9XuWwQsCd6VHI1gVDXaWCQrqAWxg2Ug.jhxao7BKgoS-s-Vuv4G-nZsx1F8YeWWfbn_GsSEzR7sg.PNG/%BC%BA%BC%F6%B5%BF%BF%DC%BA%AE%C3%BB%BC%D2.png?type=w2"
  }
];

// Mirrors the switch in the old inline ternary — 'fire' is the fallback
// for any serviceId not explicitly listed (matches prior behavior).
// 'hood' and 'government-school' have no dedicated real blog posts of
// their own yet, so they reuse the closest topically-relevant existing
// array (restaurantBlogLinks already covers hood/duct cleaning; officeBlogLinks
// is the closest fit for institutional-building cleaning) rather than
// inventing content that doesn't exist.
export function getServiceBlogLinks(serviceId) {
  switch (serviceId) {
    case 'special': return naverBlogLinks;
    case 'floor-wax': return floorWaxBlogLinks;
    case 'floor': return floorBlogLinks;
    case 'restaurant': return restaurantBlogLinks;
    case 'hood': return restaurantBlogLinks;
    case 'office': return officeBlogLinks;
    case 'government-school': return officeBlogLinks;
    case 'new-construction': return constructionBlogLinks;
    case 'interior': return interiorBlogLinks;
    case 'move-in': return moveInBlogLinks;
    case 'factory': return factoryBlogLinks;
    case 'flood': return floodBlogLinks;
    case 'external-wall': return externalWallBlogLinks;
    default: return fireBlogLinks;
  }
}
