import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Overview from "../components/admin/Overview";
import ProductsAdmin from "../components/admin/ProductsAdmin";
import OrdersAdmin from "../components/admin/OrdersAdmin";
import MessagesAdmin from "../components/admin/MessagesAdmin";
import "../styles/products.css"; // shared base styles (fonts, colors)
import "../styles/admin.css";

const tabs = ["Overview", "Products", "Orders", "Messages"];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");

  if (!user) return <Navigate to="/login" replace />;

  // NOTE: this only hides the screen in the browser. Real protection needs Firebase security rules.
  if (user.role !== "admin") {
    return (
      <main className="container denied">
        <h1>Access denied</h1>
        <p>This page is only for store administrators.</p>
        <Link to="/" className="btn-dark">
          Back to Home
        </Link>
      </main>
    );
  }

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="admin">
      <header className="admin-top">
        <span className="logo">
          OREBI<sup>.</sup> <small>Admin</small>
        </span>
        <div>
          <Link to="/">View store</Link>
          <button onClick={signOut}>Logout</button>
        </div>
      </header>

      <div className="admin-body">
        <nav className="admin-nav" aria-label="Admin sections">
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
        </nav>

        <main className="admin-main">
          <h1>{tab}</h1>
          {tab === "Overview" && <Overview goTo={setTab} />}
          {tab === "Products" && <ProductsAdmin />}
          {tab === "Orders" && <OrdersAdmin />}
          {tab === "Messages" && <MessagesAdmin />}
        </main>
      </div>
    </div>
  );
}
