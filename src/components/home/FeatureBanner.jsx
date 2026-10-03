import { Link } from "react-router-dom";

export default function FeatureBanner({ data }) {
  return (
    <section className="feature container">
      <div className="feature-img">
        {data.image ? (
          <img src={data.image} alt="" />
        ) : (
          <div className="placeholder round" aria-hidden="true" />
        )}
      </div>
      <div className="feature-text">
        <h2>{data.title}</h2>
        <p>{data.text}</p>
        <Link to="/shop" className="btn">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
