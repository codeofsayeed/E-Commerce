// Stubs for account actions.
// Firebase later: use firebase/auth (signOut, updateProfile, updateEmail) and Firestore (users/{uid}).
export async function updateAccount(data) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("Account details (not saved anywhere yet):", data);
}

export async function signOutUser() {
  // await signOut(auth);
  await Promise.resolve();
}
