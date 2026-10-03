import { useState } from "react";
import { sendMessage } from "../services/contactService";

const empty = { name: "", email: "", message: "" };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (!message.trim()) errors.message = "Please write a message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      await sendMessage(values);
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field = (name, label, placeholder, textarea = false) => {
    const Tag = textarea ? "textarea" : "input";
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <Tag
          id={name}
          name={name}
          type={name === "email" ? "email" : undefined}
          rows={textarea ? 3 : undefined}
          placeholder={placeholder}
          value={values[name]}
          onChange={onChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span className="error" id={`${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h2>Fill up a Form</h2>
      {field("name", "Name", "Your name here")}
      {field("email", "Email", "Your email here")}
      {field("message", "Message", "Your message here", true)}

      <button
        type="submit"
        className="post-btn"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Post"}
      </button>

      <p className="form-status" role="status">
        {status === "sent" && "Thank you! Your message has been sent."}
        {status === "error" && "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
