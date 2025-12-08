<?php
/**
 * ObtenerAnteproyecto.php
 * Endpoint para obtener los datos completos de un anteproyecto por ID
 */
require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('estudiante');
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar que el usuario tenga sesión activa
if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "No hay sesión activa"]);
    exit();
}

// Obtener el ID del anteproyecto desde la URL
$anteproyecto_id = $_GET['id'] ?? null;

if (!$anteproyecto_id) {
    echo json_encode(["error" => "ID de anteproyecto no proporcionado"]);
    exit();
}

try {
    // Consulta completa para obtener todos los datos del anteproyecto
    $sql = "SELECT 
                -- Datos del anteproyecto
                a.CVE_ANTEPROYECTO,
                COALESCE(a.TITULO, '-') AS TITULO,
                COALESCE(a.OBJETIVO_GENERAL, '-') AS OBJETIVO_GENERAL,
                COALESCE(a.JUSTIFICACION, '-') AS JUSTIFICACION,
                COALESCE(a.ACTIVIDADES_PROPUESTAS, '-') AS ACTIVIDADES_PROPUESTAS,
                COALESCE(a.METODOLOGIA, '-') AS METODOLOGIA,
                
                -- Datos del estudiante
                COALESCE(al.NOMBRE, '-') AS nombre_estudiante,
                COALESCE(al.APELLIDO_PATERNO, '-') AS apellido_paterno,
                COALESCE(al.APELLIDO_MATERNO, '-') AS apellido_materno,
                COALESCE(al.MATRICULA, '-') AS MATRICULA,
                COALESCE(al.GRUPO, '-') AS GRUPO,
                COALESCE(al.CUATRIMESTRE, '-') AS CUATRIMESTRE,
                COALESCE(al.TELEFONO, '-') AS telefono_estudiante,
                COALESCE(u.CORREO, '-') AS correo_estudiante,
                
                -- Datos de la división y carrera
                COALESCE(d.NOMBRE, '-') AS nombre_division,
                COALESCE((SELECT c.NOMBRE FROM carreras c WHERE c.CVE_DIVISIONES = al.CVE_DIVISIONES LIMIT 1), '-') AS nombre_carrera,
                
                -- Datos de la empresa
                COALESCE(e.NOMBRE, '-') AS nombre_empresa,
                COALESCE(e.DIRECCION, '-') AS direccion_empresa,
                COALESCE(e.CORREO, '-') AS correo_empresa,
                COALESCE(e.NOMBRE_ASESOR_EMP, '-') AS nombre_asesor_empresa,
                COALESCE(e.TELEFONO_ASESOR, '-') AS telefono_asesor_empresa,
                COALESCE(e.AREA, '-') AS area_asesor_empresa,
                COALESCE(e.SECTOR, '-') AS sector_empresa,
                
                -- Datos de ubicación
                COALESCE(m.NOMBRE, '-') AS nombre_municipio,
                COALESCE(col.NOMBRE, '-') AS nombre_colonia,
                CONCAT(
                    COALESCE(e.DIRECCION, '-'), 
                    CASE WHEN col.NOMBRE IS NOT NULL AND col.NOMBRE != '' THEN CONCAT(', Col. ', col.NOMBRE) ELSE '' END,
                    CASE WHEN m.NOMBRE IS NOT NULL AND m.NOMBRE != '' THEN CONCAT(', ', m.NOMBRE) ELSE '' END,
                    ', Tabasco, C.P. 86000'
                ) AS direccion_completa
                
            FROM anteproyecto a
            INNER JOIN alumnos al ON a.CVE_ALUMNOS = al.CVE_ALUMNOS
            INNER JOIN usuarios u ON al.CVE_USUARIOS = u.CVE_USUARIOS
            INNER JOIN divisiones d ON al.CVE_DIVISIONES = d.CVE_DIVISIONES
            INNER JOIN empresas_vinculadas e ON a.CVE_EMPRESAS_VINCULADAS = e.CVE_EMPRESAS_VINCULADAS
            LEFT JOIN colonias col ON e.CVE_COLONIA = col.CVE_COLONIA
            LEFT JOIN municipios m ON col.CVE_MUNICIPIO = m.CVE_MUNICIPIO
            WHERE a.CVE_ANTEPROYECTO = :anteproyecto_id
            AND al.CVE_USUARIOS = :usuario_id";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':anteproyecto_id', $anteproyecto_id, PDO::PARAM_INT);
    $stmt->bindParam(':usuario_id', $_SESSION["usuario_id"], PDO::PARAM_INT);
    $stmt->execute();
    
    $anteproyecto = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$anteproyecto) {
        echo json_encode(["error" => "Anteproyecto no encontrado o no tienes permisos para verlo"]);
        exit();
    }
    
    // Usar fecha actual para la fecha de registro (la tabla no tiene este campo)
    $anteproyecto['FECHA_REGISTRO_FORMATEADA'] = date('d-m-Y');
    
    // Construir nombre completo del estudiante
    $anteproyecto['NOMBRE_COMPLETO'] = trim(
        $anteproyecto['nombre_estudiante'] . ' ' . 
        $anteproyecto['apellido_paterno'] . ' ' . 
        $anteproyecto['apellido_materno']
    );
    
    echo json_encode([
        "success" => true,
        "data" => $anteproyecto
    ], JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Error al obtener datos: " . $e->getMessage()
    ]);
}

