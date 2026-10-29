<script setup lang="ts">
const route = useRoute()
const navOpen = ref(false)

const items = [
  { label: '指南', to: '/guide' },
  { label: '参考', to: '/reference' },
  { label: '更新日志', to: '/patchnotes' },
  { label: '赞助支持', to: '/sponsor' },
]

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
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
            :to="item.to"
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
        <UButton
          to="https://github.com/MengLuoRJ/scnexus"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          square
        />
        <UColorModeButton color="neutral" variant="ghost" />
        <UButton
          class="md:hidden"
          color="neutral"
          variant="ghost"
          :icon="navOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          aria-label="菜单"
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
          :to="item.to"
          class="rounded-lg px-2 py-2 text-sm font-medium"
          :class="isActive(item.to) ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'"
        >
          {{ item.label }}
        </NuxtLink>
      </UContainer>
    </div>
  </header>
</template>
