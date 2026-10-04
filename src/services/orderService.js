// Saves orders in the browser for now so the My Account > Orders tab works.
// Firebase later:
//   import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
//   import { db } from '../firebase';
//   const ref = await addDoc(collection(db, 'orders'), { ...order, userId: auth.currentUser?.uid, createdAt: serverTimestamp() });
//   return { ...order, id: ref.id };
const KEY = "orebi-orders";

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export async function placeOrder({ items, total, billing, notes, payment }) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const order = {
    id: `ORD-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString(),
    status: "Processing",
    items,
    total,
    billing,
    notes,
    payment,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...getOrders()]));
  } catch {
    /* ignore: order object is still returned */
  }
  return order;
}
