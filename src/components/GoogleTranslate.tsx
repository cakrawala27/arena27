'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LANGUAGES = [
  { code: 'id', name: '🇮🇩 Indonesia' },
  { code: 'en', name: '🇬🇧 English' },
  { code: 'es', name: '🇪🇸 Español' },
  { code: 'it', name: '🇮🇹 Italiano' },
  { code: 'pl', name: '🇵🇱 Polski' },
  { code: 'ro', name: '🇷🇴 Română' },
];

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide di halaman admin
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    // Set cookie googtrans
    document.cookie = `googtrans=/id/${langCode}; path=/;`;
    // Reload halaman
    window.location.reload();
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 16, zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 80,
          right: 0,
          background: '#161616',
          border: '1px solid #ff6b00',
          borderRadius: 12,
          padding: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          minWidth: 180,
        }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'block',
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                padding: '10px 14px',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: 8,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#262626'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <img
          src="/translate-icon.webp"
          alt="Translate"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            objectFit: 'contain',
          }}
        />
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#ff6b00',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          background: '#0a0a0a',
          padding: '2px 6px',
          borderRadius: 4,
        }}>
          Translate
        </span>
      </button>
    </div>
  );
}
