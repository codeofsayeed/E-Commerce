import { Link, NavLink } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Journal", to: "/journal" },
];

export default function Header() {
  const { count } = useCart();
  const { user } = useAuth();
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
          <CategoryMenu />
          <div className="search">
            <input placeholder="Search Products" aria-label="Search products" />
            <FaSearch size={11} />
          </div>
          <div className="icons">
            <Link
              to={user ? "/account" : "/login"}
              aria-label={user ? "My account" : "Log in"}
            >
              <FaUser size={12} />
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} items`}>
              <FaShoppingCart size={12} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
