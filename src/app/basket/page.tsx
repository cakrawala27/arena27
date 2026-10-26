'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=60';

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

export default function BasketPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .ilike('category', '%Basket%')
        .order('created_at', { ascending: false })
        .range(0, 99);
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '1px', margin: 0 }}>
            <span style={{ color: '#fbc02d' }}>BASKET</span>
          </h1>
          <Link href="/" style={{ color: '#ff6b00', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>Kembali ke Beranda</Link>
        </div>
        <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 24 }}>{articles.length} artikel Basket</p>

        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: 40 }}>Memuat artikel...</p>
        ) : articles.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: 40 }}>Belum ada artikel Basket.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {articles.map(function (item) {
              return (
                <Link key={item.id} href={'/artikel/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', gap: 14, background: '#161616', border: '1px solid #262626', borderLeft: '4px solid #ff6b00', borderRadius: 12, padding: 14, alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{item.title}</div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, color: '#9ca3af' }}>{formatDate(item.created_at)}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', background: '#ff6b00', color: '#ffffff', padding: '4px 10px', borderRadius: 6 }}>{item.category}</span>
                      </div>
                    </div>
                    <img src={item.image || FALLBACK_IMG} alt={item.title} style={{ width: 84, height: 64, objectFit: 'cover', borderRadius: 8 }} onError={function (e) { e.currentTarget.src = FALLBACK_IMG; }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
