# Sistema de Notificaciones en Tiempo Real

## 📋 Descripción

Sistema de notificaciones en tiempo real que alerta a los asesores académicos cuando se les asigna un nuevo proyecto de estadía.

## 🎯 Funcionalidad

Cuando un estudiante crea un registro de estadía (anteproyecto), el sistema:

1. **Asigna automáticamente** un asesor académico de la misma división
2. **Crea una notificación** en la base de datos para ese asesor
3. **Muestra la notificación en tiempo real** en el dashboard del asesor
4. **Actualiza automáticamente** cada 5 segundos (polling)

## 🗄️ Estructura de Base de Datos

### Tabla: `notificaciones`

```sql
CREATE TABLE `notificaciones` (
  `CVE_NOTIFICACION` int(11) NOT NULL AUTO_INCREMENT,
  `CVE_USUARIOS` int(11) NOT NULL,              -- ID del asesor
  `CVE_ANTEPROYECTO` int(11) DEFAULT NULL,      -- ID del anteproyecto relacionado
  `TITULO` varchar(200) NOT NULL,
  `MENSAJE` text NOT NULL,
  `TIPO` enum('asignacion','comentario','aprobacion','rechazo','actualizacion'),
  `LEIDA` tinyint(1) NOT NULL DEFAULT '0',      -- 0 = no leída, 1 = leída
  `FECHA_CREACION` datetime DEFAULT CURRENT_TIMESTAMP,
  `FECHA_LECTURA` datetime DEFAULT NULL,
  PRIMARY KEY (`CVE_NOTIFICACION`),
  FOREIGN KEY (`CVE_USUARIOS`) REFERENCES `usuarios` (`CVE_USUARIOS`),
  FOREIGN KEY (`CVE_ANTEPROYECTO`) REFERENCES `anteproyecto` (`CVE_ANTEPROYECTO`)
);
```

## 📁 Archivos Creados/Modificados

### Backend:

1. **`backend/estudiantes/GuardarAnteproyecto.php`**
   - Modificado para crear notificación al asesor cuando se guarda el anteproyecto

2. **`backend/asesores/ObtenerNotificaciones.php`**
   - Endpoint para obtener notificaciones del asesor
   - Devuelve JSON con notificaciones y contador de no leídas

3. **`backend/asesores/MarcarNotificacionLeida.php`**
   - Endpoint para marcar una notificación como leída

### Frontend:

4. **`public/api/asesores/ObtenerNotificaciones.php`**
   - Punto de entrada público para obtener notificaciones

5. **`public/api/asesores/MarcarNotificacionLeida.php`**
   - Punto de entrada público para marcar como leída

6. **`public/asesores/scripts/Notificaciones.js`**
   - Script JavaScript que implementa el polling en tiempo real
   - Actualiza notificaciones cada 5 segundos
   - Muestra notificaciones nuevas con animación

7. **`public/asesores/views/PantallaInicio.html`**
   - Modificado para mostrar notificaciones dinámicamente
   - Agregado contador de notificaciones no leídas

8. **`public/asesores/styles/PantallaInicio.css`**
   - Agregados estilos para notificaciones no leídas
   - Agregada animación para notificaciones nuevas

### Base de Datos:

9. **`database/crear_tabla_notificaciones.sql`**
   - Script SQL para crear la tabla de notificaciones

## 🚀 Instalación

### Paso 1: Crear la tabla de notificaciones

Ejecuta el script SQL:

```bash
mysql -u root -p proyectoaweb < database/crear_tabla_notificaciones.sql
```

O desde phpMyAdmin:
- Selecciona la base de datos `proyectoaweb`
- Ve a la pestaña "SQL"
- Copia y pega el contenido de `database/crear_tabla_notificaciones.sql`
- Haz clic en "Continuar"

### Paso 2: Verificar que funciona

1. Inicia sesión como asesor
2. En otra pestaña, inicia sesión como estudiante
3. Crea un nuevo anteproyecto
4. La notificación debería aparecer automáticamente en el dashboard del asesor

## ⚙️ Cómo Funciona

### Flujo de Notificación:

1. **Estudiante crea anteproyecto** → `GuardarAnteproyecto.php`
2. **Sistema asigna asesor** → Busca asesor de la misma división
3. **Se crea notificación** → Se inserta en la tabla `notificaciones`
4. **Asesor ve notificación** → El JavaScript hace polling cada 5 segundos
5. **Notificación nueva** → Se muestra con animación y badge rojo
6. **Asesor hace clic** → Se marca como leída

### Polling en Tiempo Real:

El sistema usa **polling** (consulta periódica) en lugar de WebSockets por simplicidad:

- **Intervalo:** 5 segundos
- **Optimización:** Se detiene cuando la pestaña está oculta
- **Detección de nuevas:** Compara el ID de la última notificación

## 🎨 Características Visuales

- **Badge rojo:** Muestra el número de notificaciones no leídas
- **Notificaciones no leídas:** Fondo azul claro con borde izquierdo azul
- **Notificaciones leídas:** Fondo blanco, texto gris
- **Toast flotante:** Aparece cuando hay una notificación nueva
- **Animación:** Deslizamiento suave desde la derecha

## 🔧 Personalización

### Cambiar el intervalo de polling:

En `public/asesores/scripts/Notificaciones.js`:

```javascript
// Cambiar de 5000ms (5 segundos) a otro valor
intervaloNotificaciones = setInterval(cargarNotificaciones, 3000); // 3 segundos
```

### Agregar más tipos de notificaciones:

1. Agrega el tipo en el ENUM de la tabla:
   ```sql
   ALTER TABLE notificaciones 
   MODIFY TIPO enum('asignacion','comentario','aprobacion','rechazo','actualizacion','nuevo_tipo');
   ```

2. Crea la notificación con el nuevo tipo en el código PHP

## 📊 Tipos de Notificaciones

- **`asignacion`**: Se asignó un nuevo proyecto al asesor
- **`comentario`**: Nuevo comentario en un proyecto
- **`aprobacion`**: Proyecto aprobado
- **`rechazo`**: Proyecto rechazado
- **`actualizacion`**: Proyecto actualizado

## ✅ Ventajas de esta Implementación

1. **Simple:** No requiere WebSockets ni servidores adicionales
2. **Compatible:** Funciona en cualquier navegador moderno
3. **Eficiente:** Se detiene cuando la pestaña está oculta
4. **Escalable:** Fácil agregar más tipos de notificaciones
5. **Visual:** Feedback inmediato con animaciones

## 🔍 Verificación

Para verificar que las notificaciones se están creando:

```sql
SELECT * FROM notificaciones ORDER BY FECHA_CREACION DESC;
```

Para ver notificaciones de un asesor específico:

```sql
SELECT n.*, u.CORREO 
FROM notificaciones n
INNER JOIN usuarios u ON n.CVE_USUARIOS = u.CVE_USUARIOS
WHERE u.CORREO = 'asesor@ut.edu.mx'
ORDER BY n.FECHA_CREACION DESC;
```

---

**Sistema implementado y listo para usar.** 🎉

