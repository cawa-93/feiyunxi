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


const pics = computed(() => lovePicLeft.value ? picLoveSet : picSet);

const selectedPicURL = ref(null);
const nextPic = ref<string | null>(null);

const picsExceptSelected = computed(() => {
  const picsExceptSelected = pics.value.filter(p => p !== selectedPicURL.value);
  if (picsExceptSelected.length === 0) {
    return pics.value;
  }

  return picsExceptSelected;
});

const lovePicLeft = ref(0);
const enableLove = () => {
  nextPic.value = null;
  lovePicLeft.value = 5;
  selectPic();
};

const selectPic = () => {
  lovePicLeft.value = lovePicLeft.value > 0 ? lovePicLeft.value - 1 : 0;
  selectedPicURL.value = nextPic.value || rand(picsExceptSelected.value);
  nextPic.value = rand(picsExceptSelected.value);
};
selectPic();

document.addEventListener('click', selectPic);
onBeforeUnmount(() => document.removeEventListener('click', selectPic));
</script>

<template>
  <div>
    <love-btn v-if="!lovePicLeft" @click.stop="enableLove"></love-btn>
    <img v-if="selectedPicURL" :key="selectedPicURL" :src="selectedPicURL" alt="Супер СЕКСИ Мужик">
    <img :key="nextPic" :src="nextPic" alt="" class="visually-hidden">
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

div {
  position: relative;
  width: auto;
  display: inline-block;
  overflow: hidden;
}

img {
  max-height: 100vh;
  max-width: 100vw;
  width: auto;
  height: auto;
  vertical-align: middle;
}
</style>
