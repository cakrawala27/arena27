'use client'; // Penting untuk interaktivitas (onClick)

import type { Metadata } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arena27 - Portal Berita Sport',
  description: 'Portal berita sport terlengkap dan terpercaya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);

  // Fungsi handle tap pada logo
  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Reset counter setelah 1 detik jika belum mencapai 5
    if (newCount < 5) {
      setTimeout(() => setTapCount(0), 1000);
    }

    // Jika mencapai 5 tap, redirect ke admin
    if (newCount === 5) {
      alert('🔓 Admin Mode Activated!');
      router.push('/admin');
      setTapCount(0); // Reset setelah redirect
    }
  };

  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-100 font-sans flex flex-col">
        
        {/* HEADER DENGAN LOGO TEKS ARENA27 WARNA ORANGE + SECRET ADMIN */}
        <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
          
          {/* Logo Teks Arena27 - Klik 5x untuk akses Admin */}
          <div 
            onClick={handleLogoTap} 
            className="cursor-pointer select-none active:scale-95 transition-transform duration-100"
            title="Tap 5 times for Admin Access"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500 drop-shadow-lg tracking-tight hover:text-orange-400 transition-colors">
              ARENA<span className="text-white">27</span>
            </h1>
            {/* Indikator kecil (opsional, bisa dihapus kalau mau benar-benar rahasia) */}
            {tapCount > 0 && tapCount < 5 && (
              <span className="absolute -bottom-4 left-0 text-[10px] text-slate-500 opacity-50">
                {5 - tapCount} taps remaining...
              </span>
            )}
          </div>

          {/* Navigasi Kategori (Tanpa Tombol Admin) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/" className="hover:text-orange-500 transition">Semua</a>
            <a href="/kategori/sepak-bola" className="hover:text-orange-500 transition">Sepak Bola</a>
            <a href="/kategori/basket" className="hover:text-orange-500 transition">Basket</a>
            {/* Tombol Admin dihapus dari sini */}
          </nav>

        </header>

        {/* KONTEN HALAMAN */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-400 p-6 text-center text-sm border-t border-slate-800">
          <p>© 2026 Arena27 - Dibangun dari nol, tanpa template.</p>
        </footer>

      </body>
    </html>
  )
}
