document.addEventListener("DOMContentLoaded", () => {
  const servicios = [
    {
      titulo: "Desarrollo Web",
      descripcion: "Creación de sitios y aplicaciones modernas, responsivas y optimizadas para SEO.",
      imagen: "img/web-dev.png"
    },
    {
      titulo: "Consultoría Técnica",
      descripcion: "Asesoría en arquitectura de software, mejora de rendimiento y selección de tecnologías.",
      imagen: "img/consultoria.png"
    },
    {
      titulo: "Soporte y Mantenimiento",
      descripcion: "Actualización, soporte y mantenimiento de proyectos existentes.",
      imagen: "img/soporte.png"
    }
  ];

  const grid = document.getElementById("gridServicios");

  servicios.forEach(servicio => {
    const card = document.createElement("div");
    card.className = "card-servicio";

    card.innerHTML = `
      <div class="imagen-servicio">
        <img src="${servicio.imagen}" alt="${servicio.titulo}">
      </div>
      <h4 class="titulo-servicio">${servicio.titulo}</h4>
      <p class="descripcion-servicio">${servicio.descripcion}</p>
    `;

    grid.appendChild(card);
  });
});
