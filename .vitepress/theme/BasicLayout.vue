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
        <div class="text-[--vp-c-text-1]">
          {{ "Copyright © 2023-2024 SCNexus" }}
        </div>
        <div class="text-[--vp-c-text-2]">
          {{ "Copyright © 2015-2024 AiurCovenant.Net" }}
        </div>
        <div class="flex flex-wrap flex-row justify-center items-center gap-2 text-[--vp-c-text-2]">
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
