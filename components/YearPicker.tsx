'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function YearPicker() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);

  const currentYear = searchParams.get('year') || '';

  const startYear = 1973;
  const endYear = new Date().getFullYear();

  // Generate Decades (e.g., 1970, 1980, ...)
  const decades = [];
  for (let d = Math.floor(startYear / 10) * 10; d <= endYear; d += 10) {
    decades.push(d);
  }

  // Helper to build URL
  const getUrl = (year?: string | number) => {
    // Jika memanggil getUrl() tanpa argumen, hapus semua parameter (Reset Total)
    if (year === undefined) {
      return '/alumni';
    }

    const params = new URLSearchParams(window.location.search);
    params.set('year', year.toString());
    
    const queryString = params.toString();
    return `/alumni?${queryString}`;
  };

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          borderRadius: '15px',
          border: '1px solid var(--gray-200)',
          background: 'white',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 600,
          color: currentYear ? 'var(--primary)' : 'var(--gray-600)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <span>{currentYear ? `📅 Tahun Masuk: ${currentYear}` : '📅 Pilih Tahun Masuk (Angkatan)'}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-100)',
          padding: '1.5rem',
          zIndex: 100
        }}>
          {!selectedDecade ? (
            <>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>Pilih Rentang Dekade:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a
                  href={getUrl()}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--gray-200)',
                    background: 'var(--gray-50)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: 'var(--foreground)',
                    textDecoration: 'none'
                  }}
                >
                  Semua Tahun
                </a>
                {decades.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDecade(d)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid var(--gray-200)',
                      background: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{d} - {d + 9}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDecade(null)}
                  style={{ background: 'var(--gray-100)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-700)', cursor: 'pointer', border: 'none' }}
                >
                  ← Kembali ke Dekade
                </button>
                <a
                  href={getUrl()}
                  style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  ✕ Hapus Filter Tahun
                </a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
                {Array.from({ length: 10 }, (_, i) => selectedDecade + i)
                  .filter(y => y >= startYear && y <= endYear)
                  .map(y => (
                    <a
                      key={y}
                      href={getUrl(y)}
                      style={{
                        padding: '0.6rem 0',
                        borderRadius: '8px',
                        border: '1px solid var(--gray-200)',
                        background: currentYear === y.toString() ? 'var(--primary)' : 'white',
                        color: currentYear === y.toString() ? 'white' : 'var(--gray-700)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      {y}
                    </a>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
