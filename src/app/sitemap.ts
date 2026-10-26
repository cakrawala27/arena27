import { MetadataRoute } from 'next';

const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';
const SITE_URL = 'https://arena27.my.id';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: SITE_URL + '/artikel', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: SITE_URL + '/liga-champions', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: SITE_URL + '/premier-league', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: SITE_URL + '/serie-a', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: SITE_URL + '/indonesia-football', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: SITE_URL + '/motogp', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  // Dynamic pages (articles from Supabase)
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/articles?status=eq.published&select=id,created_at&order=created_at.desc',
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
        cache: 'no-store',
      }
    );
    const articles = await res.json();
    const articlePages: MetadataRoute.Sitemap = (articles || []).map((a: any) => ({
      url: SITE_URL + '/artikel/' + a.id,
      lastModified: new Date(a.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...articlePages];
  } catch (e) {
    return staticPages;
  }
}
