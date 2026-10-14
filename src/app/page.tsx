'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const FILTER_CATEGORIES = ['Semua', 'Sepak Bola', 'Basket', 'Sport', 'Esports', 'Mata Dunia'];

export default function HomePage() {
  const router = useRouter();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setClickCount(0), 2000);

    if (newCount >= 5) {
      setClickCount(0);
      router.push('/admin');
    }
  };

  const filteredNews = activeFilter === 'Semua' 
    ? news 
    : news.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 border-b border-slate-800">
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition"
            >
              <span className="text-2xl">🏟️</span>
              <h1 className="text-xl md:text-2xl font-black">
                <span className="text-orange-500">ARENA</span>
                <span className="text-white">27</span>
              </h1>
            </div>
            
            <div className="text-xs text-slate-500 hidden md:block">
              {clickCount > 0 && clickCount < 5 ? (clickCount + '/5 🔐') : ''}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto py-3">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={
                  'px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ' +
                  (activeFilter === cat
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* DAFTAR BERITA - LANGSUNG DI BAWAH HEADER (HEADLINE DIHAPUS) */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4">Memuat berita dari cloud...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-xl p-8 shadow-sm">
            <p className="text-lg">Belum ada berita untuk kategori <span className="font-bold text-orange-500">{activeFilter}</span></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Link 
                key={item.id} 
                href={'/artikel/' + item.id} 
                className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 active:scale-95"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800'; }}
                />
                <div className="p-4">
                  <span className="inline-block text-xs font-bold text-orange-500 uppercase mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-3">{item.content}</p>
                  <div className="mt-3 text-xs text-slate-400">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-lg font-black text-white mb-2">
            <span className="text-orange-500">ARENA</span>27
          </h3>
          <p className="text-sm">© 2026 Arena27 Sport Portal. All rights reserved.</p>
          <p className="text-xs mt-2">Powered by Next.js + Supabase Cloud</p>
        </div>
      </footer>
    </div>
  );
}
