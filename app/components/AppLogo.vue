<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' })
</script>

<template>
  <NuxtLink :to="localePath('/')" class="group flex shrink-0 items-center gap-2.5" :aria-label="t('docs-basic.name')">
    <img
      src="/logo.svg"
      alt=""
      class="transition duration-300 group-hover:scale-105"
      :class="size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'"
    >
    <span class="flex flex-col leading-none">
      <span
        class="font-semibold tracking-tight text-slate-900 dark:text-white"
        :class="size === 'sm' ? 'text-sm' : 'text-[15px]'"
      >{{ t('docs-basic.name') }}</span>
      <span class="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{{ t('docs-basic.docsLabel') }}</span>
    </span>
  </NuxtLink>
</template>
