import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import "../styles/products.css"; // shared base styles
import "../styles/cart.css";

export default function CartPage() {
  const {
    items,
    subtotal,
    discount,
    total,
    coupon,
    setQty,
    removeItem,
    applyCoupon,
  } = useCart();
  const [draft, setDraft] = useState({}); // quantities edited but not yet applied
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const qtyOf = (i) => draft[i.id] ?? i.qty;
  const change = (i, delta) =>
    setDraft((d) => ({ ...d, [i.id]: Math.max(1, qtyOf(i) + delta) }));
  const updateCart = () => {
    Object.entries(draft).forEach(([id, qty]) => setQty(id, qty));
    setDraft({});
  };
  const onApply = () =>
    setCouponMsg(
      applyCoupon(code) ? "Coupon applied." : "That coupon code is not valid.",
    );

  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="Cart"
          crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]}
        />

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn-dark">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <div className="cart-product">
                        <button
                          onClick={() => removeItem(i.id)}
                          aria-label={`Remove ${i.name}`}
                        >
                          <FaTimes size={10} />
                        </button>
                        <div className="cart-thumb">
                          {i.image ? (
                            <img src={i.image} alt="" />
                          ) : (
                            <div className="placeholder" aria-hidden="true" />
                          )}
                        </div>
                        <span>{i.name}</span>
                      </div>
                    </td>
                    <td className="strong">{money(i.price)}</td>
                    <td>
                      <div className="qty">
                        <button
                          onClick={() => change(i, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span aria-live="polite">{qtyOf(i)}</span>
                        <button
                          onClick={() => change(i, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="strong">{money(i.price * qtyOf(i))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-actions">
              <div className="coupon">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Coupon code"
                  aria-label="Coupon code"
                />
                <button onClick={onApply}>Apply coupon</button>
                {couponMsg && <small role="status">{couponMsg}</small>}
              </div>
              <button
                className="update"
                onClick={updateCart}
                disabled={Object.keys(draft).length === 0}
              >
                Update cart
              </button>
            </div>

            <div className="totals">
              <h3>Cart totals</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>{money(subtotal)}</td>
                  </tr>
                  {coupon && (
                    <tr>
                      <th>Coupon ({coupon.code})</th>
                      <td>−{money(discount)}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Total</th>
                    <td>{money(total)}</td>
                  </tr>
                </tbody>
              </table>
              <Link to="/checkout" className="btn-dark">
                Proceed To Checkout
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
