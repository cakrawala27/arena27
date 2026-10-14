import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-slate-600">Kelola konten portal berita Arena27 dengan mudah dari mana saja.</p>
      </div>

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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/articles/new" className="block p-4 rounded-lg bg-orange-500 text-white text-center font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
            ➕ Write New Article
          </Link>
          <Link href="/admin/categories" className="block p-4 rounded-lg bg-slate-100 text-slate-900 text-center font-bold hover:bg-slate-200 transition">
            📁 Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
