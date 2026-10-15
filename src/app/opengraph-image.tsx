import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Arena27 - Portal Berita Sport';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)',
        }}
      >
        {/* Logo Text */}
        <div
          style={{
            display: 'flex',
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#ff6b00',
            marginBottom: 20,
          }}
        >
          ARENA<span style={{ color: '#ffffff' }}>27</span>
        </div>
        
        {/* Tagline */}
        <div 
          style={{
            fontSize: 36,
            color: '#a1a1aa',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Portal Berita Sport Terlengkap & Terkini
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
