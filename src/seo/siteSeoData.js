const SITE_URL = "https://www.hg-prugioriverfront.co.kr";

export const siteSeo = {
  siteName: "서산 이안 스카이원",

  siteUrl: SITE_URL,

  // 이안 스카이원 서산 대표번호 확정 후 입력
  phone: "1533-8848",

  ogImage: "/img/og/main.jpg",

  locale: "ko_KR",

  organizationId: `${SITE_URL}/#organization`,

  websiteId: `${SITE_URL}/#website`,

  defaultDescription:
    "서산 이안 스카이원 홈페이지입니다. 충청남도 서산시 동문동 280-2 일원에 계획된 최고 38층, 공동주택 372세대와 주거형 오피스텔 32실 규모의 10년 장기일반민간임대 주거단지로, 전용 84.9㎡ 평면도와 입지환경, 공급정보 및 모델하우스 방문예약을 안내합니다.",

  project: {
    addressCountry: "KR",

    addressRegion: "충청남도",

    addressLocality: "서산시",

    streetAddress: "동문동 280-2",

    block: "서산 동문동 중심상업지역",

    households: "공동주택 372세대",

    scale:
      "지하 2층~지상 최고 38층, 공동주택 372세대 · 주거형 오피스텔 32실",

    unitTypes: [
      "전용 84.9㎡",
      "84A",
      "84B",
      "주거형 오피스텔 84OA",
    ],

    brand: "IAAN",

    brands: [
      "서산 이안 스카이원",
      "이안 스카이원 서산",
      "이안",
      "대우산업개발",
    ],

    developer: "㈜랜드러버",

    contractor: "대우산업개발㈜",

    trustee: "㈜무궁화신탁",

    navigationSchemaName: "서산 이안 스카이원 주요 메뉴",
  },

  keywords: [
    "서산 이안 스카이원",
    "이안 스카이원 서산",
    "서산 이안 스카이원 민간임대",
    "서산 이안 스카이원 모델하우스",
    "서산 이안 스카이원 방문예약",
    "서산 이안 스카이원 공급정보",
    "서산 이안 스카이원 임대조건",
    "서산 이안 스카이원 평면도",
    "서산 이안 스카이원 입지환경",
    "서산 이안 스카이원 커뮤니티",
    "모델하우스 방문예약",
  ],
};

export const seoNavigation = [
  {
    name: "브랜드소개",

    path: "/Brand/intro",

    children: [
      {
        name: "브랜드소개",

        path: "/Brand/intro",
      },
    ],
  },

  {
    name: "사업안내",

    path: "/BusinessGuide/intro",

    children: [
      {
        name: "사업안내",

        path: "/BusinessGuide/intro",
      },

      {
        name: "분양일정",

        path: "/BusinessGuide/plan",
      },
    ],
  },

  {
    name: "입지환경",

    path: "/LocationEnvironment/intro",

    children: [
      {
        name: "입지안내",

        path: "/LocationEnvironment/intro",
      },

      {
        name: "프리미엄",

        path: "/LocationEnvironment/primium",
      },
    ],
  },

  {
    name: "단지안내",

    path: "/ComplexGuide/intro",

    children: [
      {
        name: "단지배치도",

        path: "/ComplexGuide/intro",
      },

      {
        name: "호수배치도",

        path: "/ComplexGuide/detailintro",
      },

      {
        name: "커뮤니티",

        path: "/ComplexGuide/community",
      },
    ],
  },

  {
    name: "분양안내",

    path: "/BusinessGuide/documents",

    children: [
      {
        name: "공급안내",

        path: "/BusinessGuide/documents",
      },

      {
        name: "입주자 모집공고",

        path: "/SalesInfo/announcement",
      },

      {
        name: "계약서류안내",

        path: "/SalesInfo/guide",
      },
    ],
  },

  {
    name: "타입안내",

    path: "/FloorPlan/59A",

    children: [
      {
        name: "84.9㎡",

        path: "/FloorPlan/59A",
      },

      {
        name: "84A",

        path: "/FloorPlan/59B",
      },

      {
        name: "84B",

        path: "/FloorPlan/84A",
      },
    ],
  },

  {
    name: "홍보센터",

    path: "/Promotion/Press",

    children: [
      {
        name: "언론보도",

        path: "/Promotion/Press",
      },

      {
        name: "관심고객등록",

        path: "/Promotion/Customer",
      },
    ],
  },
];

const page = ({
  path,
  title,
  description,
  menu,
  image = siteSeo.ogImage,
  priority = 0.8,
  changefreq = "weekly",
  robots = "index, follow, max-snippet:-1, max-image-preview:large",
}) => ({
  path,
  title,
  description,
  menu,
  image,
  priority,
  changefreq,
  robots,
});

