import { useState } from "react";
import { getMessages, deleteMessage } from "../../services/contactService";
import { formatDate } from "../PostCard";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState(getMessages);

  if (messages.length === 0) {
    return (
      <p className="muted">
        No messages yet. Messages sent from the Contact page will appear here.
      </p>
    );
  }

  return (
    <ul className="messages">
      {messages.map((m) => (
        <li key={m.id} className="panel-box">
          <div className="bar">
            <div>
              <strong>{m.name}</strong> ·{" "}
              <a href={`mailto:${m.email}`}>{m.email}</a>
            </div>
            <small className="muted">{formatDate(m.date)}</small>
          </div>
          <p>{m.message}</p>
          <button
            className="danger"
            onClick={() => setMessages(deleteMessage(m.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
