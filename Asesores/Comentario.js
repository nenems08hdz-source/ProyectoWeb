const replyModal = document.getElementById('replyModal');
    const deleteModal = document.getElementById('deleteModal');
    const modalTitle = document.getElementById('modal-reply-title');
    const replyTextarea = document.getElementById('reply-text');
    const commentToDeleteIdInput = document.getElementById('comment-to-delete-id');
    
    // ===================================
    // LÓGICA DE APERTURA/CIERRE GENÉRICA
    // ===================================

    /**
     * Muestra un modal con efecto de transición.
     * @param {HTMLElement} modalElement - El elemento modal a mostrar.
     */
    function showModal(modalElement) {
        // Asegurarse de que el otro modal esté cerrado
        if (modalElement.id === 'replyModal') {
            closeDeleteModal(false); // Cierra sin forzar la restauración de scroll/display
        } else if (modalElement.id === 'deleteModal') {
            closeReplyModal(false);
        }
        
        modalElement.style.display = 'flex';
        // Usamos setTimeout para asegurar que la clase se aplique después de que se muestre el display
        setTimeout(() => {
            modalElement.classList.add('is-visible');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }

    /**
     * Oculta un modal con efecto de transición.
     * @param {HTMLElement} modalElement 
     */
    function hideModal(modalElement) {
        modalElement.classList.remove('is-visible');

        setTimeout(() => {
            modalElement.style.display = 'none';

            if (replyModal.style.display === 'none' && deleteModal.style.display === 'none') {
                document.body.style.overflow = '';
            }
        }, 300); 
    }

    function openReplyModal(authorName) {
        modalTitle.textContent = `Responder a ${authorName}`;
        showModal(replyModal);
    }

    function closeReplyModal(restoreInput = true) {
        hideModal(replyModal);
        if (restoreInput) {
             replyTextarea.value = ''; 
        }
    }

    function submitReply() {
        const replyContent = replyTextarea.value.trim();
        const recipient = modalTitle.textContent.replace('Responder a ', '');

        if (replyContent === "") {
            console.error("No puedes enviar una respuesta vacía.");
            return;
        }

        console.log(`Respuesta enviada a ${recipient}: "${replyContent}"`);
              
        closeReplyModal();
    }

    function openDeleteModal(commentId) {
        commentToDeleteIdInput.value = commentId;
        showModal(deleteModal);
    }

    function closeDeleteModal(restoreInput = true) {
        hideModal(deleteModal);
        if (restoreInput) {
             commentToDeleteIdInput.value = ''; 
        }
    }

    function submitDelete() {
        const commentId = commentToDeleteIdInput.value;
        
        if (commentId === "") {
            console.error("Error: No se ha identificado el comentario a eliminar.");
            closeDeleteModal();
            return;
        }

        console.log(`Solicitud de eliminación para el comentario ID: ${commentId}`);
        
        closeDeleteModal();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (replyModal.classList.contains('is-visible')) {
                closeReplyModal();
            } else if (deleteModal.classList.contains('is-visible')) {
                closeDeleteModal();
            }
        }
    });