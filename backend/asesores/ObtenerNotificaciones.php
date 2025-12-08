<?php
/**
 * ObtenerNotificaciones.php
 * Endpoint para obtener las notificaciones del asesor en tiempo real
 */
require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('asesor');
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar que el usuario tenga sesión activa y sea asesor
if (!isset($_SESSION["usuario_id"]) || $_SESSION["rol"] !== "Asesor") {
    echo json_encode(["error" => "No autorizado"]);
    exit();
}

$usuario_id = $_SESSION["usuario_id"];

try {
    // Obtener notificaciones no leídas del asesor
    $sql = "SELECT 
                n.CVE_NOTIFICACION,
                n.CVE_ANTEPROYECTO,
                n.TITULO,
                n.MENSAJE,
                n.TIPO,
                n.LEIDA,
                n.FECHA_CREACION,
                a.TITULO as TITULO_ANTEPROYECTO,
                al.NOMBRE as NOMBRE_ALUMNO,
                al.APELLIDO_PATERNO,
                al.APELLIDO_MATERNO
            FROM notificaciones n
            LEFT JOIN anteproyecto a ON n.CVE_ANTEPROYECTO = a.CVE_ANTEPROYECTO
            LEFT JOIN alumnos al ON a.CVE_ALUMNOS = al.CVE_ALUMNOS
            WHERE n.CVE_USUARIOS = :usuario_id
            ORDER BY n.FECHA_CREACION DESC
            LIMIT 20";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->execute();
    $notificaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Contar notificaciones no leídas
    $sqlNoLeidas = "SELECT COUNT(*) as total 
                    FROM notificaciones 
                    WHERE CVE_USUARIOS = :usuario_id AND LEIDA = 0";
    $stmt = $conn->prepare($sqlNoLeidas);
    $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->execute();
    $contador = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Formatear fechas para mostrar tiempo relativo
    foreach ($notificaciones as &$notif) {
        $fecha = new DateTime($notif['FECHA_CREACION']);
        $ahora = new DateTime();
        $diferencia = $ahora->diff($fecha);
        
        if ($diferencia->days > 0) {
            $notif['TIEMPO_RELATIVO'] = "Hace " . $diferencia->days . " día(s)";
        } elseif ($diferencia->h > 0) {
            $notif['TIEMPO_RELATIVO'] = "Hace " . $diferencia->h . " hora(s)";
        } elseif ($diferencia->i > 0) {
            $notif['TIEMPO_RELATIVO'] = "Hace " . $diferencia->i . " minuto(s)";
        } else {
            $notif['TIEMPO_RELATIVO'] = "Hace unos segundos";
        }
    }
    
    $response = [
        "success" => true,
        "notificaciones" => $notificaciones,
        "no_leidas" => (int)$contador['total']
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Error al obtener notificaciones: " . $e->getMessage()
    ]);
}

