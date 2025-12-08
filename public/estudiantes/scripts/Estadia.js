// 1. Definición de la estructura de la Estadía/Proyecto
const projectStages = [
    { title: "Definición del Proyecto", subtitle: "Aprobación de tema y objetivos" },
    { title: "Marco Teórico", subtitle: "Revisión bibliográfica y fundamentos" },
    { title: "Desarrollo del Prototipo", subtitle: "Implementación de la solución técnica" },
    { title: "Pruebas y Validación", subtitle: "Debugging y optimización de resultados" },
    { title: "Documento Final", subtitle: "Redacción y formato del reporte técnico" },
    { title: "Presentación y Evaluación", subtitle: "Exposición ante el comité revisor" }
];

// --- DATOS DE PRUEBA: ESTADO ACTUAL DEL PROYECTO ---
// Simula que el estudiante ha completado hasta la etapa con índice 2 (Desarrollo del Prototipo)
const completedStagesCount = 3; 

// ----------------------------------------------------------------------
// 2. FUNCIONES DE LÓGICA DE PROGRESO
// ----------------------------------------------------------------------

/**
 * Calcula el porcentaje de progreso y actualiza la barra y el display.
 */
function updateProgressBar() {
    const totalStages = projectStages.length;
    // Calcula el porcentaje basado en las etapas completadas
    const percentage = Math.round((completedStagesCount / totalStages) * 100);

    const progressBar = document.getElementById('progress-bar');
    const percentageDisplay = document.getElementById('percentage-display');

    if (progressBar && percentageDisplay) {
        // Actualiza el ancho de la barra
        progressBar.style.width = `${percentage}%`;
        // Actualiza el texto del porcentaje
        percentageDisplay.textContent = `${percentage}%`;
    }
}

/**
 * Genera dinámicamente la lista de etapas y asigna clases de estado.
 */
function renderTimeline() {
    const timelineList = document.getElementById('timeline-list');
    if (!timelineList) return;

    timelineList.innerHTML = ''; // Limpia el contenido previo

    projectStages.forEach((stage, index) => {
        // Los índices son base 0, el contador es base 1.
        const stageNumber = index + 1; 

        // 1. Determina la clase CSS de estado
        let statusClass = '';
        if (stageNumber <= completedStagesCount) {
            statusClass = 'status-entregado'; // Etapas completadas
        } 
        if (stageNumber === completedStagesCount + 1) {
            statusClass = 'status-en-curso'; // Etapa siguiente/actual
        }

        // 2. Crea el elemento HTML para la etapa
        const item = document.createElement('div');
        item.className = `timeline-item ${statusClass}`;
        
        // 3. Establece el contenido
        item.innerHTML = `
            <div class="timeline-item-dot"></div>
            <div class="timeline-title-primary">${stage.title}</div>
            <div class="timeline-title-secundary">${stage.subtitle}</div>
        `;
        
        // 4. Agrega al contenedor
        timelineList.appendChild(item);
    });
}

// ----------------------------------------------------------------------
// 3. FUNCIONES DE SIMULACIÓN DE DATOS DEL PROYECTO
// ----------------------------------------------------------------------

/**
 * Simula la carga de datos del proyecto en la ficha de la derecha.
 */
function loadProjectDetails() {
    // Datos de simulación (simularían venir de una base de datos)
    const projectData = {
        title: "Sistema de Monitoreo de Calidad de Aire basado en IoT para Ambientes Urbanos",
        matricula: "2019040156",
        fechaInicio: "01/ Septiembre / 2024",
        fechaFin: "31 / Diciembre / 2024",
        asesorAcademico: "Dr. Ana Laura Hernández P.",
        asesorEmpresarial: "Ing. Carlos Mendieta G.",
        estado: "Aprobado"
    };

    // Mapeo de IDs del HTML con las claves del objeto de datos
    const detailMappings = [
        { id: 'project-name', key: 'title' },
        { id: 'detail-matricula', key: 'matricula' },
        { id: 'detail-inicio', key: 'fechaInicio' },
        { id: 'detail-fin', key: 'fechaFin' },
        { id: 'detail-academico', key: 'asesorAcademico' },
        { id: 'detail-empresarial', key: 'asesorEmpresarial' },
        { id: 'detail-estado', key: 'estado' }
    ];

    detailMappings.forEach(mapping => {
        const element = document.getElementById(mapping.id);
        if (element && projectData[mapping.key]) {
            element.textContent = projectData[mapping.key];
        }
    });
}


// ----------------------------------------------------------------------
// 4. INICIALIZACIÓN DE LA APLICACIÓN
// ----------------------------------------------------------------------

// Llama a las funciones principales cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadProjectDetails();
        updateProgressBar();
        renderTimeline();
    } catch (error) {
        console.error("Error al inicializar la lógica de la Estadía:", error);
    }
});