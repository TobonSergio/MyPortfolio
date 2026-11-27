// =================================================================
// CURSOR PERSONALIZADO
// Solo se crea en dispositivos con puntero preciso (mouse/trackpad).
// En pantallas táctiles no existe, así no queda un círculo fijo
// en la esquina superior izquierda.
// =================================================================
(() => {
  const punteroPreciso = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!punteroPreciso.matches) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  document.documentElement.classList.add("cursor-personalizado");

  document.addEventListener(
    "pointermove",
    (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      cursor.classList.add("visible");
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
  document.addEventListener("pointerdown", () => cursor.classList.add("active"));
  document.addEventListener("pointerup", () => cursor.classList.remove("active"));
})();
