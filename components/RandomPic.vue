<script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { computed, onBeforeUnmount, ref } from "#imports";
import { PicSet } from "~/picSets";
import { rand } from "~/rand";

const props = defineProps<{
  set: PicSet
}>();

const picSet = useRuntimeConfig().public.imageSet[props.set];
const picLoveSet = useRuntimeConfig().public.imageLoveSet[props.set];


const lovePicLeft = ref(0);
const enableLove = () => {
  lovePicLeft.value = 5;
};


const pics = computed(() => lovePicLeft.value ? picLoveSet : picSet);

const selectedPic = ref(null);
const selectPic = () => {
  lovePicLeft.value = lovePicLeft.value > 0 ? lovePicLeft.value - 1 : 0;
  return selectedPic.value = rand(pics.value);
};
selectPic();
const selectedPicURL = computed(() => selectedPic.value ? selectedPic.value : null);

document.addEventListener('click', selectPic);
onBeforeUnmount(() => document.removeEventListener('click', selectPic));
</script>

<template>
  <div>
    <love-btn v-if="!lovePicLeft" @click.prevent="enableLove"></love-btn>
    <img v-if="selectedPicURL" :src="selectedPicURL" alt="Супер СЕКСИ Мужик">
  </div>
</template>

<style scoped>

div {
  position: absolute;
}

img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
}
</style>
