* * !!! DEBES REEMPLAZAR los valores de db_user, db_pass y db_name con tus credenciales reales. !!!
 */

$db_host = 'localhost'; // Normalmente 'localhost' o la IP de tu servidor de BD
$db_name = 'nombre_de_tu_base_de_datos'; // <-- REEMPLAZA
$db_user = 'usuario_de_tu_base_de_datos'; // <-- REEMPLAZA
$db_pass = 'tu_contrasena_secreta'; // <-- REEMPLAZA

$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";

// Opciones de configuración de PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Lanzar excepciones en caso de error
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Obtener resultados como array asociativo
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Deshabilitar la emulación para mayor seguridad
];

try {
    // Crear la instancia de conexión PDO
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (\PDOException $e) {
    // Si la conexión falla, registrar el error y devolver un error genérico
    error_log("Error de conexión a la BD: " . $e->getMessage());
    // Este mensaje solo se verá si el script falla al cargar db_config.php
    die("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
}
?>