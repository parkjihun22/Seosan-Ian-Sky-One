import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Premium.scss";
import { premiumData } from "./premiumData";

const Premium = () => {
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
      className={`premium ${isActive ? "premium--active" : ""}`}
      aria-labelledby="premiumTitle"
    >
      <div className="premium__inner">
        <header className="premium__head">
          <span>{premiumData.eyebrow}</span>

          <h2 id="premiumTitle">
            {premiumData.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p>{premiumData.description}</p>
        </header>

        <div className="premium__list">
          {premiumData.items.map((item) => (
            <article className="premium__item" key={item.id}>
              <div className="premium__visual" aria-hidden="true">
                <img src={item.icon} alt="" loading="lazy" decoding="async" />
                <span>{item.number}</span>
              </div>

              <div className="premium__content">
                <span className="premium__number">PREMIUM {item.number}</span>
                <h3>{item.title}</h3>
                <strong>{item.subtitle}</strong>
                <p>{item.description}</p>

                <Link to={item.link} className="premium__link">
                  {item.linkText}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;
