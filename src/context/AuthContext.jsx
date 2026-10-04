import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../services/authService";

const KEY = "orebi-user";
const AuthContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

/*
 * Holds the signed-in user for the whole app.
 * Firebase later: replace the localStorage logic with
 *   onAuthStateChanged(auth, (firebaseUser) => setUser(...))
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(load);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      signup: async (data) => setUser(await registerUser(data)),
      login: async (email, password) =>
        setUser(await loginUser(email, password)),
      logout: async () => {
        await logoutUser();
        setUser(null);
      },
      updateUser: (patch) => setUser((u) => ({ ...u, ...patch })),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
