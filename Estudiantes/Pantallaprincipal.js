const SIMULATED_DATA = {
    notifications: [
        { type: 'comment', source: 'Asesor Académico', content: '¡Felicidades! El Título de tu Proyecto ha sido aprobado. Procede al siguiente paso.', time: 'Hace 10 min' },
        { type: 'general', source: 'Sistema GEUT', content: 'Tu límite de entrega para el Marco Teórico es el 15 de Noviembre.', time: 'Hace 5 horas' },
        { type: 'comment', source: 'Asesor Empresarial', content: 'Revisa el organigrama, debe incluir la ubicación del departamento.', time: 'Hace 1 día' },
        { type: 'general', source: 'Sistema GEUT', content: 'Nuevo manual de procedimientos disponible en Mi Estadía.', time: 'Hace 2 días' },
        { type: 'comment', source: 'Asesor Académico', content: 'Pendiente revisión de referencias bibliográficas, usa formato APA 7ma edición.', time: 'Hace 2 días' },
        { type: 'general', source: 'Sistema GEUT', content: 'Recordatorio: La fecha límite para la evaluación del Anteproyecto es inminente.', time: 'Hace 3 días' },
    ],
   
    calendarActivities: [
        { title: 'Reunión de Avance', advisor: 'Asesor Académico', date: 'Mañana, 10:00 a.m.', location: 'Sala B' },
        { title: 'Entrega de Capítulo 1 (Anteproyecto)', advisor: 'Comité Revisor', date: '05 / Diciembre / 2025', location: 'Plataforma' },
        { title: 'Videollamada de Seguimiento', advisor: 'Asesor Empresarial', date: '07 / Diciembre / 2025', location: 'Meet' },
    ],
   
    commentCount: 1, 
    notificationCount: 6, 
};


const MAX_NOTIFICATIONS_INITIAL = 3; 


let notificationsVisibleCount = MAX_NOTIFICATIONS_INITIAL;

function setupProposalButton() {
    const button = document.getElementById('btn-add-proposal');
    if (button) {
        button.addEventListener('click', () => {
            window.location.href = 'Anteproyecto.html'; 
            console.log('Redirigiendo a Anteproyecto.html...');
        });
    }
}



// -------------------------------------------------------------------
/**
 * Renderiza las notificaciones en el dashboard.
  @param {number} countToShow - Número de notificaciones a mostrar. Usa Infinity para mostrar todas.
 */
function renderNotifications(countToShow) {
   
    document.getElementById('count-comments').textContent = SIMULATED_DATA.commentCount;
    document.getElementById('count-notifications').textContent = SIMULATED_DATA.notificationCount;

   
    const container = document.getElementById('observations-container');
    const btnVerMas = document.getElementById('btn-ver-mas-observaciones');

    if (!container) return;

   
    const totalNotifications = SIMULATED_DATA.notifications.length;
    const isShowingAll = countToShow >= totalNotifications;

    
    const finalCount = isShowingAll ? totalNotifications : countToShow;
    const notificationsToRender = SIMULATED_DATA.notifications.slice(0, finalCount);
    
  
    container.innerHTML = ''; 

    if (notificationsToRender.length === 0) {
        container.innerHTML = '<p class="observation-content" style="text-align: center;">No hay notificaciones ni observaciones recientes.</p>';
        if (btnVerMas) btnVerMas.style.display = 'none';
        return;
    }
    
   
    notificationsToRender.forEach(obs => {
        const icon = obs.type === 'comment' ? 'fas fa-comment-dots' : 'fas fa-info-circle';
        
        const item = document.createElement('div');
        item.className = 'observation-item'; 
        item.innerHTML = `
            <div class="observation-header"><i class="${icon}"></i> ${obs.source}</div>
            <p class="observation-content">${obs.content}</p>
            <p class="observation-content" style="font-size: 0.75em; margin-top: 2px;">${obs.time}</p>
        `;
        container.appendChild(item);
    });

    if (btnVerMas) {
        if (totalNotifications <= MAX_NOTIFICATIONS_INITIAL) {
          
            btnVerMas.style.display = 'none'; 
            notificationsVisibleCount = totalNotifications;
        } else if (isShowingAll) {
       
            btnVerMas.style.display = 'block';
            btnVerMas.textContent = 'Ver menos';
            notificationsVisibleCount = totalNotifications;
        } else {
            
            btnVerMas.style.display = 'block';
            btnVerMas.textContent = 'Ver más';
            notificationsVisibleCount = MAX_NOTIFICATIONS_INITIAL;
        }
    }
}



function setupVerMasButton() {
    const btnVerMas = document.getElementById('btn-ver-mas-observaciones');
    const totalNotifications = SIMULATED_DATA.notifications.length;

    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            if (notificationsVisibleCount === MAX_NOTIFICATIONS_INITIAL) {
                
                renderNotifications(totalNotifications); 
                console.log('Mostrando todas las notificaciones (Ver más)...');
            } else {
                renderNotifications(MAX_NOTIFICATIONS_INITIAL); 
                console.log('Volviendo a las notificaciones iniciales (Ver menos)...');
            }
        });
    }
}



function renderRecentActivities() {
    const container = document.getElementById('recent-activities-container');
    if (!container) return;

    container.innerHTML = ''; 

    const activitiesToShow = SIMULATED_DATA.calendarActivities;

    if (activitiesToShow.length === 0) {
        container.innerHTML = '<p class="observation-content" style="text-align: center;">No hay actividades programadas próximamente.</p>';
        return;
    }

    activitiesToShow.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-title">${activity.title}</div>
            <div class="activity-details"><i class="fas fa-user-tie"></i> Responsable: <strong>${activity.advisor}</strong></div>
            <div class="activity-details"><i class="fas fa-calendar-day"></i> Fecha: <strong>${activity.date}</strong></div>
            <div class="activity-details"><i class="fas fa-map-marker-alt"></i> Ubicación: <strong>${activity.location}</strong></div>
        `;
        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        
        setupProposalButton();
        
        renderNotifications(MAX_NOTIFICATIONS_INITIAL);
        
        setupVerMasButton();

        renderRecentActivities();
        
    } catch (error) {
        console.error("Error al inicializar el dashboard:", error);
    }
});