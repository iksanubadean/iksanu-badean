'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from '../Admin.module.css';
import Link from 'next/link';

export default function AdminAlumniDirectory() {
  const supabase = createClient();
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  async function fetchAlumni() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_verified', true)
        .order('full_name', { ascending: true });

      if (error) throw error;
      setAlumni(data || []);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      alert('Gagal mengambil data alumni');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus alumni "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setAlumni(alumni.filter(a => a.id !== id));
      alert('Alumni berhasil dihapus');
    } catch (error) {
      console.error('Error deleting alumni:', error);
      alert('Gagal menghapus data');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.graduation_year?.toString().includes(searchTerm)
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Direktori Alumni</h1>
          <p style={{ color: 'var(--gray-500)' }}>Kelola data anggota IKSANU yang sudah terverifikasi</p>
        </div>
        <Link href="/admin/alumni/add" className={`${styles.button} ${styles.primaryButton}`} style={{ textDecoration: 'none' }}>
          ➕ Tambah Manual
        </Link>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text"
          placeholder="Cari nama atau tahun masuk..."
          className={styles.input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)' }}>Nama Lengkap</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)' }}>Thn Masuk</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)' }}>No. HP</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)' }}>Pekerjaan</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)' }}>Alamat</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--gray-600)', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                    Memuat data alumni...
                  </td>
                </tr>
              ) : filteredAlumni.length > 0 ? (
                filteredAlumni.map((item) => (
                  <tr key={item.id} className={styles.adminTableRow}>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray-100)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.avatar_url ? <img src={item.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                        </div>
                        <span style={{ fontWeight: 600 }}>{item.full_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{item.graduation_year}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--primary)', fontWeight: 600 }}>{item.phone_number || '-'}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--gray-600)' }}>{item.occupation || '-'}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>{item.address || '-'}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <Link 
                          href={`/admin/alumni/edit/${item.id}`}
                          title="Edit Alumni"
                          style={{ 
                            padding: '0.5rem', 
                            borderRadius: '10px', 
                            background: '#e0f2fe', 
                            color: '#0369a1', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            textDecoration: 'none'
                          }}
                        >
                          ✏️
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id, item.full_name)}
                          disabled={deletingId === item.id}
                          title="Hapus Alumni"
                          style={{ 
                            padding: '0.5rem', 
                            borderRadius: '10px', 
                            background: '#fee2e2', 
                            color: '#ef4444', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'all 0.2s'
                          }}
                        >
                          {deletingId === item.id ? '...' : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                    Tidak ada data alumni ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
