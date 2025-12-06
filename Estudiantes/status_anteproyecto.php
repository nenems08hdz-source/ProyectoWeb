<?php
include "Conexion.php";
$is_anteproyecto_delivered = (isset($_GET['entregado']) && $_GET['entregado'] == 'true');

$status_data = [
    "registro_anteproyecto" => [
        "peso" => 15,
        "estado" => $is_anteproyecto_delivered ? 2 : 0 
    ],
    "revision_aprobacion" => [
        "peso" => 10,
        "estado" => 0 
    ],
    "desarrollo_proyecto" => [
        "peso" => 40,
        "estado" => 0 
    ],
    "reporte_parcial" => [
        "peso" => 15,
        "estado" => 0 
    ],
    "entrega_final" => [
        "peso" => 10,
        "estado" => 0 
    ],
    "evaluacion_final" => [
        "peso" => 10,
        "estado" => 0 
    ]
];

header('Content-Type: application/json');
echo json_encode($status_data);
?>