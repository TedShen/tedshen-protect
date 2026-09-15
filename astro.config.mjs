// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { DISCLOSURE } from './src/consts';

// 上線防呆：揭露資料還是佔位符就不准 build。
// 本機想先看畫面：PROTECT_ALLOW_PLACEHOLDER=1 npm run build
const placeholders = Object.entries(DISCLOSURE).filter(([, v]) => typeof v === 'string' && v.includes('待補'));
if (placeholders.length > 0 && !process.env.PROTECT_ALLOW_PLACEHOLDER) {
  throw new Error(
    `揭露資料尚未填寫：${placeholders.map(([k]) => k).join(', ')}。填好 src/consts.ts 的 DISCLOSURE 再 build。` +
      `（本機預覽可設 PROTECT_ALLOW_PLACEHOLDER=1）`,
  );
}

// https://astro.build/config
export default defineConfig({
  site: 'https://protect.tedshen.link',
  integrations: [sitemap()],
  // GitHub Pages 實際服務的是 /path/，統一尾斜線讓 canonical、sitemap、站內連結一致
  trailingSlash: 'always',
});
