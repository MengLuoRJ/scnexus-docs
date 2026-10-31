/**
 * 文档站的三个大板块。
 *
 * 板块与内容目录一一对应（`content/<locale>/<dir>`，见 content.config.ts），
 * 侧栏、面包屑、上一页/下一页都只在当前板块内工作：
 * 三个板块的文档放在同一条列表里会让侧栏混成一锅。
 *
 * 文案统一走 i18n 的 `docs-basic.sections.<id>`，这里只保留结构与图标。
 */
export const DOC_SECTIONS = [
  { id: 'app', path: '/guide', icon: 'i-lucide-rocket' },
  { id: 'editor', path: '/editor', icon: 'i-lucide-pen-tool' },
  { id: 'reference', path: '/reference', icon: 'i-lucide-book-marked' },
] as const

export type DocSection = typeof DOC_SECTIONS[number]
export type DocSectionId = DocSection['id']

/**
 * 按路径前缀判断所属板块。
 * 不在任何板块下（首页、更新日志、赞助等）时回落到第一个：
 * 这些页面不出侧栏，返回值只用于取一个合法的默认值。
 */
export function docSectionOf(path: string): DocSection {
  return DOC_SECTIONS.find(section => path === section.path || path.startsWith(`${section.path}/`))
    ?? DOC_SECTIONS[0]
}
