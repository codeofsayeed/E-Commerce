import { useState } from "react";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";
import { getMessages } from "../../services/contactService";
import { money } from "../../utils/format";
import { formatDate } from "../PostCard";

export const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function Overview({ goTo }) {
  const [data] = useState(() => ({
    products: getProducts(),
    orders: getOrders(),
    messages: getMessages(),
  }));
  const { products, orders, messages } = data;

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((n, o) => n + o.total, 0);
  const stats = [
    { label: "Products", value: products.length, tab: "Products" },
    { label: "Orders", value: orders.length, tab: "Orders" },
    { label: "Revenue", value: money(revenue), tab: "Orders" },
    { label: "Messages", value: messages.length, tab: "Messages" },
  ];

  return (
    <>
      <div className="stat-grid">
        {stats.map((s) => (
          <button key={s.label} className="stat" onClick={() => goTo(s.tab)}>
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </button>
        ))}
      </div>

      <div className="panel-box">
        <h3>Orders by status</h3>
        <ul className="status-list">
          {STATUSES.map((st) => (
            <li key={st}>
              <span>{st}</span>
              <strong>{orders.filter((o) => o.status === st).length}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-box">
        <h3>Recent orders</h3>
        {orders.length === 0 ? (
          <p className="muted">
            No orders yet. Orders placed at checkout will appear here.
          </p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{formatDate(o.date)}</td>
                    <td>{o.status}</td>
                    <td>{money(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
