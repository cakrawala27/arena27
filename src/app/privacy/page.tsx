export const metadata = { title: 'Kebijakan Privasi | Arena27' };

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '40px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#161616', border: '1px solid #262626', borderRadius: 16, padding: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#ff6b00', marginBottom: 24 }}>Kebijakan Privasi</h1>
        <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>Terakhir diperbarui: 27 Oktober 2026</p>
        
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 24, marginBottom: 12 }}>1. Informasi yang Kami Kumpulkan</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Kami dapat mengumpulkan informasi seperti alamat IP, jenis perangkat, browser, halaman yang dikunjungi, dan waktu kunjungan untuk keperluan analitik dan peningkatan layanan.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 24, marginBottom: 12 }}>2. Penggunaan Cookie</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Arena27 menggunakan cookie untuk menyimpan preferensi pengguna dan menampilkan iklan yang relevan. Anda dapat menonaktifkan cookie melalui pengaturan browser Anda.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 24, marginBottom: 12 }}>3. Layanan Pihak Ketiga</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Kami bekerja sama dengan layanan pihak ketiga seperti Google Analytics, Google AdSense, dan penyedia hosting (Vercel & Supabase) yang mungkin mengumpulkan data sesuai dengan kebijakan privasi mereka masing-masing.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 24, marginBottom: 12 }}>4. Keamanan Data</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Kami berkomitmen melindungi data pengguna dengan enkripsi SSL dan sistem keamanan berlapis. Namun, tidak ada sistem yang 100% aman, dan kami tidak dapat menjamin keamanan mutlak.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 24, marginBottom: 12 }}>5. Hubungi Kami</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9ca3af', marginBottom: 16 }}>
          Jika ada pertanyaan mengenai kebijakan privasi ini, hubungi kami di <b>redaksi@arena27.my.id</b>.
        </p>
      </div>
    </div>
  );
}
