# Santiago Pabón — Portafolio

Portafolio profesional de una sola página construido con **HTML5, CSS3 y JavaScript puro (Vanilla JS)**, sin frameworks ni librerías externas.

🔗 **Demo:** publícalo con GitHub Pages (instrucciones abajo).

## ✨ Características

- HTML semántico y accesible (roles ARIA, foco visible, `alt` descriptivos).
- Diseño responsive: móvil, tablet y escritorio.
- Modo claro / oscuro con persistencia en `localStorage`.
- Navbar fija con menú hamburguesa animado en móvil.
- Scroll suave entre secciones.
- Animaciones de entrada al hacer scroll con `IntersectionObserver` (sin librerías).
- Botón "volver arriba".
- Sistema de diseño basado en variables CSS (`:root`), Flexbox y Grid.
- Código limpio, comentado y organizado por módulos.

## 📁 Estructura del proyecto

```
/portfolio
│── index.html
│── css/
│     style.css
│── js/
│     script.js
│── assets/
│     images/        → capturas de proyectos y avatar (SVG livianos)
│     icons/          → iconografía de UI y redes (SVG)
│── README.md
```

## 🚀 Cómo publicarlo en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `portfolio`).
2. Sube todo el contenido de esta carpeta a la rama `main`.
3. Ve a **Settings → Pages**.
4. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda. En unos minutos tu sitio estará disponible en:
   `https://<tu-usuario>.github.io/portfolio/`

## 🛠️ Personalización rápida

| Qué cambiar              | Dónde                                  |
|---------------------------|-----------------------------------------|
| Foto/avatar                | `assets/images/avatar.svg` (o reemplázalo por una foto real) |
| Enlaces de proyectos       | Atributos `href` en las tarjetas de `#proyectos` dentro de `index.html` |
| Redes y contacto           | Sección `#contacto` en `index.html` |
| Colores y tipografías      | Variables en `:root` y `.dark-mode` dentro de `css/style.css` |

## 🧩 Tecnologías mostradas

Python · JavaScript · HTML · CSS · MySQL · Git · GitHub · Linux · Scrum

---

© Santiago Pabon. Proyecto de portafolio personal.
