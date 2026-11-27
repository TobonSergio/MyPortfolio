// =================================================================
// BARRA DE PROGRESO DE SCROLL (vertical, a la derecha)
// =================================================================
(() => {
  const barra = document.querySelector(".scroll-progress-bar");
  if (!barra) return;

  let pendiente = false;

  const actualizar = () => {
    pendiente = false;
    const recorrido = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = recorrido > 0 ? (window.scrollY / recorrido) * 100 : 0;
    barra.style.height = `${Math.min(100, Math.max(0, progreso))}%`;
  };

  const solicitar = () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(actualizar);
    }
  };

  window.addEventListener("scroll", solicitar, { passive: true });
  window.addEventListener("resize", solicitar);
  window.addEventListener("load", actualizar);
  actualizar();
})();
