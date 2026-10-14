'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['Sepak Bola', 'Sport', 'Basket', 'Badminton', 'Tinju', 'Esports', 'Publik Arena'];

export default function EditArticlePage() {
  const params: any = useParams();
  const id = params ? String(params.id) : '';
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('arena27_articles');
      if (stored) {
        const found = JSON.parse(stored).find((a: any) => String(a.id) === id);
        if (found) {
          setTitle(found.title || '');
          setCategory(found.category || 'Sepak Bola');
          setImageUrl(found.image || '');
          setContent(found.content || '');
        }
      }
    } catch (e) {}
    setLoaded(true);
  }, [id]);

  const handleSave = (e: any) => {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('arena27_articles') || '[]');
    const idx = list.findIndex((a: any) => String(a.id) === id);
    if (idx === -1) { alert('Berita tidak ditemukan!'); return; }
    list[idx] = { ...list[idx], title, category, image: imageUrl.trim() || list[idx].image, content };
    localStorage.setItem('arena27_articles', JSON.stringify(list));
    alert('✅ Perubahan berhasil disimpan!');
    router.push('/admin/articles');
  };

  if (!loaded) return <div className="p-10 text-center text-slate-500">Memuat data...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-6">✏️ Edit Berita</h1>
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
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
          <label className="block text-sm font-bold text-slate-700 mb-2">Link Gambar (Ganti di sini)</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://contoh.com/gambar-baru.jpg" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-200" />}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-y" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition active:scale-95 text-lg">
            💾 SIMPAN PERUBAHAN
          </button>
          <Link href="/admin/articles" className="px-5 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-lg active:scale-95">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}