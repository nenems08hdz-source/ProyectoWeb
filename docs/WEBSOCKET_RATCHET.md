# Sistema de Notificaciones con WebSockets (Ratchet)

## Descripción

Sistema de notificaciones en tiempo real usando WebSockets con Ratchet. Cuando un estudiante registra un anteproyecto, el asesor asignado recibe la notificación instantáneamente.

## Instalación

### Paso 1: Instalar Composer (si no lo tienes)

```bash
# macOS/Linux
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Windows: Descarga desde https://getcomposer.org/download/
```

### Paso 2: Instalar Ratchet y dependencias

```bash
cd /Users/lecibur/Developer/tutorias/ProyectoWeb
composer install
```

O si ya tienes composer:

```bash
composer require cboden/ratchet react/http
```

### Paso 3: Iniciar el Servidor WebSocket

En una terminal separada, ejecuta:

```bash
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

**Nota:** El puerto 8084 se usa porque otros puertos pueden estar ocupados.

**IMPORTANTE:** El servidor WebSocket debe estar corriendo todo el tiempo mientras uses la aplicación.

## Cómo Funciona

### Flujo Completo:

1. **Estudiante registra anteproyecto** → `GuardarAnteproyecto.php`
2. **Sistema asigna asesor** → Busca asesor de la misma división
3. **Se crea notificación en BD** → Tabla `notificaciones`
4. **Se envía notificación al WebSocket** → HTTP POST a `http://localhost:8083/notificar`
5. **Servidor WebSocket busca cliente conectado** → Busca por `usuario_id`
6. **Servidor envía notificación vía WebSocket** → Cliente conectado recibe instantáneamente
7. **Cliente JavaScript muestra notificación** → Toast + actualización de lista

### Arquitectura:

- **Servidor WebSocket** (`websocket/websocket-server.php`)
  - Escucha en `ws://localhost:8084` para conexiones WebSocket
  - Consulta la BD cada 2 segundos buscando nuevas notificaciones
  - Maneja múltiples conexiones simultáneas
  - Autentica usuarios por `usuario_id`
  - Envía notificaciones solo a usuarios conectados

- **Cliente WebSocket** (`NotificacionesWS.js`)
  - Se conecta al servidor cuando el asesor carga la página
  - Se autentica enviando su `usuario_id`
  - Recibe notificaciones en tiempo real

- **Envío de Notificaciones** (`GuardarAnteproyecto.php`)
  - Cuando se crea un anteproyecto, crea la notificación en BD
  - El servidor WebSocket detecta automáticamente la nueva notificación (máximo 2 segundos)
  - El servidor WebSocket la envía al cliente conectado

## Archivos Creados

### Backend:

1. **`websocket/websocket-server.php`**
   - Servidor WebSocket con Ratchet
   - Maneja conexiones y autenticación
   - Endpoint HTTP para recibir notificaciones

2. **`backend/asesores/EnviarNotificacionWS.php`**
   - Función para enviar notificaciones al WebSocket
   - Se llama desde `GuardarAnteproyecto.php`

3. **`backend/asesores/ObtenerUsuarioId.php`**
   - Endpoint para obtener el `usuario_id` de la sesión
   - Usado por el cliente JavaScript para autenticarse

### Frontend:

4. **`public/api/asesores/ObtenerUsuarioId.php`**
   - Punto de entrada público

5. **`public/asesores/scripts/NotificacionesWS.js`**
   - Cliente JavaScript WebSocket
   - Maneja conexión, autenticación y recepción de notificaciones

## Ventajas sobre Polling

- ✅ **Tiempo real**: Notificaciones instantáneas
- ✅ **Eficiente**: Solo envía datos cuando hay notificaciones
- ✅ **Escalable**: Maneja múltiples conexiones simultáneas
- ✅ **Múltiples sesiones**: Funciona con varios navegadores abiertos

## Configuración

### Cambiar Puertos

Si el puerto 8084 está ocupado, edita `websocket/websocket-server.php`:

```php
// Cambiar puerto WebSocket (línea ~172)
$puerto = 8084; // Cambiar aquí
```

Y actualiza `NotificacionesWS.js`:

```javascript
const puerto = 8084; // Cambiar aquí
```

## Solución de Problemas

### Error: "Ratchet no está instalado"
```bash
composer require cboden/ratchet react/http
```

### Error: "Puerto ya en uso"
- Cambia el puerto en la configuración
- O mata el proceso que usa el puerto:
  ```bash
  # Ver qué usa el puerto
  lsof -i:8084
  # Matar el proceso (reemplaza PID con el número del proceso)
  kill -9 PID
  ```

### Las notificaciones no llegan
1. Verifica que el servidor WebSocket esté corriendo
2. Verifica en la consola del navegador que el WebSocket esté conectado
3. Verifica que el usuario_id sea correcto
4. Revisa los logs del servidor WebSocket

### Múltiples sesiones funcionan correctamente
- Cada navegador tiene su propia conexión WebSocket
- Cada conexión se autentica con su propio `usuario_id`
- Las notificaciones se envían solo al usuario correcto

## Mantener el Servidor Corriendo

### Opción A: Terminal separada (Desarrollo)
- Deja la terminal abierta con el servidor corriendo

### Opción B: Screen/Tmux (Recomendado)
```bash
# Usar screen
screen -S websocket
php websocket/websocket-server.php
# Presiona Ctrl+A luego D para desacoplar

# Para volver a ver:
screen -r websocket
```

### Opción C: Servicio del Sistema (Producción)
Crear un servicio systemd (Linux) o usar supervisor.

---

**Sistema implementado y listo para usar.** Las notificaciones ahora son instantáneas usando WebSockets con Ratchet.

