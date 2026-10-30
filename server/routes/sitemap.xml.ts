import { queryCollection } from '@nuxt/content/server'

/**
 * 静态生成的 sitemap。文档站是纯静态产物，这里在预渲染阶段直接查内容库生成，
 * 避免额外引入模块。/apis/* 是桌面端登录的中间页，不参与索引。
 *
 * 两种语言各出自己那份：英文只收录**英文真实存在**的页面（首页与栏目标题页本身双语，
 * 仍保留；正文页没有译文就不进 sitemap，避免把中文正文挂在 /en 下）。
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl || 'https://scnexus.net').replace(/\/+$/, '')

  const [docsZh, pagesZh, docsEn, pagesEn] = await Promise.all([
    queryCollection(event, 'docs_zh').all(),
    queryCollection(event, 'pages_zh').all(),
    queryCollection(event, 'docs_en').all(),
    queryCollection(event, 'pages_en').all(),
  ])

  /** 两种语言都存在的页面：首页与栏目 */
  const SHELL = ['/', '/guide', '/patchnotes', '/sponsor', '/privacy-policy', '/terms']

  const collect = (docs: typeof docsZh, pages: typeof pagesZh) => {
    const paths = new Set<string>(SHELL)
    for (const item of [...docs, ...pages]) {
      if (!item.path || item.path.startsWith('/apis')) continue
      paths.add(item.path)
    }
    return paths
  }

  const zh = collect(docsZh, pagesZh)
  const en = new Set([...SHELL, ...collect(docsEn, pagesEn)])

  const href = (path: string) => `${base}${path === '/' ? '' : path}`
  const enHref = (path: string) => `${base}${path === '/' ? '/en' : `/en${path}`}`

  const entries: string[] = []
  for (const path of [...zh].sort()) {
    const alternates = [`    <xhtml:link rel="alternate" hreflang="zh-CN" href="${href(path)}"/>`]
    if (en.has(path)) {
      alternates.push(`    <xhtml:link rel="alternate" hreflang="en" href="${enHref(path)}"/>`)
      alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${href(path)}"/>`)
    }
    entries.push(`  <url>\n    <loc>${href(path)}</loc>\n${alternates.join('\n')}\n  </url>`)
  }

  for (const path of [...en].sort()) {
    if (zh.has(path)) continue
    entries.push(`  <url>\n    <loc>${enHref(path)}</loc>\n  </url>`)
  }

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
})
