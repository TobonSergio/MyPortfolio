// =================================================================
// EFECTO "LETRA POR LETRA" EN LA FRASE DE SOBRE MÍ
// - Las letras cercanas al cursor se iluminan en verde.
// - Solo trabaja mientras la frase está visible (IntersectionObserver)
//   y una vez por frame (requestAnimationFrame), evitando recálculos
//   de layout en cada movimiento del mouse por toda la página.
// - Accesible: el lector de pantalla lee la frase completa, no letra a letra.
// =================================================================
(() => {
  const frase = document.getElementById("frase");
  if (!frase) return;

  const texto = frase.textContent.replace(/\s+/g, " ").trim();
  frase.setAttribute("aria-label", texto);
  frase.textContent = "";

  // Se agrupan las letras por palabra para que no se corten al hacer wrap.
  const fragmento = document.createDocumentFragment();
  texto.split(" ").forEach((palabra, i, palabras) => {
    const spanPalabra = document.createElement("span");
    spanPalabra.className = "palabra";
    spanPalabra.setAttribute("aria-hidden", "true");
    for (const letra of palabra) {
      const span = document.createElement("span");
      span.className = "letra";
      span.textContent = letra;
      spanPalabra.appendChild(span);
    }
    fragmento.appendChild(spanPalabra);
    if (i < palabras.length - 1) fragmento.appendChild(document.createTextNode(" "));
  });
  frase.appendChild(fragmento);

  // En táctil o con movimiento reducido solo se deja el texto.
  const punteroPreciso = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!punteroPreciso || reducirMovimiento) return;

  const letras = Array.from(frase.querySelectorAll(".letra"));
  const DISTANCIA = 60;
  let visible = false;
  let pendiente = false;
  let mouseX = 0;
  let mouseY = 0;

  const actualizar = () => {
    pendiente = false;
    for (const letra of letras) {
      const r = letra.getBoundingClientRect();
      const cerca = Math.hypot(mouseX - (r.left + r.width / 2), mouseY - (r.top + r.height / 2)) < DISTANCIA;
      letra.classList.toggle("iluminada", cerca);
    }
  };

  new IntersectionObserver(([entrada]) => {
    visible = entrada.isIntersecting;
    if (!visible) letras.forEach((l) => l.classList.remove("iluminada"));
  }).observe(frase);

  document.addEventListener(
    "pointermove",
    (e) => {
      if (!visible) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
      }
    },
    { passive: true }
  );
})();
