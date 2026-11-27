// =================================================================
// NAVEGACIÓN
// 1. Muestra los enlaces en línea solo si caben (sin un corte fijo).
// 2. Cierra el menú desplegable al elegir un enlace.
// 3. Marca la sección visible con aria-current.
// Sin JavaScript queda el menú desplegable nativo.
// =================================================================
(() => {
  const cabecera = document.querySelector(".cabecera");
  const fila = cabecera?.querySelector(".cabecera__fila");
  const menu = document.getElementById("menu");
  if (!cabecera || !fila || !menu || !("popover" in HTMLElement.prototype)) return;

  // ---------- 1. En línea o desplegable ----------
  const ajustar = () => {
    const abierto = menu.matches(":popover-open");
    cabecera.classList.add("es-ancha");
    menu.removeAttribute("popover");

    if (fila.scrollWidth > fila.clientWidth) {
      cabecera.classList.remove("es-ancha");
      menu.setAttribute("popover", "auto");
      if (abierto) menu.showPopover();
    }
  };

  // Se vuelve a medir cuando cambia el ancho o terminan de cargar las fuentes
  let anchoAnterior = 0;
  new ResizeObserver(([entrada]) => {
    const ancho = Math.round(entrada.contentRect.width);
    if (ancho !== anchoAnterior) {
      anchoAnterior = ancho;
      requestAnimationFrame(ajustar);
    }
  }).observe(fila);
  document.fonts?.ready.then(ajustar);
  ajustar();

  // ---------- 2. Cerrar al navegar ----------
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a") && menu.matches("[popover]:popover-open")) menu.hidePopover();
  });
})();

(() => {
  // ---------- 3. Sección activa ----------
  const enlaces = Array.from(document.querySelectorAll('#menu a[href^="#"]'));
  const secciones = Array.from(document.querySelectorAll("main > section"));
  if (!enlaces.length || !secciones.length) return;

  let pendiente = false;

  const actualizar = () => {
    pendiente = false;
    const linea = window.innerHeight * 0.4;
    const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    // La activa es la última sección que ya cruzó la línea de referencia
    const activa = alFinal
      ? secciones.at(-1)
      : secciones.filter((s) => s.getBoundingClientRect().top <= linea).at(-1);

    enlaces.forEach((a) => {
      if (activa && a.hash === `#${activa.id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  const solicitar = () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(actualizar);
    }
  };

  window.addEventListener("scroll", solicitar, { passive: true });
  window.addEventListener("resize", solicitar);
  actualizar();
})();
