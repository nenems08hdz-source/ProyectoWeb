<?php
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST['correo'] ?? '');
    $contrasena_plana = trim($_POST['contrasena'] ?? '');
    $rol = trim($_POST['rol'] ?? '');

    if (empty($correo) || empty($contrasena_plana) || empty($rol)) {
        die("Error: Faltan campos obligatorios.");
    }

    // Encriptar la contraseña
    $contrasena_hash = password_hash($contrasena_plana, PASSWORD_DEFAULT);

    // Insertar usuario
    $sql = "INSERT INTO usuarios (CORREO, CONTRASENA, ACTIVO, Rol)
            VALUES (:correo, :contrasena, 1, :rol)";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':contrasena', $contrasena_hash);
        $stmt->bindParam(':rol', $rol);
        $stmt->execute();

        header("Location: /estudiantes/views/index.html");
        exit();

    } catch (PDOException $e) {
        die("Error al registrar usuario: " . $e->getMessage());
    }

} else {
    header("Location: /estudiantes/views/Registro.html");
    exit();
}
?>
