const messageDiv = document.getElementById('login-message');

/**
 * Muestra un mensaje en la interfaz de usuario con un estilo de éxito o error.
 * @param {string} message - El texto del mensaje a mostrar.
 * @param {boolean} isSuccess - Verdadero para éxito (verde), Falso para error (rojo).
 */
function showMessage(message, isSuccess = false) {
    messageDiv.textContent = message;
    // Aplicar clases de Tailwind CSS para estilo y color
    messageDiv.className = isSuccess 
        ? 'p-3 bg-green-100 text-green-700 rounded-lg mb-4 shadow-sm'
        : 'p-3 bg-red-100 text-red-700 rounded-lg mb-4 shadow-sm';
    messageDiv.style.display = 'block';
}

/**
 * Función principal para manejar el envío del formulario de inicio de sesión.
 * @param {Event} event - El evento de envío del formulario.
 */
function handleLogin(event) {
    // 1. Prevenir el envío tradicional del formulario (recarga de página)
    event.preventDefault(); 
    
    // Ocultar mensajes anteriores al iniciar un nuevo intento
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';
    
    // Obtener los datos del formulario de manera sencilla
    const form = event.target;
    const formData = new FormData(form);
    
    // 2. Deshabilitar botón para UX (evita múltiples envíos)
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
    }

    // 3. Usar Fetch API para enviar los datos a login.php
    fetch('login.php', {
        method: 'POST',
        body: formData // Envía los campos del formulario como multipart/form-data
    })
    .then(response => {
        // La promesa resuelve incluso con códigos de estado 4xx o 5xx.
        // Verificamos si la respuesta HTTP es exitosa (200-299)
        if (!response.ok) {
            // Si hay un error HTTP (ej. 405 Método no permitido o 500 del servidor)
            // intentamos leer el JSON de error que login.php debería haber enviado
            return response.json().then(errorData => {
                // Lanzar un error con el mensaje de error del servidor si está disponible
                throw new Error(errorData.message || 'Error desconocido en el servidor: HTTP ' + response.status);
            });
        }
        // Si todo va bien (HTTP 200), parseamos el cuerpo como JSON
        return response.json(); 
    })
    .then(data => {
        // 4. Manejar la respuesta JSON de login.php
        if (data.success) {
            // Éxito: el servidor validó las credenciales
            showMessage(data.message, true);
            
            // Aquí puedes agregar la redirección. Ejemplo:
            // setTimeout(() => {
            //     window.location.href = 'dashboard.html'; 
            // }, 1500); 
            
        } else {
            // Fracaso: el servidor devolvió un mensaje de error de login
            showMessage(data.message, false);
        }
    })
    .catch(error => {
        // 5. Manejar errores de red o errores lanzados desde .then(response => ...)
        console.error('Error durante la solicitud Fetch:', error);
        // Muestra un mensaje de error genérico en la UI
        showMessage('Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.', false);
    })
    .finally(() => {
        // 6. Finalmente, re-habilitar el botón y restaurar el texto
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Iniciar Sesión';
        }
    });
}