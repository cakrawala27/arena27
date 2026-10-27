import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Kebijakan Privasi | Arena27' };

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Kebijakan Privasi</h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Selamat datang di kebijakan privasi Arena27. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>Informasi yang Kami Kumpulkan</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Arena27 menggunakan cookie untuk menyimpan preferensi pengunjung, mencatat informasi spesifik pengunjung pada halaman mana yang diakses, dan mempersonalisasi konten berdasarkan jenis browser pengunjung.
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>Kontak</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Jika ada pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di redaksi@arena27.my.id.
          </p>
        </div>
      </div>
      
    </div>
  );
}
