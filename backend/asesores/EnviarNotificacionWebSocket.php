<?php
/**
 * EnviarNotificacionWebSocket.php
 * Endpoint HTTP para enviar notificaciones al servidor WebSocket
 * Se llama desde GuardarAnteproyecto.php
 */

require_once __DIR__ . '/../../config/database.php';

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['usuario_id']) || !isset($input['notificacion'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit();
}

$usuario_id = $input['usuario_id'];
$notificacion = $input['notificacion'];

// Conectar al servidor WebSocket vía HTTP
// El servidor WebSocket debe tener un endpoint HTTP para recibir notificaciones
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8080/notificar');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'usuario_id' => $usuario_id,
    'notificacion' => $notificacion
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 1);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode == 200) {
    echo json_encode(['success' => true]);
} else {
    // Si el WebSocket no está disponible, la notificación ya está en la BD
    // así que no es crítico
    echo json_encode(['success' => true, 'warning' => 'WebSocket no disponible, notificación guardada en BD']);
}

