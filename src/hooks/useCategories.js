import { useEffect, useState } from "react";
import { categories as mock } from "../data/products";

/*
 * Category list for the header menu and the Shop sidebar.
 * Firebase later: only this hook changes.
 *
 * import { collection, getDocs } from 'firebase/firestore';
 * import { db } from '../firebase';
 * const snap = await getDocs(collection(db, 'categories'));
 * setCategories(snap.docs.map(d => d.data().name));
 */
export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(mock);
  }, []);

  return categories;
}
