<?php
session_start();

// Verificar si el usuario tiene sesión activa
if (!isset($_SESSION["usuario_id"])) {
    header("Location: PantallaInicio.html"); // redirige al login si no hay sesión
    exit();
}

// Verificar si el usuario tiene sesión activa
if (!isset($_SESSION["usuario_id"])) {
    header("Location: PantallaInicio.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>GEUT - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">

    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold text-blue-600">Bienvenido al sistema de estadías</h1>
        <p class="mt-2 text-gray-700">
            Has iniciado sesión correctamente.<br>
            Tu rol es: <strong><?php echo $_SESSION["rol"]; ?></strong>
        </p>

        <div class="mt-6">
            <a href="logout.php" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Cerrar sesión
            </a>
        </div>
    </div>

</body>
</html>