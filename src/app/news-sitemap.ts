import { MetadataRoute } from 'next';

const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';
const SITE_URL = 'https://arena27.my.id';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function newsSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/articles?status=eq.published&select=id,title,created_at&order=created_at.desc&limit=50',
      {
        headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY },
        cache: 'no-store',
      }
    );
    const articles = await res.json();
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    return (articles || [])
      .filter((a: any) => new Date(a.created_at) > twoDaysAgo)
      .map((a: any) => ({
        url: SITE_URL + '/artikel/' + a.id,
        lastModified: new Date(a.created_at),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));
  } catch (e) {
    return [];
  }
}
