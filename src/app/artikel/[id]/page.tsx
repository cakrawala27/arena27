'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ArticlePage() {
  const params = useParams();
  const id = params ? String(params.id) : '';
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          document.title = a.title + ' - Arena27';
          // Set meta description
          let desc = document.querySelector('meta[name="description"]');
          if (!desc) {
            desc = document.createElement('meta');
            desc.setAttribute('name', 'description');
            document.head.appendChild(desc);
          }
          desc.setAttribute('content', (a.content || '').substring(0, 160) + '...');
          // Set og tags
          const setMeta = (prop, content) => {
            let el = document.querySelector('meta[property="' + prop + '"]');
            if (!el) {
              el = document.createElement('meta');
              el.setAttribute('property', prop);
              document.head.appendChild(el);
            }
            el.setAttribute('content', content);
          };
          setMeta('og:title', a.title);
          setMeta('og:description', (a.content || '').substring(0, 160) + '...');
          setMeta('og:image', a.image || '');
          setMeta('og:url', 'https://arena27-psi.vercel.app/artikel/' + a.id);
          setMeta('og:type', 'article');
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    if (id) fetchArticle();
  }, [id]);

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
        .article-footer { background: #0a0a0a; padding: 30px 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
        .article-footer-title { font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .article-footer-title span { color: #e53935; }
        .article-footer-text { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .article-hero { height: 280px; }
          .article-title { font-size: 24px; }
        }
      `}</style>

      <div className="article-wrap">
        <div className="article-topbar">
          <button onClick={() => router.push('/')} className="article-back">← Kembali</button>
          <span className="article-logo"><span>ARENA</span>27</span>
        </div>

        <div className="article-hero">
          <img src={article.image} alt={article.title} />
          <div className="article-hero-overlay">
            <span className="article-category">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">📅 {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · Arena27</div>
          </div>
        </div>

        <div className="article-content">
          {(article.content || '').split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      <footer className="article-footer">
        <div className="article-footer-title"><span>ARENA</span>27</div>
        <div className="article-footer-text">© 2026 Arena27 Sport Portal</div>
      </footer>
    </div>
  );
}
