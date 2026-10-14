'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['Sepak Bola', 'Sport', 'Basket', 'Badminton', 'Tinju', 'Esports', 'Publik Arena'];

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('articles').insert([{
      title, category, content,
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800',
      status: 'published'
    }]);
    setIsSubmitting(false);
    if (error) alert('❌ Gagal: ' + error.message);
    else { alert('✅ Berita dipublish ke seluruh dunia!'); router.push('/admin/articles'); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-6">✍️ Tulis Berita Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Judul Berita</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Link Gambar</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-y" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition active:scale-95 disabled:opacity-50 text-lg">
          {isSubmitting ? '⏳ Mengirim ke Cloud...' : '🚀 PUBLIKASIKAN KE DUNIA'}
        </button>
      </form>
    </div>
  );
}
