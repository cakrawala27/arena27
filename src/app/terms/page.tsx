import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Syarat & Ketentuan | Arena27' };

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Syarat & Ketentuan Arena27</h1>
          
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 24 }}>
            Dengan mengakses situs https://arena27.my.id, Anda dianggap telah membaca dan memahami Syarat & Ketentuan berikut.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>1. Penggunaan Konten</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Seluruh konten di Arena27, termasuk artikel dan materi editorial, disediakan untuk tujuan informasi. Pengunjung tidak diperkenankan menyalin atau menerbitkan ulang konten secara keseluruhan untuk tujuan komersial tanpa izin atau dasar penggunaan yang sah.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>2. Hak Cipta</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Hak atas konten Arena27 dan materi milik pihak lain tetap berada pada pemegang hak masing-masing. Penggunaan materi pihak ketiga mengikuti ketentuan hak cipta yang berlaku.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>3. Tautan Eksternal</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Arena27 dapat memuat tautan menuju situs pihak ketiga sebagai referensi tambahan. Arena27 tidak mengendalikan isi maupun kebijakan situs tersebut. Pengunjung disarankan membaca ketentuan yang berlaku pada situs eksternal yang dikunjungi.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>4. Perubahan Ketentuan</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Arena27 dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan dipublikasikan pada halaman ini.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>5. Kontak</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 8 }}>
            Jika memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi:
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 8 }}>
            <b>Email:</b> Arena27project@gmail.com
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            <b>Situs web:</b> https://arena27.my.id
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
}
