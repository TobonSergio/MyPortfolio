document.addEventListener("DOMContentLoaded", function () {
  const frase = document.getElementById("frase");

  // Verifica si existe el elemento
  if (!frase) return;

  const texto = frase.textContent;
  frase.innerHTML = "";

  for (let letra of texto) {
    const span = document.createElement("span");
    span.textContent = letra;
    span.classList.add("letra");
    frase.appendChild(span);
  }

  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    if (cursor) {
cursor.style.left = `${cursorX}px`;
cursor.style.top = `${cursorY}px`;

    }

    const letras = document.querySelectorAll("#frase span");

    letras.forEach(letra => {
      const rect = letra.getBoundingClientRect();
      const letraX = rect.left + rect.width / 2;
      const letraY = rect.top + rect.height / 2;

      const distancia = Math.hypot(cursorX - letraX, cursorY - letraY);

      if (distancia < 60) {
        letra.style.color = "#03a02d";
      } else {
        letra.style.color = "";
      }
    });
  });
});
