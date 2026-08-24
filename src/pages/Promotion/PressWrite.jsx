import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";

import Header from "../../components/Header/Header";
import Bener from "../../components/Bener/Bener";
import MenuBar from "../../components/MenuBar/MenuBar";
import FixIcon from "../../components/FixIcon/FixIcon";
import Footer from "../../components/Footer/Footer";
import {
  defaultPressSource,
  getPressSiteId,
  pressCollectionName,
} from "./pressConfig";
import styles from "./Promotion.module.scss";

const emptyForm = {
  slug: "",
  source: defaultPressSource,
  label: "언론보도",
  title: "",
  summary: "",
  content: "",
  sourceUrl: "",
  image: "",
};

const normalizePressSlug = (value) =>
  value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[/?#\\]+/g, "-");

const normalizeSourceUrl = (value) => {
  const rawValue = value.trim();
  if (!rawValue) return "";

  const matchedUrl =
    rawValue.match(/https?:\/\/[^\s)]+/i)?.[0] ||
    rawValue.match(/www\.[^\s)]+/i)?.[0] ||
    "";

  if (!matchedUrl) return "";
  if (/^https?:\/\//i.test(matchedUrl)) return matchedUrl;

  return `https://${matchedUrl}`;
};

const getDateText = (value) => {
  if (!value) return "";
  const date = value.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ko-KR");
};

const sortArticlesByDate = (items) =>
  [...items].sort((a, b) => {
    const aDate = a.date?.toDate ? a.date.toDate() : new Date(a.date || 0);
    const bDate = b.date?.toDate ? b.date.toDate() : new Date(b.date || 0);
    const aTime = Number.isNaN(aDate.getTime()) ? 0 : aDate.getTime();
    const bTime = Number.isNaN(bDate.getTime()) ? 0 : bDate.getTime();

    return bTime - aTime;
  });

