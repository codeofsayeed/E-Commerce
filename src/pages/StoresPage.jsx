import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { stores } from "../data/about";
import "../styles/products.css";
import "../styles/about.css";

export default function StoresPage() {
  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="Our Stores"
          crumbs={[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Stores" },
          ]}
        />
        <div className="info-grid stores">
          {stores.map((s) => (
            <article className="info-card store" key={s.id}>
              <h3>{s.city}</h3>
              <p>{s.address}</p>
              <p>
                <strong>Phone:</strong> {s.phone}
              </p>
              <p>
                <strong>Hours:</strong> {s.hours}
              </p>
              <a
                className="link-arrow"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get directions →
              </a>
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
