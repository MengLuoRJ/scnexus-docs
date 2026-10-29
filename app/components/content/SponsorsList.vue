<script setup lang="ts">
/**
 * 赞助名单来自 sponsorkit（app/assets/sponsorkit/sponsors.json），
 * 构建前由 scripts/build-sponsors.mjs 精简为只含姓名/头像/链接的 files，
 * 避免把 800KB 的头像二进制数据打进页面。
 */
import sponsorsData from '~/assets/sponsors.json'

const sponsors = sponsorsData as { name: string, avatar?: string, link?: string }[]
</script>

<template>
  <div class="not-prose my-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
    <component
      :is="sponsor.link ? 'a' : 'div'"
      v-for="sponsor in sponsors"
      :key="`${sponsor.name}-${sponsor.link ?? ''}`"
      :href="sponsor.link || undefined"
      :target="sponsor.link ? '_blank' : undefined"
      :rel="sponsor.link ? 'noopener' : undefined"
      class="flex min-w-0 items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
    >
      <img
        v-if="sponsor.avatar"
        :src="sponsor.avatar"
        alt=""
        loading="lazy"
        class="size-6 shrink-0 rounded-md bg-slate-100 object-cover dark:bg-slate-800"
      >
      <UIcon v-else name="i-lucide-user" class="size-6 shrink-0 text-slate-400" />
      <span class="truncate">{{ sponsor.name }}</span>
    </component>
  </div>
</template>
