'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArticleForm from '../../form';
import { supabase } from '@/lib/supabase';

export default function EditArticlePage() {
  const params: any = useParams();
  const id = params ? String(params.id) : '';
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase.from('articles').select('*').eq('id', id).single();
      if (data) {
        // Pisahkan "Sepakbola - Liga Champions" jadi category & subcategory
        const parts = (data.category || '').split(' - ');
        const main = parts[0] || 'Sepakbola';
        const sub = parts[1] || '';
        setArticle({ ...data, category: main, subcategory: sub });
      }
      setLoading(false);
    };
    if (id) fetchArticle();
  }, [id]);

  if (loading) return <p className="p-10 text-center text-slate-500">Memuat artikel...</p>;
  if (!article) return <p className="p-10 text-center text-red-500">Artikel tidak ditemukan.</p>;

  return <ArticleForm initialData={article} />;
}
