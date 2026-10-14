'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoLink() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Reset counter jika belum 5 dalam waktu 1 detik
    if (newCount < 5) {
      setTimeout(() => setTapCount(0), 1000);
    }

    // Jika 5 tap, redirect ke admin
    if (newCount === 5) {
      alert('🔓 Admin Mode Activated!');
      router.push('/admin');
      setTapCount(0);
    }
  };

  return (
    <div 
      onClick={handleTap} 
      className="cursor-pointer select-none active:scale-95 transition-transform duration-100 flex items-center"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500 drop-shadow-lg tracking-tight hover:text-orange-400 transition-colors">
        ARENA<span className="text-white">27</span>
      </h1>
      
      {/* Opsional: Hapus bagian ini kalau mau benar-benar rahasia */}
      {tapCount > 0 && tapCount < 5 && (
        <span className="absolute -bottom-4 left-0 text-[10px] text-slate-500 opacity-50 animate-pulse">
          {5 - tapCount} taps...
        </span>
      )}
    </div>
  );
}
