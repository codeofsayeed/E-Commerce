import { FaPlus } from "react-icons/fa";
import { categories, brands, colors, priceRanges } from "../data/products";

function Section({ title, children }) {
  return (
    <section className="filter">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function FilterSidebar({ filters, setFilters }) {
  const toggle = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));

  return (
    <aside className="sidebar">
      <Section title="Shop by Category">
        {categories.map((c) => (
          <button
            key={c}
            className={`row ${filters.category === c ? "on" : ""}`}
            onClick={() => toggle("category", c)}
          >
            {c}
            {c === "Category 1" || c === "Category 3" ? (
              <FaPlus size={8} />
            ) : null}
          </button>
        ))}
      </Section>

      <Section title="Shop by Color">
        {colors.map((c) => (
          <button
            key={c.name}
            className={`row ${filters.color === c.name ? "on" : ""}`}
            onClick={() => toggle("color", c.name)}
          >
            <span>
              <i className="dot" style={{ background: c.hex }} />
              {c.name}
            </span>
          </button>
        ))}
      </Section>

      <Section title="Shop by Brand">
        {brands.map((b) => (
          <button
            key={b}
            className={`row ${filters.brand === b ? "on" : ""}`}
            onClick={() => toggle("brand", b)}
          >
            {b}
          </button>
        ))}
      </Section>

      <Section title="Shop by Price">
        {priceRanges.map((p) => (
          <button
            key={p.label}
            className={`row ${filters.price === p.label ? "on" : ""}`}
            onClick={() => toggle("price", p.label)}
          >
            {p.label}
          </button>
        ))}
      </Section>
    </aside>
  );
}
