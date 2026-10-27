'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BasketWidget from '@/components/BasketWidget';

const FILTER_CATEGORIES = ['Semua', 'Sepak Bola', 'Basket', 'Sport', 'Esports', 'Mata Dunia'];

  <style jsx global>{`
    html {
      scroll-behavior: smooth;
    }
  `}</style>
  

export default function HomePage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const audioCtx = useRef(null);

  const POSTS_PER_PAGE = 6;
  const featured = currentPage === 1 ? articles.slice(0, 3) : [];
  const regular = currentPage === 1 ? articles.slice(3) : articles;

  useEffect(() => {
    fetchArticles();
    window.scrollTo(0, 0);
  }, [currentPage, activeFilter]);

  const fetchArticles = async () => {
    setLoading(true);
    const from = (currentPage - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (activeFilter !== 'Semua') {
      // Smart filter: untuk "Sepak Bola", cari semua kategori yang mengandung "Sepak"
      const searchKeyword = activeFilter.toUpperCase().includes("SEPAK") ? "Sepak" : activeFilter;
      query = query.ilike('category', '%' + searchKeyword + '%');
    }
    const { data, count } = await query.range(from, to);
    if (data) setArticles(data);
    if (typeof count === 'number') setTotalCount(count);
    setLoading(false);
  };

  const [footNews, setFootNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchFoot = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Liga Champions%')
        .order('created_at', { ascending: false })
        .limit(4);
      if (data) setFootNews(data);
    };
    fetchFoot();
  }, []);

  const [plNews, setPlNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchPL = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Premier League%')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setPlNews(data);
    };
    fetchPL();
  }, []);

  // ===== INDONESIA FOOTBALL FETCH =====
  const [indoNews, setIndoNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchIndo = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Liga Indonesia%')
        .order('created_at', { ascending: false })
        .limit(20);
      if (data) setIndoNews(data);
    };
    fetchIndo();
  }, []);

  // ===== BASKET FETCH =====
  const [basketNews, setBasketNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchBasket = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Basket%')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) setBasketNews(data);
    };
    fetchBasket();
  }, []);

  // ===== MOTOGP FETCH =====
  const [motogpNews, setMotogpNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchMotoGP = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%MotoGP%')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setMotogpNews(data);
    };
    fetchMotoGP();
  }, []);

  // ===== SERIE A FETCH =====
  const [saNews, setSaNews] = useState<any[]>([]);
  useEffect(() => {
    const fetchSA = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Serie A%')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setSaNews(data);
    };
    fetchSA();
  }, []);


  const handleFilterClick = (cat) => {
    setActiveFilter(cat);
    setCurrentPage(1);
    playClick();
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
    <div style={{background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0 !important; padding: 0 !important; background: #0a0a0a !important; }

        /* HEADER TERPISAH - DI LUAR WRAPPER */
        .arena-topbar { 
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: #0a0a0a; 
          padding: 10px 16px; 
          display: flex; 
          align-items: center; 
          justify-content: flex-end; 
          border-bottom: 1px solid rgba(229,57,53,0.15);
          transform: none !important;
          animation: none !important;
          transition: none !important;
        }
        .arena-topbar-logo { 
          font-size: 14px; 
          font-weight: 900; 
          letter-spacing: 2px; 
          color: #fff; 
          cursor: pointer; 
          user-select: none;
        }
        .arena-topbar-logo span { color: #ff6b00; }
        .arena-topbar-counter { 
          font-size: 10px; 
          color: #ff6b00; 
          margin-left: 8px; 
          font-weight: 700; 
        }

        /* WRAPPER KONTEN - TERPISAH DARI HEADER */
        .arena-wrap { 
          max-width: 720px; 
          margin: 0 auto; 
          padding: 0 0 40px;
        }

        .arena-hero { 
          width: 100%; 
          height: 160px; 
          background-image: url('${HERO_IMG}'); 
          background-size: cover; 
          background-position: center 40%; 
          position: relative; 
        }
        .arena-hero-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(10,10,10,0.92) 100%); 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          padding: 16px 12px; 
          gap: 14px; 
        }
        .arena-hero-title { 
          font-size: 38px; 
          font-weight: 900; 
          letter-spacing: 6px; 
          text-transform: uppercase; 
          line-height: 1; 
          text-shadow: 0 4px 20px rgba(0,0,0,0.95); 
          margin: 0; 
          text-align: center; 
        }
        .arena-hero-title span { color: #ff6b00; }

        .arena-filter-wrap { 
          display: flex; 
          gap: 4px; 
          overflow-x: auto; 
          max-width: 100%; 
          padding-bottom: 2px; 
          scrollbar-width: none; 
        }
        .arena-filter-wrap::-webkit-scrollbar { display: none; }
        .arena-filter-btn { 
          font-size: 10px; 
          font-weight: 800; 
          letter-spacing: 1.2px; 
          text-transform: uppercase; 
          padding: 6px 12px; 
          border-radius: 20px; 
          border: 1.5px solid rgba(255,255,255,0.25); 
          background: rgba(0,0,0,0.3); 
          color: rgba(255,255,255,0.85); 
          cursor: pointer; 
          white-space: nowrap; 
          transition: all 0.2s ease; 
        }
        .arena-filter-btn.active { 
          background: #ff6b00; 
          border-color: #ff6b00; 
          color: #fff; 
          box-shadow: 0 4px 14px rgba(229,57,53,0.5); 
        }

        .arena-list-hd { 
          display: flex; 
          align-items: center; 
          gap: 9px; 
          padding: 16px 16px 10px; 
          background: #0e0e0e; 
        }
        .arena-list-bar { 
          width: 3px; 
          height: 16px; 
          background: #ff6b00; 
          border-radius: 2px; 
          flex-shrink: 0; 
        }
        .arena-list-lbl { 
          font-size: 11px; 
          font-weight: 800; 
          letter-spacing: 2px; 
          text-transform: uppercase; 
          color: #fff; 
        }
        .arena-list-count { 
          margin-left: auto; 
          font-size: 8.5px; 
          font-weight: 700; 
          color: rgba(229,57,53,0.7); 
          letter-spacing: 1px; 
        }
        .arena-list-badge { 
          margin-left: auto; 
          font-size: 8px; 
          font-weight: 800; 
          letter-spacing: 1px; 
          color: #fff; 
          background: linear-gradient(135deg, #ff6b00, #b71c1c); 
          padding: 3px 8px; 
          border-radius: 4px; 
        }
        .arena-filter-info { 
          padding: 8px 16px; 
          background: #0e0e0e; 
          border-bottom: 1px solid rgba(255,255,255,0.05); 
          font-size: 10px; 
          color: rgba(255,255,255,0.5); 
          letter-spacing: 1px; 
        }
        .arena-filter-info b { color: #ff6b00; font-weight: 800; }

        .arena-featured-wrap { 
          background: #0a0a0a; 
          padding: 0 12px 12px; 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
        }
        .arena-featured-card { 
          display: block; 
          position: relative; 
          border-radius: 16px; 
          overflow: hidden; 
          aspect-ratio: 16 / 10; 
          cursor: pointer; 
        }
        .arena-featured-card:active { transform: scale(0.98); }
        .arena-featured-img { 
          position: absolute; 
          inset: 0; 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
        }
        .arena-featured-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%); 
          display: flex; 
          flex-direction: column; 
          justify-content: flex-end; 
          padding: 20px; 
        }
        .arena-featured-rank { 
          position: absolute; 
          top: 12px; 
          left: 12px; 
          background: #ff6b00; 
          color: #fff; 
          font-size: 10px; 
          font-weight: 900; 
          letter-spacing: 1.5px; 
          padding: 5px 10px; 
          border-radius: 6px; 
          z-index: 2; 
        }
        .arena-featured-subcat { 
          display: inline-block; 
          font-size: 8px; 
          font-weight: 700; 
          letter-spacing: 1.5px; 
          text-transform: uppercase; 
          color: #fff; 
          background: rgba(229,57,53,0.9); 
          padding: 3px 8px; 
          border-radius: 4px; 
          margin-bottom: 8px; 
          align-self: flex-start; 
        }
        .arena-featured-title { 
          font-size: 18px; 
          font-weight: 800; 
          color: #fff; 
          line-height: 1.3; 
          margin-bottom: 6px; 
          display: -webkit-box; 
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
          z-index: 2; 
        }
        .arena-featured-meta { 
          font-size: 9px; 
          color: rgba(255,255,255,0.7); 
          letter-spacing: 0.5px; 
          z-index: 2; 
        }

        .arena-list { background: #0e0e0e; padding: 0 12px 12px; }
        .arena-card { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          background: linear-gradient(105deg, #1e1e1e 0%, #181818 70%, #141414 100%); 
          border-radius: 14px; 
          margin-bottom: 9px; 
          padding: 12px 12px 12px 16px; 
          position: relative; 
          overflow: hidden; 
          border: 1px solid rgba(255,255,255,0.05); 
          cursor: pointer; 
        }
        .arena-card::before { 
          content: ""; 
          position: absolute; 
          left: 0; top: 0; bottom: 0; 
          width: 3px; 
          background: linear-gradient(to bottom, #ff6b00, rgba(229,57,53,0.08)); 
        }
        .arena-card:active { transform: scale(0.98); }
        .ripple-wrap { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .ripple-circle { 
          position: absolute; 
          border-radius: 50%; 
          background: rgba(229,57,53,0.28); 
          transform: scale(0); 
          animation: arenaRipple 0.55s linear; 
        }
        @keyframes arenaRipple { to { transform: scale(4); opacity: 0; } }

        .arena-card-body { flex: 1; min-width: 0; z-index: 1; }
        .arena-card-title { 
          font-size: 12px; 
          font-weight: 600; 
          color: #f2f2f2; 
          line-height: 1.5; 
          display: -webkit-box; 
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
          margin-bottom: 6px; 
        }
        .arena-card-meta { display: flex; align-items: center; gap: 4px; font-size: 8.5px; color: rgba(229,57,53,0.7); }
        .arena-card-subcat { 
          font-size: 8px; 
          font-weight: 700; 
          letter-spacing: 1px; 
          text-transform: uppercase; 
          color: #fff; 
          background: rgba(229,57,53,0.2); 
          border: 1px solid rgba(229,57,53,0.3); 
          padding: 2px 7px; 
          border-radius: 4px; 
        }
        .arena-thumb-wrap { 
          position: relative; 
          flex-shrink: 0; 
          width: 74px; 
          height: 74px; 
          border-radius: 10px; 
          overflow: hidden; 
        }
        .arena-thumb-img { width: 74px; height: 74px; object-fit: cover; }
        .arena-thumb-fallback { 
          width: 74px; 
          height: 74px; 
          background: #252525; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 24px; 
          color: #ff6b00; 
        }
        .arena-arrow { font-size: 20px; color: rgba(229,57,53,0.35); z-index: 1; }

        .arena-pagination { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 16px 12px 8px; 
          background: #0e0e0e; 
        }
        .arena-page-info { 
          font-size: 9px; 
          font-weight: 700; 
          letter-spacing: 1.5px; 
          text-transform: uppercase; 
          color: rgba(255,255,255,0.3); 
        }
        .arena-page-btn { 
          font-size: 10px; 
          font-weight: 800; 
          letter-spacing: 1.5px; 
          text-transform: uppercase; 
          color: #fff; 
          background: linear-gradient(135deg, #ff6b00, #b71c1c); 
          padding: 10px 20px; 
          border-radius: 8px; 
          border: none; 
          cursor: pointer; 
        }
        .arena-page-ghost { width: 100px; }

        .arena-loading { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.5); }
        .arena-spinner { 
          display: inline-block; 
          width: 40px; 
          height: 40px; 
          border: 3px solid rgba(229,57,53,0.2); 
          border-top-color: #ff6b00; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .arena-empty { 
          text-align: center; 
          padding: 60px 20px; 
          color: rgba(255,255,255,0.5); 
          background: #0e0e0e; 
          margin: 0 12px; 
          border-radius: 12px; 
        }

        .arena-footer { 
          background: #0a0a0a; 
          padding: 30px 16px; 
          text-align: center; 
          border-top: 1px solid rgba(255,255,255,0.05); 
          margin-top: 20px; 
        }
        .arena-footer-title { font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .arena-footer-title span { color: #ff6b00; }
        .arena-footer-text { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }
        .arena-footer-dev { font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 1px; margin-top: 6px; }
        .arena-footer-dev span { color: #ff6b00; font-weight: 700; }

        @media (max-width: 600px) {
          .arena-hero { height: 140px; }
          .arena-hero-title { font-size: 28px; letter-spacing: 4px; }
          .arena-thumb-wrap, .arena-thumb-img, .arena-thumb-fallback { width: 62px; height: 62px; }
          .arena-card-title { font-size: 11px; }
          .arena-featured-title { font-size: 15px; }
        }
      `}</style>

      {/* HEADER TERPISAH - DI LUAR WRAPPER KONTEN */}
      <div className="arena-topbar">
        <span className="arena-topbar-logo">
          <span>ARENA</span>27

        </span>
      </div>

      {/* WRAPPER KONTEN - TERPISAH DARI HEADER */}
      <div className="arena-wrap">
        <div className="arena-hero">
          <div className="arena-hero-overlay">
            <h1 className="arena-hero-title"><span>ARENA</span>27</h1>
            <div className="arena-filter-wrap">
              {FILTER_CATEGORIES.map(function(cat){
                return (
                  <button
                    key={cat}
                    onClick={function(){ handleFilterClick(cat); }}
                    className={'arena-filter-btn' + (activeFilter === cat ? ' active' : '')}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {activeFilter !== 'Semua' && (
          <div className="arena-filter-info">
            &#127991;&#65039; Filter aktif: <b>{activeFilter}</b> &#8226; {totalCount} artikel
          </div>
        )}

        {loading ? (
          <div className="arena-loading">
            <div className="arena-spinner"></div>
            <p style={{marginTop:16,fontSize:12}}>Memuat berita dari cloud...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="arena-empty">
            <p style={{fontSize:16,marginBottom:8}}>📰 Belum ada berita untuk <b style={{color:'#ff6b00'}}>{activeFilter}</b></p>
            <p style={{fontSize:12}}>Coba pilih kategori lain atau tulis berita baru!</p>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <>
                <div className="arena-list-hd">
                  <span className="arena-list-bar"></span>
                  <span className="arena-list-lbl">Berita Unggulan</span>
                  <span className="arena-list-badge">TOP 3</span>
                </div>
                <div className="arena-featured-wrap">
                  {featured.map(function(item, idx){
                    const rank = idx + 1;
                    const handleClick = function(e){
                      handleRipple(e, e.currentTarget, 'ripple-circle');
                      setTimeout(function(){ router.push('/artikel/' + item.id); }, 200);
                    };
                    return (
                      <div key={item.id} onClick={handleClick} className="arena-featured-card">
                        <span className="ripple-wrap"></span>
                        <img src={item.image || FALLBACK_IMG} alt={item.title} className="arena-featured-img" onError={function(e){ e.currentTarget.src = FALLBACK_IMG; }} />
                        
                        <div className="arena-featured-overlay">
                          <span className="arena-featured-subcat" style={{ backgroundColor: "#ff6b00" }}>{item.category}</span>
                          <div className="arena-featured-title">{item.title}</div>
                          <span className="arena-featured-meta">📅 {formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {regular.length > 0 && (
              <>
                <div className="arena-list-hd">
                  <span className="arena-list-bar"></span>
                  <span className="arena-list-lbl">{'Berita Terbaru Lainnya'}</span>
                  <span className="arena-list-count">{regular.length} artikel</span>
                </div>
                <div className="arena-list">
                  {regular.map(function(item){
                    const handleClick = function(e){
                      handleRipple(e, e.currentTarget, 'ripple-circle');
                      setTimeout(function(){ router.push('/artikel/' + item.id); }, 200);
                    };
                    return (
                      <div key={item.id} onClick={handleClick} className="arena-card">
                        <span className="ripple-wrap"></span>
                        <span className="arena-card-body">
                          <span className="arena-card-title">{item.title}</span>
                          <span className="arena-card-meta">
                            <span>{formatDate(item.created_at)}</span>

                  <span style={{color:'rgba(255,255,255,0.2)'}}>•</span>
                            <span className="arena-card-subcat">{item.category}</span>
                          </span>
                        </span>
                        <span className="arena-thumb-wrap">
                          <img src={item.image || FALLBACK_IMG} alt={item.title} className="arena-thumb-img" onError={function(e){ e.currentTarget.src = FALLBACK_IMG; }} />
                        </span>
                        <span className="arena-arrow">&rsaquo;</span>
                      </div>
                    );
                  })}

                  {/* Tombol kecil Buka Semua Berita - kanan, bawah kartu terakhir */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, marginBottom: 4, paddingRight: 4 }}>
                    <Link href="/artikel" style={{ background: 'linear-gradient(90deg, #ff6b00 0%, #ff8c33 100%)', color: '#ffffff', fontWeight: 700, fontSize: 10, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 6, textDecoration: 'none', boxShadow: '0 3px 8px rgba(255,107,0,0.3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Buka Semua Berita <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            
          </>
        )}
      </div>

      
      {/* ===== ZONA LIGA CHAMPIONS WIDGET ===== */}
      {footNews.length > 0 && (
        <section className="lc-widget">
          <div className="lc-bg"></div>
          <div className="lc-inner">
            <div className="lc-head">
              <h2><b>Liga Champions</b></h2>
              <p>4 Duel Terpanas Pilihan Arena27</p>
            </div>
            <div className="lc-grid">
              {footNews.map(function (item, idx) {
                return (
                  <Link key={item.id} href={'/artikel/' + item.id} className="lc-card" style={item.image ? { backgroundImage: 'linear-gradient(to top, rgba(10,5,3,0.95) 0%, rgba(10,5,3,0.4) 45%, rgba(10,5,3,0.15) 100%), url(' + item.image + ')', backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                    <span className="lc-num">0{idx + 1}</span>
                    <span className="lc-title">{item.title.length > 55 ? item.title.substring(0, item.title.lastIndexOf(' ', 52)) + '...' : item.title}</span>
                  </Link>
                );
              })}
            </div>
            <div className="lc-see-all">
              <a href="/liga-champions">Lihat Semua →</a>
            </div>
          </div>
        </section>
      )}

      {/* ===== ZONA PREMIER LEAGUE WHEEL ===== */}
      {plNews.length > 0 && (
        <section className="pl-zone">
          <div className="pl-inner">
            <img src="/pl-logo.webp" alt="Premier League" className="pl-logo-main" />
            <div className="pl-wheel">
              {plNews.slice(0, 5).map(function (item, idx) {
                return (
                  <Link key={item.id} href={'/artikel/' + item.id} className="pl-item">
                    <div className="pl-thumb" style={item.image ? { backgroundImage: 'url(' + item.image + ')' } : {}}>
                      <span className="pl-num">0{idx + 1}</span>
                    </div>
                    <div className="pl-content">
                      <div className="pl-title">{item.title.length > 60 ? item.title.substring(0, item.title.lastIndexOf(' ', 57)) + '...' : item.title}</div>
                      <span className="pl-badge">{item.category}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="pl-see-all">
            <a href="/premier-league">Lihat Semua →</a>
          </div>
        </section>
      )}
      {/* ===== END ZONA PREMIER LEAGUE WHEEL ===== */}

      {/* ===== ZONA SERIE A ===== */}
      {saNews.length > 0 && (
        <section className="sa-section">
          <div className="sa-inner">
            <div className="sa-left">
              <div className="sa-vertical-wrap">
                <div className="sa-vertical-text">SERIE A</div>
              </div>
              <div className="sa-flag"></div>

            </div>
            <div className="sa-right">
              {saNews.slice(0, 5).map(function (item, idx) {
                return (
                  <Link key={item.id} href={'/artikel/' + item.id} className="sa-card">
                    <span className="sa-num">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="sa-thumb" style={item.image ? { backgroundImage: 'url(' + item.image + ')' } : {}}></div>
                    <div className="sa-info">
                      <div className="sa-title">{item.title.length > 65 ? item.title.substring(0, item.title.lastIndexOf(' ', 62)) + '...' : item.title}</div>
                      <div className="sa-date">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <span className="sa-arrow">›</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="sa-see-all">
            <a href="/serie-a">🐆 Lihat Semua →</a>
          </div>
        </section>
      )}
      {/* ===== END ZONA SERIE A ===== */}

      {/* ===== ZONA INDONESIA FOOTBALL ===== */}
      {indoNews.length > 0 && (
        <section className="indo-section">
          <div className="indo-container">
            <h2 className="indo-title"><span>INDONESIA</span> FOOTBALL</h2>
            
            
            {/* LIST ARTIKEL */}
            {/* HERO IMAGE (Artikel 1) */}
            {indoNews[0] && (
              <Link href={"/artikel/" + indoNews[0].id} className="indo-hero">
                <img src={indoNews[0].image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80"} alt={indoNews[0].title} className="indo-hero-img" />
                <div className="indo-hero-overlay">
                  <span className="indo-hero-badge">{indoNews[0].category}</span>
                  <h3 className="indo-hero-title">{indoNews[0].title}</h3>
                </div>
              </Link>
            )}

            {/* LIST ARTIKEL (Artikel 2-4) */}
            <div className="indo-list">
              {indoNews.slice(1, 4).map(function (item, idx) {
                return (
                  <Link key={item.id} href={"/artikel/" + item.id} className="indo-item">
                    <div className="indo-thumb" style={{ backgroundImage: "url(" + (item.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=60") + ")" }}>
                      <span className="indo-num">0{idx + 2}</span>
                    </div>
                    <div className="indo-content">
                      <div className="indo-title">{item.title.length > 60 ? item.title.substring(0, item.title.lastIndexOf(" ", 57)) + "..." : item.title}</div>
                      <span className="indo-badge">{item.category}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* LIHAT SEMUA */}
            <div className="indo-see-all">
              <a href="/indonesia-football">Lihat Semua →</a>
            </div>
          </div>
        </section>
      )}
      {/* ===== END ZONA INDONESIA FOOTBALL ===== */}

      {/* ===== ZONA MOTOGP ===== */}
      {motogpNews.length > 0 && (
        <section className="motogp-section">
          <div className="motogp-container">
            <h2 className="motogp-title"><span>🏍️</span> MOTOGP</h2>
            
            {motogpNews[0] && (
              <Link href={"/artikel/" + motogpNews[0].id} className="motogp-hero">
                <img src={motogpNews[0].image || "/motogp-bg.webp"} alt={motogpNews[0].title} className="motogp-hero-img" />
                <div className="motogp-hero-overlay">
                  <span className="motogp-hero-badge">MOTOGP</span>
                  <h3 className="motogp-hero-title">{motogpNews[0].title}</h3>
                </div>
              </Link>
            )}

            <div className="motogp-list">
              {motogpNews.slice(1, 5).map(function (item, idx) {
                return (
                  <Link key={item.id} href={"/artikel/" + item.id} className="motogp-item">
                    <div className="motogp-thumb" style={{ backgroundImage: "url(" + (item.image || "/motogp-bg.webp") + ")" }}>
                      <span className="motogp-num">0{idx + 2}</span>
                    </div>
                    <div className="motogp-content">
                      <div className="motogp-item-title">{item.title.length > 60 ? item.title.substring(0, item.title.lastIndexOf(" ", 57)) + "..." : item.title}</div>
                      <span className="motogp-badge">{item.category}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="motogp-see-all">
              <a href="/motogp">Lihat Semua →</a>
            </div>
          </div>
        </section>
      )}
      {/* ===== END ZONA MOTOGP ===== */}

      {/* ===== ZONA BASKET ===== */}
      {basketNews.length > 0 && <BasketWidget articles={basketNews} />}
      {/* ===== END ZONA BASKET ===== */}

      <footer className="arena-footer">
        <div className="arena-footer-title"><span>ARENA</span>27</div>
        <div className="arena-footer-text">© 2026 Arena27</div>
        <div className="arena-footer-dev">Dev by : <span>Cybernet Project Indonesia</span></div>
      </footer>
    
  {/* Floating Button: Buka Semua */}
  

  

</div>
  );
}

