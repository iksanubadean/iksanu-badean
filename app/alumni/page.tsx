import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const dummyAlumni = [
  { name: "Ahmad Fauzi", batch: "2015", location: "Banyuwangi", profession: "Guru" },
  { name: "Siti Aminah", batch: "2018", location: "Surabaya", profession: "Dokter" },
  { name: "Muhammad Rizky", batch: "2012", location: "Jakarta", profession: "Software Engineer" },
  { name: "Lailatul Fitria", batch: "2020", location: "Malang", profession: "Mahasiswa" },
  { name: "Bambang Pamungkas", batch: "2010", location: "Bandung", profession: "Pengusaha" },
  { name: "Dewi Sartika", batch: "2016", location: "Yogyakarta", profession: "Dosen" },
];

export default function AlumniPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Data Alumni" 
              subtitle="Direktori Anggota IKSANU" 
            />
            
            <div style={{ marginBottom: "3rem", display: "flex", gap: "1rem" }}>
              <input 
                type="text" 
                placeholder="Cari nama alumni..." 
                style={{ 
                  flex: 1, 
                  padding: "1rem 1.5rem", 
                  borderRadius: "10px", 
                  border: "1px solid var(--gray-200)",
                  fontSize: "1rem"
                }} 
              />
              <select style={{ padding: "1rem", borderRadius: "10px", border: "1px solid var(--gray-200)" }}>
                <option>Semua Angkatan</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
              </select>
              <button className="premium-gradient" style={{ color: "white", padding: "1rem 2rem", borderRadius: "10px", fontWeight: "bold" }}>
                Cari
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
              {dummyAlumni.map((alumni, i) => (
                <div key={i} style={{ 
                  background: "white", 
                  padding: "2rem", 
                  borderRadius: "20px", 
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--gray-100)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem"
                }}>
                  <div style={{ 
                    width: "60px", 
                    height: "60px", 
                    borderRadius: "50%", 
                    backgroundColor: "var(--gray-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}>
                    👤
                  </div>
                  <div>
                    <h4 style={{ color: "var(--primary)", marginBottom: "0.25rem" }}>{alumni.name}</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--gray-500)", marginBottom: "0.5rem" }}>Angkatan {alumni.batch}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.8rem", background: "var(--gray-100)", padding: "2px 8px", borderRadius: "4px" }}>📍 {alumni.location}</span>
                      <span style={{ fontSize: "0.8rem", background: "var(--gray-100)", padding: "2px 8px", borderRadius: "4px" }}>💼 {alumni.profession}</span>
                    </div>
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
