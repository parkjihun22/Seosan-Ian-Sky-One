import { useEffect, useRef, useState } from "react";
import "./Location.scss";
import { locationData } from "./locationData";

const Location = ({ onReserve }) => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`location ${isActive ? "location--active" : ""}`}
      aria-labelledby="locationTitle"
    >
      <div className="location__inner">
        <div className="location__content">
          <span className="location__eyebrow">{locationData.eyebrow}</span>

          <h2 id="locationTitle">
            {locationData.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p>{locationData.description}</p>

          <div className="location__points">
            {locationData.points.map((point) => (
              <div className="location__point" key={point.id}>
                <strong>{point.number}</strong>
                <span>{point.title}</span>
              </div>
            ))}
          </div>

          <button type="button" className="location__button" onClick={onReserve}>
            {locationData.cta}
          </button>
        </div>

        <div className="location__visual">
          <img
            src={locationData.image.src}
            alt={locationData.image.alt}
            loading="lazy"
            decoding="async"
          />

          <div className="location__badge">
            <span>{locationData.badge.label}</span>
            <strong>{locationData.badge.title}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
