import { Link } from "react-router-dom";

// crumbs: [{ label, to? }] — the last one is the current page
export default function PageTitle({ title, crumbs = [] }) {
  return (
    <>
      <h1>{title}</h1>
      <p className="crumbs">
        {crumbs.map((c, i) => (
          <span key={c.label}>
            {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            {i < crumbs.length - 1 && " / "}
          </span>
        ))}
      </p>
    </>
  );
}
