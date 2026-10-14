'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Sepak Bola', 'Sport', 'Basket', 'Badminton', 'Tinju', 'Esports', 'Publik Arena'];
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800';

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [imageUrl, setImageUrl] = useState('');
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
      image: imageUrl.trim() !== '' ? imageUrl.trim() : DEFAULT_IMAGE,
      created_at: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('arena27_articles') || '[]');
    existing.unshift(newArticle);
    localStorage.setItem('arena27_articles', JSON.stringify(existing));

    alert('✅ Berita berhasil dipublish!');
    router.push('/admin/articles');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-6">✍️ Tulis Berita Baru</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Judul Berita</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Persib Juara Liga 1..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Link Gambar (Opsional)</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://contoh.com/gambar.jpg (kosongkan = gambar default)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
          <p className="text-xs text-slate-400 mt-1">💡 Tips: klik kanan gambar di internet → Copy image address → paste di sini.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Tulis isi berita lengkap di sini..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-y" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition active:scale-95 disabled:opacity-50 text-lg">
          {isSubmitting ? '⏳ Menyimpan...' : '🚀 PUBLIKASIKAN BERITA'}
        </button>
      </form>
    </div>
  );
}
