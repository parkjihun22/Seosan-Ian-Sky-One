import React, { useState, useEffect } from "react";
import styles from "./InterestPopup.module.scss";
import bannerImage from "../../assets/Popup/banner.jpg";

const InterestPopup = ({ onClose, registration, handleInputChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // 모달 열릴 때 히스토리 스택에 빈 엔트리 추가
    window.history.pushState(null, "");

    const handlePopState = () => {
      // 뒤로가기 누르면 모달만 닫고, 스택에 다시 모달 상태 추가
      onClose();
      window.history.pushState(null, "");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      // 언마운트 시 리스너만 제거
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xqpzooqk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      });
      setSuccessMessage(
        res.ok
          ? "등록이 완료되었습니다. <br/>전문상담원이 곧 연락드립니다."
          : "등록에 실패했습니다. 다시 시도해주세요."
      );
    } catch {
      setSuccessMessage("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupWrapper}>
        <div className={styles.popupContainer}>
          <div className={styles.headerImage}>
            <img src={bannerImage} alt="방문예약 배너" />
          </div>
          <div className={styles.formContainer}>
            {successMessage ? (
              <p
                className={styles.successMessage}
                dangerouslySetInnerHTML={{ __html: successMessage }}
              />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>
                    이름<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registration.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>
                    연락처<span>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={registration.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                <label>
                  생년월일<span>*</span>
                </label>
                <input
                  type="text"
                  name="birth"
                  value={registration.birth}
                  onChange={handleInputChange}
                  placeholder="예) 950101"
                  maxLength={6}
                  required
                />
              </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "등록 중..." : "방문예약 등록"}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className={styles.externalCloseBtnBox}>
          <button
            className={styles.externalCloseBtn}
            onClick={() => {
              onClose();
            }}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestPopup;
