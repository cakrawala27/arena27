'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">
          ARENA<span className="text-orange-500">27</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href ? 'text-orange-500' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/artikel"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-bold transition-all"
          >
            Berita Terbaru
          </Link>
        </nav>
      </div>
    </header>
  );
}
