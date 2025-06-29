// TrabajaConNosotros.js
document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario
    const form = document.getElementById('workWithUsForm');
    const fileInput = document.getElementById('id_cv');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Validación simple del archivo
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                
                if (!validTypes.includes(file.type)) {
                    e.preventDefault();
                    alert('Por favor, sube un archivo PDF o Word.');
                    fileInput.focus();
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB
                    e.preventDefault();
                    alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
                    fileInput.focus();
                }
            }
        });
    }
    
    // Mostrar nombre del archivo seleccionado
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
            document.getElementById('file-name').textContent = fileName;
        });
    }
});