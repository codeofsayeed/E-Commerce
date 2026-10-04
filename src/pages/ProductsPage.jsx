import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import useProducts from "../hooks/useProducts";
import { priceRanges } from "../data/products";
import "../styles/products.css";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [params, setParams] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const category = params.get("category"); // category lives in the URL so the header menu can set it

  const [others, setOthers] = useState({
    color: null,
    brand: null,
    price: null,
  });
  const [sort, setSort] = useState("featured");
  const [perPage, setPerPage] = useState(9);
  const [page, setPage] = useState(1);

  // The sidebar calls this like a normal state setter.
  const filters = { category, ...others };
  const setFilters = (updater) => {
    const next = typeof updater === "function" ? updater(filters) : updater;
    const { category: nextCategory, ...rest } = next;
    setOthers(rest);
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (nextCategory) p.set("category", nextCategory);
      else p.delete("category");
      return p;
    });
  };

  useEffect(() => {
    setPage(1);
  }, [category, others, sort, perPage, query]);

  const visible = useMemo(() => {
    const range = priceRanges.find((p) => p.label === others.price);
    let list = products.filter(
      (p) =>
        (!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
        (!category || p.category === category) &&
        (!others.color || p.color === others.color) &&
        (!others.brand || p.brand === others.brand) &&
        (!range || (p.price >= range.min && p.price <= range.max)),
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, others, sort, query]);

  const pages = Math.max(1, Math.ceil(visible.length / perPage));
  const pageItems = visible.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Header />
      <main className="container">
        <h1>Products</h1>
        <p className="crumbs">Home / Products{category && ` / ${category}`}</p>
        {query && <p className="search-note">Showing results for “{query}”</p>}

        <div className="layout">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div>
            <div className="toolbar">
              <label>
                Sort by:
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </label>
              <label>
                Show:
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                >
                  {[9, 12, 24].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? (
              <p>Loading…</p>
            ) : pageItems.length === 0 ? (
              <p className="empty">
                No products match these filters. Clear a filter to see more.
              </p>
            ) : (
              <div className="grid">
                {pageItems.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              pages={pages}
              setPage={setPage}
              total={visible.length}
              perPage={perPage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
