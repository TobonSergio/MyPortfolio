// =================================================================
// SERVICIOS (render dinámico)
// -----------------------------------------------------------------
// Cada servicio usa `icono` (clase de Font Awesome) en lugar de
// imágenes, para evitar rutas rotas y mantener una identidad visual
// consistente, ligera y escalable.
// =================================================================
(() => {
  const servicios = [
    {
      titulo: "Desarrollo Web",
      descripcion: "Creación de sitios y aplicaciones modernas, responsivas y optimizadas para SEO.",
      icono: "fa-solid fa-laptop-code"
    },
    {
      titulo: "Consultoría Técnica",
      descripcion: "Asesoría en arquitectura de software, mejora de rendimiento y selección de tecnologías.",
      icono: "fa-solid fa-screwdriver-wrench"
    },
    {
      titulo: "Soporte y Mantenimiento",
      descripcion: "Actualización, soporte y mantenimiento de proyectos existentes.",
      icono: "fa-solid fa-headset"
    }
  ];

  const grid = document.getElementById("gridServicios");
  if (!grid) return;

  const tarjetas = servicios.map((servicio) => {
    const card = document.createElement("article");
    card.className = "card-servicio";

    if (servicio.icono) {
      const contIcono = document.createElement("div");
      contIcono.className = "icono-servicio";
      const i = document.createElement("i");
      i.className = servicio.icono;
      i.setAttribute("aria-hidden", "true");
      contIcono.appendChild(i);
      card.appendChild(contIcono);
    }

    const titulo = document.createElement("h3");
    titulo.className = "titulo-servicio";
    titulo.textContent = servicio.titulo;

    const descripcion = document.createElement("p");
    descripcion.className = "descripcion-servicio";
    descripcion.textContent = servicio.descripcion;

    card.append(titulo, descripcion);
    return card;
  });

  grid.replaceChildren(...tarjetas);
})();
