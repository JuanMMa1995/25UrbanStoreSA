document.addEventListener('DOMContentLoaded', function() {
    const eliminarForm = document.getElementById('eliminarForm');
    const eliminarSeleccionadosBtn = document.getElementById('eliminarSeleccionados');
    const eliminarTodosBtn = document.getElementById('eliminarTodos');
    
    // Confirmación para eliminar productos seleccionados
    if (eliminarSeleccionadosBtn) {
        eliminarSeleccionadosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const checkedBoxes = document.querySelectorAll('input[name="seleccionados"]:checked');
            
            if (checkedBoxes.length === 0) {
                alert('Por favor, selecciona al menos un producto para eliminar.');
                return;
            }
            
            if (confirm(`¿Estás seguro de que deseas eliminar los ${checkedBoxes.length} productos seleccionados? Esta acción no se puede deshacer.`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_seleccionados';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Confirmación para eliminar todos los productos
    if (eliminarTodosBtn) {
        eliminarTodosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const totalProductos = document.querySelectorAll('tbody tr').length;
            
            if (totalProductos === 0) {
                alert('No hay productos para eliminar.');
                return;
            }
            
            if (confirm(`¿Estás seguro de que deseas eliminar TODOS los ${totalProductos} productos? Esta acción no se puede deshacer.`)) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'eliminar_todos';
                hiddenInput.value = '1';
                eliminarForm.appendChild(hiddenInput);
                eliminarForm.submit();
            }
        });
    }
    
    // Cerrar mensajes de alerta automáticamente después de 5 segundos
    const alertMessages = document.querySelectorAll('.alert');
    alertMessages.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});