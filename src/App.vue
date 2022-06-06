<script lang="ts" setup>
import { ref } from "vue";
import RandomPic from "./components/RandomPic.vue";
import WelcomeCaptcha from "./components/WelcomeCaptcha.vue";
import { PicSetNames, picSetsNames } from "./picSetsNames";


// useHead({
//   title: 'Alice\'s wonderland',
// });

const loading = ref(true);
const set = ref<string[]>([]);
const loveSet = ref<string[]>([]);

const feiyunxiPromise = import('./feiyunxiSet');
const xiaoPromise = import('./xiaoSet');



async function loadSet(name: PicSetNames) {
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
    }

    const {regular, love} = await promise;
    set.value = Object.values(regular).map(p => p.default);
    loveSet.value = Object.values(love).map(p => p.default);
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

</script>

<template>
  <div v-if="!loading" class="component-root">
    <welcome-captcha v-if="!set.length" class="welcome-captcha" @passed="captchaPassedHandler"/>
    <random-pic v-else :love-set="loveSet" :set="set"/>
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
