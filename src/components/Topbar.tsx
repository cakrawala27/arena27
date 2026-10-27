'use client';

import Link from 'next/link';

export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 flex justify-end items-center px-6 py-4 bg-[#0a0a0a] border-b border-zinc-800/50">
      <Link href="/" className="text-xl font-black tracking-wider hover:opacity-80 transition-opacity">
        <span style={{ color: '#ff6b00' }}>ARENA</span><span style={{ color: '#ffffff' }}>27</span>
      </Link>
    </div>
  );
}
