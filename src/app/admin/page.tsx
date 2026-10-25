'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase.from('articles').select('*', { count: 'exact', head: true });
      setStats({ total: count || 0 });
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-slate-500 text-sm">Data tersimpan aman di Cloud Server Supabase.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Total Berita</h3>
          <p className="text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Status Server</h3>
          <p className="text-xl font-black text-green-600 mt-2">🟢 ONLINE</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/articles/new" className="block p-4 rounded-lg bg-orange-500 text-white text-center font-bold shadow-lg active:scale-95">➕ Tulis Berita</Link>
          <Link href="/admin/articles" className="block p-4 rounded-lg bg-slate-100 text-slate-900 text-center font-bold active:scale-95">📋 Daftar Berita</Link>
          <Link href="/admin/analytics" className="block p-4 rounded-lg bg-blue-500 text-white text-center font-bold shadow-lg active:scale-95">📊 Statistik Pengunjung</Link>
        </div>
      </div>
    </div>
  );
}
