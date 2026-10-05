/*
 * MOCK sign-up / login so the pages work before Firebase exists.
 * - Profiles (never passwords) are kept in this browser's localStorage.
 * - loginUser only checks that the email is registered. It does NOT verify the password,
 *   so this is for development only.
 *
 * Firebase later, replace the bodies with:
 *   import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
 *   import { doc, setDoc } from 'firebase/firestore';
 *   import { auth, db } from '../firebase';
 *
 *   registerUser:  const cred = await createUserWithEmailAndPassword(auth, email, password);
 *                  await setDoc(doc(db, 'users', cred.user.uid), profile);  // profile = everything except the password
 *   loginUser:     await signInWithEmailAndPassword(auth, email, password);
 *   logoutUser:    await signOut(auth);
 */
const KEY = "orebi-users";

// DEVELOPMENT ONLY: this email becomes an admin when it signs up or logs in.
// Firebase later: give admins a custom claim (set with the Admin SDK or a Cloud Function),
// e.g. { admin: true }, and check request.auth.token.admin in your Firestore security rules.
const ADMIN_EMAILS = ["admin@domain.com"];
const roleFor = (email) =>
  ADMIN_EMAILS.includes(email) ? "admin" : "customer";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export async function registerUser({
  password,
  repeatPassword,
  agree,
  ...profile
}) {
  await wait(500);
  const users = readUsers();
  const email = profile.email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) {
    throw new Error(
      "An account with this email already exists. Please log in.",
    );
  }
  const user = {
    ...profile,
    email,
    id: `u_${Date.now()}`,
    role: roleFor(email),
    name: `${profile.firstName} ${profile.lastName}`.trim(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([...users, user]));
  } catch {
    /* storage unavailable: user still signs in for this session */
  }
  return user;
}

export async function loginUser(email) {
  await wait(400);
  const user = readUsers().find((u) => u.email === email.trim().toLowerCase());
  if (!user)
    throw new Error("No account found for that email. Please sign up first.");
  return { ...user, role: roleFor(user.email) };
}

export async function logoutUser() {
  await wait(100);
}
