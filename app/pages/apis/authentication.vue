<script setup lang="ts">
/**
 * 桌面端登录回调：应用把 access_token / refresh_token 拼在本页查询串上，
 * 这里再转交给 scnexus:// 协议唤起客户端。
 */
useSeoMeta({ title: '正在重定向登录请求', robots: 'noindex' })

const available = ref(false)

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')

  if (accessToken && refreshToken) {
    available.value = true
    const url = new URL('scnexus://authentication')
    url.searchParams.append('access_token', accessToken)
    url.searchParams.append('refresh_token', refreshToken)
    window.open(url.toString(), '_self')
    return
  }

  available.value = false
  setTimeout(() => window.open('/', '_self'), 3000)
})
</script>

<template>
  <UContainer class="flex min-h-[60vh] items-center justify-center py-16">
    <ClientOnly>
      <div v-if="available" class="w-full max-w-md rounded-2xl bg-slate-100 px-6 py-6 text-center dark:bg-slate-900">
        <p class="text-2xl font-semibold text-slate-900 dark:text-white">
          正在重定向登录请求
        </p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          即将打开「星际枢纽 (SCNexus)」应用程序
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          请同意打开应用程序以完成登录验证
        </p>

        <div class="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          <p class="font-medium">⚠ 注意 ⚠</p>
          <p class="mt-1">如果提示的应用程序并非「星际枢纽 (SCNexus)」应用程序</p>
          <p>请勿点击同意打开，以防登录验证信息泄露</p>
        </div>
      </div>

      <div v-else class="w-full max-w-md rounded-2xl bg-red-50 px-6 py-6 text-center dark:bg-red-950/40">
        <p class="text-2xl font-semibold text-red-700 dark:text-red-300">
          ⚠ 无效请求 ⚠
        </p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          当前登录请求重定向失败或为非法请求
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          请通过「星际枢纽 (SCNexus)」应用程序发起登录请求
        </p>
      </div>

      <template #fallback>
        <p class="text-sm text-slate-500 dark:text-slate-400">正在校验登录请求…</p>
      </template>
    </ClientOnly>
  </UContainer>
</template>
