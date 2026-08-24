import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

import styles from "./LocationEnvironment.module.scss";
import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import LocationSectionBox from "../../components/LocationSectionBox/LocationSectionBox";
import page1 from "../../assets/LocationEnvironment/LocationEnvironment1/page1.jpg";
import section2Image1 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-1.jpg";
import section2Image2 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-2.jpg";
import section2Image3 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-3.jpg";
import section2Image4 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-4.jpg";
import section2Image5 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-5.jpg";
import section2Image6 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-6.jpg";

const locationMenu = [
  { title: "입지안내", url: "/LocationEnvironment/intro" },
  { title: "프리미엄", url: "/LocationEnvironment/primium" },
];

const locationSections = [
  {
    img: section2Image1,

    titleText:
      "서산 중심상업지역에서 누리는<br />편리한 도심 생활권",

    contentText:
      "충청남도 서산시 동문동 280-2 일원에 들어서는 서산 이안 스카이원<br />교통·행정·쇼핑·의료·문화시설을 가까이 누리는 중심 입지",
  },

  {
    img: section2Image2,

    titleText:
      "서산과 수도권을 연결하는<br />편리한 광역 교통망",

    contentText:
      "29번·32번 국도와 서해안고속도로를 이용할 수 있는 교통환경<br />당진과 수도권 및 충남 주요 지역으로 연결되는 광역 교통망",
  },

  {
    img: section2Image3,

    titleText:
      "생활을 더욱 편리하게 만드는<br />풍부한 도심 인프라",

    contentText:
      "서산공용버스터미널과 서산시청, 동부시장, 서산의료원 등을 가까이 이용하고<br />쇼핑·문화·외식시설까지 편리하게 누리는 원스톱 생활권",
  },

  {
    img: section2Image4,

    titleText:
      "안심 통학을 고려한<br />우수한 교육환경",

    contentText:
      "서산초등학교와 병설유치원, 석림중학교, 서산중앙고등학교 등<br />다양한 교육시설을 가까이 이용할 수 있는 편리한 교육환경",
  },

  {
    img: section2Image5,

    titleText:
      "산업단지를 가까이 누리는<br />직주근접 프리미엄",

    contentText:
      "대산·대죽산업단지와 서산오토밸리, 서산테크노밸리 등<br />주요 산업지역의 배후수요를 품은 이안 스카이원 서산",
  },

  {
    img: section2Image6,

    titleText:
      "최고 38층·전용 84㎡<br />서산의 새로운 랜드마크",

    contentText:
      "공동주택 372세대와 주거형 오피스텔 32실로 계획된 주거단지<br />서산의 새로운 스카이라인을 완성할 서산 이안 스카이원",
  },
];
const LocationEnvironment1 = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!zoomImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setZoomImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomImage]);

  const openZoom = (src, alt) => {
    setZoomImage({ src, alt });
  };

  return (
    <div className={styles.container}>
      <Header isChanged={isScroll} />
      <FixIcon />

      <Bener title="입지환경" />
      <MenuBar contents={locationMenu} />

      <div className={styles.textBox}>
  <div>서산의 주요 산업단지와 함께 성장하는</div>
  <div>동문동 중심생활권의 프리미엄 라이프</div>
  <div>서산 이안 스카이원이 새로운 주거 가치를 완성합니다.</div>
</div>

<figure className={styles.locationMapFrame}>
  <img
    src={page1}
    className={styles.image2}
    alt="서산 이안 스카이원 동문동 입지환경과 중심생활권 안내 지도"
  />

  <button
    type="button"
    className={styles.zoomButton}
    onClick={() =>
      openZoom(
        page1,
        "서산 이안 스카이원 동문동 입지환경과 중심생활권 안내 지도"
      )
    }
    aria-label="서산 이안 스카이원 입지환경 이미지 크게 보기"
  >
          <FiSearch />
          <span>크게 보기</span>
        </button>
      </figure>

      <div className={styles.section2}>
        {locationSections.map((value) => (
          <LocationSectionBox
            key={value.titleText}
            image={value.img}
            title={value.titleText}
            text={value.contentText}
            onZoom={() =>
              openZoom(
                value.img,
                `서산 이안 스카이원 ${value.titleText.replace(/<[^>]*>/g, " ")} 이미지`
              )
            }
          />
        ))}
      </div>

      <div className={styles.commonBox}>
        <div className={styles.notice}>
          본 홍보물의 내용과 이미지는 소비자의 이해를 돕기 위한 것으로, 개발 예정 및 교통,
          학교 계획 등에 관한 사항은 해당 기관의 자료를 토대로 제작되었습니다. 사업계획 및
          일정은 관계 기관과 사업 주체의 사정에 따라 변경될 수 있으며, 자세한 내용은
          입주자모집공고와 관계 기관의 최종 고시를 확인하시기 바랍니다.
        </div>
      </div>

      {zoomImage && (
        <div
          className={styles.zoomModal}
          role="dialog"
          aria-modal="true"
          aria-label="이미지 확대 보기"
          onClick={() => setZoomImage(null)}
        >
          <div className={styles.zoomModalInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.zoomClose}
              onClick={() => setZoomImage(null)}
              aria-label="확대 이미지 닫기"
            >
              <FiX />
            </button>
            <img src={zoomImage.src} alt={zoomImage.alt} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LocationEnvironment1;
