import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * 内容语言 = 目录语言：`content/<语言>/<slug>.md`。
 * 与 scnexus-web 同一套约定：一种语言一个集合，查询时不可能忘记过滤语言；
 * 同一 slug 的两个文件即同一篇的译文，配对不需要额外字段。
 *
 * `prefix` 显式写成站点路径，所以两种语言里同一篇的 `path` 完全相同，
 * URL 差异只在语言前缀上，由页面用 `localePath()` 补。
 */
const LOCALES = ['zh-CN', 'en'] as const

const docSchema = z.object({
  title: z.string(),
  description: z.string().default(''),
  order: z.number().default(99),
  group: z.enum(['start', 'usage', 'contribute', 'reference']).default('usage'),
  updated: z.string().default(''),
})

/**
 * 一个语言一个集合。`includes` 拆成多条 source 而不是写花括号通配：
 * 各 glob 库对 brace expansion 的支持不一致，拆开是确定的。
 */
/**
 * `prefix` 必须显式给：Content 默认把 include 的静态部分整段当路径前缀，
 * `zh-CN/guide/**` 会推出 `/guide`，于是 `guide/index.md` 变成 `/guide/index`、
 * 目录层级也会被吞掉。显式写回站点路径，两种语言里同一篇的 path 才完全一致。
 */
function collection(name: string, locale: string, sources: { include: string, prefix: string }[]) {
  return [
    `${name}_${locale.split('-')[0]}`,
    defineCollection({
      type: 'page',
      source: sources.map(source => ({ include: `${locale}/${source.include}`, prefix: source.prefix })),
      schema: docSchema,
    }),
  ] as const
}

/**
 * 栏目文档（进侧栏，按 group + order 排序）与独立页面（更新日志、法务、赞助等）。
 *
 * 文档按三个大板块分目录，目录与站点路径一一对应（见 app/utils/doc-sections.ts）：
 * `guide` = 星际枢纽文档、`editor` = 编辑器文档、`reference` = 参考资料。
 */
const collections = Object.fromEntries(LOCALES.flatMap(locale => [
  collection('docs', locale, [
    { include: 'guide/**/*.md', prefix: '/guide' },
    { include: 'editor/**/*.md', prefix: '/editor' },
    { include: 'reference/**/*.md', prefix: '/reference' },
  ]),
  collection('pages', locale, [{ include: '*.md', prefix: '/' }]),
]))

export default defineContentConfig({ collections })
