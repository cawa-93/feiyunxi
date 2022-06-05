<script lang="ts" setup>
import { ref } from "#imports";
import RandomPic from "~/components/RandomPic.vue";
import { PicSet, picSets } from "~/picSets";


const savedValue = sessionStorage.getItem('isCaptchaWasPassed');
const picSet = ref<PicSet | null>(
    savedValue && picSets.includes(savedValue as any)
        ? savedValue as PicSet
        : null,
);

const captchaPassedHandler = (selectedPicSet: PicSet) => {
  sessionStorage.setItem('isCaptchaWasPassed', selectedPicSet);
  picSet.value = selectedPicSet;
};

</script>

<template>
  <div class="component-root">
    <welcome-captcha v-if="!picSet" class="welcome-captcha" @passed="captchaPassedHandler"/>
    <random-pic :set="picSet" v-else/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";

// 2. Include any default variable overrides here

// 3. Include remainder of required Bootstrap stylesheets
@import "../node_modules/bootstrap/scss/variables";

// 4. Include any default map overrides here

// 5. Include remainder of required parts
@import "../node_modules/bootstrap/scss/maps";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";
@import "../node_modules/bootstrap/scss/reboot";
</style>

<style scoped lang="scss">
@import "../node_modules/bootstrap/scss/functions";

// 2. Include any default variable overrides here

// 3. Include remainder of required Bootstrap stylesheets
@import "../node_modules/bootstrap/scss/variables";

// 4. Include any default map overrides here

// 5. Include remainder of required parts
@import "../node_modules/bootstrap/scss/maps";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";


.component-root {
  background-color : black;
  display          : flex;
  flex-direction   : column;
  min-height       : 100vh;
  place-content    : center;
  place-items      : center;
}
</style>
