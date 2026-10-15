import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://arena27-psi.vercel.app'),
  title: "Arena27 - Portal Berita Sport",
  description: "Portal berita sport terlengkap",
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}