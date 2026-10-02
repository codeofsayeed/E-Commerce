export default function Pagination({ page, pages, setPage, total, perPage }) {
  const from = total ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, total);
  return (
    <div className="pagination">
      <div className="pages">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button key={n} className={n === page ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>
        ))}
      </div>
      <small>Products from {from} to {to} of {total}</small>
    </div>
  );
}
