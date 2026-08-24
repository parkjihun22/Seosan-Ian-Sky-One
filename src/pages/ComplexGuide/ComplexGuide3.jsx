import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ComplexGuide.module.scss";
import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import page1 from "../../assets/ComplexGuide/ComplexGuide3/page1.jpg";

import Ready from "../../components/Ready/Ready"


const ComplexGuide3 = () => {
  const menuContents = [
    { title: "단지 배치도", url: "/ComplexGuide/intro" },
    { title: "호수 배치도", url: "/ComplexGuide/detailintro" },
    { title: "커뮤니티", url: "/ComplexGuide/community" },
  ];
  const [isScroll, setIsScroll] = useState(false);
  const [isImage2Loaded, setIsImage2Loaded] = useState(false); // 이미지 로딩 상태 추가
  const { pathname } = useLocation(); // 현재 경로를 가져옴

  // 이미지가 로드되면 호출되는 함수
  const handleImageLoad = () => {
    setIsImage2Loaded(true); // 이미지가 로드되면 상태 업데이트
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지가 로드될 때 스크롤을 최상단으로 이동
  }, [pathname]); // pathname이 변경될 때마다 실행

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
<Header isChanged={isScroll} />
<FixIcon />

<Bener title="커뮤니티" />
<MenuBar contents={menuContents} />
<div className={styles.textBox}>
  <div>서산의 중심에서 시작되는 프리미엄 라이프</div>
  <div>서산 이안 스카이원, 최고 38층·공동주택 372세대</div>
</div>


<img
  className={`${styles.image2} ${isImage2Loaded ? styles.showImage2 : ''}`}
  src={page1}
  alt="서산 이안 스카이원 커뮤니티 및 입주민 편의시설 안내 이미지"
  onLoad={handleImageLoad}
/>


      <div className={styles.commonBox}>
              <div className={styles.notice}>
                ※ 커뮤니티 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 날 수 있습니다
              </div>
              <div className={styles.notice}>
                ※ 커뮤니티내 조경 및 세부계획, 시설물의 위치는 실제 시공시 현장 상황에 따라 변경될 수 있습니다
              </div>
            </div>

      <Footer />
    </div>
  );
};

export default ComplexGuide3;
