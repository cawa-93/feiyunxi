<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  path: string[],
  color: string
}>();

let canvas = ref<HTMLCanvasElement | undefined>();
let ctx: CanvasRenderingContext2D | null = null;

class Flake {
  x: number;
  y: number;
  size: number;
  speed: number;
  velY: number;
  velX: number;
  opacity: number;
  stepSize: number;
  step: number;
  rotation: number;
  rotationDirection: 1 | -1;



  constructor({
                x = Math.floor(Math.random() * window.innerWidth),
                y = Math.floor(Math.random() * window.innerHeight) - window.innerHeight,
              } = {}) {
    let speed = (Math.random()) + 0.5;

    this.speed = speed;
    this.velY = speed;
    this.velX = 0;
    this.x = x;
    this.y = y;
    this.size = (Math.random() * 3) + 2;
    this.stepSize = (Math.random()) / 30;
    this.step = 0;
    this.opacity = (Math.random() * 0.7) + 0.5;
    this.rotation = Math.random() * 360;
    this.rotationDirection = Math.random() >= 0.5 ? 1 : -1;
  }
}


let flakes: Flake[] = [];
let flakeCount = Math.round(window.innerHeight * window.innerWidth / 10000); //100;
console.log({flakeCount});
let mX = -100;
let mY = -100;


let isMounded = false;

let p = new Path2D();
for (const string of props.path) {
  p.addPath(new Path2D(string));
}



function snow() {
  if (!canvas.value || !ctx) {
    ctx = null;
    return;
  }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  for (let i = 0; i < flakeCount; i++) {
    let flake = flakes[i];
    let x = mX;
    let y = mY;
    let minDist = 150;
    let x2 = flake.x;
    let y2 = flake.y;

    let dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

    if (dist < minDist) {
      let force = minDist / (dist * dist);
      let xcomp = (x - x2) / dist;
      let ycomp = (y - y2) / dist;
      let deltaV = force / 2;

      flake.velX -= deltaV * xcomp;
      flake.velY -= deltaV * ycomp;

    } else {
      flake.velX *= .98;
      if (flake.velY <= flake.speed) {
        flake.velY = flake.speed;
      }
      flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
    }

    ctx.fillStyle = `rgba(${props.color},${flake.opacity})`;
    flake.y += flake.velY;
    flake.x += flake.velX;

    if (
      flake.y >= canvas.value.height + 50 || flake.y <= -canvas.value.height || flake.x >= canvas.value.width + 50 || flake.x <= -50
    ) {
      flakes[i] = new Flake({y: -50});
    }


    flake.rotation += flake.speed * flake.rotationDirection;

    const path2 = new Path2D();
    let m = new DOMMatrix(`translate(${flake.x}px,${flake.y}px) scale(${2 / flake.size}) rotate(${flake.rotation}deg)`);
    path2.addPath(p, m);
    ctx.fill(path2);
  }

  if (isMounded && canvas.value) requestAnimationFrame(snow);
}



function init() {
  if (!canvas.value) return;

  ctx = canvas.value?.getContext('2d');

  for (let i = 0; i < flakeCount; i++) {
    flakes.push(new Flake());
  }

  snow();
}



const onMouseMove = function (e: MouseEvent) {
  mX = e.clientX;
  mY = e.clientY;
};

const onResize = function () {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
  if (!canvas.value) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  isMounded = true;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);
  init();
});

onBeforeUnmount(() => {
  isMounded = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
