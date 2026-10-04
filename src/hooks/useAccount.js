import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderService";

// User comes from AuthContext (the signed-in user). Orders come from orderService.
// Firebase later: query Firestore orders where('userId', '==', user.id).
export default function useAccount() {
  const { user, updateUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return { user, updateUser, logout, orders };
}
