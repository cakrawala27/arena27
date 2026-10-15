import { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from './ShareButtons';

// KONFIGURASI AGRESIF: NO CACHE, NO BULLSHIT
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80';
const SITE_URL = 'https://arena27-psi.vercel.app';

// HARDCODE CREDENTIALS (PALING RELIABLE BUAT SERVER-SIDE FETCH)
const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';

async function getArticle(id: string) {
  console.log('🔍 [getArticle] Fetching article:', id);
  try {
    const url = SUPABASE_URL + '/rest/v1/articles?id=eq.' + id + '&select=*';
    console.log('🔍 [getArticle] URL:', url);
    
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    
    if (!res.ok) {
      console.error('❌ [getArticle] Fetch failed:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    console.log('✅ [getArticle] Data received:', data.length, 'rows');
    
    if (data && data.length > 0) {
      console.log('✅ [getArticle] Article found:', data[0].title);
      return data[0];
    }
    
    console.log('⚠️  [getArticle] No article found');
    return null;
  } catch (e: any) {
    console.error('💥 [getArticle] ERROR:', e.message);
    return null;
  }
}

// GENERATE METADATA DENGAN FALLBACK JELAS
export async function generateMetadata({ params }: any): Promise<Metadata> {
  console.log('🎯 [generateMetadata] START');
  
  // Handle params Promise (Next.js 14+) atau object biasa
  const id = typeof params?.then === 'function' ? (await params).id : params?.id;
  console.log('🎯 [generateMetadata] Article ID:', id);
  
  if (!id) {
    console.log('❌ [generateMetadata] No ID, returning default');
    return {
      title: 'Arena27 - Portal Berita Sport',
      description: 'Portal berita sport terlengkap',
    };
  }
  
  const article = await getArticle(id);
  
  if (!article) {
    console.log('❌ [generateMetadata] Article not found, returning default');
    return {
      title: 'Artikel Tidak Ditemukan - Arena27',
      description: 'Artikel yang Anda cari tidak ditemukan.',
    };
  }
  
  // BUILD METADATA LENGKAP
  const finalImage = article.image || FALLBACK_IMG;
  const description = article.meta_description || (article.content || '').substring(0, 160).replace(/\n/g, ' ') + '...';
  const title = (article.meta_title || article.title) + ' - Arena27';
  const articleUrl = SITE_URL + '/artikel/' + article.id;
  
  console.log('✅ [generateMetadata] FINAL METADATA:');
  console.log('   Title:', title);
  console.log('   Image:', finalImage);
  console.log('   Description:', description.substring(0, 80) + '...');
  
  return {
    title: title,
    description: description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: articleUrl },
    openGraph: {
      title: article.meta_title || article.title,
      description: description,
      url: articleUrl,
      siteName: 'Arena27',
      locale: 'id_ID',
      type: 'article',
      images: [{ url: finalImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: description,
      images: [finalImage],
    },
  };
}

export default async function ArticlePage({ params }: any) {
  const id = typeof params?.then === 'function' ? (await params).id : params?.id;
  const article = await getArticle(id);
  const articleUrl = SITE_URL + '/artikel/' + id;

  if (!article) {
    return (
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: 24}}>😕 Artikel tidak ditemukan</p>
          <Link href="/" style={{marginTop: 16, padding: '10px 20px', background: '#e53935', color: '#fff', borderRadius: 8, textDecoration: 'none', display: 'inline-block'}}>← Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

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
        .share-section-bottom { padding: 30px 20px; background: #0e0e0e; border-top: 1px solid rgba(255,255,255,0.08); }
        .share-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 14px; display: block; }
        .share-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
        .share-btn { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; color: #fff; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; flex: 1; min-width: 140px; justify-content: center; }
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
        @media (max-width: 600px) { .article-hero { height: 280px; } .article-title { font-size: 24px; } .share-btn { font-size: 12px; padding: 10px 14px; min-width: 120px; } }
      `}</style>

      <div className="article-wrap">
        <div className="article-topbar">
          <Link href="/" className="article-back">← Kembali</Link>
          <span className="article-logo"><span>ARENA</span>27</span>
        </div>
        <div className="article-hero">
          <img src={article.image || FALLBACK_IMG} alt={article.title} />
          <div className="article-hero-overlay">
            <span className="article-category">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">📅 {formattedDate} · Arena27</div>
          </div>
        </div>
        <div className="article-content">
          {(article.content || '').split('\n\n').map((para, idx) => (<p key={idx}>{para}</p>))}
        </div>
        <ShareButtons title={article.title} url={articleUrl} />
      </div>
      <footer className="article-footer">
        <div className="article-footer-title"><span>ARENA</span>27</div>
        <div className="article-footer-text">© 2026 Arena27 Sport Portal</div>
      </footer>
    </div>
  );
}
