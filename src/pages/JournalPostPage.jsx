import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import PostCard, { formatDate } from "../components/PostCard";
import usePosts from "../hooks/usePosts";
import "../styles/products.css";
import "../styles/journal.css";

export default function JournalPostPage() {
  const { slug } = useParams();
  const { posts, loading } = usePosts();
  const post = posts.find((p) => p.slug === slug);
  const related = posts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="container">
        {loading ? (
          <p>Loading…</p>
        ) : !post ? (
          <>
            <PageTitle
              title="Post not found"
              crumbs={[
                { label: "Home", to: "/" },
                { label: "Journal", to: "/journal" },
              ]}
            />
            <p className="post-excerpt">We couldn’t find that article.</p>
            <Link to="/journal" className="back">
              ← Back to Journal
            </Link>
          </>
        ) : (
          <>
            <PageTitle
              title={post.title}
              crumbs={[
                { label: "Home", to: "/" },
                { label: "Journal", to: "/journal" },
                { label: post.category },
              ]}
            />
            <article className="post-article">
              <p className="post-meta">
                {post.category} · {formatDate(post.date)}
              </p>
              <div className="post-hero">
                {post.image ? (
                  <img src={post.image} alt="" />
                ) : (
                  <div className="placeholder" aria-hidden="true" />
                )}
              </div>
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <Link to="/journal" className="back">
                ← Back to Journal
              </Link>
            </article>

            {related.length > 0 && (
              <section className="related">
                <h2>More in {post.category}</h2>
                <div className="post-grid">
                  {related.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
