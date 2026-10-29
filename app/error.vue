<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

useSeoMeta({
  title: () => (isNotFound.value ? '页面不存在' : '页面加载失败'),
  robots: 'noindex',
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UApp>
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div class="pointer-events-none absolute inset-0 bg-grid text-slate-900/40 mask-fade-b dark:text-white/20" />
      <div class="pointer-events-none absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div class="relative">
        <img src="/logo.svg" alt="" class="mx-auto size-14 opacity-90">
        <p class="mt-8 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">
          {{ error?.statusCode ?? 500 }}
        </p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {{ isNotFound ? '页面不存在' : '页面加载失败' }}
        </h1>
        <p class="mx-auto mt-4 max-w-md text-base text-slate-500 dark:text-slate-400">
          {{ isNotFound ? '链接可能已失效，或对应的文档还未发布。可以回到首页或从快速开始重新查找。' : '服务暂时不可用，请稍后重试。' }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <UButton icon="i-lucide-house" label="返回首页" @click="goHome" />
          <UButton
            to="/guide"
            color="neutral"
            variant="outline"
            icon="i-lucide-book-open"
            label="快速开始"
          />
        </div>
      </div>
    </div>
  </UApp>
</template>
