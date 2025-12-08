<?php
/**
 * websocket-server.php
 * Servidor WebSocket para notificaciones en tiempo real usando Ratchet
 * 
 * INSTALACIÓN:
 * 1. composer require cboden/ratchet
 * 2. php websocket/websocket-server.php
 * 
 * El servidor escuchará en ws://localhost:8084
 * Para enviar notificaciones, usa el archivo EnviarNotificacionWS.php que hace HTTP POST
 */

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    die("ERROR: Ratchet no está instalado.\nEjecuta: composer require cboden/ratchet\n");
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/database.php';

class NotificacionesHandler implements MessageComponentInterface {
    protected $clients;
    protected $usuarios; // Mapeo: connection_id => usuario_id
    protected $ultimaNotificacionId; // ID de la última notificación procesada
    
    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->usuarios = [];
        $this->ultimaNotificacionId = 0;
        
        // Inicializar última notificación ID
        $this->inicializarUltimaNotificacion();
    }
    
    private function inicializarUltimaNotificacion() {
        global $conn;
        try {
            $stmt = $conn->query("SELECT MAX(CVE_NOTIFICACION) as max_id FROM notificaciones");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->ultimaNotificacionId = (int)($row['max_id'] ?? 0);
        } catch (Exception $e) {
            $this->ultimaNotificacionId = 0;
        }
    }
    
    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "Nueva conexión WebSocket: {$conn->resourceId}\n";
    }
    
    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        if (!$data || !isset($data['tipo'])) {
            return;
        }
        
        // Autenticación del cliente
        if ($data['tipo'] === 'auth' && isset($data['usuario_id'])) {
            $usuario_id = (int)$data['usuario_id'];
            $this->usuarios[$from->resourceId] = $usuario_id;
            echo "Usuario autenticado: {$usuario_id} (Conexión: {$from->resourceId})\n";
            
            // Confirmar autenticación
            $from->send(json_encode([
                'tipo' => 'auth_ok',
                'mensaje' => 'Autenticado correctamente'
            ]));
            
            // Enviar notificaciones pendientes si las hay
            $this->enviarNotificacionesPendientes($usuario_id, $from);
            
            return;
        }
    }
    
    public function onClose(ConnectionInterface $conn) {
        if (isset($this->usuarios[$conn->resourceId])) {
            $usuario_id = $this->usuarios[$conn->resourceId];
            echo "Usuario desconectado: {$usuario_id} (Conexión: {$conn->resourceId})\n";
            unset($this->usuarios[$conn->resourceId]);
        }
        $this->clients->detach($conn);
    }
    
    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error WebSocket: {$e->getMessage()}\n";
        $conn->close();
    }
    
    /**
     * Enviar notificación a un usuario específico
     */
    public function enviarNotificacion($usuario_id, $notificacion) {
        $enviadas = 0;
        foreach ($this->clients as $client) {
            if (isset($this->usuarios[$client->resourceId]) && 
                $this->usuarios[$client->resourceId] == $usuario_id) {
                $client->send(json_encode([
                    'tipo' => 'notificacion',
                    'data' => $notificacion
                ]));
                $enviadas++;
            }
        }
        
        if ($enviadas > 0) {
            echo "Notificación enviada a usuario {$usuario_id} ({$enviadas} conexión/es)\n";
        } else {
            echo "Usuario {$usuario_id} no está conectado (notificación guardada en BD)\n";
        }
        
        return $enviadas;
    }
    
    /**
     * Verificar nuevas notificaciones en la BD y enviarlas
     * Se llama periódicamente desde el loop de Ratchet
     */
    public function verificarNuevasNotificaciones() {
        global $conn;
        
        try {
            // Obtener notificaciones no leídas más recientes que la última procesada
            $sql = "SELECT n.*, 
                    TIMESTAMPDIFF(SECOND, n.FECHA_CREACION, NOW()) as segundos_desde_creacion
                    FROM notificaciones n
                    WHERE n.CVE_NOTIFICACION > :ultima_id
                    AND n.LEIDA = 0
                    ORDER BY n.CVE_NOTIFICACION ASC
                    LIMIT 50";
            
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':ultima_id', $this->ultimaNotificacionId, PDO::PARAM_INT);
            $stmt->execute();
            $notificaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($notificaciones as $notif) {
                // Formatear tiempo relativo
                $segundos = $notif['segundos_desde_creacion'];
                if ($segundos < 60) {
                    $notif['TIEMPO_RELATIVO'] = "Hace {$segundos} segundo(s)";
                } elseif ($segundos < 3600) {
                    $minutos = floor($segundos / 60);
                    $notif['TIEMPO_RELATIVO'] = "Hace {$minutos} minuto(s)";
                } else {
                    $horas = floor($segundos / 3600);
                    $notif['TIEMPO_RELATIVO'] = "Hace {$horas} hora(s)";
                }
                
                // Enviar a todos los clientes conectados de ese usuario
                $this->enviarNotificacion($notif['CVE_USUARIOS'], $notif);
                
                // Actualizar última notificación procesada
                $this->ultimaNotificacionId = $notif['CVE_NOTIFICACION'];
            }
        } catch (Exception $e) {
            // Silenciar errores para no interrumpir el servidor
        }
    }
}

$handler = new NotificacionesHandler();

// Servidor WebSocket en puerto 8084
$puerto = 8084;
$server = IoServer::factory(
    new HttpServer(
        new WsServer($handler)
    ),
    $puerto,
    '0.0.0.0'
);

// Verificar nuevas notificaciones cada 2 segundos usando el loop de Ratchet
$loop = $server->loop;
$loop->addPeriodicTimer(2, function() use ($handler) {
    $handler->verificarNuevasNotificaciones();
});

echo "========================================\n";
echo "Servidor WebSocket iniciado\n";
echo "WebSocket: ws://localhost:{$puerto}\n";
echo "Verificando nuevas notificaciones cada 2 segundos...\n";
echo "========================================\n";
echo "Presiona Ctrl+C para detener\n\n";

$server->run();
