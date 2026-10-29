<script setup lang="ts">
const route = useRoute()

const path = computed(() => route.path.replace(/\/+$/, '') || '/')

const { data: doc } = await useAsyncData(`content-${path.value}`, async () => {
  const [docs, pages] = await Promise.all([
    queryCollection('docs').path(path.value).first(),
    queryCollection('pages').path(path.value).first(),
  ])
  return docs ?? pages ?? null
})

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Document not found', fatal: true })
}

const { data: docs } = await useAsyncData('docs-sidebar', () =>
  queryCollection('docs').order('order', 'ASC').all())

const list = computed(() => docs.value ?? [])
const isDoc = computed(() => list.value.some(item => item.path === path.value))

const GROUPS = [
  { key: 'start', label: '开始使用' },
  { key: 'usage', label: '使用指南' },
  { key: 'reference', label: '参考文档' },
] as const

const groups = computed(() => GROUPS
  .map(group => ({ ...group, items: list.value.filter(item => (item.group ?? 'usage') === group.key) }))
  .filter(group => group.items.length > 0))

const index = computed(() => list.value.findIndex(item => item.path === path.value))
const prev = computed(() => (index.value > 0 ? list.value[index.value - 1] : null))
const next = computed(() => (index.value >= 0 && index.value < list.value.length - 1 ? list.value[index.value + 1] : null))

type TocLink = { id: string, text: string, depth: number }
const toc = computed<TocLink[]>(() => {
  const links = (doc.value?.body as { toc?: { links?: TocLink[] } })?.toc?.links
  return Array.isArray(links) ? links : []
})

useSeoMeta({
  title: () => doc.value?.title ?? '',
  description: () => doc.value?.description ?? '',
})
</script>

<template>
  <div v-if="doc">
    <UContainer class="py-8 lg:py-12">
      <div
        class="grid gap-10"
        :class="isDoc
          ? 'lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_190px] xl:gap-14'
          : 'mx-auto max-w-4xl'"
      >
        <aside v-if="isDoc" class="hidden lg:block">
          <div class="sticky top-24">
            <NuxtLink to="/guide" class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <UIcon name="i-lucide-book-open" class="size-4 text-brand-500" />
              应用文档
            </NuxtLink>
            <nav class="mt-6 space-y-5">
              <div v-for="group in groups" :key="group.key">
                <p class="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {{ group.label }}
                </p>
                <ul class="mt-1.5 space-y-0.5">
                  <li v-for="item in group.items" :key="item.path">
                    <NuxtLink
                      :to="item.path"
                      class="block rounded-lg px-2 py-1.5 text-[13px] transition"
                      :class="item.path === path
                        ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'"
                    >
                      {{ item.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <article class="min-w-0">
          <details
            v-if="isDoc"
            class="mb-8 rounded-xl border border-slate-200 bg-white p-3 lg:hidden dark:border-slate-800 dark:bg-slate-900"
          >
            <summary class="cursor-pointer list-none text-sm font-medium text-slate-700 dark:text-slate-200">
              目录
            </summary>
            <ul class="mt-3 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-800">
              <li v-for="item in list" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="block rounded-lg px-2 py-1.5 text-sm"
                  :class="item.path === path ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-400'"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </details>

          <nav class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <NuxtLink to="/" class="transition hover:text-brand-600 dark:hover:text-brand-300">
              首页
            </NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="size-3" />
            <NuxtLink v-if="isDoc" to="/guide" class="transition hover:text-brand-600 dark:hover:text-brand-300">
              应用文档
            </NuxtLink>
            <UIcon v-if="isDoc" name="i-lucide-chevron-right" class="size-3" />
            <span class="text-slate-500 dark:text-slate-400">{{ doc.title }}</span>
          </nav>

          <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ doc.title }}
          </h1>

          <p v-if="doc.updated" class="mt-3 text-xs text-slate-400 dark:text-slate-500">
            最后更新于 {{ formatDate(doc.updated) }}
          </p>

          <ContentRenderer :value="doc" class="prose mt-8 dark:prose-invert" />

          <nav v-if="isDoc && (prev || next)" class="mt-14 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
            <NuxtLink
              v-if="prev"
              :to="prev.path"
              class="group rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-800"
            >
              <span class="flex items-center gap-1.5 text-xs text-slate-400">
                <UIcon name="i-lucide-arrow-left" class="size-3.5" />
                上一页
              </span>
              <p class="mt-1.5 text-sm font-medium text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                {{ prev.title }}
              </p>
            </NuxtLink>
            <NuxtLink
              v-if="next"
              :to="next.path"
              class="group rounded-xl border border-slate-200 p-4 text-right transition hover:border-brand-300 sm:col-start-2 dark:border-slate-800 dark:hover:border-brand-800"
            >
              <span class="flex items-center justify-end gap-1.5 text-xs text-slate-400">
                下一页
                <UIcon name="i-lucide-arrow-right" class="size-3.5" />
              </span>
              <p class="mt-1.5 text-sm font-medium text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                {{ next.title }}
              </p>
            </NuxtLink>
          </nav>
        </article>

        <aside v-if="isDoc && toc.length" class="hidden xl:block">
          <div class="sticky top-24">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              本页目录
            </p>
            <ul class="mt-3 space-y-1.5 border-l border-slate-200 dark:border-slate-800">
              <li v-for="link in toc" :key="link.id">
                <a
                  :href="`#${link.id}`"
                  class="block border-l-2 border-transparent py-0.5 text-[13px] leading-snug text-slate-500 transition hover:border-brand-400 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                  :class="link.depth > 2 ? 'pl-5' : 'pl-3'"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
