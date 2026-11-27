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
  typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

/**
 * Crea un elemento con clase y texto opcionales (sin innerHTML,
 * así el contenido nunca se interpreta como HTML).
 */
const crearElemento = (etiqueta, clase, texto) => {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
};

// =================================================================
// 1. NAVBAR: ocultar al bajar, mostrar al subir
// =================================================================
(() => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let ultimoScroll = window.scrollY;
  let pendiente = false;

  const actualizar = () => {
    pendiente = false;
    const actual = window.scrollY;
    const menuAbierto = navbar.querySelector(".navbar-collapse.show");
    const ocultar = actual > ultimoScroll && actual > 80 && !menuAbierto;
    navbar.classList.toggle("navbar-oculto", ocultar);
    navbar.classList.toggle("navbar-scrolled", actual > 10);
    ultimoScroll = Math.max(actual, 0);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
      }
    },
    { passive: true }
  );
})();

// =================================================================
// 2. NAVBAR: cerrar menú móvil al elegir un enlace
// =================================================================
(() => {
  const menu = document.getElementById("navbarNav");
  if (!menu) return;

  menu.querySelectorAll(".nav-link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (menu.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();

// =================================================================
// 3. NAVBAR: resaltar el enlace de la sección visible
// =================================================================
(() => {
  const enlaces = document.querySelectorAll('#navbar .nav-link[href^="#"]');
  const secciones = Array.from(enlaces)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!secciones.length) return;

  const marcarActivo = (id) => {
    enlaces.forEach((a) => {
      const activo = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", activo);
      if (activo) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  // Una sección cuenta como "activa" cuando cruza la franja central de la pantalla.
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) marcarActivo(e.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secciones.forEach((s) => observador.observe(s));
})();

// =================================================================
// 4. PROYECTOS (render dinámico)
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
  // TODO: Reemplazar con datos reales
  {
    id: "proyecto-1",
    nombre: "Nombre del proyecto 1",
    problema: "Describe aquí el problema o necesidad que resuelve el proyecto.",
    solucion: "Describe aquí la solución que implementaste.",
    rol: "Desarrollador Frontend",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagen: "img/proyecto-1.jpeg",
    enlaceDemo: "",
    enlaceRepo: ""
  },
  // TODO: Reemplazar con datos reales
  {
    id: "proyecto-2",
    nombre: "BasketStats",
    problema: "Consultar y comparar métricas de la NBA dispersas dificulta evaluar rendimientos y proyectar resultados con rapidez.",
    solucion: "Implementé una app web con Supabase que centraliza y estructura estadísticas de jugadores y equipos para facilitar el análisis y pronóstico.",
    rol: "Ingeniero QA",
    tecnologias: ["React", "Node.js", "MongoDB"],
    imagen: "img/logo_basket_stats.jpeg",
    enlaceDemo: "https://stastbasketballfrontend.vercel.app/",
    enlaceRepo: ""
  },
  // TODO: Reemplazar con datos reales
  {
    id: "proyecto-3",
    nombre: "Nombre del proyecto 3",
    problema: "Describe aquí el problema o necesidad que resuelve el proyecto.",
    solucion: "Describe aquí la solución que implementaste.",
    rol: "Desarrollador Backend",
    tecnologias: ["Java", "Spring Boot", "PostgreSQL"],
    imagen: "",
    enlaceDemo: "",
    enlaceRepo: ""
  }
];

/**
 * Imagen del proyecto. Si no hay ruta o el archivo falla al cargar,
 * se muestra un placeholder (nunca se ven imágenes rotas).
 */
const crearImagenProyecto = (proyecto) => {
  const contenedor = crearElemento("div", "card-img");

  if (!esEnlaceValido(proyecto.imagen)) {
    contenedor.classList.add("card-img-placeholder");
    return contenedor;
  }

  const img = document.createElement("img");
  img.src = proyecto.imagen;
  img.alt = `Captura del proyecto ${proyecto.nombre}`;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener(
    "error",
    () => {
      img.remove();
      contenedor.classList.add("card-img-placeholder");
    },
    { once: true }
  );
  contenedor.appendChild(img);
  return contenedor;
};

const crearBoton = (clase, href, texto, icono) => {
  const a = crearElemento("a", `btn-proyecto ${clase}`, `${texto} `);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  const i = crearElemento("i", icono);
  i.setAttribute("aria-hidden", "true");
  a.appendChild(i);
  return a;
};

/** Botones Demo / Repositorio: solo se renderizan si el enlace es válido. */
const crearAccionesProyecto = (proyecto) => {
  const acciones = crearElemento("div", "acciones-proyecto");

  if (esEnlaceValido(proyecto.enlaceDemo)) {
    acciones.appendChild(
      crearBoton("btn-demo", proyecto.enlaceDemo, "Ver demo", "fa-solid fa-arrow-up-right-from-square")
    );
  }
  if (esEnlaceValido(proyecto.enlaceRepo)) {
    acciones.appendChild(crearBoton("btn-repo", proyecto.enlaceRepo, "Ver código", "fa-brands fa-github"));
  }
  if (!acciones.children.length) {
    acciones.appendChild(crearElemento("span", "acciones-vacio", "Enlaces próximamente"));
  }
  return acciones;
};

const crearDetalle = (clase, etiqueta, texto) => {
  const p = crearElemento("p", clase);
  p.append(crearElemento("span", "etiqueta-detalle", `${etiqueta}:`), ` ${texto}`);
  return p;
};

const crearTarjetaProyecto = (proyecto) => {
  const card = crearElemento("article", "card-proyecto");
  card.id = proyecto.id;

  const contenido = crearElemento("div", "card-contenido");
  contenido.appendChild(crearElemento("h3", "titulo-proyecto", proyecto.nombre));

  const detalle = crearElemento("div", "detalle-proyecto");
  detalle.append(
    crearDetalle("problema-proyecto", "Problema", proyecto.problema),
    crearDetalle("solucion-proyecto", "Solución", proyecto.solucion),
    crearDetalle("rol-proyecto", "Mi rol", proyecto.rol)
  );
  contenido.appendChild(detalle);

  const herramientas = crearElemento("ul", "herramientas-proyecto");
  herramientas.setAttribute("aria-label", "Tecnologías");
  proyecto.tecnologias.forEach((t) => herramientas.appendChild(crearElemento("li", "", t)));
  contenido.appendChild(herramientas);

  contenido.appendChild(crearAccionesProyecto(proyecto));
  card.append(crearImagenProyecto(proyecto), contenido);
  return card;
};

(() => {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.replaceChildren(...proyectos.map(crearTarjetaProyecto));
})();
