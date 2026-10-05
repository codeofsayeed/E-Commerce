import { useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/orderService";
import { money } from "../../utils/format";
import { formatDate } from "../PostCard";
import { STATUSES } from "./Overview";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState(getOrders);

  if (orders.length === 0) {
    return (
      <p className="muted">
        No orders yet. Orders placed at checkout will appear here.
      </p>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{formatDate(o.date)}</td>
              <td>
                {[o.billing?.firstName, o.billing?.lastName]
                  .filter(Boolean)
                  .join(" ") || "—"}
              </td>
              <td>{o.items.reduce((n, i) => n + i.qty, 0)}</td>
              <td>{money(o.total)}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    setOrders(updateOrderStatus(o.id, e.target.value))
                  }
                  aria-label={`Status for ${o.id}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
