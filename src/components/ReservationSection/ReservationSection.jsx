import reservationData from "./reservationData";
import "./ReservationSection.scss";

const ReservationSection = ({
  registration,
  handleInputChange,
  data = reservationData,
}) => {
  return (
    <section className="reservation" aria-labelledby="reservationTitle">
      <div className="reservation__inner">
        <div className="reservation__content">
          <span className="reservation__eyebrow">{data.eyebrow}</span>
          <h2 id="reservationTitle">{data.title}</h2>
          <p>{data.description}</p>

          <div className="reservation__points" aria-label="방문예약 안내">
            {data.points.map((point) => (
              <article className="reservation__point" key={point.id}>
                <span>{point.label}</span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>

        <form
          className="reservation__form"
          action={data.formAction}
          method="POST"
        >
          <div className="reservation__formHead">
            <strong>방문 상담 신청</strong>
            <p>{data.notice}</p>
          </div>

          {data.fields.map((field) => (
            <label className="reservation__field" htmlFor={field.id} key={field.id}>
              <span>
                {field.label}
                {field.required && <em>*</em>}
              </span>
              <input
                id={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={registration[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                pattern={field.pattern}
                title={field.title}
              />
            </label>
          ))}

          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="reservation__hidden"
          />

          <label className="reservation__field" htmlFor={data.messageField.id}>
            <span>{data.messageField.label}</span>
            <textarea
              id={data.messageField.id}
              name={data.messageField.name}
              placeholder={data.messageField.placeholder}
              value={registration[data.messageField.name] || ""}
              onChange={handleInputChange}
              rows={data.messageField.rows}
            />
          </label>

          <button type="submit" className="reservation__submit">
            {data.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationSection;
