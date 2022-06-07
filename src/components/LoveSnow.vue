<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  path: string[],
  color: string
}>();

let flakes = [];
let canvas = ref<HTMLCanvasElement | undefined>();
let ctx = null;
let flakeCount = 100;
let mX = -100;
let mY = -100;


let isMounded = false;

let p = new Path2D();
for (const string of props.path) {
  p.addPath(new Path2D(string));
}



function snow() {
  if (!canvas.value) {
    ctx = null;
    return;
  }
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  for (var i = 0; i < flakeCount; i++) {
    var flake = flakes[i],
      x = mX,
      y = mY,
      minDist = 150,
      x2 = flake.x,
      y2 = flake.y;

    var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

    if (dist < minDist) {
      var force = minDist / (dist * dist),
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

    const path2 = new Path2D();
    let m = new DOMMatrix(`translate(${flake.x}px,${flake.y}px) scale(${2 / flake.size})`);
    path2.addPath(p, m);
    ctx.fill(path2);
  }

  if (isMounded && canvas.value) requestAnimationFrame(snow);
};



function reset(flake) {
  flake.x = Math.floor(Math.random() * canvas.value.width);
  flake.y = -50;
  flake.size = (Math.random() * 3) + 2;
  flake.speed = (Math.random() * 1) + 0.5;
  flake.velY = flake.speed;
  flake.velX = 0;
  flake.opacity = (Math.random() * 0.5) + 0.3;
}



function init() {
  ctx = canvas.value?.getContext('2d');

  for (var i = 0; i < flakeCount; i++) {
    var x = Math.floor(Math.random() * canvas.value.width);
    var y = Math.floor(Math.random() * canvas.value.height) - canvas.value.height;
    var size = (Math.random() * 3) + 2;
    var speed = (Math.random() * 1) + 0.5;
    var opacity = (Math.random() * 0.5) + 0.3;

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
    });
  }

  snow();
};

const onMouseMove = function (e) {
  mX = e.clientX;
  mY = e.clientY;
};

const onResize = function () {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
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
