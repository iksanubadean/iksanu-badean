import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrapper}>
              <Image
                src="/logo_ppnh.jpg"
                alt="Logo PPNH"
                width={50}
                height={50}
                className={styles.logoImg}
              />
              <div className={styles.logoText}>
                IKS<span>ANU</span>
              </div>
            </Link>
            <p className={styles.desc}>
              Ikatan Santri dan Alumni Pondok Pesantren Nurul Huda Badean.
              Membangun ukhuwah, menebar manfaat.
            </p>
          </div>

          <div className={styles.links}>
            <h4>Tautan Cepat</h4>
            <ul>
              <li><Link href="/profil">Profil</Link></li>
              <li><Link href="/alumni">Data Alumni</Link></li>
              <li><Link href="/berita">Berita</Link></li>
              <li><Link href="/bisnis">Bisnis</Link></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Kontak Kami</h4>
            <p>📍 Jl. Raya Masjid At-Taqwa Badean, Blimbingsari, Banyuwangi, Jawa Timur</p>
            <p>📧 info@iksanu.or.id</p>
            <p>📞 +62 812 3456 7890</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} IKSANU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
