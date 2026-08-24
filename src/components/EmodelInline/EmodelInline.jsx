import { useState } from "react";
import styles from "./EmodelInline.module.scss";

const emodelTabs = [
  {
    id: "84B",
    title: "84B㎡",
    description: "대표 선호 평면의 공간감과 주요 실내 포인트를 확인할 수 있습니다.",
    // url: "https://pg1.lynn.co.kr/upload/Godeok_VR/?type=type4",
  },
  {
    id: "84D",
    title: "84D㎡",
    description: "공간 활용도를 높인 타입의 실내 흐름을 VR로 둘러볼 수 있습니다.",
    // url: "https://xn--289apcxu78q5pay10eghb4a107h3gx0d900a0h0a.com/vr/84c.html",
  },
  {
    id: "94A",
    title: "94A",
    description: "여유로운 중대형 평면의 생활 동선과 실내 구성을 확인할 수 있습니다.",
    // url: "https://xn--289apcxu78q5pay10eghb4a107h3gx0d900a0h0a.com/vr/101.html",
  },
  {
  id: "101A",
  title: "101A",
  description: "여유로운 중대형 평면의 생활 동선과 실내 구성을 확인할 수 있습니다.",
  // url: "https://xn--289apcxu78q5pay10eghb4a107h3gx0d900a0h0a.com/vr/101.html",
  },

];

export default function EmodelInline() {
  const [selectedId, setSelectedId] = useState(emodelTabs[0].id);
  const selectedTab = emodelTabs.find((tab) => tab.id === selectedId);

  return (
    <section className={styles.inlineWrapper} aria-labelledby="emodelInlineTitle">
      <div className={styles.header}>
        <span>E-MODEL HOUSE</span>
        <h3 id="emodelInlineTitle">타입별 사이버 모델하우스</h3>
        <p>{selectedTab.description}</p>
      </div>

      <div className={styles.tabMenu} role="tablist" aria-label="E-모델하우스 타입 선택">
        {emodelTabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            role="tab"
            aria-selected={selectedId === tab.id}
            aria-controls="emodelInlinePanel"
            onClick={() => setSelectedId(tab.id)}
            className={`${styles.tabButton} ${
              selectedId === tab.id ? styles.activeTab : ""
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={styles.vrSection} id="emodelInlinePanel" role="tabpanel">
        <iframe
          key={selectedTab.id}
          className={styles.vrIframe}
          src={selectedTab.url}
          title={`${selectedTab.title} E-모델하우스`}
          allowFullScreen
        />
      </div>
    </section>
  );
}
