import { useEffect, useRef, useState } from "react";
import "./Community.scss";
import { communityData } from "./communityData";

const Community = () => {
  const [activeId, setActiveId] = useState(communityData.items[0].id);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);
  const activeItem = communityData.items.find((item) => item.id === activeId);

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
        threshold: 0.25,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`community ${isActive ? "community--active" : ""}`}
      aria-labelledby="communityTitle"
      style={{ backgroundImage: `url(${communityData.backgroundImage})` }}
    >
      <div className="community__overlay" aria-hidden="true" />

      <div className="community__inner">
        <header className="community__head">
          <span>{communityData.eyebrow}</span>
          <h2 id="communityTitle">{communityData.title}</h2>
          <p>{communityData.description}</p>
        </header>

        <div className="community__grid">
          <div className="community__banner">
          </div>

          <div className="community__panel">
            <div className="community__tabs" role="tablist" aria-label="단지 안내 선택">
              {communityData.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  role="tab"
                  aria-selected={activeId === item.id}
                  aria-controls="communityPanel"
                  className={activeId === item.id ? "community__tab is-active" : "community__tab"}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <article className="community__detail" id="communityPanel" role="tabpanel">
              <div className="community__text">
                <span>{activeItem.label}</span>
                <h3>{activeItem.title}</h3>
                <p>{activeItem.description}</p>
              </div>

              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.alt}
                loading="lazy"
                decoding="async"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
