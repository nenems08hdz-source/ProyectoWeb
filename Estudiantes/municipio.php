<?php
header('Content-Type: application/json; charset=utf-8');
include "conexion.php";

$sql = "SELECT CVE_MUNICIPIO AS id, NOMBRE AS nombre FROM municipios ORDER BY NOMBRE";
$stmt = $conn->prepare($sql);
$stmt->execute();

$municipios = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($municipios, JSON_UNESCAPED_UNICODE);