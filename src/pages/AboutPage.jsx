import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { intro, columns, tiles } from "../data/about";
import "../styles/products.css"; // shared base styles
import "../styles/about.css";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="About"
          crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
        />

        <section className="about-tiles">
          {tiles.map((t) => (
            <div className="about-tile" key={t.label}>
              {t.image ? (
                <img src={t.image} alt="" />
              ) : (
                <div className="placeholder round" aria-hidden="true" />
              )}
              <Link to={t.to} className="btn btn-wide">
                {t.label}
              </Link>
            </div>
          ))}
        </section>

        <p className="about-lead">{intro}</p>

        <section className="about-cols">
          {columns.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
