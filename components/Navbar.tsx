"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.navbarInner}>
          <Link href="/" className={styles.logoWrapper}>
            <Image 
              src="/logo_ppnh.jpg" 
              alt="Logo PPNH" 
              width={40} 
              height={40} 
              className={styles.logoImg}
            />
            <div className={styles.logoText}>
              IKS<span>ANU</span>
            </div>
          </Link>
          
          <ul className={styles.navLinks}>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/profil">Profil</Link></li>
            <li><Link href="/alumni">Data Alumni</Link></li>
            <li><Link href="/berita">Berita</Link></li>
            <li><Link href="/bisnis">Bisnis</Link></li>
          </ul>

          <div className={styles.navActions}>
            <Link href="/login" className={styles.loginBtn}>Masuk</Link>
            <Link href="/register" className={styles.registerBtn}>Gabung</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
