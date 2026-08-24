import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import styles from "./Popup.module.scss";
import page1 from "../../assets/Popup/page1.jpg";

const popupArray = [
  { img: page1 },
];

const Popup = ({ openInterestPopup = () => {} }) => {
  const [isClick, setIsClick] = useState(false);

  const [cookies, setCookie] = useCookies();
  const isPopupShown = cookies["Popup_Cookie_PC"];

useEffect(() => {
  if (isPopupShown) return;

  const timer = setTimeout(() => {
    setIsClick(true);
  }, 3000);

  return () => clearTimeout(timer);
}, [isPopupShown]);

const handleTodayClose = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  setCookie("Popup_Cookie_PC", true, {
    path: "/",
    expires,
  });

  setIsClick(false);
};

  const handleClose = () => {
    setIsClick(false);
  };

  const handleReservationClick = () => {
    setIsClick(false);
    openInterestPopup();
  };
  if (isPopupShown) return null;

  return (
    <div className={styles.container}>
      {isClick && (
        <div className={styles.popupBox}>
          <div className={styles.imgContainer}>
            {popupArray.map((value, idx) => (
              <div className={styles.imageBox} key={idx}>
                <img
                  className={styles.popupImg}
                  src={value.img}
                  alt={`popup-image-${idx}`}
                />

                <button
                  type="button"
                  className={styles.visitReservationBtn}
                  onClick={handleReservationClick}
                  aria-label="방문예약 팝업 열기"
                />
              </div>
            ))}
          </div>

          <div className={styles.btnContainer}>
            <button type="button" onClick={handleTodayClose}>
              오늘 하루 보지 않기
            </button>
            <button type="button" onClick={handleClose}>
              닫기
            </button>
          </div>
        </div>
      )}

      <div
        className={styles.openPopupBtn}
        onClick={() => setIsClick(!isClick)}
      >
        <div className={styles.btnIcon}>
          {isClick ? (
            <FaAngleLeft size={20} color="#FFFFFF" />
          ) : (
            <FaAngleRight size={20} color="#FFFFFF" />
          )}
        </div>
        <div className={styles.btnText}>POPUP</div>
      </div>
    </div>
  );
};

export default Popup;