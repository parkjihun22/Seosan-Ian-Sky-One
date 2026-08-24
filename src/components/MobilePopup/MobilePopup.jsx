import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styles from "./MobilePopup.module.scss";


const MobilePopup = ({ onClosed, popupImage, numbering, openInterestPopup }) => {
    const [type, setType] = useState(0);

    const [cookies, setCookie] = useCookies();
    const isPopupShown = cookies[`Popup_Cookie${numbering}`];

    useEffect(() => {
        if (isPopupShown) {
          onClosed(false);
          return;
        }
      
        if (type === 1) {
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
      
          setCookie(`Popup_Cookie${numbering}`, true, {
            path: "/",
            expires,
          });
      
          onClosed(false);
        }
      
        if (type === 2) {
          onClosed(false);
        }
      }, [
        type,
        isPopupShown,
        numbering,
        onClosed,
        setCookie,
      ]);

  const handleReservationClick = () => {
    onClosed(false);
    openInterestPopup();
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.popupImageBox}>
          <img
            className={styles.popupImg}
            src={popupImage}
            alt={`popup-image-${numbering}`}
          />

          <button
            type="button"
            className={styles.visitReservationBtn}
            onClick={handleReservationClick}
            aria-label="방문예약 팝업 열기"
          />
        </div>

        <div className={styles.btnContainer}>
          <div
            className={styles.todayNotOpenBtn}
            onClick={() => setType(1)}
          >
            오늘 하루 보지 않기
          </div>

          <div
            className={styles.closeBtn}
            onClick={() => setType(2)}
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePopup;