'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/admin/Admin.module.css';
import { createClient } from '@/utils/supabase/client';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const [pendingCount, setPendingCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPendingCount() {
      const { count } = await supabase
        .from('alumni_submissions')
        .select('*', { count: 'exact', head: true });
      setPendingCount(count || 0);
    }
    fetchPendingCount();
    
    // Optional: Realtime subscription could be added here
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Input Alumni', href: '/admin/alumni/add', icon: '➕' },
    { name: 'Verifikasi', href: '/admin/verifikasi', icon: '✅', badge: pendingCount },
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
               {link.badge && link.badge > 0 ? (
                 <span style={{ 
                   marginLeft: 'auto', 
                   background: '#ef4444', 
                   color: 'white', 
                   fontSize: '0.7rem', 
                   padding: '2px 8px', 
                   borderRadius: '50px',
                   fontWeight: 700 
                 }}>
                   {link.badge}
                 </span>
               ) : null}
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
