<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const canonical = computed(() => {
  const base = String(config.public.siteUrl || '').replace(/\/+$/, '')
  const path = route.path === '/' ? '' : route.path.replace(/\/+$/, '')
  return `${base}${path}`
})

useHead(() => ({
  htmlAttrs: { lang: 'zh-CN' },
  link: [{ rel: 'canonical', href: canonical.value }],
}))

useSeoMeta({
  titleTemplate: (title) => {
    if (!title) return '星际枢纽 · 应用文档'
    return title.includes('星际枢纽') ? title : `${title} · 星际枢纽`
  },
  description: '星际枢纽（SCNexus）应用文档：快速开始、参考文档、更新日志与赞助支持。',
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
