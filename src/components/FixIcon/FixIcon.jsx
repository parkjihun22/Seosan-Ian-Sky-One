import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoIosCheckboxOutline } from "react-icons/io";
import { siteSeo } from "../../seo/siteSeoData";
import InterestPopup from "../../components/InterestPopup/InterestPopup";
import styles from "./FixIcon.module.scss";

const FixIcon = ({ type }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [isInterestPopupOpen, setIsInterestPopupOpen] = useState(false);
  const [registration, setRegistration] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const renderDesktopIcon = (content) => {
    if (content === "youtube") {
      return null;
    }

    return null;
  };

  return (
    <>
      {!isMobile ? (
        <>
          {type === "absolute" && renderDesktopIcon("youtube")}
          {renderDesktopIcon()}
        </>
      ) : (
        <div>
          <div className={styles.buttomBtnContainer}>
            <a
              id="phoneConsultation"
              className={styles.btn2}
              href={`tel:${siteSeo.phone}`}
              aria-label="전화상담 연결"
            >
              <PiPhoneCallFill size={18} />
              <div>{siteSeo.phone}</div>
            </a>

            <button
              id="visitReservation"
              className={styles.btn1}
              type="button"
              aria-label="방문예약 팝업 열기"
              onClick={() => setIsInterestPopupOpen(true)}
            >
              <IoIosCheckboxOutline size={18} />
              <div>방문예약</div>
            </button>
          </div>

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

export default FixIcon;
