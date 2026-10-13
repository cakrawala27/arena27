import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Arena27</h2>
          <p className="text-gray-500 mt-1">Selamat datang kembali, Admin! 👋</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg"
        >
          + Tulis Berita Baru
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-orange-500 text-white text-2xl p-4 rounded-lg">📰</div>
          <div>
            <p className="text-gray-500 text-sm">Total Artikel</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-blue-500 text-white text-2xl p-4 rounded-lg">👁️</div>
          <div>
            <p className="text-gray-500 text-sm">Total Views</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-green-500 text-white text-2xl p-4 rounded-lg">📁</div>
          <div>
            <p className="text-gray-500 text-sm">Kategori</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-purple-500 text-white text-2xl p-4 rounded-lg">📝</div>
          <div>
            <p className="text-gray-500 text-sm">Draft</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <div className="text-6xl mb-4">🏟️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Selamat Datang di Arena27!</h3>
        <p className="text-gray-500 mb-6">Belum ada artikel. Yuk mulai tulis berita sport pertama lo!</p>
        <Link
          href="/admin/articles/new"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Tulis Berita Pertama
        </Link>
      </div>
    </div>
  );
}