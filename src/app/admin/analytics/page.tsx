'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const FILTERS = [
  { key: 'today', label: 'Hari Ini', days: 1 },
  { key: 'week', label: 'Minggu Ini', days: 7 },
  { key: 'month', label: 'Bulan Ini', days: 30 },
  { key: 'all', label: 'Semua', days: null },
];

export default function AnalyticsPage() {
  const [views, setViews] = useState<any[]>([]);
  const [topArticles, setTopArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Build query with date filter
      let query = supabase
        .from('article_views')
        .select('viewed_at, article_id')
        .order('viewed_at', { ascending: true });

      const filter = FILTERS.find(f => f.key === activeFilter);
      if (filter && filter.days !== null) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - filter.days);
        query = query.gte('viewed_at', cutoff.toISOString());
      }

      const { data: viewsData } = await query;

      const { data: articlesData } = await supabase
        .from('articles')
        .select('id, title');

      if (viewsData && articlesData) {
        // --- GRAFIK HARIAN ---
        const groupedDates: { [key: string]: number } = {};
        viewsData.forEach((v) => {
          const date = new Date(v.viewed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
          groupedDates[date] = (groupedDates[date] || 0) + 1;
        });
        const chartData = Object.entries(groupedDates).map(([date, count]) => ({ date, count }));
        setViews(chartData);

        // --- TOP ARTIKEL ---
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
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setTopArticles(topData);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeFilter]);

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

        {/* FILTER TOMBOL */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 700,
                borderRadius: 99,
                cursor: 'pointer',
                border: activeFilter === f.key ? '2px solid #ff6b00' : '1px solid #262626',
                background: activeFilter === f.key ? '#ff6b00' : '#161616',
                color: activeFilter === f.key ? '#fff' : '#9ca3af',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>
            Total Kunjungan ({FILTERS.find(f => f.key === activeFilter)?.label})
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: '#ff6b00', margin: '4px 0 0' }}>{totalViews}</p>
        </div>

        {/* GRAFIK */}
        <div style={{ background: '#161616', border: '1px solid #262626', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
            Grafik Kunjungan per Hari
          </h2>
          {loading ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: 40 }}>Memuat data...</p>
          ) : views.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: 40 }}>Belum ada data kunjungan untuk periode ini.</p>
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
             <p style={{ color: '#9ca3af', textAlign: 'center' }}>Belum ada data untuk periode ini.</p>
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
