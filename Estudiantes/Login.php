<?php
session_start();
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST["correo"] ?? '');
    $contrasena = trim($_POST["contrasena"] ?? '');

    if (empty($correo) || empty($contrasena)) {
        echo "
        <script>
            alert('Debes llenar todos los campos.');
            window.location.href = 'Login.html';
        </script>";
        exit();
    }

    // Buscar usuario en la base de datos
    $sql = "SELECT CVE_USUARIOS, CONTRASENA, Rol 
            FROM USUARIOS 
            WHERE CORREO = :correo AND ACTIVO = 1";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Validar credenciales
    if ($usuario && password_verify($contrasena, $usuario["CONTRASENA"])) {

        // Crear variables de sesión
        $_SESSION["usuario_id"] = $usuario["CVE_USUARIOS"];
        $_SESSION["rol"] = $usuario["Rol"];

        // Redirigir según el rol
        if ($_SESSION["rol"] === "Alumno") {
            header("Location: Pantallaprincipal.html");
        } elseif ($_SESSION["rol"] === "Asesor") {
            header("Location: ../Asesores/PantallaInicio.html");
        } else {
            // Rol desconocido → página genérica
            header("Location: index.html");
        }
        exit();

    } else {
        echo "
        <script>
            alert('Correo o contraseña incorrectos.');
            window.location.href = 'index.html';
        </script>";
        exit();
    }
}
?>