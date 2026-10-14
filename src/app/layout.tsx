import type { Metadata } from 'next'
import './globals.css'
import LogoLink from '@/components/LogoLink' // Import komponen baru

export const metadata: Metadata = {
  title: 'Arena27 - Portal Berita Sport',
  description: 'Portal berita sport terlengkap dan terpercaya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-100 font-sans flex flex-col">
        
        {/* HEADER DENGAN LOGO INTERAKTIF */}
        <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
          
          {/* Panggil Komponen LogoLink di sini */}
          <LogoLink />

          {/* Navigasi Kategori (Tanpa Tombol Admin) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/" className="hover:text-orange-500 transition">Semua</a>
            <a href="/kategori/sepak-bola" className="hover:text-orange-500 transition">Sepak Bola</a>
            <a href="/kategori/basket" className="hover:text-orange-500 transition">Basket</a>
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
