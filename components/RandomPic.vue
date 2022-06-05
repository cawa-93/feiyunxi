<script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { computed, onBeforeUnmount, ref } from "#imports";
import { PicSet } from "~/picSets";

const props = defineProps<{
  set: PicSet
}>();

const picSet = useRuntimeConfig().public.imageSet[props.set];
const picLoveSet = useRuntimeConfig().public.imageLoveSet[props.set];


const lovePicLeft = ref(0);


const pics = computed(() => lovePicLeft.value ? picLoveSet : picSet);

const selectedPic = ref(null);
const selectPic = () => {
  lovePicLeft.value = lovePicLeft.value > 0 ? lovePicLeft.value - 1 : 0;
  return selectedPic.value = pics.value[Math.floor(Math.random() * pics.value.length)];
};
selectPic();
const selectedPicURL = computed(() => selectedPic.value ? selectedPic.value : null);

document.addEventListener('click', selectPic);
onBeforeUnmount(() => document.removeEventListener('click', selectPic));
</script>

<template>
  <div>
    <button @click="lovePicLeft = 5">LOVE</button>
    <img v-if="selectedPicURL" :src="selectedPicURL" alt="Супер СЕКСИ Мужик">
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
