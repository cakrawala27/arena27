'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDB() {
  const [status, setStatus] = useState('Siap test!');

  const testKirim = async () => {
    setStatus('⏳ Lagi ngirim ke server...');
    const { data, error } = await supabase
      .from('articles')
      .insert([{ title: 'TEST DARI LAPTOP BRO', category: 'Test', content: 'Kalau tulisan ini muncul di Supabase, berarti KONEKSI 100% SUKSES!', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596081?w=800' }])
      .select();

    if (error) {
      setStatus('❌ GAGAL: ' + error.message);
    } else {
      setStatus('✅ SUKSES BESAR! Cek dashboard Supabase lo sekarang!');
    }
  };

  return (
    <div className="p-10 text-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-black mb-6 text-slate-900">🧪 Test Koneksi Supabase</h1>
      <button onClick={testKirim} className="bg-orange-500 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:bg-orange-600 transition active:scale-95">
        🚀 KIRIM DATA KE CLOUD
      </button>
      <p className="mt-6 text-lg font-bold text-slate-700">{status}</p>
    </div>
  );
}
