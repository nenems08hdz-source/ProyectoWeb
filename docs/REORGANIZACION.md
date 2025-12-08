# Documentación de Reorganización del Proyecto GEUT

## 📋 Resumen de Cambios

Este documento explica la reorganización del proyecto para hacerlo más legible y fácil de mantener, sin agregar complejidad innecesaria.

---

## 🎯 Objetivos de la Reorganización

1. **Separar claramente** los tipos de archivos (HTML, CSS, JS, PHP)
2. **Organizar por funcionalidad** manteniendo la separación Estudiantes/Asesores
3. **Centralizar configuración** en un solo lugar
4. **Facilitar el mantenimiento** con una estructura predecible

---

## 📁 Nueva Estructura de Carpetas

```
ProyectoWeb/
├── config/                    # Configuración y conexión a BD
│   └── database.php          # Archivo único de conexión
│
├── public/                    # Archivos accesibles por el navegador
│   ├── estudiantes/          # Interfaz de estudiantes
│   │   ├── views/           # Archivos HTML
│   │   ├── styles/          # Archivos CSS
│   │   └── scripts/          # Archivos JavaScript
│   │
│   ├── asesores/             # Interfaz de asesores
│   │   ├── views/           # Archivos HTML
│   │   ├── styles/          # Archivos CSS
│   │   └── scripts/          # Archivos JavaScript
│   │
│   └── assets/               # Recursos compartidos (imágenes, etc.)
│       └── imagenes/
│
├── backend/                   # Lógica del servidor (PHP)
│   ├── estudiantes/          # Controladores de estudiantes
│   ├── asesores/            # Controladores de asesores
│   └── shared/              # Funciones compartidas (carreras, municipios, etc.)
│
├── database/                  # Scripts de base de datos
│   └── proyectoaweb.sql
│
└── docs/                      # Documentación del proyecto
    └── REORGANIZACION.md     # Este archivo
```

---

## 🔄 Cambios Realizados

### 1. Carpeta `config/`
**Antes:** Archivos de conexión dispersos en `Estudiantes/Conexion.php` y `Conexion/`

**Ahora:** Un solo archivo `config/database.php` con la configuración centralizada

**Beneficio:** Un solo lugar para cambiar credenciales de base de datos

---

### 2. Carpeta `public/`
**Antes:** Archivos HTML, CSS y JS mezclados en `Estudiantes/` y `Asesores/`

**Ahora:** Separados en subcarpetas:
- `views/` → HTML
- `styles/` → CSS  
- `scripts/` → JavaScript

**Beneficio:** Fácil encontrar el tipo de archivo que necesitas

---

### 3. Carpeta `backend/`
**Antes:** Archivos PHP mezclados con HTML/CSS/JS

**Ahora:** 
- `backend/estudiantes/` → PHP de estudiantes
- `backend/asesores/` → PHP de asesores
- `backend/shared/` → PHP compartido (carreras.php, municipio.php, etc.)

**Beneficio:** Separación clara entre frontend y backend

---

### 4. Carpeta `public/assets/`
**Antes:** `Imagenes/` en la raíz

**Ahora:** `public/assets/imagenes/`

**Beneficio:** Recursos organizados y accesibles desde el navegador

---

### 5. Carpeta `database/`
**Antes:** `base_de_datos/`

**Ahora:** `database/` (nombre más estándar)

**Beneficio:** Convención de nombres más común

---

## 📝 Ejemplo de Rutas Actualizadas

### Antes:
```html
<!-- En Estudiantes/Pantallaprincipal.html -->
<link rel="stylesheet" href="stylePrincipal.css">
<script src="Pantallaprincipal.js"></script>
```

### Ahora:
```html
<!-- En public/estudiantes/views/Pantallaprincipal.html -->
<link rel="stylesheet" href="../styles/stylePrincipal.css">
<script src="../scripts/Pantallaprincipal.js"></script>
```

### Antes:
```php
// En Estudiantes/Login.php
require_once 'Conexion.php';
```

### Ahora:
```php
// En backend/estudiantes/Login.php
require_once '../../config/database.php';
```

---

## 🚀 Cómo Usar la Nueva Estructura

### Para Desarrolladores:

1. **Editar HTML:** Busca en `public/estudiantes/views/` o `public/asesores/views/`
2. **Editar CSS:** Busca en `public/estudiantes/styles/` o `public/asesores/styles/`
3. **Editar JavaScript:** Busca en `public/estudiantes/scripts/` o `public/asesores/scripts/`
4. **Editar PHP:** Busca en `backend/estudiantes/` o `backend/asesores/`
5. **Configurar BD:** Edita `config/database.php`

### Para el Servidor Web:

- **Raíz pública:** Debe apuntar a la carpeta `public/`
- **PHP:** Puede ejecutarse desde `backend/` (ajustar rutas según configuración del servidor)

---

## ⚠️ Notas Importantes

1. **Rutas relativas:** Todas las rutas en HTML, CSS y JS han sido actualizadas para la nueva estructura
2. **Includes PHP:** Los `require_once` y `include` han sido actualizados
3. **Compatibilidad:** La funcionalidad se mantiene igual, solo cambia la organización
4. **Sin complejidad:** No se agregaron frameworks ni herramientas adicionales, solo reorganización

---

## 📊 Comparación Visual

### Estructura Antigua:
```
ProyectoWeb/
├── Estudiantes/
│   ├── Login.html
│   ├── Login.php
│   ├── style.css
│   ├── logica.js
│   └── Conexion.php
└── Asesores/
    ├── PantallaInicio.html
    ├── PantallaInicio.css
    └── Insertarcomentario.php
```

### Estructura Nueva:
```
ProyectoWeb/
├── config/
│   └── database.php
├── public/
│   ├── estudiantes/
│   │   ├── views/Login.html
│   │   ├── styles/style.css
│   │   └── scripts/logica.js
│   └── asesores/
│       ├── views/PantallaInicio.html
│       └── styles/PantallaInicio.css
└── backend/
    ├── estudiantes/Login.php
    └── asesores/Insertarcomentario.php
```

---

## ✅ Ventajas de la Nueva Estructura

1. ✅ **Más legible:** Fácil saber dónde está cada tipo de archivo
2. ✅ **Más mantenible:** Cambios organizados por tipo de archivo
3. ✅ **Más escalable:** Fácil agregar nuevas funcionalidades
4. ✅ **Separación clara:** Frontend (public) vs Backend (backend)
5. ✅ **Sin complejidad:** Solo reorganización, sin nuevas dependencias

---

## 🔧 Próximos Pasos Recomendados (Opcional)

Si en el futuro quieres mejorar más el proyecto, considera:

1. Crear un archivo `.htaccess` para rutas amigables
2. Agregar un archivo `README.md` con instrucciones de instalación
3. Documentar las funciones PHP principales
4. Crear un archivo de configuración para variables de entorno

Pero por ahora, esta reorganización es suficiente para tener un proyecto más legible y organizado.

---

**Fecha de reorganización:** 2025  
**Versión:** 1.0  
**Estado:** ✅ Completado

## 📌 Nota Final

La reorganización ha sido completada exitosamente. Todas las rutas han sido actualizadas y el proyecto está listo para usar con la nueva estructura más legible y organizada.

