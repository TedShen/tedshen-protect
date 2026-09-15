import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 給客戶看的保險文章。
// 和 grow Notes 的差別：這裡是以登錄業務員身分寫的，可以談險種、可以談怎麼規劃，
// 但每篇都會自動帶法定揭露頁尾，並且可以放「延伸閱讀」連回 grow Notes。
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** 對應的 grow Notes 筆記網址，有的話文章底部會放「延伸閱讀」 */
    relatedNote: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
