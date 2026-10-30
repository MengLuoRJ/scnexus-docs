<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = useAvailableLocales()

/**
 * 只列出当前页面真实存在的语言版本：文档缺译文时，强给一个「English」
 * 只会让读者点进另一个语言的正文。
 */
const items = computed(() => [
  (locales.value as { code: string, name: string }[])
    .filter(item => availableLocales.value.includes(item.code as 'zh-CN' | 'en'))
    .map(item => ({
      label: item.name,
      checked: item.code === locale.value,
      onSelect: async () => {
        if (item.code === locale.value) return
        const path = switchLocalePath(item.code as 'zh-CN' | 'en')
        await setLocale(item.code as 'zh-CN' | 'en')
        if (path) await navigateTo(path)
      },
    })),
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-languages"
      :aria-label="t('docs-basic.header.language')"
      class="gap-1.5"
      square
    />
  </UDropdownMenu>
</template>
