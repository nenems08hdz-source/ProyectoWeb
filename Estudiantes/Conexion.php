<?php
/**
 * db_config.php
 * Archivo de configuración para la conexión a la base de datos usando PDO.
 * * Es buena práctica incluir este archivo en cualquier script PHP
 * que necesite interactuar con la base de datos.
 */

// --- 1. VARIABLES DE CONFIGURACIÓN ---
// ¡IMPORTANTE! Reemplaza estos valores con los datos de tu base de datos
$db_host = 'localhost'; // El host, generalmente 'localhost' o una IP
$db_name = 'proyectoaweb'; // El nombre de la base de datos
$db_user = 'root'; // Tu usuario
$db_pass = 'mariel06'; // Tu contraseña
$db_charset = 'utf8mb4'; // Conjunto de caracteres recomendado para soportar emojis y más


// --- 2. CONFIGURACIÓN DSN (Data Source Name) ---
// Define la cadena DSN para la conexión (tipo de base de datos y host)
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";

// --- 3. OPCIONES DE PDO ---
$options = [
    // Lanza excepciones en caso de error
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    // Desactiva la emulación de prepared statements (más seguro)
    PDO::ATTR_EMULATE_PREPARES   => false,
    // Establece el modo de fetch por defecto a objetos (opcional, pero útil)
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

// --- 4. INTENTO DE CONEXIÓN ---
try {
     // Crea una nueva instancia de PDO
    $conn = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Si la conexión es exitosa, la variable $pdo contendrá el objeto de conexión
    
} catch (\PDOException $e) {
    // Si hay un error de conexión, captura la excepción y muestra un mensaje amigable.
    // En un entorno de producción, nunca muestres $e->getMessage() al usuario final por seguridad.
    
    // Detiene la ejecución y muestra un error
    die("Error de conexión a la base de datos: " . $e->getMessage()); 
}