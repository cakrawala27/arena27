// ⚡ FORCE DYNAMIC RENDERING - NO STATIC GENERATION!
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';


import { Metadata } from 'next';
import Link from 'next/link';
import ShareButtons from './ShareButtons';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80';
const SITE_URL = 'https://arena27-psi.vercel.app';
const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';

async function getArticle(id: string) {
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/articles?id=eq.' + id + '&select=*',
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      }
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (e) {
    console.error('Error fetching article:', e);
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = typeof params?.then === 'function' ? (await params).id : params?.id;
  
  if (!id) {
    return {
      title: 'Arena27 - Portal Berita Sport',
      description: 'Portal berita sport terlengkap',
    };
  }
  
  const article = await getArticle(id);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Arena27',
      description: 'Artikel yang Anda cari tidak ditemukan.',
    };
  }

  const finalImage = article.image || FALLBACK_IMG;
  // PRIORITAS UTAMA: Ambil meta_description dari DB. Kalau kosong, baru fallback.
  let rawDesc = article.meta_description;
  
  // Jika meta_description kosong, ambil dari konten (fallback lama)
  if (!rawDesc || rawDesc.trim() === '') {
    rawDesc = (article.content || '').replace(/\n/g, ' ').trim();
  }
  
  // Potong maksimal 155 karakter (standar SEO & WhatsApp) + elipsis
  const description = rawDesc.length > 155 ? rawDesc.substring(0, 152) + '...' : rawDesc;
  const title = (article.meta_title || article.title) + ' - Arena27';
  const articleUrl = SITE_URL + '/artikel/' + article.id;

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
      images: [{ 
        url: finalImage, 
        width: 1200, 
        height: 630, 
        alt: article.title,
        type: 'image/jpeg'
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: description, // Pastikan pakai variable description yang sudah dibersihkan
      images: [finalImage],
    },
  };
}


// ===== RICH TEXT PARSER =====
function parseInlineHtml(s: string): string {
  return s
    .replace(/\[B\]([\s\S]*?)\[\/B\]/g, '<strong>$1</strong>')
    .replace(/\[I\]([\s\S]*?)\[\/I\]/g, '<em>$1</em>')
    .replace(/\[ORANGE\]([\s\S]*?)\[\/ORANGE\]/g, '<span class="rte-orange">$1</span>')
    .replace(/\[WHITE\]([\s\S]*?)\[\/WHITE\]/g, '<span class="rte-white">$1</span>');
}

function renderRichContent(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const paragraphs = escaped.split(/\n+/).filter(function (p) { return p.trim(); });
  return paragraphs.map(function (p) {
    var h2Match = p.match(/^\[H2\]([\s\S]*?)\[\/H2\]$/);
    if (h2Match) return '<h2 class="rte-h2">' + parseInlineHtml(h2Match[1].trim()) + '</h2>';
    var h3Match = p.match(/^\[H3\]([\s\S]*?)\[\/H3\]$/);
    if (h3Match) return '<h3 class="rte-h3">' + parseInlineHtml(h3Match[1].trim()) + '</h3>';
    return '<p>' + parseInlineHtml(p) + '</p>';
  }).join('');
}
// ===== END RICH TEXT PARSER =====

export default async function ArticlePage({ params }: any) {
  const id = typeof params?.then === 'function' ? (await params).id : params?.id;
  const article = await getArticle(id);
  const articleUrl = SITE_URL + '/artikel/' + id;

  if (!article) {
    return (
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: 24}}>😕 Artikel tidak ditemukan</p>
          <Link href="/" style={{marginTop: 16, padding: '10px 20px', background: '#ff6b00', color: '#fff', borderRadius: 8, textDecoration: 'none', display: 'inline-block'}}>← Kembali ke Beranda</Link>
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
        .article-back:hover { color: #ff6b00; }
        .article-logo { font-size: 14px; font-weight: 900; letter-spacing: 2px; color: #fff; }
        .article-logo span { color: #ff6b00; }
        .article-hero { width: 100%; height: 400px; position: relative; overflow: hidden; }
        .article-hero img { width: 100%; height: 100%; object-fit: cover; }
        .article-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px 20px; }
        .article-category { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; background: #ff6b00; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; align-self: flex-start; }
        .article-title { font-size: 32px; font-weight: 900; color: '#fff'; line-height: 1.2; margin: 0 0 12px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
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
        .share-copy { background: linear-gradient(135deg, #ff6b00, #b71c1c); box-shadow: 0 4px 12px rgba(229,57,53,0.3); }
        .share-copy:hover { box-shadow: 0 6px 18px rgba(229,57,53,0.5); }
        .share-copy.copied { background: linear-gradient(135deg, #10b981, #047857); }
        .share-icon { font-size: 18px; line-height: 1; }
        .article-footer { background: #0a0a0a; padding: 30px 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
        .article-footer-title { font-size: 16px; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .article-footer-title span { color: #ff6b00; }
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
        <div className="article-content rte-content" dangerouslySetInnerHTML={{ __html: renderRichContent(article.content || '') }} />
        <ShareButtons title={article.title} url={articleUrl} />
      </div>
      <footer className="article-footer">
        <div className="article-footer-title"><span>ARENA</span>27</div>
        <div className="article-footer-text">© 2026 Arena27 Sport Portal</div>
      </footer>
    </div>
  );
}
