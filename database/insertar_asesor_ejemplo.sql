-- Script para insertar asesores académicos de ejemplo
-- Ejecuta este script si no tienes asesores en la base de datos

-- Obtener usuarios que ya son asesores pero no tienen registro en la tabla asesores
-- Usar los usuarios existentes con rol 'Asesor'

-- Asesor 1: Usar usuario existente 'maestro@hotmail.com' (CVE_USUARIOS = 6)
SET @usuario_id_1 = (SELECT CVE_USUARIOS FROM usuarios WHERE CORREO = 'maestro@hotmail.com' AND Rol = 'Asesor' LIMIT 1);

-- Asesor 2: Usar usuario existente 'gerardo_50@hotmail.com' (CVE_USUARIOS = 9)
SET @usuario_id_2 = (SELECT CVE_USUARIOS FROM usuarios WHERE CORREO = 'gerardo_50@hotmail.com' AND Rol = 'Asesor' LIMIT 1);

-- Insertar asesores académicos
-- Asesor 1: División de Tecnologías de la Información (división 2)
INSERT INTO asesores (CVE_ASESORES, CVE_USUARIOS, CVE_DIVISIONES, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO)
SELECT 1, @usuario_id_1, 2, 'Maestro', 'Ejemplo', 'Uno'
WHERE @usuario_id_1 IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM asesores WHERE CVE_USUARIOS = @usuario_id_1);

-- Asesor 2: División de Administración y Negocios (división 1)
INSERT INTO asesores (CVE_ASESORES, CVE_USUARIOS, CVE_DIVISIONES, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO)
SELECT 2, @usuario_id_2, 1, 'Gerardo', 'Ejemplo', 'Dos'
WHERE @usuario_id_2 IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM asesores WHERE CVE_USUARIOS = @usuario_id_2);

-- Si no hay usuarios asesores, crear uno nuevo
INSERT INTO usuarios (CORREO, CONTRASENA, ACTIVO, Rol) 
SELECT 'asesor@ut.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'Asesor'
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE CORREO = 'asesor@ut.edu.mx' AND Rol = 'Asesor');

-- Crear asesor para el usuario nuevo si se creó
INSERT INTO asesores (CVE_ASESORES, CVE_USUARIOS, CVE_DIVISIONES, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO)
SELECT 
    COALESCE((SELECT MAX(CVE_ASESORES) FROM asesores), 0) + 1,
    (SELECT CVE_USUARIOS FROM usuarios WHERE CORREO = 'asesor@ut.edu.mx' AND Rol = 'Asesor' LIMIT 1),
    2,
    'Asesor',
    'Académico',
    'Ejemplo'
WHERE EXISTS (SELECT 1 FROM usuarios WHERE CORREO = 'asesor@ut.edu.mx' AND Rol = 'Asesor')
AND NOT EXISTS (SELECT 1 FROM asesores WHERE CVE_USUARIOS = (SELECT CVE_USUARIOS FROM usuarios WHERE CORREO = 'asesor@ut.edu.mx' AND Rol = 'Asesor' LIMIT 1));

-- Verificar que se insertaron correctamente
SELECT 
    a.CVE_ASESORES,
    a.NOMBRE,
    a.APELLIDO_PATERNO,
    a.APELLIDO_MATERNO,
    a.CVE_DIVISIONES,
    u.CORREO,
    u.Rol
FROM asesores a
INNER JOIN usuarios u ON a.CVE_USUARIOS = u.CVE_USUARIOS;

