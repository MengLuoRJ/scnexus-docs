/**
 * 内容语言策略：与 scnexus-web 同一套约定，逻辑只写在一处，页面不各自实现。
 *
 * 文档站只有 `docs` 与 `pages` 两类内容，都走 `chain`：
 * 读者宁愿看到另一种语言的原文，也不愿页面不存在。
 */
export const CONTENT_LOCALES = ['zh-CN', 'en'] as const

export type ContentLocale = typeof CONTENT_LOCALES[number]

const COLLECTIONS = {
  docs: { 'zh-CN': 'docs_zh', en: 'docs_en' },
  pages: { 'zh-CN': 'pages_zh', en: 'pages_en' },
} as const

export type ContentCollection = keyof typeof COLLECTIONS

/** 把 i18n 的 locale 字符串收敛成内容语言，未知值按默认语言处理 */
export function asContentLocale(locale: string): ContentLocale {
  return (CONTENT_LOCALES as readonly string[]).includes(locale)
    ? locale as ContentLocale
    : CONTENT_LOCALES[0]
}

export function contentCollection(collection: ContentCollection, locale: ContentLocale) {
  return COLLECTIONS[collection][locale]
}

/**
 * 类型锚点：两种语言的集合 schema 相同，统一用默认语言集合名取类型，
 * 运行时查的仍是 locale 对应的集合。直接传联合类型会让查询链退化成全集合联合。
 */
const TYPE_ANCHOR = { docs: 'docs_zh', pages: 'pages_zh' } as const

export function queryLocalizedContent<K extends ContentCollection>(collection: K, locale: ContentLocale) {
  return queryCollection(contentCollection(collection, locale) as (typeof TYPE_ANCHOR)[K])
}

/** 回退链：先自己，再另一种语言 */
export function localeChain(requested: ContentLocale): ContentLocale[] {
  return [requested, ...CONTENT_LOCALES.filter(locale => locale !== requested)]
}

/** 去掉 URL 上的语言前缀，得到与语言无关的站内路径 */
export function stripLocalePath(path: string, locale: string, defaultLocale = 'zh-CN') {
  if (locale === defaultLocale) return path || '/'
  const prefix = `/${locale}`
  if (path === prefix) return '/'
  return path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path
}

/** 给与语言无关的路径加上语言前缀，默认语言不加 */
export function withLocalePath(path: string, locale: string, defaultLocale = 'zh-CN') {
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
