'use client';

// ============================================================
// HALAMAN ARSIP - ZONA ESPORTS PUBG MOBILE (Arena27)
// Rute: /esport/pubg
// Menampilkan SEMUA artikel kategori "Esports - PUBG%".
// Dibuka dari tombol LIHAT SEMUA di EsportWidget (homepage).
// ============================================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const PAGE_SIZE = 12;

function CrosshairIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="1" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="1" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="23" y2="12" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function subCat(cat?: string) {
  if (!cat) return 'PUBG Mobile';
  const parts = cat.split(' - ');
  return parts[parts.length - 1] || cat;
}

export default function PubgArchivePage() {
  const [news, setNews] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const loadPage = async (offset: number) => {
    setBusy(true);
    const query = supabase
      .from('articles')
      .select('id,title,image,category,created_at', { count: 'exact' })
      .eq('status', 'published')
      .ilike('category', 'Esports - PUBG%')
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    const { data, count } = await query;
    if (typeof count === 'number') setTotal(count);
    if (data) {
      setNews(function (prev) {
        return offset === 0 ? data : prev.concat(data);
      });
    }
    setBusy(false);
    setLoading(false);
  };

  useEffect(function () {
    loadPage(0);
  }, []);

  const hasMore = news.length > 0 && news.length < total;

  return (
    <main className="pga-page">
      <style>{`
        .pga-page { min-height: 100vh; background: #070502; color: #fff; position: relative; overflow-x: hidden; padding-bottom: 60px; }
        .pga-page::before { content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(700px 340px at 85% -80px, rgba(255,194,26,.14), transparent 70%),
                      radial-gradient(600px 320px at 0% 110%, rgba(255,194,26,.08), transparent 70%); }
        .pga-page::after { content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(0deg, rgba(255,194,26,.02) 0 1px, transparent 1px 5px); }
        .pga-topbar { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,194,26,.15); background: rgba(7,5,2,.85); }
        .pga-back { display: inline-flex; align-items: center; gap: 8px; color: #ffc21a; text-decoration: none;
          font-size: 11px; font-weight: 900; letter-spacing: 2.5px; }
        .pga-back:hover { color: #ffd75e; }
        .pga-brand { font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,.5); }
        .pga-brand b { color: #ffc21a; }
        .pga-wrap { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 40px 18px 0; }
        .pga-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 26px; }
        .pga-title { display: flex; align-items: center; gap: 14px; }
        .pga-ico { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #ffc21a, #e8930c); color: #141005;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
        .pga-title h1 { margin: 0; font-family: var(--font-anton), Impact, sans-serif; font-size: 38px;
          letter-spacing: 2px; color: #fff; line-height: 1; text-transform: uppercase; }
        .pga-title h1 b { color: #ffc21a; }
        .pga-sub { font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,.45); text-transform: uppercase; margin-top: 8px; }
        .pga-chip { padding: 9px 15px; border: 1px solid rgba(255,194,26,.4); background: rgba(255,194,26,.08);
          color: #ffc21a; font-size: 10px; font-weight: 800; letter-spacing: 2.5px;
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px)); }
        .pga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
        .pga-card { display: flex; flex-direction: column; text-decoration: none; overflow: hidden;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
          transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .pga-card:hover { transform: translateY(-4px); border-color: rgba(255,194,26,.5); background: rgba(255,194,26,.05); }
        .pga-thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; background: linear-gradient(135deg, #241a05, #0d0a04); }
        .pga-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
        .pga-card:hover .pga-thumb img { transform: scale(1.06); }
        .pga-tag { position: absolute; top: 12px; left: 12px; padding: 5px 11px;
          background: linear-gradient(135deg, #ffc21a, #e8930c); color: #141005;
          font-size: 9px; font-weight: 800; letter-spacing: 2px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); }
        .pga-body { padding: 16px; }
        .pga-card-title { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.4; }
        .pga-card:hover .pga-card-title { color: #ffd75e; }
        .pga-card-date { margin-top: 10px; font-size: 10px; letter-spacing: 1px; color: rgba(255,255,255,.45); }
        .pga-more-wrap { display: flex; justify-content: center; margin-top: 28px; }
        .pga-more { display: inline-flex; align-items: center; gap: 9px; padding: 12px 22px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #ffc21a, #e8930c); color: #141005;
          font-family: var(--font-anton), Impact, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 3px;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; }
        .pga-more:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(255,194,26,.45); filter: brightness(1.07); }
        .pga-more:disabled { opacity: .6; transform: none; box-shadow: none; cursor: default; }
        .pga-loading { display: flex; flex-direction: column; align-items: center; padding: 80px 0; gap: 16px;
          color: rgba(255,255,255,.5); font-size: 12px; letter-spacing: 1px; }
        .pga-spinner { width: 34px; height: 34px; border-radius: 50%; border: 3px solid rgba(255,194,26,.2);
          border-top-color: #ffc21a; animation: pgaSpin .8s linear infinite; }
        @keyframes pgaSpin { to { transform: rotate(360deg); } }
        .pga-empty { text-align: center; padding: 80px 0; color: rgba(255,255,255,.55); font-size: 14px; }
        .pga-backlink { display: inline-block; margin-top: 14px; color: #ffc21a; text-decoration: none;
          font-size: 12px; letter-spacing: 1.5px; font-weight: 800; }
        .pga-strip { margin-top: 40px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
          font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,.3); text-transform: uppercase;
          border-top: 1px solid rgba(255,194,26,.12); padding-top: 18px; }
        .pga-strip b { color: rgba(255,194,26,.65); }
        @media (max-width: 640px) {
          .pga-title h1 { font-size: 28px; }
          .pga-ico { width: 44px; height: 44px; }
        }
      `}</style>

      <div className="pga-topbar">
        <Link href="/" className="pga-back"><BackIcon /> PORTAL</Link>
        <span className="pga-brand">ARENA27 <b>ESPORTS</b></span>
      </div>

      <div className="pga-wrap">
        <div className="pga-head">
          <div className="pga-title">
            <div className="pga-ico"><CrosshairIcon /></div>
            <div>
              <h1>PUBG <b>MOBILE</b></h1>
              <div className="pga-sub">Arsip Lengkap Zona Esports &bull; Arena27</div>
            </div>
          </div>
          <div className="pga-chip">{total} ARTIKEL</div>
        </div>

        {loading ? (
          <div className="pga-loading">
            <div className="pga-spinner"></div>
            <p>Memuat berita dari cloud...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="pga-empty">
            <p>Belum ada artikel PUBG.</p>
            <Link href="/" className="pga-backlink">&larr; Kembali ke Portal</Link>
          </div>
        ) : (
          <>
            <div className="pga-grid">
              {news.map(function (item) {
                return (
                  <Link key={item.id} href={'/artikel/' + item.id} className="pga-card">
                    <div className="pga-thumb">
                      {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
                      <span className="pga-tag">{subCat(item.category)}</span>
                    </div>
                    <div className="pga-body">
                      <div className="pga-card-title">{item.title}</div>
                      <div className="pga-card-date">{fmtDate(item.created_at)} &bull; Arena27</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {hasMore && (
              <div className="pga-more-wrap">
                <button type="button" className="pga-more" disabled={busy}
                  onClick={function () { loadPage(news.length); }}>
                  {busy ? 'MEMUAT...' : 'MUAT LAGI (' + news.length + '/' + total + ')'}
                </button>
              </div>
            )}
          </>
        )}

        <div className="pga-strip">
          <span><b>// DROP ZONE</b> &nbsp;ERANGEL &bull; MIRAMAR &bull; SANHOK &bull; VIKENDI</span>
          <span>ARENA27 <b>ESPORTS</b></span>
        </div>
      </div>
    </main>
  );
}

