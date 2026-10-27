import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-white tracking-wider">
              ARENA<span className="text-orange-500">27</span>
            </Link>
            <p className="text-xs mt-2">© 2026 Arena27. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-orange-500 transition-colors">Tentang Kami</Link>
            <Link href="/contact" className="hover:text-orange-500 transition-colors">Kontak</Link>
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
