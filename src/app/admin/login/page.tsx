'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ganti password ini sesuai keinginan lu
    if (password === 'QR?005eboox') {
      // Set cookie auth (berlaku 7 hari)
      document.cookie = 'arena27_admin_auth=authenticated; path=/; max-age=' + (7 * 24 * 60 * 60);
      router.push('/admin');
    } else {
      setError('Password salah!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40, width: '100%', maxWidth: 400 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, textAlign: 'center' }}>
          <span style={{ color: '#ff6b00' }}>ARENA</span>27
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', marginBottom: 24 }}>Masukkan password untuk akses admin</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 10, color: '#fff', fontSize: 14, marginBottom: 12 }}
          />
          {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>{error}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '12px 16px', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
