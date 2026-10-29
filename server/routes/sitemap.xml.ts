import { queryCollection } from '@nuxt/content/server'

/**
 * 静态生成的 sitemap。文档站是纯静态产物，这里在预渲染阶段直接查内容库生成，
 * 避免额外引入模块。/apis/* 是桌面端登录的中间页，不参与索引。
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl || 'https://scnexus.net').replace(/\/+$/, '')

  const [docs, pages] = await Promise.all([
    queryCollection(event, 'docs').all(),
    queryCollection(event, 'pages').all(),
  ])

  const paths = new Set<string>(['/', '/guide', '/patchnotes', '/sponsor', '/privacy-policy', '/terms'])
  for (const item of [...docs, ...pages]) {
    if (!item.path || item.path.startsWith('/apis')) continue
    paths.add(item.path)
  }

  const urls = [...paths]
    .filter(path => !path.startsWith('/apis'))
    .sort()
    .map(path => `  <url><loc>${base}${path === '/' ? '' : path}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
