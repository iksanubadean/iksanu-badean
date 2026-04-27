import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const dummyBusinesses = [
  { name: "Kopi Badean Mantap", owner: "H. Ahmad Muzakki", category: "Kuliner", location: "Banyuwangi" },
  { name: "Percetakan Amanah", owner: "Usth. Fatimah", category: "Jasa", location: "Banyuwangi" },
  { name: "Toko Buku Islami", owner: "Syamsul Arifin", category: "Retail", location: "Surabaya" },
  { name: "Travel Haji & Umroh", owner: "Drs. Abdullah", category: "Jasa", location: "Jakarta" },
];

export default function BisnisPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Hub Bisnis Alumni" 
              subtitle="Pemberdayaan Ekonomi IKSANU" 
            />

            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <button className="premium-gradient" style={{ color: "white", padding: "1rem 2.5rem", borderRadius: "50px", fontWeight: "bold", fontSize: "1.1rem" }}>
                + Daftarkan Bisnis Anda
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
              {dummyBusinesses.map((biz, i) => (
                <div key={i} style={{ 
                  background: "white", 
                  padding: "2rem", 
                  borderRadius: "20px", 
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--gray-100)",
                  transition: "transform 0.3s ease"
                }}>
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    backgroundColor: "var(--primary-light)", 
                    borderRadius: "15px", 
                    margin: "0 auto 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem"
                  }}>
                    {biz.category === "Kuliner" ? "☕" : biz.category === "Jasa" ? "🛠️" : "📚"}
                  </div>
                  <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>{biz.name}</h3>
                  <p style={{ color: "var(--secondary-dark)", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "1rem" }}>{biz.category}</p>
                  <div style={{ borderTop: "1px solid var(--gray-100)", paddingTop: "1rem", marginTop: "1rem" }}>
                    <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Owner: {biz.owner}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>📍 {biz.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
