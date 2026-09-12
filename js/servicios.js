document.addEventListener("DOMContentLoaded", () => {
  // =================================================================
  // SERVICIOS (render dinámico)
  // -----------------------------------------------------------------
  // Cada servicio usa `icono` (clase de FontAwesome) en lugar de
  // imágenes, para evitar rutas rotas y mantener una identidad visual
  // consistente, ligera y escalable. La librería FontAwesome ya está
  // cargada en el <head> del index.html.
  // =================================================================
  const servicios = [
    {
      titulo: "Desarrollo Web",
      descripcion:
        "Creación de sitios y aplicaciones modernas, responsivas y optimizadas para SEO.",
      icono: "fa-solid fa-laptop-code"
    },
    {
      titulo: "Consultoría Técnica",
      descripcion:
        "Asesoría en arquitectura de software, mejora de rendimiento y selección de tecnologías.",
      icono: "fa-solid fa-screwdriver-wrench"
    },
    {
      titulo: "Soporte y Mantenimiento",
      descripcion:
        "Actualización, soporte y mantenimiento de proyectos existentes.",
      icono: "fa-solid fa-headset"
    }
  ];

  /**
   * Pinta las tarjetas de servicios en el contenedor #gridServicios.
   * Lógica defensiva: si falta el icono, se omite su bloque sin romper
   * el resto de la tarjeta.
   */
  const grid = document.getElementById("gridServicios");
  if (!grid) return;

  grid.innerHTML = "";

  servicios.forEach((servicio) => {
    const card = document.createElement("div");
    card.className = "card-servicio";

    const iconoHTML = servicio.icono
      ? `<div class="icono-servicio"><i class="${servicio.icono}"></i></div>`
      : "";

    card.innerHTML = `
      ${iconoHTML}
      <h4 class="titulo-servicio">${servicio.titulo}</h4>
      <p class="descripcion-servicio">${servicio.descripcion}</p>
    `;

    grid.appendChild(card);
  });
});
