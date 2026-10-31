/* ARENA27 ADMIN V2 - admv2-form */
'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { CATEGORY_TREE, MAIN_CATEGORIES } from '@/lib/categories';
import RichEditor from '@/components/RichEditor';

export default function ArticleForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');

  const catParts = (initialData?.category || 'Sepakbola').split(' - ');
  const [category, setCategory] = useState(catParts[0] || 'Sepakbola');
  const currentSubs = CATEGORY_TREE[category] || [];
  const [subcategory, setSubcategory] = useState(catParts[1] || currentSubs[0] || '');

  const [content, setContent] = useState(initialData?.content || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

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
      const f = e.target.files[0];
      setImageFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalImageUrl = imageUrl;

    // Upload gambar utama ke Supabase Storage kalau ada file baru
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

  const inputCls = 'w-full px-3 py-3 rounded-xl bg-[#0f0f0f] border border-[#2c2c2c] text-white text-sm placeholder-gray-500 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all';
  const labelCls = 'block text-xs font-black text-gray-300 uppercase tracking-wider mb-2';

  return (
    <div className="pb-4">
      <div className="mb-5">
        <h1 className="text-xl md:text-2xl font-black text-white">{isEdit ? '✏️ Edit Berita' : '🚀 Tulis Berita Baru'}</h1>
        <p className="text-xs text-gray-500 mt-1">{isEdit ? 'Perubahan langsung tampil di website setelah disimpan.' : 'Isi form di bawah, lalu klik PUBLISH SEKARANG.'}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* === KARTU 1: KONTEN UTAMA === */}
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-6 space-y-5">
          <div>
            <label className={labelCls}>Judul Berita</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Tulis judul berita di sini..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Kategori Utama</label>
              <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} className={inputCls}>
                {MAIN_CATEGORIES.map((c) => <option key={c} className="bg-[#141414] text-white">{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sub Kategori</label>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={currentSubs.length === 0} className={inputCls + ' disabled:opacity-50'}>
                {currentSubs.length === 0 ? <option className="bg-[#141414] text-white">Umum</option> : currentSubs.map((s) => <option key={s} className="bg-[#141414] text-white">{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Isi Berita</label>
            <RichEditor value={content} onChange={setContent} />
            <p className="text-[11px] text-gray-500 mt-2">💡 Mau sisip gambar di <b className="text-gray-300">tengah artikel</b>? Taruh kursor di posisi yang kamu mau di teks, lalu klik tombol oranye <b className="text-[#ff6b00]">+ Gambar</b> di toolbar editor di atas.</p>
          </div>
        </div>

        {/* === KARTU 2: GAMBAR UTAMA === */}
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-6 space-y-4">
          <label className={labelCls}>🖼️ Gambar Utama (Thumbnail)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-[#ff6b00] file:to-[#c2410c] file:text-white hover:file:brightness-110 file:cursor-pointer" />
          <p className="text-xs text-gray-500">Atau tempel URL manual:</p>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputCls + ' py-2.5'} placeholder="https://..." />
          {(imageFile ? previewUrl : imageUrl) && (
            <img src={imageFile ? previewUrl : imageUrl} alt="Preview" className="mt-1 w-full max-h-64 object-cover rounded-xl border border-[#2c2c2c]" />
          )}
        </div>

        {/* === KARTU 3: SEO SETTINGS === */}
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-6">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowSEO(!showSEO)}>
            <h3 className="text-xs font-black text-[#ff6b00] uppercase tracking-wider">🔍 SEO Settings</h3>
            <span className="text-gray-500 text-sm">{showSEO ? '▲' : '▼'}</span>
          </div>

          {showSEO && (
            <div className="space-y-4 mt-4">
              <div>
                <label className={labelCls}>Meta Title (50-60 karakter)</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputCls + ' py-2.5'} placeholder="Judul untuk Google..." />
              </div>
              <div>
                <label className={labelCls}>Meta Description (120-160 karakter)</label>
                <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={3} className={inputCls + ' py-2.5'} placeholder="Deskripsi singkat untuk Google..." />
              </div>
              <div>
                <label className={labelCls}>Focus Keyword</label>
                <input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} className={inputCls + ' py-2.5'} placeholder="Kata kunci utama..." />
              </div>
            </div>
          )}
        </div>

        {/* === TOMBOL AKSI === */}
        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-[#ff6b00] to-[#c2410c] text-white font-black py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all disabled:opacity-50">
            {isSubmitting ? '⏳ Menyimpan...' : (isEdit ? '💾 SIMPAN PERUBAHAN' : '🚀 PUBLISH SEKARANG')}
          </button>
          <Link href="/admin/articles" className="px-8 flex items-center justify-center bg-[#1c1c1c] border border-[#2c2c2c] hover:border-[#ff6b00]/50 rounded-xl font-bold text-gray-300 transition-all">Batal</Link>
        </div>

      </form>
    </div>
  );
}
