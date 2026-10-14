'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['Sepak Bola', 'Basket', 'MotoGP', 'F1', 'Badminton', 'Tinju', 'Esports', 'Lainnya'];

export default function ArticleForm({ isEdit = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const stored = localStorage.getItem('arena27_articles');
      if (stored) {
        const found = JSON.parse(stored).find((a: any) => String(a.id) === id);
        if (found) {
          setTitle(found.title); setCategory(found.category);
          setContent(found.content); setImageBase64(found.image || '');
        }
      }
    }
  }, [isEdit, id]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Maksimal 5MB!'); return; }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > 800) { h *= 800 / w; w = 800; } // Auto resize max width 800px
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        setImageBase64(canvas.toDataURL('image/jpeg', 0.8)); // Compress
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const list = JSON.parse(localStorage.getItem('arena27_articles') || '[]');
    
    if (isEdit && id) {
      const idx = list.findIndex((a: any) => String(a.id) === id);
      list[idx] = { ...list[idx], title, category, content, image: imageBase64 };
    } else {
      list.unshift({ id: Date.now(), title, category, content, image: imageBase64, created_at: new Date().toISOString() });
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
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 border rounded-lg bg-white">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Upload Gambar dari HP</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-3 h-40 w-full object-cover rounded-lg border" />}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border rounded-lg resize-y" />
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
