import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./LocationSectionBox.module.scss";

const LocationSectionBox = ({ image, title, text, onZoom }) => {
  const imageAlt = title.replace(/<[^>]*>/g, " ");

  return (
    <article className={styles.container}>
      <img src={image} alt={`서산 이안 스카이원 ${imageAlt}`} />
      <div className={styles.overlay}></div>

      {onZoom && (
        <button
          type="button"
          className={styles.zoomButton}
          onClick={onZoom}
          aria-label={`${imageAlt} 이미지 크게 보기`}
        >
          <FiSearch />
        </button>
      )}

      <div className={styles.contents}>
        <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </article>
  );
};

export default LocationSectionBox;
