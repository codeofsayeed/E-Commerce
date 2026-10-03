import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

// `to` = real route; items without it are placeholders for now
const cols = {
  MENU: [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Journal", to: "/journal" },
  ],
  SHOP: [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ].map((label) => ({ label })),
  HELP: [
    "Privacy Policy",
    "Terms & Conditions",
    "Special Offers",
    "Shipping",
    "Secure Payments",
  ].map((label) => ({ label })),
};

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <h4>{title}</h4>
            {links.map((l) =>
              l.to ? (
                <Link key={l.label} to={l.to}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href="#">
                  {l.label}
                </a>
              ),
            )}
          </div>
        ))}
        <div className="contact">
          <strong>
            (052) 611-5711
            <br />
            company@domain.com
          </strong>
          <p>575 Crescent Ave, Quakertown, PA 18951</p>
        </div>
        <div className="logo big">
          OREBI<sup>.</sup>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="social">
          <FaFacebookF />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
        <small>2020 Orebi Minimal eCommerce Figma Template by Adveits</small>
      </div>
    </footer>
  );
}
