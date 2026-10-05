// Product storage used by the admin dashboard AND the shop (through hooks/useProducts.js).
// Kept in the browser (localStorage) and seeded from data/products.js.
//
// Firebase later:
//   import { collection, getDocs, setDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';
//   import { db } from '../firebase';
//   getProducts   -> getDocs(collection(db, 'products'))
//   saveProduct   -> p.id ? setDoc(doc(db, 'products', p.id), p) : addDoc(collection(db, 'products'), p)
//   deleteProduct -> deleteDoc(doc(db, 'products', id))
import { products as seed } from "../data/products";

const KEY = "orebi-products";

export function getProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(stored)) return stored;
  } catch {
    /* fall through to seed data */
  }
  return seed;
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}

export function saveProduct(product) {
  const list = getProducts();
  if (product.id && list.some((p) => p.id === product.id)) {
    return write(list.map((p) => (p.id === product.id ? product : p)));
  }
  return write([{ ...product, id: `p_${Date.now()}` }, ...list]);
}

export function deleteProduct(id) {
  return write(getProducts().filter((p) => p.id !== id));
}

export function resetProducts() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  return seed;
}
