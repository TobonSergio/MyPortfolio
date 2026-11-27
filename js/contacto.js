// =================================================================
// FORMULARIO DE CONTACTO (Formspree vía fetch)
// - Errores junto a cada campo, anunciados a lectores de pantalla.
// - Envía sin salir de la página y muestra el resultado.
// Sin JavaScript funciona la validación y el envío HTML normal.
// =================================================================
(() => {
  const form = document.getElementById("form-contacto");
  const estado = document.getElementById("estado-formulario");
  if (!form || !estado) return;

  const boton = form.querySelector('button[type="submit"]');
  const campos = Array.from(form.querySelectorAll("[data-error]"));

  // ---------- Validación accesible ----------
  // Sincroniza aria-invalid y aria-describedby con lo que se ve (:user-invalid)
  const marcar = (campo, invalido) => {
    campo.setAttribute("aria-invalid", String(invalido));
    if (invalido) campo.setAttribute("aria-describedby", campo.dataset.error);
    else campo.removeAttribute("aria-describedby");
  };

  const sincronizar = (campo) => {
    const invalido = campo.matches(":user-invalid");
    const nuevo = invalido && campo.getAttribute("aria-invalid") !== "true";
    marcar(campo, invalido);
    // Al corregir, se borra el anuncio anterior para que no quede en la página
    if (!invalido && estado.classList.contains("solo-lector")) estado.textContent = "";
    if (nuevo) {
      const etiqueta = campo.labels[0].textContent.trim();
      const mensaje = document.getElementById(campo.dataset.error).textContent.replace(/\s+/g, " ").trim();
      estado.className = "formulario__estado solo-lector";
      estado.textContent = `${etiqueta}: ${mensaje}`;
    }
  };

  campos.forEach((campo) => {
    marcar(campo, false);
    campo.addEventListener("blur", () => sincronizar(campo));
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") sincronizar(campo);
    });
    // Intento de envío: se omite el globo del navegador y se enfoca el primer error
    campo.addEventListener("invalid", (e) => {
      e.preventDefault();
      marcar(campo, true);
      if (campo === campos.find((c) => !c.validity.valid)) campo.focus();
    });
  });

  // ---------- Envío ----------
  const mostrarEstado = (mensaje, tipo) => {
    estado.textContent = mensaje;
    estado.className = `formulario__estado ${tipo}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    boton.disabled = true;
    boton.textContent = "Enviando…";
    mostrarEstado("", "");

    try {
      const respuesta = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (respuesta.ok) {
        form.reset();
        campos.forEach((campo) => marcar(campo, false));
        mostrarEstado("¡Gracias! Tu mensaje fue enviado. Te responderé pronto.", "es-exito");
      } else {
        const datos = await respuesta.json().catch(() => ({}));
        const detalle = datos.errors?.map((err) => err.message).join(", ");
        mostrarEstado(
          detalle || "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme al correo.",
          "es-error"
        );
      }
    } catch {
      mostrarEstado("Error de conexión. Revisa tu internet e inténtalo de nuevo.", "es-error");
    } finally {
      boton.disabled = false;
      boton.textContent = "Enviar mensaje";
    }
  });
})();
