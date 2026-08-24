// src/components/MobileOverviewSection/MobileOverviewSection.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./MobileOverviewSection.module.scss";

// 1) 모바일 메인 히어로 이미지
import heroImage from "../../assets/Main/heroImage.jpg";
// 2) 입지환경 지도
import mobileMap from "../../assets/LocationEnvironment/LocationEnvironment1/page1.jpg";
import mobileMap2 from "../../assets/LocationEnvironment/LocationEnvironment2/page2.jpg";
// 3) 프리미엄 슬라이드 이미지들
import slide1 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-1.jpg";
import slide2 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-2.jpg";
import slide3 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-3.jpg";
import slide4 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-4.jpg";
import slide5 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-5.jpg";
import slide6 from "../../assets/LocationEnvironment/LocationEnvironment1/session2-6.jpg";

const items = [
  {
    key: "overview",
    label: "사업개요",
    content: (
      <ul className={styles.detailList}>
        <li>
          <strong>현장명</strong>
          <span>서산 이안 스카이원</span>
        </li>

        <li>
          <strong>대지위치</strong>
          <span>충청남도 서산시 동문동 280-2</span>
        </li>

        <li>
          <strong>공동주택</strong>
          <span>
            총 372세대 / 지하 2층 ~ 지상 최고 38층 / 총 3개동
          </span>
        </li>

        <li>
          <strong>오피스텔</strong>
          <span>주거형 오피스텔 총 32실</span>
        </li>

        <li>
          <strong>공동주택 주택형</strong>
          <span>전용 84.9㎡ / 84A · 84B</span>
        </li>

        <li>
          <strong>오피스텔 주택형</strong>
          <span>전용 84.9㎡ / 84OA</span>
        </li>
      </ul>
    ),
  },

  {
    key: "location",
    label: "입지환경",
    content: (
      <div className={styles.mapGrid}>
        <img
          src={mobileMap}
          className={styles.mapImage}
          alt="서산 이안 스카이원 동문동 입지환경 지도"
        />

        <img
          src={mobileMap2}
          className={styles.mapImage}
          alt="이안 스카이원 서산 중심생활권과 주변 인프라 지도"
        />
      </div>
    ),
  },

  {
    key: "premium",
    label: "프리미엄",
    content: (
      <>
        {/* 프리미엄 섹션 상단 문단 */}
        <div className={styles.premiumIntro}>
          <h3 className={styles.premiumTitle}>GREAT PREMIUM</h3>

          <p className={styles.premiumSubtitle}>
            서산의 중심에서 시작되는<br />
            서산 이안 스카이원 라이프
          </p>
        </div>

        {/* 슬라이더 */}
        <PremiumSlider />
      </>
    ),
  },
];

function PremiumSlider() {
  const slides = [
    {
      img: slide1,
      title: "서산 동문동 중심생활권",
      desc:
        "서산공용버스터미널과 서산시청을 가까이 누리는 입지<br/>쇼핑·의료·문화·교육시설이 모인 중심상업지역<br/>생활의 편리함을 높이는 원스톱 생활환경",
    },

    {
      img: slide2,
      title: "서산 최고 38층 랜드마크",
      desc:
        "지하 2층부터 지상 최고 38층 규모의 주거단지<br/>서산 도심의 새로운 스카이라인을 완성하는 상징성<br/>개방감과 조망을 고려한 이안 스카이원 서산",
    },

    {
      img: slide3,
      title: "전용 84㎡ 중심 372세대",
      desc:
        "실수요자 선호도가 높은 전용 84.9㎡ 중심 구성<br/>84A 186세대와 84B 186세대의 효율적인 평면<br/>남향 위주로 계획된 편안한 주거공간",
    },

    {
      img: slide4,
      title: "일상의 품격을 높이는 클럽 이안",
      desc:
        "주민카페·작은도서관·골프연습장 등 커뮤니티 계획<br/>건강과 여가, 휴식과 소통을 위한 다양한 공간<br/>6층 옥상정원과 함께 누리는 여유로운 일상",
    },

    {
      img: slide5,
      title: "생활을 배려한 특화설계",
      desc:
        "현관 앞에서 편리하게 이용하는 세대 전용창고 계획<br/>2.6m 광폭 주차면과 개방감을 높이는 유리난간<br/>입주민의 생활 편의를 고려한 차별화된 주거설계",
    },

    {
      img: slide6,
      title: "산업과 교통의 미래가치",
      desc:
        "대산·대죽산업단지와 서산오토밸리 배후수요<br/>29번·32번 국도와 서해안고속도로 광역 교통망<br/>직주근접과 미래가치를 함께 품은 서산 이안 스카이원",
    },
  ];

  
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrent((c) => (c + 1 + slides.length) % slides.length);
  const prevSlide = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX == null || touchEndX == null) return;
    const dist = touchStartX - touchEndX;
    if (dist > 50) nextSlide();
    else if (dist < -50) prevSlide();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className={styles.premiumSlider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slide}>
        <img src={slides[current].img} alt="" />
        <div className={styles.caption}>
          <h4
            dangerouslySetInnerHTML={{ __html: slides[current].title.replace(/\n/g, "<br/>") }}
          />
          <p
            dangerouslySetInnerHTML={{ __html: slides[current].desc }}
          />
        </div>
      </div>
      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={idx === current ? styles.dotActive : styles.dot}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MobileOverviewSection() {
  const [openKey, setOpenKey] = useState(null);
  const itemRefs = useRef({});

  const toggle = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const targetItem = itemRefs.current[key];
        if (!targetItem) return;

        const fixedHeaderOffset = 96;
        const targetTop =
          window.scrollY + targetItem.getBoundingClientRect().top - fixedHeaderOffset;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "auto",
        });
      });
    });
  };

  return (
    <section className={styles.overviewSection}>
      {/* ─── 헤더 영역 ─── */}
      <header className={styles.overviewHeader}>
      <div className={styles.preTitle}>PYEONGTAEK GODEOK WOOMIRIN</div>
        <div className={styles.line} />
        <h2 className={styles.mainTitle}>사업안내</h2>
      </header>

      <img src={heroImage} className={styles.heroImage} alt="서산 이안 스카이원 히어로 메인사진" />

      {/* ─── 아코디언 항목 ─── */}
      {items.map(({ key, label, content }) => (
        <div
          key={key}
          className={styles.accordionItem}
          ref={(node) => {
            itemRefs.current[key] = node;
          }}
        >
          <button
            type="button"
            className={`${styles.accordionHeader} ${openKey === key ? styles.active : ""}`}
            onClick={() => toggle(key)}
            aria-expanded={openKey === key}
          >
            <span className={styles.label}>{label}</span>
            <span className={`${styles.arrow} ${openKey === key ? styles.up : styles.down}`} />
          </button>
          {openKey === key && <div className={styles.accordionContent}>{content}</div>}
        </div>
      ))}
    </section>
  );
}
