'use client';

// ============================================================
// LOGIN ADMIN v2 - Arena27 (desain premium, password tidak berubah)
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password === 'QR?005eboox') {
      // Cookie auth berlaku 7 hari (dicek oleh src/middleware.ts)
      document.cookie = 'arena27_admin_auth=authenticated; path=/; max-age=' + (7 * 24 * 60 * 60);
      router.push('/admin');
    } else {
      setError('Password salah. Coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="al27-page">
      <style>{`
        .al27-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;
          background: radial-gradient(700px 400px at 20% 0%, rgba(255,107,0,.1), transparent 60%),
                      radial-gradient(700px 400px at 100% 100%, rgba(255,107,0,.06), transparent 60%), #0a0a0a; }
        .al27-card { width: 100%; max-width: 400px; background: #121212; border: 1px solid #262626;
          border-radius: 20px; padding: 36px 30px 28px; box-shadow: 0 24px 70px rgba(0,0,0,.55); }
        .al27-logo { text-align: center; font-size: 28px; font-weight: 900; color: #fff; letter-spacing: 1px; margin: 0; }
        .al27-logo b { color: #ff6b00; }
        .al27-tag { text-align: center; font-size: 9px; letter-spacing: 3.5px; color: #6b7280; font-weight: 800; margin: 6px 0 26px; }
        .al27-field { position: relative; margin-bottom: 12px; }
        .al27-input { width: 100%; padding: 13px 46px 13px 16px; background: #0a0a0a; border: 1px solid #2a2a2a;
          border-radius: 12px; color: #fff; font-size: 14px; outline: none; box-sizing: border-box; transition: border-color .15s ease; }
        .al27-input:focus { border-color: #ff6b00; }
        .al27-input::placeholder { color: #52525b; }
        .al27-eye { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none;
          border: none; cursor: pointer; font-size: 16px; padding: 6px; line-height: 1; }
        .al27-err { font-size: 12px; color: #f87171; margin: 0 0 12px; text-align: center; }
        .al27-btn { width: 100%; padding: 13px 16px; background: linear-gradient(135deg, #ff8a2a, #ff6b00);
          color: #fff; border: none; border-radius: 12px; font-size: 14px; font-weight: 800; letter-spacing: 1px;
          cursor: pointer; transition: transform .15s ease, box-shadow .15s ease; font-family: inherit; }
        .al27-btn:hover { box-shadow: 0 8px 24px rgba(255,107,0,.4); }
        .al27-btn:active { transform: scale(.98); }
        .al27-btn:disabled { opacity: .6; cursor: default; }
        .al27-foot { text-align: center; font-size: 10px; color: #4b5563; letter-spacing: 1px; margin-top: 22px; }
      `}</style>

      <div className="al27-card">
        <h1 className="al27-logo">ARENA<b>27</b></h1>
        <p className="al27-tag">PANEL ADMIN</p>
        <form onSubmit={handleLogin}>
          <div className="al27-field">
            <input
              className="al27-input"
              type={show ? 'text' : 'password'}
              placeholder="Password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="button" className="al27-eye" onClick={() => setShow(!show)} aria-label="Tampilkan password">
              {show ? '🙈' : '👁️'}
            </button>
          </div>
          {error && <p className="al27-err">{error}</p>}
          <button type="submit" className="al27-btn" disabled={loading || password.length === 0}>
            {loading ? 'MEMERIKSA...' : 'MASUK PANEL'}
          </button>
        </form>
        <p className="al27-foot">Arena27 Admin &bull; Cybernet Project</p>
      </div>
    </div>
  );
}
