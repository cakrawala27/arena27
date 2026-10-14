'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('arena27_articles');
    if (stored) setArticles(JSON.parse(stored));
  }, []);

  const handleDelete = (id: any) => {
    if (confirm('Hapus berita ini?')) {
      const updated = articles.filter((a: any) => String(a.id) !== String(id));
      setArticles(updated);
      localStorage.setItem('arena27_articles', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black">📋 Daftar Berita</h1>
        <Link href="/admin/articles/new" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold active:scale-95">➕ Baru</Link>
      </div>
      <div className="space-y-4">
        {articles.map((a: any) => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center gap-3">
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-orange-500">{a.category}</span>
              <h3 className="font-bold line-clamp-1">{a.title}</h3>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/articles/edit?id=${a.id}`} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-bold text-sm active:scale-95">✏️</Link>
              <button onClick={() => handleDelete(a.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold text-sm active:scale-95">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
