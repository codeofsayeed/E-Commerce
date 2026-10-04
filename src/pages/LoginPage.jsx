import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import "../styles/products.css";
import "../styles/auth.css";

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/account" replace />;

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      found.email = "Please enter a valid email address.";
    if (!values.password) found.password = "Please enter your password.";
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      await login(values.email, values.password);
      navigate("/account");
    } catch (err) {
      setFormError(err.message);
      setBusy(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container auth">
        <PageTitle
          title="Login"
          crumbs={[{ label: "Home", to: "/" }, { label: "Login" }]}
        />
        <p className="auth-intro">{lorem}</p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <h2>Returning Customer</h2>
          <div className="grid2">
            <div className="fld">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={onChange}
                placeholder="company@domain.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="fld">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={onChange}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          <button type="submit" className="btn-outline" disabled={busy}>
            {busy ? "Logging in…" : "Log in"}
          </button>
          {formError && (
            <p className="error" role="alert">
              {formError}
            </p>
          )}
        </form>

        <section className="auth-form">
          <h2>New Customer</h2>
          <p className="auth-intro">{lorem}</p>
          <Link to="/signup" className="btn-dark">
            Continue
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
