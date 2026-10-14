'use client';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const openWebsite = () => {
    if (typeof window !== 'undefined') window.open(window.location.origin, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
      <header className="bg-slate-900 text-white p-3 flex items-center justify-between shadow-md sticky top-0 z-50 px-4">
        <Link href="/admin" className="flex items-center gap-1 text-sm font-bold text-orange-500">← Dashboard</Link>
        <h1 className="text-xl font-black text-orange-500">ARENA<span className="text-white">27</span></h1>
        <button onClick={openWebsite} className="text-sm font-bold text-slate-300">Website 🌐</button>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="flex flex-col items-center p-2 text-orange-500"><span className="text-xl">📊</span><span className="text-[10px] mt-1 font-bold">Home</span></Link>
          <Link href="/admin/articles" className="flex flex-col items-center p-2 text-slate-500"><span className="text-xl">📝</span><span className="text-[10px] mt-1">Articles</span></Link>
          <Link href="/admin/articles/new" className="flex flex-col items-center p-2 text-orange-500 bg-orange-100 rounded-full px-4 -mt-4 shadow-lg border-4 border-white"><span className="text-2xl">➕</span></Link>
          <Link href="/" className="flex flex-col items-center p-2 text-slate-500"><span className="text-xl">🏠</span><span className="text-[10px] mt-1">Web</span></Link>
        </div>
      </nav>
    </div>
  );
}