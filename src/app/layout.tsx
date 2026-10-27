import type { Metadata } from "next";
import "./globals.css";
import GoogleTranslate from "@/components/GoogleTranslate";

import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://arena27.my.id'),
  title: {
    default: 'Arena27 - Portal Berita Sport',
    template: '%s | Arena27'
  },
  description: 'Portal berita sport terlengkap dengan update terkini seputar sepak bola, basket, esports, dan olahraga lainnya.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://arena27.my.id',
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
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({pageLanguage: 'id', autoDisplay: false}, 'google_translate_element');
              }
            `,
          }}
        />
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
      </head>
      <body className={`${anton.variable} antialiased min-h-screen bg-slate-50`}>
        <GoogleTranslate />
        {children}
      </body>
    </html>
  );
}
