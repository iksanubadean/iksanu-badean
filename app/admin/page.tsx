import styles from './Admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontWeight: 800 }}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total Alumni</p>
          <h2 className={styles.cardValue}>0</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>
            🟢 Sistem Aktif
          </div>
        </div>
        
        <div className={styles.card}>
          <p className={styles.cardTitle}>Bisnis Alumni</p>
          <h2 className={styles.cardValue}>0</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Katalog Ekonomi
          </div>
        </div>
        
        <div className={styles.card}>
          <p className={styles.cardTitle}>Berita Terkini</p>
          <h2 className={styles.cardValue}>0</h2>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            Update Pesantren
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ borderLeft: '6px solid var(--primary)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Aktivitas Sistem</h3>
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '2rem 0' }}>
          Belum ada data aktivitas yang tercatat hari ini.
        </p>
      </div>
    </div>
  );
}
