import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';

export default function Header() {
  return (
    <header>
      <div className="topbar container">
        <a href="/" className="logo">OREBI<sup>.</sup></a>
        <nav>
          {['Home', 'Shop', 'About', 'Contact', 'Journal'].map((l, i) => (
            <a key={l} href="#" className={i === 0 ? 'active' : ''}>{l}</a>
          ))}
        </nav>
        <span />
      </div>
      <div className="searchbar">
        <div className="container searchbar-inner">
          <button className="shop-cat"><FaBars size={10} /> Shop by Category</button>
          <div className="search">
            <input placeholder="Search Products" aria-label="Search products" />
            <FaSearch size={11} />
          </div>
          <div className="icons">
            <FaUser size={12} /><FaShoppingCart size={12} />
          </div>
        </div>
      </div>
    </header>
  );
}
