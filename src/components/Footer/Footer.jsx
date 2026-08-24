import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Footer.module.scss";
import InterestPopup from "../InterestPopup/InterestPopup";
import footerData from "./footerData";

const Footer = ({ data = footerData }) => {
  const [isFamilyOpen, setFamilyOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [registration, setRegistration] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const familySiteList = (
    <ul id="footer-family-site-list" className={styles.familyList}>
      {data.familySites.map((site) => (
        <li key={site.name}>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            {site.name}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className={styles.footer} aria-labelledby="footerTitle">
      <div className={styles.inner}>
        <div className={styles.brandArea}>
          <span className={styles.eyebrow}>서산 이안 스카이원</span>
          <h2 id="footerTitle">{data.siteName}</h2>
          <p>{data.description}</p>
          <p>{data.notice}</p>
        </div>

        <div className={styles.infoArea}>
          <a href={`tel:${data.phone.replace(/-/g, "")}`} className={styles.phone}>
            <IoCall aria-hidden="true" />
            <span>{data.phone}</span>
          </a>

          <dl className={styles.company}>
            <div>
              <dt>{data.company.label}</dt>
              <dd>{data.company.name}</dd>
            </div>
          </dl>

          <nav className={styles.footerNav} aria-label="하단 주요 메뉴">
            {data.links.map((link) => (
              <Link to={link.url} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.reserveBtn}
              onClick={() => setPopupOpen(true)}
            >
              방문예약 바로가기
            </button>

            <div className={styles.familySite}>
              <button
                type="button"
                className={styles.familyBtn}
                onClick={() => setFamilyOpen((prev) => !prev)}
                aria-expanded={isFamilyOpen}
                aria-controls="footer-family-site-list"
              >
                FAMILY SITE
                {isFamilyOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isFamilyOpen && familySiteList}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{data.copyright}</p>
      </div>

      <noscript>
        <div className={styles.familySiteNoscript}>
          <h3>FAMILY SITE</h3>
          {familySiteList}
        </div>
      </noscript>

      {isPopupOpen && (
        <InterestPopup
          onClose={() => setPopupOpen(false)}
          registration={registration}
          handleInputChange={handleInputChange}
        />
      )}
    </footer>
  );
};

export default Footer;
