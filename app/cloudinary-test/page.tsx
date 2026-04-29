'use client'

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export default function CloudinaryTest() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Cloudinary Connection Test</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Mencoba menampilkan gambar contoh (cld-sample)</h3>
        <p>Jika Cloud Name Anda benar, gambar di bawah ini akan muncul:</p>
        
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <CldImage
            width="400"
            height="300"
            src="cld-sample" // Ini adalah sample default di hampir semua akun Cloudinary
            alt="Contoh Gambar Cloudinary"
            onError={(err) => {
                console.error(err);
                setError('Gagal memuat gambar. Pastikan NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME di .env.local sudah benar.');
            }}
          />
        </div>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <p><strong>Cloud Name:</strong> {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Belum diatur'}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/">Kembali ke Beranda</a>
      </div>
    </div>
  );
}
