'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; 

type Article = {
  id: string;
  title: string;
  category: string;
  tags: string;
  content: string;
  image: string;
  status: 'published' | 'draft';
  created_at: string;
};

const CATEGORIES = [
  { name: 'Sepak Bola', subs: ['Premier League', 'Serie A', 'La Liga', 'Bundesliga', 'Timnas Indonesia', 'FIFA Football'] },
  { name: 'Sport', subs: ['MotoGP', 'F1'] },
  { name: 'Basket', subs: ['NBA', 'IBL'] },
  { name: 'Badminton', subs: ['BWF', 'Olympic'] },
  { name: 'Tinju', subs: [] },
  { name: 'Esports', subs: ['Mobile Legends', 'PUBG', 'Valorant'] },
  { name: 'Publik Arena', subs: ['Sekitar Kita'] },
];

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

function excerpt(text: string, len = 160): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean.length > len ? clean.slice(0, len) + '…' : clean;
}

function ImgOrFallback({ src, alt, className }: { src?: string; alt: string; className: string }) {
  if (src) return <img src={src} alt={alt} className={className} />;
  return (
    <div className={`${className} bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl`}>
      🏟️
    </div>
  );
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string>('Semua');
  const [open, setOpen] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    // INI KUNCINYA: MENGAMBIL DATA DARI SUPABASE, BUKAN LOCALSTORAGE
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  }

  const visible =
    filter === 'Semua'
      ? articles
      : articles.filter((a) => a.category === filter || a.category.startsWith(filter + ' - '));

  const hero = visible[0];
  const rest = visible.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏟️</span>
            <span className="text-2xl font-extrabold tracking-tight text-orange-500">Arena27</span>
          </Link>
          <span className="hidden sm:block text-xs text-slate-400">Portal Berita Sport · Cepat &amp; Terpercaya</span>
        </div>
        <div className="border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto text-sm">
            {['Semua', ...CATEGORIES.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full font-medium transition ${
                  filter === cat ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Memuat berita dari database...</p>
        ) : articles.length === 0 ? (
           <div className="bg-white rounded-2xl shadow-md p-16 text-center">
            <div className="text-7xl mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Belum Ada Berita Tayang</h2>
            <p className="text-gray-500 mb-6">Home ini otomatis nampilin berita yang kamu publish dari dashboard.</p>
            <Link href="/admin/articles/new" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              ✍️ Tulis Berita Pertama
            </Link>
          </div>
        ) : (
          <>
            {hero && (
              <button
                onClick={() => setOpen(hero)}
                className="relative w-full text-left overflow-hidden rounded-2xl shadow-xl mb-8 group h-72 md:h-96"
              >
                <ImgOrFallback src={hero.image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    🔥 HEADLINE · {hero.category}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-2 text-white group-hover:text-orange-300 transition">
                    {hero.title}
                  </h1>
                  <p className="text-slate-200 max-w-3xl line-clamp-2 hidden md:block">{excerpt(hero.content, 200)}</p>
                  <p className="text-xs text-slate-300 mt-3">🕐 {timeAgo(hero.created_at)} · ✍️ Admin Arena27</p>
                </div>
              </button>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📰 Berita Terbaru</h2>
                {rest.length === 0 ? (
                  <p className="text-gray-400">Baru ada 1 berita tayang. Tambah lagi dari dashboard ya!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {rest.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setOpen(a)}
                        className="text-left bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 hover:-translate-y-0.5 group"
                      >
                        <ImgOrFallback src={a.image} alt={a.title} className="w-full aspect-video object-cover group-hover:scale-105 transition duration-500" />
                        <div className="p-5">
                          <span className="inline-block bg-orange-100 text-orange-700 text-[11px] font-semibold px-2 py-0.5 rounded mb-2">
                            {a.category}
                          </span>
                          <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-2">{a.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{excerpt(a.content, 110)}</p>
                          <p className="text-xs text-gray-400">🕐 {timeAgo(a.created_at)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-5">
                  <h3 className="font-bold mb-3 flex items-center gap-2">🔥 Sedang Hangat</h3>
                  <ol className="space-y-3">
                    {articles.slice(0, 5).map((a, i) => (
                      <li key={a.id}>
                        <button onClick={() => setOpen(a)} className="flex gap-3 text-left w-full group items-center">
                          <span className="text-2xl font-extrabold text-orange-200 group-hover:text-orange-500 transition w-6 shrink-0">{i + 1}</span>
                          {a.image ? (
                            <img src={a.image} alt={a.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          ) : (
                            <span className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shrink-0">🏟️</span>
                          )}
                          <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 line-clamp-2 transition">{a.title}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-slate-900 text-white rounded-xl shadow-md p-5">
                  <h3 className="font-bold mb-2">🏟️ Tentang Arena27</h3>
                  <p className="text-sm text-slate-300">Portal berita sport yang dibangun dari nol. Sepak bola, moto, basket, esports, sampai cerita sekitar kita — semua di satu arena.</p>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏟️</span>
            <span className="font-bold text-orange-500">Arena27</span>
          </div>
          <p>© 2026 Arena27 · Dibangun dari nol, tanpa template.</p>
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {open.image && <img src={open.image} alt={open.title} className="w-full aspect-video object-cover" />}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
              <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{open.category}</span>
              <button onClick={() => setOpen(null)} className="text-2xl leading-none text-gray-400 hover:text-gray-700">×</button>
            </div>
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">{open.title}</h1>
              <p className="text-xs text-gray-400 mb-6">🕐 {timeAgo(open.created_at)} · ✍️ Admin Arena27</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{open.content || '(Tidak ada isi berita.)'}</div>
              {open.tags && (
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {open.tags.split(',').map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">️ {t.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}