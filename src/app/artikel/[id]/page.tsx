'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ArticlePage() {
  const params = useParams();
  const id = params ? String(params.id) : '';
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          'https://pagsqpfcclokiypgwrwb.supabase.co/rest/v1/articles?id=eq.' + id + '&select=*',
          { headers: { apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc' } }
        );
        const data = await res.json();
        if (data && data.length > 0) {
          const a = data[0];
          setArticle(a);
          
          const finalImage = a.image || 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80';
          const description = a.meta_description || (a.content || '').substring(0, 160) + '...';
          const articleUrl = 'https://arena27-psi.vercel.app/artikel/' + a.id;
          
          document.title = (a.meta_title || a.title) + ' - Arena27';
          
          const setMeta = (type, name, content) => {
            let selector = type === 'property' ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
            let el = document.querySelector(selector);
            if (!el) {
              el = document.createElement('meta');
              el.setAttribute(type, name);
              document.head.appendChild(el);
            }
            el.setAttribute('content', content);
          };
          
          setMeta('name', 'description', description);
          setMeta('property', 'og:title', a.meta_title || a.title);
          setMeta('property', 'og:description', description);
          setMeta('property', 'og:image', finalImage);
          setMeta('property', 'og:image:secure_url', finalImage);
          setMeta('property', 'og:image:type', 'image/jpeg');
          setMeta('property', 'og:image:width', '1200');
          setMeta('property', 'og:image:height', '630');
          setMeta('property', 'og:url', articleUrl);
          setMeta('property', 'og:type', 'article');
          setMeta('property', 'og:site_name', 'Arena27');
          setMeta('property', 'og:locale', 'id_ID');
          setMeta('name', 'twitter:card', 'summary_large_image');
          setMeta('name', 'twitter:title', a.meta_title || a.title);
          setMeta('name', 'twitter:description', description);
          setMeta('name', 'twitter:image', finalImage);
          
          let canonical = document.querySelector('link[rel="canonical"]');
          if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
          }
          canonical.setAttribute('href', articleUrl);
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    if (id) fetchArticle();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: 40, height: 40, border: '3px solid rgba(229,57,53,0.2)', borderTopColor: '#e53935', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto'}}></div>
          <p style={{marginTop: 16, fontSize: 12}}>Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: 24}}>😕 Artikel tidak ditemukan</p>
          <button onClick={() => router.push('/')} style={{marginTop: 16, padding: '10px 20px', background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer'}}>← Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = article.title + ' - Arena27';

  return (
    <div style={{background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0 !important; padding: 0 !important; background: #0a0a0a !important; }
        .article-wrap { max-width: 720px; margin: 0 auto; padding: 0 0 40px; }
        .article-topbar { position: sticky; top: 0; z-index: 999; background: #0a0a0a; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(229,57,53,0.15); }
        .article-back { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; }
        .article-back:hover { color: #e53935; }
        .article-logo { font-size: 14px; font-weight: 900; letter-spacing: 2px; color: #fff; }
        .article-logo span { color: #e53935; }
        .article-hero { width: 100%; height: 400px; position: relative; overflow: hidden; }
        .article-hero img { width: 100%; height: 100%; object-fit: cover; }
        .article-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px 20px; }
        .article-category { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; background: #e53935; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; align-self: flex-start; }
        .article-title { font-size: 32px; font-weight: 900; color: #fff; line-height: 1.2; margin: 0 0 12px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
        .article-meta { font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 0.5px; }
        .article-content { background: #0e0e0e; padding: 24px 20px; line-height: 1.8; font-size: 15px; color: rgba(255,255,255,0.9); }
        .article-content p { margin: 0 0 16px 0; }

        /* TOMBOL SHARE DI BAWAH ARTIKEL */
        .share-section-bottom { padding: 30px 20px; background: #0e0e0e; border-top: 1px solid rgba(255,255,255,0.08); }
        .share-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 14px; display: block; }
        .share-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
        .share-btn { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          padding: 12px 18px; 
          border-radius: 10px; 
          text-decoration: none; 
          font-size: 13px; 
          font-weight: 700; 
          color: #fff; 
          border: none; 
          cursor: pointer; 
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          flex: 1;
          min-width: 140px;
          justify-content: center;
        }
        .share-btn:hover { transform: translateY(-2px); }
        .share-btn:active { transform: scale(0.96); }
        .share-wa { background: linear-gradient(135deg, #25D366, #128C7E); box-shadow: 0 4px 12px rgba(37,211,102,0.3); }
        .share-wa:hover { box-shadow: 0 6px 18px rgba(37,211,102,0.5); }
        .share-fb { background: linear-gradient(135deg, #1877F2, #0C5DC7); box-shadow: 0 4px 12px rgba(24,119,242,0.3); }
        .share-fb:hover { box-shadow: 0 6px 18px rgba(24,119,242,0.5); }
        .share-x { background: linear-gradient(135deg, #1a1a1a, #000); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
        .share-x:hover { box-shadow: 0 6px 18px rgba(255,255,255,0.1); }
        .share-copy { background: linear-gradient(135deg, #e53935, #b71c1c); box-shadow: 0 4px 12px rgba(229,57,53,0.3); }
        .share-copy:hover { box-shadow: 0 6px 18px rgba(229,57,53,0.5); }
        .share-copy.copied { background: linear-gradient(135deg, #10b981, #047857); }
        .share-icon { font-size: 18px; line-height: 1; }

        .article-footer { background: #0a0a0a; padding: 30px 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
        .article-footer-title { font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .article-footer-title span { color: #e53935; }
        .article-footer-text { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .article-hero { height: 280px; }
          .article-title { font-size: 24px; }
          .share-btn { font-size: 12px; padding: 10px 14px; min-width: 120px; }
        }
      `}</style>

      <div className="article-wrap">
        {/* TOPBAR */}
        <div className="article-topbar">
          <button onClick={() => router.push('/')} className="article-back">← Kembali</button>
          <span className="article-logo"><span>ARENA</span>27</span>
        </div>

        {/* HERO - TANPA TOMBOL SHARE */}
        <div className="article-hero">
          <img src={article.image || 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80'} alt={article.title} />
          <div className="article-hero-overlay">
            <span className="article-category">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">📅 {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · Arena27</div>
          </div>
        </div>

        {/* KONTEN ARTIKEL */}
        <div className="article-content">
          {(article.content || '').split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* TOMBOL SHARE DI BAWAH ARTIKEL (CUMA DI SINI!) */}
        <div className="share-section-bottom">
          <span className="share-label">Bagikan Artikel Ini</span>
          <div className="share-buttons">
            <a 
              href={'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + shareUrl)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn share-wa"
            >
              <span className="share-icon">📱</span>
              <span>WhatsApp</span>
            </a>
            <a 
              href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn share-fb"
            >
              <span className="share-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a 
              href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(shareUrl)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="share-btn share-x"
            >
              <span className="share-icon">𝕏</span>
              <span>Twitter</span>
            </a>
            <button 
              onClick={handleCopyLink}
              className={'share-btn share-copy' + (copied ? ' copied' : '')}
            >
              <span className="share-icon">{copied ? '✓' : '🔗'}</span>
              <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="article-footer">
        <div className="article-footer-title"><span>ARENA</span>27</div>
        <div className="article-footer-text">© 2026 Arena27 Sport Portal</div>
      </footer>
    </div>
  );
}
