import { useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "./UnitplanBox.module.scss";
import { unitPlanData } from "./unitPlanData";

const UnitplanBox = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = unitPlanData.plans[activeIndex];

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < unitPlanData.plans.length - 1;

  const imageKey = useMemo(() => activePlan.id, [activePlan.id]);

  const movePlan = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= unitPlanData.plans.length) return;
    setActiveIndex(nextIndex);
  };

  return (
    <section className={styles.unitPlan} aria-labelledby="unitPlanTitle">
      <div className={styles.header}>
        <span>{unitPlanData.eyebrow}</span>
        <h2 id="unitPlanTitle">{unitPlanData.title}</h2>
        <p>{unitPlanData.description}</p>
      </div>

      <div className={styles.tabList} role="tablist" aria-label="평면 타입 선택">
        {unitPlanData.plans.map((plan, index) => (
          <button
            type="button"
            key={plan.id}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="unitPlanPanel"
            className={activeIndex === index ? styles.activeTab : styles.tab}
            onClick={() => movePlan(index)}
          >
            {plan.type}
          </button>
        ))}
      </div>

      <div className={styles.info}>
        <span>{activePlan.type}</span>
        <h3>{activePlan.name}</h3>
        <p>{activePlan.summary}</p>
      </div>

      <article className={styles.viewer} id="unitPlanPanel" role="tabpanel">
        <button
          type="button"
          className={`${styles.arrowButton} ${!canGoPrev ? styles.disabled : ""}`}
          onClick={() => movePlan(activeIndex - 1)}
          disabled={!canGoPrev}
          aria-label="이전 평면도 보기"
        >
          <AiOutlineLeft aria-hidden="true" />
        </button>

        <div className={styles.imageArea}>
          <img
            key={imageKey}
            src={activePlan.image}
            alt={activePlan.alt}
            className={styles.planImage}
            loading="lazy"
            decoding="async"
          />
        </div>

        <button
          type="button"
          className={`${styles.arrowButton} ${!canGoNext ? styles.disabled : ""}`}
          onClick={() => movePlan(activeIndex + 1)}
          disabled={!canGoNext}
          aria-label="다음 평면도 보기"
        >
          <AiOutlineRight aria-hidden="true" />
        </button>
      </article>
    </section>
  );
};

export default UnitplanBox;
