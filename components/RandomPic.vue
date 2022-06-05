<script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { computed } from "#imports";

const pics = useRuntimeConfig().public.imageSet.feiyunxi;
const selectedPic = ref(null);
const selectPic = () => selectedPic.value = pics[Math.floor(Math.random() * pics.length)];
selectPic();
const selectedPicURL = computed(() => selectedPic.value ? `/images/feiyunxi/${selectedPic.value}` : null);
</script>

<template>
  <div>
    <img v-if="selectedPicURL" @click="selectPic" :src="selectedPicURL">
  </div>
</template>

<style scoped>
img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
}
</style>
