<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const { t, locale, defaultLocale } = useI18n()
const availableLocales = useAvailableLocales()

const siteBase = computed(() => String(config.public.siteUrl || '').replace(/\/+$/, ''))

/** 去掉语言前缀后的站内路径：canonical 用带前缀的，hreflang 用去前缀的 */
const barePath = computed(() => stripLocalePath(route.path, locale.value, defaultLocale))

const canonical = computed(() => {
  const path = route.path === '/' ? '' : route.path.replace(/\/+$/, '')
  return `${siteBase.value}${path}`
})

/** hreflang 只指向真实存在的版本，内容页会用 declarePageLocales 收窄 */
const alternates = computed(() => availableLocales.value.map(code => ({
  rel: 'alternate' as const,
  type: 'text/html',
  hreflang: code,
  href: `${siteBase.value}${withLocalePath(barePath.value, code, 'zh-CN')}`,
})))

const xDefault = computed(() => ({
  rel: 'alternate' as const,
  type: 'text/html',
  hreflang: 'x-default',
  href: `${siteBase.value}${withLocalePath(barePath.value, 'zh-CN', 'zh-CN')}`,
}))

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'canonical' as const, href: canonical.value },
    ...alternates.value,
    xDefault.value,
  ],
}))

useSeoMeta({
  titleTemplate: (title) => {
    const name = t('docs-basic.name')
    if (!title) return t('docs-basic.seo.titleSuffix')
    return title.includes(name) ? title : `${title} · ${name}`
  },
  description: () => t('docs-basic.seo.description'),
  ogType: 'website',
  ogSiteName: 'SCNexus',
  ogUrl: () => canonical.value,
  twitterCard: 'summary',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#007fff" :height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
