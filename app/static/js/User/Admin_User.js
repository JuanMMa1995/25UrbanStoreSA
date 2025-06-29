// static/js/Admin_User.js
document.addEventListener('DOMContentLoaded', function() {
    // Puedes añadir funcionalidades JavaScript aquí si necesitas
    console.log('Admin User JS cargado');
    
    // Ejemplo: Confirmación antes de eliminar
    const deleteButtons = document.querySelectorAll('button[name="delete_user"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                e.preventDefault();
            }
        });
    });
});