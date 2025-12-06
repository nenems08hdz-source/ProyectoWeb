<?php
// Iniciar la sesión para almacenar los datos del usuario si el login es exitoso
session_start();

// ==========================================================
// CONFIGURACIÓN DE LA BASE DE DATOS
// **AJUSTA ESTOS VALORES A TU ENTORNO**
// ==========================================================
$db_host = 'localhost';     // Generalmente localhost
$db_name = 'geut_db';       // El nombre de tu base de datos
$db_user = 'root';          // Tu usuario de DB 
$db_pass = '';              // Tu contraseña de DB 
$db_charset = 'utf8mb4';
$PANTALLA_PRINCIPAL = 'Pantallaprincipal.html'; // URL de la página a la que redireccionar

// ==========================================================
// 1. CONEXIÓN A LA BASE DE DATOS (PDO)
// ==========================================================
try {
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (\PDOException $e) {
    // Error de conexión a la base de datos
    die("Error de Conexión: La base de datos no está disponible.");
}


// ==========================================================
// 2. PROCESAMIENTO DE LOGIN
// ==========================================================

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 2.1. Sanitizar la entrada de datos
    $correo = trim($_POST['correo'] ?? '');
    $contrasena_ingresada = $_POST['contrasena'] ?? '';
    
    if (empty($correo) || empty($contrasena_ingresada)) {
        // Redirigir al login con un mensaje de error si faltan campos
        header("Location: login.html?error=campos_vacios");
        exit();
    }

    // 2.2. Buscar el usuario por correo en la base de datos
    // Se selecciona también la contraseña hasheada, el nombre y el rol.
    $sql = "SELECT CVE_USUARI, NOMBRE, CONTRASENA, CVE_ROLES, ACTIVO 
            FROM usuarios 
            WHERE CORREO = :correo";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $usuario = $stmt->fetch();

        // 2.3. Verificar si el usuario existe
        if ($usuario) {
            
            // 2.4. Verificar la contraseña
            if (password_verify($contrasena_ingresada, $usuario['CONTRASENA'])) {
                
                // 2.5. Verificar si la cuenta está activa (opcional pero recomendado)
                if ($usuario['ACTIVO'] != 1) {
                    header("Location: login.html?error=cuenta_inactiva");
                    exit();
                }

                // *** LOGIN EXITOSO ***
                
                // 2.6. Crear variables de sesión para mantener al usuario logeado
                $_SESSION['user_id'] = $usuario['CVE_USUARI'];
                $_SESSION['user_nombre'] = $usuario['NOMBRE'];
                $_SESSION['user_rol'] = $usuario['CVE_ROLES'];

                // 2.7. Redireccionar a la pantalla principal
                header("Location: $PANTALLA_PRINCIPAL");
                exit();
                
            } else {
                // Contraseña incorrecta
                header("Location: login.html?error=credenciales_invalidas");
                exit();
            }
        } else {
            // Usuario no encontrado (correo incorrecto)
            header("Location: login.html?error=credenciales_invalidas");
            exit();
        }

    } catch (\PDOException $e) {
        // Error en la consulta SQL
        header("Location: login.html?error=db_error");
        exit();
    }

} else {
    // Si se accede directamente sin POST, redirige al login
    header("Location: login.html");
    exit();
}
?>
