import { useMemo, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import useProducts from '../hooks/useProducts';
import { priceRanges } from '../data/products';
import '../styles/products.css';

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [filters, setFilters] = useState({ category: null, color: null, brand: null, price: null });
  const [sort, setSort] = useState('featured');
  const [perPage, setPerPage] = useState(9);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [filters, sort, perPage]);

  const visible = useMemo(() => {
    const range = priceRanges.find((p) => p.label === filters.price);
    let list = products.filter((p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.color || p.color === filters.color) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!range || (p.price >= range.min && p.price <= range.max)));
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filters, sort]);

  const pages = Math.max(1, Math.ceil(visible.length / perPage));
  const pageItems = visible.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Header />
      <main className="container">
        <h1>Products</h1>
        <p className="crumbs">Home / Products</p>

        <div className="layout">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div>
            <div className="toolbar">
              <label>Sort by:
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </label>
              <label>Show:
                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                  {[9, 12, 24].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
            </div>

            {loading ? <p>Loading…</p> : pageItems.length === 0 ? (
              <p className="empty">No products match these filters. Clear a filter to see more.</p>
            ) : (
              <div className="grid">
                {pageItems.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            <Pagination page={page} pages={pages} setPage={setPage} total={visible.length} perPage={perPage} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
