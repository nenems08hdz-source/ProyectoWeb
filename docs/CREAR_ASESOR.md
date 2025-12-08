# Cómo Crear un Asesor Académico

## 🚨 Problema

Si intentas guardar un anteproyecto y recibes el error:
```
No hay asesores académicos disponibles
```

Significa que no hay asesores registrados en la base de datos.

## ✅ Solución Rápida

### Opción 1: Usar el Script SQL (Recomendado)

1. **Ejecuta el script SQL:**
   ```bash
   mysql -u root -p proyectoaweb < database/insertar_asesor_ejemplo.sql
   ```

   O desde phpMyAdmin:
   - Selecciona la base de datos `proyectoaweb`
   - Ve a la pestaña "SQL"
   - Copia y pega el contenido de `database/insertar_asesor_ejemplo.sql`
   - Haz clic en "Continuar"

2. **Credenciales del asesor de ejemplo:**
   - **Correo:** `asesor@ut.edu.mx`
   - **Contraseña:** `password`
   - **Rol:** Asesor

### Opción 2: Crear Manualmente desde phpMyAdmin

1. **Crear el usuario:**
   ```sql
   INSERT INTO usuarios (CORREO, CONTRASENA, ACTIVO, Rol) 
   VALUES (
       'asesor@ut.edu.mx', 
       '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
       1, 
       'Asesor'
   );
   ```

2. **Obtener el ID del usuario:**
   ```sql
   SELECT CVE_USUARIOS FROM usuarios WHERE CORREO = 'asesor@ut.edu.mx';
   ```

3. **Crear el asesor:**
   ```sql
   INSERT INTO asesores (CVE_ASESORES, CVE_USUARIOS, CVE_DIVISIONES, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO)
   VALUES (
       1,
       [ID_DEL_USUARIO],  -- Reemplaza con el ID obtenido en el paso 2
       2,                 -- División (1-5 según tu necesidad)
       'Asesor',
       'Académico',
       'Ejemplo'
   );
   ```

### Opción 3: Registrar desde la Interfaz Web

Si tienes una página de registro para asesores:
1. Ve a `http://localhost:8000/estudiantes/views/Registro.html`
2. Selecciona el rol "Asesor"
3. Completa el formulario
4. Luego necesitarás completar los datos del asesor en la tabla `asesores`

## 📋 Divisiones Disponibles

Según tu base de datos, las divisiones son:

1. **División Académica de Administración y Negocios**
2. **División Académica de Tecnologías de la Información**
3. **División Académica de Procesos Industriales**
4. **División Académica de Química**
5. **División Académica de Turismo y Gastronomía**

Ajusta el `CVE_DIVISIONES` en el script según la división que necesites.

## 🔍 Verificar que Funcionó

Ejecuta esta consulta para verificar:
```sql
SELECT a.*, u.CORREO, u.Rol 
FROM asesores a
INNER JOIN usuarios u ON a.CVE_USUARIOS = u.CVE_USUARIOS;
```

Deberías ver al menos un asesor en los resultados.

## ⚠️ Nota Importante

El sistema intentará crear un asesor temporal automáticamente si no encuentra ninguno, pero es mejor crear al menos uno manualmente para evitar problemas.

---

**Después de crear el asesor, intenta guardar el anteproyecto nuevamente.**

