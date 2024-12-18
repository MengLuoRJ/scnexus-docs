<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div
        class="my-6 pt-6 flex flex-col gap-1 justify-center items-center text-sm border-solid border-0 border-t-1 border-t-[--vp-c-gutter]"
      >
        <div
          class="flex flex-wrap flex-row justify-center items-center gap-2 text-[--vp-c-text-3]"
        >
          <a class="mx-1 hover:underline" href="/terms">
            {{ "使用条款" }}
          </a>
          <a class="mx-1 hover:underline" href="/privacy-policy">
            {{ "隐私政策" }}
          </a>
          <a class="mx-1 hover:underline" href="/sponsor">
            {{ "赞助支持" }}
          </a>
        </div>
        <div class="mt-2 text-[--vp-c-text-1]">
          {{ `Copyright © 2023-${new Date().getFullYear()} SCNexus` }}
        </div>
        <div class="mb-2 text-[--vp-c-text-2]">
          <span>{{ `Copyright © 2015-${new Date().getFullYear()}` }}</span>
          <a
            class="mx-1 hover:underline"
            href="https://aiurCovenant.net"
            target="_blank"
          >
            {{ "AiurCovenant.Net" }}
          </a>
        </div>
        <div
          class="flex flex-wrap flex-row justify-center items-center gap-2 text-[--vp-c-text-2]"
        >
          <div>
            <span>{{ "互联网ICP备案：" }}</span>
            <a href="https://beian.miit.gov.cn/">
              {{ "蜀ICP备17022112号-4" }}
            </a>
          </div>
          <div>
            <span>{{ "川公网安备：" }}</span>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010602002164"
            >
              {{ "51010602002164号" }}
            </a>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
