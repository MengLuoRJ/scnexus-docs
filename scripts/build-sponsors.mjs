#!/usr/bin/env node
/**
 * 把 sponsorkit 生成的原始名单（含头像二进制，接近 800KB）精简成
 * 只包含姓名、头像地址与主页链接的 JSON，供赞助页静态引用。
 *
 * 用法：node scripts/build-sponsors.mjs
 */
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'app', 'assets', 'sponsorkit', 'sponsors.json')
const OUTPUT = path.join(ROOT, 'app', 'assets', 'sponsors.json')

if (!existsSync(SOURCE)) {
  console.warn('[sponsors] 未找到 sponsorkit 输出，跳过；现有赞助名单保持不变')
  process.exit(0)
}

const raw = JSON.parse(await readFile(SOURCE, 'utf8'))
const list = raw.map((entry) => {
  const name = entry.raw?.user?.name ?? entry.sponsor?.name ?? ''
  const rawAvatar = entry.raw?.user?.avatar ?? ''
  // 部分来源的头像是 base64 内联数据，会显著增大页面体积，改用站点自带的占位头像
  const candidate = rawAvatar || entry.sponsor?.avatarUrl || ''
  const avatar = candidate.startsWith('data:') ? '/default-avatar.png' : candidate
  const link = entry.raw?.user?.link_url ?? entry.sponsor?.linkUrl ?? ''
  return { name, avatar, link }
})
  .filter(item => item.name)
  .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))

await writeFile(OUTPUT, `${JSON.stringify(list, null, 2)}\n`, 'utf8')
console.log(`[sponsors] 已生成 ${list.length} 位赞助者 → app/assets/sponsors.json`)
