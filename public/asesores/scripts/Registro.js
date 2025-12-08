 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary-dark': '#1e1e1e', // Fondo del formulario
                        'secondary-dark': '#333333', // Color de fondo del cuerpo
                        'accent-blue': '#4a69bd', // Color de acento
                        'text-light': '#f0f0f0', // Texto en fondo oscuro
                        'text-muted': '#b0b0b0', // Texto gris suave
                    },
                }
            }
        }

        /**
         * Función para cambiar entre la vista de Login y la vista de Restablecimiento.
         * @param {string} viewId - El ID de la vista a mostrar ('login-view' o 'reset-view').
         */
        function switchView(viewId) {
            const loginView = document.getElementById('login-view');
            const resetView = document.getElementById('reset-view');

            if (viewId === 'reset-view') {
                loginView.classList.add('hidden');
                resetView.classList.remove('hidden');
                document.getElementById('form-title').textContent = 'Restablecer Contraseña';
            } else {
                resetView.classList.add('hidden');
                loginView.classList.remove('hidden');
                document.getElementById('form-title').textContent = 'Iniciar sesión';
            }
        }

        /**
         * Maneja el envío del formulario de Restablecimiento de Contraseña.
         */
        function handlePasswordReset(event) {
            event.preventDefault();

            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const messageContainer = document.getElementById('message-container');
            
            // Validación simple
            if (newPassword !== confirmPassword) {
                messageContainer.textContent = '¡Error! Las contraseñas no coinciden.';
                messageContainer.classList.remove('hidden', 'bg-green-600');
                messageContainer.classList.add('bg-red-600', 'p-3', 'rounded-lg', 'mb-4', 'text-sm');
                return;
            }

            // Simulación de restablecimiento exitoso
            messageContainer.textContent = '¡Contraseña restablecida con éxito! Regresando al inicio de sesión...';
            messageContainer.classList.remove('hidden', 'bg-red-600');
            messageContainer.classList.add('bg-green-600', 'p-3', 'rounded-lg', 'mb-4', 'text-sm');
            
            // Regresar a la vista de login después de 3 segundos
            setTimeout(() => {
                switchView('login-view');
                messageContainer.classList.add('hidden');
                messageContainer.classList.remove('bg-green-600', 'p-3', 'rounded-lg', 'mb-4', 'text-sm');
                messageContainer.textContent = '';
                // Limpiar campos del formulario de restablecimiento
                document.getElementById('reset-form').reset();
            }, 3000);
        }
