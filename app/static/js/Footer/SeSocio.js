// js/Footer/SeSocio.js
document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
            
            // Validación personalizada del RUT
            const rutInput = document.getElementById('id_rut_comercial');
            if (rutInput) {
                if (!validarRUT(rutInput.value)) {
                    rutInput.classList.add('is-invalid');
                    rutInput.nextElementSibling.textContent = 'Por favor ingresa un RUT válido (ej: 12.345.678-9)';
                    event.preventDefault();
                } else {
                    rutInput.classList.remove('is-invalid');
                }
            }
        }, false);
    });

    // Función para validar RUT chileno
    function validarRUT(rut) {
        if (!rut || rut.trim() === '') return false;
        
        // Limpiar el RUT
        rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1);
        
        // Validar que el cuerpo sea numérico
        if (!/^\d+$/.test(cuerpo)) return false;
        
        // Calcular DV esperado
        let suma = 0;
        let multiplo = 2;
        
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        
        const dvEsperado = 11 - (suma % 11);
        let dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dvCalculado === dv;
    }

    // Opcional: Formatear RUT mientras se escribe
    const rutInput = document.getElementById('id_rut_comercial');
    if (rutInput) {
        rutInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\./g, '').replace(/-/g, '');
            
            if (value.length > 1) {
                value = value.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + value.slice(-1);
            }
            
            e.target.value = value;
        });
    }
});