'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('arena27_articles');
    if (stored) {
      setNews(JSON.parse(stored));
    } else {
      setNews([
        { id: 1, title: 'Selamat Datang di Arena27!', category: 'Info', content: 'Ini adalah portal berita sport buatanmu sendiri. Klik kartu ini untuk membaca!', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800' }
      ]);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 shadow-xl">
        <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded uppercase">Headline</span>
        <h1 className="text-2xl md:text-4xl font-black mt-4 mb-2">Arena27 Sport Portal 🏟️</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link key={item.id} href={`/artikel/${item.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 active:scale-95">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-bold text-orange-500 uppercase">{item.category}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-3">{item.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
