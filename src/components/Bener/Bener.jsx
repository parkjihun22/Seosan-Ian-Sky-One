import React, { useEffect, useState } from "react";
import styles from "./Bener.module.scss";
import img from "../../assets/Bener/bener.jpg";

const Bener = ({ title = "서산 이안 스카이원" }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // 이미지가 로드된 후 애니메이션 시작
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true); // 이미지 로딩 후 애니메이션을 시작
        }, 100); // 0.1초 후에 애니메이션을 시작

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            {/* 배너 이미지 */}
            <img
                className={`${styles.benerImage} ${isLoaded ? styles.showImage : ''}`}
                src={img}
                alt="서산 이안 스카이원 배너이미지"
            />
            <div className={styles.overlay}></div>
            <div
                className={`${styles.contents} ${isLoaded ? styles.showContents : ''}`}
            >
                <h1
                    className={`${styles.title} ${isLoaded ? styles.showTitle : ''}`}
                >
                    {title}
                </h1>
                {contents(title, isLoaded)}
            </div>
        </div>
    );
};

export default Bener;

const contents = (text, isLoaded) => {
  const normalizedText = text.replace(/\s/g, "");

  const brandTitles = [
    "홍보영상",
    "브랜드소개",
    "서산이안스카이원",
    "이안스카이원서산",
  ];

  const businessTitles = [
    "사업개요",
    "사업안내",
    "공급일정",
    "공급안내",
    "임대안내",
    "임차인모집공고",
    "입주자모집공고",
    "계약서류안내",
  ];

  const locationTitles = ["입지환경", "입지안내", "프리미엄"];

  const complexTitles = [
    "단지안내",
    "단지배치도",
    "호수배치도",
    "동호수배치도",
    "커뮤니티",
  ];

  const unitTitles = [
    "세대안내",
    "세대안내영상",
    "타입안내",
    "평면안내",
    "평면도",
    "E-모델하우스",
  ];

  const promotionTitles = [
    "홍보센터",
    "언론보도",
    "관심고객등록",
    "방문예약등록",
  ];

  if (brandTitles.includes(normalizedText)) {
    return (
      <>
        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산 이안 스카이원이 선보이는 새로운 프리미엄 주거문화를
          만나보세요.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산시 동문동 중심생활권과 최고 38층 랜드마크로 계획된 이안
          스카이원 서산의 차별화된 주거 가치를 소개합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          10년 장기일반민간임대주택의 사업안내부터 전용 84㎡ 평면정보,
          공급안내와 모델하우스 방문예약까지 한눈에 확인해 보세요.
        </div>
      </>
    );
  } else if (
    businessTitles.includes(normalizedText) ||
    unitTitles.includes(normalizedText) ||
    normalizedText.includes("인테리어")
  ) {
    return (
      <>
        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산 이안 스카이원의 사업개요와 장기일반민간임대 공급정보를
          안내합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산시 동문동 280-2 일원에 들어서는 최고 38층 규모의 공동주택
          372세대와 오피스텔 32실에 관한 정보를 확인해 보세요.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          전용 84㎡ 중심의 84A·84B 주택형과 타입별 평면도, 공간설계 및
          세대정보를 자세히 확인할 수 있습니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          이안 스카이원 서산
        </div>
      </>
    );
  } else if (locationTitles.includes(normalizedText)) {
    return (
      <>
        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산 이안 스카이원의 입지환경과 동문동 중심생활권을 확인해
          보세요.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산공용버스터미널과 서산시청, 생활편의시설 및 교육시설을
          가까이 누리는 편리한 주거환경을 소개합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          29번·32번 국도와 서해안고속도로, 서산 산업단지 배후수요를
          바탕으로 완성되는 이안 스카이원 서산의 입지 가치를 만나보세요.
        </div>
      </>
    );
  } else if (complexTitles.includes(normalizedText)) {
    return (
      <>
        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산 이안 스카이원의 효율적인 단지설계와 프리미엄
          커뮤니티시설을 확인해 보세요.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          101동·102동·103동으로 구성된 단지배치도와 동·호수 배치,
          남향 위주 세대계획을 자세히 안내합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          클럽 이안과 6층 옥상정원, 주민카페, 작은도서관, 골프연습장 등
          입주민을 위한 커뮤니티 계획을 소개합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          이안 스카이원 서산이 제안하는 차별화된 주거 가치를 경험해
          보세요.
        </div>
      </>
    );
  } else if (promotionTitles.includes(normalizedText)) {
    return (
      <>
        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          서산 이안 스카이원의 새로운 공급 소식과 모델하우스 방문예약을
          안내합니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          관심고객등록을 통해 10년 장기일반민간임대 공급조건과 사업일정,
          주택형 및 모델하우스 위치 안내를 받아보실 수 있습니다.
        </div>

        <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
          이안 스카이원 서산의 최신 언론보도와 현장 소식을 빠르게 확인해
          보세요.
        </div>
      </>
    );
  }

  return (
    <div className={`${styles.text} ${isLoaded ? styles.showText : ""}`}>
      서산 이안 스카이원 홈페이지에서 사업개요, 입지환경, 전용 84㎡
      평면도, 장기일반민간임대 공급정보와 모델하우스 방문예약 안내를
      확인하세요.
    </div>
  );
};
