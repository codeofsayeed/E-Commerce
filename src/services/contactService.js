// Contact form messages are saved in the browser for now so the admin dashboard can list them.
// Firebase later:
//   import { addDoc, collection, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
//   import { db } from '../firebase';
//   sendMessage   -> addDoc(collection(db, 'messages'), { ...data, createdAt: serverTimestamp() })
//   getMessages   -> getDocs(collection(db, 'messages'))   (admin only: protect with security rules)
//   deleteMessage -> deleteDoc(doc(db, 'messages', id))
const KEY = "orebi-messages";

export function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}

export async function sendMessage(data) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  write([
    { ...data, id: `m_${Date.now()}`, date: new Date().toISOString() },
    ...getMessages(),
  ]);
}

export function deleteMessage(id) {
  return write(getMessages().filter((m) => m.id !== id));
}
