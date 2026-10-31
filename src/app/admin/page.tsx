/* ARENA27 ADMIN V2 - admv2-dashboard */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [total, setTotal] = useState<number | null>(null);
  const [monthCount, setMonthCount] = useState<number | null>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { count } = await supabase.from('articles').select('*', { count: 'exact', head: true });
      setTotal(count || 0);
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      const { count: mc } = await supabase.from('articles').select('*', { count: 'exact', head: true }).gte('created_at', start.toISOString());
      setMonthCount(mc || 0);
      const { data } = await supabase.from('articles').select('id,title,category,image,created_at').order('created_at', { ascending: false }).limit(5);
      setRecent(data || []);
    };
    load();
  }, []);

  const fmtDate = (s: string) => new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-5">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.15),transparent_55%)]" />
        <div className="relative">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#ff6b00] uppercase">Panel Kontrol</p>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">Selamat datang, Admin 👋</h1>
          <p className="text-sm text-gray-400 mt-2">Semua data tersimpan aman di cloud Supabase.</p>
        </div>
      </div>

      {/* STAT */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-4 md:p-5 hover:border-[#ff6b00]/40 transition-colors">
          <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-wider">Total Berita</p>
          <p className="text-2xl md:text-4xl font-black mt-1 bg-gradient-to-r from-[#ff9142] to-[#ff6b00] bg-clip-text text-transparent">{total === null ? '…' : total}</p>
        </div>
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-4 md:p-5 hover:border-[#ff6b00]/40 transition-colors">
          <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-wider">Bulan Ini</p>
          <p className="text-2xl md:text-4xl font-black mt-1 text-white">{monthCount === null ? '…' : monthCount}</p>
        </div>
        <div className="rounded-2xl border border-[#242424] bg-[#141414] p-4 md:p-5 hover:border-[#ff6b00]/40 transition-colors">
          <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-wider">Server</p>
          <p className="text-base md:text-2xl font-black mt-2 text-green-500">🟢 ONLINE</p>
        </div>
      </div>

      {/* AKSI CEPAT */}
      <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-6">
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/admin/articles/new" className="p-4 rounded-xl text-center font-black text-white bg-gradient-to-r from-[#ff6b00] to-[#c2410c] shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all">➕ Tulis Berita</Link>
          <Link href="/admin/articles" className="p-4 rounded-xl text-center font-bold text-gray-200 bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#ff6b00]/50 active:scale-95 transition-all">📰 Daftar Berita</Link>
          <Link href="/admin/analytics" className="p-4 rounded-xl text-center font-bold text-gray-200 bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#ff6b00]/50 active:scale-95 transition-all">📈 Statistik</Link>
        </div>
      </div>

      {/* BERITA TERBARU */}
      <div className="rounded-2xl border border-[#242424] bg-[#141414] p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">🕒 Berita Terbaru</h2>
          <Link href="/admin/articles" className="text-xs font-bold text-[#ff6b00]">Lihat semua →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">Belum ada berita. Yuk tulis yang pertama! ✍️</p>
        ) : (
          <div className="space-y-2">
            {recent.map((a) => (
              <Link key={a.id} href={'/admin/articles/edit/' + a.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f0f0f] border border-[#222222] hover:border-[#ff6b00]/40 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-[#1c1c1c] shrink-0 overflow-hidden flex items-center justify-center text-xl">
                  {a.image ? <img src={a.image} alt="" className="w-full h-full object-cover" /> : '🖼️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-[#ff6b00] uppercase truncate">{a.category}</p>
                  <p className="text-sm font-bold text-white truncate">{a.title}</p>
                  <p className="text-[11px] text-gray-500">{fmtDate(a.created_at)}</p>
                </div>
                <span className="text-gray-600">›</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
