'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArticleDetailPage() {
  const params: any = useParams();
  const id = params ? String(params.id) : '';
  const [article, setArticle] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('arena27_articles');
      if (stored) {
        const list = JSON.parse(stored);
        const found = list.find((a: any) => String(a.id) === id);
        setArticle(found || null);
      }
    } catch (e) {}
    setLoaded(true);
  }, [id]);

  if (!loaded) return <div className="p-10 text-center text-slate-500">Memuat berita...</div>;

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm text-center">
        <h1 className="text-xl font-black text-slate-900 mb-2">Berita tidak ditemukan 😕</h1>
        <p className="text-slate-500 mb-4 text-sm">Berita ini tersimpan di perangkat penulisnya. Database online segera hadir!</p>
        <Link href="/" className="text-orange-500 font-bold">← Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-6" />
      <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">{article.category}</span>
      <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">{article.title}</h1>
      <div className="whitespace-pre-line text-slate-700 text-base md:text-lg leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {article.content}
      </div>
      <div className="mt-6">
        <Link href="/" className="text-orange-500 font-bold">← Kembali ke Beranda</Link>
      </div>
    </article>
  );
}