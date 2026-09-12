document.addEventListener("DOMContentLoaded", () => {
  // =================================================================
  // UTILIDADES
  // =================================================================

  /**
   * Verifica si un enlace es válido y utilizable.
   * Se considera inválido: undefined, null, "", "#" o solo espacios.
   * @param {string} url
   * @returns {boolean}
   */
  const esEnlaceValido = (url) =>
    Boolean(url) && url.trim() !== "" && url.trim() !== "#";

  // =================================================================
  // 1. NAVBAR SCROLL HIDE/SHOW
  // =================================================================
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

  // =================================================================
  // 2. PROYECTOS (render dinámico)
  // -----------------------------------------------------------------
  // Modelo de datos de cada proyecto:
  //   id           -> identificador único (string)
  //   nombre       -> título visible del proyecto
  //   problema     -> necesidad o situación que el proyecto resuelve
  //   solucion     -> cómo se resuelve / qué hace el proyecto
  //   rol          -> tu rol real dentro del proyecto
  //   tecnologias  -> array de strings con las tecnologías usadas
  //   imagen       -> ruta relativa a la carpeta img/ (ej: "img/proyecto-1.jpeg")
  //   enlaceDemo   -> URL de la demo (Vercel/Netlify) o "" si no hay
  //   enlaceRepo   -> URL del repositorio de GitHub o "" si no aplica
  // =================================================================
  const proyectos = [
    // ---------------- PROYECTO 1 ----------------
    // TODO: Reemplazar con datos reales
    {
      id: "proyecto-1",
      nombre: "Nombre del proyecto 1", // TODO: Reemplazar con datos reales
      problema: "Describe aquí el problema o necesidad que resuelve el proyecto.", // TODO: Reemplazar con datos reales
      solucion: "Describe aquí la solución que implementaste.", // TODO: Reemplazar con datos reales
      rol: "Desarrollador Frontend", // TODO: Reemplazar con tu rol real
      tecnologias: ["HTML", "CSS", "JavaScript"], // TODO: Reemplazar con datos reales
      imagen: "img/proyecto-1.jpeg", // Único asset existente; cámbialo por tu captura real
      enlaceDemo: "", // TODO: pegar URL de la demo o dejar ""
      enlaceRepo: "" // TODO: pegar URL del repo o dejar ""
    },
    // ---------------- PROYECTO 2 ----------------
    // TODO: Reemplazar con datos reales
    {
      id: "proyecto-2",
      nombre: "Nombre del proyecto 2", // TODO: Reemplazar con datos reales
      problema: "Describe aquí el problema o necesidad que resuelve el proyecto.", // TODO: Reemplazar con datos reales
      solucion: "Describe aquí la solución que implementaste.", // TODO: Reemplazar con datos reales
      rol: "Desarrollador Full Stack", // TODO: Reemplazar con tu rol real
      tecnologias: ["React", "Node.js", "MongoDB"], // TODO: Reemplazar con datos reales
      imagen: "", // TODO: añade la imagen en img/ y referencia aquí
      enlaceDemo: "", // TODO: pegar URL de la demo o dejar ""
      enlaceRepo: "" // TODO: pegar URL del repo o dejar ""
    },
    // ---------------- PROYECTO 3 ----------------
    // TODO: Reemplazar con datos reales
    {
      id: "proyecto-3",
      nombre: "Nombre del proyecto 3", // TODO: Reemplazar con datos reales
      problema: "Describe aquí el problema o necesidad que resuelve el proyecto.", // TODO: Reemplazar con datos reales
      solucion: "Describe aquí la solución que implementaste.", // TODO: Reemplazar con datos reales
      rol: "Desarrollador Backend", // TODO: Reemplazar con tu rol real
      tecnologias: ["Java", "Spring Boot", "PostgreSQL"], // TODO: Reemplazar con datos reales
      imagen: "", // TODO: añade la imagen en img/ y referencia aquí
      enlaceDemo: "", // TODO: pegar URL de la demo o dejar ""
      enlaceRepo: "" // TODO: pegar URL del repo o dejar ""
    }
  ];


  /**
   * Construye el HTML de la imagen del proyecto.
   * - Si no hay ruta válida, renderiza un placeholder (icono).
   * - Si la ruta es válida pero el archivo falla al cargar (onerror),
   *   también cae al placeholder. Así nunca se ven imágenes rotas.
   */
  const renderImagenProyecto = (proyecto) => {
    if (!esEnlaceValido(proyecto.imagen)) {
      return `<div class="card-img card-img-placeholder"></div>`;
    }
    return `
      <div class="card-img">
        <img src="${proyecto.imagen}" alt="Captura del proyecto ${proyecto.nombre}" loading="lazy"
             onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('card-img-placeholder');">
      </div>`;
  };

  /**
   * Construye los botones de acción (Demo / Repositorio).
   * Cada botón SÓLO se renderiza si su enlace es válido (lógica defensiva).
   * Si no hay ninguno, se muestra un aviso en su lugar.
   */
  const renderAccionesProyecto = (proyecto) => {
    let html = `<div class="acciones-proyecto">`;

    if (esEnlaceValido(proyecto.enlaceDemo)) {
      html += `
        <a class="btn-proyecto btn-demo" href="${proyecto.enlaceDemo}" target="_blank" rel="noopener noreferrer">
          Ver demo <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>`;
    }

    if (esEnlaceValido(proyecto.enlaceRepo)) {
      html += `
        <a class="btn-proyecto btn-repo" href="${proyecto.enlaceRepo}" target="_blank" rel="noopener noreferrer">
          Ver código <i class="fa-brands fa-github"></i>
        </a>`;
    }

    if (!esEnlaceValido(proyecto.enlaceDemo) && !esEnlaceValido(proyecto.enlaceRepo)) {
      html += `<span class="acciones-vacio">Enlaces próximamente</span>`;
    }

    html += `</div>`;
    return html;
  };

  /**
   * Pinta las tarjetas de proyectos en el contenedor #projectGrid.
   */
  const renderProyectos = () => {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;

    grid.innerHTML = "";

    proyectos.forEach((proyecto) => {
      const col = document.createElement("div");
      col.className = "col";

      const card = document.createElement("div");
      card.className = "card-proyecto";

      card.innerHTML = `
        ${renderImagenProyecto(proyecto)}
        <div class="card-contenido">
          <h3 class="titulo-proyecto">${proyecto.nombre}</h3>
          <div class="detalle-proyecto">
            <p class="problema-proyecto">
              <span class="etiqueta-detalle">Problema:</span> ${proyecto.problema}
            </p>
            <p class="solucion-proyecto">
              <span class="etiqueta-detalle">Solución:</span> ${proyecto.solucion}
            </p>
            <p class="rol-proyecto">
              <span class="etiqueta-detalle">Mi rol:</span> ${proyecto.rol}
            </p>
          </div>
          <div class="herramientas-proyecto">
            ${proyecto.tecnologias.map((tool) => `<span>${tool}</span>`).join("")}
          </div>
          ${renderAccionesProyecto(proyecto)}
        </div>
      `;

      col.appendChild(card);
      grid.appendChild(col);
    });
  };

  renderProyectos();
});

