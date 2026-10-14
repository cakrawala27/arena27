'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['Sepak Bola', 'Sport', 'Basket', 'Badminton', 'Tinju', 'Esports', 'Publik Arena'];
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800';

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sepak Bola');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let finalImageUrl = DEFAULT_IMAGE;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
      if (uploadError) { alert('❌ Gagal upload: ' + uploadError.message); setIsSubmitting(false); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('articles').insert([{ title, category, content, image: finalImageUrl, status: 'published' }]);
    setIsSubmitting(false);
    if (error) alert('❌ Gagal publish: ' + error.message);
    else { alert('✅ Berita + Gambar berhasil dipublish!'); router.push('/admin/articles'); }
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
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">📸 Upload Gambar dari HP</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer cursor-pointer" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 h-48 w-full object-cover rounded-lg border-2 border-orange-500" />}
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-y" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition active:scale-95 disabled:opacity-50 text-lg">
          {isSubmitting ? '⏳ Upload & Publish...' : '🚀 PUBLIKASIKAN KE DUNIA'}
        </button>
      </form>
    </div>
  );
}
