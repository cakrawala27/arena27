import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://arena27-psi.vercel.app'),
  title: {
    default: 'Arena27 - Portal Berita Sport',
    template: '%s | Arena27'
  },
  description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
  keywords: ['berita sport', 'sepak bola', 'basket', 'esports', 'liga champions', 'premier league'],
  authors: [{ name: 'Arena27' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://arena27-psi.vercel.app',
    title: 'Arena27 - Portal Berita Sport',
    description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
    siteName: 'Arena27',
    images: [
      {
        url: '/icon.jpg', // Kita akan buat file ini
        width: 1200,
        height: 630,
        alt: 'Arena27 - Portal Berita Sport'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arena27 - Portal Berita Sport',
    description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
    images: ['/icon.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
