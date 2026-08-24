const reservationData = {
  eyebrow: "RESERVATION",

  title: "서산 이안 스카이원 모델하우스 방문예약",

  description:
    "서산 이안 스카이원 방문예약을 남겨주시면 전문 상담원이 순차적으로 연락드려 모델하우스 위치와 방문 가능 시간, 전용 84㎡ 주택형 및 10년 장기일반민간임대 공급정보를 안내해 드립니다.",

  notice:
    "방문 전 관심 타입과 상담 희망 내용을 남겨주시면 84A·84B 평면 비교와 공급일정, 임대조건 및 계약절차에 관한 상담을 더욱 정확하게 도와드릴 수 있습니다.",

  formAction: "https://formspree.io/f/xqpzooqk",

  points: [
    {
      id: "address",

      label: "ADDRESS SMS",

      title: "모델하우스 주소 안내",

      text: "방문예약 등록 후 상담 절차에 따라 이안 스카이원 서산 모델하우스 위치와 방문 방법을 안내해 드립니다.",
    },

    {
      id: "unit",

      label: "UNIT CHECK",

      title: "관심 주택형 상담",

      text: "전용 84.9㎡로 구성된 84A·84B 타입별 평면과 공간 구성, 생활 동선을 비교해 안내합니다.",
    },

    {
      id: "schedule",

      label: "RENTAL GUIDE",

      title: "민간임대 공급안내",

      text: "10년 장기일반민간임대 공급일정과 임대조건, 계약절차 등 의사결정에 필요한 정보를 상담합니다.",
    },
  ],

  fields: [
    {
      id: "name",

      name: "name",

      label: "고객명",

      type: "text",

      placeholder: "고객명을 입력해 주세요",

      required: true,

      autoComplete: "name",
    },

    {
      id: "phone",

      name: "phone",

      label: "연락처",

      type: "tel",

      placeholder: "010-0000-0000",

      required: true,

      inputMode: "tel",

      autoComplete: "tel",

      pattern: "^01[0-9][-\\s]?[0-9]{3,4}[-\\s]?[0-9]{4}$",

      title: "예: 01012345678 또는 010-1234-5678",
    },
  ],

  messageField: {
    id: "message",

    name: "message",

    label: "문의 내용",

    placeholder:
      "관심 타입, 방문 희망일, 장기민간임대 상담 희망 내용을 남겨주세요",

    rows: 5,
  },

  submitLabel: "방문예약 등록",
};

export default reservationData;