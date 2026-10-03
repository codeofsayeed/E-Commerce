import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { offices } from "../data/contact";

export default function OfficeMap() {
  const [openId, setOpenId] = useState("lt");
  const active =
    offices.find((o) => o.id === openId) || offices[offices.length - 1];

  return (
    <section className="office-map">
      <iframe
        title={`Map of ${active.name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(active.address)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="office-card">
        {offices.map((o) => {
          const open = o.id === openId;
          return (
            <div className="office" key={o.id}>
              <button
                className="office-head"
                onClick={() => setOpenId(open ? null : o.id)}
                aria-expanded={open}
              >
                {o.name}
                {open ? <FaMinus size={8} /> : <FaPlus size={8} />}
              </button>
              {open && (
                <ul className="office-body">
                  <li>{o.address}</li>
                  <li>{o.phone}</li>
                  <li>{o.email}</li>
                  <li>{o.hours}</li>
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
