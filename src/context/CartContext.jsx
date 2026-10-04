import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "orebi-cart";

// Sample coupon codes (percent off). Later: validate against Firestore / a Cloud Function.
const COUPONS = { WELCOME10: 10 };

const CartContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

/*
 * Cart lives in React state and is saved in the browser (localStorage).
 * Firebase later: when a user is signed in, read/write the same `items`
 * array to Firestore (e.g. users/{uid}/cart) instead of localStorage.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(load);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart still works for this session */
    }
  }, [items]);

  const value = useMemo(() => {
    const addItem = (p, qty = 1) =>
      setItems((cur) => {
        const found = cur.find((i) => i.id === p.id);
        if (found)
          return cur.map((i) =>
            i.id === p.id ? { ...i, qty: i.qty + qty } : i,
          );
        return [
          ...cur,
          { id: p.id, name: p.name, price: p.price, image: p.image || "", qty },
        ];
      });
    const setQty = (id, qty) =>
      setItems((cur) =>
        cur.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
      );
    const removeItem = (id) =>
      setItems((cur) => cur.filter((i) => i.id !== id));
    const clear = () => {
      setItems([]);
      setCoupon(null);
    };
    const applyCoupon = (code) => {
      const key = code.trim().toUpperCase();
      if (!COUPONS[key]) return false;
      setCoupon({ code: key, percent: COUPONS[key] });
      return true;
    };

    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const discount = coupon ? (subtotal * coupon.percent) / 100 : 0;
    return {
      items,
      coupon,
      count,
      subtotal,
      discount,
      total: subtotal - discount,
      addItem,
      setQty,
      removeItem,
      clear,
      applyCoupon,
    };
  }, [items, coupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
