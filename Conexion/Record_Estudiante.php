<?php
include "Conexion/Conexion.php";

$Nombre = $_POST["Nombre"];
$Ap_Paterno = $_POST["Apellido paterno"];
$Ap_Materno = $_POST["Apellido materno"];
$Correo = $_POST["Correo institucional"];
$Grado = $_POST["Grado"];
$Grupo = $_POST["Grupo"];

$sql ="INSERT INTO ESTUDIANTES(CVE_ESTUDIANTES,CVE_CARRERAS,Nombre, Ap_Paterno, Ap_Materno, Correo_insti, Grado, Grupo)";
$sql ="VALUES ('$Nombre.','.$Ap_Paterno.','.$Ap_Materno.','.$Correo.','.$Grado.','.$Grupo.')";

if (mysqli_query($sql, $link)) {

    echo "<h3>Registro exitoso</h3>";
    echo "<button onclick='history.back()'>Regresar</button>";

} else {
    echo  mysqli_connect_error();
}
mysqli_close($link);
?>