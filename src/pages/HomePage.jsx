import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import ServiceBar from "../components/home/ServiceBar";
import PromoCard from "../components/home/PromoCard";
import ProductRow from "../components/home/ProductRow";
import FeatureBanner from "../components/home/FeatureBanner";
import useProducts from "../hooks/useProducts";
import { hero, services, promos, banner } from "../data/home";
import "../styles/products.css"; // shared base styles (header, footer, cards)
import "../styles/home.css";

export default function HomePage() {
  const { products, loading } = useProducts();

  // Later, query these separately from Firestore (e.g. where('isNew','==',true)).
  const newArrivals = products.slice(0, 8);
  const popular = products.slice(8, 12);
  const specialOffers = products.slice(12, 16);

  return (
    <>
      <Header />
      <main>
        <Hero data={hero} />
        <ServiceBar items={services} />

        <section className="promos container">
          <PromoCard promo={promos.large} large />
          <div className="promo-stack">
            {promos.small.map((p) => (
              <PromoCard key={p.id} promo={p} />
            ))}
          </div>
        </section>

        {loading ? (
          <p className="container">Loading…</p>
        ) : (
          <>
            <ProductRow title="New Arrivals" items={newArrivals} slider />
            <ProductRow items={popular} />
            <FeatureBanner data={banner} />
            <ProductRow title="Special Offers" items={specialOffers} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
