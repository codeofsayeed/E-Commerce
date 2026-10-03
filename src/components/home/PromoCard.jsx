import { Link } from "react-router-dom";

export default function PromoCard({ promo, large = false }) {
  return (
    <article className={`promo ${large ? "promo-large" : ""}`}>
      {promo.image ? (
        <img src={promo.image} alt="" />
      ) : (
        <div className="placeholder" aria-hidden="true" />
      )}
      <div className="promo-text">
        <h3>{promo.title}</h3>
        <p>
          Up to <strong>{promo.discount}%</strong> {promo.text}
        </p>
        <Link to="/shop" className="btn">
          Shop Now
        </Link>
      </div>
    </article>
  );
}
