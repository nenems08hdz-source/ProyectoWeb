<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
include "conexion.php";

$divisionId = isset($_GET['division_id']) ? (int)$_GET['division_id'] : 0;

try {
    $sql = "SELECT CVE_CARRERAS AS id, NOMBRE AS nombre 
            FROM CARRERAS 
            WHERE CVE_DIVISIONES = :divisionId 
            ORDER BY NOMBRE";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':divisionId', $divisionId, PDO::PARAM_INT);
    $stmt->execute();

    $carreras = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($carreras, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}