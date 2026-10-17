'use client';
import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CARD_COLORS = [
  { bg: '#000000', text: '#ffffff', name: 'hitam' },
  { bg: '#ffffff', text: '#0a0a0a', name: 'putih' },
  { bg: '#df2531', text: '#ffffff', name: 'merah' },
  { bg: 'rgba(223, 37, 49, 0.65)', text: '#ffffff', name: 'merah65' },
  { bg: 'rgba(223, 37, 49, 0.45)', text: '#ffffff', name: 'merah45' },
];

export default function SwipeCard({ cards }: { cards: any[] }) {
  const [stack, setStack] = useState(cards.slice(0, 5));

  // Kalau kurang dari 5, loop dari awal
  const displayCards = stack.length < 5 ? [...stack, ...cards.slice(0, 5 - stack.length)] : stack;

  const handleSwipe = () => {
    // Selalu buang kartu paling depan (index 0)
    const swiped = stack[0];
    const newStack = stack.slice(1);
    newStack.push(swiped);
    setStack([...newStack]);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="swipe-empty">
        <p>Belum ada artikel Liga 1 & Liga 2</p>
      </div>
    );
  }

  return (
    <div className="swipe-stack">
      <AnimatePresence initial={false}>
        {displayCards.map((item, index) => {
          // Reverse index: 0 = paling depan (hitam), 4 = paling belakang
          const reverseIndex = index;
          const color = CARD_COLORS[reverseIndex] || CARD_COLORS[0];
          const isTop = index === 0;

          return (
            <SwipeCardItem
              key={item.id + '-' + index}
              item={item}
              color={color}
              index={index}
              total={displayCards.length}
              isTop={isTop}
              onSwipe={handleSwipe}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function SwipeCardItem({ item, color, index, total, isTop, onSwipe }: any) {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-300, 0, 300], [-8, 0, 8]);
  const opacity = useTransform(y, [-300, -100, 0], [0, 0.8, 1]);

  const stackOffset = index * 25;
  const stackScale = 1 - index * 0.06;
  const isFrontCard = index === 0;

  const displayTitle = item.meta_title || item.title || 'Tanpa Judul';
  const displayImage = item.image || 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80';

  return (
    <motion.div
      className="swipe-card"
      style={{
        boxShadow: isFrontCard ? '0 20px 40px rgba(0, 0, 0, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        translateY: -stackOffset,
        scale: stackScale,
        zIndex: total - index,
        backgroundColor: color.bg,
        color: color.text,
      }}
      drag={isTop ? 'y' : false}

      dragElastic={0.7}
      onDragEnd={(e, info) => {
        if (info.offset.y < -120) {
          onSwipe();
        }
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="swipe-card-title" style={{ color: color.text }}>
        {displayTitle.length > 80 ? displayTitle.substring(0, displayTitle.lastIndexOf(' ', 77)) + '...' : displayTitle}
      </div>
      <div className="swipe-card-image">
        <img src={displayImage} alt={displayTitle} draggable={false} />
      </div>
      {isTop && (
        <Link href={'/artikel/' + item.id} className="swipe-card-link" style={{ color: color.text }}>
          Baca &#8594;
        </Link>
      )}
    </motion.div>
  );
}
