import { useEffect, useState } from "react";
import { products as mock } from "../data/products";

/*
 * Firebase-ready: only this hook needs to change.
 *
 * import { collection, getDocs } from 'firebase/firestore';
 * import { db } from '../firebase';
 * const snap = await getDocs(collection(db, 'products'));
 * setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(mock);
    setLoading(false);
  }, []);

  return { products, loading };
}
