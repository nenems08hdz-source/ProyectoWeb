<?php
/**
 * MarcarNotificacionLeida.php
 * Endpoint para marcar una notificación como leída
 */
session_start();
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar que el usuario tenga sesión activa y sea asesor
if (!isset($_SESSION["usuario_id"]) || $_SESSION["rol"] !== "Asesor") {
    echo json_encode(["error" => "No autorizado"]);
    exit();
}

$usuario_id = $_SESSION["usuario_id"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cve_notificacion = $_POST['cve_notificacion'] ?? null;
    
    if (!$cve_notificacion) {
        echo json_encode(["error" => "ID de notificación requerido"]);
        exit();
    }
    
    try {
        // Verificar que la notificación pertenece al usuario
        $sqlVerificar = "SELECT CVE_NOTIFICACION FROM notificaciones 
                         WHERE CVE_NOTIFICACION = :cve_notif AND CVE_USUARIOS = :usuario_id";
        $stmt = $conn->prepare($sqlVerificar);
        $stmt->bindParam(':cve_notif', $cve_notificacion, PDO::PARAM_INT);
        $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $stmt->execute();
        
        if (!$stmt->fetch()) {
            echo json_encode(["error" => "Notificación no encontrada o no autorizada"]);
            exit();
        }
        
        // Marcar como leída
        $sql = "UPDATE notificaciones 
                SET LEIDA = 1, FECHA_LECTURA = NOW() 
                WHERE CVE_NOTIFICACION = :cve_notif AND CVE_USUARIOS = :usuario_id";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':cve_notif', $cve_notificacion, PDO::PARAM_INT);
        $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $stmt->execute();
        
        echo json_encode(["success" => true, "message" => "Notificación marcada como leída"]);
        
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al actualizar notificación: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}

