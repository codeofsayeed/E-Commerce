import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import { locations } from "../data/locations";
import "../styles/products.css";
import "../styles/auth.css";

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  postcode: "",
  division: "",
  district: "",
  password: "",
  repeatPassword: "",
  agree: false,
  newsletter: "no",
};

function validate(v) {
  const e = {};
  if (!v.firstName.trim()) e.firstName = "First name is required.";
  if (!v.lastName.trim()) e.lastName = "Last name is required.";
  if (!/^\S+@\S+\.\S+$/.test(v.email))
    e.email = "Please enter a valid email address.";
  if (!/^\+?[\d\s-]{7,15}$/.test(v.phone))
    e.phone = "Please enter a valid phone number.";
  if (!v.address1.trim()) e.address1 = "Address is required.";
  if (!v.city.trim()) e.city = "City is required.";
  if (!v.postcode.trim()) e.postcode = "Post code is required.";
  if (!v.division) e.division = "Please select a division.";
  if (!v.district) e.district = "Please select a district.";
  if (v.password.length < 8)
    e.password = "Password must be at least 8 characters.";
  if (v.repeatPassword !== v.password)
    e.repeatPassword = "Passwords do not match.";
  if (!v.agree) e.agree = "You must agree to the Privacy Policy.";
  return e;
}

export default function SignupPage() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/account" replace />;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => {
      const next = { ...v, [name]: type === "checkbox" ? checked : value };
      if (name === "division") next.district = ""; // districts depend on the division
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      await signup(values);
      navigate("/account");
    } catch (err) {
      setFormError(err.message);
      setBusy(false);
    }
  };

  const input = (
    name,
    label,
    { type = "text", placeholder = "", autoComplete } = {},
  ) => (
    <div className="fld">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  const districts = locations[values.division] || [];

  return (
    <>
      <Header />
      <main className="container auth">
        <PageTitle
          title="Sign up"
          crumbs={[{ label: "Home", to: "/" }, { label: "Sign up" }]}
        />
        <p className="auth-intro">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Already have an account?{" "}
          <Link to="/login" className="underline">
            Log in
          </Link>
          .
        </p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <h2>Your Personal Details</h2>
          <div className="grid2">
            {input("firstName", "First Name", {
              placeholder: "First Name",
              autoComplete: "given-name",
            })}
            {input("lastName", "Last Name", {
              placeholder: "Last Name",
              autoComplete: "family-name",
            })}
            {input("email", "Email address", {
              type: "email",
              placeholder: "company@domain.com",
              autoComplete: "email",
            })}
            {input("phone", "Telephone", {
              type: "tel",
              placeholder: "Your phone number",
              autoComplete: "tel",
            })}
          </div>

          <h2>New Customer</h2>
          <div className="grid2">
            {input("address1", "Address 1", {
              placeholder: "4879 Crescent Ave, Suite 575",
              autoComplete: "address-line1",
            })}
            {input("address2", "Address 2", {
              placeholder: "Apartment, suite (optional)",
              autoComplete: "address-line2",
            })}
            {input("city", "City", {
              placeholder: "Your city",
              autoComplete: "address-level2",
            })}
            {input("postcode", "Post Code", {
              placeholder: "Post Code",
              autoComplete: "postal-code",
            })}
            <div className="fld">
              <label htmlFor="division">Division</label>
              <select
                id="division"
                name="division"
                value={values.division}
                onChange={onChange}
                aria-invalid={Boolean(errors.division)}
              >
                <option value="">Please select</option>
                {Object.keys(locations).map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              {errors.division && (
                <span className="error">{errors.division}</span>
              )}
            </div>
            <div className="fld">
              <label htmlFor="district">District</label>
              <select
                id="district"
                name="district"
                value={values.district}
                onChange={onChange}
                disabled={!values.division}
                aria-invalid={Boolean(errors.district)}
              >
                <option value="">
                  {values.division
                    ? "Please select"
                    : "Select a division first"}
                </option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              {errors.district && (
                <span className="error">{errors.district}</span>
              )}
            </div>
          </div>

          <h2>Your Password</h2>
          <div className="grid2">
            {input("password", "Password", {
              type: "password",
              placeholder: "At least 8 characters",
              autoComplete: "new-password",
            })}
            {input("repeatPassword", "Repeat Password", {
              type: "password",
              placeholder: "Repeat password",
              autoComplete: "new-password",
            })}
          </div>

          <div className="checks">
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={values.agree}
                onChange={onChange}
              />{" "}
              I have read and agree to the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </label>
            {errors.agree && <span className="error">{errors.agree}</span>}

            <fieldset>
              <legend>Subscribe Newsletter</legend>
              <label>
                <input
                  type="radio"
                  name="newsletter"
                  value="yes"
                  checked={values.newsletter === "yes"}
                  onChange={onChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="newsletter"
                  value="no"
                  checked={values.newsletter === "no"}
                  onChange={onChange}
                />{" "}
                No
              </label>
            </fieldset>
          </div>

          <button type="submit" className="btn-dark" disabled={busy}>
            {busy ? "Creating account…" : "Sign up"}
          </button>
          {formError && (
            <p className="error" role="alert">
              {formError}
            </p>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
}
