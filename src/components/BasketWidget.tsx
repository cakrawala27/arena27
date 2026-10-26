'use client';
import { useRef } from 'react';
import Link from 'next/link';

export default function BasketWidget({ articles }: { articles: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Duplikat artikel biar bisa infinite scroll
  const displayArticles = [...articles, ...articles, ...articles];

  return (
    <section className="basket-section">
      <div className="basket-overlay">
        <h2 className="basket-title">🏀 BASKET</h2>
        <div className="basket-slider" ref={scrollRef}>
          {displayArticles.map((item, idx) => (
            <Link key={item.id + '-' + idx} href={'/artikel/' + item.id} className="basket-card">
              <div className="basket-img" style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=60'})` }}>
                <span className="basket-cat">{item.category}</span>
              </div>
              <div className="basket-content">
                <h3>{item.title}</h3>
                <p>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Tombol Lihat Semua - Gaya Coretan */}
        <div className="basket-see-all">
          <a href="/basket">
            Lihat Semua
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#ff6b00" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
