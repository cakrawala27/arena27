'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 

type Article = {
  id: string;
  title: string;
  category: string;
  tags: string;
  content: string;
  image: string;
  status: 'published' | 'draft';
  created_at: string;
};

const CATEGORIES = [
  { name: 'Sepak Bola', subs: ['Premier League', 'Serie A', 'La Liga', 'Bundesliga', 'Timnas Indonesia', 'FIFA Football'] },
  { name: 'Sport', subs: ['MotoGP', 'F1'] },
  { name: 'Basket', subs: ['NBA', 'IBL'] },
  { name: 'Badminton', subs: ['BWF', 'Olympic'] },
  { name: 'Tinju', subs: [] },
  { name: 'Esports', subs: ['Mobile Legends', 'PUBG', 'Valorant'] },
  { name: 'Publik Arena', subs: ['Sekitar Kita'] },
];

function compressImage(file: File, maxW = 1200, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > maxW) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas ctx gagal'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Gambar gagal dibaca'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File gagal dibaca'));
    reader.readAsDataURL(file);
  });
}

export default function NewArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('File harus gambar ya, bro! (jpg/png/webp)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert('Gambar kegedean, maksimal 8MB sebelum dikompres.');
      return;
    }
    setUploading(true);
    try {
      const compressed = await compressImage(file, 1200, 0.7);
      setImage(compressed);
    } catch {
      alert('Gagal proses gambar, coba file lain.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      alert('Judul berita wajib diisi, bro!');
      return;
    }
    
    setLoading(true);

    const newArticle = {
      title: title.trim(),
      category,
      tags: tags.trim(),
      content,
      image,
      status,
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([newArticle])
      .select();

    setLoading(false);

    if (error) {
      alert('Gagal simpan ke database: ' + error.message);
      console.error(error);
      return;
    }

    if (data) {
      setArticles([data[0], ...articles]);
    }

    setTitle('');
    setTags('');
    setContent('');
    setImage('');
    setStatus('published');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus artikel ini?')) return;
    
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Gagal hapus: ' + error.message);
      return;
    }

    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
  }

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Tulis Berita Baru</h2>
        <p className="text-gray-500 mt-1">Isi form, upload gambar, klik Publish. Data langsung masuk database online.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Berita</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Timnas Indonesia Lolos ke Final"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gambar Utama (Thumbnail)</label>
            {image ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img src={image} alt="preview" className="w-full aspect-video object-cover" />
                <button
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-700 shadow"
                >
                  🗑️ Hapus Gambar
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition text-gray-500">
                <span className="text-4xl"></span>
                <span className="text-sm font-medium">{uploading ? 'Memproses gambar…' : 'Klik untuk pilih gambar dari perangkat'}</span>
                <span className="text-xs text-gray-400">JPG / PNG / WEBP · otomatis dikompres</span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori & Sub-Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <optgroup key={cat.name} label={cat.name}>
                    <option value={cat.name}>{cat.name} (Umum)</option>
                    {cat.subs.map((sub) => (
                      <option key={sub} value={`${cat.name} - ${sub}`}>{sub}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tag (pisahkan pakai koma)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Contoh: timnas, piala aff, indonesia"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Berita</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Tulis isi berita di sini..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={uploading || loading}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : (status === 'published' ? '🚀 Publish Berita' : ' Simpan Draft')}
            </button>
            {saved && <span className="text-green-600 font-semibold">✅ Tersimpan!</span>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Artikel Tersimpan ({articles.length})</h3>
          {articles.length === 0 ? (
            <p className="text-gray-400 text-sm">Belum ada. Tulis berita pertamamu di sebelah kiri!</p>
          ) : (
            <ul className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {articles.map((a) => (
                <li key={a.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition">
                  {a.image ? (
                    <img src={a.image} alt={a.title} className="w-full h-28 object-cover" />
                  ) : (
                    <div className="w-full h-28 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl">🏟️</div>
                  )}
                  <div className="p-3">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-semibold text-gray-800 truncate">{a.title}</p>
                      <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700 text-sm shrink-0">️</button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded break-words">{a.category}</span>
                      <span className={`ml-1 px-2 py-0.5 rounded ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
                    </p>
                    {a.tags && <p className="text-xs text-gray-400 mt-2">🏷️ {a.tags}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}