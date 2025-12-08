<?php
/**
 * ObtenerUsuarioId.php
 * Endpoint simple para obtener el usuario_id de la sesión actual
 */
require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('asesor');
require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "No hay sesión activa"]);
    exit();
}

echo json_encode([
    "success" => true,
    "usuario_id" => $_SESSION["usuario_id"]
]);

