import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/utils/supabase/server";
import { CldImage } from "next-cloudinary";

export default async function AlumniPage() {
  const supabase = await createClient();
  
  // Mengambil data alumni dari Supabase yang sudah diverifikasi
  const { data: alumniList, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_verified', true)
    .order('graduation_year', { ascending: false });

  if (error) {
    console.error('Error fetching alumni:', error);
  }

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Data Alumni" 
              subtitle="Direktori Anggota IKSANU (Terverifikasi)" 
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
                <option>Semua Tahun Masuk</option>
                {/* Tahun bisa di-generate dinamis nanti */}
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
              <button className="premium-gradient" style={{ color: "white", padding: "1rem 2rem", borderRadius: "10px", fontWeight: "bold" }}>
                Cari
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
              {alumniList && alumniList.length > 0 ? (
                alumniList.map((alumni) => (
                  <div key={alumni.id} style={{ 
                    background: "white", 
                    padding: "1.5rem", 
                    borderRadius: "20px", 
                    boxShadow: "var(--shadow-sm)",
                    border: "1px solid var(--gray-100)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    transition: "transform 0.2s"
                  }}>
                    <div style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      overflow: "hidden",
                      backgroundColor: "var(--gray-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      {alumni.avatar_url ? (
                        <img 
                          src={alumni.avatar_url} 
                          alt={alumni.full_name} 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span style={{ fontSize: "2rem" }}>👤</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: "var(--primary)", marginBottom: "0.25rem", fontSize: "1.1rem" }}>
                        {alumni.full_name}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginBottom: "0.75rem" }}>
                        Tahun Masuk: {alumni.graduation_year}
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {alumni.address && (
                          <span style={{ fontSize: "0.75rem", background: "var(--gray-50)", padding: "4px 10px", borderRadius: "50px", border: "1px solid var(--gray-100)" }}>
                            📍 {alumni.address}
                          </span>
                        )}
                        {alumni.occupation && (
                          <span style={{ fontSize: "0.75rem", background: "var(--gray-50)", padding: "4px 10px", borderRadius: "50px", border: "1px solid var(--gray-100)" }}>
                            💼 {alumni.occupation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
                  <p>Belum ada data alumni yang ditemukan.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
