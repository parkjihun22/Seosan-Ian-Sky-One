// src/pages/Promotion/PressDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { getAbsoluteUrl, seoPages, siteSeo } from "../../seo/siteSeoData";
import { findPressArticle } from "./pressArticles";
import {
  defaultPressSource,
  getPressSiteId,
  pressCollectionName,
} from "./pressConfig";

import styles from "./Promotion.module.scss";

const toDate = (value) => {
  if (!value) return null;
  if (value.toDate) return value.toDate();
  if (value instanceof Date) return value;
  const normalized = String(value).replace(/\./g, "-").replace(/\s/g, "");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toIsoString = (value) => {
  const date = toDate(value);
  return date ? date.toISOString() : undefined;
};

const formatDate = (article) => {
  const date = toDate(article.date || article.publishedAt);

  if (!date) return article.date || "";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getArticleSummary = (article) => article.summary || article.excerpt || "";

const getArticleBody = (article) => {
  return String(article.content || getArticleSummary(article));
};

const normalizeExternalUrl = (value = "") => {
  const rawValue = String(value).trim();
  if (!rawValue) return "";

  const matchedUrl =
    rawValue.match(/https?:\/\/[^\s)]+/i)?.[0] ||
    rawValue.match(/www\.[^\s)]+/i)?.[0] ||
    "";

  if (!matchedUrl) return "";
  if (/^https?:\/\//i.test(matchedUrl)) return matchedUrl;

  return `https://${matchedUrl}`;
};

export default function PressDetail() {
  const { id, site: routeSite } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const site = getPressSiteId(routeSite);
  const pressBasePath = routeSite ? `/${routeSite}/press` : "/Promotion/Press";
  const customerPath = routeSite ? `/${routeSite}/customer` : "/Promotion/Customer";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const ref = doc(db, pressCollectionName, id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          if (!data.siteId || data.siteId === site) {
            updateDoc(ref, { views: increment(1) }).catch(() => {});
            setArticle({
              id: snap.id,
              source: defaultPressSource,
              label: "언론보도",
              ...data,
            });
            return;
          }
        }

        const slugQuery = query(
          collection(db, pressCollectionName),
          where("slug", "==", id),
          limit(20)
        );
        const slugSnap = await getDocs(slugQuery);
        const slugDoc = slugSnap.docs.find((item) => {
          const itemSiteId = item.data().siteId;
          return !itemSiteId || itemSiteId === site;
        });

        if (slugDoc) {
          const data = slugDoc.data();
          updateDoc(doc(db, pressCollectionName, slugDoc.id), {
            views: increment(1),
          }).catch(() => {});
          setArticle({
            id: slugDoc.id,
            source: defaultPressSource,
            label: "언론보도",
            ...data,
          });
          return;
        }
      } catch {
        // 기본 보도자료로 이어서 표시합니다.
      }

      const fallback = findPressArticle(id);
      if (fallback) {
        setArticle(fallback);
        return;
      }

      navigate(pressBasePath);
    };

    fetchArticle();
  }, [id, navigate, pressBasePath, site]);

  const seoPage = useMemo(() => {
    if (!article) return null;

    const detailPath = `${pressBasePath}/${article.slug || id}`;
    const publishedAt = article.publishedAt || toIsoString(article.date);
    const image = article.seoImage || article.image || siteSeo.ogImage;
    const imageUrl = getAbsoluteUrl(image);

    return {
      ...seoPages.press,
      path: detailPath,
      title: `${article.title} | ${siteSeo.siteName} 언론보도`,
      description:
        getArticleSummary(article) ||
        `${siteSeo.siteName} 언론보도 상세 페이지입니다.`,
      image,
      ogType: "article",
      article: {
        publishedTime: publishedAt,
        modifiedTime: article.modifiedAt || publishedAt,
        section: "언론보도",
      },
      extraSchemas: [
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "@id": `${getAbsoluteUrl(detailPath)}#newsarticle`,
          headline: article.title,
          description: getArticleSummary(article),
          datePublished: publishedAt,
          dateModified: article.modifiedAt || publishedAt,
          inLanguage: "ko-KR",
          image: [imageUrl],
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": getAbsoluteUrl(detailPath),
          },
          author: {
            "@type": "Organization",
            name: article.source || siteSeo.siteName,
          },
          publisher: {
            "@id": siteSeo.organizationId,
          },
          about: {
            "@id": `${siteSeo.siteUrl}/#apartment`,
          },
        },
      ],
    };
  }, [article, id, pressBasePath]);

  if (!article) return null;

  const originalUrl = normalizeExternalUrl(article.sourceUrl);

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

      <main className={styles.pressDatailWrap}>
        <article className={styles.pressDetailArticle}>
          <header className={styles.pressDetailHeader}>
            <span className={styles.pressKicker}>
              {article.label || "언론보도"}
            </span>
            <h1 className={styles.pageTitle}>{article.title}</h1>

            <div className={styles.modalMeta}>
              <span>{article.source || defaultPressSource}</span>
              <time dateTime={article.publishedAt || undefined}>
                {formatDate(article)}
              </time>
              <span>조회수 {article.views || 0}</span>
            </div>
          </header>

          <div className={styles.modalBody}>{getArticleBody(article)}</div>

          <div className={styles.pressDetailActions}>
            {originalUrl && (
              <a
                className={styles.originalLink}
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                원문 보기
              </a>
            )}
            <Link className={styles.pressDetailCloseBtn} to={pressBasePath}>
              목록으로
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
