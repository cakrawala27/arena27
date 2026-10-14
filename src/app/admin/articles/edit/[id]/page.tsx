'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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


export default function EditArticlePage() {
  const params = useParams();
  const id = params ? String(params.id) : '';
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [mainCategory, setMainCategory] = useState('Sepakbola');
  const [customMainCategory, setCustomMainCategory] = useState('');
  const [useCustomMain, setUseCustomMain] = useState(false);
  const [subCategory, setSubCategory] = useState('');
  const [customSubCategory, setCustomSubCategory] = useState('');
  const [useCustomSub, setUseCustomSub] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase.from('articles').select('*').eq('id', id).single();
      if (data) {
        setTitle(data.title);
        
        const parts = data.category.split(' - ');
        const main = parts[0];
        const sub = parts[1];
        
        if (MAIN_CATEGORIES.includes(main)) {
          setMainCategory(main);
          setUseCustomMain(false);
          if (sub && CATEGORY_TREE[main] && CATEGORY_TREE[main].includes(sub)) {
            setSubCategory(sub);
            setUseCustomSub(false);
          } else if (sub) {
            setUseCustomSub(true);
            setCustomSubCategory(sub);
          }
        } else {
          setUseCustomMain(true);
          setCustomMainCategory(main);
        }
        
        setImageUrl(data.image);
        setContent(data.content);
      }
      setLoaded(true);
    };
    if (id) fetchArticle();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    let finalMain = useCustomMain ? (customMainCategory || 'Lainnya') : mainCategory;
    let finalSub = useCustomSub ? (customSubCategory || '') : subCategory;
    let finalCategory = finalSub ? finalMain + ' - ' + finalSub : finalMain;
    
    const { error } = await supabase.from('articles').update({ title, category: finalCategory, image: imageUrl, content }).eq('id', id);
    if (!error) { alert('Tersimpan di cloud!'); router.push('/admin/articles'); }
  };

  if (!loaded) return <div className="p-10 text-center text-slate-500">Memuat...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-6">✏️ Edit Berita</h1>
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
        <div><label className="block text-sm font-bold text-slate-700 mb-2">Judul</label><input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none" /></div>
        
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

        <div><label className="block text-sm font-bold text-slate-700 mb-2">Link Gambar (Opsional)</label><input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-sm" />{imageUrl && <img src={imageUrl} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg" />}</div>
        <div><label className="block text-sm font-bold text-slate-700 mb-2">Isi Berita</label><textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-y" /></div>
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-lg shadow-lg active:scale-95 text-lg">💾 SIMPAN KE CLOUD</button>
          <Link href="/admin/articles" className="px-5 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-lg active:scale-95">Batal</Link>
        </div>
      </form>
    </div>
  );
}