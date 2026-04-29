'use client'

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Cek apakah user ini admin (opsional, tapi bagus untuk feedback cepat)
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();

      if (profile?.is_admin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal login. Silakan cek kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--gray-50)',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%', 
        background: 'white', 
        padding: '3rem', 
        borderRadius: '24px', 
        boxShadow: 'var(--shadow-premium)',
        border: '1px solid var(--gray-100)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Selamat Datang</h1>
          <p style={{ color: 'var(--gray-500)' }}>Masuk ke akun IKSANU Anda</p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            background: '#fff1f2', 
            color: '#be123c', 
            borderRadius: '12px', 
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '1px solid #fecdd3'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--gray-700)' }}>Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              style={{ 
                width: '100%', 
                padding: '0.875rem 1.25rem', 
                borderRadius: '12px', 
                border: '1px solid var(--gray-200)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--gray-700)' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ 
                width: '100%', 
                padding: '0.875rem 1.25rem', 
                borderRadius: '12px', 
                border: '1px solid var(--gray-200)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="premium-gradient"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '12px', 
              color: 'white', 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s'
            }}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
