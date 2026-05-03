// background.js

let cursorX = 0;
let cursorY = 0;

// Crear canvas y agregarlo al body
const canvas = document.createElement("canvas");
canvas.id = "bgCanvas";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
let width, height;
let stars = [];
const starCount = 100;

const colors = ["#ffffff", "#62e000", "#51533c", "#9acd32", "#bada55"];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#181818ff";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    // Distancia del cursor a la estrella
    const dx = star.x - cursorX;
    const dy = star.y - cursorY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      // Efecto de repulsión
      const angle = Math.atan2(dy, dx);
      const force = (100 - dist) / 100;
      star.x += Math.cos(angle) * force * 2;
      star.y += Math.sin(angle) * force * 2;
    } else {
      // Movimiento natural
      star.x += star.dx;
      star.y += star.dy;
    }

    // Rebote en bordes
    if (star.x < 0 || star.x > width) star.dx *= -1;
    if (star.y < 0 || star.y > height) star.dy *= -1;

    // Dibujar estrella
    ctx.beginPath();
    ctx.fillStyle = star.color;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

window.addEventListener("mousemove", e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

window.addEventListener("resize", () => {
  resize();
  createStars();
});

resize();
createStars();
draw();
