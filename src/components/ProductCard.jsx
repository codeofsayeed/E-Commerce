import { FaHeart, FaShoppingCart, FaSyncAlt } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart, onWishlist }) {
  const { name, price, color, badge, image } = product;
  return (
    <article className="card">
      <div className="thumb">
        {badge && <span className="badge">{badge}</span>}
        {image ? <img src={image} alt={name} loading="lazy" /> : <div className="placeholder" aria-hidden="true" />}
        <div className="actions">
          <button onClick={() => onWishlist?.(product)}>Add to Wish List <FaHeart size={10} /></button>
          <button>Compare <FaSyncAlt size={10} /></button>
          <button onClick={() => onAddToCart?.(product)}>Add to Cart <FaShoppingCart size={10} /></button>
        </div>
      </div>
      <div className="meta">
        <h4>{name}</h4>
        <span className="price">${price.toFixed(2)}</span>
      </div>
      <p className="color">{color}</p>
    </article>
  );
}
