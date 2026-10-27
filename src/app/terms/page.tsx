import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Syarat & Ketentuan | Arena27' };

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Syarat & Ketentuan</h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Dengan mengakses dan menggunakan situs Arena27, Anda menyetujui syarat dan ketentuan berikut.
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>Hak Cipta</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Seluruh konten di Arena27 (teks, gambar, video) dilindungi oleh hak cipta. Anda tidak diperkenankan menyalin atau mendistribusikan konten tanpa izin tertulis.
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>Tautan Eksternal</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Arena27 dapat memuat tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas konten atau kebijakan privasi situs eksternal tersebut.
          </p>
        </div>
      </div>
      
    </div>
  );
}
