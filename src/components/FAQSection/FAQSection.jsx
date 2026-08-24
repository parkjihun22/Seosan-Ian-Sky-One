import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./FAQSection.module.scss";
import faqData from "./faqData";

const FAQSection = ({
  title = faqData.title,
  subTitle = faqData.description,
  data = faqData,
}) => {
  const items = Array.isArray(data) ? data : data.items;
  const keywords = Array.isArray(data) ? faqData.keywords : data.keywords;
  const eyebrow = Array.isArray(data) ? faqData.eyebrow : data.eyebrow;
  const [openIndex, setOpenIndex] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => {
      const nextIndex = prev === index ? null : index;

      if (nextIndex !== null) {
        window.requestAnimationFrame(() => {
          const item = document.querySelector(`[data-faq-item="${nextIndex}"]`);
          item?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }

      return nextIndex;
    });
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section
        className={styles.faqSection}
        aria-labelledby="faqTitle"
        data-native-scroll-section="true"
      >
        <div className={styles.faqInner}>
          <div className={styles.faqTitleBox}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 id="faqTitle">{title}</h2>
            <p>{subTitle}</p>

            <div className={styles.keywordBox} aria-label="FAQ 주요 키워드">
              {keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>

          <div className={styles.faqList}>
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${item.id || index}`;
              const buttonId = `faq-question-${item.id || index}`;

              return (
                <article
                  key={item.id || item.question}
                  className={`${styles.faqItem} ${isOpen ? styles.active : ""}`}
                  data-faq-item={index}
                >
                  <span className={styles.category}>{item.category}</span>

                  <button
                    id={buttonId}
                    type="button"
                    className={styles.questionButton}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className={styles.questionText}>
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                      {item.question}
                    </span>
                    <span className={styles.icon} aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={styles.answerWrap}
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    <div className={styles.answerBox}>
                      <strong>A.</strong>
                      <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
