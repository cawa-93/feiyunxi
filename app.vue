<script lang="ts" setup>

import { ref } from "#imports";
import RandomPic from "~/components/RandomPic.vue";

const isCaptchaPassed = ref( sessionStorage.getItem('isCaptchaWasPassed') === '1' )

const captchaPassedHandler = () => {
  sessionStorage.setItem('isCaptchaWasPassed', '1')
  isCaptchaPassed.value = true
}

</script>

<template>
  <div class="component-root">
    <welcome-captcha v-if="!isCaptchaPassed" class="welcome-captcha" @passed="captchaPassedHandler"/>
    <random-pic v-else/>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
}
</style>
