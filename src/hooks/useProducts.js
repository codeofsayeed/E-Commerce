import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

/*
 * Firebase-ready: when productService.js reads from Firestore, make getProducts async
 * and `await` it here. The rest of the app does not change.
 */
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(getProducts());
    setLoading(false);
  }, []);

  return { products, loading };
}
