import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://arena27-psi.vercel.app'),
  title: {
    default: 'Arena27 - Portal Berita Sport',
    template: '%s | Arena27'
  },
  description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://arena27-psi.vercel.app',
    title: 'Arena27 - Portal Berita Sport',
    description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
    siteName: 'Arena27',
    images: [
      {
        url: '/icon.jpg',
        width: 512,
        height: 512,
        alt: 'Arena27 Logo'
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
