/* ARENA27 ADMIN V2 - admv2-layout */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/articles', label: 'Artikel', icon: '📰' },
  { href: '/admin/analytics', label: 'Statistik', icon: '📈' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* ===== SIDEBAR (DESKTOP) ===== */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 flex-col bg-[#111111] border-r border-[#242424] z-40">
        <Link href="/admin" className="flex items-center justify-between px-5 h-16 border-b border-[#1f1f1f] shrink-0">
          <span className="text-xl font-black tracking-widest text-white">ARENA<span className="text-[#ff6b00]">27</span></span>
          <span className="text-[9px] font-black text-[#ff6b00] bg-[#ff6b00]/10 border border-[#ff6b00]/40 rounded px-1.5 py-0.5 tracking-wider">ADMIN</span>
        </Link>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={
                'flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm transition-all ' +
                (isActive(n.href)
                  ? 'bg-gradient-to-r from-[#ff6b00]/20 to-transparent text-[#ff6b00] border border-[#ff6b00]/30'
                  : 'text-gray-400 border border-transparent hover:text-white hover:bg-[#1a1a1a]')
              }
            >
              <span className="text-lg">{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
          <Link
            href="/admin/articles/new"
            className="mt-3 flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-black text-sm text-white bg-gradient-to-r from-[#ff6b00] to-[#c2410c] shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            ➕ Tulis Berita
          </Link>
        </nav>
        <div className="p-3 border-t border-[#1f1f1f] shrink-0">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs text-gray-300 border border-[#2a2a2a] hover:border-[#ff6b00]/50 hover:text-white transition-all">
            🌐 Buka Website
          </a>
          <p className="text-[10px] text-gray-600 mt-3 text-center tracking-wide">Dev by <span className="text-[#ff6b00] font-bold">Cybernet Project</span></p>
        </div>
      </aside>

      {/* ===== TOPBAR (MOBILE) ===== */}
      <header className="md:hidden sticky top-0 z-40 h-14 flex items-center justify-between px-4 bg-[#111111]/95 backdrop-blur border-b border-[#242424]">
        <Link href="/admin" className="text-lg font-black tracking-widest text-white">ARENA<span className="text-[#ff6b00]">27</span></Link>
        <span className="text-[9px] font-black text-[#ff6b00] bg-[#ff6b00]/10 border border-[#ff6b00]/40 rounded px-1.5 py-0.5 tracking-wider">ADMIN</span>
        <a href="/" target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-300 border border-[#2e2e2e] rounded-full px-3 py-1.5">🌐 Web</a>
      </header>

      {/* ===== KONTEN ===== */}
      <main className="md:pl-60">
        <div className="max-w-5xl mx-auto px-4 py-6 pb-28 md:pb-12">{children}</div>
      </main>

      {/* ===== BOTTOM NAV (MOBILE) ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur border-t border-[#242424]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex justify-around items-end py-2 px-1">
          <Link href="/admin" className={'flex flex-col items-center px-3 py-1 rounded-lg ' + (isActive('/admin') ? 'text-[#ff6b00]' : 'text-gray-500')}>
            <span className="text-xl">📊</span><span className="text-[10px] mt-0.5 font-bold">Home</span>
          </Link>
          <Link href="/admin/articles" className={'flex flex-col items-center px-3 py-1 rounded-lg ' + (isActive('/admin/articles') && pathname !== '/admin/articles/new' ? 'text-[#ff6b00]' : 'text-gray-500')}>
            <span className="text-xl">📰</span><span className="text-[10px] mt-0.5 font-bold">Artikel</span>
          </Link>
          <Link href="/admin/articles/new" className="relative -mt-7 flex flex-col items-center" aria-label="Tulis berita baru">
            <span className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#ff6b00] to-[#c2410c] flex items-center justify-center text-2xl text-white shadow-lg shadow-orange-500/40 border-4 border-[#0a0a0a]">＋</span>
            <span className="text-[10px] mt-0.5 font-bold text-gray-400">Tulis</span>
          </Link>
          <Link href="/admin/analytics" className={'flex flex-col items-center px-3 py-1 rounded-lg ' + (isActive('/admin/analytics') ? 'text-[#ff6b00]' : 'text-gray-500')}>
            <span className="text-xl">📈</span><span className="text-[10px] mt-0.5 font-bold">Statistik</span>
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="flex flex-col items-center px-3 py-1 rounded-lg text-gray-500">
            <span className="text-xl">🌐</span><span className="text-[10px] mt-0.5 font-bold">Web</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
