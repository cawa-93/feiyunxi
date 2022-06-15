<script lang="ts" setup>
import { computed, ref } from "vue";
import RandomPic from "./components/RandomPic.vue";
import WelcomeCaptcha from "./components/WelcomeCaptcha.vue";
import { PicSetNames, picSetsNames } from "./picSetsNames";

const setName = ref<PicSetNames>();
const loading = ref(true);
const set = ref<string[]>([]);
const loveSet = ref<string[]>([]);

const feiyunxiPromise = import('./feiyunxiSet');
const xiaoPromise = import('./xiaoSet');
const catPromise = import('./xiaoSet');



async function loadSet(name: PicSetNames) {
  setName.value = name;
  loading.value = true;
  let promise;
  try {
    switch (name) {
      case "feiyunxi":
        promise = feiyunxiPromise;
        break;
      case "xiao":
        promise = xiaoPromise;
        break;
      case "cat.ts":
        promise = catPromise;
        break;
    }

    const {regular, love} = await promise;
    set.value = Object.values(regular);
    loveSet.value = Object.values(love);
  } catch (e: any) {
    console.error(e);
    alert('Сталась не передбачувана помилка: ' + e.message || e);
  } finally {
    loading.value = false;
  }
}



const savedValue = sessionStorage.getItem('isCaptchaWasPassed');
if (savedValue && picSetsNames.includes(savedValue as any)) {
  loadSet(savedValue as PicSetNames);
} else {
  loading.value = false;
}

const captchaPassedHandler = (selectedPicSet: PicSetNames) => {
  sessionStorage.setItem('isCaptchaWasPassed', selectedPicSet);
  loadSet(selectedPicSet);
};

const rainPath = computed(() =>
  setName.value === 'xiao'
    ? ['M 24 12 A 6 6 90 0 0 24 30 C 30 30 30 30 31.818 27.774 L 34.35 24.228 L 37.98 28.032 C 38.574 29.04 40.008 30.222 43.638 30.138 A 6 6 90 0 0 40.854 12.072 L 40.008 -21.45 A 6 6 90 0 0 23.964 -22.884 Z']
    : ['M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z'],
);


const rainColor = computed(() =>
  setName.value === 'xiao'
    ? '208,176,132'
    : '221,46,68',
);
</script>

<template>
  <div v-if="!loading" class="component-root">
    <welcome-captcha v-if="!set.length" class="welcome-captcha" @passed="captchaPassedHandler"/>
    <random-pic v-else
                :color="rainColor"
                :love-set="loveSet"
                :path="rainPath"
                :set="set"
    />
  </div>
</template>

<style>
*, ::after, ::before {
  box-sizing: border-box;
}

:root {
  scroll-behavior: smooth;
}

body {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}</style>

<style scoped>
.component-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
}


.welcome-captcha {
  padding: 0 1.5rem;
}
</style>
