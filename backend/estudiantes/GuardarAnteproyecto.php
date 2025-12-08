<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../config/session_helper.php';
iniciarSesionSegura('estudiante');
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Datos del alumno
    $nombre          = $_POST['nombre'] ?? '';
    $apellidopaterno = $_POST['apellido-paterno'] ?? '';
    $apellidomaterno = $_POST['apellido-materno'] ?? '';
    $division        = $_POST['division'] ?? '';
    $carrera         = $_POST['carrera'] ?? '';
    $email           = $_POST['email'] ?? null;
    $matricula       = $_POST['matricula'] ?? null;
    $grupo           = $_POST['grupo'] ?? null;
    $cuatrimestre    = $_POST['cuatrimestre'] ?? null;
    $fecha           = $_POST['fecha-registro'] ?? date("Y-m-d");
    $telefono        = $_POST['telefono'] ?? null;

    // Datos de la empresa
    $nombre_empresa  = $_POST['nombre-empresa'] ?? null;
    $sector          = $_POST['sector'] ?? null;
    $direccion       = $_POST['direccion'] ?? null;
    $municipio_emp   = $_POST['municipio'] ?? null;
    // Convertir cadena vacía a NULL para campos numéricos
    $colonia_emp     = (!empty($_POST['colonia']) && $_POST['colonia'] !== '') ? (int)$_POST['colonia'] : null;
    $email_empresa   = $_POST['email-empresa'] ?? null;
    $asesor_empresa  = $_POST['nombre-asesor'] ?? null;
    $telefono_asesor = $_POST['numero'] ?? null;
    $area            = $_POST['area'] ?? null;

    // Datos del anteproyecto
    $titulo          = $_POST['titulo'] ?? null;
    $objetivo        = $_POST['objetivo'] ?? null;
    $justificacion   = $_POST['justificacion'] ?? null;
    $actividades     = $_POST['actividades'] ?? null;
    $metodologia     = $_POST['metodologia'] ?? null;

    try {
        // 1. Generar manualmente el CVE_ALUMNOS
        $stmt = $conn->query("SELECT MAX(CVE_ALUMNOS) AS max_id FROM alumnos");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $cve_alumno = ($row['max_id'] ?? 0) + 1;

        // Insertar alumno
        $sqlAlumno = "INSERT INTO alumnos (
            CVE_ALUMNOS, CVE_USUARIOS, CVE_DIVISIONES, MATRICULA, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO,
            GRUPO, CUATRIMESTRE, TELEFONO
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sqlAlumno);
        $stmt->execute([
            $cve_alumno,
            $_SESSION["usuario_id"], // asegúrate que esté definido en login
            $division,
            $matricula,
            $nombre,
            $apellidopaterno,
            $apellidomaterno,
            $grupo,
            $cuatrimestre,
            $telefono
        ]);

        // 2. Insertar empresa
        $sqlEmpresa = "INSERT INTO empresas_vinculadas (
            CVE_COLONIA, NOMBRE, DIRECCION, NOMBRE_ASESOR_EMP, TELEFONO_ASESOR,
            AREA, CORREO, SECTOR
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sqlEmpresa);
        $stmt->execute([
            $colonia_emp,
            $nombre_empresa,
            $direccion,
            $asesor_empresa,
            $telefono_asesor,
            $area,
            $email_empresa,
            $sector
        ]);
        $cve_empresa = $conn->lastInsertId();

        // 3. Obtener un asesor académico de la misma división
        $sqlAsesor = "SELECT CVE_ASESORES 
                      FROM asesores 
                      WHERE CVE_DIVISIONES = :division 
                      LIMIT 1";
        $stmt = $conn->prepare($sqlAsesor);
        $stmt->bindParam(':division', $division, PDO::PARAM_INT);
        $stmt->execute();
        $asesor = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Si no hay asesor en la división, buscar cualquier asesor disponible
        if (!$asesor) {
            $sqlAsesorDefault = "SELECT CVE_ASESORES FROM asesores LIMIT 1";
            $stmt = $conn->query($sqlAsesorDefault);
            $asesor = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        // Si aún no hay asesor, crear uno temporal por defecto
        if (!$asesor) {
            // Intentar crear un asesor por defecto
            try {
                // Primero verificar si existe un usuario asesor
                $sqlUsuarioAsesor = "SELECT CVE_USUARIOS FROM usuarios WHERE Rol = 'Asesor' LIMIT 1";
                $stmt = $conn->query($sqlUsuarioAsesor);
                $usuarioAsesor = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($usuarioAsesor) {
                    // Obtener el máximo CVE_ASESORES
                    $stmt = $conn->query("SELECT MAX(CVE_ASESORES) AS max_id FROM asesores");
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    $nuevo_cve_asesor = ($row['max_id'] ?? 0) + 1;
                    
                    // Crear asesor con la división del estudiante
                    $sqlCrearAsesor = "INSERT INTO asesores (CVE_ASESORES, CVE_USUARIOS, CVE_DIVISIONES, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO)
                                       VALUES (?, ?, ?, 'Asesor', 'Académico', 'Temporal')";
                    $stmt = $conn->prepare($sqlCrearAsesor);
                    $stmt->execute([$nuevo_cve_asesor, $usuarioAsesor['CVE_USUARIOS'], $division]);
                    
                    $cve_asesor = $nuevo_cve_asesor;
                } else {
                    throw new Exception("No hay asesores académicos disponibles y no se puede crear uno automáticamente. Por favor, ejecuta el script 'database/insertar_asesor_ejemplo.sql' o contacta al administrador.");
                }
            } catch (PDOException $e) {
                throw new Exception("Error al crear asesor temporal: " . $e->getMessage() . ". Por favor, ejecuta el script 'database/insertar_asesor_ejemplo.sql'.");
            }
        } else {
            $cve_asesor = $asesor['CVE_ASESORES'];
        }

        // 4. Insertar anteproyecto
        $sqlAnte = "INSERT INTO anteproyecto (
            CVE_ALUMNOS, CVE_EMPRESAS_VINCULADAS, CVE_ASESOR_ACAD, TITULO, OBJETIVO_GENERAL,
            JUSTIFICACION, ACTIVIDADES_PROPUESTAS, METODOLOGIA
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sqlAnte);
        $stmt->execute([
            $cve_alumno,
            $cve_empresa,
            $cve_asesor,
            $titulo,
            $objetivo,
            $justificacion,
            $actividades,
            $metodologia
     
        ]);
        $id = $conn->lastInsertId();

        // 5. Crear notificación para el asesor asignado
        // Obtener el usuario_id del asesor
        $sqlUsuarioAsesor = "SELECT CVE_USUARIOS FROM asesores WHERE CVE_ASESORES = :cve_asesor LIMIT 1";
        $stmt = $conn->prepare($sqlUsuarioAsesor);
        $stmt->bindParam(':cve_asesor', $cve_asesor, PDO::PARAM_INT);
        $stmt->execute();
        $asesorData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($asesorData) {
            // Obtener nombre del estudiante para la notificación
            $nombreCompleto = trim($nombre . ' ' . $apellidopaterno . ' ' . $apellidomaterno);
            
            // Crear la notificación
            $sqlNotificacion = "INSERT INTO notificaciones (
                CVE_USUARIOS, 
                CVE_ANTEPROYECTO, 
                TITULO, 
                MENSAJE, 
                TIPO, 
                LEIDA
            ) VALUES (?, ?, ?, ?, 'asignacion', 0)";
            
            $tituloNotificacion = "Nuevo Anteproyecto Asignado";
            $mensajeNotificacion = "Se te ha asignado el anteproyecto \"$titulo\" del estudiante $nombreCompleto. Por favor, revisa el anteproyecto.";
            
            $stmt = $conn->prepare($sqlNotificacion);
            $stmt->execute([
                $asesorData['CVE_USUARIOS'],
                $id,
                $tituloNotificacion,
                $mensajeNotificacion
            ]);
            
            // La notificación se enviará automáticamente vía WebSocket
            // El servidor WebSocket consulta la BD cada 2 segundos
        }

        // Redirigir a la vista
        header("Location: /estudiantes/views/VerRegistroAnteproyecto.html?id=" . $id);
        exit;

    } catch (PDOException $e) {
        echo "Error al guardar: " . $e->getMessage();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }

} else {
    echo "Acceso denegado. Este script solo acepta peticiones POST.";
}