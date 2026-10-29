<script setup lang="ts">
const codes = [
  { src: '/qrcode_mengluorj_alipay.png', label: '支付宝' },
  { src: '/qrcode_mengluorj_wechat.png', label: '微信支付' },
]
</script>

<template>
  <div class="not-prose my-6 flex flex-wrap items-center justify-around gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
    <figure v-for="code in codes" :key="code.label" class="flex flex-col items-center gap-2">
      <img :src="code.src" :alt="`${code.label}赞助码`" class="h-[250px] w-[200px] object-contain">
      <figcaption class="text-xs text-slate-500 dark:text-slate-400">{{ code.label }}</figcaption>
    </figure>
  </div>
</template>
