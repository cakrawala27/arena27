'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
    setLoading(false);
  };
  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Hapus berita ini dari server dunia?')) {
      await supabase.from('articles').delete().eq('id', id);
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500">Memuat dari cloud...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-900">📋 Daftar Berita (Cloud)</h1>
        <Link href="/admin/articles/new" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-md active:scale-95">➕ Tulis Baru</Link>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center gap-3">
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-orange-500 uppercase">{article.category}</span>
              <h3 className="font-bold text-slate-900 line-clamp-1">{article.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{article.content}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/articles/edit/${article.id}`} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-bold text-sm active:scale-95">✏️</Link>
              <button onClick={() => handleDelete(article.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold text-sm active:scale-95">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
