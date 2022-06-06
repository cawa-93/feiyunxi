<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { TimeoutBeforeHide, TimeoutBeforeShown } from "../config/loveBtn";
import { rand, randNum } from "../helpers/rand";

const lovePosition = ref(null);

/**
 * Shown timer
 */
let shownTimer: number = 0;
let hideTimer: number = 0;

const enableLoveButton = () => {
  lovePosition.value = {
    [(rand(['top', 'bottom']))]: `${randNum(100)}%`,
    [(rand(['left', 'right']))]: `${randNum(100)}%`,
    'transform': `rotate(${randNum(45, -45)}deg)`,
  };
};

onMounted(() => {
  shownTimer = setTimeout(enableLoveButton, TimeoutBeforeShown * 1000);
});

watch(lovePosition, (pos, old) => {
  if (pos && old === null) {
    hideTimer = setTimeout(() => {
      lovePosition.value = null;
      shownTimer = setTimeout(enableLoveButton, TimeoutBeforeShown * 1000);
    }, TimeoutBeforeHide * 1000);
  }
});

onBeforeUnmount(() => {
  if (shownTimer) clearTimeout(shownTimer);
  if (hideTimer) clearTimeout(hideTimer);
});
</script>

<template>
  <button v-if="lovePosition" :style="lovePosition">❤</button>
</template>

<style scoped>
button {
  position: absolute;
  background: none;
  border: none;
}
</style>
