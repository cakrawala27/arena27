// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      
      {/* OVERLAY UNTUK MOBILE - Klik untuk tutup sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR NAVIGASI */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:h-auto md:shadow-none
        `}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-orange-500">Arena27 Admin</h2>
          <button 
            onClick={closeSidebar}
            className="md:hidden text-white hover:text-orange-500 text-2xl focus:outline-none"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block p-3 rounded-lg bg-orange-500 text-white font-medium">
             Dashboard
          </Link>
          <Link href="/admin/articles" className="block p-3 rounded-lg hover:bg-slate-800 transition">
             Articles
          </Link>
          <Link href="/admin/articles/new" className="block p-3 rounded-lg hover:bg-slate-800 transition">
             Add New Article
          </Link>
          <Link href="/admin/categories" className="block p-3 rounded-lg hover:bg-slate-800 transition">
            📁 Categories
          </Link>
          <Link href="/admin/tags" className="block p-3 rounded-lg hover:bg-slate-800 transition">
            ️ Tags
          </Link>
          <Link href="/" className="block p-3 rounded-lg hover:bg-slate-800 transition mt-8 border-t border-slate-700 pt-4">
             View Site
          </Link>
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col min-h-screen w-full">
        
        {/* HEADER MOBILE DENGAN HAMBURGER MENU */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
          <button 
            onClick={toggleSidebar}
            className="text-slate-900 text-2xl focus:outline-none"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
          <div className="w-8"></div> {/* Spacer biar tengah */}
        </header>

        {/* KONTEN DASHBOARD */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* WELCOME CARD */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back, Admin! 👋</h1>
              <p className="text-slate-600">Kelola konten portal berita Arena27 dengan mudah.</p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
                <h3 className="text-sm font-medium text-slate-500 uppercase">Total Articles</h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-slate-500 uppercase">Categories</h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">5</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-slate-500 uppercase">Published Today</h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
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
        </div>

      </main>
    </div>
  );
}
