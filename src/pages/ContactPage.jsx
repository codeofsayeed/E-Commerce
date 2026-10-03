import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import ContactForm from "../components/ContactForm";
import OfficeMap from "../components/OfficeMap";
import "../styles/products.css"; // shared base styles
import "../styles/contact.css";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container">
        <PageTitle
          title="Contacts"
          crumbs={[{ label: "Home", to: "/" }, { label: "Contacts" }]}
        />
        <ContactForm />
        <OfficeMap />
      </main>
      <Footer />
    </>
  );
}
