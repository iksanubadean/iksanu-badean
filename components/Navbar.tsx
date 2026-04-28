"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
          
          <div className={`${styles.navContent} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
            <ul className={styles.navLinks}>
              <li><Link href="/" onClick={closeMobileMenu}>Beranda</Link></li>
              <li><Link href="/profil" onClick={closeMobileMenu}>Profil</Link></li>
              <li><Link href="/alumni" onClick={closeMobileMenu}>Data Alumni</Link></li>
              <li><Link href="/berita" onClick={closeMobileMenu}>Berita</Link></li>
              <li><Link href="/bisnis" onClick={closeMobileMenu}>Bisnis</Link></li>
            </ul>

            <div className={styles.navActions}>
              <Link href="/login" className={styles.loginBtn} onClick={closeMobileMenu}>Masuk</Link>
              <Link href="/register" className={styles.registerBtn} onClick={closeMobileMenu}>Gabung</Link>
            </div>
          </div>

          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line1Open : ""}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line2Open : ""}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line3Open : ""}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