export const seoPages = {
  home: page({
    path: "/",

    title:
      "서산 이안 스카이원",

    description: siteSeo.defaultDescription,

    menu: "홈",

    priority: 1,

    changefreq: "daily",
  }),

  brandIntro: page({
    path: "/Brand/intro",

    title:
      "서산 이안 스카이원 브랜드소개 | 이안 스카이원 서산",

    description:
      "서산 이안 스카이원 브랜드소개 페이지입니다. 이안의 주거 철학과 대우산업개발이 계획하는 최고 38층 랜드마크 주거단지의 브랜드 가치와 특화설계를 확인하세요.",

    menu: "브랜드소개",
  }),

  businessIntro: page({
    path: "/BusinessGuide/intro",

    title:
      "서산 이안 스카이원 사업안내 | 동문동 10년 민간임대",

    description:
      "서산 이안 스카이원 사업안내입니다. 충청남도 서산시 동문동 280-2 일원, 최고 38층, 공동주택 372세대와 주거형 오피스텔 32실로 계획된 사업개요를 확인하세요.",

    menu: "사업안내",

    image: "/img/og/business.jpg",

    priority: 0.9,
  }),

  businessPlan: page({
    path: "/BusinessGuide/plan",

    title:
      "서산 이안 스카이원 공급일정 | 장기민간임대 계약안내",

    description:
      "서산 이안 스카이원의 10년 장기일반민간임대 신청과 계약, 사업승인, 착공 및 입주 관련 주요 예정 일정을 확인하세요. 세부 일정은 공식 공급안내를 기준으로 합니다.",

    menu: "사업안내",
  }),

  salesGuide: page({
    path: "/BusinessGuide/documents",

    title:
      "서산 이안 스카이원 공급안내 | 10년 장기일반민간임대",

    description:
      "서산 이안 스카이원 공급안내입니다. 공동주택 372세대와 주거형 오피스텔 32실의 공급규모, 전용 84.9㎡ 84A·84B 주택형 및 장기민간임대 공급정보를 확인하세요.",

    menu: "분양안내",
  }),

  announcement: page({
    path: "/SalesInfo/announcement",

    title:
      "서산 이안 스카이원 모집공고 | 민간임대 공급조건",

    description:
      "서산 이안 스카이원 모집공고 안내입니다. 10년 장기일반민간임대 공급 대상과 신청 일정, 전용 84.9㎡ 주택형, 임대조건, 계약절차 및 주요 유의사항을 확인하세요.",

    menu: "분양안내",
  }),

  salesInfoGuide: page({
    path: "/SalesInfo/guide",

    title:
      "서산 이안 스카이원 계약서류안내 | 민간임대 계약절차",

    description:
      "서산 이안 스카이원 계약서류안내입니다. 장기일반민간임대 신청자격 확인과 계약 체결, 제출서류, 준비사항 및 모델하우스 방문 전 확인해야 할 내용을 안내합니다.",

    menu: "분양안내",
  }),

  locationIntro: page({
    path: "/LocationEnvironment/intro",

    title:
      "서산 이안 스카이원 입지환경 | 서산 동문동 중심생활권",

    description:
      "서산 이안 스카이원 입지환경입니다. 서산시 동문동 중심생활권과 서산공용버스터미널, 서산시청, 교육·의료·문화시설, 산업단지 및 광역 교통망을 확인하세요.",

    menu: "입지환경",

    image: "/img/og/location.jpg",

    priority: 0.9,
  }),

  locationPremium: page({
    path: "/LocationEnvironment/primium",

    title:
      "서산 이안 스카이원 프리미엄 | 최고 38층 랜드마크",

    description:
      "서산 이안 스카이원 프리미엄 안내입니다. 최고 38층 랜드마크와 전용 84.9㎡ 중심 설계, 현관 앞 세대창고, 광폭 주차면, 클럽 이안 및 옥상정원 계획을 확인하세요.",

    menu: "입지환경",

    image: "/img/og/location.jpg",
  }),

  complexIntro: page({
    path: "/ComplexGuide/intro",

    title:
      "서산 이안 스카이원 단지배치도 | 101동·102동·103동",

    description:
      "서산 이안 스카이원 단지배치도입니다. 101동·102동·103동 총 3개 주거동의 남향 위주 세대 배치와 주거동 구성, 생활 동선 및 단지계획을 확인하세요.",

    menu: "단지안내",

    image: "/img/og/complex.jpg",

    priority: 0.9,
  }),

  complexDetail: page({
    path: "/ComplexGuide/detailintro",

    title:
      "서산 이안 스카이원 호수배치도 | 84A·84B 타입배치",

    description:
      "서산 이안 스카이원 호수배치도입니다. 101동·102동·103동의 층별 동·호수 구성과 전용 84.9㎡ 84A·84B 타입별 위치 및 향을 확인하세요.",

    menu: "단지안내",

    image: "/img/og/complex.jpg",
  }),

  complexCommunity: page({
    path: "/ComplexGuide/community",

    title:
      "서산 이안 스카이원 커뮤니티 | 클럽 이안 시설안내",

    description:
      "서산 이안 스카이원 커뮤니티 안내입니다. 주민카페와 작은도서관, 골프연습장, 운동시설, 어린이놀이터, 입주민회의실 및 6층 옥상정원 계획을 확인하세요.",

    menu: "단지안내",

    image: "/img/og/complex.jpg",
  }),

  floorPlan84: page({
    path: "/FloorPlan/59A",

    title:
      "서산 이안 스카이원 84.9㎡ 평면도 | 타입안내",

    description:
      "서산 이안 스카이원 전용 84.9㎡ 평면도 안내입니다. 84A·84B 타입의 실내 구조와 공간 활용, 수납계획 및 가족 중심의 생활 동선을 확인하세요.",

    menu: "타입안내",
  }),

  floorPlan94: page({
    path: "/FloorPlan/59B",

    title:
      "서산 이안 스카이원 84A 평면도 | 전용 84.9㎡",

    description:
      "서산 이안 스카이원 84A 타입 평면도입니다. 총 186세대로 계획된 전용 84.9㎡ 주택형의 내부 구조와 수납공간, 실거주 중심의 생활 동선을 확인하세요.",

    menu: "타입안내",
  }),

  floorPlan101: page({
    path: "/FloorPlan/84A",

    title:
      "서산 이안 스카이원 84B 평면도 | 전용 84.9㎡",

    description:
      "서산 이안 스카이원 84B 타입 평면도입니다. 총 186세대로 계획된 전용 84.9㎡ 주택형의 공간 구성과 수납계획, 효율적인 가족 생활 동선을 확인하세요.",

    menu: "타입안내",
  }),

  customer: page({
    path: "/Promotion/Customer",

    title:
      "서산 이안 스카이원 모델하우스 | 방문예약·관심고객등록",

    description:
      "서산 이안 스카이원 모델하우스 방문예약 페이지입니다. 전용 84.9㎡ 주택형과 10년 장기일반민간임대 공급일정, 임대조건, 계약절차 및 방문상담을 신청하세요.",

    menu: "홍보센터",

    image: "/img/og/customer.jpg",

    priority: 0.9,

    changefreq: "daily",
  }),

  press: page({
    path: "/Promotion/Press",

    title:
      "서산 이안 스카이원 언론보도 | 이안 스카이원 서산 소식",

    description:
      "서산 이안 스카이원 언론보도 페이지입니다. 서산 동문동 입지와 사업개요, 장기일반민간임대 공급정보, 전용 84㎡ 평면도 및 모델하우스 방문예약 관련 소식을 확인하세요.",

    menu: "홍보센터",

    image: "/img/og/main.jpg",

    priority: 0.9,

    changefreq: "daily",
  }),

  notFound: page({
    path: "/404",

    title:
      "페이지를 찾을 수 없습니다 | 서산 이안 스카이원",

    description:
      "요청하신 페이지를 찾을 수 없습니다. 서산 이안 스카이원 홈페이지의 사업안내, 입지환경, 단지안내, 전용 84㎡ 평면도, 언론보도 및 관심고객등록 메뉴를 이용해 주세요.",

    menu: "오류",

    priority: 0,

    changefreq: "yearly",

    robots: "noindex, follow",
  }),
};

