import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Kebijakan Privasi | Arena27' };

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 8 }}>Kebijakan Privasi Arena27</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}><b>Terakhir diperbarui: 28 Oktober 2026</b></p>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 24 }}>
            Arena27 menghargai privasi setiap pengunjung yang mengakses situs kami. Kebijakan Privasi ini menjelaskan bagaimana informasi dapat dikumpulkan, digunakan, dan diproses ketika pengunjung membaca berita atau mengakses halaman di situs Arena27.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>1. Informasi yang Dikumpulkan</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Arena27 merupakan portal berita yang menyediakan konten untuk dibaca oleh pengunjung. Pengunjung tidak diwajibkan membuat akun atau masuk ke sistem untuk membaca berita.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Ketika situs diakses, server atau layanan teknis yang mendukung operasional situs dapat mencatat informasi tertentu secara otomatis, seperti alamat IP, jenis browser, perangkat yang digunakan, waktu akses, serta halaman yang dikunjungi. Informasi yang benar-benar dicatat bergantung pada konfigurasi server dan layanan yang digunakan.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Apabila pengunjung menghubungi redaksi melalui email, informasi yang disampaikan secara sukarela dapat digunakan untuk menanggapi pesan tersebut.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>2. Penggunaan Cookie</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Cookie merupakan berkas kecil yang dapat disimpan pada perangkat pengunjung ketika mengakses situs web.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Cookie dapat digunakan untuk mendukung fungsi teknis situs, menyimpan preferensi tertentu, atau membantu memahami aktivitas kunjungan apabila fitur terkait diaktifkan.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Penggunaan cookie bergantung pada teknologi dan konfigurasi yang diterapkan pada situs Arena27 maupun layanan pendukungnya.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Pengunjung dapat mengatur atau menghapus cookie melalui pengaturan browser masing-masing. Menonaktifkan cookie tertentu dapat memengaruhi fungsi beberapa fitur situs.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>3. Analitik dan Statistik Pengunjung</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Arena27 dapat mengevaluasi trafik dan kinerja situs untuk memahami kebutuhan pembaca serta meningkatkan kualitas layanan.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Informasi teknis mengenai kunjungan dapat diproses oleh server atau layanan analitik apabila fitur tersebut digunakan. Pengumpulan dan pemrosesan informasi bergantung pada konfigurasi serta layanan yang diterapkan pada situs.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>4. Layanan Pihak Ketiga</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Arena27 dapat menggunakan layanan pihak ketiga untuk mendukung operasional, keamanan, dan peningkatan kualitas situs.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Layanan pihak ketiga yang terintegrasi dengan situs dapat memiliki kebijakan privasi dan ketentuan tersendiri dalam memproses informasi pengunjung. Pengunjung disarankan membaca kebijakan privasi penyedia layanan terkait apabila ingin mengetahui lebih lanjut mengenai praktik pemrosesan informasi tersebut.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>5. Penggunaan Informasi</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Informasi yang tersedia atau diproses melalui operasional situs dapat digunakan untuk:</p>
          <ul style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16, paddingLeft: 24, listStyleType: 'disc' }}>
            <li>Menyediakan dan menampilkan berita kepada pengunjung.</li>
            <li>Menjaga keamanan dan kestabilan operasional situs.</li>
            <li>Menangani pertanyaan yang dikirimkan kepada redaksi.</li>
            <li>Mengevaluasi kinerja situs apabila sarana pengukuran terkait digunakan.</li>
            <li>Memenuhi kewajiban hukum yang berlaku.</li>
          </ul>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Informasi yang diproses bergantung pada konfigurasi situs, layanan yang digunakan, dan tujuan pemrosesan yang relevan.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>6. Perlindungan Informasi</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Arena27 berupaya menjaga keamanan situs dan informasi yang diproses melalui langkah-langkah yang wajar sesuai kebutuhan operasionalnya.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Meskipun demikian, transmisi data melalui internet dan penyimpanan elektronik tidak dapat dijamin sepenuhnya bebas dari risiko keamanan.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>7. Penyimpanan dan Pengungkapan Informasi</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Informasi yang diproses dapat disimpan selama diperlukan untuk tujuan operasional, keamanan, penanganan komunikasi, atau pemenuhan kewajiban hukum yang berlaku.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Informasi dapat diproses oleh penyedia layanan yang mendukung operasional situs atau diungkapkan apabila diwajibkan berdasarkan ketentuan hukum yang berlaku.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>8. Hak dan Pilihan Pengunjung</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Pengunjung dapat mengelola pengaturan cookie melalui browser yang digunakan.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Untuk pertanyaan atau permintaan terkait privasi dan informasi pribadi, pengunjung dapat menghubungi redaksi Arena27 melalui alamat email yang tercantum di bagian kontak.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Permintaan akan ditangani sesuai ketentuan hukum yang berlaku.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>9. Perubahan Kebijakan Privasi</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Arena27 dapat memperbarui Kebijakan Privasi ini apabila terdapat perubahan pada teknologi, fitur situs, layanan pihak ketiga, atau ketentuan hukum yang berlaku.</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Setiap pembaruan akan dipublikasikan pada halaman ini dengan tanggal pembaruan terbaru.</p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>10. Kontak</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>Jika memiliki pertanyaan, masukan, atau permintaan terkait Kebijakan Privasi Arena27, silakan menghubungi kami melalui:</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 8 }}><b>Email:</b> Arena27project@gmail.com</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}><b>Situs web:</b> https://arena27.my.id</p>

        </div>
      </div>
      <Footer />
    </div>
  );
}
