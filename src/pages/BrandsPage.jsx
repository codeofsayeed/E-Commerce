import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { brands } from "../data/about";
import "../styles/products.css";
import "../styles/about.css";

export default function BrandsPage() {
  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="Our Brands"
          crumbs={[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Brands" },
          ]}
        />
        <div className="info-grid brands">
          {brands.map((b) => (
            <article className="info-card" key={b.id}>
              <div className="info-thumb">
                {b.image ? (
                  <img src={b.image} alt={b.name} />
                ) : (
                  <div className="placeholder" aria-hidden="true" />
                )}
              </div>
              <h3>{b.name}</h3>
              <small>{b.tagline}</small>
              <p>{b.text}</p>
              <Link to="/shop" className="link-arrow">
                Shop {b.name} →
              </Link>
            </article>
          ))}
        </div>
        <Link to="/about" className="back">
          ← Back to About
        </Link>
      </main>
      <Footer />
    </>
  );
}
