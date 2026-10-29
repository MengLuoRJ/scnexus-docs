import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * 栏目文档：出现在文档侧栏里，按 group + order 排序。
 * 字段与 scnexus-web 的 docs 集合完全一致，方便官网直接复用同一批 md。
 */
const docSchema = z.object({
  title: z.string(),
  description: z.string().default(''),
  order: z.number().default(99),
  group: z.enum(['start', 'usage', 'reference']).default('usage'),
  updated: z.string().default(''),
})

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: [{ include: 'guide/**/*.md' }, { include: 'reference/**/*.md' }],
      schema: docSchema,
    }),

    /** 独立页面：更新日志、法务条款、赞助等，不进侧栏 */
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: docSchema,
    }),
  },
})
