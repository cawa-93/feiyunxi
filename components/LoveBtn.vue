<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "#imports";
import { TimeoutBeforeHide, TimeoutBeforeShown } from "~/config/loveBtn";
import { rand, randNum } from "~/rand";

const lovePosition = ref(null);

/**
 * Shown timer
 */
let shownTimer = null;
let hideTimer = null;

const enableLoveButton = () => {
  console.log('enableLoveButton');
  lovePosition.value = {
    [(rand(['top', 'bottom']))]: `${randNum(100)}%`,
    [(rand(['left', 'right']))]: `${randNum(100)}%`,
    'transform': `rotate(${randNum(45, -45)}deg)`,
  };
};

onMounted(() => {
  console.log('MOUNTED');
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
