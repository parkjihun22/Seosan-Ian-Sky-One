import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Promotion.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const samplePress = [
  {
    id: 1,
    title: "서산 이안 스카이원 분양 안내",
    date: "2024.07.21",
    summary: "청주 지북동 949세대 분양 정보와 모델하우스 방문예약 안내.",
    image: "/img/sample1.jpg",
  },
  {
    id: 2,
    title: "청주 지북동 주거 가치 안내",
    date: "2024.07.20",
    summary: "미래 가치와 개발계획 발표.",
    image: "/img/sample2.jpg",
  },
];

function PressList() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className={styles.pressListContainer}>
        <div className={styles.pressListHeader}>
          <h2 className={styles.title}>언론보도</h2>
          <button
            className={styles.writeButton}
            onClick={() => navigate("/Promotion/PressWrite")}
          >
            글쓰기
          </button>
        </div>
        {samplePress.map((item) => (
          <div
            key={item.id}
            className={styles.pressItem}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/Promotion/Press/${item.id}`)}
          >
            <img src={item.image} alt={item.title} className={styles.pressImg} />
            <div>
              <div style={{ fontWeight: "bold" }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: 14 }}>{item.date}</div>
              <div>{item.summary}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
export default PressList;
