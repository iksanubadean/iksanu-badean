'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './Admin.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    bisnis: 0,
    berita: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: totalCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_verified', true);

        const { count: pendingCount } = await supabase
          .from('alumni_submissions')
          .select('*', { count: 'exact', head: true });

        setStats({
          total: totalCount || 0,
          pending: pendingCount || 0,
          bisnis: 0, // Implementasi bisnis menyusul
          berita: 0  // Implementasi berita menyusul
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontWeight: 800 }}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total Alumni</p>
          <h2 className={styles.cardValue}>{loading ? '...' : stats.total}</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>
            🟢 Terverifikasi
          </div>
        </div>

        <Link href="/admin/verifikasi" style={{ textDecoration: 'none' }}>
          <div className={`${styles.card} ${stats.pending > 0 ? styles.activeCard : ''}`} style={{ cursor: 'pointer', border: stats.pending > 0 ? '2px solid #ef4444' : 'none' }}>
            <p className={styles.cardTitle}>Menunggu Verifikasi</p>
            <h2 className={styles.cardValue} style={{ color: stats.pending > 0 ? '#dc2626' : 'inherit' }}>
              {loading ? '...' : stats.pending}
            </h2>
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: stats.pending > 0 ? '#dc2626' : 'var(--gray-500)', fontWeight: stats.pending > 0 ? 700 : 400 }}>
              {stats.pending > 0 ? '⚠️ Perlu Tindakan' : 'Semua Beres'}
            </div>
          </div>
        </Link>
        
        <div className={styles.card}>
          <p className={styles.cardTitle}>Bisnis Alumni</p>
          <h2 className={styles.cardValue}>{stats.bisnis}</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Katalog Ekonomi
          </div>
        </div>
        
        <div className={styles.card}>
          <p className={styles.cardTitle}>Berita Terkini</p>
          <h2 className={styles.cardValue}>{stats.berita}</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Update Pesantren
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ borderLeft: '6px solid var(--primary)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Aktivitas Sistem</h3>
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem 0' }}>
          {stats.pending > 0 
            ? `Ada ${stats.pending} alumni yang menunggu verifikasi Anda.` 
            : 'Belum ada data aktivitas yang mencatat hari ini.'}
        </p>
      </div>
    </div>
  );
}
