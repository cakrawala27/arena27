'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORY_TREE: { name: string; subs: string[] }[] = [
  { name: 'Sepak Bola', subs: ['Premier League', 'Serie A', 'La Liga', 'Bundesliga', 'Liga Champions', 'FA Cup', 'FIFA Calendar', 'Timnas'] },
  { name: 'Sport', subs: ['MotoGP', 'F1'] },
  { name: 'Sudut Mata', subs: ['Teknologi', 'Opini'] },
  { name: 'Basket', subs: ['NBA', 'IBL'] },
  { name: 'Badminton', subs: ['BWF', 'Olympic'] },
  { name: 'Tinju', subs: [] },
  { name: 'Esports', subs: ['Mobile Legends', 'PUBG', 'Valorant'] },
  { name: 'Publik Arena', subs: ['Sekitar Kita'] },
];

type Props = { isEdit?: boolean };

export default function ArticleForm({ isEdit = false }: Props) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [subcategory, setSubcategory] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSubs = CATEGORY_TREE.find((c) => c.name === category)?.subs || [];

  useEffect(() => {
    const urlId = new URLSearchParams(window.location.search).get('id') || '';
    setId(urlId);
    if (isEdit && urlId) {
      try {
        const stored = localStorage.getItem('arena27_articles');
        if (stored) {
          const found = JSON.parse(stored).find((a: any) => String(a.id) === urlId);
          if (found) {
            setTitle(found.title || '');
            setCategory(found.category || 'Sepak Bola');
            setSubcategory(found.subcategory || '');
            setContent(found.content || '');
            setImageBase64(found.image || '');
          }
        }
      } catch (e) {}
    }
  }, [isEdit]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setCategory(next);
    const subs = CATEGORY_TREE.find((c) => c.name === next)?.subs || [];
    setSubcategory(subs.length > 0 ? subs[0] : '');
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Maksimal 5MB!'); return; }
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > 800) { h = Math.round((h * 800) / w); w = 800; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.drawImage(img, 0, 0, w, h);
        setImageBase64(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = String(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const list = JSON.parse(localStorage.getItem('arena27_articles') || '[]');
    if (isEdit && id) {
      const idx = list.findIndex((a: any) => String(a.id) === id);
      if (idx !== -1) list[idx] = { ...list[idx], title, category, subcategory, content, image: imageBase64 };
    } else {
      list.unshift({ id: Date.now(), title, category, subcategory, content, image: imageBase64, created_at: new Date().toISOString() });
    }
    localStorage.setItem('arena27_articles', JSON.stringify(list));
    alert('✅ Berhasil disimpan!');
    router.push('/admin/articles');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-black text-slate-900 mb-6">{isEdit ? '✏️ Edit Berita' : '✍️ Tulis Berita Baru'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Judul</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
            <select value={category} onChange={handleCategoryChange} className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white">
              {CATEGORY_TREE.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sub Kategori</label>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={currentSubs.length === 0} className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white disabled:bg-slate-100 disabled:text-slate-400">
              {currentSubs.length === 0 ? <option>Umum</option> : currentSubs.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Upload Gambar dari HP</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700" />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-3 h-40 w-full object-cover rounded-lg border border-gray-200" />}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-y" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="flex-1 bg-orange-500 text-white font-black py-4 rounded-lg shadow-lg active:scale-95 disabled:opacity-50">
            {isSubmitting ? '⏳...' : (isEdit ? '💾 SIMPAN' : '🚀 PUBLISH')}
          </button>
          <Link href="/admin/articles" className="px-5 flex items-center bg-slate-200 rounded-lg font-bold">Batal</Link>
        </div>
      </form>
    </div>
  );
}