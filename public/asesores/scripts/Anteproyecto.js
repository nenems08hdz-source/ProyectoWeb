 document.addEventListener('DOMContentLoaded', () => {
            // Datos de ejemplo simulados, ahora con la información completa requerida para la vista de detalle
            const anteproyectosData = [
                { 
                    matricula: '422412334', 
                    nombre: 'Arantxa Cadena Sánchez', 
                    titulo: 'Desarrollo de un Sistema de Inventario para una Ferretería Local', 
                    estado: 'revision',
                    // Datos de detalle para Arantxa
                    group: 'B',
                    division: 'Tecnologías de la Información',
                    career: 'TSU en TI Área Desarrollo de Software Multiplataforma',
                    email: 'arantxacadena@mail.com',
                    phone: '9931234567',
                    start_date: '01-09-2025',
                    end_date: '01-01-2026',
                    company_name: 'Ferretería El Tornillo',
                    company_address: 'Calle Juárez #10, Centro, Villahermosa, Tabasco, C.P. 86000',
                    company_email: 'ferreteria@mail.com',
                    advisor_name: 'Ing. María Elena Pérez',
                    advisor_phone: '9937654321',
                    advisor_area: 'Administración y Logística',
                    general_objective: 'Desarrollar un sistema web que permita la gestión eficiente del inventario, optimizando los procesos de registro y control de stock.',
                    justification: 'La falta de un sistema automatizado genera pérdidas por desabasto o sobrestock. Este proyecto busca digitalizar el control, mejorando la rentabilidad y precisión del negocio.'
                },
                { 
                    matricula: '422410815', 
                    nombre: 'Pablo Lopez Chable', 
                    titulo: 'Aplicación Web para Reservas y Gestión de Citas en un Salón de Belleza', 
                    estado: 'revision',
                    // Datos de detalle para Pablo
                    group: 'A',
                    division: 'Ingeniería en Desarrollo de Software',
                    career: 'Ing. en Desarrollo y Gestión de Software',
                    email: 'pablolopezchable@gmail.com',
                    phone: '9934743567',
                    start_date: '07-09-2025',
                    end_date: '07-03-2026',
                    company_name: 'Salón de Belleza Glamour',
                    company_address: 'Av. Paseo Tabasco #200, Col. Centro, Villahermosa, Tabasco, C.P. 86000',
                    company_email: 'glamour@salon.com',
                    advisor_name: 'Lic. Verónica Cruz',
                    advisor_phone: '9939876543',
                    advisor_area: 'Marketing Digital y Citas',
                    general_objective: 'Implementar una plataforma de reservas en línea que automatice la gestión de citas, reduzca errores y mejore la experiencia del cliente.',
                    justification: 'Actualmente, las citas se manejan por llamadas y mensajes, causando errores de registro y doble reserva. El sistema web centralizará esta gestión, permitiendo al personal enfocarse en el servicio y a los clientes reservar 24/7.'
                },
                { 
                    matricula: '422410523', 
                    nombre: 'Jorge Eduardo Cahero Hernández', 
                    titulo: 'Plataforma de Pedidos en Línea para una Cafetería Universitaria', 
                    estado: 'aprobados',
                    // Datos de detalle para Jorge
                    group: 'B',
                    division: 'Ingeniería en Robótica',
                    career: 'Ing. en Mecatrónica',
                    email: 'jorge.cahero@mail.com',
                    phone: '9935551234',
                    start_date: '01-08-2025',
                    end_date: '01-02-2026',
                    company_name: 'Cafetería El Buen Sabor',
                    company_address: 'Interior de la Universidad',
                    company_email: 'cafeteria@mail.com',
                    advisor_name: 'Lic. Ana Laura García',
                    advisor_phone: '9934445678',
                    advisor_area: 'Servicio y Producción',
                    general_objective: 'Crear una aplicación móvil para que los estudiantes realicen pedidos anticipados y recojan sus alimentos sin hacer largas filas.',
                    justification: 'El alto flujo de estudiantes en horas pico genera largas esperas y pérdidas de tiempo. La plataforma optimizará el proceso de pedido, mejorando la satisfacción del cliente y la eficiencia del negocio.'
                },
                 { 
                    matricula: '422410999', 
                    nombre: 'Carlos Daniel Pérez', 
                    titulo: 'Sistema de Monitoreo Ambiental con Sensores IoT', 
                    estado: 'rechazados',
                    // Datos de detalle para Carlos
                    group: 'C',
                    division: 'Ingeniería Ambiental',
                    career: 'Ing. en Tecnologías Ambientales',
                    email: 'carlosperez@iot.com',
                    phone: '9931112233',
                    start_date: '15-10-2025',
                    end_date: '15-04-2026',
                    company_name: 'Laboratorio de Calidad del Agua',
                    company_address: 'Parque Industrial, Nave 5, Col. Centro, Villahermosa, Tabasco, C.P. 86000',
                    company_email: 'laboratorio@mail.com',
                    advisor_name: 'Dr. Roberto Jiménez',
                    advisor_phone: '9932223344',
                    advisor_area: 'Sensores y Calibración',
                    general_objective: 'Diseñar e implementar una red de sensores IoT para la recopilación y análisis de datos de calidad del aire y agua en tiempo real.',
                    justification: 'El monitoreo manual actual es costoso y lento, ofreciendo solo datos puntuales. El sistema IoT proporcionará un flujo continuo de datos, esencial para la toma de decisiones rápidas y precisas en la gestión ambiental.'
                }
            ];

            const listContainer = document.getElementById('list-container');
            const detailContainer = document.getElementById('detail-container');
            const listBody = document.getElementById('anteproyectos-list-body');
            const filterButtons = document.querySelectorAll('.filter-button');
            const backButton = document.getElementById('back-to-list');

            // --- Funciones de Lógica de la Vista ---

            /**
             * Muestra la vista especificada y oculta la otra.
             * @param {string} viewId - 'list' o 'detail'.
             */
            const showView = (viewId) => {
                if (viewId === 'detail') {
                    listContainer.style.display = 'none';
                    // Usar flex para centrado o layout columnar en detalle
                    detailContainer.style.display = 'flex';
                    detailContainer.style.flexDirection = 'column';
                } else {
                    listContainer.style.display = 'block';
                    detailContainer.style.display = 'none';
                }
                window.scrollTo(0, 0); // Ir al inicio de la página al cambiar de vista
            };

            /**
             * Llena los campos de la vista de detalle con los datos del anteproyecto.
             * @param {Object} data - Objeto con todos los datos del anteproyecto.
             */
            const populateDetailView = (data) => {
                // Título principal
                document.getElementById('detail-title').textContent = `Anteproyecto: ${data.titulo}`;

                // --- Datos del Estudiante ---
                document.getElementById('detail-student-name').textContent = data.nombre;
                document.getElementById('detail-student-matricula').textContent = data.matricula;
                document.getElementById('detail-student-group').textContent = data.group || 'N/A';
                document.getElementById('detail-student-division').textContent = data.division || 'N/A';
                document.getElementById('detail-student-career').textContent = data.career || 'N/A';
                document.getElementById('detail-student-email').textContent = data.email || 'N/A';
                document.getElementById('detail-student-phone').textContent = data.phone || 'N/A';
                document.getElementById('detail-start-date').textContent = data.start_date || 'N/A';
                document.getElementById('detail-end-date').textContent = data.end_date || 'N/A';

                // --- Datos de la Empresa ---
                document.getElementById('detail-company-name').textContent = data.company_name || 'N/A';
                document.getElementById('detail-advisor-name').textContent = data.advisor_name || 'N/A';
                document.getElementById('detail-company-address').textContent = data.company_address || 'N/A';
                document.getElementById('detail-company-email').textContent = data.company_email || 'N/A';
                document.getElementById('detail-advisor-phone').textContent = data.advisor_phone || 'N/A';
                document.getElementById('detail-advisor-area').textContent = data.advisor_area || 'N/A';
                
                // --- Datos del Anteproyecto ---
                document.getElementById('detail-project-title-bottom').textContent = data.titulo;
                document.getElementById('detail-general-objective').textContent = data.general_objective;
                document.getElementById('detail-justification').textContent = data.justification;

                // Actualizar el estado de los botones de dictamen (Simulación)
                const approvalButton = detailContainer.querySelector('.bg-emerald-500');
                const rejectButton = detailContainer.querySelector('.bg-red-500');
                const observationBox = detailContainer.querySelector('.bg-red-50');

                if (data.estado === 'aprobados') {
                    approvalButton.disabled = true;
                    rejectButton.disabled = true;
                    observationBox.innerHTML = `<p class="text-sm text-green-700"><span class="font-semibold">Aprobado:</span> El anteproyecto ha sido aprobado satisfactoriamente.</p>`;
                    observationBox.classList.replace('bg-red-50', 'bg-green-50');
                    observationBox.classList.replace('border-red-200', 'border-green-200');
                } else if (data.estado === 'rechazados') {
                    approvalButton.disabled = true;
                    rejectButton.disabled = true;
                    observationBox.innerHTML = `<p class="text-sm text-red-700"><span class="font-semibold">Rechazado:</span> El anteproyecto ha sido rechazado. Revise los comentarios para ajustes.</p>`;
                    observationBox.classList.replace('bg-green-50', 'bg-red-50');
                    observationBox.classList.replace('border-green-200', 'border-red-200');
                } else {
                     approvalButton.disabled = false;
                    rejectButton.disabled = false;
                    observationBox.innerHTML = `<p class="text-sm text-red-700"><span class="font-semibold">Revisión Pendiente:</span> El anteproyecto está en fase de revisión por el comité evaluador. Las acciones de aprobación o rechazo se aplicarán desde esta interfaz.</p>`;
                    observationBox.classList.replace('bg-green-50', 'bg-red-50');
                    observationBox.classList.replace('border-green-200', 'border-red-200');
                }
            };


            // --- Funciones de Lógica de la Lista ---

            /**
             * Genera el HTML para una fila de anteproyecto.
             */
            const createAnteproyectoRow = (item) => {
                const getStatusClass = (estado) => {
                    switch(estado) {
                        case 'revision': return 'bg-yellow-100 text-yellow-800';
                        case 'aprobados': return 'bg-green-100 text-green-800';
                        case 'rechazados': return 'bg-red-100 text-red-800';
                        default: return 'bg-gray-100 text-gray-800';
                    }
                };

                const statusLabel = {
                    'revision': 'En Revisión',
                    'aprobados': 'Aprobado',
                    'rechazados': 'Rechazado'
                }[item.estado] || 'Desconocido';


                return `
                    <div class="anteproyecto-item" data-estado="${item.estado}">
                        <!-- Matrícula y Estado (visible en móvil) -->
                        <div class="item-data flex items-center space-x-2">
                            <i class="fas fa-id-card text-indigo-500 hidden md:inline"></i>
                            <span class="font-semibold">${item.matricula}</span>
                            <span class="md:hidden text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(item.estado)}">${statusLabel}</span>
                        </div>
                        <!-- Nombre del alumno -->
                        <div class="item-data font-medium text-gray-700">${item.nombre}</div>
                        <!-- Anteproyecto -->
                        <div class="item-data ant_name text-gray-800">${item.titulo}</div>
                        <!-- Acciones -->
                        <div class="item-actions flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                            <button class="action-button view-more" data-id="${item.matricula}">
                                <i class="fas fa-eye"></i> Ver Detalle
                            </button>
                            <!-- El botón de eliminar es solo una simulación, no afecta los datos por ahora -->
                            <button class="action-button delete" data-id="${item.matricula}">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>
                        </div>
                    </div>
                `;
            };

            /**
             * Renderiza la lista de anteproyectos, aplicando el filtro actual.
             */
            const renderList = (filter) => {
                listBody.innerHTML = ''; 
                
                const filteredData = anteproyectosData.filter(item => item.estado === filter);

                if (filteredData.length === 0) {
                    listBody.innerHTML = `
                        <div class="p-6 bg-white rounded-xl shadow-md text-center">
                            <i class="fas fa-box-open text-gray-400 text-4xl mb-3"></i>
                            <p class="text-gray-500 text-lg">No hay anteproyectos en estado "${filter}".</p>
                        </div>
                    `;
                    return;
                }

                filteredData.forEach(item => {
                    listBody.innerHTML += createAnteproyectoRow(item);
                });
            };

            /**
             * Maneja el evento de clic en los botones de filtro.
             */
            const handleFilterClick = (event) => {
                const clickedButton = event.currentTarget;
                const filter = clickedButton.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                clickedButton.classList.add('active');

                renderList(filter);
            };

            // --- Inicialización y Event Listeners ---

            // 1. Asignar el manejador de eventos a los botones de filtro
            filterButtons.forEach(button => {
                button.addEventListener('click', handleFilterClick);
            });

            // 2. Delegar manejo de acciones (Ver más/Eliminar)
            listBody.addEventListener('click', (event) => {
                const target = event.target.closest('.action-button'); // Buscar el botón más cercano
                if (!target) return;

                const matricula = target.getAttribute('data-id');

                if (target.classList.contains('view-more')) {
                    const selectedData = anteproyectosData.find(item => item.matricula === matricula);
                    
                    if (selectedData) {
                        populateDetailView(selectedData);
                        showView('detail'); // Cambiar a la vista de detalle
                    }
                } else if (target.classList.contains('delete')) {
                    // Aquí iría un modal de confirmación en una aplicación real
                    console.log(`Petición de eliminación (simulada) para Matrícula: ${matricula}`);
                }
            });
            
            // 3. Botón de Regreso a la lista
            backButton.addEventListener('click', () => {
                showView('list');
            });

            // 4. Inicializar la lista al cargar la página
            // Selecciona el primer botón con la clase 'active' para el filtro inicial
            const initialFilter = document.querySelector('.filter-button[data-filter="revision"]') 
                                    ? 'revision' 
                                    : (document.querySelector('.filter-button')?.getAttribute('data-filter') || 'revision');
            renderList(initialFilter);
            
            // Asegurarse de que el botón de filtro inicial esté activo visualmente
            document.querySelector(`.filter-button[data-filter="${initialFilter}"]`)?.classList.add('active');
        });