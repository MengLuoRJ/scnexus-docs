import type { ContentLocale } from '~/utils/content-locale'
import { CONTENT_LOCALES } from '~/utils/content-locale'

/**
 * 当前页面真实存在的语言版本，用于生成 hreflang。
 *
 * `null` = 尚未声明，视为"两种语言都有"。内容页会用 `declarePageLocales()` 收窄，
 * 避免把一个不存在的 `/en/...` 当成译文指给搜索引擎。
 */
export function usePageLocales() {
  return useState<ContentLocale[] | null>('page-locales', () => null)
}

export function declarePageLocales(locales: ContentLocale[]) {
  usePageLocales().value = locales
}

export function useAvailableLocales() {
  const declared = usePageLocales()
  return computed<ContentLocale[]>(() => declared.value ?? [...CONTENT_LOCALES])
}
