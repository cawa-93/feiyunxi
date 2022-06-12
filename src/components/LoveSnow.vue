<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  path: string[],
  color: string
}>();

interface Flake {
  x: number,
  y: number,
  size: number,
  speed: number,
  velY: number,
  velX: number,
  opacity: number,
  stepSize: number,
  step: number
  rotation: number
  rotationDirection: 1 | -1
}

let flakes: Flake[] = [];
let canvas = ref<HTMLCanvasElement | undefined>();
let ctx: CanvasRenderingContext2D | null = null;
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
    let flake = flakes[i],
      x = mX,
      y = mY,
      minDist = 150,
      x2 = flake.x,
      y2 = flake.y;

    let dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

    if (dist < minDist) {
      let force = minDist / (dist * dist),
        xcomp = (x - x2) / dist,
        ycomp = (y - y2) / dist,
        deltaV = force / 2;

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

    if (flake.y >= canvas.value.height || flake.y <= -canvas.value.height) {
      reset(flake);
    }

    if (flake.x >= canvas.value.width || flake.x <= -50) {
      reset(flake);
    }

    flake.rotation += flake.speed * flake.rotationDirection;

    const path2 = new Path2D();
    let m = new DOMMatrix(`translate(${flake.x}px,${flake.y}px) scale(${2 / flake.size}) rotate(${flake.rotation}deg)`);
    path2.addPath(p, m);
    ctx.fill(path2);
  }

  if (isMounded && canvas.value) requestAnimationFrame(snow);
}



function reset(flake: Flake) {
  if (!canvas.value) return;

  flake.x = Math.floor(Math.random() * canvas.value.width);
  flake.y = -50;
  flake.size = (Math.random() * 3) + 2;
  flake.speed = (Math.random()) + 0.5;
  flake.velY = flake.speed;
  flake.velX = 0;
  flake.opacity = (Math.random() * 0.5) + 0.3;
}



function init() {
  if (!canvas.value) return;

  ctx = canvas.value?.getContext('2d');

  for (let i = 0; i < flakeCount; i++) {
    let x = Math.floor(Math.random() * canvas.value.width);
    let y = Math.floor(Math.random() * canvas.value.height) - canvas.value.height;
    let size = (Math.random() * 3) + 2;
    let speed = (Math.random()) + 0.5;
    let opacity = (Math.random() * 0.5) + 0.3;

    flakes.push({
      speed: speed,
      velY: speed,
      velX: 0,
      x: x,
      y: y,
      size: size,
      stepSize: (Math.random()) / 30,
      step: 0,
      opacity: opacity,
      rotation: Math.random() * 360,
      rotationDirection: Math.random() >= 0.5 ? 1 : -1,
    });
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
