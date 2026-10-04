import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useCategories from "../hooks/useCategories";

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const categories = useCategories();

  // Close on outside click or Escape while the menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="cat-menu" ref={wrapRef}>
      <button
        className="shop-cat"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="category-list"
      >
        <FaBars size={10} /> Shop by Category
      </button>

      {open && (
        <ul id="category-list" className="cat-panel">
          <li>
            <Link to="/shop" onClick={close}>
              All products
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <Link
                to={`/shop?category=${encodeURIComponent(c)}`}
                onClick={close}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
