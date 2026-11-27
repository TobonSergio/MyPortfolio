# Portafolio - Sergio Steban Tobon Montoya

Bienvenido al repositorio de mi portafolio profesional. Aquí destaco mi experiencia, proyectos y habilidades como Desarrollador de Software.

## 🚀 Sobre Mí
Soy Sergio, un apasionado desarrollador de software enfocado en construir soluciones web funcionales, eficientes y centradas en el usuario.

## 🛠️ Tecnologías Utilizadas
- **HTML semántico** con `<details>` y la API `popover` nativos.
- **CSS** sin frameworks: tokens de diseño, Grid, `clamp()`, `:has()`, `light-dark()`.
- **JavaScript** sin dependencias ni paso de compilación.
- **Formspree** para el formulario de contacto.
- Fuentes propias [Bricolage Grotesque](fonts/LICENSE-bricolage-grotesque.txt) y [Source Sans 3](fonts/LICENSE-source-sans-3.txt) (licencia OFL).

## 🔗 Demo
[https://tobonsergio.github.io/MyPortfolio/](https://tobonsergio.github.io/MyPortfolio/)

## 📂 Estructura del Proyecto
- `index.html`: todo el contenido.
- `/css`
  - `tokens.css`: colores (claro y oscuro), tipografía, espacios y radios.
  - `base.css`: reinicio, tipografía, foco y utilidades.
  - `componentes.css`: cabecera, botones, etiquetas, desplegables y formulario.
  - `secciones.css`: diseño de cada sección.
- `/js`
  - `tema.js`: cambio entre tema claro y oscuro.
  - `navegacion.js`: menú adaptable y sección activa.
  - `contacto.js`: validación y envío del formulario.
- `/img`: capturas, logos (`/tech`), imágenes de proyectos (`/proyectos`), favicon e imagen para redes (`og.jpg`).
- `/fonts`: tipografías.
- `/pdf`: hoja de vida descargable.

La página funciona sin JavaScript; los scripts solo añaden mejoras.

## ✏️ Cómo actualizar el contenido

**Agregar un proyecto:** en `index.html`, copia un `<article class="caso">` de la sección `#proyectos`, cambia su `id`, textos, tecnologías y enlaces. Elimina el botón de demo o repositorio si no existe. Para un botón de código:

```html
<a class="boton" href="URL_DEL_REPOSITORIO" target="_blank" rel="noopener noreferrer">
    <svg class="icono" aria-hidden="true"><use href="#i-github"></use></svg>
    Ver código
</a>
```

Usa imágenes WebP e indica siempre `width`, `height` y `alt`. Si la imagen no es un logotipo cuadrado, ajusta `.caso__imagen` en `css/secciones.css`.

**Agregar una tecnología:** añade el logo (96×96, WebP) en `img/tech/` y un `<li>` en su grupo. Si debe aparecer en el diagrama de la portada, agrégala también en la capa correspondiente.

**Cambiar colores:** edita las variables `--claro-*` y `--oscuro-*` en `css/tokens.css` y comprueba que el contraste siga en 4.5:1 para texto. Si cambias el fondo, actualízalo también en `js/tema.js` y en las etiquetas `theme-color` de `index.html`.

## ⚙️ Guía para ejecutar en local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/TobonSergio/MyPortfolio.git
   ```
2. Accede al directorio:
   ```bash
   cd MyPortfolio
   ```
3. Usa un servidor local como **Live Server** en VS Code. Abrir `index.html` directamente también funciona, aunque la consola mostrará avisos por la precarga de fuentes.

## 📬 Contacto
- **Email:** tobonsergio22@gmail.com
- **LinkedIn:** [https://linkedin.com/in/sergio-tbn](https://linkedin.com/in/sergio-tbn)
- **GitHub:** [https://github.com/TobonSergio](https://github.com/TobonSergio)

---

⭐ Si te ha servido o gustado el repositorio, no dudes en dejar una estrella.
