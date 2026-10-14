'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('arena27_articles');
    if (stored) setArticles(JSON.parse(stored));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Yakin mau hapus berita ini?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      localStorage.setItem('arena27_articles', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-900">📋 Daftar Berita</h1>
        <Link href="/admin/articles/new" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-md active:scale-95 transition">➕ Tulis Baru</Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center text-slate-500 border border-gray-200">
          Belum ada berita. Yuk tulis berita pertamamu!
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div className="flex-1 pr-4 overflow-hidden">
                <span className="text-xs font-bold text-orange-500 uppercase">{article.category}</span>
                <h3 className="font-bold text-slate-900 line-clamp-1">{article.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-1">{article.content}</p>
              </div>
              <button 
                onClick={() => handleDelete(article.id)}
                className="bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold text-sm hover:bg-red-200 transition active:scale-95 shrink-0"
              >
                🗑️ Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
