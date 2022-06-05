<script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { computed, onBeforeUnmount, ref } from "#imports";
import { PicSet } from "~/picSets";

const props = defineProps<{
  set: PicSet
}>();

const pics = useRuntimeConfig().public.imageSet[props.set];
const selectedPic = ref(null);
const selectPic = () => selectedPic.value = pics[Math.floor(Math.random() * pics.length)];
selectPic();
const selectedPicURL = computed(() => selectedPic.value ? `/images/${props.set}/${selectedPic.value}` : null);

document.addEventListener('click', selectPic);
onBeforeUnmount(() => document.removeEventListener('click', selectPic));
</script>

<template>
  <div>
    <img v-if="selectedPicURL" :src="selectedPicURL">
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
