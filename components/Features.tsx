import styles from "./Features.module.css";
import SectionHeading from "./SectionHeading";

const featureList = [
  {
    title: "Direktori Alumni",
    description: "Cari dan temukan teman seangkatan serta jalin kembali silaturahmi yang terputus.",
    icon: "👥"
  },
  {
    title: "Hub Bisnis",
    description: "Promosikan usaha Anda dan dukung ekonomi sesama alumni melalui direktori bisnis.",
    icon: "💼"
  },
  {
    title: "Berita & Kegiatan",
    description: "Dapatkan informasi terbaru mengenai kegiatan pondok dan agenda reuni alumni.",
    icon: "📰"
  },
  {
    title: "Donasi Almamater",
    description: "Kontribusi nyata untuk pengembangan sarana dan prasarana Pondok Pesantren.",
    icon: "🌙"
  }
];

export default function Features() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading 
          title="Layanan Utama IKSANU" 
          subtitle="Manfaat Untuk Anggota" 
        />
        <div className={styles.grid}>
          {featureList.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
