import styles from './Admin.module.css';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  console.log('Admin Access Check - User:', user?.email);

  // Jika tidak login, lempar ke login
  if (!user) {
    console.log('No user found, redirecting to /login');
    redirect('/login');
  }

  // Cek apakah user adalah admin di tabel profiles
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  console.log('Admin Access Check - Is Admin:', profile?.is_admin);

  if (!profile?.is_admin) {
    console.log('Not an admin, redirecting to /');
    if (profileError) console.error('Profile Fetch Error:', profileError);
    redirect('/');
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Administrator</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right', display: 'none' }}> {/* Hidden on mobile for cleaner look */}
              <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>{user.email?.split('@')[0]}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>Super Admin</p>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, var(--gray-200) 0%, var(--gray-300) 100%)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem'
            }}>👤</div>
          </div>
        </header>

        <section className={styles.adminBody}>
          {children}
        </section>
      </main>
    </div>
  );
}
