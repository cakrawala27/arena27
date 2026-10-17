// âš¡ FORCE DYNAMIC RENDERING - NO STATIC GENERATION!
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

async function getRelatedArticles(currentId: string) {
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/articles?status=eq.published&id=neq.' + currentId + '&select=id,title,image,category,created_at&order=created_at.desc&limit=3',
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (e) {
    console.error('Error fetching related:', e);
    return [];
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
  s = s.replace(/\[(B|I|H2|H3|ORANGE|WHITE)\s*\[/gi, "[$1][");
  for (let pass = 0; pass < 2; pass++) {
    s = s
      .replace(/\[ORANGE\]([\s\S]*?)\[\/ORANGE\]/gi, '<span class="rte-orange">$1</span>')
      .replace(/\[WHITE\]([\s\S]*?)\[\/WHITE\]/gi, '<span class="rte-white">$1</span>')
      .replace(/\[B\]([\s\S]*?)\[\/B\]/gi, "<strong>$1</strong>")
      .replace(/\[I\]([\s\S]*?)\[\/I\]/gi, "<em>$1</em>");
  }
  s = s.replace(/\[(B|I|H2|H3|ORANGE|WHITE)\]|\[\/(B|I|H2|H3|ORANGE|WHITE)\]/gi, "");
  return s;
}

function renderRichContent(text: string): string {
  let clean = text.replace(/\r/g, "");
  clean = clean.replace(/^\[\/?(B|I|H2|H3|ORANGE|WHITE)\]\s*/gmi, "");
  clean = clean
    .replace(/\[B\]\s*\n*\s*(\[H2\])/gi, "$1")
    .replace(/(\[\/H2\])\s*\n*\s*\[\/B\]/gi, "$1")
    .replace(/\[B\]\s*\n*\s*(\[H3\])/gi, "$1")
    .replace(/(\[\/H3\])\s*\n*\s*\[\/B\]/gi, "$1");
  const paragraphs = clean.split(/\n+/).filter(function (p) { return p.trim(); });
  return paragraphs.map(function (p) {
    const h2Regex = /\[H2\]([\s\S]*?)\[\/H2\]/gi;
    if (h2Regex.test(p)) {
      return p.replace(h2Regex, function(m, h2Text) {
        const formattedH2 = "<h2 class=" + ' + "rte-h2" + ' + ">" + parseInlineHtml(h2Text.trim()) + "</h2>";
        const beforeText = p.substring(0, p.indexOf("[H2]")).trim();
        const afterText = p.substring(p.indexOf("[/H2]") + 5).trim();
        let html = "";
        if (beforeText) html += "<p>" + parseInlineHtml(beforeText) + "</p>";
        html += formattedH2;
        if (afterText) html += "<p>" + parseInlineHtml(afterText) + "</p>";
        return html;
      });
    }
    const h3Regex = /\[H3\]([\s\S]*?)\[\/H3\]/gi;
    if (h3Regex.test(p)) {
      return p.replace(h3Regex, function(m, h3Text) {
        const formattedH3 = "<h3 class=" + ' + "rte-h3" + ' + ">" + parseInlineHtml(h3Text.trim()) + "</h3>";
        const beforeText = p.substring(0, p.indexOf("[H3]")).trim();
        const afterText = p.substring(p.indexOf("[/H3]") + 5).trim();
        let html = "";
        if (beforeText) html += "<p>" + parseInlineHtml(beforeText) + "</p>";
        html += formattedH3;
        if (afterText) html += "<p>" + parseInlineHtml(afterText) + "</p>";
        return html;
      });
    }
    return "<p>" + parseInlineHtml(p) + "</p>";
  }).join("");
}

// ===== END RICH TEXT PARSER =====


function splitContentAtParagraph(html: string, splitAfter: number) {
  const paragraphs = html.split(/(?=<p)/g).filter(function(p) { return p.trim().length > 0; });
  if (paragraphs.length < 2) {
    return { first: html, second: "" };
  }
  const actualSplit = Math.min(splitAfter, Math.floor(paragraphs.length / 2));
  if (actualSplit < 1) {
    return { first: html, second: "" };
  }
  const first = paragraphs.slice(0, actualSplit).join("");
  const second = paragraphs.slice(actualSplit).join("");
  return { first: first, second: second };
}

export default async function ArticlePage({ params }: any) {
  const id = typeof params?.then === 'function' ? (await params).id : params?.id;
  const article = await getArticle(id);
  const related = await getRelatedArticles(id);
  const articleUrl = SITE_URL + '/artikel/' + id;
  const fullContent = renderRichContent(article?.content || '');
  const split = splitContentAtParagraph(fullContent, 3);

  if (!article) {
    return (
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: 24}}>ðŸ˜• Artikel tidak ditemukan</p>
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
        .article-footer-dev { font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 1px; margin-top: 6px; }
        .article-footer-dev span { color: #ff6b00; font-weight: 700; }
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
            <div className="article-meta">&#128197; {formattedDate} &middot; Arena27</div>
          </div>
        </div>
        <div className="article-content rte-content" dangerouslySetInnerHTML={{ __html: split.first }} />

        {split.second && related.length > 0 && (
          <section className="baca-juga-section">
            <div className="baca-juga-inner">
              <h2 className="baca-juga-title">
                <span className="baca-juga-bullet">•</span>
                BACA JUGA
                <span className="baca-juga-bullet">•</span>
              </h2>
              <div className="baca-juga-list">
                {related.map(function (item, idx) {
                  return (
                    <Link key={item.id} href={'/artikel/' + item.id} className="baca-juga-row">
                      <div className="baca-juga-num">{String(idx + 1).padStart(2, '0')}</div>
                      <div className="baca-juga-thumb" style={{ backgroundImage: 'url(' + (item.image || FALLBACK_IMG) + ')' }} />
                      <div className="baca-juga-text">
                        <div className="baca-juga-row-title">{item.title}</div>
                        <div className="baca-juga-row-date">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                      <div className="baca-juga-arrow">›</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {split.second && (
          <div className="article-content rte-content" dangerouslySetInnerHTML={{ __html: split.second }} />
        )}
        <ShareButtons title={article.title} url={articleUrl} />
      </div>
      <footer className="article-footer">
        <div className="article-footer-title"><span>ARENA</span>27</div>
        <div className="article-footer-text">© 2026 Arena27</div>
        <div className="article-footer-dev">Dev by : <span>Cybernet Project Indonesia</span></div>
      </footer>
    </div>
  );
}

