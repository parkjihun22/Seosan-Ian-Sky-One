import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiExternalLink, FiFileText } from "react-icons/fi";

import styles from "./SalesInfo.module.scss";
import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import page1 from "../../assets/SalesInfo/SalesInfoAnnouncement/page1.jpg";
import salesInfoAnnouncementData from "./salesInfoAnnouncementData";

const ComplexGuide1 = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isImage2Loaded, setIsImage2Loaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const { menu, hero, summaryCards, pdf, preview, notice } = salesInfoAnnouncementData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const handleImageLoad = () => {
    setIsImage2Loaded(true);
  };

  const openPDF = () => {
    setIsLoading(true);
    const newWindow = window.open(pdf.url, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      window.location.href = pdf.url;
      setIsLoading(false);
      return;
    }

    window.setTimeout(() => setIsLoading(false), 700);
  };

  return (
    <div className={styles.container}>
      <Header isChanged={isScroll} />
      <FixIcon />

      <Bener title="모집공고안내" />
      <MenuBar contents={menu} />

      <main className={styles.announcementPage}>
        <section className={styles.announcementHero} aria-labelledby="announcementTitle">
          <div className={styles.announcementIntro}>
            <span>{hero.eyebrow}</span>
            <h2 id="announcementTitle">{hero.title}</h2>
            <p>{hero.description}</p>
          </div>

          <div className={styles.announcementAction}>
            <div className={styles.announcementCards}>
              {summaryCards.map((card) => (
                <article className={styles.announcementCard} key={card.label}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </div>

            <button type="button" onClick={openPDF} className={styles.summaryPdfButton}>
              <span className={styles.summaryPdfIcon} aria-hidden="true">
                <FiFileText />
              </span>
              <span className={styles.summaryPdfText}>
                <strong>{pdf.title}</strong>
                <em>{pdf.description}</em>
              </span>
              <FiExternalLink className={styles.summaryPdfArrow} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className={styles.announcementPreview} aria-labelledby="announcementPreviewTitle">
          <div className={styles.announcementPreviewHead}>
            <span>{preview.eyebrow}</span>
            <h3 id="announcementPreviewTitle">{preview.title}</h3>
            <p>{preview.description}</p>
          </div>

          <div className={styles.announcementImageFrame}>
            <img
              className={`${styles.announcementImage} ${isImage2Loaded ? styles.showImage2 : ""}`}
              src={page1}
              alt={preview.alt}
              onLoad={handleImageLoad}
            />
          </div>
        </section>

        <aside className={styles.announcementNotice}>
          <p>※ {notice}</p>
        </aside>
      </main>

      {isLoading && (
        <div className={styles.loader}>
          <p>파일을 로딩 중입니다...</p>
          <div className={styles.spinner}></div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ComplexGuide1;
