import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      
      {/* Additional sections can be added here */}
      <section className="section-padding" style={{ backgroundColor: "var(--gray-50)" }}>
        <div className="container text-center">
          <h2 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Siap Bergabung dengan IKSANU?</h2>
          <p style={{ color: "var(--gray-600)", marginBottom: "2rem", maxWidth: "600px", marginInline: "auto" }}>
            Jadilah bagian dari jaringan alumni yang kuat dan terus berkontribusi untuk masa depan pesantren yang lebih baik.
          </p>
          <a href="/register" className="premium-gradient" style={{ 
            color: "var(--white)", 
            padding: "1rem 2.5rem", 
            borderRadius: "50px", 
            display: "inline-block",
            fontWeight: "bold",
            boxShadow: "var(--shadow-md)"
          }}>
            Daftar Sekarang
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
