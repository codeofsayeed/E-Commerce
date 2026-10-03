import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Journal", to: "/journal" },
];

export default function Header() {
  return (
    <header>
      <div className="topbar container">
        <Link to="/" className="logo">
          OREBI<sup>.</sup>
        </Link>
        <nav>
          {links.map((l) =>
            l.to ? (
              // "end" only for Home, so About stays highlighted on /about/brands too
              <NavLink key={l.label} to={l.to} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ) : (
              <a key={l.label} href="#">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <span />
      </div>
      <div className="searchbar">
        <div className="container searchbar-inner">
          <button className="shop-cat">
            <FaBars size={10} /> Shop by Category
          </button>
          <div className="search">
            <input placeholder="Search Products" aria-label="Search products" />
            <FaSearch size={11} />
          </div>
          <div className="icons">
            <FaUser size={12} />
            <FaShoppingCart size={12} />
          </div>
        </div>
      </div>
    </header>
  );
}
