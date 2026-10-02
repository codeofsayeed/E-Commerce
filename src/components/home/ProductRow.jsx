import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductCard from '../ProductCard';

// title is optional. Set `slider` to show prev/next arrows.
export default function ProductRow({ title, items, slider = false, onAddToCart, onWishlist }) {
  const track = useRef(null);
  const scroll = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth / 2, behavior: 'smooth' });
  };

  return (
    <section className="row-section container">
      {title && <h2>{title}</h2>}
      <div className="row-wrap">
        {slider && (
          <>
            <button className="arrow left" onClick={() => scroll(-1)} aria-label="Previous"><FaArrowLeft size={10} /></button>
            <button className="arrow right" onClick={() => scroll(1)} aria-label="Next"><FaArrowRight size={10} /></button>
          </>
        )}
        <div className={`row-track ${slider ? 'slider' : ''}`} ref={track}>
          {items.map((p) => (
            <div className="row-item" key={p.id}>
              <ProductCard product={p} onAddToCart={onAddToCart} onWishlist={onWishlist} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
