<?php
include("conexion.php");

$cve_anteproyecto = $_POST['cve_anteproyecto'];
$cve_usuarios = $_POST['cve_usuarios'];
$texto = $_POST['texto'];

$sql = "INSERT INTO COMENTARIOS (CVE_ANTEPROYECTO, CVE_USUARIOS, TEXTO) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $cve_anteproyecto, $cve_usuarios, $texto);

if ($stmt->execute()) {
  header("Location: ver_anteproyecto.php?id=" . $cve_anteproyecto);
} else {
  echo "Error al guardar el comentario: " . $stmt->error;
}
?>