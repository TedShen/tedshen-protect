// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DISCLOSURE } from './src/consts';
import { readdirSync, readFileSync } from 'node:fs';

// sitemap 的 lastmod：文章取 frontmatter 的 updatedDate，沒有就取 pubDate；首頁與文章列表取全站最新一篇。
// 只用真實的更新日期，不用建置時間（建置時間每次都變，搜尋引擎會不再信任 lastmod）。
const postDates = {};
for (const f of readdirSync('./src/content/posts').filter((n) => n.endsWith('.md'))) {
  const fm = readFileSync(`./src/content/posts/${f}`, 'utf8').split('---')[1] || '';
  const pick = (k) => (fm.match(new RegExp(`^${k}:\\s*['"]?([0-9-]+)`, 'm')) || [])[1];
  const d = pick('updatedDate') || pick('pubDate');
  if (d && !/^draft:\s*true/m.test(fm)) postDates[f.replace(/\.md$/, '')] = d;
}
const latest = Object.values(postDates).sort().pop();

// 審閱模式（PROTECT_PREVIEW=1）：給公司的人看用。全站 noindex、robots 全擋、不產 sitemap、頂端有橫幅、允許佔位符。
// 正式上線：把 .github/workflows/deploy.yml 裡的 PROTECT_PREVIEW 拿掉。
const PREVIEW = process.env.PROTECT_PREVIEW === '1';

// 上線防呆：揭露資料還是佔位符就不准 build。
// 本機想先看畫面：PROTECT_ALLOW_PLACEHOLDER=1 npm run build
const placeholders = Object.entries(DISCLOSURE).filter(([, v]) => typeof v === 'string' && v.includes('待補'));
if (placeholders.length > 0 && !process.env.PROTECT_ALLOW_PLACEHOLDER && !PREVIEW) {
  throw new Error(
    `揭露資料尚未填寫：${placeholders.map(([k]) => k).join(', ')}。填好 src/consts.ts 的 DISCLOSURE 再 build。` +
      `（本機預覽可設 PROTECT_ALLOW_PLACEHOLDER=1）`,
  );
}

// https://astro.build/config
export default defineConfig({
  site: 'https://protect.tedshen.link',
  integrations: PREVIEW
    ? []
    : [
        sitemap({
          serialize(item) {
            const m = item.url.match(/\/posts\/([^/]+)\/$/);
            const d = m ? postDates[m[1]] : /\/(posts\/)?$/.test(new URL(item.url).pathname) ? latest : undefined;
            if (d) item.lastmod = new Date(d).toISOString();
            return item;
          },
        }),
      ],
  // GitHub Pages 實際服務的是 /path/，統一尾斜線讓 canonical、sitemap、站內連結一致
  trailingSlash: 'always',
});
