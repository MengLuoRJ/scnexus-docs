<script lang="ts" setup>
import { onMounted, ref } from "vue";

const sponsorsList = ref<{ name: string; avatar?: string }[]>([]);

onMounted(async () => {
  const sponsors = (await import("../sponsorkit/sponsors.json")).default;
  sponsorsList.value = sponsors.map((s) => {
    return {
      name: s.raw?.user.name ?? s.sponsor.name,
      avatar: s.raw?.user.avatar ?? s.sponsor.avatarUrl,
    };
  });
});
</script>
<template>
  <div
    class="sponsors-list flex flex-row flex-wrap justify-start items-center p-2 gap-y-2"
  >
    <div
      class="sponsor basis-1/3 flex flex-row flex-nowrap ustify-start items-center"
      v-for="sponsor in sponsorsList"
    >
      <img
        v-if="sponsor.avatar"
        class="h-24px w-24px mr-1 rounded-6"
        :src="sponsor.avatar"
      />
      <span>{{ sponsor.name }}</span>
    </div>
  </div>
</template>
