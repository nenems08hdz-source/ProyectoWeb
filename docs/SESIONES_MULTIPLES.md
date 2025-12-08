# Sistema de Sesiones Múltiples

## Problema Resuelto

Anteriormente, cuando se abrían dos ventanas en el mismo navegador con diferentes usuarios (un estudiante y un asesor), las sesiones se sobrescribían porque PHP usa la misma cookie de sesión (`PHPSESSID`) para todas las pestañas.

## Solución Implementada

Se implementó un sistema de sesiones con nombres diferentes según el contexto:

- **Estudiantes:** Usan la cookie `GEUT_ESTUDIANTE`
- **Asesores:** Usan la cookie `GEUT_ASESOR`
- **General:** Usa la cookie `GEUT_GENERAL` (para casos especiales)

Esto permite que múltiples usuarios puedan estar autenticados simultáneamente en el mismo navegador sin interferir entre sí.

## Archivos Modificados

### Nuevo Archivo:

1. **`config/session_helper.php`**
   - Función `iniciarSesionSegura($contexto)` que maneja sesiones según el contexto
   - Detecta automáticamente el contexto desde la ruta (opcional)

### Archivos Actualizados:

Todos los archivos que usan `session_start()` ahora usan `iniciarSesionSegura()`:

**Estudiantes:**
- `backend/estudiantes/Login.php`
- `backend/estudiantes/GuardarAnteproyecto.php`
- `backend/estudiantes/Principal.php`
- `backend/estudiantes/PantallaInicio.php`

**Asesores:**
- `backend/asesores/ObtenerNotificaciones.php`
- `backend/asesores/MarcarNotificacionLeida.php`

## Cómo Funciona

1. Cuando un estudiante inicia sesión, se crea una cookie `GEUT_ESTUDIANTE`
2. Cuando un asesor inicia sesión, se crea una cookie `GEUT_ASESOR`
3. Cada cookie es independiente y no interfiere con la otra
4. Las pestañas pueden tener diferentes usuarios autenticados simultáneamente

## Uso

### En archivos PHP:

```php
// Para estudiantes
require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('estudiante');

// Para asesores
require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('asesor');
```

### Verificación:

Después de iniciar sesión, puedes verificar las cookies en las herramientas de desarrollador:
- **Estudiante:** Cookie `GEUT_ESTUDIANTE`
- **Asesor:** Cookie `GEUT_ASESOR`

## Ventajas

- ✅ Múltiples usuarios simultáneos en el mismo navegador
- ✅ Sesiones independientes por rol
- ✅ No hay interferencia entre usuarios
- ✅ Compatible con el sistema de notificaciones en tiempo real
- ✅ Fácil de mantener y extender

## Notas Importantes

- Las sesiones se mantienen independientes mientras las pestañas estén abiertas
- Al cerrar todas las pestañas de un tipo de usuario, su sesión se mantiene hasta expirar
- El tiempo de expiración de sesión sigue siendo el configurado en PHP (`session.gc_maxlifetime`)

---

**Problema resuelto:** Ahora puedes tener un estudiante y un asesor autenticados simultáneamente en el mismo navegador sin conflictos.

