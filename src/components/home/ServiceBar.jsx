import { FaAward, FaTruck, FaUndo } from 'react-icons/fa';

const icons = { warranty: FaAward, shipping: FaTruck, returns: FaUndo };

export default function ServiceBar({ items }) {
  return (
    <section className="services container">
      {items.map(({ icon, label }) => {
        const Icon = icons[icon];
        return <div key={label}><Icon size={13} /> <span>{label}</span></div>;
      })}
    </section>
  );
}
