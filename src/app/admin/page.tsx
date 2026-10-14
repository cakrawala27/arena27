// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type IconName =
  | 'dashboard'
  | 'articles'
  | 'plus'
  | 'folder'
  | 'tag'
  | 'globe'
  | 'menu'
  | 'close'
  | 'pen';

const ICON_PATHS: Record<IconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </>
  ),
  articles: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  folder: (
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </>
  ),
};

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const NAV_ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/articles', label: 'Articles', icon: 'articles' },
  { href: '/admin/articles/new', label: 'Add New', icon: 'plus' },
  { href: '/admin/categories', label: 'Categories', icon: 'folder' },
  { href: '/admin/tags', label: 'Tags', icon: 'tag' },
];

const STATS = [
  { label: 'Total Articles', value: '12', accent: 'border-orange-500' },
  { label: 'Categories', value: '5', accent: 'border-blue-500' },
  { label: 'Published Today', value: '3', accent: 'border-green-500' },
];

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  if (href === '/admin/articles') {
    return pathname.startsWith('/admin/articles') && !pathname.startsWith('/admin/articles/new');
  }
  return pathname === href || pathname.startsWith(href + '/');
}

export default function AdminDashboard() {
  const pathname = usePathname() ?? '';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isSidebarOpen]);

  const linkBase =
    'flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:w-64 md:max-w-none md:shrink-0 md:translate-x-0 md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigasi admin"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">
          <h2 className="text-2xl font-black tracking-wide text-orange-500">
            ARENA<span className="text-white">27</span>
          </h2>
          <button
            type="button"
            onClick={closeSidebar}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-slate-800 active:scale-95 md:hidden"
            aria-label="Tutup menu"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                aria-current={active ? 'page' : undefined}
                className={`${linkBase} ${
                  active
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 border-t border-slate-800 pt-4">
            <Link
              href="/"
              onClick={closeSidebar}
              className={`${linkBase} text-slate-400 hover:bg-slate-800 hover:text-white`}
            >
              <Icon name="globe" />
              View Site
            </Link>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-3 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={openSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-900 transition hover:bg-gray-100 active:scale-95"
            aria-label="Buka menu"
            aria-expanded={isSidebarOpen}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Admin Panel</h1>
          <div className="h-11 w-11" aria-hidden="true" />
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-5xl space-y-4 md:space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
              <h1 className="mb-1 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                Welcome back!
              </h1>
              <p className="text-sm text-slate-500 md:text-base">
                Kelola konten Arena27 dengan mudah dari mana saja.
              </p>
            </section>

            <section className="grid grid-cols-3 gap-2 sm:gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border-l-4 bg-white p-3 shadow-sm sm:p-5 ${stat.accent}`}
                >
                  <h3 className="text-[10px] font-bold uppercase leading-tight tracking-wider text-slate-400 sm:text-xs">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Link
                  href="/admin/articles/new"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-orange-500 p-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-95"
                >
                  <Icon name="pen" />
                  Write Article
                </Link>
                <Link
                  href="/admin/categories"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white p-4 font-bold text-slate-700 transition hover:border-orange-500 hover:text-orange-500 active:scale-95"
                >
                  <Icon name="folder" />
                  Manage Categories
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}