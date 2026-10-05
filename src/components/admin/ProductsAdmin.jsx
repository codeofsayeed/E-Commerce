import { useState } from "react";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  resetProducts,
} from "../../services/productService";
import { categories, brands, colors } from "../../data/products";
import { money } from "../../utils/format";

const blank = {
  name: "",
  price: "",
  category: categories[0],
  brand: brands[0],
  color: colors[0].name,
  badge: "",
  image: "",
};

export default function ProductsAdmin() {
  const [list, setList] = useState(getProducts);
  const [form, setForm] = useState(null); // null = closed; otherwise the product being added/edited
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = (e) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim()) return setError("Please enter a product name.");
    if (!(price > 0)) return setError("Price must be greater than 0.");
    setList(
      saveProduct({
        ...form,
        name: form.name.trim(),
        price,
        badge: form.badge.trim() || null,
      }),
    );
    setForm(null);
    setError("");
  };

  const onDelete = (p) => {
    if (window.confirm(`Delete “${p.name}”? This cannot be undone.`))
      setList(deleteProduct(p.id));
  };

  const onReset = () => {
    if (window.confirm("Reset all products to the original sample data?"))
      setList(resetProducts());
  };

  const select = (name, label, options) => (
    <div className="fld">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={form[name]} onChange={onChange}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="bar">
        <p className="muted">
          {list.length} products. Changes appear in the shop straight away.
        </p>
        <div>
          <button className="btn-line" onClick={onReset}>
            Reset samples
          </button>
          <button
            className="btn-dark"
            onClick={() => {
              setForm(blank);
              setError("");
            }}
          >
            Add product
          </button>
        </div>
      </div>

      {form && (
        <form className="panel-box admin-form" onSubmit={onSave} noValidate>
          <h3>{form.id ? "Edit product" : "New product"}</h3>
          <div className="grid2">
            <div className="fld">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div className="fld">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={onChange}
              />
            </div>
            {select("category", "Category", categories)}
            {select("brand", "Brand", brands)}
            {select(
              "color",
              "Color",
              colors.map((c) => c.name),
            )}
            <div className="fld">
              <label htmlFor="badge">Badge (optional, e.g. New or -10%)</label>
              <input
                id="badge"
                name="badge"
                value={form.badge || ""}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="fld">
            <label htmlFor="image">Image URL (optional)</label>
            <input
              id="image"
              name="image"
              value={form.image}
              onChange={onChange}
              placeholder="/products/cap.png or a Firebase Storage URL"
            />
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            <button type="submit" className="btn-dark">
              Save product
            </button>
            <button
              type="button"
              className="btn-line"
              onClick={() => setForm(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Badge</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="cell-product">
                    <div className="mini-thumb">
                      {p.image ? <img src={p.image} alt="" /> : null}
                    </div>
                    {p.name}
                  </div>
                </td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{money(p.price)}</td>
                <td>{p.badge || "—"}</td>
                <td className="actions-cell">
                  <button
                    onClick={() => {
                      setForm({ ...p, badge: p.badge || "" });
                      setError("");
                    }}
                  >
                    Edit
                  </button>
                  <button className="danger" onClick={() => onDelete(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