const normalizeSeoPath = (pathname = "/") => {
  let cleanPath = pathname || "/";

  try {
    if (/^https?:\/\//.test(cleanPath)) {
      cleanPath = new URL(cleanPath).pathname;
    }
  } catch {
    cleanPath = "/";
  }

  cleanPath = decodeURI(cleanPath)
    .split("?")[0]
    .split("#")[0]
    .replace(/\/$/, "");

  return cleanPath.toLowerCase() || "/";
};

export const seoPathMap = Object.fromEntries(
  Object.entries(seoPages).map(([key, value]) => [
    normalizeSeoPath(value.path),
    key,
  ])
);

export const seoPageList = Object.values(seoPages).filter(
  (item) => item.robots !== "noindex, follow"
);

export const getAbsoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${siteSeo.siteUrl}${normalizedPath}`;
};

export const getSeoPageByPath = (pathname = "/") => {
  const normalizedPath = normalizeSeoPath(pathname);

  const exactKey = seoPathMap[normalizedPath];

  if (exactKey) return seoPages[exactKey];

  if (normalizedPath.endsWith("/press")) {
    return seoPages.press;
  }

  if (normalizedPath.includes("/promotion/press")) {
    return seoPages.press;
  }

  if (normalizedPath.endsWith("/customer")) {
    return seoPages.customer;
  }

  if (normalizedPath.includes("/promotion/customer")) {
    return seoPages.customer;
  }

  return seoPages.notFound;
};