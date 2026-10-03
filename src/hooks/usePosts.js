import { useEffect, useState } from "react";
import { posts as mock } from "../data/journal";

/*
 * Firebase-ready: only this hook needs to change.
 *
 * import { collection, getDocs, orderBy, query } from 'firebase/firestore';
 * import { db } from '../firebase';
 * const snap = await getDocs(query(collection(db, 'posts'), orderBy('date', 'desc')));
 * setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
 */
export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(mock);
    setLoading(false);
  }, []);

  return { posts, loading };
}
