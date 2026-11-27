// =================================================================
// FORMULARIO DE CONTACTO (Formspree vía fetch)
// Envía sin salir de la página y muestra el resultado al usuario.
// Si JavaScript está deshabilitado, el formulario sigue funcionando
// con el envío HTML normal (action + method).
// =================================================================
(() => {
  const form = document.getElementById("form-contacto");
  const estado = document.getElementById("estado-formulario");
  if (!form || !estado) return;

  const boton = form.querySelector('button[type="submit"]');

  const mostrarEstado = (mensaje, tipo) => {
    estado.textContent = mensaje;
    estado.className = `estado-formulario ${tipo}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    boton.disabled = true;
    boton.textContent = "Enviando...";
    mostrarEstado("", "");

    try {
      const respuesta = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (respuesta.ok) {
        form.reset();
        mostrarEstado("¡Gracias! Tu mensaje fue enviado. Te responderé pronto.", "exito");
      } else {
        const datos = await respuesta.json().catch(() => ({}));
        const detalle = datos.errors?.map((err) => err.message).join(", ");
        mostrarEstado(detalle || "No se pudo enviar el mensaje. Inténtalo de nuevo.", "error");
      }
    } catch {
      mostrarEstado("Error de conexión. Revisa tu internet e inténtalo de nuevo.", "error");
    } finally {
      boton.disabled = false;
      boton.textContent = "Enviar mensaje";
    }
  });
})();
