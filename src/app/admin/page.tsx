// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi buka/tutup
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fungsi paksa tutup
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative overflow-hidden">
      
      {/* OVERLAY HITAM - Hanya muncul di mobile saat sidebar buka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR NAVIGASI */}
      {/* 
         Mobile: Fixed, Full Height, Hidden by default (-translate-x-full)
         Desktop: Static, Always Visible (translate-x-0)
      */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-72 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-slate-800
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 md:w-64 md:shadow-none md:border-r-0
        `}
      >
        <div className="p-5 border-b border-slate-700 flex items-center justify-between bg-slate-900 sticky top-0">
          <h2 className="text-2xl font-black text-orange-500 tracking-wide">ARENA<span className="text-white">27</span></h2>
          
          {/* Tombol Close (Hanya di Mobile) */}
          <button 
            onClick={closeSidebar}
            className="md:hidden p-2 rounded-full hover:bg-slate-800 text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          <Link href="/admin" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg bg-orange-600 text-white font-bold shadow-md hover:bg-orange-500 transition">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/admin/articles" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <span>📝</span> Articles
          </Link>
          <Link href="/admin/articles/new" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <span>➕</span> Add New
          </Link>
          <Link href="/admin/categories" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <span></span> Categories
          </Link>
          <Link href="/admin/tags" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition">
            <span>🏷️</span> Tags
          </Link>
          
          <div className="pt-4 mt-4 border-t border-slate-700">
             <Link href="/" onClick={closeSidebar} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
              <span></span> View Site
            </Link>
          </div>
        </nav>
      </aside>

      {/* KONTEN UTAMA & HEADER MOBILE */}
      <main className="flex-1 flex flex-col min-h-screen w-full relative z-10 bg-gray-100">
        
        {/* HEADER MOBILE (Hamburger Menu) */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-30 border-b border-gray-200">
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 text-slate-900 hover:bg-gray-100 rounded-lg active:scale-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
          <div className="w-8"></div>
        </header>

        {/* ISI DASHBOARD */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
              <p className="text-slate-500">Kelola konten Arena27 dengan mudah dari mana saja.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Articles', val: '12', color: 'border-orange-500' },
                { label: 'Categories', val: '5', color: 'border-blue-500' },
                { label: 'Published Today', val: '3', color: 'border-green-500' }
              ].map((stat, i) => (
                <div key={i} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</h3>
                  <p className="text-3xl font-black text-slate-900 mt-1">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/admin/articles/new" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 active:scale-95 transition shadow-lg shadow-orange-500/20">
                   Write Article
                </Link>
                <Link href="/admin/categories" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-orange-500 hover:text-orange-500 active:scale-95 transition">
                  📁 Manage Categories
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
