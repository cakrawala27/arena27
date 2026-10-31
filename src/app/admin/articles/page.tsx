/* ARENA27 ADMIN V2 - admv2-articles */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const fetchArticles = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
    setLoading(false);
  };
  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Hapus berita ini permanen dari server?')) {
      await supabase.from('articles').delete().eq('id', id);
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const clean = (s: string) => (s || '').replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
  const filtered = articles.filter((a) => {
    const hay = ((a.title || '') + ' ' + (a.category || '')).toLowerCase();
    return hay.includes(q.toLowerCase());
  });
  const fmtDate = (s: string) => new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl md:text-2xl font-black text-white">📰 Daftar Berita <span className="text-gray-500 font-bold text-sm">({articles.length})</span></h1>
        <Link href="/admin/articles/new" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b00] to-[#c2410c] text-white px-5 py-3 rounded-xl font-black text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all">➕ Tulis Baru</Link>
      </div>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Cari judul atau kategori..." className="w-full mb-4 px-4 py-3 rounded-xl bg-[#141414] border border-[#2a2a2a] text-sm text-white placeholder-gray-500 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all" />

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-2xl bg-[#141414] border border-[#222222] animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2e2e2e] bg-[#111111] py-16 text-center">
          <p className="text-4xl mb-3">🗂️</p>
          <p className="text-sm text-gray-400 font-bold">{q ? 'Tidak ada hasil untuk "' + q + '"' : 'Belum ada berita sama sekali'}</p>
          <Link href="/admin/articles/new" className="inline-block mt-4 text-sm font-black text-[#ff6b00]">+ Tulis berita pertama</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.id} className="flex gap-3 items-center bg-[#141414] border border-[#242424] rounded-2xl p-3 hover:border-[#ff6b00]/40 transition-colors">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#1c1c1c] shrink-0 overflow-hidden flex items-center justify-center text-2xl">
                {a.image ? <img src={a.image} alt="" className="w-full h-full object-cover" /> : '🖼️'}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-[#ff6b00] uppercase">{a.category}</span>
                <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1">{a.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{clean(a.content).slice(0, 90) || '(kosong)'}</p>
                <p className="text-[10px] text-gray-600 mt-1">{fmtDate(a.created_at)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link href={'/admin/articles/edit/' + a.id} className="px-3 py-2 rounded-lg font-bold text-sm bg-[#1c1c1c] text-[#4da3ff] border border-[#2a2a2a] hover:border-[#4da3ff]/60 active:scale-95 transition-all" title="Edit">✏️</Link>
                <button onClick={() => handleDelete(a.id)} className="px-3 py-2 rounded-lg font-bold text-sm bg-[#1c1c1c] text-[#ff5c5c] border border-[#2a2a2a] hover:border-[#ff5c5c]/60 active:scale-95 transition-all" title="Hapus">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
