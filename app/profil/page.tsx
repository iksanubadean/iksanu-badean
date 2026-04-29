import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import styles from "./Profil.module.css";

export default function ProfilPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <section className="section-padding">
          <div className="container">
            <SectionHeading 
              title="Profil IKSANU" 
              subtitle="Tentang Organisasi Kami" 
            />
            <div className={`${styles.gridContainer} ${styles.gridContainerTop}`}>
              <div className={styles.textSection}>
                <h3 style={{ color: "var(--primary)", marginBottom: "1.5rem", fontSize: "1.8rem" }}>Sejarah & Visi</h3>
                <p style={{ color: "var(--gray-600)", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                  Ikatan Santri dan Alumni Pondok Pesantren Nurul Huda Badean (IKSANU) didirikan sebagai wadah silaturahmi bagi seluruh santri yang pernah menimba ilmu di PP Nurul Huda Badean.
                </p>
                <p style={{ color: "var(--gray-600)", lineHeight: "1.8" }}>
                  Visi kami adalah menciptakan jaringan alumni yang kuat, mandiri, dan berkontribusi nyata bagi pengembangan almamater serta memberikan manfaat bagi masyarakat luas berlandaskan nilai-nilai Ahlussunnah wal Jama'ah.
                </p>
              </div>
              <div className={`${styles.imagePlaceholder} ${styles.imageSection}`}>
                <p>[ Foto Gedung/Kegiatan ]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ backgroundColor: "var(--primary)", color: "var(--white)" }}>
          <div className="container">
            <div className={`${styles.gridContainer} ${styles.gridContainerBottom}`}>
              <div>
                <h3 style={{ color: "var(--secondary)", marginBottom: "1.5rem" }}>Misi Kami</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                    <span style={{ color: "var(--secondary)" }}>✔</span>
                    <span>Mempererat tali silaturahmi antar alumni lintas generasi.</span>
                  </li>
                  <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                    <span style={{ color: "var(--secondary)" }}>✔</span>
                    <span>Menunjang program pengembangan Pondok Pesantren Nurul Huda.</span>
                  </li>
                  <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                    <span style={{ color: "var(--secondary)" }}>✔</span>
                    <span>Memberdayakan potensi ekonomi dan profesionalitas alumni.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: "var(--secondary)", marginBottom: "1.5rem" }}>Struktur Organisasi</h3>
                <p style={{ opacity: 0.8, lineHeight: "1.8" }}>
                  IKSANU dipimpin oleh Dewan Pengurus Pusat yang dibantu oleh Pengurus Wilayah di berbagai daerah. Struktur ini memastikan koordinasi yang efektif untuk setiap program kerja.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
