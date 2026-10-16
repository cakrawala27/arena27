'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RichEditor from '@/components/RichEditor';

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
  const [subCategory, setSubCategory] = useState(CATEGORY_TREE['Sepakbola'][0]);
  const [customMainCategory, setCustomMainCategory] = useState('');
  const [customSubCategory, setCustomSubCategory] = useState('');
  const [useCustomMain, setUseCustomMain] = useState(false);
  const [useCustomSub, setUseCustomSub] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSEO, setShowSEO] = useState(true);

  const handleMainCategoryChange = (val: string) => {
    if (val === 'Lainnya') {
      setUseCustomMain(true);
      setMainCategory('');
      setSubCategory('');
    } else {
      setUseCustomMain(false);
      setMainCategory(val);
      setCustomMainCategory('');
      setUseCustomSub(false);
      setCustomSubCategory('');
      const subs = CATEGORY_TREE[val] || [];
      setSubCategory(subs.length > 0 ? subs[0] : '');
    }
  };

  const handleSubCategoryChange = (val: string) => {
    if (val === 'Lainnya') {
      setUseCustomSub(true);
      setSubCategory('');
    } else {
      setUseCustomSub(false);
      setSubCategory(val);
      setCustomSubCategory('');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert('Maksimal 5MB bro!'); return; }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { alert('Judul wajib diisi!'); return; }
    const finalMain = useCustomMain ? (customMainCategory || 'Lainnya') : mainCategory;
    const finalSub = useCustomSub ? (customSubCategory || '') : subCategory;
    if (!finalMain || !finalSub) { alert('Kategori & sub-kategori wajib diisi!'); return; }

    setIsSubmitting(true);
    const finalCategory = finalMain + ' - ' + finalSub;
    let finalImageUrl = DEFAULT_IMAGE;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = Date.now() + '-' + Math.random().toString(36).substring(7) + '.' + fileExt;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
      if (uploadError) { alert('Gagal upload: ' + uploadError.message); setIsSubmitting(false); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('articles').insert([{
      title,
      category: finalCategory,
      content,
      image: finalImageUrl,
      status: 'published',
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      focus_keyword: focusKeyword || null,
    }]);

    setIsSubmitting(false);
    if (error) alert('Gagal publish: ' + error.message);
    else { alert('Berhasil dipublish!'); router.push('/admin/articles'); }
  };

  const currentSubs = useCustomMain ? [] : (CATEGORY_TREE[mainCategory] || []);

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title"><span>TULIS</span> BERITA BARU</h1>

      <form onSubmit={handleSubmit}>
        <div className="admin-grid">

          <div>
            <div className="admin-card">
              <div className="admin-card-title">Judul Berita</div>
              <input
                type="text"
                className="admin-input admin-title-input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tulis judul yang menarik..."
              />
            </div>

            <div className="admin-card">
              <div className="admin-card-title">Isi Berita</div>
              <div className="admin-editor-wrap">
                <RichEditor required value={content} onChange={setContent} rows={20} />
              </div>
            </div>
          </div>

          <div className="admin-sidebar">

            <div className="admin-card">
              <div className="admin-card-title">Publish</div>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Mengupload...' : 'Publish Sekarang'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => router.push('/admin/articles')}>
                Batal
              </button>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">Kategori</div>

              <div className="admin-field">
                <label className="admin-label">Kategori Utama <span className="req">*</span></label>
                <select className="admin-select" value={useCustomMain ? 'Lainnya' : mainCategory} onChange={(e) => handleMainCategoryChange(e.target.value)}>
                  {MAIN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="Lainnya">Tambah Kategori Baru...</option>
                </select>
                {useCustomMain && (
                  <input
                    type="text"
                    className="admin-input"
                    style={{ marginTop: 8 }}
                    required
                    value={customMainCategory}
                    onChange={(e) => setCustomMainCategory(e.target.value)}
                    placeholder="Ketik nama kategori baru..."
                  />
                )}
              </div>

              {!useCustomMain && mainCategory && (
                <div className="admin-field" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Sub Kategori <span className="req">*</span></label>
                  <select className="admin-select" value={useCustomSub ? 'Lainnya' : subCategory} onChange={(e) => handleSubCategoryChange(e.target.value)}>
                    {currentSubs.map((s) => <option key={s} value={s}>{s}</option>)}
                    <option value="Lainnya">Tambah Sub Kategori Baru...</option>
                  </select>
                  {useCustomSub && (
                    <input
                      type="text"
                      className="admin-input"
                      style={{ marginTop: 8 }}
                      required
                      value={customSubCategory}
                      onChange={(e) => setCustomSubCategory(e.target.value)}
                      placeholder="Ketik nama sub kategori baru..."
                    />
                  )}
                </div>
              )}

              {!useCustomMain && !useCustomSub && subCategory && (
                <div className="admin-warning">
                  Kategori: <strong>{mainCategory} - {subCategory}</strong>
                </div>
              )}
            </div>

            <div className="admin-card">
              <div className="admin-card-title">Thumbnail</div>
              <label className="admin-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <span className="admin-upload-icon">Upload</span>
                <span className="admin-upload-text">{imagePreview ? 'Ganti Gambar' : 'Pilih Gambar (Maks 5MB)'}</span>
              </label>
              {imagePreview && <img src={imagePreview} alt="Preview" className="admin-preview" />}
            </div>

            <div className="admin-card">
              <div className="admin-card-title admin-seo-toggle" onClick={() => setShowSEO(!showSEO)}>
                SEO Settings {showSEO ? 'v' : '>'}
              </div>

              {showSEO && (
                <>
                  <div className="admin-field">
                    <label className="admin-label">Meta Title <span className="opt">(opsional)</span></label>
                    <input
                      type="text"
                      className="admin-input"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Judul SEO untuk Google"
                      maxLength={60}
                    />
                    <div className={`admin-counter ${metaTitle.length > 55 ? 'over' : ''}`}>{metaTitle.length}/60</div>
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Meta Description <span className="opt">(opsional)</span></label>
                    <textarea
                      className="admin-textarea"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Deskripsi untuk Google"
                      maxLength={160}
                      rows={3}
                    />
                    <div className={`admin-counter ${metaDescription.length > 150 ? 'over' : ''}`}>{metaDescription.length}/160</div>
                  </div>

                  <div className="admin-field" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Focus Keyword <span className="opt">(opsional)</span></label>
                    <input
                      type="text"
                      className="admin-input"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="Contoh: manchester united"
                    />
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
