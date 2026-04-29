'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/admin/Admin.module.css';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Input Alumni', href: '/admin/alumni/add', icon: '➕' },
    { name: 'Direktori', href: '/admin/alumni', icon: '👥' },
    { name: 'Berita', href: '/admin/berita', icon: '📰' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className={styles.mobileMenuBtn} 
        onClick={toggleSidebar}
        style={{ display: 'block', position: 'fixed', top: '20px', left: '20px', zIndex: 200 }}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 140,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarLogo}>
          <img 
            src="/logo.png" // Kita akan asumsikan logo diletakkan di public/logo.png
            alt="IKSANU" 
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'white', letterSpacing: '1px' }}>IKSANU ADMIN</span>
        </div>
        
        <nav className={styles.sidebarNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`${styles.navLink} ${pathname === link.href ? styles.activeNavLink : ''}`}
              onClick={() => setIsOpen(false)}
            >
               <span className={styles.navIcon}>{link.icon}</span>
               <span>{link.name}</span>
            </Link>
          ))}
          
          <div style={{ marginTop: 'auto', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <Link href="/" className={styles.navLink}>
               <span className={styles.navIcon}>🏠</span>
               <span>Ke Website</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
