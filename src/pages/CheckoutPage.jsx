import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";
import { money } from "../utils/format";
import "../styles/products.css";
import "../styles/cart.css";

const countries = [
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Germany",
  "Lithuania",
  "Slovakia",
  "India",
  "Canada",
  "Australia",
];

const payments = [
  {
    id: "bank",
    label: "Bank transfer",
    text: "Make your payment directly into our bank account. Your order will ship once the funds have cleared.",
    button: "Proceed to Bank",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    text: "Pay with cash when your order is delivered.",
    button: "Place order",
  },
];

const empty = {
  firstName: "",
  lastName: "",
  company: "",
  country: "",
  street: "",
  apartment: "",
  city: "",
  county: "",
  postcode: "",
  phone: "",
  email: "",
  notes: "",
};
const required = {
  firstName: "First name",
  lastName: "Last name",
  country: "Country",
  street: "Street address",
  city: "Town / City",
  postcode: "Post code",
  phone: "Phone",
};

function validate(v) {
  const errors = {};
  Object.entries(required).forEach(([k, label]) => {
    if (!v[k].trim()) errors[k] = `${label} is required.`;
  });
  if (!/^\S+@\S+\.\S+$/.test(v.email))
    errors.email = "Please enter a valid email address.";
  return errors;
}

export default function CheckoutPage() {
  const { items, subtotal, discount, total, coupon, clear } = useCart();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("bank");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [order, setOrder] = useState(null);

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const selected = payments.find((p) => p.id === payment);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const { notes, ...billing } = values;
      const placed = await placeOrder({
        items,
        total,
        billing,
        notes,
        payment,
      });
      clear();
      setOrder(placed);
    } catch {
      setStatus("error");
    }
  };

  const field = (
    name,
    label,
    { optional = false, placeholder = "", textarea = false } = {},
  ) => {
    const Tag = textarea ? "textarea" : "input";
    return (
      <div className="fld">
        <label htmlFor={name}>
          {label}
          {!optional && " *"}
          {optional && " (optional)"}
        </label>
        <Tag
          id={name}
          name={name}
          value={values[name]}
          onChange={onChange}
          placeholder={placeholder}
          rows={textarea ? 3 : undefined}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-err` : undefined}
        />
        {errors[name] && (
          <span className="error" id={`${name}-err`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  };

  const crumbs = [{ label: "Home", to: "/" }, { label: "Checkout" }];

  if (order) {
    return (
      <>
        <Header />
        <main className="container">
          <PageTitle title="Checkout" crumbs={crumbs} />
          <div className="empty-cart" role="status">
            <h2>Thank you! Your order has been received.</h2>
            <p>
              Order number: <strong>{order.id}</strong> · Total:{" "}
              <strong>{money(order.total)}</strong>
            </p>
            <Link to="/account" className="btn-dark">
              View my orders
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container">
        <PageTitle title="Checkout" crumbs={crumbs} />

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty, so there is nothing to check out.</p>
            <Link to="/shop" className="btn-dark">
              Continue shopping
            </Link>
          </div>
        ) : (
          <form className="checkout" onSubmit={onSubmit} noValidate>
            <p className="coupon-note">
              Have a coupon?{" "}
              <Link to="/cart">Click here to enter your code</Link>
            </p>

            <h2>Billing Details</h2>
            <div className="two-col">
              {field("firstName", "First Name", { placeholder: "First Name" })}
              {field("lastName", "Last Name", { placeholder: "Last Name" })}
            </div>
            {field("company", "Company Name", {
              optional: true,
              placeholder: "Company Name",
            })}
            <div className="fld">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={values.country}
                onChange={onChange}
                aria-invalid={Boolean(errors.country)}
              >
                <option value="">Please select</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </div>
            {field("street", "Street Address", {
              placeholder: "House number and street name",
            })}
            {field("apartment", "Apartment, suite, unit", {
              optional: true,
              placeholder: "Apartment, suite, unit etc.",
            })}
            {field("city", "Town/City", { placeholder: "Town/City" })}
            {field("county", "County", {
              optional: true,
              placeholder: "County",
            })}
            {field("postcode", "Post Code", { placeholder: "Post Code" })}
            {field("phone", "Phone", { placeholder: "Phone" })}
            {field("email", "Email Address", { placeholder: "Email" })}

            <h2>Additional Information</h2>
            {field("notes", "Other Notes", {
              optional: true,
              textarea: true,
              placeholder:
                "Notes about your order, e.g. special notes for delivery.",
            })}

            <h2>Your Order</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td>
                      {i.name} × {i.qty}
                    </td>
                    <td>{money(i.price * i.qty)}</td>
                  </tr>
                ))}
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

            <fieldset className="payments">
              <legend className="sr-only">Payment method</legend>
              {payments.map((p) => (
                <div key={p.id}>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                    />{" "}
                    {p.label}
                  </label>
                  {payment === p.id && <p className="pay-text">{p.text}</p>}
                </div>
              ))}
            </fieldset>

            <p className="privacy">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <a href="#">privacy policy</a>.
            </p>

            <button
              type="submit"
              className="btn-dark"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Processing…" : selected.button}
            </button>
            {status === "error" && (
              <p className="error" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
