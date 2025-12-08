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

## 🚀 Instalación y Configuración

### Paso 1: Configurar la Base de Datos

1. **Copia el archivo de configuración:**
   ```bash
   cp config/database.php.example config/database.php
   ```

2. **Edita `config/database.php` con tus credenciales:**
   ```php
   $db_host = '127.0.0.1';
   $db_name = 'proyectoaweb';
   $db_user = 'tu_usuario';
   $db_pass = 'tu_contraseña';
   ```

3. **Crea la base de datos:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE proyectoaweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

4. **Importa el esquema principal:**
   ```bash
   mysql -u root -p proyectoaweb < database/proyectoaweb.sql
   ```

5. **Crea la tabla de notificaciones:**
   ```bash
   mysql -u root -p proyectoaweb < database/crear_tabla_notificaciones.sql
   ```

6. **Crea asesores de ejemplo (opcional):**
   ```bash
   mysql -u root -p proyectoaweb < database/insertar_asesor_ejemplo.sql
   ```

### Paso 2: Instalar Paquetes con Composer

1. **Instala Composer** (si no lo tienes):
   ```bash
   # macOS/Linux
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   ```

2. **Instala las dependencias del proyecto:**
   ```bash
   cd /Users/lecibur/Developer/tutorias/ProyectoWeb
   composer install
   ```

   Esto instalará:
   - `cboden/ratchet` - Para WebSockets en tiempo real

### Paso 3: Iniciar los Servidores

#### Servidor Principal (PHP)

En una terminal, ejecuta:

```bash
cd /Users/lecibur/Developer/tutorias/ProyectoWeb
php -S localhost:8000 -t public
```

El servidor estará disponible en: `http://localhost:8000`

#### Servidor WebSocket (Ratchet)

En otra terminal separada, ejecuta:

```bash
cd /Users/lecibur/Developer/tutorias/ProyectoWeb
php websocket/websocket-server.php
```

Deberías ver:

```
========================================
Servidor WebSocket iniciado
WebSocket: ws://localhost:8084
Verificando nuevas notificaciones cada 2 segundos...
========================================
Presiona Ctrl+C para detener
```

**IMPORTANTE:** El servidor WebSocket debe estar corriendo todo el tiempo mientras uses la aplicación.

### Paso 4: Acceder al Sistema

- **Login de estudiantes/asesores:** http://localhost:8000/estudiantes/views/Login.html
- **Dashboard de estudiantes:** http://localhost:8000/estudiantes/views/Pantallaprincipal.html
- **Dashboard de asesores:** http://localhost:8000/asesores/views/PantallaInicio.html

## 🧪 Cómo Probar las Notificaciones en Tiempo Real

### Prueba Completa:

1. **Inicia ambos servidores:**
   - Terminal 1: `php -S localhost:8000 -t public`
   - Terminal 2: `php websocket/websocket-server.php`

2. **Abre dos navegadores diferentes** (o modo incógnito):
   - **Navegador 1:** Inicia sesión como **asesor**
     - Ve a: http://localhost:8000/estudiantes/views/Login.html
     - Usa credenciales de asesor (ej: `maestro@hotmail.com` / contraseña del asesor)
     - Abre la consola del navegador (F12) → Deberías ver "WebSocket conectado" y "Autenticado en WebSocket"

   - **Navegador 2:** Inicia sesión como **estudiante**
     - Ve a: http://localhost:8000/estudiantes/views/Login.html
     - Usa credenciales de estudiante
     - Ve a: http://localhost:8000/estudiantes/views/Anteproyecto.html
     - Completa y envía el formulario de anteproyecto

3. **Resultado esperado:**
   - En el **Navegador 1 (asesor)**, deberías ver:
     - Una notificación nueva aparecer instantáneamente (máximo 2 segundos)
     - Un toast flotante con la notificación
     - El contador de notificaciones no leídas actualizarse
     - En la consola del servidor WebSocket: "Notificación enviada a usuario X"

### Verificación en la Base de Datos:

```sql
-- Ver todas las notificaciones
SELECT * FROM notificaciones ORDER BY FECHA_CREACION DESC;

-- Ver notificaciones de un asesor específico
SELECT n.*, u.CORREO 
FROM notificaciones n
INNER JOIN usuarios u ON n.CVE_USUARIOS = u.CVE_USUARIOS
WHERE u.CORREO = 'maestro@hotmail.com'
ORDER BY n.FECHA_CREACION DESC;
```

## 📚 Documentación

- [Reorganización del Proyecto](docs/REORGANIZACION.md) - Explicación de la nueva estructura
- [Instrucciones de Ejecución](docs/INSTRUCCIONES_EJECUCION.md) - Guía detallada de ejecución
- [Configuración Segura](docs/CONFIGURACION_SEGURA.md) - Por qué usar archivos `.example` y cómo configurarlos
- [WebSocket con Ratchet](docs/WEBSOCKET_RATCHET.md) - Sistema de notificaciones en tiempo real
- [Sesiones Múltiples](docs/SESIONES_MULTIPLES.md) - Cómo funcionan las sesiones independientes
- [Crear Asesor](docs/CREAR_ASESOR.md) - Cómo crear asesores académicos

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript, Tailwind CSS
- **Backend:** PHP 7.3+
- **Base de Datos:** MySQL/MariaDB
- **Librerías:** Chart.js, Font Awesome
- **WebSockets:** Ratchet (notificaciones en tiempo real)

## 👥 Roles del Sistema

- **Estudiantes:** Pueden registrar anteproyectos, ver comentarios, gestionar estadías
- **Asesores:** Pueden revisar anteproyectos, aprobar/rechazar, agregar comentarios

## 📝 Notas Importantes

- Las contraseñas se almacenan usando `password_hash()` de PHP
- El sistema usa PDO para las consultas a la base de datos
- Las sesiones PHP se utilizan para la autenticación con nombres diferentes por rol
- **Importante**: Los archivos con credenciales (`config/database.php`) están en `.gitignore` por seguridad
- Usa los archivos `.example` como plantilla para tu configuración
- **Notificaciones en tiempo real:** Requiere que el servidor WebSocket esté corriendo
- **Múltiples sesiones:** El sistema soporta múltiples usuarios simultáneos en el mismo navegador

## 🔧 Configuración Requerida

- **PHP 7.4 o superior** (recomendado 8.0+)
- **MySQL 5.7 o superior** (o MariaDB equivalente)
- **Composer** - Para gestionar dependencias
- **Extensiones PHP:** PDO, PDO_MySQL, session, curl
- **Servidor web** (Apache, Nginx, o servidor integrado de PHP)

## ⚠️ Requisitos Adicionales para Notificaciones en Tiempo Real

- **Ratchet** instalado vía Composer (`composer install`)
- **Servidor WebSocket** corriendo en puerto 8084
- **Dos terminales** abiertas simultáneamente (servidor principal + WebSocket)

---

**Versión:** 1.0  
**Última actualización:** 2025

