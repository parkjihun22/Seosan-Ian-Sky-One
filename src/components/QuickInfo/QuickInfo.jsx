import "./QuickInfo.scss";
import Counter from "./Counter";
import { quickInfoData } from "./quickInfoData";

const QuickInfo = () => {
  const [mainItem, ...subItems] = quickInfoData.items;

  return (
    <section className="quickInfo" aria-labelledby="quickInfoTitle">
      <div className="quickInfo__bgText" aria-hidden="true">
        {quickInfoData.backgroundText}
      </div>

      <div className="quickInfo__inner">
        <div className="quickInfo__head">
          <span>{quickInfoData.eyebrow}</span>

          <h2 id="quickInfoTitle">
            {quickInfoData.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p>{quickInfoData.description}</p>
        </div>

        <div className="quickInfo__content">
          <article className="quickInfo__mainCard">
            <div>
              <span className="quickInfo__cardLabel">{mainItem.label}</span>

              <div className="quickInfo__mainNumber">
                <Counter
                  end={mainItem.value}
                  suffix={mainItem.suffix}
                  duration={mainItem.duration}
                />
              </div>
            </div>

            <p>{mainItem.description}</p>
          </article>

          <div className="quickInfo__sideGrid">
            {subItems.map((item) => (
              <article className="quickInfo__miniCard" key={item.id}>
                <span className="quickInfo__cardLabel">{item.label}</span>

                <div className="quickInfo__miniNumber">
                  <Counter
                    end={item.value}
                    suffix={item.suffix}
                    duration={item.duration}
                  />
                </div>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;
