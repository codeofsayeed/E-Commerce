import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';
import '../styles/products.css'; // shared base styles
import '../styles/journal.css';

export default function JournalPage() {
  const { posts, loading } = usePosts();
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [posts]);
  const visible = category === 'All' ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <Header />
      <main className="container">
        <PageTitle title="Journal" crumbs={[{ label: 'Home', to: '/' }, { label: 'Journal' }]} />

        <div className="journal-tabs" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={c === category}
              className={c === category ? 'on' : ''} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {loading ? <p>Loading…</p> : (
          <div className="post-grid">
            {visible.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
