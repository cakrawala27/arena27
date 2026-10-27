import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = { title: 'Tentang Kami | Arena27' };

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Topbar />
      <div style={{ flex: 1, padding: '40px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
          
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Tentang Arena27</h1>
          
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Arena27 adalah portal berita olahraga yang menyajikan informasi terbaru seputar sepak bola, NBA, MotoGP, esports, dan berbagai cabang olahraga lainnya.
          </p>
          
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
            Kami menghadirkan berita, hasil pertandingan, dan perkembangan dunia olahraga nasional maupun internasional secara aktual, informatif, dan mudah dipahami.
          </p>
          
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 32 }}>
            Arena27 hadir untuk menemani penggemar olahraga mengikuti setiap pertandingan dan cerita di balik dunia olahraga.
          </p>

          <div style={{ borderTop: '1px solid #262626', paddingTop: 20 }}>
            <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 8 }}>
              <b>Email:</b> Arena27project@gmail.com
            </p>
            <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 8 }}>
              <b>Website:</b> https://arena27.my.id
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
