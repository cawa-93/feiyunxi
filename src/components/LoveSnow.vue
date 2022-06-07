<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const svg = ref();
let flakes = [];
let canvas = ref<HTMLCanvasElement | undefined>();
let ctx = null;
let flakeCount = 100;
let mX = -100;
let mY = -100;


let isMounded = false;

let p = new Path2D('M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z');



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

    var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
      dx = x2 - x,
      dy = y2 - y;

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

    // https://abs-0.twimg.com/emoji/v2/svg/2764.svg
    // image.height = flake.size * 2
    // image.width = flake.size * 2
    // ctx.drawImage(image, flake.x, flake.y, flake.size * 2, flake.size * 2 )
    ctx.fillStyle = 'rgba(221,46,68,' + flake.opacity + ')';
    flake.y += flake.velY;
    flake.x += flake.velX;

    if (flake.y >= canvas.value.height || flake.y <= 0) {
      reset(flake);
    }

    if (flake.x >= canvas.value.width || flake.x <= 0) {
      reset(flake);
    }

    const path2 = new Path2D();
    let m = new DOMMatrix(`translate(${flake.x}px,${flake.y}px) scale(${2 / flake.size})`);
    path2.moveTo(flake.x, flake.y);
    path2.addPath(p, m);
    ctx.fill(path2);
  }

  if (isMounded) requestAnimationFrame(snow);
};



function reset(flake) {
  flake.x = Math.floor(Math.random() * canvas.value.width);
  flake.y = 0;
  flake.size = (Math.random() * 3) + 2;
  flake.speed = (Math.random() * 1) + 0.5;
  flake.velY = flake.speed;
  flake.velX = 0;
  flake.opacity = (Math.random() * 0.5) + 0.3;
}



function init() {
  ctx = canvas.value?.getContext('2d');

  for (var i = 0; i < flakeCount; i++) {
    var x = Math.floor(Math.random() * canvas.value.width),
      y = Math.floor(Math.random() * canvas.value.height),
      size = (Math.random() * 3) + 2,
      speed = (Math.random() * 1) + 0.5,
      opacity = (Math.random() * 0.5) + 0.3;

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
