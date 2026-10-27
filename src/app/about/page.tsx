export const metadata = { title: 'Tentang Kami | Arena27' };

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '40px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Tentang Arena27</h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          <b>Arena27</b> adalah portal berita olahraga terdepan yang menyajikan informasi terkini, analisis mendalam, dan liputan eksklusif seputar dunia olahraga. Kami berkomitmen untuk memberikan berita yang akurat, cepat, dan terpercaya kepada seluruh pembaca di Indonesia dan mancanegara.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Didirikan dengan semangat untuk menghadirkan jurnalisme olahraga berkualitas, Arena27 mencakup berbagai kategori mulai dari Sepakbola (Liga Champions, Premier League, Serie A), Basket (NBA), MotoGP, hingga Esports.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 32, marginBottom: 16 }}>Visi Kami</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Menjadi sumber referensi utama bagi para penggemar olahraga di Indonesia, dengan menghadirkan konten yang informatif, inspiratif, dan berintegritas.
        </p>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 40, borderTop: '1px solid #262626', paddingTop: 20 }}>
          Dikelola secara profesional oleh <b>Cybernet Project Indonesia</b>.
        </p>
      </div>
    </div>
  );
}
