'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef(null);
  const audioCtx = useRef(null);

  const POSTS_PER_PAGE = 20;
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  const featured = currentPage === 1 ? articles.slice(0, 3) : [];
  const regular = currentPage === 1 ? articles.slice(3) : articles;

  useEffect(() => {
    fetchArticles();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    const from = (currentPage - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;
    const { data, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .ilike('category', '%Sepak Bola%')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(from, to);
    if (data) setArticles(data);
    if (typeof count === 'number') setTotalCount(count);
    setLoading(false);
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(function(){ setClickCount(0); }, 2000);
    if (newCount >= 5) {
      setClickCount(0);
      router.push('/admin');
    }
  };

  const playClick = () => {
    try {
      if (!audioCtx.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx.current = new Ctx();
      }
      const ctx = audioCtx.current;
      const o1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      o1.connect(g1);
      g1.connect(ctx.destination);
      o1.type = 'sine';
      o1.frequency.setValueAtTime(880, ctx.currentTime);
      o1.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.18);
      g1.gain.setValueAtTime(0.28, ctx.currentTime);
      g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      o1.start(ctx.currentTime);
      o1.stop(ctx.currentTime + 0.22);
    } catch (e) {}
  };

  const handleRipple = (e, el, className) => {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    const wrap = el.querySelector('.ripple-wrap');
    if (!wrap) return;
    const c = document.createElement('span');
    c.className = className || 'ripple-circle';
    c.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
    wrap.appendChild(c);
    setTimeout(function(){ c.remove(); }, 600);
    playClick();
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return dateStr; }
  };

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800';
  const HERO_IMG = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=80';

  return (
    <div className="kbs-page">
      <style>{`
        .kbs-page { background: #0a0a0a !important; min-height: 100vh; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; color: #fff; }
        .kbs-page * { box-sizing: border-box; }
        .kbs-wrap { max-width: 720px; margin: 0 auto; padding: 0 0 40px; }

        .kbs-topbar { background: #0a0a0a; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(229,57,53,0.15); position: sticky; top: 0; z-index: 999; }
        .kbs-topbar-home { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.2s; cursor: pointer; background: none; border: none; padding: 0; }
        .kbs-topbar-home:hover { color: #e53935; }
        .kbs-topbar-brand { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #e53935; text-transform: uppercase; }

        .kbs-hero { width: 100%; height: 300px; background-image: url('${HERO_IMG}'); background-size: cover; background-position: center 25%; position: relative; }
        .kbs-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.38) 45%, rgba(10,10,10,0.98) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px 20px; }
        .kbs-hero-eyebrow { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
        .kbs-hero-region { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #e53935; }
        .kbs-hero-title { font-size: 40px; font-weight: 900; color: #fff; letter-spacing: 5px; text-transform: uppercase; line-height: 1; text-shadow: 0 4px 20px rgba(0,0,0,0.95); margin-bottom: 7px; }
        .kbs-hero-sub { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.5); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 3px; }
        .kbs-hero-site { font-size: 8.5px; color: rgba(229,57,53,0.6); letter-spacing: 1px; }

        .kbs-stats { background: #111; display: flex; border-top: 2px solid #e53935; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .kbs-stat { flex: 1; padding: 11px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
        .kbs-stat:last-child { border-right: none; }
        .kbs-stat-val { display: block; font-size: 15px; font-weight: 900; color: #e53935; font-style: italic; line-height: 1; margin-bottom: 2px; }
        .kbs-stat-lbl { display: block; font-size: 7px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.4); }

        .kbs-list-hd { display: flex; align-items: center; gap: 9px; padding: 16px 16px 10px; background: #0e0e0e; }
        .kbs-list-bar { width: 3px; height: 16px; background: #e53935; border-radius: 2px; flex-shrink: 0; }
        .kbs-list-lbl { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #fff; }
        .kbs-list-count { margin-left: auto; font-size: 8.5px; font-weight: 700; color: rgba(229,57,53,0.7); letter-spacing: 1px; }
        .kbs-list-badge { margin-left: auto; font-size: 8px; font-weight: 800; letter-spacing: 1px; color: #fff; background: linear-gradient(135deg, #e53935, #b71c1c); padding: 3px 8px; border-radius: 4px; }

        .kbs-featured-wrap { background: #0a0a0a; padding: 0 12px 12px; display: flex; flex-direction: column; gap: 12px; }
        .kbs-featured-card { display: block; position: relative; border-radius: 16px; overflow: hidden; text-decoration: none; aspect-ratio: 16 / 10; transition: transform 0.2s ease; -webkit-tap-highlight-color: transparent; cursor: pointer; }
        .kbs-featured-card:active { transform: scale(0.98); }
        .kbs-featured-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .kbs-featured-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
        .kbs-featured-rank { position: absolute; top: 12px; left: 12px; background: #e53935; color: #fff; font-size: 10px; font-weight: 900; letter-spacing: 1.5px; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; box-shadow: 0 4px 14px rgba(229,57,53,0.5); z-index: 2; }
        .kbs-featured-subcat { display: inline-block; font-size: 8px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; background: rgba(229,57,53,0.9); padding: 3px 8px; border-radius: 4px; margin-bottom: 8px; align-self: flex-start; }
        .kbs-featured-title { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-shadow: 0 2px 8px rgba(0,0,0,0.8); position: relative; z-index: 2; }
        .kbs-featured-meta { font-size: 9px; color: rgba(255,255,255,0.7); letter-spacing: 0.5px; position: relative; z-index: 2; }

        .kbs-list { background: #0e0e0e; padding: 0 12px 12px; }
        .kbs-card { display: flex; align-items: center; gap: 12px; background: linear-gradient(105deg, #1e1e1e 0%, #181818 70%, #141414 100%); border-radius: 14px; margin-bottom: 9px; padding: 12px 12px 12px 16px; text-decoration: none; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.18s ease, box-shadow 0.18s ease; -webkit-tap-highlight-color: transparent; cursor: pointer; }
        .kbs-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #e53935, rgba(229,57,53,0.08)); border-radius: 14px 0 0 14px; }
        .kbs-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(229,57,53,0.18); border-color: rgba(229,57,53,0.18); }
        .kbs-card:active { transform: scale(0.98); }

        .ripple-wrap { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .ripple-circle { position: absolute; border-radius: 50%; background: rgba(229,57,53,0.28); transform: scale(0); animation: kbsRipple 0.55s linear; pointer-events: none; }
        @keyframes kbsRipple { to { transform: scale(4); opacity: 0; } }

        .kbs-card-body { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; position: relative; z-index: 1; }
        .kbs-card-title { font-size: 12px; font-weight: 600; color: #f2f2f2; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .kbs-card-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .kbs-card-date { font-size: 8.5px; color: rgba(229,57,53,0.7); letter-spacing: 0.5px; }
        .kbs-meta-dot { font-size: 8px; color: rgba(255,255,255,0.2); }
        .kbs-card-subcat { font-size: 8px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #fff; background: rgba(229,57,53,0.2); border: 1px solid rgba(229,57,53,0.3); padding: 2px 7px; border-radius: 4px; white-space: nowrap; }

        .kbs-thumb-wrap { position: relative; flex-shrink: 0; width: 74px; height: 74px; border-radius: 10px; overflow: hidden; z-index: 1; }
        .kbs-thumb-img { width: 74px; height: 74px; object-fit: cover; display: block; border-radius: 10px; opacity: 0.9; }
        .kbs-thumb-fallback { width: 74px; height: 74px; background: #252525; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #e53935; border-radius: 10px; }
        .kbs-thumb-line { position: absolute; right: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #e53935, rgba(229,57,53,0.08)); border-radius: 0 10px 10px 0; }
        .kbs-arrow { font-size: 20px; color: rgba(229,57,53,0.35); flex-shrink: 0; position: relative; z-index: 1; }

        .kbs-pagination { display: flex; align-items: center; justify-content: space-between; padding: 16px 12px 8px; background: #0e0e0e; gap: 10px; }
        .kbs-page-info { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .kbs-page-btn { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; text-decoration: none; background: linear-gradient(135deg, #e53935, #b71c1c); padding: 10px 20px; border-radius: 8px; box-shadow: 0 3px 14px rgba(229,57,53,0.4); transition: all 0.2s ease; border: none; cursor: pointer; }
        .kbs-page-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(229,57,53,0.6); }
        .kbs-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .kbs-page-ghost { width: 100px; }

        .kbs-loading { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.5); }
        .kbs-spinner { display: inline-block; width: 40px; height: 40px; border: 3px solid rgba(229,57,53,0.2); border-top-color: #e53935; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .kbs-empty { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.5); background: #0e0e0e; margin: 0 12px; border-radius: 12px; }

        .kbs-footer { background: #0a0a0a; padding: 30px 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 20px; }
        .kbs-footer-title { font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .kbs-footer-title span { color: #e53935; }
        .kbs-footer-text { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }

        @media (max-width: 600px) {
          .kbs-hero { height: 230px; }
          .kbs-hero-title { font-size: 28px; letter-spacing: 3px; }
          .kbs-thumb-wrap { width: 62px; height: 62px; }
          .kbs-thumb-img { width: 62px; height: 62px; }
          .kbs-thumb-fallback { width: 62px; height: 62px; font-size: 20px; }
          .kbs-card-title { font-size: 11px; }
          .kbs-featured-title { font-size: 15px; }
          .kbs-topbar-home span.txt { display: none; }
        }
      `}</style>

      <div className="kbs-wrap">
        {/* TOPBAR */}
        <div className="kbs-topbar">
          <button onClick={handleLogoClick} className="kbs-topbar-home">
            <span>←</span> <span className="txt">Beranda</span>
            {clickCount > 0 && clickCount < 5 && <span style={{color:'#e53935',marginLeft:6}}>{clickCount}/5</span>}
          </button>
          <span className="kbs-topbar-brand">Kaba Sepakbola</span>
        </div>

        {/* HERO */}
        <div className="kbs-hero">
          <div className="kbs-hero-overlay">
            <div className="kbs-hero-eyebrow">
              <span>⚽</span>
              <span className="kbs-hero-region">Arena27</span>
            </div>
            <div className="kbs-hero-title">KABA SEPAKBOLA</div>
            <div className="kbs-hero-sub">Berita Terkini Dunia Sepakbola</div>
            <div className="kbs-hero-site">arena27.com</div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="kbs-stats">
          <div className="kbs-stat">
            <span className="kbs-stat-val">⚽ BOLA</span>
            <span className="kbs-stat-lbl">Kategori</span>
          </div>
          <div className="kbs-stat">
            <span className="kbs-stat-val">{totalCount}</span>
            <span className="kbs-stat-lbl">Total Artikel</span>
          </div>
          <div className="kbs-stat">
            <span className="kbs-stat-val">{currentPage} / {totalPages}</span>
            <span className="kbs-stat-lbl">Halaman</span>
          </div>
        </div>

        {loading ? (
          <div className="kbs-loading">
            <div className="kbs-spinner"></div>
            <p style={{marginTop:16,fontSize:12}}>Memuat berita dari cloud...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="kbs-empty">
            <p style={{fontSize:16,marginBottom:8}}>⚽ Belum ada berita sepakbola</p>
            <p style={{fontSize:12}}>Tulis berita pertamamu di Admin Panel!</p>
          </div>
        ) : (
          <>
            {/* 3 BERITA UNGGULAN (HANYA DI HALAMAN 1) */}
            {featured.length > 0 && (
              <>
                <div className="kbs-list-hd">
                  <span className="kbs-list-bar"></span>
                  <span className="kbs-list-lbl">Berita Unggulan</span>
                  <span className="kbs-list-badge">TOP 3</span>
                </div>
                <div className="kbs-featured-wrap">
                  {featured.map(function(item, idx){
                    const rank = idx + 1;
                    const handleClick = function(e){
                      const card = e.currentTarget;
                      handleRipple(e, card, 'ripple-circle');
                      setTimeout(function(){ router.push('/artikel/' + item.id); }, 200);
                    };
                    return (
                      <div key={item.id} onClick={handleClick} className="kbs-featured-card">
                        <span className="ripple-wrap"></span>
                        <img src={item.image || FALLBACK_IMG} alt={item.title} className="kbs-featured-img" onError={function(e){ e.currentTarget.src = FALLBACK_IMG; }} />
                        <span className="kbs-featured-rank">#{rank} Unggulan</span>
                        <div className="kbs-featured-overlay">
                          <span className="kbs-featured-subcat">{item.category}</span>
                          <div className="kbs-featured-title">{item.title}</div>
                          <span className="kbs-featured-meta">📅 {formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* LIST BERITA LAINNYA */}
            {regular.length > 0 && (
              <>
                <div className="kbs-list-hd">
                  <span className="kbs-list-bar"></span>
                  <span className="kbs-list-lbl">{currentPage === 1 ? 'Berita Lainnya' : 'Berita Terbaru'}</span>
                  <span className="kbs-list-count">{regular.length} artikel</span>
                </div>
                <div className="kbs-list">
                  {regular.map(function(item){
                    const handleClick = function(e){
                      const card = e.currentTarget;
                      handleRipple(e, card, 'ripple-circle');
                      setTimeout(function(){ router.push('/artikel/' + item.id); }, 200);
                    };
                    return (
                      <div key={item.id} onClick={handleClick} className="kbs-card">
                        <span className="ripple-wrap"></span>
                        <span className="kbs-card-body">
                          <span className="kbs-card-title">{item.title}</span>
                          <span className="kbs-card-meta">
                            <span className="kbs-card-date">{formatDate(item.created_at)}</span>
                            <span className="kbs-meta-dot">·</span>
                            <span className="kbs-card-subcat">{item.category}</span>
                          </span>
                        </span>
                        <span className="kbs-thumb-wrap">
                          <img src={item.image || FALLBACK_IMG} alt={item.title} className="kbs-thumb-img" onError={function(e){ e.currentTarget.src = FALLBACK_IMG; }} />
                          <span className="kbs-thumb-line"></span>
                        </span>
                        <span className="kbs-arrow">›</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="kbs-pagination">
                {currentPage > 1 ? (
                  <button onClick={function(){ setCurrentPage(currentPage - 1); }} className="kbs-page-btn">‹ Sebelumnya</button>
                ) : <span className="kbs-page-ghost"></span>}
                <span className="kbs-page-info">Hal {currentPage} dari {totalPages}</span>
                {currentPage < totalPages ? (
                  <button onClick={function(){ setCurrentPage(currentPage + 1); }} className="kbs-page-btn">Selanjutnya ›</button>
                ) : <span className="kbs-page-ghost"></span>}
              </div>
            )}
          </>
        )}
      </div>

      <footer className="kbs-footer">
        <div className="kbs-footer-title"><span>ARENA</span>27</div>
        <div className="kbs-footer-text">© 2026 Arena27 Sport Portal</div>
      </footer>
    </div>
  );
}
