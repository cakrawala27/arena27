import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Kontak | Arena27' };

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Hubungi Kami</h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 24 }}>
            Punya pertanyaan, kritik, saran, atau ingin bekerja sama dengan Arena27? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini:
          </p>
          <div style={{ background: '#0a0a0a', padding: 20, borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>📧 Email Redaksi</h3>
            <p style={{ fontSize: 15, color: '#ff6b00', fontWeight: 600 }}>redaksi@arena27.my.id</p>
          </div>
          <div style={{ background: '#0a0a0a', padding: 20, borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>💼 Kerja Sama & Iklan</h3>
            <p style={{ fontSize: 15, color: '#ff6b00', fontWeight: 600 }}>partner@arena27.my.id</p>
          </div>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 40, borderTop: '1px solid #262626', paddingTop: 20 }}>
            Kami akan merespons pesan Anda dalam waktu 1x24 jam kerja.
          </p>
        </div>
      </div>
      
    </div>
  );
}
