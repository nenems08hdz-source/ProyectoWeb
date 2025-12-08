# Configuración Segura del Proyecto

## 🔒 ¿Por qué usar archivos `.example`?

Los archivos `.example` son una práctica estándar en el desarrollo de software para mantener la seguridad y facilitar la configuración del proyecto.

### Razones principales:

1. **Seguridad**: Los archivos de configuración reales contienen credenciales sensibles (usuarios, contraseñas, tokens) que **NUNCA** deben subirse a un repositorio público.

2. **Colaboración**: Permite que otros desarrolladores sepan qué configuración necesitan sin exponer datos reales.

3. **Documentación**: El archivo `.example` sirve como documentación de qué variables se necesitan configurar.

4. **Versionado seguro**: Solo los archivos de ejemplo se versionan en Git, manteniendo los datos reales fuera del control de versiones.

---

## 📁 Archivos `.example` en este proyecto

Este proyecto utiliza archivos `.example` para:

- **`config/database.php.example`** - Configuración de la base de datos
- **`database/proyectoaweb.sql.example`** - Script SQL de la base de datos (opcional, para mantener datos de ejemplo)

---

## 🚀 Cómo configurar el proyecto

### Paso 1: Configurar la base de datos

1. **Copia el archivo de ejemplo:**
   ```bash
   cp config/database.php.example config/database.php
   ```

2. **Edita el archivo `config/database.php`** con tus credenciales reales:
   ```php
   $db_host = 'localhost';
   $db_name = 'proyectoaweb';
   $db_user = 'tu_usuario_real';        // ← Cambia esto
   $db_pass = 'tu_contraseña_real';     // ← Cambia esto
   ```

3. **Verifica que el archivo `config/database.php` esté en `.gitignore`** (ya está configurado)

### Paso 2: Importar la base de datos

1. **Crea la base de datos** (el script SQL ya incluye el CREATE DATABASE):
   ```bash
   mysql -u root -p < database/proyectoaweb.sql
   ```

   O desde phpMyAdmin:
   - Importa el archivo `database/proyectoaweb.sql`
   - El script creará automáticamente la base de datos

---

## ✅ Verificación

Para verificar que todo está configurado correctamente:

1. **Verifica que `config/database.php` existe** y tiene tus credenciales
2. **Verifica que `config/database.php` NO está en Git:**
   ```bash
   git status
   # No debería aparecer config/database.php en los archivos modificados
   ```
3. **Prueba la conexión** iniciando el servidor y accediendo al login

---

## 🛡️ Buenas Prácticas de Seguridad

### ✅ HACER:

- ✅ Usar archivos `.example` para documentar la configuración necesaria
- ✅ Mantener `config/database.php` en `.gitignore`
- ✅ Usar contraseñas fuertes en producción
- ✅ Usar diferentes credenciales para desarrollo y producción
- ✅ Revisar `.gitignore` antes de hacer commit

### ❌ NO HACER:

- ❌ **NUNCA** subir archivos con credenciales reales al repositorio
- ❌ **NUNCA** compartir tus credenciales en código o documentación pública
- ❌ **NUNCA** usar la misma contraseña en desarrollo y producción
- ❌ **NUNCA** hacer commit de `config/database.php`

---

## 📝 Estructura de Archivos

```
config/
├── database.php          # ← Archivo REAL con credenciales (NO se sube a Git)
└── database.php.example  # ← Archivo de EJEMPLO (SÍ se sube a Git)

database/
├── proyectoaweb.sql          # ← Script SQL real (NO se sube a Git)
└── proyectoaweb.sql.example  # ← Script SQL de ejemplo (opcional, SÍ se sube)
```

---

## 🔍 ¿Qué hace el `.gitignore`?

El archivo `.gitignore` le dice a Git qué archivos **NO** debe rastrear. En este proyecto:

```gitignore
# Archivos de configuración con credenciales
config/database.php

# Archivos de base de datos con datos reales
database/proyectoaweb.sql
```

Esto significa que:
- ✅ `config/database.php.example` → **SÍ** se sube a Git
- ❌ `config/database.php` → **NO** se sube a Git
- ✅ `database/proyectoaweb.sql.example` → **SÍ** se sube a Git (si existe)
- ❌ `database/proyectoaweb.sql` → **NO** se sube a Git

---

## 🆘 Solución de Problemas

### Error: "No se puede conectar a la base de datos"

1. Verifica que `config/database.php` existe (no solo el `.example`)
2. Verifica que las credenciales en `config/database.php` son correctas
3. Verifica que MySQL está corriendo
4. Verifica que la base de datos existe

### Error: "Archivo database.php no encontrado"

1. Copia el archivo de ejemplo:
   ```bash
   cp config/database.php.example config/database.php
   ```
2. Edita `config/database.php` con tus credenciales

### ¿Cómo saber si un archivo está siendo ignorado por Git?

```bash
git check-ignore -v config/database.php
```

Si el archivo está siendo ignorado, verás la regla de `.gitignore` que lo está ignorando.

---

## 📚 Recursos Adicionales

- [Documentación de Git sobre .gitignore](https://git-scm.com/docs/gitignore)
- [OWASP - Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
- [Best Practices for Secure Configuration](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**Recuerda**: La seguridad es responsabilidad de todos. Mantén tus credenciales seguras y nunca las subas al repositorio. 🔒

