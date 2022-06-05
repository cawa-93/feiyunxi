<script lang="ts" setup>
import { computed, useFetch } from "#imports";

const {data: pics} = await useFetch('/api/feiyunxi');
const selectedPic = ref(null);
const selectPic = () => selectedPic.value = pics.value[Math.floor(Math.random() * pics.value.length)];
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
