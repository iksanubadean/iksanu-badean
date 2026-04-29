'use client'

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import styles from '../../Admin.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AddAlumniPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    graduation_year: '',
    occupation: '',
    phone_number: '',
    address: '',
    bio: '',
    avatar_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Kita masukkan data ke tabel profiles
      // Note: Karena ini input manual oleh admin tanpa link ke auth.users (untuk sementara),
      // kita perlu memastikan tabel profiles mengizinkan ID null atau kita generate UUID manual.
      // Namun di skema sebelumnya, 'id' adalah PK yang merujuk ke auth.users.
      
      // SOLUSI: Untuk input manual alumni oleh admin yang BELUM punya akun, 
      // kita mungkin butuh tabel terpisah atau memodifikasi skema 'profiles'.
      // Untuk demo ini, mari kita coba masukkan dengan UUID random jika diizinkan, 
      // atau ingatkan user bahwa ini butuh penyesuaian skema.
      
      const { error } = await supabase
        .from('profiles')
        .insert([{
          id: crypto.randomUUID(), // Generate UUID manual untuk data manual admin
          full_name: formData.full_name,
          graduation_year: parseInt(formData.graduation_year),
          occupation: formData.occupation,
          phone_number: formData.phone_number,
          address: formData.address,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          is_verified: true // Data dari admin otomatis verified
        }]);

      if (error) throw error;

      alert('Data alumni berhasil ditambahkan!');
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <h1 style={{ marginBottom: '0.5rem', fontWeight: 800 }}>Tambah Data Alumni</h1>
      <p style={{ color: 'var(--gray-600)', marginBottom: '2.5rem' }}>Lengkapi formulir di bawah untuk mendaftarkan alumni baru.</p>
      
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGroup} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {formData.avatar_url ? (
              <img 
                src={formData.avatar_url} 
                alt="Preview" 
                style={{ width: '140px', height: '140px', borderRadius: '24px', objectFit: 'cover', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} 
              />
            ) : (
              <div style={{ width: '140px', height: '140px', borderRadius: '24px', backgroundColor: 'var(--gray-50)', border: '2px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                👤
              </div>
            )}
            
            <div style={{ marginTop: '1rem' }}>
              <CldUploadWidget 
                uploadPreset="iksanu_cloudinary_upload"
                onSuccess={(result: any) => {
                  console.log('Upload Success:', result);
                  if (result.info && typeof result.info !== 'string') {
                    setFormData({ ...formData, avatar_url: result.info.secure_url });
                    alert('Foto berhasil diunggah!');
                  }
                }}
                onError={(error: any) => {
                  console.error('Cloudinary Upload Error:', error);
                  alert('Gagal upload foto ke Cloudinary.');
                }}
              >
                {({ open }) => (
                  <button 
                    type="button" 
                    onClick={() => open()}
                    className={styles.button}
                    style={{ backgroundColor: 'var(--gray-100)', color: 'var(--primary)', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                  >
                    Ganti Foto
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nama Lengkap</label>
            <input 
              type="text" 
              required
              className={styles.input} 
              placeholder="Ahmad Fauzi, S.Kom"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tahun Lulus (Angkatan)</label>
            <input 
              type="number" 
              required
              className={styles.input} 
              placeholder="Contoh: 2015"
              value={formData.graduation_year}
              onChange={(e) => setFormData({...formData, graduation_year: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>WhatsApp / Telepon</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="08123456789"
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Pekerjaan Saat Ini</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Alamat Sekarang</label>
          <input 
            type="text"
            className={styles.input} 
            placeholder="Contoh: Banyuwangi, Jawa Timur"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Bio / Kutipan Singkat</label>
          <textarea 
            className={styles.input} 
            rows={3}
            placeholder="Tuliskan sedikit tentang kesibukan atau pesan untuk alumni lain..."
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          ></textarea>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            type="button" 
            onClick={() => router.back()}
            className={styles.button}
            style={{ backgroundColor: 'var(--gray-50)', color: 'var(--gray-600)' }}
          >
            Batal
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Data Alumni'}
          </button>
        </div>
      </form>
    </div>
  );
}
