// =================================================================
// TEMA CLARO / OSCURO
// Dos estados: "seguir al sistema" (nada guardado) o el contrario
// al del sistema (guardado). El CSS reacciona al <meta color-scheme>.
// =================================================================
(() => {
  const boton = document.getElementById("boton-tema");
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (!boton || !meta || !CSS.supports("color", "light-dark(white, black)")) return;

  const CLAVE = "color-scheme";
  const FONDOS = { light: "#FAFAFA", dark: "#111214" };
  const sistemaOscuro = window.matchMedia("(prefers-color-scheme: dark)");
  const metasColor = document.querySelectorAll('meta[name="theme-color"]');
  const temaSistema = () => (sistemaOscuro.matches ? "dark" : "light");

  const leer = () => {
    try {
      return localStorage.getItem(CLAVE);
    } catch {
      return null;
    }
  };

  const guardar = (valor) => {
    try {
      if (valor) localStorage.setItem(CLAVE, valor);
      else localStorage.removeItem(CLAVE);
    } catch {
      // Sin almacenamiento: el cambio dura mientras la página esté abierta.
    }
  };

  const aplicar = (valor) => {
    meta.content = valor ?? "light dark";
    // Color de la barra del navegador en móviles
    metasColor.forEach((m) => {
      const propio = m.media.includes("dark") ? "dark" : "light";
      m.content = FONDOS[valor ?? propio];
    });
  };

  boton.addEventListener("click", () => {
    const visible = meta.content === "light dark" ? temaSistema() : meta.content;
    const destino = visible === "dark" ? "light" : "dark";
    const valor = destino === temaSistema() ? null : destino;
    guardar(valor);
    aplicar(valor);
  });

  // Mantiene sincronizadas otras pestañas abiertas
  window.addEventListener("storage", (e) => {
    if (e.key === CLAVE || e.key === null) aplicar(leer());
  });

  aplicar(leer());
  boton.hidden = false;
})();
