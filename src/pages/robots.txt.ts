import type { APIRoute } from 'astro';

// 審閱模式全擋；正式上線允許全部並指向 sitemap。
const PREVIEW = process.env.PROTECT_PREVIEW === '1';

export const GET: APIRoute = () => {
  const body = PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://protect.tedshen.link/sitemap-index.xml\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
