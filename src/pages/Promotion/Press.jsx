import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";

import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { getAbsoluteUrl, seoPages, siteSeo } from "../../seo/siteSeoData";
import { pressArticles } from "./pressArticles";
import {
  defaultPressSource,
  getPressSiteId,
  pressCollectionName,
} from "./pressConfig";

import styles from "./Promotion.module.scss";

const PAGE_SIZE = 10;

const toDate = (value) => {
  if (!value) return null;
  if (value.toDate) return value.toDate();
  if (value instanceof Date) return value;
  const normalized = String(value).replace(/\./g, "-").replace(/\s/g, "");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (article) => {
  const source = article.date || article.publishedAt;
  const date = toDate(source);

  if (!date) return article.date || "";

  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "");
};

const getArticleSummary = (article) => article.summary || article.excerpt || "";

const getArticlePath = (basePath, article) =>
  `${basePath}/${article.slug || article.id}`;

const sortArticlesByDate = (items) =>
  [...items].sort((a, b) => {
    const aTime = toDate(a.date || a.publishedAt)?.getTime() || 0;
    const bTime = toDate(b.date || b.publishedAt)?.getTime() || 0;

    return bTime - aTime;
  });

export default function Press() {
  const { site: routeSite } = useParams();
  const site = getPressSiteId(routeSite);
  const pressBasePath = routeSite ? `/${site}/press` : "/Promotion/Press";
  const pressAdminPath = routeSite
    ? `/${routeSite}/press/admin`
    : "/Promotion/Press/Admin";
  const customerPath = routeSite ? `/${site}/customer` : "/Promotion/Customer";
  const [articles, setArticles] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [user, setUser] = useState(null);

  const displayArticles = articles.length > 0 ? articles : pressArticles;

  const seoPage = useMemo(
    () => ({
      ...seoPages.press,
      path: pressBasePath,
      pageType: "CollectionPage",
      description:
        "서산 이안 스카이원 언론보도 페이지입니다. 김포 고촌 한강 생활권, 공급 정보, 청약, 입지환경, 모델하우스 방문예약 관련 공식 보도자료와 분양 소식을 확인하세요.",
      extraSchemas: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${getAbsoluteUrl(pressBasePath)}#press-list`,
          name: "서산 이안 스카이원 언론보도 목록",
          itemListElement: displayArticles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: getAbsoluteUrl(getArticlePath(pressBasePath, article)),
            name: article.title,
          })),
        },
      ],
    }),
    [displayArticles, pressBasePath]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setArticles([]);
    setLastVisible(null);
    setHasMore(false);
    loadArticles(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site]);

  async function loadArticles(isNew = false) {
    try {
      const colRef = collection(db, pressCollectionName);
      let pressQuery = query(
        colRef,
        where("siteId", "==", site),
        limit(PAGE_SIZE)
      );

      if (!isNew && lastVisible) {
        pressQuery = query(
          colRef,
          where("siteId", "==", site),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      }

      const snap = await getDocs(pressQuery);
      const docs = snap.docs.map((docSnap) => ({
        id: docSnap.id,
        source: defaultPressSource,
        label: "언론보도",
        ...docSnap.data(),
      }));

      setArticles((prev) => sortArticlesByDate(isNew ? docs : [...prev, ...docs]));
      setLastVisible(snap.docs[snap.docs.length - 1] || null);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch {
      setHasMore(false);
    }
  }

  async function handleDeleteArticle(article) {
    const confirmed = window.confirm(
      `"${article.title}" 글을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.`
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, pressCollectionName, article.id));
      setArticles((prev) => prev.filter((item) => item.id !== article.id));
    } catch {
      alert("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <>
      <SEO page={seoPage} />
      <Header />
      <Bener title="언론보도" />
      <MenuBar
        contents={[
          { title: "언론보도", url: pressBasePath },
          { title: "방문예약등록", url: customerPath },
        ]}
      />
      <FixIcon />

      <main className={styles.pressWrap}>
        <section className={styles.pressHero} aria-labelledby="pressTitle">
          <div>
            <span className={styles.pressKicker}>MEDIA CENTER</span>
            <h1 id="pressTitle" className={styles.pressTitle}>
              서산 이안 스카이원 언론보도
            </h1>
            <p className={styles.pressLead}>
              김포 고촌 한강 생활권과 공급 정보부터 청약, 입지환경,
              모델하우스 방문예약까지 서산 이안 스카이원의 공식 보도자료와
              분양 소식을 전합니다.
            </p>
            <Link className={styles.pressAdminShortcut} to={pressAdminPath}>
              관리자 페이지
            </Link>
          </div>

          <div className={styles.pressStats} aria-label="서산 이안 스카이원 주요 정보">
            <div>
              <strong>{siteSeo.project.households}</strong>
              <span>공급 규모</span>
            </div>
            <div>
              <strong>{siteSeo.project.block}</strong>
              <span>사업 위치</span>
            </div>
            <div>
              <strong>{displayArticles.length}건</strong>
              <span>등록 소식</span>
            </div>
          </div>
        </section>

        <section className={styles.pressList} aria-label="언론보도 목록">
          {displayArticles.map((article) => (
            <article className={styles.pressCard} key={article.id}>
              <div className={styles.pressCardHeader}>
                <span>{article.source || defaultPressSource}</span>
                <time dateTime={article.publishedAt || undefined}>
                  {formatDate(article)}
                </time>
              </div>

              <Link
                className={styles.pressCardTitle}
                to={getArticlePath(pressBasePath, article)}
              >
                {article.title}
              </Link>

              <p className={styles.pressCardSummary}>
                {getArticleSummary(article)}
              </p>

              <div className={styles.pressCardFooter}>
                <span>{article.label || "언론보도"}</span>
                {user && article.siteId && (
                  <div className={styles.pressInlineAdmin}>
                    <Link
                      to={`${pressAdminPath}?edit=${encodeURIComponent(
                        article.slug || article.id
                      )}`}
                    >
                      수정하기
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(article)}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
                <Link
                  className={styles.pressView}
                  to={getArticlePath(pressBasePath, article)}
                  aria-label={`${article.title} 상세 보기`}
                >
                  VIEW
                </Link>
              </div>
            </article>
          ))}
        </section>

        {hasMore && articles.length > 0 && (
          <div className={styles.loadMore}>
            <button type="button" onClick={() => loadArticles(false)}>
              더보기
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
