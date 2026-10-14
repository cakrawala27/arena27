'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from('articles').select('*').eq('status', 'published').order('created_at', { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 shadow-xl">
        <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded uppercase">Headline</span>
        <h1 className="text-2xl md:text-4xl font-black mt-4 mb-2">Arena27 Sport Portal 🏟️</h1>
        <p className="text-slate-300 text-sm">Portal berita global tersinkronisasi via Cloud.</p>
      </div>
      {loading ? (
        <div className="text-center py-20 text-slate-500">Memuat berita dari cloud...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link key={item.id} href={`/artikel/${item.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition active:scale-95">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-bold text-orange-500 uppercase">{item.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{item.content}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
