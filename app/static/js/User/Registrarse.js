document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Formato automático para el teléfono
    const telefonoInput = document.getElementById('id_telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+56 ' + value;
            }
            
            if (value.length > 6) {
                value = value.substring(0, 6) + ' ' + value.substring(6);
            }
            
            e.target.value = value.substring(0, 12); // Limita a +56 9 1234 5678
        });
    }
});