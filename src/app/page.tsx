import Link from 'next/link';

export default function HomePage() {
  // Data berita dummy buat tampilan awal
  const dummyNews = [
    { 
      id: 1, 
      title: 'Persib Bandung Juara Liga 1 Setelah Penantian Panjang', 
      category: 'Sepak Bola', 
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800' 
    },
    { 
      id: 2, 
      title: 'LeBron James Cetak Rekor Baru di NBA Musim Ini', 
      category: 'Basket', 
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800' 
    },
    { 
      id: 3, 
      title: 'Marc Marquez Kembali ke Podium Utama MotoGP', 
      category: 'MotoGP', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* HERO SECTION */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl mb-8 shadow-xl border border-slate-800">
        <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Headline</span>
        <h1 className="text-2xl md:text-4xl font-black mt-4 mb-2">Selamat Datang di Arena27! 🏟️</h1>
        <p className="text-slate-300 text-sm md:text-base">Portal berita sport terlengkap, tercepat, dan terpercaya dari seluruh dunia.</p>
      </div>

      {/* DAFTAR BERITA */}
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
        🔥 Berita Terkini
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNews.map((news) => (
          <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100">
            <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">{news.category}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3 line-clamp-2">{news.title}</h3>
              <Link href="#" className="text-sm text-orange-500 font-bold hover:underline flex items-center gap-1">
                Baca Selengkapnya <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <div className="mt-12 text-center text-slate-400 text-sm">
        <p>Ini adalah halaman depan untuk pembaca. (Halaman Admin ada di /admin)</p>
      </div>
    </div>
  );
}
