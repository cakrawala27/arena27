'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORY_TREE: Record<string, string[]> = {
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
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
    <div>
      <h1>✍️ Tulis Berita Baru</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul Berita</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Kategori Utama</label>
          <select value={useCustomMain ? 'Lainnya' : mainCategory} onChange={(e) => {
            if (e.target.value === 'Lainnya') { setUseCustomMain(true); setMainCategory(''); }
            else { setUseCustomMain(false); setMainCategory(e.target.value); setCustomMainCategory(''); setSubCategory(''); setUseCustomSub(false); }
          }}>
            {MAIN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            <option value="Lainnya">✍️ Tambah Kategori Baru...</option>
          </select>
          {useCustomMain && (
            <input type="text" required value={customMainCategory} onChange={(e) => setCustomMainCategory(e.target.value)} placeholder="Ketik nama kategori baru..." />
          )}
        </div>
        {!useCustomMain && mainCategory && (
          <div>
            <label>Sub Kategori</label>
            <select value={useCustomSub ? 'Lainnya' : subCategory} onChange={(e) => {
              if (e.target.value === 'Lainnya') { setUseCustomSub(true); setSubCategory(''); }
              else { setUseCustomSub(false); setSubCategory(e.target.value); setCustomSubCategory(''); }
            }}>
              {(CATEGORY_TREE[mainCategory] || []).map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Lainnya">✍️ Tambah Sub Kategori Baru...</option>
            </select>
            {useCustomSub && (
              <input type="text" required value={customSubCategory} onChange={(e) => setCustomSubCategory(e.target.value)} placeholder="Ketik nama sub kategori baru..." />
            )}
          </div>
        )}
        <div>
          <label>📸 Upload Gambar dari HP</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div>
        <div>
          <label>Isi Berita</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
        </div>
        
        {/* SEO FIELDS */}
        <div style={{marginTop: 24, padding: 20, background: '#1e1e1e', borderRadius: 12, border: '1px solid rgba(229,57,53,0.2)'}}>
          <h3 style={{fontSize: 14, fontWeight: 800, color: '#ff6b00', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8}}>
            🔍 SEO Settings
          </h3>
          
          <div style={{marginBottom: 16}}>
            <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 6}}>
              Meta Title <span style={{color: 'rgba(255,255,255,0.4)', fontWeight: 400}}>(opsional, kosong = pakai judul artikel)</span>
            </label>
            <input 
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Judul SEO untuk Google (50-60 karakter)"
              maxLength={60}
              style={{width: '100%', padding: '12px 14px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none'}}
            />
            <div style={{fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4}}>{metaTitle.length}/60 karakter</div>
          </div>

          <div style={{marginBottom: 16}}>
            <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 6}}>
              Meta Description <span style={{color: 'rgba(255,255,255,0.4)', fontWeight: 400}}>(opsional, kosong = auto dari konten)</span>
            </label>
            <textarea 
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Deskripsi SEO untuk Google (120-160 karakter)"
              maxLength={160}
              rows={3}
              style={{width: '100%', padding: '12px 14px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
            />
            <div style={{fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4}}>{metaDescription.length}/160 karakter</div>
          </div>

          <div style={{marginBottom: 0}}>
            <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 6}}>
              Focus Keyword <span style={{color: 'rgba(255,255,255,0.4)', fontWeight: 400}}>(kata kunci utama)</span>
            </label>
            <input 
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="Contoh: manchester united, liga inggris"
              style={{width: '100%', padding: '12px 14px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none'}}
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '⏳ Upload & Publish...' : '🚀 PUBLIKASIKAN KE DUNIA'}
        </button>
      </form>
    </div>
  );
}