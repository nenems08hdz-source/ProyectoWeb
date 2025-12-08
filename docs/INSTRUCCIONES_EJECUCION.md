# Instrucciones para Ejecutar el Proyecto GEUT

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **PHP 7.3 o superior** (con extensiones: PDO, PDO_MySQL, session)
- **MySQL 5.7 o superior** (o MariaDB equivalente)
- **Servidor web** (Apache, Nginx, o el servidor integrado de PHP)

---

## 🚀 Opción 1: Servidor PHP Integrado (Recomendado para desarrollo)

Esta es la forma más rápida de probar el proyecto localmente.

### Paso 1: Configurar la Base de Datos

1. Abre `config/database.php` y actualiza las credenciales:
```php
$db_host = 'localhost';
$db_name = 'proyectoaweb';
$db_user = 'root';              // Tu usuario de MySQL
$db_pass = 'tu_contraseña';     // Tu contraseña de MySQL
```

2. Crea la base de datos en MySQL:
```sql
CREATE DATABASE proyectoaweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Importa el script SQL:
```bash
mysql -u root -p proyectoaweb < database/proyectoaweb.sql
```

O desde phpMyAdmin:
- Selecciona la base de datos `proyectoaweb`
- Ve a la pestaña "Importar"
- Selecciona el archivo `database/proyectoaweb.sql`
- Haz clic en "Continuar"

### Paso 2: Iniciar el Servidor

Abre una terminal en la raíz del proyecto y ejecuta:

```bash
# Desde la raíz del proyecto
php -S localhost:8000 -t public
```

Esto iniciará un servidor en `http://localhost:8000`

### Paso 3: Acceder al Proyecto

Abre tu navegador y ve a:
- **Login de estudiantes:** http://localhost:8000/estudiantes/views/index.html
- **O directamente:** http://localhost:8000/estudiantes/views/

---

## 🌐 Opción 2: Servidor Apache/Nginx (Producción)

### Configuración para Apache

1. **Copia el proyecto** a tu directorio de Apache (normalmente `/var/www/html/` o `htdocs/`)

2. **Configura el VirtualHost** en Apache:

```apache
<VirtualHost *:80>
    ServerName geut.local
    DocumentRoot /ruta/a/ProyectoWeb/public
    
    <Directory /ruta/a/ProyectoWeb/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirigir todas las peticiones a public/
    RewriteEngine On
    RewriteBase /
</VirtualHost>
```

3. **Actualiza tu archivo hosts** (en Linux/Mac: `/etc/hosts`, en Windows: `C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1    geut.local
```

4. Accede a: `http://geut.local`

### Configuración para Nginx

```nginx
server {
    listen 80;
    server_name geut.local;
    root /ruta/a/ProyectoWeb/public;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

---

## 🔧 Configuración Adicional

### Si usas XAMPP/WAMP/MAMP

1. **Copia el proyecto** a:
   - XAMPP: `C:\xampp\htdocs\ProyectoWeb\`
   - WAMP: `C:\wamp64\www\ProyectoWeb\`
   - MAMP: `/Applications/MAMP/htdocs/ProyectoWeb/`

2. **Configura la base de datos** en `config/database.php`:
   - Usuario: `root`
   - Contraseña: (normalmente vacía en XAMPP/WAMP, `root` en MAMP)

3. **Accede a:**
   - http://localhost/ProyectoWeb/public/estudiantes/views/index.html

### Crear un archivo .htaccess (Opcional)

Crea `public/.htaccess` para mejorar las rutas:

```apache
# Habilitar rewrite engine
RewriteEngine On

# Redirigir a index.html si el archivo no existe
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^estudiantes/?$ estudiantes/views/index.html [L]
RewriteRule ^asesores/?$ asesores/views/PantallaInicio.html [L]

# Permitir acceso a archivos estáticos
<FilesMatch "\.(css|js|jpg|jpeg|png|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

## ✅ Verificación

Para verificar que todo funciona:

1. **Verifica la conexión a la base de datos:**
   - Abre `config/database.php`
   - Asegúrate de que las credenciales sean correctas

2. **Prueba el login:**
   - Ve a la página de login
   - Intenta iniciar sesión con un usuario existente
   - O crea un nuevo usuario desde el registro

3. **Verifica los estilos:**
   - Las páginas deben cargar con sus estilos CSS correctamente
   - Si no se cargan, verifica las rutas en los archivos HTML

4. **Verifica JavaScript:**
   - Abre la consola del navegador (F12)
   - No debe haber errores de archivos JS no encontrados

---

## 🐛 Solución de Problemas

### Error: "No se puede conectar a la base de datos"
- Verifica que MySQL esté corriendo
- Revisa las credenciales en `config/database.php`
- Asegúrate de que la base de datos existe

### Error: "404 Not Found" en archivos CSS/JS
- Verifica que las rutas en los HTML sean correctas
- Asegúrate de que los archivos existan en las carpetas correspondientes
- Revisa la consola del navegador para ver qué archivos no se encuentran

### Error: "Página en blanco"
- Revisa los logs de PHP (normalmente en `error_log`)
- Verifica que PHP tenga habilitadas las extensiones necesarias
- Revisa la consola del navegador para errores de JavaScript

### Las rutas no funcionan correctamente
- Si usas el servidor integrado de PHP, asegúrate de usar `-t public`
- Si usas Apache, verifica la configuración del VirtualHost
- Revisa el archivo `.htaccess` si lo estás usando

---

## 📝 Notas Importantes

1. **Ruta base del proyecto:**
   - Con servidor PHP integrado: `http://localhost:8000`
   - Con Apache/XAMPP: `http://localhost/ProyectoWeb/public`

2. **Archivos estáticos:**
   - Los archivos HTML, CSS y JS están en `public/`
   - Los archivos PHP están en `backend/`

3. **Sesiones:**
   - Las sesiones PHP se guardan automáticamente
   - Asegúrate de que PHP tenga permisos para escribir en el directorio de sesiones

---

## 🎯 Acceso Rápido

Una vez configurado, puedes acceder directamente a:

- **Login:** `http://localhost:8000/estudiantes/views/index.html`
- **Registro:** `http://localhost:8000/estudiantes/views/Registro.html`
- **Dashboard Estudiante:** `http://localhost:8000/estudiantes/views/Pantallaprincipal.html`
- **Dashboard Asesor:** `http://localhost:8000/asesores/views/PantallaInicio.html`

---

**¡Listo!** Tu proyecto debería estar funcionando correctamente. 🚀

