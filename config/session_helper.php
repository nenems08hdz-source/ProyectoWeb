<?php
/**
 * session_helper.php
 * Helper para manejar sesiones con nombres diferentes según el contexto
 * Permite múltiples sesiones simultáneas en el mismo navegador
 */

// Variable global para rastrear la sesión actual
$sesion_actual = null;

/**
 * Iniciar sesión con nombre específico según el contexto
 * @param string $contexto Contexto de la sesión: 'estudiante', 'asesor', o 'general'
 */
function iniciarSesionSegura($contexto = 'general') {
    global $sesion_actual;
    
    // Definir nombre de sesión según el contexto
    $nombre_sesion = '';
    switch ($contexto) {
        case 'estudiante':
            $nombre_sesion = 'GEUT_ESTUDIANTE';
            break;
        case 'asesor':
            $nombre_sesion = 'GEUT_ASESOR';
            break;
        default:
            $nombre_sesion = 'GEUT_GENERAL';
            break;
    }
    
    // Cerrar cualquier sesión activa primero (importante para cambiar entre sesiones)
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_write_close();
    }
    
    // Establecer el nuevo nombre de sesión ANTES de iniciar
    session_name($nombre_sesion);
    
    // Configurar parámetros de la cookie de sesión para evitar conflictos
    session_set_cookie_params([
        'lifetime' => 0, // Sesión de navegador
        'path' => '/',
        'domain' => '',
        'secure' => false, // Cambiar a true en producción con HTTPS
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    
    // Iniciar la nueva sesión
    session_start();
    
    $sesion_actual = $nombre_sesion;
}

/**
 * Detectar contexto automáticamente desde la ruta
 * @return string Contexto detectado
 */
function detectarContexto() {
    $ruta = $_SERVER['REQUEST_URI'] ?? '';
    
    if (strpos($ruta, '/asesores/') !== false || strpos($ruta, '/api/asesores/') !== false) {
        return 'asesor';
    } elseif (strpos($ruta, '/estudiantes/') !== false || strpos($ruta, '/api/estudiantes/') !== false) {
        return 'estudiante';
    }
    
    return 'general';
}

