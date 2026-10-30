<script setup lang="ts">
import type { ContentLocale } from '~/utils/content-locale'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const contentLocale = computed(() => asContentLocale(locale.value))
const otherLocale = computed<ContentLocale>(() => (contentLocale.value === 'zh-CN' ? 'en' : 'zh-CN'))

/** 与语言无关的路径：/en/guide 与 /guide 指向同一篇 */
const path = computed(() => stripLocalePath(route.path, locale.value, 'zh-CN').replace(/\/+$/, '') || '/')

const { data: resolved } = await useAsyncData(`content-${contentLocale.value}-${path.value}`, async () => {
  const [ownDoc, ownPage, otherDoc, otherPage] = await Promise.all([
    queryLocalizedContent('docs', contentLocale.value).path(path.value).first(),
    queryLocalizedContent('pages', contentLocale.value).path(path.value).first(),
    queryLocalizedContent('docs', otherLocale.value).path(path.value).first(),
    queryLocalizedContent('pages', otherLocale.value).path(path.value).first(),
  ])

  const own = ownDoc ?? ownPage
  const other = otherDoc ?? otherPage

  /** 这篇实际存在的语言版本：hreflang 只指这些 */
  const available: ContentLocale[] = []
  if (own) available.push(contentLocale.value)
  if (other) available.push(otherLocale.value)

  /** 文档是 chain 策略：当前语言没有就回退，并在页面上说清楚 */
  const found = own ?? other
  if (!found) return null
  return { doc: found, isFallback: !own, available }
})

const initial = resolved.value
if (!initial) {
  throw createError({ statusCode: 404, statusMessage: 'Document not found', fatal: true })
}

declarePageLocales(initial.available)

const doc = computed(() => resolved.value?.doc ?? null)
const isFallback = computed(() => resolved.value?.isFallback ?? false)

/**
 * 侧栏合并两种语言的条目：未翻译的文档如果不列出来，
 * 回退页只有知道 URL 的人才能进，对普通读者等于不存在。
 */
const { data: docs } = await useAsyncData(`docs-sidebar-${contentLocale.value}`, async () => {
  const [own, other] = await Promise.all([
    queryLocalizedContent('docs', contentLocale.value).order('order', 'ASC').all(),
    queryLocalizedContent('docs', otherLocale.value).order('order', 'ASC').all(),
  ])

  const merged = new Map<string, { path: string, title: string, group: string, order: number, contentLocale: ContentLocale }>()
  const toItem = (item: (typeof own)[number], itemLocale: ContentLocale) => ({
    path: item.path ?? '',
    title: item.title ?? '',
    group: item.group ?? 'usage',
    order: item.order ?? 99,
    contentLocale: itemLocale,
  })

  for (const item of other) merged.set(item.path ?? '', toItem(item, otherLocale.value))
  for (const item of own) merged.set(item.path ?? '', toItem(item, contentLocale.value))

  return [...merged.values()].sort((a, b) => a.order - b.order || a.path.localeCompare(b.path))
})

const list = computed(() => docs.value ?? [])
const isDoc = computed(() => list.value.some(item => item.path === path.value))

const groups = computed(() => (['start', 'usage', 'reference'] as const)
  .map(key => ({ key, label: t(`docs-doc.groups.${key}`), items: list.value.filter(item => (item.group ?? 'usage') === key) }))
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
  // 正文语言与 URL 语言不一致时不收录，避免"中文正文挂在 /en 下"被判重复内容
  robots: () => (isFallback.value ? 'noindex, follow' : 'index, follow'),
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
            <NuxtLink :to="localePath('/guide')" class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <UIcon name="i-lucide-book-open" class="size-4 text-brand-500" />
              {{ t('docs-doc.sidebar') }}
            </NuxtLink>
            <nav class="mt-6 space-y-5">
              <div v-for="group in groups" :key="group.key">
                <p class="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {{ group.label }}
                </p>
                <ul class="mt-1.5 space-y-0.5">
                  <li v-for="item in group.items" :key="item.path">
                    <NuxtLink
                      :to="localePath(item.path)"
                      class="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] transition"
                      :class="item.path === path
                        ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'"
                    >
                      <span class="min-w-0 flex-1 truncate">{{ item.title }}</span>
                      <UBadge
                        v-if="item.contentLocale !== contentLocale"
                        color="neutral"
                        variant="outline"
                        size="sm"
                        :title="t('docs-doc.translationMissing')"
                      >
                        {{ item.contentLocale === 'zh-CN' ? '中文' : 'EN' }}
                      </UBadge>
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
              {{ t('docs-doc.tocMobile') }}
            </summary>
            <ul class="mt-3 space-y-1 border-t border-slate-100 pt-3 dark:border-slate-800">
              <li v-for="item in list" :key="item.path">
                <NuxtLink
                  :to="localePath(item.path)"
                  class="block rounded-lg px-2 py-1.5 text-sm"
                  :class="item.path === path ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-400'"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </details>

          <nav class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <NuxtLink :to="localePath('/')" class="transition hover:text-brand-600 dark:hover:text-brand-300">
              {{ t('docs-doc.home') }}
            </NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="size-3" />
            <NuxtLink v-if="isDoc" :to="localePath('/guide')" class="transition hover:text-brand-600 dark:hover:text-brand-300">
              {{ t('docs-doc.sidebar') }}
            </NuxtLink>
            <UIcon v-if="isDoc" name="i-lucide-chevron-right" class="size-3" />
            <span class="text-slate-500 dark:text-slate-400">{{ doc.title }}</span>
          </nav>

          <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ doc.title }}
          </h1>

          <p
            v-if="isFallback"
            class="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
          >
            <UIcon name="i-lucide-info" class="mt-0.5 size-3.5 shrink-0" />
            <span>{{ t('docs-doc.fallbackNotice') }}</span>
          </p>

          <p v-if="doc.updated" class="mt-3 text-xs text-slate-400 dark:text-slate-500">
            {{ t('docs-doc.updated') }} {{ formatDate(doc.updated) }}
          </p>

          <ContentRenderer :value="doc" class="prose mt-8 dark:prose-invert" />

          <nav v-if="isDoc && (prev || next)" class="mt-14 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
            <NuxtLink
              v-if="prev"
              :to="localePath(prev.path)"
              class="group rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-800"
            >
              <span class="flex items-center gap-1.5 text-xs text-slate-400">
                <UIcon name="i-lucide-arrow-left" class="size-3.5" />
                {{ t('docs-doc.prev') }}
              </span>
              <p class="mt-1.5 text-sm font-medium text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                {{ prev.title }}
              </p>
            </NuxtLink>
            <NuxtLink
              v-if="next"
              :to="localePath(next.path)"
              class="group rounded-xl border border-slate-200 p-4 text-right transition hover:border-brand-300 sm:col-start-2 dark:border-slate-800 dark:hover:border-brand-800"
            >
              <span class="flex items-center justify-end gap-1.5 text-xs text-slate-400">
                {{ t('docs-doc.next') }}
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
              {{ t('docs-doc.toc') }}
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
