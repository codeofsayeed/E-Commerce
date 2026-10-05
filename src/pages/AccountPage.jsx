import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import useAccount from "../hooks/useAccount";
import { updateAccount } from "../services/accountService";
import { formatDate } from "../components/PostCard";
import { money } from "../utils/format";
import "../styles/products.css";
import "../styles/account.css";

const tabs = [
  "Dashboard",
  "Orders",
  "Downloads",
  "Addresses",
  "Account Details",
];

export default function AccountPage() {
  const { user, updateUser, logout: signOut, orders } = useAccount();
  const [tab, setTab] = useState("Dashboard");
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="My Account"
          crumbs={[{ label: "Home", to: "/" }, { label: "My Account" }]}
        />

        <div className="account-layout">
          <nav className="account-nav" aria-label="Account">
            {tabs.map((t) => (
              <button
                key={t}
                className={t === tab ? "on" : ""}
                onClick={() => setTab(t)}
                aria-current={t === tab ? "page" : undefined}
              >
                {t}
              </button>
            ))}
            {user.role === "admin" && <Link to="/admin">Admin dashboard</Link>}
            <button onClick={logout}>Logout</button>
          </nav>

          <section className="account-panel">
            {tab === "Dashboard" && (
              <>
                <p>
                  Hello <strong>{user.name}</strong> (not{" "}
                  <strong>{user.name}</strong>?{" "}
                  <button className="inline" onClick={logout}>
                    Log out
                  </button>
                  )
                </p>
                <p>
                  From your account dashboard you can view your{" "}
                  <button className="inline" onClick={() => setTab("Orders")}>
                    recent orders
                  </button>
                  , manage your{" "}
                  <button
                    className="inline"
                    onClick={() => setTab("Addresses")}
                  >
                    shipping and billing addresses
                  </button>
                  , and edit your{" "}
                  <button
                    className="inline"
                    onClick={() => setTab("Account Details")}
                  >
                    password and account details
                  </button>
                  .
                </p>
              </>
            )}

            {tab === "Orders" &&
              (orders.length === 0 ? (
                <p>No orders have been placed yet.</p>
              ) : (
                <table className="orders">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{formatDate(o.date)}</td>
                        <td>{o.status}</td>
                        <td>{money(o.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

            {tab === "Downloads" && <p>No downloads available yet.</p>}

            {tab === "Addresses" && (
              <div className="addresses">
                {["Billing address", "Shipping address"].map((a) => (
                  <div key={a}>
                    <h3>{a}</h3>
                    <p>You have not set up this type of address yet.</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Account Details" && (
              <AccountDetails user={user} updateUser={updateUser} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function AccountDetails({ user, updateUser }) {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
  });
  const [msg, setMsg] = useState("");
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setMsg("Please enter a valid email address.");
    await updateAccount(form);
    updateUser({ ...form, name: `${form.firstName} ${form.lastName}`.trim() });
    setMsg("Account details saved.");
  };

  return (
    <form className="details-form" onSubmit={onSubmit} noValidate>
      {[
        ["firstName", "First name"],
        ["lastName", "Last name"],
        ["email", "Email address"],
      ].map(([n, l]) => (
        <div className="fld" key={n}>
          <label htmlFor={n}>{l}</label>
          <input id={n} name={n} value={form[n]} onChange={onChange} />
        </div>
      ))}
      <button type="submit" className="btn-dark">
        Save changes
      </button>
      <p role="status" className="form-msg">
        {msg}
      </p>
    </form>
  );
}
