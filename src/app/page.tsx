'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('arena27_articles');
    if (stored) setNews(JSON.parse(stored));
  }, []);

  const dummyNews = [
    { id: 1, title: 'Persib Bandung Juara Liga 1', category: 'Sepak Bola', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800' },
    { id: 2, title: 'LeBron James Cetak Rekor Baru', category: 'Basket', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800' }
  ];

  const displayNews = news.length > 0 ? news : dummyNews;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 shadow-xl">
        <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded uppercase">Headline</span>
        <h1 className="text-2xl md:text-4xl font-black mt-4 mb-2">Selamat Datang di Arena27! 🏟️</h1>
        <p className="text-slate-300 text-sm">Portal berita sport terlengkap.</p>
      </div>

      <h2 className="text-xl font-black text-slate-900 mb-4">🔥 Berita Terkini</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayNews.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-bold text-orange-500 uppercase">{item.category}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3 line-clamp-2">{item.title}</h3>
              {item.content && <p className="text-sm text-slate-600 line-clamp-3 mb-3">{item.content}</p>}
              <span className="text-sm text-orange-500 font-bold">Baca Selengkapnya →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
