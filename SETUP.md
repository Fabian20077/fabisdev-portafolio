# 📋 Guía de Configuración - Fabisdev Portfolio v2

## 🚀 Instalación Inicial

### 1. **Instalar dependencias**

```bash
npm install
```

Esto instalará:
- `tailwindcss` - Framework CSS moderno
- `postcss` - Procesador CSS
- `autoprefixer` - Prefijes automáticos
- `@tailwindcss/forms` - Estilos mejorados de formularios

### 2. **Estructura del Proyecto**

```
Portafolio Fabis-dev/
├── src/
│   ├── styles/
│   │   └── globals.css        ← Sistema de diseño con Tailwind
│   ├── js/
│   │   ├── main.js            ← Entry point
│   │   ├── modules/           ← Módulos de funcionalidad
│   │   │   ├── hero.js
│   │   │   ├── projects.js
│   │   │   ├── modals.js
│   │   │   ├── forms.js
│   │   │   └── scrollAnimations.js
│   │   └── utils/             ← Funciones compartidas
│   │       ├── logger.js
│   │       └── helpers.js
│   └── components/            ← Componentes HTML reutilizables
├── public/
│   ├── assets/               ← Imágenes, iconos, videos
│   └── documents/            ← CV, certificados en PDF
├── index.html                ← HTML principal
├── tailwind.config.js        ← Configuración Tailwind
├── postcss.config.js         ← Configuración PostCSS
└── package.json              ← Dependencias del proyecto
```

## 🛠️ Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con watch de Tailwind CSS.

### Compilar para producción
```bash
npm run build
```
Compila y minifica los estilos de Tailwind.

### Verificar estilos
```bash
npm run tailwind:watch
```
Solo compila Tailwind CSS (sin servidor).

### Preview
```bash
npm run preview
```
Abre un servidor HTTP simple para previsualizar.

---

## 🎨 Sistema de Diseño

### Colores Disponibles

| Variable | Valor | Uso |
|----------|-------|-----|
| `primary` | `#0284c7` | Color principal (azul profundo) |
| `primary-light` | `#0ea5e9` | Variante clara |
| `primary-dark` | `#075985` | Variante oscura |
| `accent` | `#10b981` | Color de énfasis (verde) |
| `bg-dark` | `#0a0f1c` | Fondo principal |
| `bg-darker` | `#050812` | Fondo más oscuro |
| `text-light` | `#f0f4f8` | Texto principal |
| `text-muted` | `#a0aec0` | Texto secundario |

### Componentes CSS

```html
<!-- Botones -->
<button class="btn-primary">Primario</button>
<button class="btn-primary-solid">Sólido</button>
<button class="btn-secondary">Secundario</button>
<button class="btn-ghost">Ghost</button>

<!-- Cards -->
<div class="card">Glass Card</div>
<div class="card-elevated">Card Elevada</div>
<div class="card-accent">Card Acento</div>

<!-- Badges -->
<span class="badge badge-primary">Primary</span>
<span class="badge badge-accent">Accent</span>

<!-- Texto -->
<h1 class="section-title">Mi Título</h1>
<p class="section-subtitle">Mi subtítulo</p>
```

### Animaciones Disponibles

| Clase | Efecto |
|-------|--------|
| `animate-slide-in` | Fade + Slide up |
| `animate-glow-pulse` | Glow pulsante |
| `animate-float` | Flotación suave |
| `hero-glow` | Glow del hero (custom) |
| `pulse-border` | Borde pulsante |

---

## 📦 Módulos JavaScript

### Módulo Hero
```javascript
// Maneja typing effect y animaciones del hero
import { initHero } from './modules/hero.js';
initHero();
```

### Módulo Scroll Animations
```javascript
// Observa elementos y anima al entrar en viewport
import { initScrollAnimations } from './modules/scrollAnimations.js';
initScrollAnimations();
```

### Módulo Modals
```javascript
// Abre/cierra modals para videos y certificados
import { initModals } from './modules/modals.js';
initModals();
```

### Módulo Forms
```javascript
// Valida y envía formulario de contacto
import { initContactForm } from './modules/forms.js';
initContactForm();
```

### Módulo Projects
```javascript
// Slider interactivo para proyectos
import { initProjectsSlider } from './modules/projects.js';
initProjectsSlider();
```

---

## 🎯 Cómo Usar en HTML

### Lazy Loading de Imágenes
```html
<img data-src="path/to/image.jpg" src="placeholder.jpg" alt="Descripción" />
```

### Animaciones al Scroll
```html
<section data-animate="scroll">
  El contenido se animará al entrar en viewport
</section>
```

### Modal de Video
```html
<!-- Botón disparador -->
<button data-modal-trigger="video-modal">Ver Video</button>

<!-- Modal -->
<div id="video-modal" role="dialog" data-modal-backdrop>
  <div class="modal-content">
    <button data-modal-close>Cerrar</button>
    <div data-video-container></div>
  </div>
</div>
```

### Slider de Proyectos
```html
<div data-projects-slider>
  <div data-project-slide>Proyecto 1</div>
  <div data-project-slide>Proyecto 2</div>
  <div data-project-slide>Proyecto 3</div>
</div>

<button data-slider-prev>Anterior</button>
<button data-slider-next>Siguiente</button>
<div data-slider-dots></div>
```

### Formulario de Contacto
```html
<form id="contactForm">
  <input name="name" type="text" required />
  <input name="email" type="email" required />
  <input name="subject" type="text" required />
  <textarea name="message" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

---

## 🔧 Utilidades JavaScript

### Logger
```javascript
import { logger } from './utils/logger.js';

logger.log('Mensaje informativo', data);
logger.error('Error', errorObj);
logger.warn('Advertencia', warn);
logger.success('Éxito');
```

### Helpers
```javascript
import { 
  isValidEmail, 
  device, 
  showNotification,
  copyToClipboard,
  smoothScrollTo 
} from './utils/helpers.js';

// Validar email
if (isValidEmail(email)) { ... }

// Detectar dispositivo
if (device.isMobile()) { ... }

// Mostrar notificación
showNotification('Mensaje', 'success', 3000);

// Copiar al clipboard
await copyToClipboard('texto');

// Scroll suave
smoothScrollTo('#seccion-id', offset);
```

---

## 📱 Responsive Design

El proyecto utiliza Tailwind CSS con breakpoints estándar:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Ejemplo:
```html
<div class="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>
```

---

## ⚡ Performance Tips

1. **Lazy Loading**: Las imágenes con `data-src` se cargan solo cuando son visibles
2. **Code Splitting**: Módulos JavaScript separados por funcionalidad
3. **CSS Utility-Based**: Tailwind genera solo CSS que realmente usas
4. **Minimización**: El CSS se minifica en producción con `npm run build`

---

## 🐛 Debugging

El portfolio expone un objeto global para debugging:

```javascript
// En la consola del navegador
__FABISDEV__.logger.log('Mi mensaje');
console.log(__FABISDEV__.version);
```

---

## 📝 Próximos Pasos

1. ✅ Estructura carpetas creada
2. ✅ Tailwind configurado
3. ✅ Módulos JavaScript creados
4. ⬜ Refactorizar HTML
5. ⬜ Modernizar secciones
6. ⬜ Testing y optimizaciones

---

## 🤝 Soporte

Si necesitas agregar nuevos módulos o componentes:

1. Crea el archivo en `src/js/modules/`
2. Exporta la función principal
3. Importa en `main.js`
4. Inicializa en `initPortfolio()`

---

**Versión:** 2.0.0  
**Última actualización:** Febrero 2026  
**Autor:** Fabián Pilonieta (Fabisdev)
