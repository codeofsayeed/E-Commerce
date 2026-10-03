import { Link } from "react-router-dom";

export default function Hero({ data }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>{data.title}</h1>
          <p>
            Up to <strong>{data.discount}%</strong> {data.text}
          </p>
          <Link to="/shop" className="btn">
            Shop Now
          </Link>
        </div>
        <div className="hero-img">
          {data.image ? (
            <img src={data.image} alt="" />
          ) : (
            <div className="placeholder" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
