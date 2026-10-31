'use client';

// ============================================================
// ESPORT WIDGET - PUBG MOBILE (Arena27 x Cybernet Project)
// Zona esports HUD tactical: hitam + gold, sudut terpotong,
// scanline, badge berdenyut. Self-contained: fetch artikel
// kategori "Esports - PUBG%" dari Supabase.
// Widget otomatis sembunyi kalau belum ada artikel PUBG.
// ============================================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function CrosshairIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="1" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="1" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="23" y2="12" />
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

export default function EsportWidget({ show = true }: { show?: boolean }) {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from('articles')
        .select('id,title,image,category,created_at')
        .eq('status', 'published')
        .ilike('category', 'Esports - PUBG%')
        .order('created_at', { ascending: false })
        .limit(5);
      if (alive && data) setNews(data);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!show || news.length === 0) return null;

  const hero = news[0];
  const rest = news.slice(1, 5);

  return (
    <section className="pubg-zone">
      <style>{`
        .pubg-zone { position: relative; overflow: hidden; margin-top: 30px; padding: 56px 18px 64px;
          background: #070502; border-top: 1px solid rgba(255,194,26,.18); }
        .pubg-zone::before { content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(620px 300px at 85% -60px, rgba(255,194,26,.16), transparent 70%),
                      radial-gradient(520px 280px at 0% 115%, rgba(255,194,26,.09), transparent 70%); }
        .pubg-zone::after { content: ''; position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, rgba(255,194,26,.025) 0 1px, transparent 1px 5px); }
        .pubg-wrap { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; }
        .pubg-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
        .pubg-title { display: flex; align-items: center; gap: 14px; }
        .pubg-ico { width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #ffc21a, #e8930c); color: #141005;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
        .pubg-title h2 { margin: 0; font-family: var(--font-anton), Impact, sans-serif; font-size: 34px;
          letter-spacing: 2px; color: #fff; line-height: 1; text-transform: uppercase; }
        .pubg-title h2 b { color: #ffc21a; }
        .pubg-sub { font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,.45); text-transform: uppercase; margin-top: 7px; }
        .pubg-badge { display: inline-flex; align-items: center; gap: 9px; padding: 9px 15px;
          border: 1px solid rgba(255,194,26,.4); background: rgba(255,194,26,.08); color: #ffc21a;
          font-size: 10px; font-weight: 800; letter-spacing: 2.5px;
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px)); }
        .pubg-badge .pulse { width: 7px; height: 7px; border-radius: 50%; background: #ffc21a; animation: pubgPulse 1.6s infinite; }
        @keyframes pubgPulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,194,26,.5); }
          50% { opacity: .55; box-shadow: 0 0 0 6px rgba(255,194,26,0); } }
        .pubg-grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: 18px; }
        .pubg-hero { position: relative; display: block; min-height: 380px; overflow: hidden; text-decoration: none;
          border: 1px solid rgba(255,194,26,.3); background: linear-gradient(135deg, #1a1204, #0d0a04);
          clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px)); }
        .pubg-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
        .pubg-hero:hover .pubg-hero-img { transform: scale(1.05); }
        .pubg-hero-shade { position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(7,5,2,.97) 8%, rgba(7,5,2,.35) 55%, rgba(7,5,2,.15) 100%); }
        .pubg-hero-tag { position: absolute; top: 16px; left: 16px; padding: 6px 13px;
          background: linear-gradient(135deg, #ffc21a, #e8930c); color: #141005;
          font-size: 10px; font-weight: 800; letter-spacing: 2px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); }
        .pubg-hero-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; }
        .pubg-hero-cat { font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #ffc21a; text-transform: uppercase; }
        .pubg-hero-title { margin-top: 8px; font-size: 24px; font-weight: 900; color: #fff; line-height: 1.25;
          text-shadow: 0 2px 10px rgba(0,0,0,.8); }
        .pubg-hero-date { margin-top: 8px; font-size: 11px; color: rgba(255,255,255,.55); letter-spacing: .5px; }
        .pubg-list { display: flex; flex-direction: column; gap: 12px; }
        .pubg-row { display: flex; gap: 14px; align-items: center; padding: 12px; text-decoration: none; flex: 1; min-height: 76px;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
          transition: background .2s ease, border-color .2s ease, transform .2s ease; }
        .pubg-row:hover { background: rgba(255,194,26,.07); border-color: rgba(255,194,26,.5); transform: translateX(4px); }
        .pubg-thumb { position: relative; flex: none; width: 86px; height: 64px; overflow: hidden;
          background: linear-gradient(135deg, #241a05, #0d0a04);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
        .pubg-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pubg-num { position: absolute; left: 6px; bottom: 3px; font-weight: 900; font-size: 16px; color: #ffc21a;
          text-shadow: 0 1px 6px rgba(0,0,0,.9); }
        .pubg-row-body { min-width: 0; }
        .pubg-row-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.35; }
        .pubg-row-meta { margin-top: 6px; font-size: 10px; letter-spacing: 1px; color: rgba(255,255,255,.45); }
        .pubg-row-meta b { color: #ffc21a; font-weight: 800; letter-spacing: 1.5px; }
        .pubg-strip { margin-top: 22px; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; flex-wrap: wrap; font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,.3); text-transform: uppercase; }
        .pubg-strip b { color: rgba(255,194,26,.65); }
        @media (max-width: 820px) {
          .pubg-grid { grid-template-columns: 1fr; }
          .pubg-hero { min-height: 240px; }
          .pubg-hero-title { font-size: 19px; }
          .pubg-title h2 { font-size: 26px; }
        }
      `}</style>

      <div className="pubg-wrap">
        <div className="pubg-head">
          <div className="pubg-title">
            <div className="pubg-ico"><CrosshairIcon /></div>
            <div>
              <h2>PUBG <b>MOBILE</b></h2>
              <div className="pubg-sub">Zona Esports &bull; Arena27</div>
            </div>
          </div>
          <div className="pubg-badge"><span className="pulse"></span>BATTLEGROUND UPDATE</div>
        </div>

        <div className="pubg-grid">
          <Link href={'/artikel/' + hero.id} className="pubg-hero">
            {hero.image && <img src={hero.image} alt={hero.title} className="pubg-hero-img" />}
            <div className="pubg-hero-shade"></div>
            <span className="pubg-hero-tag">HEADLINE</span>
            <div className="pubg-hero-body">
              <div className="pubg-hero-cat">{subCat(hero.category)}</div>
              <div className="pubg-hero-title">{hero.title}</div>
              <div className="pubg-hero-date">{fmtDate(hero.created_at)} &bull; Arena27</div>
            </div>
          </Link>

          <div className="pubg-list">
            {rest.map(function (item, idx) {
              return (
                <Link key={item.id} href={'/artikel/' + item.id} className="pubg-row">
                  <div className="pubg-thumb">
                    {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
                    <span className="pubg-num">0{idx + 2}</span>
                  </div>
                  <div className="pubg-row-body">
                    <div className="pubg-row-title">
                      {item.title.length > 62 ? item.title.substring(0, item.title.lastIndexOf(' ', 58)) + '...' : item.title}
                    </div>
                    <div className="pubg-row-meta"><b>{subCat(item.category)}</b> &bull; {fmtDate(item.created_at)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pubg-strip">
          <span><b>// DROP ZONE</b> &nbsp;ERANGEL &bull; MIRAMAR &bull; SANHOK &bull; VIKENDI</span>
          <span>ARENA27 <b>ESPORTS</b></span>
        </div>
      </div>
    </section>
  );
}
