import React, { useState } from "react";
import styles from "./DarkComplexSection.module.scss";

// → 배경으로 쓸 이미지 import (잉여라면 지우셔도 됩니다)
import bgImg from "../../assets/ComplexGuide/ComplexGuide1/bg-section.jpg";
// → 탭에 들어갈 이미지 import
import layoutImg    from "../../assets/ComplexGuide/ComplexGuide1/page1.webp";
import designImg    from "../../assets/ComplexGuide/ComplexGuide2/page1.webp";
import communityImg from "../../assets/ComplexGuide/ComplexGuide3/page1.jpg";
import bennerImg from "../../assets/ComplexGuide/ComplexGuide1/complex-1024x573.jpg";


const items = [
  { key: "layout",    label: "단지배치도",    img: layoutImg },
  { key: "design",    label: "단지특화설계",  img: designImg },
  { key: "community", label: "커뮤니티",      img: communityImg },
];

export default function DarkComplexSection() {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div
      className={styles.wrapper}
      style={{
        // 기존 배경용 이미지 (원하시면 지우세요)
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <header className={styles.header}>
        <div className={styles.preTitle}>COMPLEX</div>
        <div className={styles.line} />
        <h2 className={styles.mainTitle}>단지안내</h2>
      </header>

      {/* ← 여기서 배너 이미지를 넣어줍니다 */}
      <div className={styles.banner}>
        <img
          src={bennerImg}           // 단지배치도 이미지 미리보기용
          alt="단지 전경 배너"
          className={styles.bannerImg}
        />
      </div>

      {items.map(({ key, label, img }) => (
        <div key={key} className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${
              openKey === key ? styles.active : ""
            }`}
            onClick={() => toggle(key)}
          >
            <span className={styles.label}>{label}</span>
            <span
              className={`${styles.arrow} ${
                openKey === key ? styles.up : styles.down
              }`}
            />
          </button>

          {openKey === key && (
            <div className={styles.accordionContent}>
              <img src={img} alt={label} className={styles.contentImage} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
