import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const dummyNews = [
  {
    title: "Reuni Akbar IKSANU 2026: Mempererat Ukhuwah di Bulan Syawal",
    date: "15 April 2026",
    excerpt: "Acara reuni akbar yang dihadiri oleh lebih dari 500 alumni dari berbagai angkatan ini berlangsung khidmat...",
    category: "Kegiatan"
  },
  {
    title: "Pembangunan Gedung Baru Asrama Santri PP Nurul Huda",
    date: "10 April 2026",
    excerpt: "Kabar gembira bagi para santri, pembangunan asrama baru telah mencapai tahap finishing dan siap digunakan...",
    category: "Pondok"
  },
  {
    title: "Beasiswa IKSANU untuk Santri Berprestasi Tahun Ajaran 2026/2027",
    date: "05 April 2026",
    excerpt: "IKSANU kembali membuka pendaftaran beasiswa pendidikan bagi santri yang memiliki prestasi akademik maupun non-akademik...",
    category: "Program"
  }
];

export default function BeritaPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Berita & Kegiatan" 
              subtitle="Informasi Terbaru IKSANU" 
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2.5rem" }}>
              {dummyNews.map((news, i) => (
                <div key={i} style={{ 
                  background: "white", 
                  borderRadius: "20px", 
                  overflow: "hidden", 
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--gray-100)"
                }}>
                  <div style={{ height: "200px", background: "var(--gray-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "var(--gray-400)" }}>[ Gambar Berita ]</p>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ color: "var(--secondary-dark)", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase" }}>{news.category}</span>
                      <span style={{ color: "var(--gray-400)", fontSize: "0.85rem" }}>{news.date}</span>
                    </div>
                    <h3 style={{ color: "var(--primary)", marginBottom: "1rem", fontSize: "1.4rem", lineHeight: "1.4" }}>{news.title}</h3>
                    <p style={{ color: "var(--gray-600)", lineHeight: "1.6", marginBottom: "1.5rem", fontSize: "0.95rem" }}>{news.excerpt}</p>
                    <button style={{ color: "var(--primary)", fontWeight: "bold", borderBottom: "2px solid var(--secondary)" }}>
                      Baca Selengkapnya
                    </button>
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
