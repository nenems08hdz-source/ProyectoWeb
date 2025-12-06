document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener referencias a los elementos
    
    // CORRECCIÓN CLAVE: Buscamos la clase que tú usaste: 'btn-responder'
    const openModalButtons = document.querySelectorAll('.btn-responder'); 
    
    // Elementos del Modal (IDs correctos según tu HTML)
    const modal = document.getElementById('responseModal');
    const closeModalButton = document.getElementById('closeModal');
    const cancelButton = document.getElementById('cancelResponse');
    const advisorNameSpan = document.getElementById('advisorName');
    const sendResponseButton = document.getElementById('sendResponse');
    const responseTextArea = document.getElementById('responseArea');

    // **VERIFICACIÓN CRÍTICA**
    if (!modal || openModalButtons.length === 0) {
        console.error("ERROR: El modal (id='responseModal') o los botones (class='btn-responder') no fueron encontrados.");
        return; 
    }

    // --- Funciones para Abrir y Cerrar el Modal ---

    function showModal(advisorType) {
        // La clase 'is-visible' hace que el modal se muestre (ver Cometarios.css)
        modal.classList.add('is-visible');
        advisorNameSpan.textContent = advisorType;
        responseTextArea.focus();
        console.log("Modal abierto. Respondiendo a:", advisorType);
    }

    function hideModal() {
        // Quita la clase 'is-visible' para ocultar el modal
        modal.classList.remove('is-visible');
        responseTextArea.value = ''; // Limpia el texto
        console.log("Modal cerrado.");
    }

    // --- Manejadores de Eventos ---

    // 2. Abrir el modal (Clic en los botones 'Responder')
    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            // LÓGICA PARA IDENTIFICAR AL ASESOR SIN USAR data-attribute:
            // Sube dos niveles desde el botón hasta encontrar el contenedor del asesor.
            const responseCard = button.closest('.card-response');
            if (responseCard) {
                // El asesor está en la tarjeta anterior (hermano anterior)
                const advisorCard = responseCard.previousElementSibling; 
                if (advisorCard && advisorCard.classList.contains('card-advisor')) {
                    // Extrae el texto del asesor (ej: 'Asesor académico')
                    const advisorNameElement = advisorCard.querySelector('.advisor-item-large');
                    let advisorName = advisorNameElement ? advisorNameElement.textContent.trim() : 'Desconocido';

                    // Si tienes el icono, a veces incluye espacios, limpiamos el nombre
                    advisorName = advisorName.replace(/\s\s+/g, ' ').trim(); 

                    showModal(advisorName);
                    return;
                }
            }
            
            // Si la lógica de detección falla, usa un nombre genérico.
            showModal("Desconocido (Error al detectar el asesor)");
        });
    });

    // 3. Cerrar el modal (Clic en 'X' o 'Cancelar')
    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideModal);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', hideModal);
    }

    // 4. Lógica de 'Enviar Respuesta'
    if (sendResponseButton) {
        sendResponseButton.addEventListener('click', () => {
            const responseText = responseTextArea.value;
            
            if (responseText.trim() === "") {
                console.warn("Respuesta vacía. Cancelando envío.");
                // Usamos la función alert solo como último recurso.
                alert("Por favor, escribe una respuesta antes de enviar.");
                return;
            }

            // Simulación de envío
            console.log(`[SIMULACIÓN DE ENVÍO] Asesor: ${advisorNameSpan.textContent}, Texto: ${responseText}`);

            // Cierra el modal después del envío
            hideModal(); 
        });
    }

    // 5. Cerrar si el usuario hace clic fuera del modal (en el fondo oscuro)
    window.addEventListener('click', (event) => {
        if (event.target === modal && modal.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // 6. Cierre con la tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
            hideModal();
        }
    });

});