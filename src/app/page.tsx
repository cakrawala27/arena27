'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('arena27_articles');
    setNews(stored ? JSON.parse(stored) : [{ id: 1, title: 'Selamat Datang di Arena27!', category: 'Info', content: 'Klik kartu ini!', image: '' }]);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black">Arena27 Sport Portal 🏟️</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link key={item.id} href={`/artikel?id=${item.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden border active:scale-95 transition">
            {item.image ? <img src={item.image} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>}
            <div className="p-4">
              <span className="text-xs font-bold text-orange-500 uppercase">{item.category}</span>
              <h3 className="text-lg font-bold mt-1 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-3">{item.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
