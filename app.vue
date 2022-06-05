<script lang="ts" setup>
import { ref } from "#imports";
import { PicSet, picSets } from "~/picSets";

// const randomPicAsync = defineAsyncComponent(() => import('~/components/RandomPic.vue'));

const loading = ref(true);
const set = ref<string[]>([]);
const loveSet = ref<string[]>([]);



async function loadSet(name: PicSet) {
  loading.value = true;
  try {

    switch (name) {
      case "feiyunxi":
        await import('~/feiyunxi').then(m => {
          set.value = m.set;
          loveSet.value = m.loveSet;
        });
        break;
      case "xiao":
        await import('~/xiao').then(m => {
          set.value = m.set;
          loveSet.value = m.loveSet;
        });
        break;
    }
  } finally {
    loading.value = false;
  }
}



const savedValue = sessionStorage.getItem('isCaptchaWasPassed');
if (savedValue && picSets.includes(savedValue as any)) {
  loadSet(savedValue as PicSet);
} else {
  loading.value = false;
}

const captchaPassedHandler = (selectedPicSet: PicSet) => {
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

<style scoped lang="scss">
//@import "../node_modules/bootstrap/scss/functions";
//
//// 2. Include any default variable overrides here
//
//// 3. Include remainder of required Bootstrap stylesheets
//@import "../node_modules/bootstrap/scss/variables";
//
//// 4. Include any default map overrides here
//
//// 5. Include remainder of required parts
//@import "../node_modules/bootstrap/scss/maps";
//@import "../node_modules/bootstrap/scss/mixins";
//@import "../node_modules/bootstrap/scss/root";
//

.component-root {
  min-height     : 100vh;
  display        : flex;
  flex-direction : column;
  place-content  : center;
  place-items    : center;
}


.welcome-captcha {
  padding : 0 1.5rem;
}
</style>
