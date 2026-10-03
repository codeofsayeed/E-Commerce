// Called by the contact form. Currently simulates a request.
// Firebase later:
//   import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
//   import { db } from '../firebase';
//   await addDoc(collection(db, 'messages'), { ...data, createdAt: serverTimestamp() });
export async function sendMessage(data) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log("Message (not saved anywhere yet):", data);
}
