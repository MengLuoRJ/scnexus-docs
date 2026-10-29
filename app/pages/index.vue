<script setup lang="ts">
const version = '0.0.21'

const features = [
  {
    icon: 'i-lucide-sparkles',
    title: '富信息展示',
    details: '为内容创作者提供在地图和模组显示更加丰富信息的能力。',
  },
  {
    icon: 'i-lucide-message-square-text',
    title: '地图 / 模组评分与评论',
    details: '让玩家可以直接在枢纽内评价与讨论作品（敬请期待）。',
  },
  {
    icon: 'i-lucide-package',
    title: '自制战役分发与管理',
    details: '帮助内容创作者分发自制战役和自制内容，支持「星际枢纽」标准与「CCM」格式。',
  },
  {
    icon: 'i-lucide-cloud-upload',
    title: '云同步存档',
    details: '为官方战役、自制战役与「大厅计划」云存档地图提供云同步存档。',
  },
]

const entries = [
  { to: '/guide', icon: 'i-lucide-rocket', title: '快速开始', details: '下载安装、启动游戏与加入社区' },
  { to: '/reference/metadata', icon: 'i-lucide-file-json', title: '参考文档', details: '压缩安装包元数据标准与字段说明' },
  { to: '/patchnotes', icon: 'i-lucide-history', title: '更新日志', details: '各版本的更新与修正记录' },
]

useSeoMeta({
  title: '',
  description: '星际枢纽（SCNexus）是一款专为星际社区服务的枢纽应用，提供富信息展示、自制战役分发与管理、云同步存档等能力。',
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
            v{{ version }} · 稳定版本
          </UBadge>

          <img
            src="/logo_scnexus_512.webp"
            alt="SCNexus"
            class="mx-auto mt-8 size-24 drop-shadow-xl"
          >

          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            星际枢纽
          </h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            专为星际社区服务的枢纽应用
          </p>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            为内容创作者提供更丰富的信息展示方式，为玩家提供战役安装、存档同步与作品管理的一站式入口。
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <UButton to="/guide" size="lg" icon="i-lucide-rocket" label="快速开始" />
            <UButton
              to="/sponsor"
              size="lg"
              color="neutral"
              variant="outline"
              icon="i-lucide-heart"
              label="赞助支持"
            />
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
            应用功能
          </h2>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
            围绕星际社区的内容创作与游玩体验构建
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
            v-for="entry in entries"
            :key="entry.to"
            :to="entry.to"
            class="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-800"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <UIcon :name="entry.icon" class="size-4 text-brand-500" />
              {{ entry.title }}
            </div>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ entry.details }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 group-hover:gap-2 dark:text-brand-300">
              查看文档
              <UIcon name="i-lucide-arrow-right" class="size-3.5" />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <section class="pb-24">
      <UContainer>
        <div class="rounded-3xl bg-slate-900 px-8 py-12 text-center dark:bg-slate-900">
          <h2 class="text-2xl font-semibold text-white">加入星际社区</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            无论是使用中遇到问题，还是想参与翻译与贡献，都欢迎加入交流群或 Discord 服务器。
          </p>
          <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
            <UButton
              to="https://discord.gg/U6EbQKdkH2"
              target="_blank"
              rel="noopener"
              color="neutral"
              variant="solid"
              icon="i-simple-icons-discord"
              label="Discord"
              class="bg-white text-slate-900 hover:bg-slate-100"
            />
            <UButton
              to="https://qm.qq.com/cgi-bin/qm/qr?k=IgP5DkVYkL-VlgMPESNmRaPiYFCQLrNI&jump_from=webapi&authKey=IH1aC/1uFvcRC43U2h3R4Ms2YhbMg082p4RTMSV4GHZSRmfIyLjJodIwwf8wAdL4"
              target="_blank"
              rel="noopener"
              color="neutral"
              variant="outline"
              icon="i-lucide-users"
              label="QQ 群 857601125"
              class="border-white/25 text-white hover:bg-white/10"
            />
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
