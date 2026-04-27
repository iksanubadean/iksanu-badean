import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.content}>
          <h4 className={styles.subtitle}>Selamat Datang di Portal Resmi</h4>
          <h1 className={styles.title}>
            IKS<span>ANU</span>
          </h1>
          <p className={styles.description}>
            Ikatan Santri dan Alumni Pondok Pesantren Nurul Huda Badean. 
            Wadah kolaborasi, silaturahmi, dan dedikasi untuk almamater tercinta.
          </p>
          <div className={styles.cta}>
            <Link href="/register" className={styles.primaryBtn}>
              Bergabung Sekarang
            </Link>
            <Link href="/profil" className={styles.secondaryBtn}>
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <div className="container">
          <div className={styles.statsInner}>
            <div className={styles.statItem}>
              <h3>1000+</h3>
              <p>Alumni Terdaftar</p>
            </div>
            <div className={styles.statItem}>
              <h3>50+</h3>
              <p>Angkatan</p>
            </div>
            <div className={styles.statItem}>
              <h3>20+</h3>
              <p>Bisnis Alumni</p>
            </div>
            <div className={styles.statItem}>
              <h3>5</h3>
              <p>Negara</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
