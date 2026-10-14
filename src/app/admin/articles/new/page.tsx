'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORY_TREE = {
  'Sepakbola': ['Premier League', 'Serie A', 'La Liga', 'Bundesliga', 'Liga Champions', 'FA Cup', 'Liga Indonesia', 'Piala Dunia'],
  'Basket': ['NBA', 'EuroLeague', 'ABL', 'DBL', 'Piala Dunia Basket'],
  'Sport': ['MotoGP', 'F1', 'Tour de France', 'Olimpiade', 'Atletik', 'Renang', 'Tinju', 'MMA', 'UFC'],
  'Esports': ['Mobile Legends', 'PUBG', 'Valorant', 'Dota 2', 'Free Fire', 'League of Legends', 'CS:GO'],
  'Mata Dunia': ['Teknologi', 'Opini', 'Politik', 'Ekonomi', 'Hiburan', 'Gaya Hidup', 'Otomotif', 'Travel'],
  'Publik Arena': ['Berita Utama', 'Wawancara', 'Analisis', 'Feature', 'Investigasi']
};

const MAIN_CATEGORIES = Object.keys(CATEGORY_TREE);
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800';


export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [mainCategory, setMainCategory] = useState('Sepakbola');
  const [customMainCategory, setCustomMainCategory] = useState('');
  const [useCustomMain, setUseCustomMain] = useState(false);
  const [subCategory, setSubCategory] = useState('');
  const [customSubCategory, setCustomSubCategory] = useState('');
  const [useCustomSub, setUseCustomSub] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalMain = useCustomMain ? (customMainCategory || 'Lainnya') : mainCategory;
    let finalSub = useCustomSub ? (customSubCategory || '') : subCategory;
    let finalCategory = finalSub ? finalMain + ' - ' + finalSub : finalMain;
    
    let finalImageUrl = DEFAULT_IMAGE;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = Date.now() + '-' + Math.random().toString(36).substring(7) + '.' + fileExt;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
      if (uploadError) { alert('Gagal upload: ' + uploadError.message); setIsSubmitting(false); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('articles').insert([{ title, category: finalCategory, content, image: finalImageUrl, status: 'published' }]);
    setIsSubmitting(false);
    if (error) alert('Gagal publish: ' + error.message);
    else { alert('Berita berhasil dipublish!'); router.push('/admin/articles'); }
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
          <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Utama</label>
          <select value={useCustomMain ? 'Lainnya' : mainCategory} onChange={(e) => {
            if (e.target.value === 'Lainnya') { setUseCustomMain(true); setMainCategory(''); }
            else { setUseCustomMain(false); setMainCategory(e.target.value); setCustomMainCategory(''); setSubCategory(''); setUseCustomSub(false); }
          }} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white">
            {MAIN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Lainnya">✍️ Tambah Kategori Baru...</option>
          </select>
          {useCustomMain && (
            <input type="text" required value={customMainCategory} onChange={(e) => setCustomMainCategory(e.target.value)} placeholder="Ketik nama kategori baru..." className="mt-2 w-full px-4 py-3 border-2 border-orange-500 rounded-lg outline-none" />
          )}
        </div>

        {!useCustomMain && mainCategory && (
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sub Kategori</label>
            <select value={useCustomSub ? 'Lainnya' : subCategory} onChange={(e) => {
              if (e.target.value === 'Lainnya') { setUseCustomSub(true); setSubCategory(''); }
              else { setUseCustomSub(false); setSubCategory(e.target.value); setCustomSubCategory(''); }
            }} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white">
              {(CATEGORY_TREE[mainCategory] || []).map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Lainnya">✍️ Tambah Sub Kategori Baru...</option>
            </select>
            {useCustomSub && (
              <input type="text" required value={customSubCategory} onChange={(e) => setCustomSubCategory(e.target.value)} placeholder="Ketik nama sub kategori baru..." className="mt-2 w-full px-4 py-3 border-2 border-orange-500 rounded-lg outline-none" />
            )}
          </div>
        )}

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