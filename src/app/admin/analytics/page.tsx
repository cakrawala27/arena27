'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [views, setViews] = useState<any[]>([]);
  const [topArticles, setTopArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Ambil data kunjungan & artikel
      const { data: viewsData } = await supabase
        .from('article_views')
        .select('viewed_at, article_id')
        .order('viewed_at', { ascending: true });

      const { data: articlesData } = await supabase
        .from('articles')
        .select('id, title');

      if (viewsData && articlesData) {
        // --- PROSES GRAFIK HARIAN ---
        const groupedDates: { [key: string]: number } = {};
        viewsData.forEach((v) => {
          const date = new Date(v.viewed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
          groupedDates[date] = (groupedDates[date] || 0) + 1;
        });
        const chartData = Object.entries(groupedDates).map(([date, count]) => ({ date, count }));
        setViews(chartData);

        // --- PROSES TOP ARTIKEL ---
        const groupedArticles: { [key: string]: number } = {};
        viewsData.forEach((v) => {
          groupedArticles[v.article_id] = (groupedArticles[v.article_id] || 0) + 1;
        });

        const topData = Object.entries(groupedArticles)
          .map(([id, count]) => {
            const article = articlesData.find((a) => a.id === id);
            return {
              id,
              count,
              title: article ? article.title : 'Artikel Dihapus',
            };
          })
          .sort((a, b) => b.count - a.count) // Urutkan dari yang terbanyak
          .slice(0, 10); // Ambil Top 5

        setTopArticles(topData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalViews = views.reduce((sum, v) => sum + v.count, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '24px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: 0 }}>
            📊 Statistik Pengunjung
          </h1>
          <Link href="/admin" style={{ color: '#ff6b00', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            ← Kembali ke Admin
          </Link>
        </div>
        
        <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>Total Kunjungan (Semua Artikel)</p>
          <p style={{ fontSize: 32, fontWeight: 800, color: '#ff6b00', margin: '4px 0 0' }}>{totalViews}</p>
        </div>

        {/* GRAFIK HARIAN */}
        <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
            Grafik Kunjungan per Hari
          </h2>
          {loading ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: 40 }}>Memuat data...</p>
          ) : views.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: 40 }}>Belum ada data kunjungan.</p>
          ) : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={views} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: '#161616', border: '1px solid #ff6b00', borderRadius: 8 }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#ff6b00' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#ff6b00" strokeWidth={3} dot={{ r: 5, fill: '#ff6b00' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* TOP ARTIKEL */}
        <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
            🏆 10 Artikel Paling Banyak Diklik
          </h2>
          {loading ? (
             <p style={{ color: '#9ca3af', textAlign: 'center' }}>Memuat...</p>
          ) : topArticles.length === 0 ? (
             <p style={{ color: '#9ca3af', textAlign: 'center' }}>Belum ada data.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {topArticles.map((item, idx) => (
                <Link key={item.id} href={'/artikel/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0a0a0a', border: '1px solid #262626', padding: '12px 16px', borderRadius: 8 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#ff6b00', minWidth: 30 }}>#{idx + 1}</div>
                    <div style={{ flex: 1, fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', background: '#1f1f1f', padding: '4px 10px', borderRadius: 99 }}>
                      {item.count} klik
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
