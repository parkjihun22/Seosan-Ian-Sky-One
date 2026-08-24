import React, { useState } from "react";
import styles from "./UnitPlanSection.module.scss";

import UnitplanBox from "../UnitplanBox/UnitplanBox";
import guideImg from "../../assets/Unit/guide-living-room.jpg";
// EmodelInline 컴포넌트 import
import EmodelInline from "../../components/EmodelInline/EmodelInline";

export default function UnitPlanSection() {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <section className={styles.wrapper}>
      {/* ─── 헤더 ─── */}
      <div className={styles.header}>
        <div className={styles.preTitle}>UNITPLAN</div>
        <div className={styles.line} />
        <h2 className={styles.title}>
          {openKey === "types"
            ? "타입안내"
            : openKey === "vr"
            ? "E-모델하우스"
            : "세대안내"}
        </h2>
      </div>

      {/* ─── 배너 (항상 노출) ─── */}
      <div className={styles.banner}>
        <img src={guideImg} alt="세대안내" className={styles.bannerImg} />
      </div>

      {/* ─── 하단 메뉴 (아코디언) ─── */}
      <div className={styles.menuContainer}>
        {/* 타입안내 */}
        <div className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${
              openKey === "types" ? styles.active : ""
            }`}
            onClick={() => toggle("types")}
          >
            <span>타입안내</span>
            <span
              className={`${styles.arrow} ${
                openKey === "types" ? styles.up : styles.down
              }`}
            />
          </button>
          {openKey === "types" && (
            <div className={styles.accordionContent}>
              <UnitplanBox />
            </div>
          )}
        </div>

        {/* 사이버모델하우스 */}
        <div className={styles.accordionItem}>
          <button
            className={`${styles.accordionHeader} ${
              openKey === "vr" ? styles.active : ""
            }`}
            onClick={() => toggle("vr")}
          >
            <span>E-모델하우스</span>
            <span
              className={`${styles.arrow} ${
                openKey === "vr" ? styles.up : styles.down
              }`}
            />
          </button>
          {openKey === "vr" && (
            <div className={styles.accordionContent}>
              <EmodelInline />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
