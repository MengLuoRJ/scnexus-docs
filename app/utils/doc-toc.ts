/**
 * 正文目录（右侧「本页目录」）。
 *
 * 不能直接用解析器给的 `body.toc`：它把标题节点里的**所有**文本都算进目录，
 * 于是 `## Crowdin 翻译平台 :badge[实验中]` 在目录里会变成「Crowdin 翻译平台 实验中」，
 * 标题 id 也会带着这段装饰文字。目录要的是标题本身，这里自己走一遍正文 AST，
 * 遇到 badge 这类纯装饰组件就跳过，其余节点照常取文本。
 *
 * 正文是 minimark 压缩格式：元素节点形如 `[tag, props, ...children]`，
 * props 缺省时直接是子节点，纯文本节点就是一个字符串。
 */

export interface DocTocLink {
  id: string
  text: string
  depth: number
}

const HEADING_DEPTH: Record<string, number> = { h2: 2, h3: 3, h4: 4, h5: 5 }

/** 只影响观感、不承载信息的组件，不应进入目录文字 */
const DECORATION_TAGS = new Set(['badge', 'u-badge'])

function isProps(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function tagOf(node: unknown[]): string {
  const tag = node[0]
  return typeof tag === 'string' ? tag.toLowerCase() : ''
}

function nodeText(node: unknown): string {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  if (DECORATION_TAGS.has(tagOf(node))) return ''
  let text = ''
  for (const child of node.slice(1)) {
    if (isProps(child)) continue
    text += nodeText(child)
  }
  return text
}

function nodeProps(node: unknown[]): Record<string, unknown> {
  return isProps(node[1]) ? node[1] : {}
}

export function readDocToc(body: unknown): DocTocLink[] {
  const root = body as { value?: unknown[], children?: unknown[], toc?: { links?: DocTocLink[] } } | null | undefined
  const nodes = Array.isArray(root?.value)
    ? root.value
    : Array.isArray(root?.children) ? root.children : []

  const links: DocTocLink[] = []
  for (const node of nodes) {
    if (!Array.isArray(node)) continue
    const depth = HEADING_DEPTH[tagOf(node)]
    if (!depth) continue

    const id = nodeProps(node).id
    const text = nodeText(node).replace(/\s+/g, ' ').trim()
    if (typeof id !== 'string' || !id || !text) continue
    links.push({ id, text, depth })
  }

  /** 解析器的 AST 形状变了就退回它自己生成的目录，宁可文字多一段也别整块消失 */
  if (!links.length && Array.isArray(root?.toc?.links)) return root.toc.links
  return links
}
