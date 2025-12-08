/**
 * NotificacionesWS.js
 * Sistema de notificaciones en tiempo real usando WebSockets (Ratchet)
 */

let ws = null;
let usuarioId = null;
let reconectarTimeout = null;

/**
 * Obtener el ID de usuario desde el servidor
 */
async function obtenerUsuarioId() {
    try {
        const response = await fetch('/api/asesores/ObtenerUsuarioId.php');
        const data = await response.json();
        return data.usuario_id || null;
    } catch (error) {
        console.error('Error al obtener usuario_id:', error);
        return null;
    }
}

/**
 * Conectar al servidor WebSocket
 */
async function conectarWebSocket() {
    // Obtener usuario_id
    const id = await obtenerUsuarioId();
    if (!id) {
        console.error('No se pudo obtener el ID de usuario');
        return;
    }
    
    usuarioId = id;
    
    // Cerrar conexión anterior si existe
    if (ws) {
        ws.close();
        ws = null;
    }
    
    // Conectar al WebSocket (puerto 8084)
    const protocolo = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const puerto = 8084;
    const wsUrl = `${protocolo}//localhost:${puerto}`;
    
    ws = new WebSocket(wsUrl);
    
    ws.onopen = function() {
        console.log('WebSocket conectado');
        
        // Autenticarse enviando el usuario_id
        ws.send(JSON.stringify({
            tipo: 'auth',
            usuario_id: usuarioId
        }));
    };
    
    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        
        if (data.tipo === 'auth_ok') {
            console.log('Autenticado en WebSocket');
        } else if (data.tipo === 'notificacion') {
            // Nueva notificación recibida
            manejarNuevaNotificacion(data.data);
        }
    };
    
    ws.onerror = function(error) {
        console.error('Error en WebSocket:', error);
    };
    
    ws.onclose = function() {
        console.log('WebSocket desconectado, intentando reconectar...');
        ws = null;
        
        // Intentar reconectar después de 3 segundos
        if (reconectarTimeout) {
            clearTimeout(reconectarTimeout);
        }
        reconectarTimeout = setTimeout(() => {
            conectarWebSocket();
        }, 3000);
    };
}

/**
 * Manejar nueva notificación recibida
 */
function manejarNuevaNotificacion(notificacion) {
    // Recargar notificaciones para mostrar la nueva
    cargarNotificaciones();
    
    // Mostrar toast de notificación nueva
    mostrarNotificacionNueva(notificacion);
}

/**
 * Cargar notificaciones desde el servidor (carga inicial)
 */
async function cargarNotificaciones() {
    try {
        const response = await fetch('/api/asesores/ObtenerNotificaciones.php');
        const data = await response.json();
        
        if (data.success) {
            mostrarNotificaciones(data.notificaciones);
            actualizarContador(data.no_leidas);
        }
    } catch (error) {
        console.error('Error al cargar notificaciones:', error);
    }
}

/**
 * Mostrar notificaciones en el contenedor
 */
function mostrarNotificaciones(notificaciones) {
    const container = document.getElementById('notificaciones-container');
    
    if (!container) return;
    
    if (notificaciones.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-400 py-4">
                <i class="fas fa-bell-slash text-2xl mb-2"></i>
                <p class="text-sm">No hay notificaciones</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    notificaciones.forEach((notif, index) => {
        const esUltima = index === notificaciones.length - 1;
        const claseBorde = esUltima ? 'border-b-0' : 'border-b border-gray-200';
        const claseNoLeida = notif.LEIDA == 0 ? 'bg-blue-50 border-l-4 border-blue-500' : '';
        const iconoColor = notif.LEIDA == 0 ? 'text-red-500' : 'text-gray-400';
        
        html += `
            <div class="notification-item ${claseBorde} ${claseNoLeida} cursor-pointer hover:bg-gray-50 transition-colors" 
                 data-notificacion-id="${notif.CVE_NOTIFICACION}"
                 onclick="marcarComoLeida(${notif.CVE_NOTIFICACION}, this)">
                <i class="fas fa-bell ${iconoColor} text-xl pt-1 flex-shrink-0"></i>
                <div class="flex-1">
                    <p class="text-sm font-medium ${notif.LEIDA == 0 ? 'text-gray-900' : 'text-gray-700'}">
                        ${escapeHtml(notif.TITULO)}
                    </p>
                    <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                        ${escapeHtml(notif.MENSAJE)}
                    </p>
                    <span class="text-xs text-gray-400 block mt-1">${escapeHtml(notif.TIEMPO_RELATIVO || 'Hace unos segundos')}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Actualizar el contador de notificaciones no leídas
 */
function actualizarContador(noLeidas) {
    const badge = document.getElementById('badge-notificaciones');
    const contador = document.getElementById('contador-notificaciones');
    
    if (badge && contador) {
        if (noLeidas > 0) {
            badge.classList.remove('hidden');
            contador.textContent = noLeidas;
        } else {
            badge.classList.add('hidden');
        }
    }
}

/**
 * Mostrar notificación nueva (toast/alert)
 */
function mostrarNotificacionNueva(notificacion) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-white border-l-4 border-blue-500 shadow-lg rounded-lg p-4 z-50 max-w-sm animate-slide-in';
    toast.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-bell text-blue-500 text-xl mr-3 mt-1"></i>
            <div class="flex-1">
                <p class="font-semibold text-gray-900 text-sm">${escapeHtml(notificacion.TITULO)}</p>
                <p class="text-gray-600 text-xs mt-1">${escapeHtml(notificacion.MENSAJE)}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

/**
 * Marcar notificación como leída
 */
async function marcarComoLeida(cveNotificacion, elemento) {
    try {
        const formData = new FormData();
        formData.append('cve_notificacion', cveNotificacion);
        
        const response = await fetch('/api/asesores/MarcarNotificacionLeida.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            elemento.classList.remove('bg-blue-50', 'border-l-4', 'border-blue-500');
            const icono = elemento.querySelector('.fa-bell');
            if (icono) {
                icono.classList.remove('text-red-500');
                icono.classList.add('text-gray-400');
            }
            
            cargarNotificaciones();
        }
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
    }
}

/**
 * Escapar HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Desconectar WebSocket
 */
function desconectarWebSocket() {
    if (ws) {
        ws.close();
        ws = null;
    }
    if (reconectarTimeout) {
        clearTimeout(reconectarTimeout);
        reconectarTimeout = null;
    }
}

/**
 * Inicializar el sistema de notificaciones
 */
function iniciarNotificacionesWS() {
    // Cargar notificaciones existentes inmediatamente
    cargarNotificaciones();
    
    // Conectar al WebSocket
    conectarWebSocket();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarNotificacionesWS);
} else {
    iniciarNotificacionesWS();
}

// Desconectar cuando la página se oculte
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        desconectarWebSocket();
    } else {
        iniciarNotificacionesWS();
    }
});

// Desconectar al cerrar la página
window.addEventListener('beforeunload', desconectarWebSocket);

