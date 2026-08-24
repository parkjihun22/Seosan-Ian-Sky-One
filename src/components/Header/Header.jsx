// src/components/Header/Header.jsx

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { IoCall, IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";

import styles from "./Header.module.scss";
import SlideMenu from "../../components/SlideMenu/SlideMenu";
import logoImage from "../../assets/logo/mainlogo.png";
import bannerGif from "../../assets/logo/uptool.gif";
import mainlogowhite from "../../assets/logo/mainlogowhite.jpg";
import InterestPopup from "../../components/InterestPopup/InterestPopup";

const T = {
  siteName: "서산 이안 스카이원",

  phoneConsult: "전화상담",
  mobileMenu: "모바일 메뉴 열기",
  popupOpen: "관심고객 등록 팝업 열기",
  mainMenu: "주요 메뉴",
  logoAlt: "서산 이안 스카이원 로고",
  bannerAlt: "서산 이안 스카이원 방문예약 안내 배너",
};

const menuArray = [
  {
    title: "브랜드소개",
    subMenu: [
      { subTitle: "브랜드소개", subUrl: "/Brand/intro" },
      // { subTitle: "홍보영상", subUrl: "/Brand/video" },
    ],
  },
  {
    title: "사업안내",
    subMenu: [
      { subTitle: "사업안내", subUrl: "/BusinessGuide/intro" },
      { subTitle: "분양일정", subUrl: "/BusinessGuide/plan" },
    ],
  },
  {
    title: "입지환경",
    subMenu: [
      { subTitle: "입지안내", subUrl: "/LocationEnvironment/intro" },
      { subTitle: "프리미엄", subUrl: "/LocationEnvironment/primium" },
    ],
  },
  {
    title: "단지안내",
    subMenu: [
      { subTitle: "단지배치도", subUrl: "/ComplexGuide/intro" },
      { subTitle: "호수배치도", subUrl: "/ComplexGuide/detailintro" },
      { subTitle: "커뮤니티", subUrl: "/ComplexGuide/community" },
    ],
  },
  {
    title: "분양안내",
    subMenu: [
      { subTitle: "공급안내", subUrl: "/BusinessGuide/documents" },
      { subTitle: "입주자 모집공고", subUrl: "/SalesInfo/announcement" },
      { subTitle: "계약서류안내", subUrl: "/SalesInfo/guide" },
    ],
  },
  {
    title: "타입안내",
    subMenu: [
      { subTitle: "84.9㎡ ", subUrl: "/FloorPlan/59A" },
      { subTitle: "84A㎡", subUrl: "/FloorPlan/59B" },
      { subTitle: "84B㎡", subUrl: "/FloorPlan/84A" },
      // { subTitle: "180㎡", subUrl: "/FloorPlan/84B" },
      // { subTitle: "84㎡A", subUrl: "/FloorPlan/114A" },
      // { subTitle: "84㎡B", subUrl: "/FloorPlan/114B" },
      // { subTitle: "E-모델하우스", subUrl: "/FloorPlan/Emodel" },
    ],
  },
  {
    title: "홍보센터",
    subMenu: [
      { subTitle: "언론보도", subUrl: "/Promotion/Press" },
      { subTitle: "관심고객등록", subUrl: "/Promotion/Customer" },
    ],
  },
];

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isInterestPopupOpen, setIsInterestPopupOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const [registration, setRegistration] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  if (isMobile) {
    return (
      <>
        <div className={styles.gifBanner}>
          <img src={bannerGif} alt={T.bannerAlt} />
        </div>

        <header className={styles.mobileHeader}>
          <Link to="/" className={styles.mobileLogoLink}>
            <img src={mainlogowhite} alt={T.logoAlt} className={styles.logo} />
          </Link>

          <div className={styles.mobileRight}>
            <a
              href="tel:1533-8848"
              className={styles.mobileCallBtn}
              aria-label={T.phoneConsult}
            >
              <IoCall className={styles.icon} size={25} />
            </a>

            <button
              type="button"
              className={styles.mobileIconBtn}
              onClick={() => setIsMobileMenu((v) => !v)}
              aria-label={T.mobileMenu}
            >
              {!isMobileMenu ? (
                <AiOutlineMenu className={styles.icon} size={32} />
              ) : (
                <IoCloseSharp className={styles.icon} size={35} />
              )}
            </button>
          </div>
        </header>

        {isMobileMenu && (
          <SlideMenu
            contents={menuArray}
            onClose={() => setIsMobileMenu(false)}
            reservationUrl="/Promotion/Customer"
          />
        )}

        {isInterestPopupOpen && (
          <InterestPopup
            onClose={() => setIsInterestPopupOpen(false)}
            registration={registration}
            handleInputChange={handleInputChange}
          />
        )}
      </>
    );
  }

  return (
    <div
      className={`${styles.headerWrapper} ${
        hoveredMenu !== null ? styles.dropdownOpen : ""
      }`}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className={styles.gifBanner}>
        <img src={bannerGif} alt={T.bannerAlt} />
      </div>

      <header className={styles.headerInitial}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImage} alt={T.logoAlt} className={styles.logo} />
        </Link>

        <div className={styles.menuArea}>
          <nav
            className={styles.itemBox}
            aria-label={T.mainMenu}
            onMouseEnter={() => setHoveredMenu((current) => current ?? 0)}
          >
            {menuArray.map((menu, idx) => (
              <div
                key={menu.title}
                className={styles.navItem}
                onMouseEnter={() => setHoveredMenu(idx)}
              >
                <Link to={menu.subMenu[0].subUrl} className={styles.navLink}>
                  {menu.title}
                </Link>
              </div>
            ))}
          </nav>

          <div className={styles.dropdownContainer}>
            <div className={styles.dropdownInner}>
              {menuArray.map((menu, menuIndex) => (
                <div
                  key={menu.title}
                  className={`${styles.dropdownGroup} ${
                    hoveredMenu === menuIndex ? styles.dropdownGroupActive : ""
                  }`}
                  onMouseEnter={() => setHoveredMenu(menuIndex)}
                >
                  <div className={styles.dropdownList}>
                    {menu.subMenu.map((submenu) => (
                      <Link
                        key={submenu.subTitle}
                        to={submenu.subUrl}
                        className={styles.dropdownItem}
                      >
                        {submenu.subTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={styles.phoneNumber}
          onClick={() => setIsInterestPopupOpen(true)}
          type="button"
          aria-label={T.popupOpen}
        >
          <IoCall size={20} />
          <span>1533-8848</span>
        </button>
      </header>

      {isInterestPopupOpen && (
        <InterestPopup
          onClose={() => setIsInterestPopupOpen(false)}
          registration={registration}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
