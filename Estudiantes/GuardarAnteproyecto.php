<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include "conexion.php"; // tu archivo de conexión con $conn = new PDO(...)

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
    $colonia_emp     = $_POST['colonia'] ?? null;
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
        $stmt = $conn->query("SELECT MAX(CVE_ALUMNOS) AS max_id FROM ALUMNOS");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $cve_alumno = ($row['max_id'] ?? 0) + 1;

        // Insertar alumno
        $sqlAlumno = "INSERT INTO ALUMNOS (
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
        $sqlEmpresa = "INSERT INTO EMPRESAS_VINCULADAS (
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

        // 3. Insertar anteproyecto
        $sqlAnte = "INSERT INTO ANTEPROYECTO (
            CVE_ALUMNOS, CVE_EMPRESAS_VINCULADAS, CVE_ASESOR_ACAD, TITULO, OBJETIVO_GENERAL,
            JUSTIFICACION, ACTIVIDADES_PROPUESTAS, METODOLOGIA
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sqlAnte);
        $stmt->execute([
            $cve_alumno,
            $cve_empresa,
            $cve_asesor, // asegúrate de definirlo antes
            $titulo,
            $objetivo,
            $justificacion,
            $actividades,
            $metodologia
     
        ]);
        $id = $conn->lastInsertId();

        // Redirigir a la vista
        header("Location: VerRegistroAnteproyecto.php?id=" . $id);
        exit;

    } catch (PDOException $e) {
        echo "Error al guardar: " . $e->getMessage();
    }

} else {
    echo "Acceso denegado. Este script solo acepta peticiones POST.";
}