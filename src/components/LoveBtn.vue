<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { TimeoutBeforeHide, TimeoutBeforeShown } from "../config/loveBtn";
import { rand, randNum } from "../helpers/rand";

type Position = { [s: string]: string, transform: string }
const lovePosition = ref<(Position) | null>(null);

/**
 * Shown timer
 */
let shownTimer: number = 0;
let hideTimer: number = 0;

const enableLoveButton = () => {
  lovePosition.value = {
    [(rand(['top', 'bottom']))]: `${randNum(50)}%`,
    [(rand(['left', 'right']))]: `${randNum(50)}%`,
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
  <button v-if="lovePosition" :style="lovePosition">
    <svg viewBox="0 0 36 36" width="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"
            fill="#DD2E44"/>
    </svg>
  </button>
</template>

<style scoped>
button {
  position: absolute;
  background: none;
  border: none;
}
</style>
