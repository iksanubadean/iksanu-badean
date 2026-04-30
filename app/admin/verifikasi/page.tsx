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
        <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
              <tr>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)' }}>ALUMNI</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)' }}>ANGKATAN</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)' }}>INFO KONTAK</th>
                <th style={{ padding: '1.2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {pendingAlumni.map((alumni) => (
                <tr key={alumni.id} style={{ borderBottom: '1px solid var(--gray-50)' }}>
                  <td style={{ padding: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '45px', height: '45px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--gray-100)' }}>
                        {alumni.avatar_url ? (
                          <img src={alumni.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👤</div>
                        )}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{alumni.full_name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{alumni.occupation || 'Belum mengisi pekerjaan'}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                    {alumni.graduation_year}
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{alumni.phone_number || '-'}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{alumni.address || '-'}</p>
                  </td>
                  <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleApprove(alumni)}
                        className={styles.button} 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #10b981' }}
                      >
                        Setujui
                      </button>
                      <button 
                        onClick={() => handleReject(alumni.id)}
                        className={styles.button} 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #ef4444' }}
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
