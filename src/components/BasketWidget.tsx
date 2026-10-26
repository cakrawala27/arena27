'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BasketWidget({ articles }: { articles: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Duplikat artikel biar bisa infinite scroll
  const displayArticles = [...articles, ...articles, ...articles];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Kalau udah mentok kanan, balik ke kiri (loop)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Geser ke kanan sebesar lebar 1 card
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000); // Geser tiap 3 detik

    return () => clearInterval(interval);
  }, []);

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
      </div>
    </section>
  );
}
