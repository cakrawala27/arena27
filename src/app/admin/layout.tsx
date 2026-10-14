'use client';

import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fungsi paksa buka tab baru ke URL utama
  const openWebsite = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.origin, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
      
      {/* HEADER ADMIN GLOBAL */}
      <header className="bg-slate-900 text-white p-3 flex items-center justify-between shadow-md sticky top-0 z-50 px-4">
        
        <Link href="/admin" className="flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-400 transition active:scale-95">
          <span className="text-xl leading-none">←</span>
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        <h1 className="text-xl font-black text-orange-500 tracking-tight">
          ARENA<span className="text-white">27</span>
        </h1>

        {/* TOMBOL WEBSITE PAKAI JAVASCRIPT MURNI */}
        <button
          onClick={openWebsite}
          className="flex items-center gap-1 text-sm font-bold text-slate-300 hover:text-white transition active:scale-95 bg-transparent border-none cursor-pointer p-0"
        >
          <span className="hidden sm:inline">Website</span>
          <span className="text-lg leading-none">🌐</span>
        </button>

      </header>

      {/* KONTEN HALAMAN */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* BOTTOM NAVIGATION (HANYA DI HP) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="flex flex-col items-center p-2 text-orange-500">
            <span className="text-xl">📊</span>
            <span className="text-[10px] mt-1 font-bold">Home</span>
          </Link>
          <Link href="/admin/articles" className="flex flex-col items-center p-2 text-slate-500">
            <span className="text-xl">📝</span>
            <span className="text-[10px] mt-1">Articles</span>
          </Link>
          <Link href="/admin/articles/new" className="flex flex-col items-center p-2 text-slate-500">
            <span className="text-xl">➕</span>
            <span className="text-[10px] mt-1">Add New</span>
          </Link>
          <Link href="/admin/categories" className="flex flex-col items-center p-2 text-slate-500">
            <span className="text-xl">📁</span>
            <span className="text-[10px] mt-1">Categories</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
