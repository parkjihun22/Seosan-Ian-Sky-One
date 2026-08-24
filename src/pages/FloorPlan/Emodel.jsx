import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./FloorPlan.module.scss";
import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import EmodelInline from "../../components/EmodelInline/EmodelInline";

const menuContents = [
  { title: "84㎡", url: "/FloorPlan/59A" },
  { title: "106㎡", url: "/FloorPlan/59B" },
  { title: "122㎡", url: "/FloorPlan/84A" },
  { title: "180㎡", url: "/FloorPlan/84B" },
  // { title: "84A", url: "/FloorPlan/114A" },
  // { title: "84B", url: "/FloorPlan/114B" },
  { title: "E-모델하우스", url: "/FloorPlan/Emodel" },
];

const Emodel = () => {
  const [isScroll, setIsScroll] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <Header isChanged={isScroll} />
      <FixIcon />

      <Bener title="E-모델하우스" />
      <MenuBar contents={menuContents} />

      <div className={styles.textBox}>
      <div>
  서산 이안 스카이원 타입별 공간을 온라인으로 확인
</div>

<div>
  전용 84.9㎡ 84A·84B 타입의 구조와 생활 동선을 살펴보세요.
</div>
</div>

      <EmodelInline />

      <Footer />
    </div>
  );
};

export default Emodel;
