# Proyecto GEUT - Sistema de Gestión de Tutorías y Estadías

Sistema web para la gestión de tutorías académicas y estadías profesionales en la Universidad Tecnológica.

## 📁 Estructura del Proyecto

```
ProyectoWeb/
├── config/              # Configuración de base de datos
├── public/              # Archivos accesibles por el navegador
│   ├── estudiantes/    # Interfaz de estudiantes
│   ├── asesores/       # Interfaz de asesores
│   └── assets/         # Recursos compartidos (imágenes, etc.)
├── backend/            # Lógica del servidor (PHP)
│   ├── estudiantes/   # Controladores de estudiantes
│   ├── asesores/      # Controladores de asesores
│   └── shared/        # Funciones compartidas
├── database/           # Scripts de base de datos
└── docs/               # Documentación del proyecto
```

## 🚀 Instalación

1. **Configurar la base de datos:**
   - Copia el archivo de ejemplo: `cp config/database.php.example config/database.php`
   - Edita `config/database.php` con tus credenciales de MySQL
   - Importa el script SQL desde `database/proyectoaweb.sql`

2. **Configurar el servidor web:**
   - Asegúrate de que la raíz pública apunte a la carpeta `public/`
   - O configura tu servidor para servir desde la raíz del proyecto

3. **Acceder al sistema:**
   - Abre `public/estudiantes/views/index.html` en tu navegador
   - O configura tu servidor para redirigir a esta ruta

## 📚 Documentación

- [Reorganización del Proyecto](docs/REORGANIZACION.md) - Explicación de la nueva estructura
- [Instrucciones de Ejecución](docs/INSTRUCCIONES_EJECUCION.md) - Cómo ejecutar el proyecto
- [Configuración Segura](docs/CONFIGURACION_SEGURA.md) - Por qué usar archivos `.example` y cómo configurarlos

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript, Tailwind CSS
- **Backend:** PHP 7.3+
- **Base de Datos:** MySQL/MariaDB
- **Librerías:** Chart.js, Font Awesome

## 👥 Roles del Sistema

- **Estudiantes:** Pueden registrar anteproyectos, ver comentarios, gestionar estadías
- **Asesores:** Pueden revisar anteproyectos, aprobar/rechazar, agregar comentarios

## 📝 Notas

- Las contraseñas se almacenan usando `password_hash()` de PHP
- El sistema usa PDO para las consultas a la base de datos
- Las sesiones PHP se utilizan para la autenticación
- **Importante**: Los archivos con credenciales (`config/database.php`) están en `.gitignore` por seguridad
- Usa los archivos `.example` como plantilla para tu configuración

## 🔧 Configuración Requerida

- PHP 7.3 o superior
- MySQL 5.7 o superior (o MariaDB equivalente)
- Servidor web (Apache, Nginx, etc.)
- Extensiones PHP: PDO, PDO_MySQL, session

---

**Versión:** 1.0  
**Última actualización:** 2025

