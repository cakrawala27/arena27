import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://pagsqpfcclokiypgwrwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZ3NxcGZjY2xva2l5cGd3cndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzgzNDUsImV4cCI6MjEwNzQ1NDM0NX0.ZOnL15cYLR43leQPaR143Q8OwAVeWqC99JO8NO7DeTc';
const SITE_URL = 'https://arena27.my.id';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
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

    const urls = (articles || [])
      .filter((a: any) => new Date(a.created_at) > twoDaysAgo)
      .map((a: any) => `
    <url>
      <loc>${SITE_URL}/artikel/${a.id}</loc>
      <lastmod>${new Date(a.created_at).toISOString()}</lastmod>
      <news:news>
        <news:publication>
          <news:name>Arena27</news:name>
          <news:language>id</news:language>
        </news:publication>
        <news:publication_date>${new Date(a.created_at).toISOString()}</news:publication_date>
        <news:title>${(a.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      </news:news>
    </url>`)
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=600, s-maxage=600',
      },
    });
  } catch (e) {
    return new NextResponse('Error generating news sitemap', { status: 500 });
  }
}