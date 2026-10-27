import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Kontak | Arena27' };

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Hubungi Kami</h1>
          
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 32 }}>
            Punya pertanyaan, kritik, saran, atau masukan seputar pemberitaan Arena27? Kami terbuka untuk mendengar Anda.
          </p>

          <div style={{ background: '#0a0a0a', padding: 20, borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>📧 Email Redaksi</h3>
            <p style={{ fontSize: 15, color: '#ff6b00', fontWeight: 600, marginBottom: 8 }}>Arena27project@gmail.com</p>
            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
              Silakan kirim pesan melalui email tersebut. Kami akan berupaya merespons setiap pesan secepat mungkin.
            </p>
          </div>

          <div style={{ background: '#0a0a0a', padding: 20, borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>🌐 Situs Web</h3>
            <p style={{ fontSize: 15, color: '#ff6b00', fontWeight: 600 }}>https://arena27.my.id</p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
