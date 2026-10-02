import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const cols = {
  MENU: ['Home', 'Shop', 'About', 'Contact', 'Journal'],
  SHOP: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
  HELP: ['Privacy Policy', 'Terms & Conditions', 'Special Offers', 'Shipping', 'Returns Payments'],
};

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <h4>{title}</h4>
            {links.map((l) => <a key={l} href="#">{l}</a>)}
          </div>
        ))}
        <div className="contact">
          <strong>(052) 611-5711<br />company@domain.com</strong>
          <p>575 Crescent Ave, Quakertown, PA 18951</p>
        </div>
        <div className="logo big">OREBI<sup>.</sup></div>
      </div>
      <div className="container footer-bottom">
        <div className="social"><FaFacebookF /><FaLinkedinIn /><FaInstagram /></div>
        <small>2020 Orebi Minimal eCommerce Figma Template by Adveits</small>
      </div>
    </footer>
  );
}
