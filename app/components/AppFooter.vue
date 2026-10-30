<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950">
    <UContainer class="py-10">
      <div class="flex flex-col items-center gap-1 text-center text-sm">
        <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-500 dark:text-slate-400">
          <NuxtLink :to="localePath('/terms')" class="transition hover:text-brand-600 dark:hover:text-brand-300">{{ t('docs-basic.footer.terms') }}</NuxtLink>
          <NuxtLink :to="localePath('/privacy-policy')" class="transition hover:text-brand-600 dark:hover:text-brand-300">{{ t('docs-basic.footer.privacy') }}</NuxtLink>
          <NuxtLink :to="localePath('/sponsor')" class="transition hover:text-brand-600 dark:hover:text-brand-300">{{ t('docs-basic.footer.sponsor') }}</NuxtLink>
          <a
            href="https://github.com/MengLuoRJ/scnexus"
            target="_blank"
            rel="noopener"
            class="transition hover:text-brand-600 dark:hover:text-brand-300"
          >{{ t('docs-basic.footer.repo') }}</a>
        </div>

        <p class="mt-3 text-slate-600 dark:text-slate-300">
          Copyright © 2023-{{ year }} SCNexus
        </p>
        <p class="text-slate-500 dark:text-slate-400">
          Copyright © 2015-{{ year }}
          <a href="https://aiurCovenant.net" target="_blank" rel="noopener" class="mx-1 transition hover:text-brand-600 dark:hover:text-brand-300">AiurCovenant.Net</a>
        </p>

        <div class="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {{ t('docs-basic.footer.icpLabel') }}
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="transition hover:text-brand-600 dark:hover:text-brand-300">蜀ICP备17022112号-4</a>
          </span>
          <span>
            {{ t('docs-basic.footer.policeLabel') }}
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010602002164"
              target="_blank"
              rel="noopener"
              class="transition hover:text-brand-600 dark:hover:text-brand-300"
            >51010602002164号</a>
          </span>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
