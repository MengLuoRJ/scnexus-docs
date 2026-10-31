<script setup lang="ts">
import { DOC_SECTIONS } from '~/utils/doc-sections'

const { t, locale, defaultLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const navOpen = ref(false)

/** 顶栏只放文档的三个大板块：更新日志与赞助支持由主站承担，文档站不再重复入口 */
const items = computed(() => DOC_SECTIONS.map(section => ({
  label: t(`docs-basic.sections.${section.id}.nav`),
  to: section.path,
})))

function isActive(to: string) {
  // 英文站在 /en/... 下，激活态按去掉语言前缀后的路径判断
  const path = stripLocalePath(route.path, locale.value, defaultLocale)
  return path === to || path.startsWith(`${to}/`)
}

watch(() => route.fullPath, () => {
  navOpen.value = false
})
</script>

<template>
  <header class="glass-header sticky top-0 z-40">
    <UContainer class="flex h-16 items-center justify-between gap-6">
      <div class="flex items-center gap-8">
        <AppLogo />
        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="localePath(item.to)"
            class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
            :class="isActive(item.to)
              ? 'text-brand-700 dark:text-brand-300'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-1">
        <LocaleSwitcher />
        <UButton
          to="https://github.com/MengLuoRJ/scnexus"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          :aria-label="t('docs-basic.header.github')"
          square
        />
        <UColorModeButton color="neutral" variant="ghost" />
        <UButton
          class="md:hidden"
          color="neutral"
          variant="ghost"
          :icon="navOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          :aria-label="t('docs-basic.header.menu')"
          square
          @click="navOpen = !navOpen"
        />
      </div>
    </UContainer>

    <div v-if="navOpen" class="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
      <UContainer class="flex flex-col py-2">
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="localePath(item.to)"
          class="rounded-lg px-2 py-2 text-sm font-medium"
          :class="isActive(item.to) ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'"
        >
          {{ item.label }}
        </NuxtLink>
      </UContainer>
    </div>
  </header>
</template>
