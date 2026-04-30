'use client'

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

export default function GabungAlumniPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    entry_year: '',
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
      const { error } = await supabase
        .from('alumni_submissions')
        .insert([{
          full_name: formData.full_name,
          entry_year: parseInt(formData.entry_year),
          occupation: formData.occupation,
          phone_number: formData.phone_number,
          address: formData.address,
          bio: formData.bio,
          avatar_url: formData.avatar_url
        }]);

      if (error) throw error;

      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main>
        <Navbar />
        <div style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>
              <h1 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Pendaftaran Berhasil!</h1>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Terima kasih telah mendaftar sebagai alumni IKSANU. Data Anda telah kami terima dan sedang dalam antrean **verifikasi oleh Admin**.
                Data Anda akan muncul di direktori setelah disetujui.
              </p>
              <button 
                onClick={() => router.push('/alumni')}
                className="premium-gradient"
                style={{ color: 'white', padding: '1rem 2.5rem', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
              >
                Kembali ke Direktori
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <section className="container">
          <SectionHeading 
            title="Gabung Alumni" 
            subtitle="Daftarkan diri Anda untuk mempererat silaturahmi" 
          />
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: '30px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-100)' }}>
              
              <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--gray-500)', marginBottom: '1rem', fontSize: '0.9rem' }}>Foto Profil (Opsional)</p>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {formData.avatar_url ? (
                    <img 
                      src={formData.avatar_url} 
                      alt="Preview" 
                      style={{ width: '120px', height: '120px', borderRadius: '30px', objectFit: 'cover', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} 
                    />
                  ) : (
                    <div style={{ width: '120px', height: '120px', borderRadius: '30px', backgroundColor: 'var(--gray-50)', border: '2px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                      👤
                    </div>
                  )}
                  
                  <div style={{ marginTop: '1rem' }}>
                    <CldUploadWidget 
                      uploadPreset="iksanu_cloudinary_upload"
                      onSuccess={(result: any) => {
                        if (result.info && typeof result.info !== 'string') {
                          setFormData({ ...formData, avatar_url: result.info.secure_url });
                        }
                      }}
                    >
                      {({ open }) => (
                        <button 
                          type="button" 
                          onClick={() => open()}
                          style={{ background: 'var(--gray-100)', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Upload Foto
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Masukkan nama lengkap"
                    style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Tahun Masuk (Angkatan)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="Contoh: 2015"
                    style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}
                    value={formData.entry_year}
                    onChange={(e) => setFormData({...formData, entry_year: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>No. WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="0812..."
                    style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Pekerjaan Saat Ini</label>
                  <input 
                    type="text" 
                    placeholder="Guru, Pengusaha, dll"
                    style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Alamat Sekarang</label>
                <input 
                  type="text" 
                  placeholder="Kota, Provinsi"
                  style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Bio Singkat</label>
                <textarea 
                  rows={3}
                  placeholder="Ceritakan sedikit kesibukan Anda..."
                  style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--gray-200)', resize: 'none' }}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="premium-gradient"
                style={{ width: '100%', color: 'white', padding: '1.2rem', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                {loading ? 'Mengirim...' : 'Kirim Data untuk Verifikasi'}
              </button>
              
              <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                * Data Anda akan diverifikasi terlebih dahulu oleh admin sebelum dipublikasikan.
              </p>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
