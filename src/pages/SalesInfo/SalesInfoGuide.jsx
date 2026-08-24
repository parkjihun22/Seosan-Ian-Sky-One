import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SalesInfo.module.scss";

import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";

import page1 from "../../assets/SalesInfo/guide/page1.jpg";

import Ready from "../../components/Ready/Ready"


const ComplexGuide1 = () => {
  const menuContents = [
    { title: "공급안내", url: "/BusinessGuide/documents" },
    { title: "모집공고안내", url: "/SalesInfo/announcement" },
    { title: "계약서류안내", url: "/SalesInfo/guide" },
    // { title: "인지세납부안내", url: "/SalesInfo/stampTax" },
    // { title: "청약방법안내", url: "/SalesInfo/SubscriptionGuide" },
  ];

  const [isScroll, setIsScroll] = useState(false);

  // 이미지 애니메이션용
  const [isImage2Loaded, setIsImage2Loaded] = useState(false);

  const { pathname } = useLocation();

  // 페이지 이동 시 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 헤더 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 이미지 로드 완료
  const handleImageLoad = () => {
    setIsImage2Loaded(true);
  };

  return (
    <div className={styles.container}>
      <Header isChanged={isScroll} />

      <FixIcon />

      <Bener title="분양안내" />

      <MenuBar contents={menuContents} />

      <div className={styles.textBox}>
        <div>모델하우스 방문전 서류를 확인하세요</div>
        <div>서산 이안 스카이원 서류안내</div>
      </div>

      {/* <img
        className={`${styles.image2} ${
          isImage2Loaded ? styles.showImage2 : ""
        }`}
        src={page1}
        alt="서산 이안 스카이원 서류안내 이미지"
        onLoad={handleImageLoad}
      /> */}

      <Ready/>

      <div className={styles.commonBox2}>
        <div className={styles.notice}>
          ※ 상기 이미지는 고객의 이해를 돕기 위한 것으로 성공적인 청약을 위해
          도움을 드리고 있습니다.
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComplexGuide1;