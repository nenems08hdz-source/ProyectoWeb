<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
include "conexion.php";
 
$municipioId = isset($_GET['municipio_id']) ? (int)$_GET['municipio_id'] : 0;

try {
    $sql = "SELECT CVE_COLONIA AS id, NOMBRE AS nombre 
            FROM COLONIAS 
            WHERE CVE_MUNICIPIO = :municipioId 
            ORDER BY NOMBRE";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':municipioId', $municipioId, PDO::PARAM_INT);
    $stmt->execute();

    $colonias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($colonias, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}