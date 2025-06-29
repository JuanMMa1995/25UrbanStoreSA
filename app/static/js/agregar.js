document.addEventListener('DOMContentLoaded', function() {
    const tipoProducto = document.getElementById('id_tipo');
    const tipoAccesorioField = document.getElementById('tipo-accesorio-field');
    const tipoSelect = document.getElementById('id_tipo');
    const subcategoriaFields = {
        'Tronco': document.getElementById('subcategoria-tronco-field'),
        'Piernas': document.getElementById('subcategoria-piernas-field'),
        'Zapatos': document.getElementById('subcategoria-zapatos-field'),
        'Complemento': document.getElementById('tipo-accesorio-field')
    };

    
    function toggleAccesorioField() {
        if (tipoProducto.value === 'Complemento') {
            tipoAccesorioField.style.display = 'block';
        } else {
            tipoAccesorioField.style.display = 'none';
        }
    }
    
    // Mostrar/ocultar al cargar la página
    toggleAccesorioField();
    
    // Mostrar/ocultar cuando cambia el tipo de producto
    tipoProducto.addEventListener('change', toggleAccesorioField);

    function toggleSubcategoria() {
        // Ocultar todos los campos primero
        Object.values(subcategoriaFields).forEach(field => {
            if(field) field.style.display = 'none';
        });
        
        // Mostrar el campo correspondiente al tipo seleccionado
        const selectedType = tipoSelect.value;
        if(subcategoriaFields[selectedType]) {
            subcategoriaFields[selectedType].style.display = 'block';
        }
    }

    // Inicializar y añadir listener
    toggleSubcategoria();
    tipoSelect.addEventListener('change', toggleSubcategoria);

    // Validación adicional del formulario antes de enviar
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validar que el precio sea positivo
        const precio = document.getElementById('id_precio').value;
        if (precio <= 0) {
            alert('El precio debe ser un valor positivo');
            isValid = false;
        }
        
        // Validar que se haya seleccionado un tipo de accesorio si corresponde
        if (tipoProducto.value === 'Complemento') {
            const tipoAccesorio = document.getElementById('id_tipo_accesorio').value;
            if (!tipoAccesorio) {
                alert('Por favor seleccione un tipo de accesorio');
                isValid = false;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});