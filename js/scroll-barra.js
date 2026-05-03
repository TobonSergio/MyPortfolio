document.addEventListener("DOMContentLoaded", function () {
  const scrollBar = document.querySelector('.scroll-progress-bar');

  if (!scrollBar) {
    console.warn("⚠️ No se encontró .scroll-progress-bar");
    return;
  }

  function updateScrollBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) {
      scrollBar.style.height = '0%';
      return;
    }

    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollBar.style.height = `${scrollPercent}%`;
  }

  // Actualiza al hacer scroll
  window.addEventListener('scroll', updateScrollBar);

  // Anima al cargar la página
  window.addEventListener('load', () => {
    setTimeout(updateScrollBar, 300); // leve delay para suavidad
  });
});
