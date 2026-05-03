document.addEventListener("DOMContentLoaded", () => {
  // === NAVBAR SCROLL HIDE/SHOW ===
  const navbar = document.getElementById("navbar");
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  navbar.style.transition = "top 0.3s ease";

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop && currentScroll > 50) {
      navbar.style.top = "-100px";
    } else {
      navbar.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // === CARGA DINÁMICA DE PROYECTOS ===
const proyectos = [
  {
    nombre: "Gestor de Tareas",
    herramientas: ["JavaScript", "HTML", "CSS"],
    descripcion: "App para gestionar tareas de forma dinámica, con opción de crear, editar y eliminar.",
    enlace: "https://tusitio.com/proyecto-tareas",
    imagen: "../img/proyecto-1.jpeg"
  },
  {
    nombre: "API de Productos",
    herramientas: ["Node.js", "Express", "MongoDB"],
    descripcion: "Una API RESTful con CRUD para productos, conectada a una base de datos MongoDB.",
    enlace: "https://github.com/usuario/api-productos",
    imagen: "assets/img/api-productos.png"
  },
  {
    nombre: "Portafolio Personal",
    herramientas: ["Bootstrap", "HTML", "CSS", "JavaScript"],
    descripcion: "Sitio responsivo que muestra tu perfil, habilidades, educación y contacto.",
    enlace: "https://tusitio.com/portafolio",
    imagen: "assets/img/portafolio.png"
  }
];


  const grid = document.getElementById("projectGrid");

  if (grid) {
    proyectos.forEach(proyecto => {
      const col = document.createElement("div");
      col.className = "col";

      const card = document.createElement("a");
      card.href = proyecto.enlace;
      card.target = "_blank";
      card.className = "card-proyecto";

      card.innerHTML = `
        <div class="card-img">
          <img src="${proyecto.imagen}" alt="Imagen de ${proyecto.nombre}">
        </div>
        <div class="card-contenido">
          <h3 class="titulo-proyecto">${proyecto.nombre}</h3>
          <p class="descripcion-proyecto">${proyecto.descripcion}</p>
          <div class="herramientas-proyecto">
            ${proyecto.herramientas.map(tool => `<span>${tool}</span>`).join("")}
          </div>
        </div>
      `;

      col.appendChild(card);
      grid.appendChild(col);
    });
  }
});
