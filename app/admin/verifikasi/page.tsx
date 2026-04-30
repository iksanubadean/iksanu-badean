'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from '../Admin.module.css';

export default function VerifikasiAlumniPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [pendingAlumni, setPendingAlumni] = useState<any[]>([]);

  const fetchPendingAlumni = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('alumni_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error:', error);
        alert('Gagal mengambil data: ' + error.message);
      } else {
        setPendingAlumni(data || []);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAlumni();
  }, []);

  const handleApprove = async (alumni: any) => {
    if (!confirm(`Setujui ${alumni.full_name}?`)) return;
    
    setLoading(true);
    try {
      // 1. Masukkan ke tabel profiles
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{
          id: crypto.randomUUID(),
          full_name: alumni.full_name,
          graduation_year: alumni.entry_year, // Map ke kolom yang ada
          occupation: alumni.occupation,
          phone_number: alumni.phone_number,
          address: alumni.address,
          bio: alumni.bio,
          avatar_url: alumni.avatar_url,
          is_verified: true
        }]);

      if (insertError) throw insertError;

      // 2. Hapus dari tabel antrean
      const { error: deleteError } = await supabase
        .from('alumni_submissions')
        .delete()
        .eq('id', alumni.id);

      if (deleteError) throw deleteError;

      alert('Alumni berhasil disetujui dan dipindahkan ke direktori!');
      fetchPendingAlumni();
    } catch (error: any) {
      alert('Gagal memproses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Tolak dan hapus data ini dari antrean?')) return;
    
    const { error } = await supabase
      .from('alumni_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      alert('Data pendaftaran berhasil ditolak.');
      fetchPendingAlumni();
    }
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '0.5rem', fontWeight: 800 }}>Verifikasi Alumni</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2.5rem' }}>Review pendaftaran mandiri dari alumni sebelum dipublikasikan.</p>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--gray-400)' }}>Memuat data...</div>
      ) : pendingAlumni.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          <h3 style={{ color: 'var(--gray-500)' }}>Tidak ada antrean verifikasi</h3>
          <p style={{ color: 'var(--gray-400)' }}>Semua data pendaftaran sudah diproses.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {pendingAlumni.map((alumni) => (
            <div key={alumni.id} className={styles.card} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              padding: '1.5rem',
              height: '100%',
              border: '1px solid var(--gray-100)'
            }}>
              {/* Card Header: Avatar & Basic Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '15px', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--gray-50)',
                  flexShrink: 0,
                  border: '1px solid var(--gray-100)'
                }}>
                  {alumni.avatar_url ? (
                    <img src={alumni.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👤</div>
                  )}
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-dark)', margin: 0 }}>{alumni.full_name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, margin: '2px 0 0' }}>Angkatan {alumni.entry_year}</p>
                </div>
              </div>

              {/* Card Content: Details */}
              <div style={{ flex: 1, marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>📞 No. WhatsApp</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{alumni.phone_number || '-'}</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>💼 Pekerjaan</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{alumni.occupation || '-'}</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>📍 Alamat</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>{alumni.address || '-'}</p>
                </div>
                {alumni.bio && (
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>📝 Bio Singkat</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontStyle: 'italic', lineHeight: 1.4 }}>"{alumni.bio}"</p>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <button 
                  onClick={() => handleReject(alumni.id)}
                  style={{ 
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    color: '#dc2626',
                    border: '2px solid #fee2e2',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Tolak
                </button>
                <button 
                  onClick={() => handleApprove(alumni)}
                  style={{ 
                    flex: 2,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(6, 78, 59, 0.15)',
                    transition: 'all 0.2s'
                  }}
                >
                  Setujui
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
