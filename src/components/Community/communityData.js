import bgImage from "../../assets/ComplexGuide/ComplexGuide1/bg-section.jpg";
import bannerImage from "../../assets/ComplexGuide/ComplexGuide1/complex-1024x573.jpg";
import layoutImage from "../../assets/ComplexGuide/ComplexGuide1/page1.webp";
import designImage from "../../assets/ComplexGuide/ComplexGuide2/page1.webp";
import communityImage from "../../assets/ComplexGuide/ComplexGuide3/page1.jpg";

export const communityData = {
  eyebrow: "COMMUNITY",

  title: "서산의 새로운 주거 가치를 완성하는 프리미엄 단지",

  description:
    "서산 이안 스카이원은 최고 38층, 3개 동으로 계획된 랜드마크 주거단지입니다. 남향 위주의 세대 배치와 효율적인 주거동 구성, 입주민의 여가와 소통을 고려한 클럽 이안 커뮤니티를 통해 편리하고 품격 있는 주거환경을 제공합니다.",

  backgroundImage: bgImage,

  banner: {
    image: bannerImage,
    alt: "서산 이안 스카이원 최고 38층 프리미엄 단지 전경",
  },

  items: [
    {
      id: "complex-layout",
      label: "단지 배치도",

      title: "남향 위주로 계획된 효율적인 단지 배치",

      description:
        "서산 이안 스카이원은 101동·102동·103동, 총 3개 주거동으로 구성되며 채광과 통풍, 세대별 조망과 생활 동선을 고려한 남향 위주의 단지 배치를 통해 쾌적한 주거환경을 계획했습니다.",

      image: layoutImage,
      alt: "서산 이안 스카이원 101동 102동 103동 단지 배치도",
    },

    {
      id: "complex-design",
      label: "단지 특화설계",

      title: "편리한 생활을 위한 차별화된 특화설계",

      description:
        "최고 38층의 상징적인 외관과 개방감을 높이는 발코니 유리난간, 현관 앞 세대 전용창고, 2.6m 광폭 주차면 및 6층 옥상정원 등 일상의 편의와 주거 만족도를 높이는 특화설계를 계획했습니다.",

      image: designImage,
      alt: "이안 스카이원 서산 유리난간 세대창고 광폭주차 특화설계",
    },

    {
      id: "community-space",
      label: "커뮤니티",

      title: "입주민의 일상을 풍요롭게 만드는 클럽 이안",

      description:
        "이안 스카이원 서산은 주민카페와 작은도서관, 실버클럽, 골프연습장, 운동시설, 어린이놀이터 및 입주민회의실 등 건강과 여가, 휴식과 소통을 위한 다양한 커뮤니티 공간을 계획하고 있습니다.",

      image: communityImage,
      alt: "서산 이안 스카이원 클럽 이안 입주민 커뮤니티 시설",
    },
  ],
};