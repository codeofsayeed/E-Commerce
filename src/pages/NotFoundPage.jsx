import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/products.css"; // shared base styles
import "../styles/notfound.css";

export default function NotFoundPage() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  // Sends the visitor to the Shop page, which filters products by ?q=
  const onSubmit = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <>
      <Header />
      <main className="container notfound">
        <h1>404</h1>
        <p>
          The page you were looking for couldn’t be found. The page could be
          removed or you misspelled the word while searching for it. Maybe try a
          search?
        </p>

        <form className="nf-search" onSubmit={onSubmit} role="search">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Type to search"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <FaSearch size={11} />
          </button>
        </form>

        <Link to="/" className="btn-dark">
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
