<?php
require_once __DIR__ . '/../../config/database.php';

$cve_anteproyecto = $_POST['cve_anteproyecto'];
$cve_usuarios = $_POST['cve_usuarios'];
$texto = $_POST['texto'];

$sql = "INSERT INTO comentarios (CVE_ANTEPROYECTO, CVE_USUARIOS, TEXTO) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt->execute([$cve_anteproyecto, $cve_usuarios, $texto])) {
  header("Location: ../../public/asesores/views/VerAnteproyecto.html?id=" . $cve_anteproyecto);
} else {
  echo "Error al guardar el comentario";
}
?>