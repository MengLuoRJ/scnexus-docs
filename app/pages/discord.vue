<script setup lang="ts">
useSeoMeta({ title: 'SCNexus Discord', robots: 'noindex' })

onMounted(() => {
  window.location.replace('https://discord.gg/U6EbQKdkH2')
})
</script>

<template>
  <UContainer class="flex min-h-[60vh] items-center justify-center py-16">
    <div class="max-w-md rounded-2xl border border-amber-200 bg-amber-50/70 px-8 py-7 text-center dark:border-amber-900 dark:bg-amber-950/30">
      <p class="text-xl font-semibold text-slate-900 dark:text-white">
        SCNexus Discord
      </p>
      <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
        正在为您跳转至「星际枢纽」Discord 频道
      </p>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Redirecting to SCNexus Discord Channel
      </p>
      <UButton
        to="https://discord.gg/U6EbQKdkH2"
        rel="noopener"
        class="mt-5"
        size="sm"
        label="如果没有自动跳转，请点击这里"
      />
    </div>
  </UContainer>
</template>
