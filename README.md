# Fabisdev Portfolio v2.0

Portafolio profesional de **Fabián Pilonieta** - Full Stack Developer & QA Specialist.

Construido con:
- **HTML5** - Semántica moderna
- **Tailwind CSS** - Utilidades y animaciones
- **JavaScript Vanilla** - Módulos ES6+
- **Diseño Premium Dark** - Azul profundo (#0284c7) con acentos verde

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Técnico](#stack-técnico)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Build para Producción](#build-para-producción)
- [Contribuciones](#contribuciones)

---

## ✨ Características

✅ **Diseño Premium Dark**
- Paleta de colores profesional
- Animaciones fluidas y elegantes
- Responsive 100% (Mobile-first)

✅ **Performance Optimizado**
- CSS generado automáticamente por Tailwind
- JavaScript modular (ES6 modules)
- Lazy loading de imágenes
- Cero dependencias innecesarias

✅ **Arquitectura Limpia**
- HTML semántico
- CSS utility-based (Tailwind)
- JavaScript separado en módulos
- Fácil de mantener y escalar

✅ **Accesibilidad**
- Roles ARIA correctos
- Contraste de colores cumple WCAG
- Navegación por teclado
- Atributos semánticos

---

## 🛠️ Stack Técnico

### Frontend
- **HTML5** - Marcado semántico
- **Tailwind CSS v3.4+** - Framework utilities CSScriptors
- **JavaScript ES6+** - Modular y funcional
- **Source Maps** - Para debugging

### Herramientas
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad con navegadores
- **Package.json** - Gestión de scripts

### Compatibilidad
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers modernos

---

## 📦 Instalación

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Pasos

1. **Clonar / Descargar el proyecto**
```bash
cd "Portafolio Fabis-dev"
```

2. **Instalar dependencias**
```bash
npm install
```

Instalará:
- `tailwindcss` - Framework CSS
- `postcss` - Procesador CSS
- `autoprefixer` - Prefijos automáticos
- `@tailwindcss/forms` - Mejoras en forms

3. **Iniciar desarrollo**
```bash
npm run dev
```

Abrirá servidor local (usualmente http://localhost:3000)

4. **Build para producción**
```bash
npm run build
```

Genera archivo `dist/styles.css` minificado

---

## 📁 Estructura del Proyecto

```
Portafolio Fabis-dev/
├── index.html                 ← Página principal
├── tailwind.config.js         ← Configuración Tailwind
├── postcss.config.js          ← Configuración PostCSS
├── package.json               ← Dependencias
│
├── src/
│   ├── styles/
│   │   └── globals.css        ← Estilos globales + componentes
│   │
│   ├── js/
│   │   ├── main.js            ← Entry point (inicializa módulos)
│   │   │
│   │   ├── modules/           ← Funcionalidad específica
│   │   │   ├── hero.js        ← Typing effect + animaciones
│   │   │   ├── projects.js    ← Slider de proyectos
│   │   │   ├── modals.js      ← Variables y certificados
│   │   │   ├── forms.js       ← Formulario de contacto
│   │   │   └── scrollAnimations.js
│   │   │
│   │   └── utils/             ← Funciones compartidas
│   │       ├── logger.js      ← Sistema de logs
│   │       └── helpers.js     ← Utilidades generales
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   └── certificates/
│   │   ├── icons/
│   │   └── videos/
│   │
│   └── documents/
│       ├── cv.pdf
│       └── certificates/
│
├── SETUP.md                   ← Guía de configuración
└── README.md                  ← Este archivo
```

---

## 🔧 Desarrollo

### Scripts Disponibles

```bash
# Iniciar desarrollo (watch + servidor)
npm run dev

# Solo compilar Tailwind (watch)
npm run tailwind:watch

# Build de producción (minified)
npm run build

# Preview sin servidor de desarrollo
npm run preview

# Servir arquivos localmente
npm run serve
```

### Editar Estilos

Los estilos se dividen en dos:

1. **Tailwind CSS** (Recomendado para la mayoría)
   - Clases utilities: `bg-primary`, `text-text-light`, etc.
   - Animaciones: `animate-slide-in`, `animate-glow-pulse`
   - Responsive: `md:grid-cols-2`, `lg:text-xl`

2. **Custom CSS** (`src/styles/globals.css`)
   - Componentes reutilizables: `.btn-primary`, `.card`
   - Animaciones complejas
   - Resets y bases

### Editar JavaScript

Los módulos están en `src/js/modules/`:

```javascript
// Para agregar nuevo módulo:
// 1. Crear archivo en src/js/modules/miModulo.js
// 2. Exportar función principal
export function initMiModulo() {
  // Tu código aquí
}

// 3. Importar en src/js/main.js
import { initMiModulo } from './modules/miModulo.js';

// 4. Llamar en initPortfolio()
initMiModulo();
```

### Debugging

Acceder a variables globales en consola del navegador:

```javascript
// Logger del sistema
__FABISDEV__.logger.log('Mi mensaje');

// Versión
__FABISDEV__.version; // '2.0.0'
```

---

## 🚀 Build para Producción

### Pasos

1. **Compilar CSS**
```bash
npm run build
```

2. **Verificar archivo generado**
```
dist/styles.css  ← CSS minificado
```

3. **Reemplazar referencia en HTML** (opcional, si cambias de CDN)
```html
<link rel="stylesheet" href="dist/styles.css">
```

4. **Deploy**
- Copiar todos los archivos a tu hosting
- El servidor debe servir `index.html` como default
- Verificar que los módulos JS carguen correctamente

### Performance Checklist

- [ ] CSS está minificado
- [ ] Imágenes están optimizadas
- [ ] Fuentes están precargadas
- [ ] Service Worker registrado (opcional)
- [ ] Lighthouse score > 90

---

## 🎨 Personalizaciones Comunes

### Cambiar Colores

Editar `tailwind.config.js`:

```js
colors: {
  'primary': '#0284c7',        // Tu color principal
  'primary-light': '#0ea5e9',
  'primary-dark': '#075985',
  'accent': '#10b981',         // Color de acento
  // ... más colores
}
```

### Cambiar Tipografía

Editar `tailwind.config.js`:

```js
fontFamily: {
  'sans': ['Inter', ...],
  'display': ['Space Grotesk', ...],  // Para títulos
  'mono': ['Roboto Mono', ...]
}
```

### Agregar Nueva Animación

En `tailwind.config.js`:

```js
keyframes: {
  'mi-animacion': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  }
},
animation: {
  'mi-animacion': 'mi-animacion 0.6s ease-out'
}
```

Usar en HTML: `class="animate-mi-animacion"`

---

## 📊 Optimizaciones Implementadas

✅ **CSS Optimization**
- Purged CSS (solo clases usadas)
- Minificación automática en build
- Tree-shaking de dependencias

✅ **JavaScript Optimization**
- Módulos ES6 (carga bajo demanda)
- Debouncing en scroll events
- Event delegation para performance

✅ **Rendering Optimization**
- Lazy loading de imágenes
- Intersection Observer para animaciones
- CSS transforms para GPU acceleration

---

## 🐛 Troubleshooting

### "Tailwind CSS no aplica estilos"
**Solución:** Compilar CSS primero
```bash
npm run build
```

### "Módulos JS no cargan"
**Verificar:**
- Ruta de archivo correcta
- Atributo `type="module"` en script
- Que no haya errores de sintaxis

### "Animaciones no funcionan"
**Verificar:**
- Clase de animación está correcta
- Element tiene `will-change` si es necesario
- Navegador soporta CSS animations

---

## 📝 Licencia

Proyecto personal de Fabián Pilonieta.  
Libre para uso y modificación personal.

---

## 🤝 Contribuciones

Para mejorar este portfolio:

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -am 'Agrega mejora'`)
4. Push a rama (`git push origin feature/mejora`)
5. Abrir Pull Request

---

## 📞 Contacto

- **Email:** fabisdev@email.com
- **GitHub:** https://github.com/fabisdev
- **LinkedIn:** https://linkedin.com/in/fabisdev

---

**Versión:** 2.0.0  
**Última actualización:** Febrero 2026  
**Status:** En desarrollo activo ✅
