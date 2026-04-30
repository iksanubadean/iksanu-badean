import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/utils/supabase/server";
import { CldImage } from "next-cloudinary";
import YearPicker from "@/components/YearPicker";

export const dynamic = "force-dynamic";

export default async function AlumniPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; year?: string; page?: string }>;
}) {
  const { search, year, page } = await searchParams;
  const currentPage = parseInt(page || '1');
  const pageSize = 12;
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();
  
  // Membangun query secara dinamis
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .eq('is_verified', true);

  if (search) {
    query = query.ilike('full_name', `%${search}%`);
  }

  if (year && year !== 'Semua Tahun Masuk') {
    query = query.eq('graduation_year', parseInt(year));
  }

  const { data: alumniList, count, error } = await query
    .order('graduation_year', { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / pageSize);

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
            
            {/* Search Input */}
            <form method="GET" action="/alumni" style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <input 
                  name="search"
                  type="text" 
                  placeholder="Cari nama alumni..." 
                  defaultValue={search}
                  style={{ 
                    flex: "1 1 300px", 
                    padding: "1rem 1.5rem", 
                    borderRadius: "15px", 
                    border: "1px solid var(--gray-200)",
                    fontSize: "1rem",
                    boxShadow: "var(--shadow-sm)"
                  }} 
                />
                <button type="submit" className="premium-gradient" style={{ 
                  padding: "1rem 2.5rem", 
                  color: "white", 
                  borderRadius: "15px", 
                  fontWeight: "bold" 
                }}>
                  Cari Nama
                </button>
              </div>
            </form>

            {/* Hierarchical Year Picker */}
            <YearPicker />

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

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div style={{ 
                marginTop: "4rem", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "0.5rem",
                flexWrap: "wrap" 
              }}>
                {currentPage > 1 && (
                  <a 
                    href={`/alumni?search=${search || ''}&year=${year || ''}&page=${currentPage - 1}`}
                    style={{ padding: "0.75rem 1.25rem", borderRadius: "12px", background: "white", border: "1px solid var(--gray-200)", fontWeight: 600, color: "var(--gray-700)", textDecoration: "none" }}
                  >
                    &larr; Prev
                  </a>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  // Hanya tampilkan beberapa nomor halaman jika terlalu banyak
                  if (totalPages > 5 && Math.abs(p - currentPage) > 2) return null;
                  
                  return (
                    <a 
                      key={p}
                      href={`/alumni?search=${search || ''}&year=${year || ''}&page=${p}`}
                      style={{ 
                        width: "45px", 
                        height: "45px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        borderRadius: "12px", 
                        background: currentPage === p ? "var(--primary)" : "white", 
                        color: currentPage === p ? "white" : "var(--gray-700)", 
                        border: "1px solid var(--gray-200)", 
                        fontWeight: "bold",
                        textDecoration: "none",
                        transition: "all 0.2s"
                      }}
                    >
                      {p}
                    </a>
                  );
                })}

                {currentPage < totalPages && (
                  <a 
                    href={`/alumni?search=${search || ''}&year=${year || ''}&page=${currentPage + 1}`}
                    style={{ padding: "0.75rem 1.25rem", borderRadius: "12px", background: "white", border: "1px solid var(--gray-200)", fontWeight: 600, color: "var(--gray-700)", textDecoration: "none" }}
                  >
                    Next &rarr;
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
