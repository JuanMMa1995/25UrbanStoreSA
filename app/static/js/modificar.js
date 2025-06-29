document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnModificar = document.getElementById('btnModificar');
    const confirmationModal = document.getElementById('confirmationModal');
    const cancelModal = document.getElementById('cancelModal');
    const confirmModify = document.getElementById('confirmModify');
    const modificationForm = document.getElementById('modificationForm');
    const cancelEdit = document.getElementById('cancelEdit');
    const tipoAccesorioGroup = document.getElementById('tipoAccesorioGroup');
    const subcategoriaGroup = document.getElementById('subcategoriaGroup');
    
    // Mostrar modal de confirmación al hacer clic en Modificar
    if (btnModificar) {
        btnModificar.addEventListener('click', function() {
            const selectedProduct = document.querySelector('input[name="producto_id"]:checked');
            
            if (!selectedProduct) {
                alert('Por favor selecciona un producto para modificar');
                return;
            }
            
            confirmationModal.style.display = 'flex';
        });
    }
    
    // Ocultar modal al hacer clic en Cancelar
    if (cancelModal) {
        cancelModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Confirmar modificación y mostrar formulario de edición
    if (confirmModify) {
        confirmModify.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            
            const selectedProduct = document.querySelector('input[name="producto_id"]:checked');
            const tipoProducto = document.querySelector('input[name="tipo_producto"]').value;
            
            // Obtener datos del producto seleccionado
            const productCard = selectedProduct.closest('.product-card');
            const modelo = productCard.querySelector('p:nth-of-type(1)').textContent.replace('Modelo: ', '').trim();
            const precio = productCard.querySelector('p:nth-of-type(2)').textContent.replace('Precio: $', '').trim();
            const marcaTexto = productCard.querySelector('p:nth-of-type(3)').textContent.replace('Marca: ', '').trim();
            const generoTexto = productCard.querySelector('p:nth-of-type(4)').textContent.replace('Género: ', '').trim();
            const colorTexto = productCard.querySelector('p:nth-of-type(5)').textContent.replace('Color: ', '').trim();
            let subcategoriaTexto = '';
            
            // Obtener subcategoría solo si no es Complemento
            if (tipoProducto !== 'Complemento') {
                const subcategoriaElem = productCard.querySelector('p:nth-of-type(6)');
                if (subcategoriaElem) {
                    subcategoriaTexto = subcategoriaElem.textContent.replace('Subcategoría: ', '').trim();
                }
            }
            
            // Rellenar formulario de edición
            document.getElementById('editModelo').value = modelo === '-' ? '' : modelo;
            document.getElementById('editPrecio').value = precio;
            
            // Seleccionar la marca correcta en el dropdown
            const marcaSelect = document.getElementById('editMarca');
            for (let i = 0; i < marcaSelect.options.length; i++) {
                if (marcaSelect.options[i].text === marcaTexto) {
                    marcaSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar género
            const generoSelect = document.getElementById('editGenero');
            for (let i = 0; i < generoSelect.options.length; i++) {
                if (generoSelect.options[i].text === generoTexto) {
                    generoSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar color
            const colorSelect = document.getElementById('editColor');
            for (let i = 0; i < colorSelect.options.length; i++) {
                if (colorSelect.options[i].text === colorTexto) {
                    colorSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Seleccionar subcategoría si aplica
            if (tipoProducto !== 'Complemento' && subcategoriaTexto) {
                const subcategoriaSelect = document.getElementById('editSubcategoria');
                for (let i = 0; i < subcategoriaSelect.options.length; i++) {
                    if (subcategoriaSelect.options[i].text === subcategoriaTexto) {
                        subcategoriaSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            document.getElementById('editTipoProducto').value = tipoProducto;
            document.getElementById('editProductoId').value = selectedProduct.value;
            
            // Mostrar campo de tipo de accesorio si es necesario
            if (tipoProducto === 'Complemento') {
                tipoAccesorioGroup.style.display = 'block';
                const tipoAccesorio = productCard.querySelector('p:nth-of-type(6)').textContent.replace('Tipo: ', '').trim();
                const tipoValue = getTipoValue(tipoAccesorio);
                document.getElementById('editTipoAccesorio').value = tipoValue;
            } else {
                tipoAccesorioGroup.style.display = 'none';
            }
            
            // Mostrar campo de subcategoría si es necesario
            if (tipoProducto === 'Tronco' || tipoProducto === 'Piernas' || tipoProducto === 'Zapatos') {
                subcategoriaGroup.style.display = 'block';
            } else {
                subcategoriaGroup.style.display = 'none';
            }
            
            // Mostrar formulario de edición
            modificationForm.style.display = 'block';
            
            // Desplazarse al formulario
            modificationForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Cancelar edición
    if (cancelEdit) {
        cancelEdit.addEventListener('click', function() {
            modificationForm.style.display = 'none';
        });
    }
    
    // Función auxiliar para obtener el valor del tipo de accesorio
    function getTipoValue(tipoText) {
        const tipos = {
            'Reloj': 'REL',
            'Bufanda': 'BUF',
            'Cinturón': 'CIN',
            'Collar': 'COL',
            'Gorra': 'GOR',
            'Pulseras': 'PUL'
        };
        return tipos[tipoText] || 'REL';
    }
});