function PressWrite() {
  const { site: routeSite } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedEdit = searchParams.get("edit");
  const initialSiteId = getPressSiteId(routeSite);
  const [selectedSiteId, setSelectedSiteId] = useState(initialSiteId);
  const site = selectedSiteId.trim() || initialSiteId;
  const pressBasePath = routeSite ? `/${routeSite}/press` : "/Promotion/Press";
  const customerPath = routeSite ? `/${routeSite}/customer` : "/Promotion/Customer";
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [form, setForm] = useState(emptyForm);
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setSelectedSiteId(initialSiteId);
  }, [initialSiteId]);

  useEffect(() => {
    if (user) {
      loadArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, site]);

  const loadArticles = async () => {
    const pressQuery = query(
      collection(db, pressCollectionName),
      where("siteId", "==", site),
      limit(30)
    );
    const snap = await getDocs(pressQuery);
    setArticles(
      sortArticlesByDate(
        snap.docs.map((item) => ({ id: item.id, ...item.data() }))
      )
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("info");

    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      setLoginForm({ email: "", password: "" });
    } catch {
      setMessage("로그인 정보를 다시 확인해주세요.");
      setMessageType("error");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setArticles([]);
    setEditingId("");
    setForm(emptyForm);
    setMessage("");
    setMessageType("info");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setForm({
      slug: article.slug || article.id || "",
      source: article.source || emptyForm.source,
      label: article.label || emptyForm.label,
      title: article.title || "",
      summary: article.summary || "",
      content: article.content || "",
      sourceUrl: article.sourceUrl || "",
      image: article.image || "",
    });
    setMessage("");
    setMessageType("info");
  };

  useEffect(() => {
    if (!requestedEdit || editingId || articles.length === 0) return;

    const targetArticle = articles.find(
      (article) => article.slug === requestedEdit || article.id === requestedEdit
    );

    if (targetArticle) {
      handleEdit(targetArticle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedEdit, articles, editingId]);

  const handleNew = () => {
    setEditingId("");
    setForm(emptyForm);
    setMessage("");
    setMessageType("info");

    if (requestedEdit) {
      navigate(location.pathname, { replace: true });
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;

    const confirmed = window.confirm(
      "선택한 언론보도 글을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    setIsSaving(true);
    setMessage("삭제 중입니다. 잠시만 기다려주세요.");
    setMessageType("info");

    try {
      await deleteDoc(doc(db, pressCollectionName, editingId));
      setForm(emptyForm);
      setEditingId("");
      setMessage("언론보도 글이 삭제되었습니다.");
      setMessageType("success");
      await loadArticles();
    } catch {
      setMessage("삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageType("error");
    }

    setIsSaving(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEditing = Boolean(editingId);
    setIsSaving(true);
    setMessage(
      isEditing
        ? "수정 내용을 저장 중입니다. 잠시만 기다려주세요."
        : "새 언론보도 글을 등록 중입니다. 잠시만 기다려주세요."
    );
    setMessageType("info");

    const payload = {
      siteId: site,
      slug: normalizePressSlug(form.slug),
      source: form.source.trim() || emptyForm.source,
      label: form.label.trim() || emptyForm.label,
      title: form.title.trim(),
      summary: form.summary.trim(),
      content: form.content,
      sourceUrl: normalizeSourceUrl(form.sourceUrl),
      image: form.image.trim(),
      updatedAt: serverTimestamp(),
    };

    try {
      if (payload.slug) {
        const slugQuery = query(
          collection(db, pressCollectionName),
          where("slug", "==", payload.slug),
          limit(20)
        );
        const slugSnap = await getDocs(slugQuery);
        const sameSlugDoc = slugSnap.docs.find(
          (item) => item.data().siteId === site
        );

        if (sameSlugDoc && sameSlugDoc.id !== editingId) {
          setMessage("이미 사용 중인 상세주소입니다. 다른 값을 입력해주세요.");
          setMessageType("error");
          setIsSaving(false);
          return;
        }
      }

      if (editingId) {
        await updateDoc(doc(db, pressCollectionName, editingId), payload);
        setMessage("수정 저장이 완료되었습니다. 언론보도 페이지에 반영되었습니다.");
        setMessageType("success");
      } else {
        const newArticle = {
          ...payload,
          date: serverTimestamp(),
          views: 0,
          authorEmail: user.email,
        };

        await addDoc(collection(db, pressCollectionName), newArticle);

        setMessage("새 언론보도 글이 등록되었습니다.");
        setMessageType("success");
        setForm(emptyForm);
        setEditingId("");
      }

      await loadArticles();
    } catch {
      setMessage("저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageType("error");
    }

    setIsSaving(false);
  };

  return (
    <>
      <Header />
      <Bener title="언론보도" />
      <MenuBar
        contents={[
          { title: "언론보도", url: pressBasePath },
          { title: "방문예약등록", url: customerPath },
        ]}
      />
      <FixIcon />

      <main className={styles.pressAdminWrap}>
        <section className={styles.pressAdminHead}>
          <div>
            <span className={styles.pressKicker}>PRESS ADMIN</span>
            <h1>언론보도 관리</h1>
            <p>
              등록한 글은 언론보도 목록에 바로 표시됩니다. 검색 노출을 더
              탄탄하게 하려면 등록 후 사이트맵과 RSS에도 글 주소를 반영하세요.
            </p>
          </div>
          <Link className={styles.originalLink} to={pressBasePath}>
            목록 보기
          </Link>
        </section>

        {!user ? (
          <form className={styles.pressAdminLogin} onSubmit={handleLogin}>
            <label>
              관리자 이메일
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              비밀번호
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                required
              />
            </label>
            <button type="submit">로그인</button>
            {message && <p>{message}</p>}
          </form>
        ) : (
          <div className={styles.pressAdminGrid}>
            <aside className={styles.pressAdminList}>
              <div className={styles.pressAdminBar}>
                <strong>{user.email}</strong>
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>

              <button
                type="button"
                className={styles.pressNewButton}
                onClick={handleNew}
              >
                새 글쓰기
              </button>

              <label className={styles.pressSiteField}>
                관리 현장 ID
                <input
                  value={selectedSiteId}
                  onChange={(event) => {
                    setSelectedSiteId(event.target.value);
                    setEditingId("");
                    setForm(emptyForm);
                    setMessage("");
                    setMessageType("info");
                  }}
                  placeholder="예: 서산 이안 스카이원"
                />
              </label>

              {articles.map((article) => (
                <button
                  type="button"
                  key={article.id}
                  className={
                    editingId === article.id
                      ? styles.pressAdminItemActive
                      : styles.pressAdminItem
                  }
                  onClick={() => handleEdit(article)}
                >
                  <span>{article.title}</span>
                  <em>{getDateText(article.date)} · 클릭해서 수정</em>
                </button>
              ))}
            </aside>

            <form className={styles.pressAdminForm} onSubmit={handleSubmit}>
              {editingId && (
                <div className={styles.pressEditingNotice}>
                  <strong>현재 글 수정 중</strong>
                  <span>내용을 바꾸고 수정 저장을 누르거나 삭제할 수 있습니다.</span>
                </div>
              )}

              <label>
                상세주소
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="예: 1 또는 modelhouse-open"
                />
              </label>
              <label>
                언론사/출처
                <input
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                />
              </label>
              <label>
                분류
                <input
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  placeholder="예: 보도자료, 분양소식"
                />
              </label>
              <label>
                제목
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                요약
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                본문
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                원문 링크
                <input
                  name="sourceUrl"
                  value={form.sourceUrl}
                  onChange={handleChange}
                  placeholder="예: https://www.kpinews.kr/news/articleView.html?idxno=..."
                />
              </label>
              <label>
                대표 이미지 주소
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/img/og/main.jpg"
                />
              </label>

              {message && (
                <p
                  className={`${styles.pressAdminMessage} ${
                    messageType === "success"
                      ? styles.pressAdminMessageSuccess
                      : messageType === "error"
                      ? styles.pressAdminMessageError
                      : styles.pressAdminMessageInfo
                  }`}
                >
                  {message}
                </p>
              )}

              <div className={styles.pressAdminActions}>
                {editingId && (
                  <button
                    type="button"
                    className={styles.pressDeleteButton}
                    onClick={handleDelete}
                    disabled={isSaving}
                  >
                    삭제하기
                  </button>
                )}
                <button type="submit" disabled={isSaving}>
                  {isSaving ? "저장 중..." : editingId ? "수정 저장" : "등록하기"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default PressWrite;
