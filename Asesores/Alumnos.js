const sanctionModal = document.getElementById('sanctionModal');
    const sanctionModalContent = document.getElementById('sanction-modal-content-container');
    const sanctionAlumnoNombreSpan = document.getElementById('sanction-modal-alumno-nombre');
    const sanctionAlumnoMatriculaInput = document.getElementById('sanction-modal-alumno-matricula');
    
    // Referencias para el MODAL DE BAJA (Nuevas referencias)
    const dropModal = document.getElementById('dropModal');
    const dropModalContent = document.getElementById('drop-modal-content-container');
    const dropAlumnoNombreSpan = document.getElementById('drop-modal-alumno-nombre');
    const dropAlumnoMatriculaInput = document.getElementById('drop-modal-alumno-matricula');

    // ===================================
    // LÓGICA DEL MODAL DE SANCIÓN
    // ===================================
    /**
     * Abre el modal de sanción y establece los datos del alumno.
     */
    function openSanctionModal(nombre, matricula) {
        sanctionAlumnoNombreSpan.textContent = `${nombre} (${matricula})`;
        sanctionAlumnoMatriculaInput.value = matricula;

        sanctionModal.classList.remove('hidden');
        setTimeout(() => {
            sanctionModal.style.opacity = '1';
            sanctionModalContent.classList.remove('scale-95', 'opacity-0');
            sanctionModalContent.classList.add('scale-100', 'opacity-100');
        }, 10); 
        
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal de sanción.
     */
    function closeSanctionModal() {
        sanctionModal.style.opacity = '0';
        sanctionModalContent.classList.remove('scale-100', 'opacity-100');
        sanctionModalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            sanctionModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300); 
    }

    /**
     * Simula la aplicación de la sanción.
     */
    function applySanction() {
        const matricula = sanctionAlumnoMatriculaInput.value;
        const tipoSancion = document.getElementById('tipo-sancion').value;
        
        console.log(`[SANCIÓN] Aplicando sanción de tipo "${tipoSancion}" al alumno con matrícula: ${matricula}`);
        closeSanctionModal(); 
        console.warn(`[SANCIÓN] Sanción de tipo "${tipoSancion}" para ${matricula} procesada.`);
    }

    // ===================================
    // LÓGICA DEL MODAL DE BAJA (Nuevo)
    // ===================================
    /**
     * Abre el modal de baja y establece los datos del alumno.
     */
    function openDropModal(nombre, matricula) {
        dropAlumnoNombreSpan.textContent = `${nombre} (${matricula})`;
        dropAlumnoMatriculaInput.value = matricula;

        dropModal.classList.remove('hidden');
        setTimeout(() => {
            dropModal.style.opacity = '1';
            dropModalContent.classList.remove('scale-95', 'opacity-0');
            dropModalContent.classList.add('scale-100', 'opacity-100');
        }, 10); 
        
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal de baja.
     */
    function closeDropModal() {
        dropModal.style.opacity = '0';
        dropModalContent.classList.remove('scale-100', 'opacity-100');
        dropModalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            dropModal.classList.add('hidden');
            document.body.style.overflow = ''; 
        }, 300); 
    }

    /**
     * Simula la aplicación de la baja.
     */
    function applyDrop() {
        const matricula = dropAlumnoMatriculaInput.value;
        const motivoBaja = document.getElementById('motivo-baja').value;
        
        console.log(`[BAJA] Dando de baja por "${motivoBaja}" al alumno con matrícula: ${matricula}`);
        closeDropModal(); 
        console.warn(`[BAJA] Alumno ${matricula} dado de baja por motivo: "${motivoBaja}".`);
        // Aquí podrías recargar la lista de alumnos para que el estado cambie a "Baja"
    }


    // ===================================
    // ESC KEY GLOBAL LISTENER
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cierra el modal que esté visible
            if (!sanctionModal.classList.contains('hidden')) {
                closeSanctionModal();
            }
            if (!dropModal.classList.contains('hidden')) {
                closeDropModal();
            }
        }
    });


