'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { CATEGORY_TREE, MAIN_CATEGORIES } from '@/lib/categories';
import RichEditor from '@/components/RichEditor'; // Pastikan lu punya komponen ini

export default function ArticleForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEdit = !!initialData;
  
  const [title, setTitle] = useState(initialData?.title || '');
  
  // Pisahin kategori & sub-kategori
  const catParts = (initialData?.category || 'Sepakbola').split(' - ');
  const [category, setCategory] = useState(catParts[0] || 'Sepakbola');
  const currentSubs = CATEGORY_TREE[category] || [];
  const [subcategory, setSubcategory] = useState(catParts[1] || currentSubs[0] || '');
  
  const [content, setContent] = useState(initialData?.content || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // SEO State
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDesc, setMetaDesc] = useState(initialData?.meta_description || '');
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focus_keyword || '');
  const [showSEO, setShowSEO] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (next: string) => {
    setCategory(next);
    const subs = CATEGORY_TREE[next] || [];
    setSubcategory(subs.length > 0 ? subs[0] : '');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalImageUrl = imageUrl;

    // Upload gambar ke Supabase Storage kalau ada file baru
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = Date.now() + '-' + Math.random().toString(36).substring(7) + '.' + fileExt;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
      
      if (uploadError) {
        alert('Gagal upload gambar: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const payload = {
      title,
      category: category + ' - ' + subcategory,
      content,
      image: finalImageUrl,
      meta_title: metaTitle,
      meta_description: metaDesc,
      focus_keyword: focusKeyword,
      status: 'published'
    };

    if (isEdit) {
      await supabase.from('articles').update(payload).eq('id', initialData.id);
    } else {
      await supabase.from('articles').insert([payload]);
    }

    setIsSubmitting(false);
    router.push('/admin/articles');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-black text-slate-900 mb-6">{isEdit ? 'Edit Berita' : 'Tulis Berita Baru'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* === KARTU 1: KONTEN UTAMA === */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Judul</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg" placeholder="Judul berita..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Utama</label>
              <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white">
                {MAIN_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sub Kategori</label>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={currentSubs.length === 0} className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white disabled:bg-slate-100">
                {currentSubs.length === 0 ? <option>Umum</option> : currentSubs.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label>
            <RichEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* === KARTU 2: GAMBAR === */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
          <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Utama</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
          <p className="text-xs text-slate-400">Atau masukkan URL manual:</p>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://..." />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 w-full max-h-60 object-cover rounded-lg border" />}
        </div>

        {/* === KARTU 3: SEO SETTINGS === */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowSEO(!showSEO)}>
            <h3 className="font-black text-orange-500 uppercase tracking-wider text-sm">🔍 SEO Settings</h3>
            <span className="text-slate-400">{showSEO ? '▲' : '▼'}</span>
          </div>
          
          {showSEO && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meta Title (50-60 karakter)</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Judul untuk Google..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meta Description (120-160 karakter)</label>
                <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Deskripsi singkat untuk Google..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Focus Keyword</label>
                <input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Kata kunci utama..." />
              </div>
            </div>
          )}
        </div>

        {/* === TOMBOL AKSI === */}
        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg transition-colors disabled:opacity-50">
            {isSubmitting ? 'Menyimpan...' : (isEdit ? '💾 SIMPAN' : '🚀 PUBLISH SEKARANG')}
          </button>
          <Link href="/admin/articles" className="px-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-lg font-bold transition-colors">Batal</Link>
        </div>

      </form>
    </div>
  );
}
