---
layout: page
title: 正在重定向登录请求
---

<script setup lang="ts">
import { ref, onMounted } from "vue";

const available = ref(false);

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.has("access_token") && params.has("refresh_token")) {
    available.value = true;
    const url = new URL("scnexus://authentication");
    url.searchParams.set("access_token", params.access_token);
    url.searchParams.set("refresh_token", params.refresh_token);
    window.open(url, "_self");
  } else {
    available.value = false;
    const closing = setTimeout(() => window.open("/", "_self"), 3000);
  }
})
</script>

<div v-if="available" class="h-[75vh] w-full flex flex-col justify-center items-center">
    <div class="px-6 py-6 flex flex-col justify-center items-center gap-6 bg-[#F6F6F7] rounded-2">
        <div class="flex flex-col justify-center items-center gap-2">
            <div class="text-2xl">正在重定向登录请求</div>
            <div class="text-base">即将打开「星际枢纽 (SCNexus)」应用程序</div>
            <div class="text-base">请同意打开应用程序以完成登录验证</div>
        </div>
        <div class="px-2 py-1 flex flex-col justify-center items-center gap-2 bg-[#F9E7E9] rounded-2">
            <div class="text-sm">⚠ 注意 ⚠</div>
            <div class="text-sm">如果提示的应用程序并非「星际枢纽 (SCNexus)」应用程序</div>
            <div class="text-sm">请勿点击同意打开，以防登陆验证信息泄露</div>
        </div>
    </div>
</div>
<div v-else class="h-[75vh] w-full flex flex-col justify-center items-center">
    <div class="px-6 py-6 flex flex-col justify-center items-center gap-2 bg-[#F9E7E9] rounded-2">
        <div class="text-2xl">⚠ 无效请求 ⚠</div>
        <div class="text-base">当前登录请求重定向失败或为非法请求</div>
        <div class="text-base">请通过「星际枢纽 (SCNexus)」应用程序发起登录请求</div>
    </div>
</div>
