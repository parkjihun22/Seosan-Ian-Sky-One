import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

// PC와 모바일 메인 화면 스타일을 함께 관리합니다.
import styles from "./Main.module.scss";
import QuickInfo from "../../components/QuickInfo/QuickInfo";
import Premium from "../../components/Premium/Premium";
import Location from "../../components/Location/Location";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FixIcon from "../../components/FixIcon/FixIcon";
import UnitplanBox from "../../components/UnitplanBox/UnitplanBox";
import MobileOverviewSection from "../../components/MobileOverviewSection/MobileOverviewSection";
import Community from "../../components/Community/Community";
import InterestPopup from "../../components/InterestPopup/InterestPopup";
import UnitInfoSection from "../../components/UnitInfoSection/UnitInfoSection";
import FAQSection from "../../components/FAQSection/FAQSection"
import ReservationSection from "../../components/ReservationSection/ReservationSection";

import mainImage from "../../assets/Main/Main1.jpg";
import mobileImageMain from "../../assets/Main/mobileMain1.jpg";



const Main = () => {


  const [isScroll, setIsScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInterestPopupOpen, setIsInterestPopupOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const [registration, setRegistration] = useState({
    name: "",
    phone: "",
    birthday: "",
    residence: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 스크롤 여부에 따라 Header 상태를 갱신합니다.
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 관심고객 팝업이 열렸을 때 배경 스크롤을 잠그고 키보드 포커스를 팝업 안에 유지합니다.
  useEffect(() => {
    if (isInterestPopupOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const modal =
        document.querySelector('[role="dialog"]') ||
        document.querySelector("[data-interest-popup]") ||
        document.querySelector(".InterestPopup") ||
        document.body;

      const focusable = modal.querySelectorAll?.(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];

      const onKeyDown = (e) => {
        if (e.key !== "Tab" || !first || !last) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      setTimeout(() => {
        first?.focus?.();
      }, 0);

      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        document.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isInterestPopupOpen]);

  // PC에서는 휠 이동으로 메인 섹션을 한 화면씩 넘깁니다.
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e) => {
      const nativeScrollSection = e.target.closest?.("[data-native-scroll-section='true']");

      const activeTag = document.activeElement?.tagName;
      const isFormFocus = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
        activeTag || ""
      );

      if (nativeScrollSection || isFormFocus || isInterestPopupOpen) return;

      e.preventDefault();

      if (isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0) {
        if (page < 8.5) {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        if (page > 1) {
          setPage((prevPage) => prevPage - 1);
        }
      }

      setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [page, isScrolling, isMobile, isInterestPopupOpen]);

  // 현재 페이지 번호에 맞춰 PC 화면의 스크롤 위치를 이동합니다.
  useEffect(() => {
    if (isMobile) return;

    const posTop = (page - 1) * window.innerHeight;

    window.scrollTo({
      top: posTop,
      behavior: "smooth",
    });
  }, [page, isMobile]);

  return (
    <>

      {!isMobile ? (
        // PC 메인 화면
        <>
          <Header isChanged={isScroll} />

          <div className={styles.imageContainer}>
          <img
            src={mainImage}
            className={styles.mainImage}
            alt="서산 이안 스카이원 메인 조감도"
          />

          <div className={styles.overlay}></div>

          <div className={styles.mainImageTextBox}>
          <p className={styles.heroEyebrow}>
            IAAN SKYONE SEOSAN
          </p>

          <h1 className={styles.heroTitle}>
            서산 이안 스카이원
          </h1>

          <div className={styles.heroKeyword}>
            충청남도 서산시 동문동 280-2
            <br />
            전용 84.9㎡ · 84A · 84B
            <br />
            공동주택 372세대 · 주거형 오피스텔 32실
          </div>

          <p className={styles.heroDesc}>
            서산의 중심에서 하늘을 소유하다
            <br />
            최고 38층 프리미엄 랜드마크
            <br />
            이안 스카이원 서산
            <br />
            10년 장기일반민간임대 공급안내 및 방문예약
          </p>


            <button
              type="button"
              onClick={() => setIsInterestPopupOpen(true)}
              className={styles.heroReserveBtn}
              aria-label="방문예약 열기"
            >
              방문예약
            </button>

            <div className={styles.heroScroll}>
              <span>SCROLL</span>
              <i></i>
            </div>
          </div>
          </div>
          <div className={styles.section}>
          <QuickInfo />
            </div>




          <div className={styles.section}>
            <Location onReserve={() => setIsInterestPopupOpen(true)} />
          </div>

          <div className={styles.section}>
            <Premium />
          </div>

          <div className={styles.section}>
            <div className={styles.section4}>
              <div className={styles.textBox}>
                <UnitplanBox />
                <Link to="/FloorPlan/59A" className={styles.text2}>
                  더 알아보기 {">"}
                </Link>
              </div>
            </div>
          </div>
          <FAQSection />

          <ReservationSection
            registration={registration}
            handleInputChange={handleInputChange}
          />

          <div className={styles.section5}>
            <Footer />
          </div>
          {/* 관심고객 등록 팝업 - PC */}
          {isInterestPopupOpen && (
            <InterestPopup
              onClose={() => setIsInterestPopupOpen(false)}
              registration={registration}
              handleInputChange={handleInputChange}
            />
          )}
        </>
      ) : (
        // 모바일 메인 화면
          <div className={styles.mobileMain}>
            <Header isChanged={isScroll} />

            <div className={styles.imageContainer}>
              <img
                src={mobileImageMain}
                className={styles.mainImage}
                alt="서산 이안 스카이원 모바일 메인 조감도"
              />

              <div className={styles.overlay}></div>

              <div className={styles.mainImageTextBox1}>
              <p className={styles.heroEyebrow1}>
                IAAN SKYONE SEOSAN
              </p>

              <h1 className={styles.heroTitle1}>
                서산 이안 스카이원
              </h1>

              <div className={styles.heroKeyword1}>
                충청남도 서산시 동문동 280-2
                <br />
                공동주택 전용
                <br />
                84.9㎡ · 84A · 84B
                <br />
                공동주택 372세대 · 오피스텔 32실
              </div>

              <p className={styles.heroDesc1}>
                서산의 중심에서 하늘을 소유하다
                <br />
                최고 38층 프리미엄 랜드마크
                <br />
                이안 스카이원 서산
                <br />
                10년 장기일반민간임대 방문예약
              </p>
            <button
              type="button"
              onClick={() => setIsInterestPopupOpen(true)}
              className={styles.heroReserveBtn1}
              aria-label="방문예약 열기"
            >
              방문예약
            </button>
          </div>
          </div>
          <MobileOverviewSection />
          <Location onReserve={() => setIsInterestPopupOpen(true)} />

          <section className={styles.darkSection}>
            <Community />
          </section>

          <Premium />
          <UnitInfoSection />
          <FAQSection />

          <ReservationSection
            registration={registration}
            handleInputChange={handleInputChange}
          />

          <div className={styles.section5}>
            <Footer />
            <FixIcon />
          </div>
          {/* 관심고객 등록 팝업 - 모바일 */}
          {isInterestPopupOpen && (
            <InterestPopup
              onClose={() => setIsInterestPopupOpen(false)}
              registration={registration}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
