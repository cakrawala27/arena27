'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newArticle = {
      id: Date.now(),
      title,
      category,
      content,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800' // Gambar default sport
    };

    // Ambil data lama, tambah data baru di paling depan
    const existing = JSON.parse(localStorage.getItem('arena27_articles') || '[]');
    existing.unshift(newArticle); 
    localStorage.setItem('arena27_articles', JSON.stringify(existing));

    alert('✅ Berita berhasil dipublish ke Halaman Depan!');
    router.push('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-6">✍️ Tulis Berita Baru</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Judul Berita</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Persib Juara..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white">
            <option>Sepak Bola</option><option>Basket</option><option>MotoGP</option><option>F1</option><option>Esports</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="Tulis isi berita..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-y" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition active:scale-95 disabled:opacity-50 text-lg">
          {isSubmitting ? '⏳ Menyimpan...' : '🚀 PUBLIKASIKAN BERITA'}
        </button>
      </form>
    </div>
  );
}
