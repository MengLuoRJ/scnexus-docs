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
          {{ "Copyright © 2023 SCNexus" }}
        </div>
        <div class="text-[--vp-c-text-2]">
          {{ "Copyright © 2015-2023 AiurCovenant.Net" }}
        </div>
      </div>
    </template>
  </Layout>
</template>
