const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let target = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

// Touch support
canvas.addEventListener("touchmove", e => {
  target.x = e.touches[0].clientX;
  target.y = e.touches[0].clientY;
});

class Segment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const dragon = [];
const size = 45;

for (let i = 0; i < size; i++) {
  dragon.push(new Segment(target.x, target.y));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dragon[0].x += (target.x - dragon[0].x) * 0.08;
  dragon[0].y += (target.y - dragon[0].y) * 0.08;

  for (let i = 1; i < dragon.length; i++) {
    dragon[i].x += (dragon[i - 1].x - dragon[i].x) * 0.25;
    dragon[i].y += (dragon[i - 1].y - dragon[i].y) * 0.25;
  }

  ctx.beginPath();
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 3;

  for (let i = 0; i < dragon.length; i++) {
    ctx.lineTo(dragon[i].x, dragon[i].y);
  }
  ctx.stroke();

  requestAnimationFrame(draw);
}

draw();
