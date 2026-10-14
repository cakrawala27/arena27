// src/app/admin/page.tsx
'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* HEADER ATAS */}
      <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-orange-500">ARENA<span className="text-white">27</span></h1>
        </Link>
        <span className="text-sm text-slate-400 hidden sm:block">Admin Panel</span>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-4 pb-20"> {/* pb-20 biar konten nggak ketutup bottom nav */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* WELCOME CARD */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-slate-600">Kelola konten portal berita Arena27 dengan mudah.</p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Total Articles</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">12</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Categories</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">5</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Published Today</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">3</p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/articles/new" className="block p-4 rounded-lg bg-orange-500 text-white text-center font-medium hover:bg-orange-600 transition">
                ➕ Write New Article
              </Link>
              <Link href="/admin/categories" className="block p-4 rounded-lg bg-slate-100 text-slate-900 text-center font-medium hover:bg-slate-200 transition">
                📁 Manage Categories
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* BOTTOM NAVIGATION (MOBILE ONLY) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="flex flex-col items-center p-2 text-orange-500">
            <span className="text-xl">📊</span>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="/admin/articles" className="flex flex-col items-center p-2 text-slate-500 hover:text-orange-500">
            <span className="text-xl">📝</span>
            <span className="text-xs mt-1">Articles</span>
          </Link>
          <Link href="/admin/articles/new" className="flex flex-col items-center p-2 text-slate-500 hover:text-orange-500">
            <span className="text-xl">➕</span>
            <span className="text-xs mt-1">Add New</span>
          </Link>
          <Link href="/admin/categories" className="flex flex-col items-center p-2 text-slate-500 hover:text-orange-500">
            <span className="text-xl"></span>
            <span className="text-xs mt-1">Categories</span>
          </Link>
        </div>
      </nav>

    </div>
  );
}
