import React from "react";
import { Link } from "react-router-dom";
import styles from "./MobileNewsSection.module.scss";
import placeholder from "../../assets/news/placeholder.jpg"; // 플레이스홀더 이미지

/**
 * newsList: [
 *   { id, title, excerpt, date, link, image? }
 * ]
 */
const MobileNewsSection = ({ newsList }) => (
  <section className={styles.newsSection}>
    <h2 className={styles.sectionTitle}>현장 NEWS</h2>

    <div className={styles.newsGrid}>
      {newsList.map((item) => (
        <Link to={item.link} key={item.id} className={styles.card}>
          <div className={styles.imageWrapper}>
            {item.image ? (
              <img src={item.image} alt={item.title} />
            ) : (
              <img src={placeholder} alt="기본 이미지" />
            )}
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardExcerpt}>{item.excerpt}</p>
            <div className={styles.cardDate}>{item.date}</div>
          </div>
        </Link>
      ))}
    </div>

    <div className={styles.more}>
      <Link to="/Promotion/Press">보도자료 더 보기 &gt;</Link>
    </div>
  </section>
);

export default MobileNewsSection;
