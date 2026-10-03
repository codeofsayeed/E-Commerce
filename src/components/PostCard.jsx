import { Link } from "react-router-dom";

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function PostCard({ post }) {
  const to = `/journal/${post.slug}`;
  return (
    <article className="post-card">
      <Link to={to} className="post-thumb" aria-label={post.title}>
        {post.image ? (
          <img src={post.image} alt="" loading="lazy" />
        ) : (
          <div className="placeholder" aria-hidden="true" />
        )}
      </Link>
      <p className="post-meta">
        {post.category} · {formatDate(post.date)}
      </p>
      <h3>
        <Link to={to}>{post.title}</Link>
      </h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <Link to={to} className="link-arrow">
        Read more →
      </Link>
    </article>
  );
}
