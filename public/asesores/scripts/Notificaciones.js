/**
 * Notificaciones.js
 * Sistema de notificaciones en tiempo real para asesores
 * Usa polling para verificar nuevas notificaciones cada 5 segundos
 */

let intervaloNotificaciones = null;
let ultimaNotificacionId = null;

/**
 * Cargar notificaciones desde el servidor
 */
async function cargarNotificaciones() {
    try {
        const response = await fetch('/api/asesores/ObtenerNotificaciones.php');
        const data = await response.json();
        
        if (data.success) {
            mostrarNotificaciones(data.notificaciones);
            actualizarContador(data.no_leidas);
            
            // Detectar nuevas notificaciones
            if (data.notificaciones.length > 0) {
                const primeraNotif = data.notificaciones[0];
                if (ultimaNotificacionId !== null && primeraNotif.CVE_NOTIFICACION !== ultimaNotificacionId) {
                    // Hay una nueva notificación
                    mostrarNotificacionNueva(primeraNotif);
                }
                ultimaNotificacionId = primeraNotif.CVE_NOTIFICACION;
            }
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
                    <span class="text-xs text-gray-400 block mt-1">${notif.TIEMPO_RELATIVO}</span>
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
    // Crear elemento de notificación flotante
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
    
    // Remover automáticamente después de 5 segundos
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
            // Actualizar el elemento visualmente
            elemento.classList.remove('bg-blue-50', 'border-l-4', 'border-blue-500');
            const icono = elemento.querySelector('.fa-bell');
            if (icono) {
                icono.classList.remove('text-red-500');
                icono.classList.add('text-gray-400');
            }
            
            // Recargar notificaciones para actualizar contador
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
 * Inicializar el sistema de notificaciones
 */
function iniciarNotificaciones() {
    // Cargar notificaciones inmediatamente
    cargarNotificaciones();
    
    // Configurar polling cada 5 segundos
    intervaloNotificaciones = setInterval(cargarNotificaciones, 5000);
}

/**
 * Detener el sistema de notificaciones
 */
function detenerNotificaciones() {
    if (intervaloNotificaciones) {
        clearInterval(intervaloNotificaciones);
        intervaloNotificaciones = null;
    }
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarNotificaciones);
} else {
    iniciarNotificaciones();
}

// Detener cuando la página se oculte (optimización)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        detenerNotificaciones();
    } else {
        iniciarNotificaciones();
    }
});

