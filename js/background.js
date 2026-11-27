// =================================================================
// FONDO ANIMADO DE ESTRELLAS (canvas)
// - Nítido en pantallas retina (devicePixelRatio).
// - Las estrellas nunca quedan atrapadas fuera del canvas.
// - En móvil no se regeneran cuando la barra del navegador cambia el alto.
// - Respeta prefers-reduced-motion (dibuja un fondo estático).
// =================================================================
(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const colores = ["#ffffff", "#62e000", "#51533c", "#9acd32", "#bada55"];
  const COLOR_FONDO = "#181818";
  const RADIO_REPULSION = 100;
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  let ancho = 0;
  let alto = 0;
  let estrellas = [];
  let cursorX = -9999;
  let cursorY = -9999;
  let animacionId = null;

  const cantidadEstrellas = () => (ancho < 768 ? 50 : 100);

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = Math.round(ancho * dpr);
    canvas.height = Math.round(alto * dpr);
    canvas.style.width = `${ancho}px`;
    canvas.style.height = `${alto}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function crearEstrellas() {
    estrellas = Array.from({ length: cantidadEstrellas() }, () => ({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      radio: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: colores[Math.floor(Math.random() * colores.length)]
    }));
  }

  function actualizarEstrella(e) {
    const distX = e.x - cursorX;
    const distY = e.y - cursorY;
    const distancia = Math.hypot(distX, distY);

    if (distancia < RADIO_REPULSION && distancia > 0) {
      const fuerza = (RADIO_REPULSION - distancia) / RADIO_REPULSION;
      e.x += (distX / distancia) * fuerza * 2;
      e.y += (distY / distancia) * fuerza * 2;
    } else {
      e.x += e.dx;
      e.y += e.dy;
    }

    // Rebote: se fija la posición dentro del canvas y la velocidad
    // apunta hacia dentro, así la estrella no queda oscilando fuera.
    if (e.x <= 0) { e.x = 0; e.dx = Math.abs(e.dx); }
    else if (e.x >= ancho) { e.x = ancho; e.dx = -Math.abs(e.dx); }
    if (e.y <= 0) { e.y = 0; e.dy = Math.abs(e.dy); }
    else if (e.y >= alto) { e.y = alto; e.dy = -Math.abs(e.dy); }
  }

  function dibujar() {
    ctx.fillStyle = COLOR_FONDO;
    ctx.fillRect(0, 0, ancho, alto);

    for (const e of estrellas) {
      ctx.beginPath();
      ctx.fillStyle = e.color;
      ctx.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animar() {
    estrellas.forEach(actualizarEstrella);
    dibujar();
    animacionId = requestAnimationFrame(animar);
  }

  function iniciar() {
    cancelAnimationFrame(animacionId);
    if (reducirMovimiento.matches) {
      dibujar(); // fondo estático
    } else {
      animar();
    }
  }

  window.addEventListener(
    "pointermove",
    (ev) => {
      if (ev.pointerType !== "mouse") return;
      cursorX = ev.clientX;
      cursorY = ev.clientY;
    },
    { passive: true }
  );

  // En móvil la barra de direcciones cambia el alto al hacer scroll:
  // solo se regeneran las estrellas si cambia el ANCHO.
  let temporizador;
  window.addEventListener("resize", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      const anchoAnterior = ancho;
      redimensionar();
      if (ancho !== anchoAnterior) crearEstrellas();
      if (reducirMovimiento.matches) dibujar();
    }, 150);
  });

  reducirMovimiento.addEventListener?.("change", iniciar);

  redimensionar();
  crearEstrellas();
  iniciar();
})();
