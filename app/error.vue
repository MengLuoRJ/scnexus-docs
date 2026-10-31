<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

/**
 * 错误页不经过正常页面树，i18n 插件在这里不可靠（Nuxt 会用一个独立实例渲染它），
 * 所以语言直接从 URL 前缀判断，文案用本地表——宁可写死两份，也不要在这里赌 composable 可用。
 */
const url = useRequestURL()
const isEnglish = computed(() => url.pathname === '/en' || url.pathname.startsWith('/en/'))
const homePath = computed(() => (isEnglish.value ? '/en' : '/'))
const guidePath = computed(() => (isEnglish.value ? '/en/guide' : '/guide'))

const copy = computed(() => (isEnglish.value
  ? {
      notFoundTitle: 'Page not found',
      genericTitle: 'Failed to load',
      notFoundDesc: 'The link may be out of date, or the page has not been published yet. Go back home, or start from the quick start guide.',
      genericDesc: 'The service is temporarily unavailable. Please try again later.',
      home: 'Back home',
      start: 'Quick start',
    }
  : {
      notFoundTitle: '页面不存在',
      genericTitle: '页面加载失败',
      notFoundDesc: '链接可能已失效，或对应的文档还未发布。可以回到首页或从快速开始重新查找。',
      genericDesc: '服务暂时不可用，请稍后重试。',
      home: '返回首页',
      start: '快速开始',
    }))

useSeoMeta({
  title: () => (isNotFound.value ? copy.value.notFoundTitle : copy.value.genericTitle),
  robots: 'noindex',
})

function goHome() {
  clearError({ redirect: homePath.value })
}
</script>

<template>
  <UApp>
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div class="pointer-events-none absolute inset-0 bg-grid text-slate-900/40 mask-fade-b dark:text-white/20" />
      <div class="pointer-events-none absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div class="relative">
        <img src="/logo-128.png" alt="" width="128" height="128" class="mx-auto size-14 opacity-90">
        <p class="mt-8 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">
          {{ error?.statusCode ?? 500 }}
        </p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {{ isNotFound ? copy.notFoundTitle : copy.genericTitle }}
        </h1>
        <p class="mx-auto mt-4 max-w-md text-base text-slate-500 dark:text-slate-400">
          {{ isNotFound ? copy.notFoundDesc : copy.genericDesc }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <UButton icon="i-lucide-house" :label="copy.home" @click="goHome" />
          <UButton
            :to="guidePath"
            color="neutral"
            variant="outline"
            icon="i-lucide-book-open"
            :label="copy.start"
          />
        </div>
      </div>
    </div>
  </UApp>
</template>
