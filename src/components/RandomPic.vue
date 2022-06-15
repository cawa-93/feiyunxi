<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { rand } from "../helpers/rand";
import LoveBtn from "./LoveBtn.vue";
import LoveSnow from "./LoveSnow.vue";

const props = defineProps<{
  set: string[],
  loveSet: string[],
  path: string[],
  color: string
}>();


const pics = computed(() => lovePicLeft.value ? props.loveSet : props.set);

const selectedPicURL = ref<string | null>(null);
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
  if (lovePicLeft.value === 1) {
    nextPic.value = null;
    lovePicLeft.value = 0;
  } else if (lovePicLeft.value > 1) {
    lovePicLeft.value--;
  }
  selectedPicURL.value = nextPic.value || rand(picsExceptSelected.value);
  nextPic.value = rand(picsExceptSelected.value);

  if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
    navigator.vibrate(100);
  }
};
selectPic();

document.addEventListener('click', selectPic);
onBeforeUnmount(() => document.removeEventListener('click', selectPic));
</script>

<template>
  <div>
    <love-btn v-if="!lovePicLeft && loveSet.length > 0" @click.stop="enableLove"></love-btn>
    <img v-if="selectedPicURL" :key="selectedPicURL" :src="selectedPicURL" alt="Супер СЕКСИ Мужик">
    <img v-if="nextPic" :key="nextPic" :src="nextPic" alt="" class="visually-hidden">
    <love-snow
      v-if="lovePicLeft"
      :color="color"
      :path="path"
    />
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
