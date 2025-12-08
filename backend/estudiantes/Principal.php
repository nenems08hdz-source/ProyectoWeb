<?php
/**
 * Principal.php
 * Endpoint para obtener datos del dashboard del estudiante
 */
session_start();
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar que el usuario tenga sesión activa
if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "No hay sesión activa"]);
    exit();
}

$usuario_id = $_SESSION["usuario_id"];

try {
    // Obtener datos del estudiante
    $sql = "SELECT a.*, u.CORREO 
            FROM alumnos a
            INNER JOIN usuarios u ON a.CVE_USUARIOS = u.CVE_USUARIOS
            WHERE a.CVE_USUARIOS = :usuario_id
            LIMIT 1";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->execute();
    $alumno = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Obtener anteproyectos del estudiante
    $sql_anteproyectos = "SELECT COUNT(*) as total 
                          FROM anteproyecto 
                          WHERE CVE_ALUMNOS = :alumno_id";
    
    $stmt = $conn->prepare($sql_anteproyectos);
    $stmt->bindParam(':alumno_id', $alumno['CVE_ALUMNOS'] ?? 0, PDO::PARAM_INT);
    $stmt->execute();
    $anteproyectos = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Obtener comentarios pendientes
    $sql_comentarios = "SELECT COUNT(*) as total 
                        FROM comentarios c
                        INNER JOIN anteproyecto a ON c.CVE_ANTEPROYECTO = a.CVE_ANTEPROYECTO
                        WHERE a.CVE_ALUMNOS = :alumno_id 
                        AND c.ESTATUS = 'PENDIENTE'";
    
    $stmt = $conn->prepare($sql_comentarios);
    $stmt->bindParam(':alumno_id', $alumno['CVE_ALUMNOS'] ?? 0, PDO::PARAM_INT);
    $stmt->execute();
    $comentarios = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Preparar respuesta
    $response = [
        "success" => true,
        "alumno" => $alumno,
        "estadisticas" => [
            "anteproyectos" => $anteproyectos['total'] ?? 0,
            "comentarios_pendientes" => $comentarios['total'] ?? 0
        ]
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Error al obtener datos: " . $e->getMessage()
    ]);
}
