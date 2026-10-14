import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';
  const SITE_URL = 'https://arena27-psi.vercel.app';

  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/articles?select=id,created_at&status=eq.published&order=created_at.desc',
      { 
        headers: { 
          apikey: SUPABASE_KEY, 
          Authorization: 'Bearer ' + SUPABASE_KEY 
        },
        cache: 'no-store'
      }
    );
    const articles = await res.json();

    const articleUrls = (articles || []).map((article: any) => ({
      url: SITE_URL + '/artikel/' + article.id,
      lastModified: new Date(article.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      ...articleUrls,
    ];
  } catch (e) {
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
