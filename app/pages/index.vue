<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const version = '0.0.21'

const features = computed(() => [
  { icon: 'i-lucide-sparkles', ...def('info') },
  { icon: 'i-lucide-message-square-text', ...def('review') },
  { icon: 'i-lucide-package', ...def('campaign') },
  { icon: 'i-lucide-cloud-upload', ...def('cloud') },
])

function def(key: 'info' | 'review' | 'campaign' | 'cloud') {
  return {
    title: t(`docs-home.features.${key}.title`),
    details: t(`docs-home.features.${key}.details`),
  }
}

const entries = computed(() => [
  { to: '/guide', icon: 'i-lucide-rocket', ...entry('app') },
  { to: '/editor', icon: 'i-lucide-pen-tool', ...entry('editor') },
  { to: '/reference', icon: 'i-lucide-book-marked', ...entry('reference') },
])

function entry(key: 'app' | 'editor' | 'reference') {
  return {
    title: t(`docs-home.entries.${key}.title`),
    details: t(`docs-home.entries.${key}.details`),
  }
}

useSeoMeta({
  title: '',
  description: () => t('docs-home.description'),
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-grid text-brand-500/60 opacity-40 mask-fade-b dark:text-brand-400/40" />
      <div class="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />

      <UContainer class="relative py-20 sm:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <UBadge color="primary" variant="subtle" size="sm" class="rounded-full">
            {{ t('docs-home.badge', { version }) }}
          </UBadge>

          <img
            src="/logo_scnexus_512.webp"
            alt="SCNexus"
            class="mx-auto mt-8 size-24 drop-shadow-xl"
          >

          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {{ t('docs-home.title') }}
          </h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('docs-home.tagline') }}
          </p>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {{ t('docs-home.description') }}
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <UButton :to="localePath('/guide')" size="lg" icon="i-lucide-rocket" :label="t('docs-home.start')" />
            <UButton
              to="https://github.com/MengLuoRJ/scnexus"
              target="_blank"
              rel="noopener"
              size="lg"
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-github"
              label="GitHub"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <section class="border-t border-slate-100 py-20 dark:border-slate-800/70">
      <UContainer>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {{ t('docs-home.featuresTitle') }}
          </h2>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {{ t('docs-home.featuresDesc') }}
          </p>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card-hover rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-300">
              <UIcon :name="feature.icon" class="size-5" />
            </div>
            <h3 class="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {{ feature.details }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="pb-24">
      <UContainer>
        <div class="grid gap-4 sm:grid-cols-3">
          <NuxtLink
            v-for="item in entries"
            :key="item.to"
            :to="localePath(item.to)"
            class="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-800"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <UIcon :name="item.icon" class="size-4 text-brand-500" />
              {{ item.title }}
            </div>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ item.details }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 group-hover:gap-2 dark:text-brand-300">
              {{ t('docs-home.viewDocs') }}
              <UIcon name="i-lucide-arrow-right" class="size-3.5" />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>
