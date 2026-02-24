# 🚀 Optimización de Imágenes - INSTRUCCIONES

## ¿Por qué optimizar?

Las imágenes son el **factor #1** en la percepción profesional de tu portfolio.

- Imágenes pequeñas → usuario percibe "junior"
- Imágenes grandes + claras → usuario percibe "profesional"

## Requisitos Previos

### Opción 1: Usar ffmpeg (RECOMENDADO)

ffmpeg es el estándar de la industria para conversión de video/imagen.

**Windows (Chocolatey):**
```powershell
choco install ffmpeg
```

**Windows (Manual):**
1. Descarga desde: https://ffmpeg.org/download.html
2. Extrae en `C:\ffmpeg`
3. Agrega a PATH o usa ruta completa

**Verificar instalación:**
```powershell
ffmpeg -version
```

### Opción 2: Usar ImageMagick

Alternativa si no quieres ffmpeg.

**Windows (Chocolatey):**
```powershell
choco install imagemagick
```

## Ejecutar Optimización

### Paso 1: Abre PowerShell

```powershell
cd c:\Users\USUARIO\Downloads\Portafolio Fabis-dev
```

### Paso 2: Ejecuta el script

```powershell
.\optimize-images.ps1
```

### Paso 3: El script hará:

✅ Crea backup automático de tus imágenes originales
✅ Redimensiona a 1920x1080
✅ Convierte a WebP (si ffmpeg)
✅ Comprime agresivamente
✅ Genera archivos optimizados

## Qué Esperar

**Antes:**
- dashboard.png: ~500KB (original)

**Después:**
- dashboard.webp: ~80KB  (¡6x más pequeño!)
- dashboard.png: ~150KB (optimizado como fallback)

## Próximo Paso: Actualizar HTML

Una vez optimizadas las imágenes, el HTML debe usar WebP con PNG fallback:

```html
<!-- NUEVO (Con WebP) -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Descripción">
</picture>

<!-- O simplemente WebP directo si navegadores lo soportan -->
<img src="image.webp" alt="Descripción">
```

## Troubleshooting

### ffmpeg no reconocido después de instalar

```powershell
# Reinicia PowerShell o recarga PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Script no ejecuta (permiso denegado)

```powershell
# Ejecuta PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Las imágenes se ven borrosas después de optimizar

- Baja el quality de 85 a 75-80 en el script
- O aumenta a 90 (archivo más grande pero más claro)

## Métricas de Éxito

✅ Imágenes WebP < 200KB cada una
✅ Aspect ratio 16:9 perfecto
✅ Bordes y sombras sutiles en el HTML/CSS
✅ Carrusel funcionando smooth

---

**Referencia:**
- WebP Handbook: https://developers.google.com/speed/webp
- ffmpeg Documentation: https://ffmpeg.org/documentation.html
- Browser Support: https://caniuse.com/webp
