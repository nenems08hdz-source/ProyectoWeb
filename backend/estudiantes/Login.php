<?php
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST["correo"] ?? '');
    $contrasena = trim($_POST["contrasena"] ?? '');

    if (empty($correo) || empty($contrasena)) {
        echo "
        <script>
            alert('Debes llenar todos los campos.');
            window.location.href = '/estudiantes/views/Login.html';
        </script>";
        exit();
    }

    // Buscar usuario en la base de datos
    $sql = "SELECT CVE_USUARIOS, CONTRASENA, Rol 
            FROM usuarios 
            WHERE CORREO = :correo AND ACTIVO = 1";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Validar credenciales
    if ($usuario && password_verify($contrasena, $usuario["CONTRASENA"])) {
        
        // IMPORTANTE: Cerrar cualquier sesión previa
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_write_close();
        }
        
        // Determinar el contexto según el rol ANTES de iniciar sesión
        $contexto = ($usuario["Rol"] === "Asesor") ? 'asesor' : 'estudiante';
        
        // Iniciar sesión con el contexto correcto
        require_once __DIR__ . '/../../config/session_helper.php';
        iniciarSesionSegura($contexto);

        // Crear variables de sesión
        $_SESSION["usuario_id"] = $usuario["CVE_USUARIOS"];
        $_SESSION["rol"] = $usuario["Rol"];

        // Redirigir según el rol
        if ($_SESSION["rol"] === "Alumno") {
            header("Location: /estudiantes/views/Pantallaprincipal.html");
        } elseif ($_SESSION["rol"] === "Asesor") {
            header("Location: /asesores/views/PantallaInicio.html");
        } else {
            // Rol desconocido → página genérica
            header("Location: /estudiantes/views/index.html");
        }
        exit();

    } else {
        echo "
        <script>
            alert('Correo o contraseña incorrectos.');
            window.location.href = '/estudiantes/views/index.html';
        </script>";
        exit();
    }
}
?>